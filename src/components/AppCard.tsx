import { Star, Globe, ExternalLink } from 'lucide-react';
import { App } from '@/types/app';
import { getAppIcon, handleIconError } from '@/utils/dataLoader';
import { useAppStore } from '@/store/appStore';

interface AppCardProps {
  app: App;
  viewMode?: 'grid' | 'list';
}

export default function AppCard({ app, viewMode = 'grid' }: AppCardProps) {
  const { setSelectedApp } = useAppStore();
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
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <Star key={i} className="w-4 h-4 fill-yellow-400/50 text-yellow-400" />
        );
      } else {
        stars.push(
          <Star key={i} className="w-4 h-4 text-gray-300" />
        );
      }
    }
    return stars;
  };
  
  const formatPrice = (price: number) => {
    if (price === 0) return '免费';
    return `$${price}`;
  };
  
  const getPlatformBadges = (platform: string) => {
    if (!platform) return [];
    const platforms = platform.split(',').map(p => p.trim());
    return platforms.map((p, index) => (
      <span 
        key={index}
        className={`px-2 py-1 text-xs rounded-full ${
          p?.includes('Mac') ? 'bg-blue-100 text-blue-800' :
          p?.includes('iOS') ? 'bg-green-100 text-green-800' :
          'bg-purple-100 text-purple-800'
        }`}
      >
        {p}
      </span>
    ));
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
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer"
           onClick={handleCardClick}>
        <div className="p-4">
          <div className="flex items-center space-x-4">
            <img 
              src={iconSrc}
              alt={app.名称}
              className="w-12 h-12 rounded-lg shadow-sm group-hover:shadow-md transition-shadow flex-shrink-0"
              onError={handleImageError}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                    {app.名称}
                  </h3>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="flex items-center space-x-1">
                      {renderStars(app.评分)}
                    </div>
                    <span className="text-sm text-gray-600">({app.评分})</span>
                    <div className="flex gap-1">
                      {getPlatformBadges(app.平台)}
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed line-clamp-2">
                    {app.功能描述}
                  </p>
                </div>
                <div className="flex items-center space-x-4 ml-4">
                  <span className="text-lg font-bold text-green-600 whitespace-nowrap">
                    {formatPrice(app.官方订阅价格)}
                  </span>
                  <div className="flex items-center space-x-2">
                    {app.官方网站 && (
                      <button
                        onClick={(e) => handleLinkClick(e, app.官方网站!)}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        title="访问官方网站"
                      >
                        <Globe className="w-4 h-4" />
                      </button>
                    )}
                    {app.Setapp链接 && (
                      <button
                        onClick={(e) => handleLinkClick(e, app.Setapp链接!)}
                        className="p-2 text-gray-400 hover:text-green-600 transition-colors"
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
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group border border-gray-200 hover:border-blue-300"
      onClick={handleCardClick}
    >
      <div className="p-6">
        {/* 应用图标和基本信息 */}
        <div className="flex items-start space-x-4 mb-4">
          <div className="flex-shrink-0">
            <img 
              src={iconSrc}
              alt={app.名称}
              className="w-16 h-16 rounded-lg shadow-sm group-hover:scale-105 transition-transform duration-200"
              onError={handleImageError}
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate group-hover:text-blue-600 transition-colors">
              {app.名称}
            </h3>
            <div className="flex items-center space-x-2 mb-2">
              <div className="flex items-center">
                {renderStars(app.评分)}
              </div>
              <span className="text-sm text-gray-600">({app.评分})</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {getPlatformBadges(app.平台)}
            </div>
          </div>
        </div>
        
        {/* 功能描述 */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed">
          {app.功能描述}
        </p>
        
        {/* 价格和链接 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className={`text-lg font-bold ${
              app.官方订阅价格 === 0 ? 'text-green-600' : 'text-blue-600'
            }`}>
              {formatPrice(app.官方订阅价格)}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            {app.官方网站 && (
              <button 
                className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                onClick={(e) => handleLinkClick(e, app.官方网站!)}
                title="访问官网"
              >
                <Globe className="w-4 h-4" />
              </button>
            )}
            {app.Setapp链接 && (
              <button 
                className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                onClick={(e) => handleLinkClick(e, app.Setapp链接!)}
                title="查看Setapp"
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