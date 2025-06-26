
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageSquare, Clock, CheckCircle, AlertTriangle, User, Calendar } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

interface Dispute {
  id: string;
  caseReference: string;
  employeeName: string;
  auditorName: string;
  auditDate: string;
  disputeDate: string;
  status: 'pending' | 'under_review' | 'resolved' | 'rejected';
  reason: string;
  description: string;
  response?: string;
}

const Disputes: React.FC = () => {
  const { user } = useAuth();
  const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null);
  const [response, setResponse] = useState('');
  const [newStatus, setNewStatus] = useState<string>('');

  const [disputes] = useState<Dispute[]>([
    {
      id: '1',
      caseReference: 'IVAT23456',
      employeeName: 'Jane Doe',
      auditorName: 'John Smith',
      auditDate: '2024-06-20',
      disputeDate: '2024-06-22',
      status: 'pending',
      reason: 'Incorrect Assessment',
      description: 'I believe the income calculation was incorrect as overtime was not properly accounted for in the assessment.'
    },
    {
      id: '2',
      caseReference: 'CUST78901',
      employeeName: 'Mike Johnson',
      auditorName: 'Sarah Wilson',
      auditDate: '2024-06-19',
      disputeDate: '2024-06-21',
      status: 'under_review',
      reason: 'Missing Context',
      description: 'The audit did not consider the temporary nature of the additional income source.'
    },
    {
      id: '3',
      caseReference: 'ASSET34567',
      employeeName: 'Emma Brown',
      auditorName: 'John Smith',
      auditDate: '2024-06-18',
      disputeDate: '2024-06-19',
      status: 'resolved',
      reason: 'Policy Clarification',
      description: 'Unclear on the new policy regarding benefit frequency calculations.',
      response: 'Policy has been clarified and audit score has been updated accordingly.'
    },
    {
      id: '4',
      caseReference: 'CRED45678',
      employeeName: 'David Wilson',
      auditorName: 'Lisa Parker',
      auditDate: '2024-06-17',
      disputeDate: '2024-06-18',
      status: 'rejected',
      reason: 'Technical Issue',
      description: 'System error caused incorrect data to be displayed during audit.',
      response: 'Investigation showed no system error occurred. Original audit result stands.'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'under_review':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'under_review':
        return <AlertTriangle className="h-4 w-4" />;
      case 'resolved':
        return <CheckCircle className="h-4 w-4" />;
      case 'rejected':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const handleRespondToDispute = () => {
    if (!selectedDispute || !response.trim() || !newStatus) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Response Submitted",
      description: `Dispute ${selectedDispute.id} has been updated.`,
    });

    setSelectedDispute(null);
    setResponse('');
    setNewStatus('');
  };

  const canManageDisputes = user?.role === 'qa_officer' || user?.role === 'manager';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Disputes</h1>
          <p className="text-gray-600">Manage audit dispute requests</p>
        </div>
        <Badge variant="outline" className="flex items-center space-x-2">
          <MessageSquare className="h-4 w-4" />
          <span>{disputes.filter(d => d.status === 'pending').length} Pending</span>
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Disputes List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">All Disputes</h2>
          {disputes.map((dispute) => (
            <Card 
              key={dispute.id} 
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedDispute?.id === dispute.id ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setSelectedDispute(dispute)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{dispute.caseReference}</CardTitle>
                  <Badge className={getStatusColor(dispute.status)}>
                    {getStatusIcon(dispute.status)}
                    <span className="ml-1 capitalize">{dispute.status.replace('_', ' ')}</span>
                  </Badge>
                </div>
                <CardDescription>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="flex items-center">
                      <User className="h-3 w-3 mr-1" />
                      {dispute.employeeName}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {dispute.disputeDate}
                    </span>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Reason:</span>
                    <span>{dispute.reason}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Auditor:</span>
                    <span>{dispute.auditorName}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                    {dispute.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Dispute Details */}
        <div className="space-y-4">
          {selectedDispute ? (
            <>
              <h2 className="text-xl font-semibold">Dispute Details</h2>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{selectedDispute.caseReference}</CardTitle>
                    <Badge className={getStatusColor(selectedDispute.status)}>
                      {getStatusIcon(selectedDispute.status)}
                      <span className="ml-1 capitalize">{selectedDispute.status.replace('_', ' ')}</span>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Employee:</span>
                      <p>{selectedDispute.employeeName}</p>
                    </div>
                    <div>
                      <span className="font-medium">Auditor:</span>
                      <p>{selectedDispute.auditorName}</p>
                    </div>
                    <div>
                      <span className="font-medium">Audit Date:</span>
                      <p>{selectedDispute.auditDate}</p>
                    </div>
                    <div>
                      <span className="font-medium">Dispute Date:</span>
                      <p>{selectedDispute.disputeDate}</p>
                    </div>
                  </div>
                  
                  <div>
                    <span className="font-medium">Reason:</span>
                    <p className="mt-1">{selectedDispute.reason}</p>
                  </div>
                  
                  <div>
                    <span className="font-medium">Description:</span>
                    <p className="mt-1 text-gray-700">{selectedDispute.description}</p>
                  </div>

                  {selectedDispute.response && (
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <span className="font-medium">Response:</span>
                      <p className="mt-1 text-gray-700">{selectedDispute.response}</p>
                    </div>
                  )}

                  {canManageDisputes && selectedDispute.status !== 'resolved' && selectedDispute.status !== 'rejected' && (
                    <div className="space-y-4 border-t pt-4">
                      <h3 className="font-medium">Respond to Dispute</h3>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">New Status</label>
                        <Select value={newStatus} onValueChange={setNewStatus}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select new status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="under_review">Under Review</SelectItem>
                            <SelectItem value="resolved">Resolved</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Response</label>
                        <Textarea
                          value={response}
                          onChange={(e) => setResponse(e.target.value)}
                          placeholder="Provide your response to this dispute..."
                          rows={4}
                        />
                      </div>

                      <Button onClick={handleRespondToDispute} className="w-full">
                        Submit Response
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
          ) : (
            <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
              <div className="text-center">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Select a dispute to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Disputes;
