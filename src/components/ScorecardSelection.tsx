import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Users, FileText } from 'lucide-react';

interface ScorecardSelectionProps {
  onStartAudit: (department: string, employee: string) => void;
}

const ScorecardSelection: React.FC<ScorecardSelectionProps> = ({ onStartAudit }) => {
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');

  const departments = [
    'Customer Support',
    'Asset Team', 
    'Creditor Services',
    'Financial Reviews',
    'Mailbox Team',
    'Customer Relations - Email',
    'Customer Support - Call'
  ];

  // Mock employee data by department
  const employeesByDepartment: { [key: string]: string[] } = {
    'Customer Support': ['Alice Johnson', 'Bob Smith', 'Carol Davis', 'David Wilson', 'Emma Brown'],
    'Asset Team': ['Frank Miller', 'Grace Taylor', 'Henry Clark', 'Iris Moore', 'Jack White'],
    'Creditor Services': ['Karen Lee', 'Liam Garcia', 'Maya Patel', 'Noah Kim', 'Olivia Chen'],
    'Financial Reviews': ['Paul Rodriguez', 'Quinn Thompson', 'Rachel Green', 'Sam Williams', 'Tara Jones'],
    'Mailbox Team': ['Uma Sharma', 'Victor Lopez', 'Wendy Martinez', 'Xavier Young', 'Yuki Tanaka'],
    'Customer Relations - Email': ['Zoe Anderson', 'Adam Cooper', 'Beth Turner', 'Chris Evans', 'Diana Prince'],
    'Customer Support - Call': ['Ethan Hunt', 'Fiona Shaw', 'George Lucas', 'Helen Parker', 'Ian Fleming']
  };

  const availableEmployees = selectedDepartment ? employeesByDepartment[selectedDepartment] || [] : [];
  
  const filteredEmployees = availableEmployees.filter(employee =>
    employee.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStartAudit = () => {
    if (selectedDepartment && selectedEmployee) {
      onStartAudit(selectedDepartment, selectedEmployee);
    }
  };

  const canStartAudit = selectedDepartment && selectedEmployee;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Start Quality Audit</h1>
        <p className="text-gray-600">Select a department and employee to begin the quality assessment</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <span>Select Department</span>
            </CardTitle>
            <CardDescription>
              Choose the department you want to audit
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="department">Department</Label>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a department..." />
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
            
            {selectedDepartment && (
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">
                  <strong>{selectedDepartment}</strong> selected
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  {availableEmployees.length} employees available
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Employee Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="h-5 w-5 text-green-600" />
              <span>Select Employee</span>
            </CardTitle>
            <CardDescription>
              Search and select the employee to audit
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="employee-search">Search Employee</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="employee-search"
                  placeholder="Type employee name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  disabled={!selectedDepartment}
                />
              </div>
            </div>

            {selectedDepartment && (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {filteredEmployees.length > 0 ? (
                  filteredEmployees.map((employee) => (
                    <div
                      key={employee}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedEmployee === employee
                          ? 'bg-green-50 border-green-200'
                          : 'bg-white border-gray-200 hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedEmployee(employee)}
                    >
                      <p className="font-medium text-sm">{employee}</p>
                      <p className="text-xs text-gray-500">{selectedDepartment}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    <p className="text-sm">
                      {searchTerm ? 'No employees found matching your search' : 'No employees available'}
                    </p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Summary and Start Button */}
      {canStartAudit && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FileText className="h-6 w-6 text-green-600" />
                <div>
                  <h3 className="font-medium text-green-900">Ready to Start Audit</h3>
                  <p className="text-sm text-green-700">
                    Department: <strong>{selectedDepartment}</strong> | Employee: <strong>{selectedEmployee}</strong>
                  </p>
                </div>
              </div>
              <Button 
                onClick={handleStartAudit}
                className="bg-green-600 hover:bg-green-700"
              >
                Start Quality Audit
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {!selectedDepartment && (
        <Card className="border-gray-200">
          <CardContent className="pt-6 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <h3 className="font-medium text-gray-600 mb-2">Select Department to Continue</h3>
            <p className="text-sm text-gray-500">
              Choose a department to see available employees and start the audit process
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ScorecardSelection;