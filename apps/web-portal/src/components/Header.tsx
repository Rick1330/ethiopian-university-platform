'use client';

import { useTranslations } from 'next-intl';
import { Search, Menu } from 'lucide-react';
import { LanguageToggle } from './LanguageToggle';

export function Header() {
  const t = useTranslations('header');

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
            aria-label={t('userMenu')}
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">ET</span>
            </div>
            <h1 className="text-xl font-semibold text-gray-900">
              {t('appName')}
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              aria-label={t('searchPlaceholder')}
            />
          </div>
          <LanguageToggle />
        </div>
      </div>
    </header>
  );
}
