import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { UserPlus, AlertCircle, CheckCircle, Users } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"

interface Employee {
  id: string;
  name: string;
  department: string;
}

export default function AdminPanel() {
  // User creation states
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [role, setRole] = useState('employee')
  const [department, setDepartment] = useState('General')
  const [employeeNumber, setEmployeeNumber] = useState('')
  const [position, setPosition] = useState('Team Member')
  const [reportingManagerId, setReportingManagerId] = useState('none')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  
  // Employee data for reporting manager selection
  const [managers, setManagers] = useState<Employee[]>([])
  const [loadingManagers, setLoadingManagers] = useState(false)

  // Load managers for reporting manager selection
  useEffect(() => {
    loadManagers()
  }, [])

  const loadManagers = async () => {
    setLoadingManagers(true)
    try {
      const { data, error } = await supabase
        .from('employees')
        .select('id, name, department')
        .eq('status', 'active')
        .order('name')

      if (error) throw error
      setManagers(data || [])
    } catch (error: any) {
      console.error('Error loading managers:', error)
    }
    setLoadingManagers(false)
  }

  const createUser = async () => {
    if (!email || !password || !fullName) {
      setMessage({ type: 'error', text: 'Please fill in all required fields' })
      return
    }

    setLoading(true)
    setMessage(null)

    try {
      // Create user account
      const { data: userData, error: userError } = await supabase.functions.invoke('admin-user-management/create-user', {
        body: {
          email,
          password,
          fullName,
          role,
          department
        }
      })
      
      if (userError) throw userError
      
      // Create employee record
      const { error: employeeError } = await supabase
        .from('employees')
        .insert({
          name: fullName,
          email: email,
          department: department,
          employee_number: employeeNumber || undefined,
          position: position,
          reporting_manager_id: reportingManagerId && reportingManagerId !== 'none' ? reportingManagerId : undefined,
          status: 'active'
        })
      
      if (employeeError) {
        console.warn('User created but employee record failed:', employeeError)
        setMessage({ 
          type: 'success', 
          text: userData.message + ' (Note: Employee record creation failed - please create manually)' 
        })
      } else {
        setMessage({ type: 'success', text: userData.message + ' and employee record created successfully!' })
      }
      
      // Reset form
      setEmail('')
      setPassword('')
      setFullName('')
      setRole('employee')
      setDepartment('General')
      setEmployeeNumber('')
      setPosition('Team Member')
      setReportingManagerId('none')
      
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to create user' })
    }
    
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Admin Panel - User Management
            </CardTitle>
            <CardDescription>
              Create new users and employee records
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

            {/* User Account Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">User Account Information</h3>
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
                  <Label htmlFor="password">
                    Temporary Password *
                    <span className="block text-xs text-muted-foreground font-normal">
                      User will be required to change this on first login
                    </span>
                  </Label>
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
              </div>
            </div>

            {/* Employee Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Employee Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="department">Department *</Label>
                  <Input
                    id="department"
                    type="text"
                    placeholder="General"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Input
                    id="position"
                    type="text"
                    placeholder="Team Member"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employeeNumber">Employee Number</Label>
                  <Input
                    id="employeeNumber"
                    type="text"
                    placeholder="EMP001 (optional)"
                    value={employeeNumber}
                    onChange={(e) => setEmployeeNumber(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reportingManager">Reporting Manager</Label>
                  <Select 
                    value={reportingManagerId} 
                    onValueChange={setReportingManagerId}
                    disabled={loadingManagers}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={loadingManagers ? "Loading..." : "Select manager (optional)"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No reporting manager</SelectItem>
                      {managers.map((manager) => (
                        <SelectItem key={manager.id} value={manager.id}>
                          {manager.name} - {manager.department}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Button 
              onClick={createUser} 
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Creating User & Employee...' : 'Create User & Employee'}
            </Button>

          </CardContent>
        </Card>
      </div>
    </div>
  )
}