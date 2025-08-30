import React from 'react';
import { Star, Globe, ExternalLink, Monitor, Smartphone, Sparkles } from 'lucide-react';
import { App } from '@/types/app';
import { getAppIcon, handleIconError } from '@/utils/dataLoader';
import { useAppStore } from '@/store/appStore';
import { useI18nStore, formatPrice } from '@/lib/currency';
import { useTranslation } from 'react-i18next';
import PlatformIndicator from './PlatformIndicator';

interface AppCardProps {
  app: App;
  viewMode?: 'grid' | 'list';
  showPlatformDetails?: boolean;
  onPlatformClick?: (platform: string) => void;
}

export default function AppCard({ 
  app, 
  viewMode = 'grid',
  showPlatformDetails = false,
  onPlatformClick
}: AppCardProps) {
  const { setSelectedApp } = useAppStore();
  const { currency, locale, convertPrice } = useI18nStore();
  const { t } = useTranslation();
  const iconSrc = getAppIcon(app.名称);
  
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    handleIconError(e.nativeEvent, app.名称);
    // Fallback to default icon
    (e.target as HTMLImageElement).src = '/icon/start.png';
  };
  
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating / 20); // 转换为5星制
    const hasHalfStar = (rating % 20) >= 10;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="w-4 h-4 fill-primary-600 text-primary-600" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <Star key={i} className="w-4 h-4 fill-primary-400 text-primary-400" />
        );
      } else {
        stars.push(
          <Star key={i} className="w-4 h-4 text-secondary-400" />
        );
      }
    }
    return stars;
  };
  
  const formatPriceDisplay = (priceValue: number | string) => {
    // 如果是数字类型，进行货币转换
    if (typeof priceValue === 'number') {
      if (priceValue === 0) {
        return locale === 'zh-CN' ? '免费' : 
               locale === 'ja-JP' ? '無料' : 'Free';
      }
      const convertedPrice = convertPrice(priceValue, 'USD', currency);
      return formatPrice(convertedPrice, currency, locale);
    }
    
    // 如果是字符串类型，直接返回
    if (typeof priceValue === 'string') {
      if (priceValue === '0' || priceValue === '') {
        return locale === 'zh-CN' ? '免费' : 
               locale === 'ja-JP' ? '無料' : 'Free';
      }
      return priceValue;
    }
    
    return locale === 'zh-CN' ? '价格待定' : 
           locale === 'ja-JP' ? '価格未定' : 'Price TBD';
  };
  
  const handlePlatformClick = (platform: string) => {
    if (onPlatformClick) {
      onPlatformClick(platform);
    }
  };

  const formatDescription = (description: string, maxLength: number = 150) => {
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength) + '...';
  };

  const getEnhancedPlatformBadges = (platform: string) => {
    if (showPlatformDetails) {
      return (
        <PlatformIndicator 
          platform={platform} 
          size={viewMode === 'list' ? 'sm' : 'md'}
          supportDetails={app.支持平台}
        />
      );
    }
    return getPlatformBadges(platform);
  };

  const getDeveloperInfo = () => {
    if (app.开发者) {
      return (
        <div className="text-xs text-secondary-600 mt-1">
          开发者：{app.开发者}
        </div>
      );
    }
    return null;
  };

  const getCategoryBadge = () => {
    if (app.应用分类) {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-secondary-100 text-primary-800 border border-secondary-200">
          {app.应用分类}
        </span>
      );
    }
    return null;
  };
  const getPlatformBadges = (platform: string) => {
    if (!platform) return [];
    const platforms = platform.split(',').map(p => p.trim());
    return platforms.map((p, index) => {
      const badgeElement = (() => {
        if (p?.includes('Mac')) {
          return (
            <span key={index} className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium bg-neutral-100/80 text-neutral-800 border border-neutral-300/60 shadow-soft">
              <Monitor className="w-3 h-3 mr-1" />
              {p}
            </span>
          );
        } else if (p?.includes('iOS')) {
          return (
            <span key={index} className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium bg-neutral-100/80 text-neutral-800 border border-neutral-300/60 shadow-soft">
              <Smartphone className="w-3 h-3 mr-1" />
              {p}
            </span>
          );
        } else {
          return (
            <span key={index} className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium bg-neutral-100/80 text-neutral-800 border border-neutral-300/60 shadow-soft">
              <Sparkles className="w-3 h-3 mr-1" />
              {p}
            </span>
          );
        }
      })();

      return React.cloneElement(badgeElement, {
        onClick: () => handlePlatformClick(p),
        className: `${badgeElement.props.className} cursor-pointer hover:scale-105 transition-transform hover:bg-neutral-200/80`
      });
    });
  };
  
  const handleCardClick = () => {
    setSelectedApp(app);
  };
  
  const handleLinkClick = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    window.open(url, '_blank');
  };
  
  if (viewMode === 'list') {
    return (
      <div className="bg-white border border-secondary-200 hover:border-secondary-300 rounded-lg transition-colors duration-200 overflow-hidden cursor-pointer"
           onClick={handleCardClick}>
        <div className="p-6">
          <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 relative">
                <img 
                  src={iconSrc}
                  alt={app.名称}
                  className="w-12 h-12 rounded-lg"
                  onError={handleImageError}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-base font-medium text-primary-800 mb-1 line-clamp-1">
                      {app.名称}
                    </h3>
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="flex items-center bg-secondary-100 px-2 py-1 rounded text-xs">
                        <div className="flex items-center space-x-1">
                          {renderStars(app.评分)}
                        </div>
                        <span className="ml-1.5 text-xs font-medium text-primary-800">({app.评分})</span>
                      </div>
                      <div className="flex gap-2">
                        {getEnhancedPlatformBadges(app.平台)}
                        {getCategoryBadge()}
                      </div>
                    </div>
                    <p className="text-sm text-secondary-600 line-clamp-2 mb-2">
                      {formatDescription(app.功能描述, 100)}
                    </p>
                    {getDeveloperInfo()}
                  </div>
                  <div className="flex flex-col items-end ml-4">
                      <div className="bg-secondary-100 px-3 py-1.5 rounded-lg">
                        <span className="text-sm font-medium text-primary-800">
                          {formatPriceDisplay(app.官方订阅价格)}
                        </span>
                      </div>
                    <div className="flex items-center space-x-2 mt-3">
                      {app.官方网站 && (
                        <button
                          onClick={(e) => handleLinkClick(e, app.官方网站!)}
                          className="p-2 bg-neutral-50/80 hover:bg-neutral-100/80 text-neutral-800 hover:text-neutral-900 rounded-lg transition-all duration-200 hover:scale-110 hover:shadow-medium border border-neutral-300/60"
                          title="访问官方网站"
                        >
                          <Globe className="w-4 h-4" />
                        </button>
                      )}
                      {app.Setapp链接 && (
                        <button
                          onClick={(e) => handleLinkClick(e, app.Setapp链接!)}
                          className="p-2 bg-neutral-100/80 hover:bg-neutral-200/80 text-neutral-800 hover:text-neutral-900 rounded-lg transition-all duration-200 hover:scale-110 hover:shadow-medium border border-neutral-300/60"
                          title="在Setapp中查看"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    );
  }
  
  return (
    <div 
      className="bg-white border border-secondary-200 hover:border-secondary-300 rounded-lg transition-colors duration-200 cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="p-6">
        
        <div className="flex items-center justify-center mb-4">
          <img 
            src={iconSrc}
            alt={app.名称}
            className="w-16 h-16 rounded-lg"
            onError={handleImageError}
          />
        </div>
        
        <h3 className="text-base font-medium text-primary-800 mb-3 text-center line-clamp-2">
          {app.名称}
        </h3>
        
        <div className="flex items-center justify-center mb-3">
          <div className="bg-secondary-100 px-2 py-1 rounded text-xs">
            <div className="flex items-center space-x-1">
              {renderStars(app.评分)}
              <span className="ml-1.5 text-xs font-medium text-primary-800">({app.评分})</span>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center gap-1.5 mb-3">
          {getEnhancedPlatformBadges(app.平台)}
        </div>
        
        {getCategoryBadge() && (
          <div className="flex justify-center mb-3">
            {getCategoryBadge()}
          </div>
        )}
        
        <p className="text-sm text-secondary-600 text-center line-clamp-3 mb-4">
          {formatDescription(app.功能描述, 80)}
        </p>
        
        {getDeveloperInfo() && (
          <div className="text-center mb-3">
            {getDeveloperInfo()}
          </div>
        )}
        
        <div className="flex items-center justify-between pt-3 border-t border-secondary-200">
          <div className="bg-secondary-100 px-3 py-1.5 rounded-lg">
            <span className="text-sm font-medium text-primary-800">
              {formatPriceDisplay(app.官方订阅价格)}
            </span>
          </div>
          <div className="flex items-center space-x-1.5">
            {app.官方网站 && (
              <button
                onClick={(e) => handleLinkClick(e, app.官方网站!)}
                className="p-2 bg-secondary-100 hover:bg-secondary-200 text-primary-700 hover:text-primary-800 rounded-lg transition-colors duration-200"
                title="访问官方网站"
              >
                <Globe className="w-4 h-4" />
              </button>
            )}
            {app.Setapp链接 && (
              <button
                onClick={(e) => handleLinkClick(e, app.Setapp链接!)}
                className="p-2 bg-secondary-100 hover:bg-secondary-200 text-primary-700 hover:text-primary-800 rounded-lg transition-colors duration-200"
                title="在Setapp中查看"
              >
                <ExternalLink className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}