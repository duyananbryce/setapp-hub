import React from 'react';
import { useTranslation } from 'react-i18next';
import { useI18nStore, formatPrice, currencyInfoMap } from '@/lib/currency';
import { PriceDisplayProps } from '@/types/app';
import { DollarSign } from 'lucide-react';

const PriceDisplay: React.FC<PriceDisplayProps> = ({
  basePrice,
  baseCurrency = 'USD',
  targetCurrency,
  showConverter = false,
  displayMode = 'compact',
  locale,
}) => {
  const { t } = useTranslation();
  const { currency: storeCurrency, convertPrice } = useI18nStore();
  
  const currentCurrency = targetCurrency || storeCurrency;
  const currentLocale = locale || 'zh-CN';
  
  // 转换价格
  const convertedPrice = basePrice === 0 ? 0 : convertPrice(basePrice, baseCurrency, currentCurrency);
  
  // 格式化价格显示
  const formatDisplayPrice = (amount: number, currency: string) => {
    if (amount === 0) {
      return currentLocale === 'zh-CN' ? '免费使用' :
             currentLocale === 'ja-JP' ? '無料で使用' : 'Free to Use';
    }
    return formatPrice(amount, currency as any, currentLocale as any);
  };
  
  if (displayMode === 'compact') {
    return (
      <div className="text-right">
        <div className="text-lg font-semibold text-claude-text-heading">
          {formatDisplayPrice(convertedPrice, currentCurrency)}
        </div>
        {basePrice > 0 && (
          <div className="text-claude-text-secondary text-sm">
            {currentLocale === 'zh-CN' ? '官方价格' : 
             currentLocale === 'ja-JP' ? '公式価格' : 'Official Price'}
          </div>
        )}
      </div>
    );
  }
  
  if (displayMode === 'detailed') {
    return (
      <div className="bg-neutral-100 rounded-xl p-4 space-y-3 border border-claude-border-light">
        <div className="flex items-center space-x-2 text-claude-text-secondary">
          <DollarSign className="w-4 h-4" />
          <span className="font-medium">{t('app.price')}</span>
        </div>
        
        <div className="space-y-2">
          {/* 主要价格显示 */}
          <div className="text-2xl font-semibold text-claude-text-heading">
            {formatDisplayPrice(convertedPrice, currentCurrency)}
          </div>
          
          {/* 价格描述 */}
          <div className="text-claude-text-secondary text-sm">
            {basePrice === 0 ? (
              currentLocale === 'zh-CN' ? '完全免费，无需订阅' :
              currentLocale === 'ja-JP' ? '完全無料、購読不要' : 'Completely free, no subscription required'
            ) : (
              currentLocale === 'zh-CN' ? '年度订阅价格' :
              currentLocale === 'ja-JP' ? '年間購読価格' : 'Annual subscription price'
            )}
          </div>
        </div>
        
        {/* 货币转换器 */}
        {showConverter && basePrice > 0 && (
          <div className="border-t border-claude-border-light pt-3">
            <div className="text-xs text-claude-text-muted mb-2">
              {currentLocale === 'zh-CN' ? '汇率换算' :
               currentLocale === 'ja-JP' ? '為替換算' : 'Currency Conversion'}
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              {Object.entries(currencyInfoMap).slice(0, 3).map(([code, info]) => {
                const convertedAmount = convertPrice(basePrice, baseCurrency, code as any);
                return (
                  <div key={code} className="text-center text-claude-text-secondary">
                    <div className="font-medium">{code}</div>
                    <div>{formatDisplayPrice(convertedAmount, code)}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }
  
  return null;
};

export default PriceDisplay;