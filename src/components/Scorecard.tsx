import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { User, Calendar, AlertTriangle, CheckCircle, X, Building2, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { scorecardData } from '@/data/scorecardData';
import { ScorecardItem, GeneralItem } from '@/types/scorecard';
import { supabase } from '@/integrations/supabase/client';

interface ScorecardProps {
  preSelectedDepartment?: string;
  preSelectedEmployee?: string;
  onBack?: () => void;
}

const Scorecard: React.FC<ScorecardProps> = ({ preSelectedDepartment, preSelectedEmployee, onBack }) => {
  const { user } = useAuth();
  
  // Map department names to scorecard IDs
  const getDepartmentScorecard = (departmentName: string) => {
    const mappings: { [key: string]: string } = {
      'Customer Support': 'customer-support-call',
      'Customer Relations': 'customer-relations-email', 
      'Financial Reviews': 'financial-reviews',
      'Closures': 'closures'
    };
    
    return mappings[departmentName] || scorecardData[0].id;
  };
  
  // Initialize with preselected values or defaults
  const defaultDepartmentId = preSelectedDepartment 
    ? getDepartmentScorecard(preSelectedDepartment)
    : scorecardData[0].id;
    
  const [selectedDepartment, setSelectedDepartment] = useState(defaultDepartmentId);
  const [employeeName, setEmployeeName] = useState(preSelectedEmployee || 'Jane Doe');
  const [caseReference, setCaseReference] = useState('IVAT23456');
  const [auditDate, setAuditDate] = useState('24/08/2025');
  const [auditorName, setAuditorName] = useState('John Smith');
  const [generalComments, setGeneralComments] = useState('');
  const [employees, setEmployees] = useState<Array<{name: string, department: string}>>([]);
  const [actualEmployeeDepartment, setActualEmployeeDepartment] = useState<string>('');
  
  // Auditor's Comments
  const [summaryQuery, setSummaryQuery] = useState('');
  const [positives, setPositives] = useState('');
  const [negatives, setNegatives] = useState('');
  const [remarks, setRemarks] = useState('');
  
  // State for each department's scorecard data
  const [departmentData, setDepartmentData] = useState(() => {
    const initialData: Record<string, { mandatory: ScorecardItem[], general: GeneralItem[] }> = {};
    scorecardData.forEach(dept => {
      initialData[dept.id] = {
        mandatory: JSON.parse(JSON.stringify(dept.sections.mandatory)),
        general: JSON.parse(JSON.stringify(dept.sections.general))
      };
    });
    return initialData;
  });

  // Fetch employees from database
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const { data: employeeData, error } = await supabase
          .from('employees')
          .select('name, department')
          .eq('status', 'active');

        if (error) {
          console.error('Error fetching employees:', error);
          return;
        }

        if (employeeData) {
          setEmployees(employeeData);
          
          // Find the current employee's actual department
          const currentEmployee = employeeData.find(emp => emp.name === employeeName);
          if (currentEmployee) {
            setActualEmployeeDepartment(currentEmployee.department);
          }
        }
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, [employeeName]);

  const currentDepartment = scorecardData.find(dept => dept.id === selectedDepartment);
  const currentData = departmentData[selectedDepartment];

  const handleScoreChange = (itemId: string, newScore: 'pass' | 'fail' | 'na', isSubItem = false, parentId?: string) => {
    setDepartmentData(prev => ({
      ...prev,
      [selectedDepartment]: {
        ...prev[selectedDepartment],
        mandatory: prev[selectedDepartment].mandatory.map(item => {
          if (isSubItem && parentId && item.id === parentId && item.subItems) {
            return {
              ...item,
              subItems: item.subItems.map(subItem => 
                subItem.id === itemId ? { ...subItem, score: newScore } : subItem
              )
            };
          } else if (!isSubItem && item.id === itemId) {
            return { ...item, score: newScore };
          }
          return item;
        })
      }
    }));
  };

  const handleGeneralScoreChange = (itemId: string, newScore: 'pass' | 'fail' | 'na') => {
    setDepartmentData(prev => ({
      ...prev,
      [selectedDepartment]: {
        ...prev[selectedDepartment],
        general: prev[selectedDepartment].general.map(item => 
          item.id === itemId ? { ...item, score: newScore } : item
        )
      }
    }));
  };

  const getScoreButtonClass = (score: 'pass' | 'fail' | 'na', currentScore: 'pass' | 'fail' | 'na' | null) => {
    const baseClass = "px-3 py-1 rounded text-sm font-medium transition-colors";
    const isActive = currentScore === score;
    
    switch (score) {
      case 'pass':
        return `${baseClass} ${isActive ? 'bg-green-600 text-white' : 'bg-green-100 text-green-700 hover:bg-green-200'}`;
      case 'fail':
        return `${baseClass} ${isActive ? 'bg-red-600 text-white' : 'bg-red-100 text-red-700 hover:bg-red-200'}`;
      case 'na':
        return `${baseClass} ${isActive ? 'bg-gray-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`;
      default:
        return baseClass;
    }
  };

  const handleClearData = () => {
    setDepartmentData(prev => {
      const newData = { ...prev };
      Object.keys(newData).forEach(deptId => {
        newData[deptId] = {
          mandatory: newData[deptId].mandatory.map(item => ({ 
            ...item, 
            score: null,
            subItems: item.subItems?.map(sub => ({ ...sub, score: null }))
          })),
          general: newData[deptId].general.map(item => ({ ...item, score: null }))
        };
      });
      return newData;
    });
    setGeneralComments('');
    setSummaryQuery('');
    setPositives('');
    setNegatives('');
    setRemarks('');
    toast({
      title: "Data Cleared",
      description: "All scorecard data has been cleared.",
    });
  };

  const handleSave = () => {
    toast({
      title: "Scorecard Saved",
      description: `The ${currentDepartment?.name} scorecard has been saved successfully.`,
    });
  };

  const canEdit = user?.role === 'qa_officer' || user?.role === 'manager';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {onBack && (
            <Button variant="outline" onClick={onBack} className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Button>
          )}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Quality Scorecard</h1>
            <p className="text-gray-600">Quality assurance evaluation form</p>
          </div>
        </div>
        {canEdit && (
          <Button 
            variant="destructive" 
            onClick={handleClearData}
            className="flex items-center space-x-2"
          >
            <X className="h-4 w-4" />
            <span>Clear All Data</span>
          </Button>
        )}
      </div>

      {/* Scorecard Selection */}
      <Card>
        <CardHeader className="flex flex-row items-center space-x-2">
          <Building2 className="h-5 w-5 text-purple-600" />
          <CardTitle>Scorecard Selection</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="scorecard-select">Select Scorecard</Label>
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger id="scorecard-select" className="w-full md:w-80">
                <SelectValue placeholder="Select a scorecard" />
              </SelectTrigger>
              <SelectContent className="bg-white border shadow-lg z-50">
                {scorecardData.map((dept) => (
                  <SelectItem key={dept.id} value={dept.id}>
                    {dept.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Employee Information */}
      <Card>
        <CardHeader className="flex flex-row items-center space-x-2">
          <User className="h-5 w-5 text-blue-600" />
          <CardTitle>Employee Information</CardTitle>
          <Badge variant="outline" className="ml-auto">
            {currentDepartment?.name}
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="employee-name">Employee Name</Label>
              <Input
                id="employee-name"
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
                disabled={!canEdit}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="case-reference">Case Reference</Label>
              <Input
                id="case-reference"
                value={caseReference}
                onChange={(e) => setCaseReference(e.target.value)}
                disabled={!canEdit}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="audit-date">Audit Date</Label>
              <Input
                id="audit-date"
                type="date"
                value={auditDate}
                onChange={(e) => setAuditDate(e.target.value)}
                disabled={!canEdit}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="auditor-name">Auditor Name</Label>
              <Input
                id="auditor-name"
                value={auditorName}
                onChange={(e) => setAuditorName(e.target.value)}
                disabled={!canEdit}
              />
            </div>
            {/* Department field - read-only, shows employee's actual department */}
            <div className="space-y-2">
              <Label htmlFor="employee-department">Department</Label>
              <Input
                id="employee-department"
                value={actualEmployeeDepartment || ''}
                disabled={true}
                className="bg-gray-50"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mandatory Sections */}
      <Card>
        <CardHeader className="flex flex-row items-center space-x-2">
          <AlertTriangle className="h-5 w-5 text-red-600" />
          <CardTitle className="text-white bg-red-600 px-3 py-1 rounded">Mandatory Sections</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentData?.mandatory.map((item) => (
            <div key={item.id} className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="text-sm font-medium flex-1">
                  <ul className="list-disc list-inside space-y-1">
                    <li>{item.description}</li>
                  </ul>
                </div>
                <div className="flex space-x-2 ml-4">
                  <button
                    className={getScoreButtonClass('pass', item.score)}
                    onClick={() => canEdit && handleScoreChange(item.id, 'pass')}
                    disabled={!canEdit}
                  >
                    Pass
                  </button>
                  <button
                    className={getScoreButtonClass('fail', item.score)}
                    onClick={() => canEdit && handleScoreChange(item.id, 'fail')}
                    disabled={!canEdit}
                  >
                    Fail
                  </button>
                  <button
                    className={getScoreButtonClass('na', item.score)}
                    onClick={() => canEdit && handleScoreChange(item.id, 'na')}
                    disabled={!canEdit}
                  >
                    N/A
                  </button>
                </div>
              </div>
              
              {item.subItems?.map((subItem) => (
                <div key={subItem.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg ml-6">
                  <span className="text-sm flex-1">└ {subItem.description}</span>
                  <div className="flex space-x-2 ml-4">
                    <button
                      className={getScoreButtonClass('pass', subItem.score)}
                      onClick={() => canEdit && handleScoreChange(subItem.id, 'pass', true, item.id)}
                      disabled={!canEdit}
                    >
                      Pass
                    </button>
                    <button
                      className={getScoreButtonClass('fail', subItem.score)}
                      onClick={() => canEdit && handleScoreChange(subItem.id, 'fail', true, item.id)}
                      disabled={!canEdit}
                    >
                      Fail
                    </button>
                    <button
                      className={getScoreButtonClass('na', subItem.score)}
                      onClick={() => canEdit && handleScoreChange(subItem.id, 'na', true, item.id)}
                      disabled={!canEdit}
                    >
                      N/A
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* General Section */}
      <Card>
        <CardHeader className="flex flex-row items-center space-x-2">
          <CheckCircle className="h-5 w-5 text-orange-600" />
          <CardTitle>General</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentData?.general.map((item) => (
            <div key={item.id} className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium flex-1">{item.description}</span>
                <div className="flex space-x-2 ml-4">
                  <button
                    className={getScoreButtonClass('pass', item.score)}
                    onClick={() => canEdit && handleGeneralScoreChange(item.id, 'pass')}
                    disabled={!canEdit}
                  >
                    Pass
                  </button>
                  <button
                    className={getScoreButtonClass('fail', item.score)}
                    onClick={() => canEdit && handleGeneralScoreChange(item.id, 'fail')}
                    disabled={!canEdit}
                  >
                    Fail
                  </button>
                  <button
                    className={getScoreButtonClass('na', item.score)}
                    onClick={() => canEdit && handleGeneralScoreChange(item.id, 'na')}
                    disabled={!canEdit}
                  >
                    N/A
                  </button>
                </div>
              </div>
              
              {item.subItems && (
                <div className="ml-6 space-y-2">
                  {item.subItems.map((subText, index) => (
                    <div key={index} className="text-sm text-gray-600 p-2 bg-blue-50 rounded">
                      └ {subText}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          
          <div className="mt-4">
            <Label htmlFor="general-comments">Add comments for General section...</Label>
            <Textarea
              id="general-comments"
              value={generalComments}
              onChange={(e) => setGeneralComments(e.target.value)}
              placeholder="Add comments for General section..."
              className="mt-2"
              disabled={!canEdit}
            />
          </div>
        </CardContent>
      </Card>

      {/* Auditor's Comments */}
      <Card className="bg-slate-800 text-white">
        <CardHeader className="flex flex-row items-center space-x-2">
          <CheckCircle className="h-5 w-5 text-white" />
          <CardTitle className="text-white">Auditor's Comments</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label className="text-white mb-2 block">Summary of Query</Label>
            <Textarea
              value={summaryQuery}
              onChange={(e) => setSummaryQuery(e.target.value)}
              placeholder="Provide a concise summary of the audit query..."
              className="bg-slate-700 border-slate-600 text-white placeholder-gray-400"
              disabled={!canEdit}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-white mb-2 block">Positives</Label>
              <Textarea
                value={positives}
                onChange={(e) => setPositives(e.target.value)}
                placeholder="List the positive findings..."
                className="bg-slate-700 border-slate-600 text-white placeholder-gray-400"
                disabled={!canEdit}
              />
            </div>
            <div>
              <Label className="text-white mb-2 block">Negatives</Label>
              <Textarea
                value={negatives}
                onChange={(e) => setNegatives(e.target.value)}
                placeholder="List the negative findings..."
                className="bg-slate-700 border-slate-600 text-white placeholder-gray-400"
                disabled={!canEdit}
              />
            </div>
          </div>
          
          <div>
            <Label className="text-white mb-2 block">Remarks / Observations / Suggestions</Label>
            <Textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Provide any final remarks or suggestions for improvement..."
              className="bg-slate-700 border-slate-600 text-white placeholder-gray-400"
              disabled={!canEdit}
            />
          </div>
        </CardContent>
      </Card>

      {canEdit && (
        <div className="flex justify-end space-x-4">
          <Button variant="outline" onClick={handleClearData}>
            Clear All
          </Button>
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
            Save Scorecard
          </Button>
        </div>
      )}
    </div>
  );
};

export default Scorecard;
