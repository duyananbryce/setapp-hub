import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, Globe, DollarSign } from 'lucide-react';

// 简化的货币存储，暂时用本地状态代替
const useCurrencyStore = () => {
  const [currency, setCurrency] = useState('USD');
  return { currency, setCurrency };
};

interface QuickSwitcherProps {
  position?: 'header' | 'floating';
  theme?: 'light' | 'dark' | 'adaptive';
  compact?: boolean;
}

const languages = [
  { code: 'zh-CN', name: '中文', flag: '🇨🇳' },
  { code: 'en-US', name: 'English', flag: '🇺🇸' },
  { code: 'ja-JP', name: '日本語', flag: '🇯🇵' },
];

const currencies = [
  { code: 'CNY', name: '人民币', symbol: '¥' },
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'JPY', name: '日本円', symbol: '¥' },
  { code: 'GBP', name: 'Pound', symbol: '£' },
];

export default function QuickSwitcher({ 
  position = 'header', 
  theme = 'adaptive',
  compact = false 
}: QuickSwitcherProps) {
  const { i18n } = useTranslation();
  const { currency, setCurrency } = useCurrencyStore();
  
  const [languageOpen, setLanguageOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const languageRef = useRef<HTMLDivElement>(null);
  const currencyRef = useRef<HTMLDivElement>(null);
  
  // 获取当前语言和货币信息
  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];
  const currentCurrency = currencies.find(curr => curr.code === currency) || currencies[0];
  
  // 滚动检测
  useEffect(() => {
    if (position === 'floating') return;
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [position]);
  
  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (languageRef.current && !languageRef.current.contains(event.target as Node)) {
        setLanguageOpen(false);
      }
      if (currencyRef.current && !currencyRef.current.contains(event.target as Node)) {
        setCurrencyOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  // 处理语言切换
  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setLanguageOpen(false);
  };
  
  // 处理货币切换
  const handleCurrencyChange = (currencyCode: string) => {
    setCurrency(currencyCode as any);
    setCurrencyOpen(false);
  };
  
  // 获取样式类名
  const getContainerClasses = () => {
    const baseClasses = 'flex items-center space-x-3';
    
    if (position === 'floating') {
      return `fixed top-4 right-4 z-50 ${baseClasses} bg-white/80 backdrop-blur-md rounded-2xl border border-neutral-200/60 shadow-lg p-3`;
    }
    
    // Header 位置的样式
    const scrollClasses = isScrolled 
      ? 'bg-neutral-100/90 backdrop-blur-md border-b border-neutral-200/50 shadow-sm' 
      : 'bg-transparent';
    
    return `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrollClasses}`;
  };
  
  const getButtonClasses = (isActive = false) => {
    const baseClasses = `
      flex items-center space-x-2 px-3 py-2 rounded-xl 
      transition-all duration-200 font-medium text-sm
      border backdrop-blur-sm
    `;
    
    if (theme === 'dark') {
      return `${baseClasses} 
        ${isActive 
          ? 'bg-primary-600 text-white border-primary-500' 
          : 'bg-neutral-800/80 text-neutral-200 border-neutral-700/60 hover:bg-neutral-700/80'
        }`;
    }
    
    return `${baseClasses} 
      ${isActive 
        ? 'bg-primary-50 text-primary-700 border-primary-200' 
        : 'bg-white/60 text-neutral-700 border-neutral-200/60 hover:bg-white/80 hover:border-primary-300/60'
      }`;
  };
  
  const getDropdownClasses = () => {
    return `
      absolute top-full mt-2 right-0 min-w-48
      bg-white/95 backdrop-blur-md rounded-xl border border-neutral-200/60 
      shadow-lg overflow-hidden z-60
      animate-in slide-in-from-top-2 duration-200
    `;
  };
  
  if (position === 'header') {
    return (
      <div className={getContainerClasses()}>
        <div className="max-w-11xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center justify-between py-3">
            {/* 左侧占位 */}
            <div className="flex-1" />
            
            {/* 右侧快速切换器 */}
            <div className="flex items-center space-x-3">
              {/* 语言切换器 */}
              <div ref={languageRef} className="relative">
                <button
                  onClick={() => setLanguageOpen(!languageOpen)}
                  className={getButtonClasses(languageOpen)}
                >
                  <Globe className="w-4 h-4" />
                  <span className="flex items-center space-x-1">
                    <span>{currentLanguage.flag}</span>
                    {!compact && <span>{currentLanguage.name}</span>}
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                    languageOpen ? 'rotate-180' : ''
                  }`} />
                </button>
                
                {languageOpen && (
                  <div className={getDropdownClasses()}>
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`
                          w-full px-4 py-3 text-left text-sm transition-colors
                          flex items-center space-x-3
                          ${lang.code === currentLanguage.code 
                            ? 'bg-primary-50 text-primary-700 font-medium' 
                            : 'text-neutral-700 hover:bg-neutral-50'
                          }
                        `}
                      >
                        <span className="text-lg">{lang.flag}</span>
                        <span>{lang.name}</span>
                        {lang.code === currentLanguage.code && (
                          <div className="ml-auto w-2 h-2 bg-primary-600 rounded-full" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* 货币切换器 */}
              <div ref={currencyRef} className="relative">
                <button
                  onClick={() => setCurrencyOpen(!currencyOpen)}
                  className={getButtonClasses(currencyOpen)}
                >
                  <DollarSign className="w-4 h-4" />
                  <span className="flex items-center space-x-1">
                    <span>{currentCurrency.symbol}</span>
                    {!compact && <span>{currentCurrency.code}</span>}
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                    currencyOpen ? 'rotate-180' : ''
                  }`} />
                </button>
                
                {currencyOpen && (
                  <div className={getDropdownClasses()}>
                    {currencies.map((curr) => (
                      <button
                        key={curr.code}
                        onClick={() => handleCurrencyChange(curr.code)}
                        className={`
                          w-full px-4 py-3 text-left text-sm transition-colors
                          flex items-center space-x-3
                          ${curr.code === currentCurrency.code 
                            ? 'bg-primary-50 text-primary-700 font-medium' 
                            : 'text-neutral-700 hover:bg-neutral-50'
                          }
                        `}
                      >
                        <span className="font-semibold">{curr.symbol}</span>
                        <div className="flex flex-col">
                          <span>{curr.code}</span>
                          <span className="text-xs text-neutral-500">{curr.name}</span>
                        </div>
                        {curr.code === currentCurrency.code && (
                          <div className="ml-auto w-2 h-2 bg-primary-600 rounded-full" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Floating 模式
  return (
    <div className={getContainerClasses()}>
      {/* 语言切换器 */}
      <div ref={languageRef} className="relative">
        <button
          onClick={() => setLanguageOpen(!languageOpen)}
          className={getButtonClasses(languageOpen)}
        >
          <span>{currentLanguage.flag}</span>
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
            languageOpen ? 'rotate-180' : ''
          }`} />
        </button>
        
        {languageOpen && (
          <div className={getDropdownClasses()}>
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`
                  w-full px-4 py-3 text-left text-sm transition-colors
                  flex items-center space-x-3
                  ${lang.code === currentLanguage.code 
                    ? 'bg-primary-50 text-primary-700 font-medium' 
                    : 'text-neutral-700 hover:bg-neutral-50'
                  }
                `}
              >
                <span className="text-lg">{lang.flag}</span>
                <span>{lang.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
      
      {/* 货币切换器 */}
      <div ref={currencyRef} className="relative">
        <button
          onClick={() => setCurrencyOpen(!currencyOpen)}
          className={getButtonClasses(currencyOpen)}
        >
          <span>{currentCurrency.symbol}</span>
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
            currencyOpen ? 'rotate-180' : ''
          }`} />
        </button>
        
        {currencyOpen && (
          <div className={getDropdownClasses()}>
            {currencies.map((curr) => (
              <button
                key={curr.code}
                onClick={() => handleCurrencyChange(curr.code)}
                className={`
                  w-full px-4 py-3 text-left text-sm transition-colors
                  flex items-center space-x-3
                  ${curr.code === currentCurrency.code 
                    ? 'bg-primary-50 text-primary-700 font-medium' 
                    : 'text-neutral-700 hover:bg-neutral-50'
                  }
                `}
              >
                <span className="font-semibold">{curr.symbol}</span>
                <div className="flex flex-col">
                  <span>{curr.code}</span>
                  <span className="text-xs text-neutral-500">{curr.name}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}