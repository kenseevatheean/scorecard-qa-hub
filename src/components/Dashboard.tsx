
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { FileText, Users, AlertTriangle, CheckCircle, TrendingUp, Calendar } from 'lucide-react';

const Dashboard: React.FC = () => {
  // Mock data for charts
  const auditsByDepartment = [
    { name: 'Customer Support', daily: 45, weekly: 280, monthly: 1120 },
    { name: 'Asset Team', daily: 32, weekly: 201, monthly: 804 },
    { name: 'Creditor Services', daily: 28, weekly: 175, monthly: 700 },
    { name: 'Financial Reviews', daily: 19, weekly: 119, monthly: 476 },
    { name: 'Mailbox Team', daily: 15, weekly: 94, monthly: 376 }
  ];

  const failReasons = [
    { name: 'Incomplete Documentation', value: 35, color: '#ef4444' },
    { name: 'Process Not Followed', value: 28, color: '#f97316' },
    { name: 'Data Entry Error', value: 22, color: '#eab308' },
    { name: 'Communication Issue', value: 15, color: '#3b82f6' }
  ];

  const weeklyTrends = [
    { week: 'Week 1', audits: 120, passes: 95, fails: 25 },
    { week: 'Week 2', audits: 135, passes: 108, fails: 27 },
    { week: 'Week 3', audits: 142, passes: 118, fails: 24 },
    { week: 'Week 4', audits: 158, passes: 131, fails: 27 }
  ];

  const disputeReasons = [
    { reason: 'Incorrect Assessment', count: 12 },
    { reason: 'Missing Context', count: 8 },
    { reason: 'Policy Clarification', count: 5 },
    { reason: 'Technical Issue', count: 3 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">QA Dashboard</h1>
          <p className="text-gray-600">Quality assurance overview and metrics</p>
        </div>
        <Badge variant="outline" className="flex items-center space-x-2">
          <Calendar className="h-4 w-4" />
          <span>Last Updated: Today</span>
        </Badge>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Audits Today</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">139</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +12% from yesterday
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pass Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">82.3%</div>
            <p className="text-xs text-muted-foreground">
              +2.1% from last week
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Disputes</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">28</div>
            <p className="text-xs text-muted-foreground">
              7 resolved today
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Auditors</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">
              Across all departments
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Audits by Department</CardTitle>
            <CardDescription>Daily, weekly, and monthly audit counts</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={auditsByDepartment}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="daily" fill="#3b82f6" name="Daily" />
                <Bar dataKey="weekly" fill="#10b981" name="Weekly" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Fail Reasons</CardTitle>
            <CardDescription>Most common reasons for audit failures</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={failReasons}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {failReasons.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Audit Trends</CardTitle>
            <CardDescription>Audit volume and pass/fail trends over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="audits" stroke="#3b82f6" name="Total Audits" />
                <Line type="monotone" dataKey="passes" stroke="#10b981" name="Passes" />
                <Line type="monotone" dataKey="fails" stroke="#ef4444" name="Fails" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dispute Accept Reasons</CardTitle>
            <CardDescription>Reasons for accepting dispute requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {disputeReasons.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{item.reason}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(item.count / 12) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600">{item.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
