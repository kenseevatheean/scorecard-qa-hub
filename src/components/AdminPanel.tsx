import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { UserPlus, AlertCircle, CheckCircle } from "lucide-react"

// Create admin client with service role key
const supabaseAdmin = createClient(
  "https://goxplrcpxejwgjuvphxo.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdveHBscmNweGVqd2dqdXZwaHhvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MzI1ODM1OCwiZXhwIjoyMDY4ODM0MzU4fQ.2F13-lxML-FmmQlMlN4bvEWwsu-iB4q8ra4C4uYa6A0"
)

export default function AdminPanel() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [role, setRole] = useState('employee')
  const [department, setDepartment] = useState('General')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const createUser = async () => {
    if (!email || !password || !fullName) {
      setMessage({ type: 'error', text: 'Please fill in all required fields' })
      return
    }

    setLoading(true)
    setMessage(null)

    try {
      const { data, error } = await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true, // Skip email confirmation
        user_metadata: {
          full_name: fullName,
          role,
          department
        }
      })
      
      if (error) throw error
      
      setMessage({ type: 'success', text: `User ${email} created successfully!` })
      
      // Reset form
      setEmail('')
      setPassword('')
      setFullName('')
      setRole('employee')
      setDepartment('General')
      
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to create user' })
    }
    
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              Admin Panel - Create New User
            </CardTitle>
            <CardDescription>
              Manually add new users to the system without requiring them to sign up
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john.doe@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Temporary Password *</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter temporary password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">User Role</Label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="employee">Employee</SelectItem>
                    <SelectItem value="qa_officer">QA Officer</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  type="text"
                  placeholder="General"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                />
              </div>
            </div>

            <Button 
              onClick={createUser} 
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Creating User...' : 'Create User'}
            </Button>

            <div className="text-sm text-muted-foreground bg-secondary p-3 rounded-md">
              <strong>Note:</strong> The user will be created with email confirmation automatically enabled. 
              They can log in immediately with the provided credentials.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}