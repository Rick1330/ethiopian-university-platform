'use client';

import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Globe } from 'lucide-react';

export function LanguageToggle() {
  const t = useTranslations('header');
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const currentLocale = pathname.split('/')[1];
    const newLocale = currentLocale === 'en' ? 'am' : 'en';
    const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    router.push(newPath);
  };

  const currentLocale = pathname.split('/')[1];
  const displayText = currentLocale === 'en' ? 'አማርኛ' : 'English';

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
      aria-label={t('languageToggle')}
    >
      <Globe className="h-4 w-4 text-gray-600" />
      <span className="text-sm font-medium text-gray-700">
        {displayText}
      </span>
    </button>
  );
}
