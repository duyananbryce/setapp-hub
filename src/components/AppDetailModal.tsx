import React, { useEffect, useState } from 'react';
import { X, Star, Globe, ExternalLink } from 'lucide-react';
import { App } from '@/types/app';
import { getAppIcon } from '@/utils/dataLoader';
import { useTranslation } from 'react-i18next';
import { useI18nStore, detectDefaultCurrency } from '@/lib/currency';
import { getLocalizedDescription } from '@/utils/appDescriptionTranslator';
import { 
  extractCoreFeatures, 
  generateTechnicalFeatures, 
  generateUseCases, 
  generateTargetAudience 
} from '@/utils/appFeatureExtractor';
import '@/lib/i18n'; // 确保 i18n 初始化
// import FeatureOverview from './FeatureOverview';
// import HighlightsList from './HighlightsList';
// import DetailedFeatures from './DetailedFeatures';
// import UseCasePanel from './UseCasePanel';
// import PlatformIndicator from './PlatformIndicator';
// import OfficialLinks from './OfficialLinks';
// import SystemRequirements from './SystemRequirements';
// import LanguageCurrencySelector from './LanguageCurrencySelector';
// import PriceDisplay from './PriceDisplay';
// import FeatureGallery from './FeatureGallery';



interface AppDetailModalProps {
  app: App | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function AppDetailModal({ app, isOpen, onClose }: AppDetailModalProps) {
  const { t, i18n } = useTranslation();
  const { 
    locale, 
    currency, 
    setLocale, 
    setCurrency, 
    convertPrice 
  } = useI18nStore();
  
  // 初始化语言和货币设置
  useEffect(() => {
    // 检测并设置默认货币
    const defaultCurrency = detectDefaultCurrency();
    if (currency === 'USD' && defaultCurrency !== 'USD') {
      setCurrency(defaultCurrency);
    }
    
    // 同步 i18next 语言设置
    if (i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
  }, []);
  
  // 语言变更处理
  const handleLocaleChange = (newLocale: any) => {
    setLocale(newLocale);
    i18n.changeLanguage(newLocale);
  };
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
  
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);
  
  if (!isOpen || !app) return null;
  
  const iconSrc = getAppIcon(app.名称);
  
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = '/icon/start.png';
  };
  
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating / 20);
    const hasHalfStar = (rating % 20) >= 10;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="w-5 h-5 fill-claude-accent text-claude-accent" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <Star key={i} className="w-5 h-5 fill-claude-accent/60 text-claude-accent/60" />
        );
      } else {
        stars.push(
          <Star key={i} className="w-5 h-5 text-neutral-300" />
        );
      }
    }
    return stars;
  };

  // 使用新的智能功能提取系统
  const coreFeatures = extractCoreFeatures(app, locale);
  const technicalFeatures = generateTechnicalFeatures(app, locale);
  const useCases = generateUseCases(app, locale);
  const targetAudience = generateTargetAudience(app, locale);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* 背景遮罩 */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* 模态框内容 */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-claude-card rounded-2xl shadow-claude-heavy max-w-4xl w-full max-h-[90vh] overflow-hidden border border-claude-border-light">
          {/* 关闭按钮 */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-50 p-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors duration-200 shadow-lg"
          >
            <X className="w-5 h-5 text-claude-text" />
          </button>
          
          {/* 头部区域 */}
          <div className="bg-claude-card border-b border-claude-border-light">
            <div className="p-8">
              <div className="flex items-start space-x-6">
                {/* 应用信息 */}
                <div className="flex items-start space-x-6 flex-1">
                  <div className="relative">
                    <img 
                      src={iconSrc}
                      alt={app.名称}
                      className="w-20 h-20 rounded-xl"
                      onError={handleImageError}
                    />
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    {/* 应用名称和评分 */}
                    <div>
                      <h1 className="text-2xl font-semibold mb-2 text-claude-text-heading">{app.名称}</h1>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1">
                            {renderStars(app.评分)}
                          </div>
                          <span className="text-sm text-claude-text-secondary">({app.评分}/100)</span>
                        </div>
                        
                        {app.开发者 && (
                          <div className="text-sm text-claude-text-secondary">
                            开发者: {app.开发者}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* 功能描述 */}
                    <p className="text-base text-claude-text leading-relaxed max-w-2xl">
                      {getLocalizedDescription(app.功能描述, app.名称, locale)}
                    </p>
                  </div>
                </div>
                
                {/* 价格显示 */}
                <div className="w-72">
                  <div className="bg-neutral-100 rounded-xl p-6 border border-claude-border-light">
                    <h3 className="text-base font-medium mb-3 text-claude-text-heading">
                      {locale === 'zh-CN' ? '价格信息' :
                       locale === 'ja-JP' ? '価格情報' :
                       'Price Information'}
                    </h3>
                    <div className="text-xl font-semibold mb-2 text-claude-text-heading">
                      {typeof app.官方订阅价格 === 'number' && app.官方订阅价格 > 0 
                        ? `$${app.官方订阅价格}/月` 
                        : 'Setapp 包含'
                      }
                    </div>
                    <p className="text-sm text-claude-text-secondary">
                      {locale === 'zh-CN' ? '通过 Setapp 订阅使用' :
                       locale === 'ja-JP' ? 'Setappサブスクリプションで利用' :
                       'Available through Setapp subscription'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* 详细内容区域 */}
          <div className="overflow-y-auto max-h-[50vh]">
            <div className="p-8 space-y-6">
              {/* 主要功能特点 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* 核心功能 */}
                <div className="bg-neutral-100 rounded-xl p-6 border border-claude-border-light">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-claude-black rounded-lg mr-3">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-base font-medium text-claude-text-heading">
                      {locale === 'zh-CN' ? '核心功能' :
                       locale === 'ja-JP' ? 'コア機能' :
                       'Core Features'}
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {coreFeatures.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-claude-accent rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-claude-text">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 技术特点 */}
                <div className="bg-neutral-100 rounded-xl p-6 border border-claude-border-light">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-claude-accent rounded-lg mr-3">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h3 className="text-base font-medium text-claude-text-heading">
                      {locale === 'zh-CN' ? '技术特点' :
                       locale === 'ja-JP' ? '技術的特徴' :
                       'Technical Features'}
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {technicalFeatures.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-claude-accent rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-claude-text">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* 操作按钮 */}
              <div className="flex items-center justify-between pt-6 border-t border-claude-border-light">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-claude-text-secondary">
                    {locale === 'zh-CN' ? '平台支持' :
                     locale === 'ja-JP' ? 'プラットフォームサポート' :
                     'Platform Support'}: {app.平台}
                  </span>
                  {app.系统要求 && (
                    <span className="text-sm text-claude-text-secondary">
                      {locale === 'zh-CN' ? '系统要求' :
                       locale === 'ja-JP' ? 'システム要件' :
                       'System Requirements'}: {app.系统要求}
                    </span>
                  )}
                </div>
                
                <div className="flex space-x-3">
                  {app.官方网站 && (
                    <a 
                      href={app.官方网站}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-white border border-neutral-300 hover:bg-neutral-50 flex items-center space-x-2"
                      style={{ color: '#F4A460' }}
                    >
                      <Globe className="w-4 h-4" />
                      <span>
                        {locale === 'zh-CN' ? '官方网站' :
                         locale === 'ja-JP' ? '公式サイト' :
                         'Official Website'}
                      </span>
                    </a>
                  )}
                  
                  {app.Setapp链接 && (
                    <a 
                      href={app.Setapp链接}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-claude-primary flex items-center space-x-2"
                      style={{ backgroundColor: '#F4A460', borderColor: '#F4A460' }}
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>
                        {locale === 'zh-CN' ? '在 Setapp 中使用' :
                         locale === 'ja-JP' ? 'Setappで使用' :
                         'Use in Setapp'}
                      </span>
                    </a>
                  )}                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}