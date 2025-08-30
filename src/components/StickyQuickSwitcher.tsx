import React, { useState, useEffect } from 'react';
import { Globe, ChevronDown, DollarSign } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useI18nStore } from '@/lib/currency';
import { SupportedLocale } from '@/lib/i18n';
import { SupportedCurrency } from '@/lib/currency';

// 语言信息映射
const languageInfoMap: Record<SupportedLocale, { name: string; nativeName: string; flag: string }> = {
  'zh-CN': { name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  'en-US': { name: 'English', nativeName: 'English', flag: '🇺🇸' },
  'ja-JP': { name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
};

// 货币信息映射
const currencyInfoMap: Record<SupportedCurrency, { symbol: string; name: string; flag: string }> = {
  USD: { symbol: '$', name: 'US Dollar', flag: '🇺🇸' },
  CNY: { symbol: '¥', name: 'Chinese Yuan', flag: '🇨🇳' },
  EUR: { symbol: '€', name: 'Euro', flag: '🇪🇺' },
  JPY: { symbol: '¥', name: 'Japanese Yen', flag: '🇯🇵' },
  GBP: { symbol: '£', name: 'British Pound', flag: '🇬🇧' },
};

interface StickyQuickSwitcherProps {
  className?: string;
}

export default function StickyQuickSwitcher({ className = '' }: StickyQuickSwitcherProps) {
  const { i18n } = useTranslation();
  const { locale, currency, setLocale, setCurrency } = useI18nStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);

  // 滚动检测
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    const handleClickOutside = () => {
      setIsLanguageOpen(false);
      setIsCurrencyOpen(false);
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // 初始化语言设置
  useEffect(() => {
    // 同步 i18next 语言设置
    if (i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
  }, [locale, i18n]);

  // 监听 i18n 语言变化并同步到 store
  useEffect(() => {
    const handleLanguageChanged = (lng: string) => {
      if (lng !== locale) {
        setLocale(lng as SupportedLocale);
      }
    };

    i18n.on('languageChanged', handleLanguageChanged);
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [locale, setLocale, i18n]);

  const supportedLocales: SupportedLocale[] = ['zh-CN', 'en-US', 'ja-JP'];
  const supportedCurrencies: SupportedCurrency[] = ['USD', 'CNY', 'EUR', 'JPY', 'GBP'];

  const handleLanguageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLanguageOpen(!isLanguageOpen);
    setIsCurrencyOpen(false);
  };

  const handleCurrencyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsCurrencyOpen(!isCurrencyOpen);
    setIsLanguageOpen(false);
  };

  const handleLocaleChange = (newLocale: SupportedLocale) => {
    console.log('切换语言至:', newLocale);
    // 先更新 i18next，然后同步到 store
    i18n.changeLanguage(newLocale).then(() => {
      setLocale(newLocale);
      console.log('语言切换完成:', newLocale);
      // 强制重新渲染页面内容
      window.dispatchEvent(new Event('language-changed'));
    });
    setIsLanguageOpen(false);
  };

  const handleCurrencyChange = (newCurrency: SupportedCurrency) => {
    setCurrency(newCurrency);
    setIsCurrencyOpen(false);
    console.log('货币切换至:', newCurrency);
  };

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md border-b border-neutral-200/50 shadow-soft' 
        : 'bg-transparent'
    } ${className}`}>
      <div className="max-w-12xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          {/* 左侧空间或Logo */}
          <div className="flex-1">
            {isScrolled && (
              <div className="flex items-center">
                <span className="text-lg font-bold text-primary-600">Setapp</span>
                <span className="text-sm text-neutral-600 ml-2">应用展示</span>
              </div>
            )}
          </div>
          
          {/* 右侧快速切换器 */}
          <div className="flex items-center space-x-3">
            {/* 语言切换 */}
            <div className="relative">
              <button 
                onClick={handleLanguageClick}
                className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-white/80 hover:bg-white/95 border border-neutral-200/60 hover:border-primary-300/60 transition-all duration-200 shadow-soft hover:shadow-medium backdrop-blur-sm"
              >
                <Globe className="w-4 h-4 text-neutral-600" />
                <span className="text-sm font-medium text-neutral-700 hidden sm:inline">
                  {languageInfoMap[locale].nativeName}
                </span>
                <span className="text-sm hidden sm:inline">{languageInfoMap[locale].flag}</span>
                <ChevronDown className={`w-3 h-3 text-neutral-500 transition-transform ${isLanguageOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {/* 语言下拉菜单 */}
              {isLanguageOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl border border-neutral-200 shadow-large z-60 backdrop-blur-sm">
                  {supportedLocales.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => handleLocaleChange(loc)}
                      className={`w-full text-left px-4 py-3 text-sm transition-colors first:rounded-t-xl last:rounded-b-xl flex items-center space-x-3 ${
                        loc === locale 
                          ? 'bg-primary-50 text-primary-700 font-medium' 
                          : 'text-neutral-700 hover:bg-neutral-50'
                      }`}
                    >
                      <span className="text-lg">{languageInfoMap[loc].flag}</span>
                      <div>
                        <div className="font-medium">{languageInfoMap[loc].nativeName}</div>
                        <div className="text-xs text-neutral-500">{languageInfoMap[loc].name}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* 货币切换 */}
            <div className="relative">
              <button 
                onClick={handleCurrencyClick}
                className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-white/80 hover:bg-white/95 border border-neutral-200/60 hover:border-accent-300/60 transition-all duration-200 shadow-soft hover:shadow-medium backdrop-blur-sm"
              >
                <DollarSign className="w-4 h-4 text-neutral-600" />
                <span className="text-sm font-bold text-neutral-600">
                  {currencyInfoMap[currency].symbol}
                </span>
                <span className="text-sm font-medium text-neutral-700 hidden sm:inline">
                  {currency}
                </span>
                <ChevronDown className={`w-3 h-3 text-neutral-500 transition-transform ${isCurrencyOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {/* 货币下拉菜单 */}
              {isCurrencyOpen && (
                <div className="absolute right-0 top-full mt-2 w-40 bg-white rounded-xl border border-neutral-200 shadow-large z-60 backdrop-blur-sm">
                  {supportedCurrencies.map((curr) => (
                    <button
                      key={curr}
                      onClick={() => handleCurrencyChange(curr)}
                      className={`w-full text-left px-4 py-3 text-sm transition-colors first:rounded-t-xl last:rounded-b-xl flex items-center space-x-3 ${
                        curr === currency 
                          ? 'bg-accent-50 text-accent-700 font-medium' 
                          : 'text-neutral-700 hover:bg-neutral-50'
                      }`}
                    >
                      <span className="text-lg">{currencyInfoMap[curr].flag}</span>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-base">{currencyInfoMap[curr].symbol}</span>
                          <span className="font-medium">{curr}</span>
                        </div>
                        <div className="text-xs text-neutral-500">{currencyInfoMap[curr].name}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 回到顶部按钮 */}
            {isScrolled && (
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="p-2 bg-white/80 hover:bg-white/95 text-neutral-600 hover:text-primary-600 rounded-xl transition-all duration-200 shadow-soft hover:shadow-medium border border-neutral-200/60 hover:border-primary-300/60 backdrop-blur-sm"
                title="回到顶部"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}