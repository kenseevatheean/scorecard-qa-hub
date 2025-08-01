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
  
  // Bulk user creation states
  const [bulkCreating, setBulkCreating] = useState(false)
  const [bulkMessage, setBulkMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

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

  const createBulkUsers = async () => {
    setBulkCreating(true)
    setBulkMessage(null)

    const usersToCreate = [
      { fullName: 'Amee Mirjane', email: 'Amee.Mirjane@creditfix.co.uk', role: 'manager', department: 'Financial Reviews' },
      { fullName: 'Atish Aubeeluck', email: 'Atish.Aubeeluck@creditfix.co.uk', role: 'manager', department: 'Customer Support' },
      { fullName: 'Yuddish Raghoonundun', email: 'Yuddish.Raghoonundun@creditfix.co.uk', role: 'manager', department: 'General' },
      { fullName: 'Kavish Sookaloo', email: 'kavish.sookaloo@carringtondean.com', role: 'manager', department: 'Trust Deed' },
      { fullName: 'Naviyam Mamoodee', email: 'naviyam.mamoodee@ebenegate.co.uk', role: 'manager', department: 'Retention' },
      { fullName: 'Yashiin Bundhoo', email: 'Yashiin.Bundhoo@ebenegate.co.uk', role: 'manager', department: 'Supervision' },
      { fullName: 'Soraj Urjoon', email: 'soraj.urjoon@creditfix.co.uk', role: 'manager', department: 'Customer Support' },
      { fullName: 'Sandy Permall', email: 'Sandy.Permall@creditfix.co.uk', role: 'manager', department: 'Variation' },
      { fullName: 'Ashley Luckeenarain', email: 'ashley.luckeenarain@creditfix.co.uk', role: 'employee', department: 'General' },
      { fullName: 'Nasima Joomun', email: 'nasima.joomun@creditfix.co.uk', role: 'manager', department: 'Supervision' },
      { fullName: 'Abdur Hosenally', email: 'Abdur.Hosenally@creditfix.co.uk', role: 'manager', department: 'Creditor Services' },
      { fullName: 'Ashwanee Kurnauth', email: 'ashwanee.kurnauth@creditfix.co.uk', role: 'manager', department: 'Creditor Services' },
      { fullName: 'Heydar LALLMAHOMED', email: 'heydar.lallmahomed@creditfix.co.uk', role: 'manager', department: 'Closures' },
      { fullName: 'Zakkiya Jearuth', email: 'zakkiya.jearuth@creditfix.co.uk', role: 'admin', department: 'Administration' },
      { fullName: 'Yakshineebye Bhewa', email: 'yakshineebye.bhewa@creditfix.co.uk', role: 'qa_officer', department: 'Quality Assurance' },
      { fullName: 'Raksha Rambaruth-Emrith', email: 'Raksha.RAMBARUTH@creditfix.co.uk', role: 'qa_officer', department: 'Quality Assurance' },
      { fullName: 'Dooshan Hoollah', email: 'dooshan.hoollah@creditfix.co.uk', role: 'qa_officer', department: 'Quality Assurance' }
    ]

    try {
      // Generate temporary passwords and format for bulk creation
      const users = usersToCreate.map(user => ({
        ...user,
        password: 'TempPass123!' // Standard temporary password
      }))

      const { data, error } = await supabase.functions.invoke('admin-user-management/create-users-bulk', {
        body: { users }
      })

      if (error) throw error

      setBulkMessage({ 
        type: 'success', 
        text: `Bulk creation complete! ${data.results.success} users created successfully, ${data.results.failed} failed.`
      })

      // Reload users list
      loadUsers()

    } catch (error: any) {
      setBulkMessage({ type: 'error', text: error.message || 'Failed to create bulk users' })
    }

    setBulkCreating(false)
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

        {/* Bulk User Creation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              Bulk User Creation
            </CardTitle>
            <CardDescription>
              Add all new team members with predefined roles and departments
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {bulkMessage && (
              <Alert className={bulkMessage.type === 'error' ? 'border-destructive/50 bg-destructive/10' : 'border-green-500/50 bg-green-500/10'}>
                {bulkMessage.type === 'error' ? (
                  <AlertCircle className="h-4 w-4 text-destructive" />
                ) : (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                )}
                <AlertDescription className={bulkMessage.type === 'error' ? 'text-destructive' : 'text-green-700'}>
                  {bulkMessage.text}
                </AlertDescription>
              </Alert>
            )}

            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">
                This will create 17 new user accounts with temporary password "TempPass123!":
              </p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• 1 Admin (Quality Assurance)</li>
                <li>• 12 Managers (Customer Service)</li>
                <li>• 3 QA Officers (Quality Assurance)</li>
                <li>• 1 Employee (Customer Service)</li>
              </ul>
            </div>

            <Button 
              onClick={createBulkUsers} 
              disabled={bulkCreating}
              className="w-full"
              variant="default"
            >
              {bulkCreating ? 'Creating Users...' : 'Create All 17 Users'}
            </Button>
          </CardContent>
        </Card>

        {/* User Management Section */}
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