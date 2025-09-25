'use client';

import { useTranslations } from 'next-intl';
import { Users, BookOpen, CreditCard, TrendingUp } from 'lucide-react';

export function Dashboard() {
  const t = useTranslations('dashboard');

  const stats = [
    {
      name: 'Total Students',
      value: '2,847',
      icon: Users,
      change: '+12%',
      changeType: 'positive',
    },
    {
      name: 'Active Courses',
      value: '156',
      icon: BookOpen,
      change: '+3%',
      changeType: 'positive',
    },
    {
      name: 'Revenue (ETB)',
      value: '₹2.4M',
      icon: CreditCard,
      change: '+8%',
      changeType: 'positive',
    },
    {
      name: 'Enrollment Rate',
      value: '94.2%',
      icon: TrendingUp,
      change: '+2.1%',
      changeType: 'positive',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{t('title')}</h1>
        <p className="text-gray-600 mt-1">{t('welcome')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {stat.value}
                  </p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span
                  className={`text-sm font-medium ${
                    stat.changeType === 'positive'
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500 ml-2">from last month</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {t('overview')}
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-600">Active Students</span>
              <span className="font-medium">2,847</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-600">Faculty Members</span>
              <span className="font-medium">142</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-600">Departments</span>
              <span className="font-medium">12</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-600">Campuses</span>
              <span className="font-medium">3</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {t('quickActions')}
          </h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="font-medium text-gray-900">Enroll New Student</div>
              <div className="text-sm text-gray-600">Add a new student to the system</div>
            </button>
            <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="font-medium text-gray-900">Create Course</div>
              <div className="text-sm text-gray-600">Set up a new course offering</div>
            </button>
            <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="font-medium text-gray-900">Generate Report</div>
              <div className="text-sm text-gray-600">Create academic or financial reports</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
