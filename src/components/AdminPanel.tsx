import { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { UserPlus, AlertCircle, CheckCircle, Upload, Download, Users } from "lucide-react"
import Papa from 'papaparse'
import { supabase } from "@/integrations/supabase/client"

export default function AdminPanel() {
  // Single user creation states
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [role, setRole] = useState('employee')
  const [department, setDepartment] = useState('General')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  // Bulk upload states
  const [csvFile, setCsvFile] = useState<File | null>(null)
  const [csvData, setCsvData] = useState<any[]>([])
  const [csvPreview, setCsvPreview] = useState<any[]>([])
  const [bulkLoading, setBulkLoading] = useState(false)
  const [bulkProgress, setBulkProgress] = useState(0)
  const [bulkResults, setBulkResults] = useState<{ success: number, failed: number, errors: string[] }>({ success: 0, failed: 0, errors: [] })
  const fileInputRef = useRef<HTMLInputElement>(null)

  // CSV handling functions
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.name.endsWith('.csv')) {
      setMessage({ type: 'error', text: 'Please upload a CSV file' })
      return
    }

    setCsvFile(file)
    setMessage(null)

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim().toLowerCase(),
      complete: (results) => {
        if (results.errors.length > 0) {
          setMessage({ type: 'error', text: 'Error parsing CSV: ' + results.errors[0].message })
          return
        }

        // Validate required columns
        const requiredColumns = ['email', 'full_name', 'password']
        const headers = results.meta.fields || []
        const missingColumns = requiredColumns.filter(col => !headers.includes(col))
        
        if (missingColumns.length > 0) {
          setMessage({ 
            type: 'error', 
            text: `Missing required columns: ${missingColumns.join(', ')}. Required: email, full_name, password. Optional: role, department` 
          })
          return
        }

        const processedData = results.data.map((row: any, index: number) => ({
          ...row,
          role: row.role || 'employee',
          department: row.department || 'General',
          rowIndex: index + 1
        }))

        setCsvData(processedData)
        setCsvPreview(processedData.slice(0, 5)) // Show first 5 rows
        setMessage({ type: 'success', text: `CSV parsed successfully. Found ${processedData.length} users.` })
      }
    })
  }

  const downloadTemplate = () => {
    const template = `email,full_name,password,role,department
john.doe@company.com,John Doe,temp123,employee,IT
jane.smith@company.com,Jane Smith,temp456,qa_officer,Quality Assurance
mike.johnson@company.com,Mike Johnson,temp789,manager,Operations`

    const blob = new Blob([template], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'user_template.csv'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const bulkCreateUsers = async () => {
    if (csvData.length === 0) {
      setMessage({ type: 'error', text: 'No users to create' })
      return
    }

    setBulkLoading(true)
    setBulkProgress(0)
    setBulkResults({ success: 0, failed: 0, errors: [] })

    try {
      const users = csvData.map(user => ({
        email: user.email.trim(),
        password: user.password,
        fullName: user.full_name.trim(),
        role: user.role,
        department: user.department
      }))

      const { data, error } = await supabase.functions.invoke('admin-user-management/create-users-bulk', {
        body: { users }
      })

      if (error) throw error

      const results = data.results
      setBulkResults(results)
      setBulkProgress(100)
      setMessage({ 
        type: results.success > 0 ? 'success' : 'error', 
        text: data.message
      })
    } catch (error: any) {
      setBulkResults({ success: 0, failed: csvData.length, errors: [error.message] })
      setMessage({ type: 'error', text: error.message || 'Failed to create users' })
    }

    setBulkLoading(false)
  }

  const resetBulkUpload = () => {
    setCsvFile(null)
    setCsvData([])
    setCsvPreview([])
    setBulkProgress(0)
    setBulkResults({ success: 0, failed: 0, errors: [] })
    setMessage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const createUser = async () => {
    if (!email || !password || !fullName) {
      setMessage({ type: 'error', text: 'Please fill in all required fields' })
      return
    }

    setLoading(true)
    setMessage(null)

    try {
      const { data, error } = await supabase.functions.invoke('admin-user-management/create-user', {
        body: {
          email,
          password,
          fullName,
          role,
          department
        }
      })
      
      if (error) throw error
      
      setMessage({ type: 'success', text: data.message })
      
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
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Admin Panel - User Management
            </CardTitle>
            <CardDescription>
              Create single users or bulk upload via CSV file
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Tabs defaultValue="single" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="single" className="flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  Single User
                </TabsTrigger>
                <TabsTrigger value="bulk" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Bulk Upload
                </TabsTrigger>
              </TabsList>

              {/* Single User Creation Tab */}
              <TabsContent value="single" className="space-y-4">
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
              </TabsContent>

              {/* Bulk Upload Tab */}
              <TabsContent value="bulk" className="space-y-4">
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

                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Button
                      onClick={downloadTemplate}
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Download CSV Template
                    </Button>
                  </div>

                  <div className="border-2 border-dashed border-border rounded-lg p-6">
                    <div className="text-center">
                      <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                      <div className="mt-2">
                        <Label htmlFor="csvFile" className="cursor-pointer">
                          <span className="text-sm text-muted-foreground">
                            Click to upload CSV file or drag and drop
                          </span>
                        </Label>
                        <Input
                          id="csvFile"
                          ref={fileInputRef}
                          type="file"
                          accept=".csv"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </div>
                      {csvFile && (
                        <p className="mt-2 text-sm text-green-600">
                          Selected: {csvFile.name}
                        </p>
                      )}
                    </div>
                  </div>

                  {csvPreview.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Preview (First 5 rows):</h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full border border-border rounded-md">
                          <thead className="bg-muted">
                            <tr>
                              <th className="px-4 py-2 text-left text-sm font-medium">Email</th>
                              <th className="px-4 py-2 text-left text-sm font-medium">Full Name</th>
                              <th className="px-4 py-2 text-left text-sm font-medium">Role</th>
                              <th className="px-4 py-2 text-left text-sm font-medium">Department</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border">
                            {csvPreview.map((user, index) => (
                              <tr key={index}>
                                <td className="px-4 py-2 text-sm">{user.email}</td>
                                <td className="px-4 py-2 text-sm">{user.full_name}</td>
                                <td className="px-4 py-2 text-sm">{user.role}</td>
                                <td className="px-4 py-2 text-sm">{user.department}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      {csvData.length > 5 && (
                        <p className="text-sm text-muted-foreground mt-2">
                          ... and {csvData.length - 5} more users
                        </p>
                      )}
                    </div>
                  )}

                  {csvData.length > 0 && (
                    <div className="space-y-4">
                      {bulkLoading && (
                        <div>
                          <div className="flex justify-between text-sm text-muted-foreground mb-2">
                            <span>Creating users...</span>
                            <span>{Math.round(bulkProgress)}%</span>
                          </div>
                          <Progress value={bulkProgress} className="w-full" />
                        </div>
                      )}

                      {bulkResults.success > 0 || bulkResults.failed > 0 ? (
                        <div className="space-y-2">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-green-500/10 p-3 rounded-md">
                              <p className="text-sm font-medium text-green-700">
                                ✅ Success: {bulkResults.success}
                              </p>
                            </div>
                            <div className="bg-destructive/10 p-3 rounded-md">
                              <p className="text-sm font-medium text-destructive">
                                ❌ Failed: {bulkResults.failed}
                              </p>
                            </div>
                          </div>
                          
                          {bulkResults.errors.length > 0 && (
                            <div className="bg-destructive/10 p-3 rounded-md">
                              <p className="text-sm font-medium text-destructive mb-2">Errors:</p>
                              <div className="max-h-32 overflow-y-auto">
                                {bulkResults.errors.map((error, index) => (
                                  <p key={index} className="text-xs text-destructive/80">• {error}</p>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ) : null}

                      <div className="flex gap-2">
                        <Button
                          onClick={bulkCreateUsers}
                          disabled={bulkLoading}
                          className="flex-1"
                        >
                          {bulkLoading ? 'Creating Users...' : `Create ${csvData.length} Users`}
                        </Button>
                        <Button
                          onClick={resetBulkUpload}
                          variant="outline"
                          disabled={bulkLoading}
                        >
                          Reset
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-sm text-muted-foreground bg-secondary p-3 rounded-md">
              <strong>CSV Format:</strong> Required columns: email, full_name, password. Optional: role (employee/qa_officer/manager/admin), department. 
              Download the template above for the correct format.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}