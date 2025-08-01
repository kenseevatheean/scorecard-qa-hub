import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.52.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface UserCreationRequest {
  email: string;
  password: string;
  fullName: string;
  role: string;
  department: string;
}

interface BulkUserCreationRequest {
  users: UserCreationRequest[];
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client with service role key
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Verify admin privileges
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      throw new Error('No authorization header provided');
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);
    
    if (authError || !user) {
      throw new Error('Invalid authentication token');
    }

    // Check if user has admin role
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profileError || !profile || profile.role !== 'admin') {
      throw new Error('Insufficient privileges - admin role required');
    }

    const { pathname } = new URL(req.url);
    const method = req.method;

    // Single user creation
    if (pathname.endsWith('/create-user') && method === 'POST') {
      const { email, password, fullName, role, department }: UserCreationRequest = await req.json();

      console.log('Creating user:', { email, fullName, role, department });

      // Create user directly and then manually create profile
      const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true
      });

      if (authError) {
        console.error('Auth user creation error:', authError);
        throw authError;
      }

      // Manually insert into profiles table
      const { error: profileError } = await supabaseAdmin
        .from('profiles')
        .insert({
          id: authData.user.id,
          name: fullName,
          role: role as any,
          department: department,
          status: 'active'
        });

      if (profileError) {
        console.error('Profile creation error:', profileError);
        // Clean up the auth user if profile creation fails
        await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
        throw profileError;
      }

      console.log('User created successfully:', authData.user?.email);

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: `User ${email} created successfully`,
          user: authData.user 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Bulk user creation
    if (pathname.endsWith('/create-users-bulk') && method === 'POST') {
      const { users }: BulkUserCreationRequest = await req.json();

      console.log('Creating bulk users:', users.length);

      const results = {
        success: 0,
        failed: 0,
        errors: [] as string[]
      };

      for (let i = 0; i < users.length; i++) {
        const user = users[i];
        try {
          const { error } = await supabaseAdmin.auth.admin.createUser({
            email: user.email,
            password: user.password,
            email_confirm: true,
            user_metadata: {
              name: user.fullName,
              role: user.role,
              department: user.department
            }
          });

          if (error) throw error;
          results.success++;
          console.log(`User ${i + 1}/${users.length} created: ${user.email}`);
        } catch (error: any) {
          results.failed++;
          results.errors.push(`${user.email}: ${error.message}`);
          console.error(`User ${i + 1}/${users.length} failed: ${user.email}`, error.message);
        }
      }

      console.log('Bulk creation complete:', results);

      return new Response(
        JSON.stringify({
          success: true,
          message: `Bulk creation complete. ${results.success} successful, ${results.failed} failed.`,
          results
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Endpoint not found' }),
      { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('Error in admin-user-management function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});