import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle, UserPlus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export default function CreateUsersScript() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const usersToCreate = [
    { name: 'Naviyam Mamoodee', email: 'naviyam.mamoodee@ebenegate.co.uk', role: 'manager', department: 'Retention' },
    { name: 'Yashiin Bundhoo', email: 'Yashiin.Bundhoo@ebenegate.co.uk', role: 'manager', department: 'Supervision' },
    { name: 'Zakkiya Jearuth', email: 'zakkiya.jearuth@creditfix.co.uk', role: 'admin', department: 'Quality Assurance' },
    { name: 'Amee Mirjane', email: 'Amee.Mirjane@creditfix.co.uk', role: 'manager', department: 'Financial Reviews' },
    { name: 'Atish Aubeeluck', email: 'Atish.Aubeeluck@creditfix.co.uk', role: 'manager', department: 'Customer Support' },
    { name: 'Yuddish Raghoonundun', email: 'Yuddish.Raghoonundun@creditfix.co.uk', role: 'manager', department: 'Customer Relations' },
    { name: 'Kavish Sookaloo', email: 'kavish.sookaloo@carringtondean.com', role: 'manager', department: 'Trust Deed' },
    { name: 'Soraj Urjoon', email: 'soraj.urjoon@creditfix.co.uk', role: 'manager', department: 'Customer Support' },
    { name: 'Sandy Permall', email: 'Sandy.Permall@creditfix.co.uk', role: 'manager', department: 'Variation' },
    { name: 'Nasima Joomun', email: 'nasima.joomun@creditfix.co.uk', role: 'manager', department: 'Supervision' },
    { name: 'Abdur Hosenally', email: 'Abdur.Hosenally@creditfix.co.uk', role: 'manager', department: 'Creditor Services' },
    { name: 'Ashwanee Kurnauth', email: 'ashwanee.kurnauth@creditfix.co.uk', role: 'manager', department: 'Creditor Services' },
    { name: 'Heydar LALLMAHOMED', email: 'heydar.lallmahomed@creditfix.co.uk', role: 'manager', department: 'Creditor Services' }
  ];

  const createUsers = async () => {
    setLoading(true);
    setMessage(null);

    let successCount = 0;
    let failCount = 0;
    const errors: string[] = [];

    for (const user of usersToCreate) {
      try {
        const { data, error } = await supabase.functions.invoke('admin-user-management/create-user', {
          body: {
            email: user.email,
            password: 'TempPass123!',
            fullName: user.name,
            role: user.role,
            department: user.department
          }
        });

        if (error) throw error;
        successCount++;
        console.log(`Created: ${user.name}`);
      } catch (error: any) {
        failCount++;
        errors.push(`${user.name}: ${error.message}`);
        console.error(`Failed to create ${user.name}:`, error.message);
      }
    }

    setMessage({
      type: successCount > 0 ? 'success' : 'error',
      text: `Creation complete: ${successCount} successful, ${failCount} failed. ${errors.length > 0 ? 'Errors: ' + errors.slice(0, 3).join(', ') : ''}`
    });

    setLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="h-5 w-5" />
          Create Required Users
        </CardTitle>
        <CardDescription>
          Create the 13 users with proper authentication
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {message && (
          <Alert className={message.type === 'error' ? 'border-destructive/50 bg-destructive/10' : 'border-green-500/50 bg-green-500/10'}>
            {message.type === 'error' ? (
              <AlertCircle className="h-4 w-4 text-destructive" />
            ) : (
              <CheckCircle className="h-4 w-4 text-green-600" />
            )}
            <AlertDescription className={message.type === 'error' ? 'text-destructive' : 'text-green-700'}>
              {message.text}
            </AlertDescription>
          </Alert>
        )}

        <div className="bg-muted/50 p-4 rounded-lg">
          <p className="text-sm text-muted-foreground mb-2">
            This will create {usersToCreate.length} users:
          </p>
          <ul className="text-xs text-muted-foreground space-y-1 max-h-32 overflow-y-auto">
            {usersToCreate.map((user, index) => (
              <li key={index}>• {user.name} - {user.role} ({user.department})</li>
            ))}
          </ul>
        </div>

        <Button 
          onClick={createUsers} 
          disabled={loading}
          className="w-full"
        >
          {loading ? 'Creating Users...' : `Create All ${usersToCreate.length} Users`}
        </Button>
      </CardContent>
    </Card>
  );
}