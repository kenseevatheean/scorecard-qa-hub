import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { User, Calendar, AlertTriangle, CheckCircle, X, Building2, ArrowLeft, TrendingUp } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface ScorecardItem {
  id: string;
  item_id: string;
  section_type: 'mandatory' | 'procedural';
  category?: string;
  description: string;
  score?: 'pass' | 'fail' | 'na' | null;
}

interface ScorecardProps {
  preSelectedDepartment?: string;
  preSelectedEmployee?: string;
  onBack?: () => void;
}

const Scorecard: React.FC<ScorecardProps> = ({ preSelectedDepartment, preSelectedEmployee, onBack }) => {
  const { user } = useAuth();
  
  // State for scorecards and items loaded from database
  const [scorecards, setScorecards] = useState<Array<{id: string, name: string, department: string}>>([]);
  const [scorecardItems, setScorecardItems] = useState<ScorecardItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [itemsLoading, setItemsLoading] = useState(false);
  
  // Initialize with preselected values or defaults
  const [selectedScorecardId, setSelectedScorecardId] = useState('');
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
  const [caseReference, setCaseReference] = useState('IVAT23456');
  const [auditDate, setAuditDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // Returns YYYY-MM-DD format
  });
  const [auditorName, setAuditorName] = useState('John Smith');
  const [generalComments, setGeneralComments] = useState('');
  const [employees, setEmployees] = useState<Array<{id: string, name: string, department: string}>>([]);
  const [auditResultId, setAuditResultId] = useState<string | null>(null);
  const [auditStatus, setAuditStatus] = useState<'draft' | 'completed'>('draft');
  
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
          .select('id, name, department')
          .eq('status', 'active');

        if (error) {
          console.error('Error fetching employees:', error);
          return;
        }

        if (employeeData) {
          setEmployees(employeeData);
          
          // If preSelectedEmployee is provided, try to find matching employee
          if (preSelectedEmployee && !selectedEmployeeId) {
            const matchingEmployee = employeeData.find(emp => 
              emp.name.toLowerCase() === preSelectedEmployee.toLowerCase()
            );
            if (matchingEmployee) {
              setSelectedEmployeeId(matchingEmployee.id);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, [preSelectedEmployee]);

  // Fetch scorecard items when a scorecard is selected
  useEffect(() => {
    const fetchScorecardItems = async () => {
      if (!selectedScorecardId) return;
      
      setItemsLoading(true);
      try {
        const { data: itemsData, error } = await supabase
          .from('scorecard_items')
          .select('*')
          .eq('scorecard_id', selectedScorecardId)
          .order('item_id');

        if (error) {
          console.error('Error fetching scorecard items:', error);
          return;
        }

        if (itemsData) {
          // Initialize items with null scores and proper typing
          const itemsWithScores: ScorecardItem[] = itemsData.map(item => ({
            id: item.id,
            item_id: item.item_id,
            section_type: item.section_type as 'mandatory' | 'procedural',
            category: item.category || undefined,
            description: item.description,
            score: null
          }));
          setScorecardItems(itemsWithScores);
        }
      } catch (error) {
        console.error('Error fetching scorecard items:', error);
      } finally {
        setItemsLoading(false);
      }
    };

    fetchScorecardItems();
  }, [selectedScorecardId]);

  const currentScorecard = scorecards.find(sc => sc.id === selectedScorecardId);

  const handleScoreChange = (itemId: string, newScore: 'pass' | 'fail' | 'na') => {
    setScorecardItems(prev => prev.map(item => 
      item.item_id === itemId ? { ...item, score: newScore } : item
    ));
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
    // Reset all scorecard item scores
    setScorecardItems(prev => prev.map(item => ({ ...item, score: null })));
    toast({
      title: "Data Cleared",
      description: "All scorecard data has been cleared.",
    });
  };

  // Calculate scores
  const calculateScores = () => {
    const mandatoryItems = scorecardItems.filter(item => item.section_type === 'mandatory');
    const proceduralItems = scorecardItems.filter(item => item.section_type === 'procedural');
    
    const mandatoryScored = mandatoryItems.filter(item => item.score && item.score !== 'na');
    const proceduralScored = proceduralItems.filter(item => item.score && item.score !== 'na');
    
    const mandatoryPassed = mandatoryItems.filter(item => item.score === 'pass').length;
    const proceduralPassed = proceduralItems.filter(item => item.score === 'pass').length;
    
    const mandatoryScore = mandatoryScored.length > 0 ? (mandatoryPassed / mandatoryScored.length) * 100 : 0;
    const proceduralScore = proceduralScored.length > 0 ? (proceduralPassed / proceduralScored.length) * 100 : 0;
    
    // Weighted scoring: 70% mandatory, 30% procedural
    const overallScore = (mandatoryScore * 0.7) + (proceduralScore * 0.3);
    
    return {
      mandatoryScore: Math.round(mandatoryScore * 100) / 100,
      proceduralScore: Math.round(proceduralScore * 100) / 100,
      overallScore: Math.round(overallScore * 100) / 100,
      mandatoryPassed,
      mandatoryTotal: mandatoryScored.length,
      proceduralPassed,
      proceduralTotal: proceduralScored.length
    };
  };

  const scores = calculateScores();

  const handleSave = async () => {
    try {
      if (!selectedEmployeeId) {
        toast({
          title: "Error",
          description: "Please select an employee.",
          variant: "destructive"
        });
        return;
      }

      const auditData = {
        employee_id: selectedEmployeeId,
        auditor_name: auditorName,
        scorecard_id: selectedScorecardId,
        audit_date: auditDate,
        overall_score: scores.overallScore,
        mandatory_score: scores.mandatoryScore,
        procedural_score: scores.proceduralScore,
        status: auditStatus,
        auditor_comments: `Summary: ${summaryQuery}\n\nPositives: ${positives}\n\nNegatives: ${negatives}\n\nRemarks: ${remarks}`
      };

      let resultId = auditResultId;

      if (auditResultId) {
        // Update existing audit
        const { error: updateError } = await supabase
          .from('audit_results')
          .update(auditData)
          .eq('id', auditResultId);

        if (updateError) throw updateError;
      } else {
        // Create new audit
        const { data: newAudit, error: insertError } = await supabase
          .from('audit_results')
          .insert(auditData)
          .select('id')
          .single();

        if (insertError) throw insertError;
        resultId = newAudit.id;
        setAuditResultId(resultId);
      }

      // Save individual item scores
      const itemScoresData = scorecardItems
        .filter(item => item.score && item.score !== null)
        .map(item => ({
          audit_result_id: resultId,
          scorecard_item_id: item.id,
          score: item.score
        }));

      if (itemScoresData.length > 0) {
        // Delete existing scores for this audit
        await supabase
          .from('audit_item_scores')
          .delete()
          .eq('audit_result_id', resultId);

        // Insert new scores
        const { error: scoresError } = await supabase
          .from('audit_item_scores')
          .insert(itemScoresData);

        if (scoresError) throw scoresError;
      }

      toast({
        title: "Scorecard Saved",
        description: `The ${currentScorecard?.name} scorecard has been saved successfully with an overall score of ${scores.overallScore}%.`,
      });
    } catch (error) {
      console.error('Error saving scorecard:', error);
      toast({
        title: "Error",
        description: "Failed to save the scorecard. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleMarkAsCompleted = async () => {
    setAuditStatus('completed');
    await handleSave();
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
              <Label htmlFor="employee-select">Employee Name</Label>
              <Select value={selectedEmployeeId} onValueChange={setSelectedEmployeeId} disabled={!canEdit}>
                <SelectTrigger id="employee-select" className="w-full">
                  <SelectValue placeholder="Select an employee" />
                </SelectTrigger>
                <SelectContent className="bg-white border shadow-lg z-50 max-h-60 overflow-y-auto">
                  {employees.map((employee) => (
                    <SelectItem key={employee.id} value={employee.id}>
                      {employee.name} - {employee.department}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                value={employees.find(emp => emp.id === selectedEmployeeId)?.department || ''}
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
          {itemsLoading ? (
            <div className="text-center py-8 text-gray-500">
              <div className="animate-spin h-8 w-8 border-b-2 border-red-600 rounded-full mx-auto mb-4"></div>
              <p>Loading assessment items...</p>
            </div>
          ) : (
            scorecardItems.filter(item => item.section_type === 'mandatory').length > 0 ? (
              scorecardItems
                .filter(item => item.section_type === 'mandatory')
                .map((item, index) => (
                  <div key={item.id} className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded">
                            {index + 1}
                          </span>
                          {item.category && (
                            <Badge variant="outline" className="text-xs">
                              {item.category}
                            </Badge>
                          )}
                        </div>
                         <div className="text-base text-gray-800 leading-relaxed font-medium">
                          {item.description.includes('Case note,Correct CNC used?,Detailed case note left?,Case note reflect conversation?,All correspondences updated on case note?') ? (
                            <div className="space-y-1">
                              <div className="font-semibold text-gray-900">Case Note</div>
                              <div className="flex items-center space-x-2 text-gray-700">
                                <span className="text-gray-400">→</span>
                                <span>Correct CNC used?</span>
                              </div>
                              <div className="flex items-center space-x-2 text-gray-700">
                                <span className="text-gray-400">→</span>
                                <span>Detailed case note left?</span>
                              </div>
                              <div className="flex items-center space-x-2 text-gray-700">
                                <span className="text-gray-400">→</span>
                                <span>Case Note reflect conversation?</span>
                              </div>
                              <div className="flex items-center space-x-2 text-gray-700">
                                <span className="text-gray-400">→</span>
                                <span>All correspondences updated on case note?</span>
                              </div>
                            </div>
                          ) : (
                            item.description
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 mt-3">
                      <button
                        onClick={() => handleScoreChange(item.item_id, 'pass')}
                        className={getScoreButtonClass('pass', item.score)}
                        disabled={!canEdit}
                      >
                        Pass
                      </button>
                      <button
                        onClick={() => handleScoreChange(item.item_id, 'fail')}
                        className={getScoreButtonClass('fail', item.score)}
                        disabled={!canEdit}
                      >
                        Fail
                      </button>
                      <button
                        onClick={() => handleScoreChange(item.item_id, 'na')}
                        className={getScoreButtonClass('na', item.score)}
                        disabled={!canEdit}
                      >
                        N/A
                      </button>
                    </div>
                  </div>
                ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-lg font-medium mb-2">No Assessment Items</p>
                <p className="text-sm">
                  No mandatory assessment items found for <strong>{currentScorecard?.name}</strong>.
                </p>
              </div>
            )
          )}
        </CardContent>
      </Card>

      {/* Procedural Section */}
      <Card>
        <CardHeader className="flex flex-row items-center space-x-2">
          <CheckCircle className="h-5 w-5 text-blue-600" />
          <CardTitle className="text-white bg-blue-600 px-3 py-1 rounded">Procedural Sections</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {itemsLoading ? (
            <div className="text-center py-8 text-gray-500">
              <div className="animate-spin h-8 w-8 border-b-2 border-blue-600 rounded-full mx-auto mb-4"></div>
              <p>Loading procedural items...</p>
            </div>
          ) : (
            scorecardItems.filter(item => item.section_type === 'procedural').length > 0 ? (
              scorecardItems
                .filter(item => item.section_type === 'procedural')
                .map((item, index) => (
                  <div key={item.id} className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
                            {index + 1}
                          </span>
                          {item.category && (
                            <Badge variant="outline" className="text-xs">
                              {item.category}
                            </Badge>
                          )}
                        </div>
                         <div className="text-base text-gray-800 leading-relaxed font-medium">
                          {item.description.includes('Case note,Correct CNC used?,Detailed case note left?,Case note reflect conversation?,All correspondences updated on case note?') ? (
                            <div className="space-y-1">
                              <div className="font-semibold text-gray-900">Case Note</div>
                              <div className="flex items-center space-x-2 text-gray-700">
                                <span className="text-gray-400">→</span>
                                <span>Correct CNC used?</span>
                              </div>
                              <div className="flex items-center space-x-2 text-gray-700">
                                <span className="text-gray-400">→</span>
                                <span>Detailed case note left?</span>
                              </div>
                              <div className="flex items-center space-x-2 text-gray-700">
                                <span className="text-gray-400">→</span>
                                <span>Case Note reflect conversation?</span>
                              </div>
                              <div className="flex items-center space-x-2 text-gray-700">
                                <span className="text-gray-400">→</span>
                                <span>All correspondences updated on case note?</span>
                              </div>
                            </div>
                          ) : (
                            item.description
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 mt-3">
                      <button
                        onClick={() => handleScoreChange(item.item_id, 'pass')}
                        className={getScoreButtonClass('pass', item.score)}
                        disabled={!canEdit}
                      >
                        Pass
                      </button>
                      <button
                        onClick={() => handleScoreChange(item.item_id, 'fail')}
                        className={getScoreButtonClass('fail', item.score)}
                        disabled={!canEdit}
                      >
                        Fail
                      </button>
                      <button
                        onClick={() => handleScoreChange(item.item_id, 'na')}
                        className={getScoreButtonClass('na', item.score)}
                        disabled={!canEdit}
                      >
                        N/A
                      </button>
                    </div>
                  </div>
                ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <CheckCircle className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-lg font-medium mb-2">No Procedural Items</p>
                <p className="text-sm">
                  No procedural assessment items found for <strong>{currentScorecard?.name}</strong>.
                </p>
              </div>
            )
          )}
        </CardContent>
      </Card>

      {/* Real-time Scoring Section */}
      <Card>
        <CardHeader className="flex flex-row items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-green-600" />
          <CardTitle>Audit Score</CardTitle>
          <Badge variant={scores.overallScore >= 80 ? "default" : scores.overallScore >= 60 ? "secondary" : "destructive"} className="ml-auto">
            {scores.overallScore}% Overall
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Overall Score */}
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {scores.overallScore}%
              </div>
              <div className="text-sm text-gray-600 mb-2">Overall Score</div>
              <div className={`text-sm font-medium ${
                scores.overallScore >= 80 ? 'text-green-600' : 
                scores.overallScore >= 60 ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {scores.overallScore >= 80 ? 'Excellent' : 
                 scores.overallScore >= 60 ? 'Good' : 'Needs Improvement'}
              </div>
            </div>

            {/* Mandatory Score */}
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-800 mb-1">
                {scores.mandatoryScore}%
              </div>
              <div className="text-sm text-gray-600 mb-2">Mandatory (70% weight)</div>
              <div className="text-xs text-gray-500">
                {scores.mandatoryPassed} / {scores.mandatoryTotal} passed
              </div>
            </div>

            {/* Procedural Score */}
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-800 mb-1">
                {scores.proceduralScore}%
              </div>
              <div className="text-sm text-gray-600 mb-2">Procedural (30% weight)</div>
              <div className="text-xs text-gray-500">
                {scores.proceduralPassed} / {scores.proceduralTotal} passed
              </div>
            </div>
          </div>

          {/* Status and Actions */}
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Badge variant={auditStatus === 'completed' ? 'default' : 'secondary'}>
                {auditStatus === 'completed' ? 'Completed' : 'Draft'}
              </Badge>
              {auditResultId && (
                <span className="text-sm text-gray-500">
                  Audit ID: {auditResultId.slice(0, 8)}...
                </span>
              )}
            </div>
            {canEdit && auditStatus === 'draft' && (
              <Button onClick={handleMarkAsCompleted} variant="default" className="bg-green-600 hover:bg-green-700">
                Mark as Completed
              </Button>
            )}
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
