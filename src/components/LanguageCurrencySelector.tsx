import React from 'react';
import { Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { supportedCurrencies, currencyInfoMap } from '@/lib/currency';
import { supportedLocales } from '@/lib/i18n';
import { LanguageCurrencySelectorProps } from '@/types/app';

const LanguageCurrencySelector: React.FC<LanguageCurrencySelectorProps> = ({
  currentLocale,
  currentCurrency,
  onLocaleChange,
  onCurrencyChange,
  position = 'header',
  compact = false,
}) => {
  const { t } = useTranslation();
  
  const getLanguageName = (locale: string) => {
    const names: Record<string, string> = {
      'zh-CN': '中文',
      'en-US': 'English',
      'ja-JP': '日本語',
    };
    return names[locale] || locale;
  };
  
  const getCurrencyDisplayName = (currency: string) => {
    const info = currencyInfoMap[currency as keyof typeof currencyInfoMap];
    return currentLocale === 'zh-CN' ? info?.nameZh : info?.name;
  };
  
  if (compact) {
    return (
      <div className="flex items-center space-x-2">
        {/* 语言选择器 */}
        <div className="relative">
          <select
            value={currentLocale}
            onChange={(e) => onLocaleChange(e.target.value as any)}
            className="appearance-none bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-1 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/30"
          >
            {supportedLocales.map((locale) => (
              <option key={locale} value={locale} className="text-gray-900">
                {getLanguageName(locale)}
              </option>
            ))}
          </select>
          <Globe className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-white/60 pointer-events-none" />
        </div>
        
        {/* 货币选择器 */}
        <div className="relative">
          <select
            value={currentCurrency}
            onChange={(e) => onCurrencyChange(e.target.value as any)}
            className="appearance-none bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-1 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/30"
          >
            {supportedCurrencies.map((currency) => (
              <option key={currency} value={currency} className="text-gray-900">
                {currencyInfoMap[currency].symbol} {currency}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`flex ${position === 'header' ? 'items-center space-x-4' : 'flex-col space-y-4'}`}>
      {/* 语言选择器 */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-200">
          {t('ui.buttons.switchLanguage')}
        </label>
        <div className="relative">
          <select
            value={currentLocale}
            onChange={(e) => onLocaleChange(e.target.value as any)}
            className="appearance-none bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 w-full"
          >
            {supportedLocales.map((locale) => (
              <option key={locale} value={locale} className="text-gray-900">
                {getLanguageName(locale)}
              </option>
            ))}
          </select>
          <Globe className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60 pointer-events-none" />
        </div>
      </div>
      
      {/* 货币选择器 */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-200">
          {t('ui.buttons.switchCurrency')}
        </label>
        <div className="relative">
          <select
            value={currentCurrency}
            onChange={(e) => onCurrencyChange(e.target.value as any)}
            className="appearance-none bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 w-full"
          >
            {supportedCurrencies.map((currency) => (
              <option key={currency} value={currency} className="text-gray-900">
                {currencyInfoMap[currency].symbol} {getCurrencyDisplayName(currency)}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default LanguageCurrencySelector;