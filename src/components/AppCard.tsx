import React from 'react';
import { Star, Globe, ExternalLink, Monitor, Smartphone, Sparkles } from 'lucide-react';
import { App } from '@/types/app';
import { getAppIcon, handleIconError } from '@/utils/dataLoader';
import { useAppStore } from '@/store/appStore';
import { useI18nStore, formatPrice } from '@/lib/currency';
import { useTranslation } from 'react-i18next';
import { getLocalizedDescription } from '@/utils/appDescriptionTranslator';
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
          <Star key={i} className="w-4 h-4 fill-claude-accent text-claude-accent" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <Star key={i} className="w-4 h-4 fill-claude-accent/60 text-claude-accent/60" />
        );
      } else {
        stars.push(
          <Star key={i} className="w-4 h-4 text-neutral-300" />
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
    // 获取本地化描述
    const localizedDesc = getLocalizedDescription(description, app.名称, locale);
    if (localizedDesc.length <= maxLength) return localizedDesc;
    return localizedDesc.substring(0, maxLength) + '...';
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
        <div className="text-xs text-claude-text-muted mt-1">
          开发者：{app.开发者}
        </div>
      );
    }
    return null;
  };

  const getCategoryBadge = () => {
    if (app.应用分类) {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium bg-neutral-100 text-claude-text border border-claude-border-light">
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
            <span key={index} className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium bg-neutral-100 text-claude-text border border-claude-border-light">
              <Monitor className="w-3 h-3 mr-1" />
              {p}
            </span>
          );
        } else if (p?.includes('iOS')) {
          return (
            <span key={index} className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium bg-neutral-100 text-claude-text border border-claude-border-light">
              <Smartphone className="w-3 h-3 mr-1" />
              {p}
            </span>
          );
        } else {
          return (
            <span key={index} className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium bg-neutral-100 text-claude-text border border-claude-border-light">
              <Sparkles className="w-3 h-3 mr-1" />
              {p}
            </span>
          );
        }
      })();

      return React.cloneElement(badgeElement, {
        onClick: () => handlePlatformClick(p),
        className: `${badgeElement.props.className} cursor-pointer hover:scale-105 transition-transform hover:bg-neutral-200`
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
      <div className="card-claude cursor-pointer hover-claude-lift animate-claude-fade-in"
           onClick={handleCardClick}>
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
                  <h3 className="text-base font-semibold text-claude-text-heading mb-1 line-clamp-1">
                    {app.名称}
                  </h3>
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="flex items-center bg-neutral-100 px-3 py-1 rounded-lg text-xs">
                      <div className="flex items-center space-x-1">
                        {renderStars(app.评分)}
                      </div>
                      <span className="ml-1.5 text-xs font-medium text-claude-text">({app.评分})</span>
                    </div>
                    <div className="flex gap-2">
                      {getEnhancedPlatformBadges(app.平台)}
                      {getCategoryBadge()}
                      </div>
                    </div>
                    <p className="text-sm text-claude-text-secondary line-clamp-2 mb-2">
                      {formatDescription(app.功能描述, 100)}
                    </p>
                    {getDeveloperInfo()}
                  </div>
                  <div className="flex flex-col items-end ml-4">
                      <div className="bg-neutral-100 px-3 py-2 rounded-lg">
                        <span className="text-sm font-medium text-claude-text">
                          {formatPriceDisplay(app.官方订阅价格)}
                        </span>
                      </div>
                    <div className="flex items-center space-x-2 mt-3">
                      {app.官方网站 && (
                        <button
                          onClick={(e) => handleLinkClick(e, app.官方网站!)}
                          className="p-2 bg-neutral-100 hover:bg-neutral-200 text-claude-text hover:text-claude-text-heading rounded-lg transition-all duration-200 hover:scale-110 shadow-claude border border-claude-border-light"
                          title="访问官方网站"
                        >
                          <Globe className="w-4 h-4" />
                        </button>
                      )}
                      {app.Setapp链接 && (
                        <button
                          onClick={(e) => handleLinkClick(e, app.Setapp链接!)}
                          className="p-2 bg-neutral-100 hover:bg-neutral-200 text-claude-text hover:text-claude-text-heading rounded-lg transition-all duration-200 hover:scale-110 shadow-claude border border-claude-border-light"
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
    );
  }
  
  return (
    <div 
      className="card-claude cursor-pointer hover-claude-lift animate-claude-fade-in"
      onClick={handleCardClick}
    >
      
      <div className="flex items-center justify-center mb-4">
        <img 
          src={iconSrc}
          alt={app.名称}
          className="w-16 h-16 rounded-lg"
          onError={handleImageError}
        />
      </div>
      
      <h3 className="text-base font-semibold text-claude-text-heading mb-3 text-center line-clamp-2">
        {app.名称}
      </h3>
      
      <div className="flex items-center justify-center mb-3">
        <div className="bg-neutral-100 px-3 py-1 rounded-lg text-xs">
          <div className="flex items-center space-x-1">
            {renderStars(app.评分)}
            <span className="ml-1.5 text-xs font-medium text-claude-text">({app.评分})</span>
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
      
      <p className="text-sm text-claude-text-secondary text-center line-clamp-3 mb-4">
        {formatDescription(app.功能描述, 80)}
      </p>
      
      {getDeveloperInfo() && (
        <div className="text-center mb-3">
          {getDeveloperInfo()}
        </div>
      )}
      
      <div className="flex items-center justify-between pt-3 border-t border-claude-border-light">
        <div className="bg-neutral-100 px-3 py-2 rounded-lg">
          <span className="text-sm font-medium text-claude-text">
            {formatPriceDisplay(app.官方订阅价格)}
          </span>
        </div>
        <div className="flex items-center space-x-1.5">
          {app.官方网站 && (
            <button
              onClick={(e) => handleLinkClick(e, app.官方网站!)}
              className="p-2 bg-neutral-100 hover:bg-neutral-200 text-claude-text hover:text-claude-text-heading rounded-lg transition-all duration-200 shadow-claude"
              title="访问官方网站"
            >
              <Globe className="w-4 h-4" />
            </button>
          )}
          {app.Setapp链接 && (
            <button
              onClick={(e) => handleLinkClick(e, app.Setapp链接!)}
              className="p-2 bg-neutral-100 hover:bg-neutral-200 text-claude-text hover:text-claude-text-heading rounded-lg transition-all duration-200 shadow-claude"
              title="在Setapp中查看"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}