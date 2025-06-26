
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  BarChart3, 
  FileText, 
  MessageSquare, 
  Settings, 
  X 
} from 'lucide-react';

interface NavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, roles: ['qa_officer', 'manager'] },
    { id: 'scorecards', label: 'Scorecards', icon: FileText, roles: ['qa_officer', 'manager', 'employee'] },
    { id: 'disputes', label: 'Disputes', icon: MessageSquare, roles: ['qa_officer', 'manager'] },
    { id: 'reports', label: 'Reports', icon: BarChart3, roles: ['qa_officer', 'manager'] },
    { id: 'settings', label: 'Settings', icon: Settings, roles: ['qa_officer'] },
  ];

  const filteredItems = menuItems.filter(item => 
    item.roles.includes(user?.role || '')
  );

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex items-center justify-between p-4 border-b lg:hidden">
          <h2 className="text-lg font-semibold">Menu</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="p-4 space-y-2">
          {filteredItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              className="w-full justify-start space-x-3 hover:bg-blue-50"
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Button>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Navigation;
