
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from '@/hooks/use-toast';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await login(email, password);
      toast({
        title: "Success",
        description: "Welcome to QA Interface!",
      });
    } catch (err) {
      setError('Invalid email or password');
      toast({
        title: "Error",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    }
  };

  const demoAccounts = [
    { email: 'john.smith@company.com', role: 'QA Officer', password: 'Use any password' },
    { email: 'sarah.johnson@company.com', role: 'Manager', password: 'Use any password' },
    { email: 'jane.doe@company.com', role: 'Employee', password: 'Use any password' }
  ];

  const handleDemoLogin = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('demo123');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md space-y-6">
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-900">QA Interface</CardTitle>
            <CardDescription>Sign in to access your account</CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-2 border-blue-200">
          <CardHeader>
            <CardTitle className="text-lg text-blue-800">🚀 Demo Accounts - Click to Use</CardTitle>
            <CardDescription className="text-blue-600 font-medium">
              Click any email below to auto-fill the login form
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {demoAccounts.map((account, index) => (
              <div 
                key={index} 
                className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 cursor-pointer transition-colors"
                onClick={() => handleDemoLogin(account.email)}
              >
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-blue-900">{account.email}</span>
                  <span className="text-xs text-blue-600">{account.role}</span>
                </div>
                <span className="text-xs text-green-600 font-medium">{account.password}</span>
              </div>
            ))}
            <div className="text-center pt-2">
              <p className="text-xs text-gray-500">
                💡 Tip: Click any email above to auto-fill the form, then click "Sign In"
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;
