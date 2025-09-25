'use client';

import { useTranslations } from 'next-intl';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  UserPlus, 
  CreditCard, 
  FileText, 
  Settings 
} from 'lucide-react';

const navigationItems = [
  { key: 'dashboard', icon: LayoutDashboard },
  { key: 'students', icon: Users },
  { key: 'courses', icon: BookOpen },
  { key: 'enrollment', icon: UserPlus },
  { key: 'billing', icon: CreditCard },
  { key: 'reports', icon: FileText },
  { key: 'settings', icon: Settings },
];

export function Sidebar() {
  const t = useTranslations('navigation');

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <nav className="p-4">
        <ul className="space-y-2">
          {navigationItems.map(({ key, icon: Icon }) => (
            <li key={key}>
              <a
                href="#"
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  key === 'dashboard'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                aria-current={key === 'dashboard' ? 'page' : undefined}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{t(key)}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
