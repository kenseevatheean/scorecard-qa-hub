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
import { supabase } from '@/integrations/supabase/client';

interface ScorecardProps {
  preSelectedDepartment?: string;
  preSelectedEmployee?: string;
  onBack?: () => void;
}

const Scorecard: React.FC<ScorecardProps> = ({ preSelectedDepartment, preSelectedEmployee, onBack }) => {
  const { user } = useAuth();
  
  // State for scorecards loaded from database
  const [scorecards, setScorecards] = useState<Array<{id: string, name: string, department: string}>>([]);
  const [loading, setLoading] = useState(true);
  
  // Initialize with preselected values or defaults
  const [selectedScorecardId, setSelectedScorecardId] = useState('');
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

  // Fetch scorecards from database
  useEffect(() => {
    const fetchScorecards = async () => {
      try {
        const { data: scorecardData, error } = await supabase
          .from('scorecards')
          .select('id, name, department')
          .order('name');

        if (error) {
          console.error('Error fetching scorecards:', error);
          return;
        }

        if (scorecardData) {
          setScorecards(scorecardData);
          
          // If preSelectedDepartment is provided, try to find a matching scorecard
          if (preSelectedDepartment && !selectedScorecardId) {
            const matchingScorecard = scorecardData.find(sc => 
              sc.department.toLowerCase() === preSelectedDepartment.toLowerCase()
            );
            if (matchingScorecard) {
              setSelectedScorecardId(matchingScorecard.id);
            } else if (scorecardData.length > 0) {
              setSelectedScorecardId(scorecardData[0].id);
            }
          } else if (scorecardData.length > 0 && !selectedScorecardId) {
            setSelectedScorecardId(scorecardData[0].id);
          }
        }
      } catch (error) {
        console.error('Error fetching scorecards:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchScorecards();
  }, [preSelectedDepartment]);

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

  const currentScorecard = scorecards.find(sc => sc.id === selectedScorecardId);

  // For now, we'll use a simple structure since we don't have items in the database yet
  const handleScoreChange = (itemId: string, newScore: 'pass' | 'fail' | 'na') => {
    // This will be implemented when we add scorecard items to the database
    console.log('Score changed for item:', itemId, 'to:', newScore);
  };

  const handleGeneralScoreChange = (itemId: string, newScore: 'pass' | 'fail' | 'na') => {
    // This will be implemented when we add scorecard items to the database
    console.log('General score changed for item:', itemId, 'to:', newScore);
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
      description: `The ${currentScorecard?.name} scorecard has been saved successfully.`,
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
            <Select value={selectedScorecardId} onValueChange={setSelectedScorecardId} disabled={loading}>
              <SelectTrigger id="scorecard-select" className="w-full md:w-80">
                <SelectValue placeholder={loading ? "Loading scorecards..." : "Select a scorecard"} />
              </SelectTrigger>
              <SelectContent className="bg-white border shadow-lg z-50 max-h-60 overflow-y-auto">
                {scorecards.map((scorecard) => (
                  <SelectItem key={scorecard.id} value={scorecard.id}>
                    {scorecard.name}
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
            {currentScorecard?.name}
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
          <div className="text-center py-8 text-gray-500">
            <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p className="text-lg font-medium mb-2">Scorecard Items Coming Soon</p>
            <p className="text-sm">
              The assessment items for <strong>{currentScorecard?.name}</strong> will be configured shortly.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* General Section */}
      <Card>
        <CardHeader className="flex flex-row items-center space-x-2">
          <CheckCircle className="h-5 w-5 text-orange-600" />
          <CardTitle>General</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center py-8 text-gray-500">
            <CheckCircle className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p className="text-lg font-medium mb-2">General Assessment Items Coming Soon</p>
            <p className="text-sm">
              The general assessment items will be available once configured.
            </p>
          </div>
          
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
