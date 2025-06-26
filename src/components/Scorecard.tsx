
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { User, Calendar, AlertTriangle, CheckCircle, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

interface ScorecardItem {
  id: string;
  category: string;
  description: string;
  score: 'pass' | 'fail' | 'na' | null;
  subItems?: ScorecardItem[];
}

const Scorecard: React.FC = () => {
  const { user } = useAuth();
  const [employeeName, setEmployeeName] = useState('Jane Doe');
  const [caseReference, setCaseReference] = useState('IVAT23456');
  const [auditDate, setAuditDate] = useState('24/08/2025');
  const [auditorName, setAuditorName] = useState('John Smith');
  const [generalComments, setGeneralComments] = useState('');
  
  // Auditor's Comments
  const [summaryQuery, setSummaryQuery] = useState('');
  const [positives, setPositives] = useState('');
  const [negatives, setNegatives] = useState('');
  const [remarks, setRemarks] = useState('');
  
  const [scorecardData, setScorecardData] = useState<ScorecardItem[]>([
    {
      id: 'income-benefits-freq',
      category: 'Income',
      description: 'Income / Benefits frequency checked',
      score: 'pass'
    },
    {
      id: 'average-income',
      category: 'Income',
      description: 'Average income calculated correctly',
      score: 'pass'
    },
    {
      id: 'tax-return',
      category: 'Income',
      description: 'Check Tax Return, P&L (if self-employed)',
      score: 'pass'
    },
    {
      id: 'wage-slips',
      category: 'Income',
      description: 'Wage slips requested if income >10% of last review?',
      score: 'pass'
    },
    {
      id: 'benefits-freq',
      category: 'Income',
      description: 'Benefits frequency checked',
      score: 'pass',
      subItems: [
        {
          id: 'benefits-freq-sub',
          category: 'Income',
          description: 'Check regular overtime and bonuses',
          score: 'pass'
        }
      ]
    },
    {
      id: 'ytd-figure',
      category: 'Income',
      description: 'Check YTD figure for previous additional income',
      score: 'pass',
      subItems: [
        {
          id: 'unusual-tax-codes',
          category: 'Income',
          description: 'Check for unusual tax codes (K, W, M, X)',
          score: 'pass'
        }
      ]
    }
  ]);

  const [generalItems, setGeneralItems] = useState([
    { id: 'correct-ccn', description: 'Correct CCN used?', score: 'pass' as const },
    { id: 'detailed-note', description: 'Detailed case note left?', score: 'pass' as const },
    { id: 'correspondence-updated', description: 'All correspondence updated on case note?', score: 'pass' as const },
    { id: 'follow-up', description: 'Follow up', score: 'pass' as const }
  ]);

  const handleScoreChange = (itemId: string, newScore: 'pass' | 'fail' | 'na', isSubItem = false, parentId?: string) => {
    if (isSubItem && parentId) {
      setScorecardData(prev => prev.map(item => {
        if (item.id === parentId && item.subItems) {
          return {
            ...item,
            subItems: item.subItems.map(subItem => 
              subItem.id === itemId ? { ...subItem, score: newScore } : subItem
            )
          };
        }
        return item;
      }));
    } else {
      setScorecardData(prev => prev.map(item => 
        item.id === itemId ? { ...item, score: newScore } : item
      ));
    }
  };

  const handleGeneralScoreChange = (itemId: string, newScore: 'pass' | 'fail' | 'na') => {
    setGeneralItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, score: newScore } : item
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
    setScorecardData(prev => prev.map(item => ({ ...item, score: null })));
    setGeneralItems(prev => prev.map(item => ({ ...item, score: null })));
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
      description: "The scorecard has been saved successfully.",
    });
  };

  const canEdit = user?.role === 'qa_officer';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Scorecard</h1>
          <p className="text-gray-600">Quality assurance evaluation form</p>
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

      {/* Employee Information */}
      <Card>
        <CardHeader className="flex flex-row items-center space-x-2">
          <User className="h-5 w-5 text-blue-600" />
          <CardTitle>Employee Information</CardTitle>
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
          </div>
        </CardContent>
      </Card>

      {/* Mandatory Sections */}
      <Card>
        <CardHeader className="flex flex-row items-center space-x-2">
          <AlertTriangle className="h-5 w-5 text-red-600" />
          <CardTitle className="text-white bg-red-600 px-3 py-1 rounded">Mandatory Sections</CardTitle>
        </CardHeader>
      </Card>

      {/* Income Section */}
      <Card>
        <CardHeader className="flex flex-row items-center space-x-2">
          <CheckCircle className="h-5 w-5 text-blue-600" />
          <CardTitle>Income</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {scorecardData.map((item) => (
            <div key={item.id} className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium flex-1">{item.description}</span>
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
          {generalItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
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
