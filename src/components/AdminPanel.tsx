import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { UserPlus, AlertCircle, CheckCircle, Users, User, UserX, UserCheck } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import CreateUsersScript from "./CreateUsersScript"

interface Manager {
  id: string;
  name: string;
  department: string;
}

interface UserProfile {
  id: string;
  name: string;
  role: string;
  department: string;
  status: string;
  created_at: string;
}

export default function AdminPanel() {
  // User creation states
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [role, setRole] = useState('employee')
  const [userDepartment, setUserDepartment] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  
  // Employee creation states
  const [employeeName, setEmployeeName] = useState('')
  const [employeeDepartment, setEmployeeDepartment] = useState('')
  const [position, setPosition] = useState('Team Member')
  const [reportingManagerId, setReportingManagerId] = useState('none')
  const [employeeLoading, setEmployeeLoading] = useState(false)
  const [employeeMessage, setEmployeeMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  
  // Data for dropdowns
  const [departments, setDepartments] = useState<string[]>([])
  const [managers, setManagers] = useState<Manager[]>([])
  const [loadingDepartments, setLoadingDepartments] = useState(false)
  const [loadingManagers, setLoadingManagers] = useState(false)

  // User management states
  const [users, setUsers] = useState<UserProfile[]>([])
  const [loadingUsers, setLoadingUsers] = useState(false)
  const [userManagementMessage, setUserManagementMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  

  // Load departments and managers
  useEffect(() => {
    loadDepartments()
    loadManagers()
    loadUsers()
  }, [])

  const loadDepartments = async () => {
    setLoadingDepartments(true)
    try {
      const { data, error } = await supabase
        .from('scorecards')
        .select('department')
        .order('department')

      if (error) throw error
      
      // Extract unique departments
      const uniqueDepartments = [...new Set(data?.map(item => item.department) || [])]
      setDepartments(uniqueDepartments)
    } catch (error: any) {
      console.error('Error loading departments:', error)
    }
    setLoadingDepartments(false)
  }

  const loadManagers = async () => {
    setLoadingManagers(true)
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, name, department')
        .order('name')

      if (error) throw error
      setManagers(data || [])
    } catch (error: any) {
      console.error('Error loading managers:', error)
    }
    setLoadingManagers(false)
  }

  const createUser = async () => {
    if (!email || !password || !fullName || !userDepartment) {
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
          department: userDepartment
        }
      })
      
      if (userError) throw userError
      
      setMessage({ type: 'success', text: userData.message })
      
      // Reset form
      setEmail('')
      setPassword('')
      setFullName('')
      setRole('employee')
      setUserDepartment('')
      
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to create user' })
    }
    
    setLoading(false)
  }

  const createEmployee = async () => {
    if (!employeeName || !employeeDepartment) {
      setEmployeeMessage({ type: 'error', text: 'Please fill in all required fields' })
      return
    }

    setEmployeeLoading(true)
    setEmployeeMessage(null)

    try {
      // Create employee record
      const { error: employeeError } = await supabase
        .from('employees')
        .insert({
          name: employeeName,
          department: employeeDepartment,
          position: position,
          reporting_manager_id: reportingManagerId && reportingManagerId !== 'none' ? reportingManagerId : undefined,
          status: 'active'
        })
      
      if (employeeError) throw employeeError
      
      setEmployeeMessage({ type: 'success', text: 'Employee record created successfully!' })
      
      // Reset form
      setEmployeeName('')
      setEmployeeDepartment('')
      setPosition('Team Member')
      setReportingManagerId('none')
      
    } catch (error: any) {
      setEmployeeMessage({ type: 'error', text: error.message || 'Failed to create employee' })
    }
    
    setEmployeeLoading(false)
  }

  const loadUsers = async () => {
    setLoadingUsers(true)
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, name, role, department, status, created_at')
        .order('created_at', { ascending: false })

      if (error) throw error
      setUsers(data || [])
    } catch (error: any) {
      console.error('Error loading users:', error)
    }
    setLoadingUsers(false)
  }

  const toggleUserStatus = async (userId: string, currentStatus: string) => {
    setUserManagementMessage(null)
    try {
      const newStatus = currentStatus === 'active' ? 'disabled' : 'active'
      
      const { error } = await supabase.rpc('manage_user_status', {
        target_user_id: userId,
        new_status: newStatus
      })

      if (error) throw error

      setUserManagementMessage({ 
        type: 'success', 
        text: `User ${newStatus === 'active' ? 'enabled' : 'disabled'} successfully!` 
      })
      
      // Reload users
      loadUsers()
      
    } catch (error: any) {
      setUserManagementMessage({ type: 'error', text: error.message || 'Failed to update user status' })
    }
  }


  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* User Account Creation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Create User Account
            </CardTitle>
            <CardDescription>
              Create a new user account for system access
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
                <Label htmlFor="role">User Role *</Label>
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

              <div className="space-y-2">
                <Label htmlFor="userDepartment">Department *</Label>
                <Select 
                  value={userDepartment} 
                  onValueChange={setUserDepartment}
                  disabled={loadingDepartments}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={loadingDepartments ? "Loading..." : "Select department"} />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button 
              onClick={createUser} 
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Creating User...' : 'Create User Account'}
            </Button>
          </CardContent>
        </Card>

        {/* Employee Record Creation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Create Employee Record
            </CardTitle>
            <CardDescription>
              Create a new employee record for organizational purposes
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {employeeMessage && (
              <Alert className={employeeMessage.type === 'error' ? 'border-destructive/50 bg-destructive/10' : 'border-green-500/50 bg-green-500/10'}>
                {employeeMessage.type === 'error' ? (
                  <AlertCircle className="h-4 w-4 text-destructive" />
                ) : (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                )}
                <AlertDescription className={employeeMessage.type === 'error' ? 'text-destructive' : 'text-green-700'}>
                  {employeeMessage.text}
                </AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="employeeName">Employee Name *</Label>
                <Input
                  id="employeeName"
                  type="text"
                  placeholder="John Doe"
                  value={employeeName}
                  onChange={(e) => setEmployeeName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="employeeDepartment">Department *</Label>
                <Select 
                  value={employeeDepartment} 
                  onValueChange={setEmployeeDepartment}
                  disabled={loadingDepartments}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={loadingDepartments ? "Loading..." : "Select department"} />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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

            <Button 
              onClick={createEmployee} 
              disabled={employeeLoading}
              className="w-full"
            >
              {employeeLoading ? 'Creating Employee...' : 'Create Employee Record'}
            </Button>
          </CardContent>
        </Card>

        {/* Required Users Creation */}
        <CreateUsersScript />
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Manage Users
            </CardTitle>
            <CardDescription>
              View and manage existing user accounts
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {userManagementMessage && (
              <Alert className={userManagementMessage.type === 'error' ? 'border-destructive/50 bg-destructive/10' : 'border-green-500/50 bg-green-500/10'}>
                {userManagementMessage.type === 'error' ? (
                  <AlertCircle className="h-4 w-4 text-destructive" />
                ) : (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                )}
                <AlertDescription className={userManagementMessage.type === 'error' ? 'text-destructive' : 'text-green-700'}>
                  {userManagementMessage.text}
                </AlertDescription>
              </Alert>
            )}

            {loadingUsers ? (
              <div className="text-center py-4">Loading users...</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {user.role === 'qa_officer' ? 'QA Officer' : 
                           user.role === 'manager' ? 'Manager' :
                           user.role === 'admin' ? 'Admin' : 'Employee'}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.department}</TableCell>
                      <TableCell>
                        <Badge variant={user.status === 'active' ? 'default' : 'destructive'}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleUserStatus(user.id, user.status)}
                          className="flex items-center gap-2"
                        >
                          {user.status === 'active' ? (
                            <>
                              <UserX className="h-4 w-4" />
                              Disable
                            </>
                          ) : (
                            <>
                              <UserCheck className="h-4 w-4" />
                              Enable
                            </>
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

      </div>
    </div>
  )
}