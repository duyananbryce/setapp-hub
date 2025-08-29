import { Star, Globe, ExternalLink, Monitor, Smartphone, Sparkles } from 'lucide-react';
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
    return platforms.map((p, index) => {
      if (p?.includes('Mac')) {
        return (
          <span key={index} className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 border border-slate-200/50 shadow-sm">
            <Monitor className="w-3.5 h-3.5 mr-1.5" />
            {p}
          </span>
        );
      } else if (p?.includes('iOS')) {
        return (
          <span key={index} className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 border border-blue-200/50 shadow-sm">
            <Smartphone className="w-3.5 h-3.5 mr-1.5" />
            {p}
          </span>
        );
      } else {
        return (
          <span key={index} className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700 border border-purple-200/50 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 mr-1.5" />
            {p}
          </span>
        );
      }
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
      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer border border-gray-100 hover:border-blue-200 backdrop-blur-sm"
           onClick={handleCardClick}>
        <div className="p-4">
          <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <img 
                  src={iconSrc}
                  alt={app.名称}
                  className="relative w-16 h-16 rounded-xl shadow-lg ring-2 ring-white group-hover:scale-105 transition-transform duration-200"
                  onError={handleImageError}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                      {app.名称}
                    </h3>
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="flex items-center bg-gradient-to-r from-yellow-50 to-orange-50 px-3 py-1.5 rounded-full border border-yellow-200/50">
                        <div className="flex items-center space-x-1">
                          {renderStars(app.评分)}
                        </div>
                        <span className="ml-2 text-sm font-semibold text-yellow-700">({app.评分})</span>
                      </div>
                      <div className="flex gap-2">
                        {getPlatformBadges(app.平台)}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                      {app.功能描述}
                    </p>
                  </div>
                  <div className="flex flex-col items-end ml-6">
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-2 rounded-xl border border-green-200/50 mb-3">
                      <span className="text-xl font-bold text-green-700 whitespace-nowrap">
                        {formatPrice(app.官方订阅价格)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      {app.官方网站 && (
                        <button
                          onClick={(e) => handleLinkClick(e, app.官方网站!)}
                          className="p-2.5 bg-gray-50 hover:bg-blue-50 text-gray-500 hover:text-blue-600 rounded-xl transition-all duration-200 hover:scale-110 hover:shadow-md border border-gray-200 hover:border-blue-200"
                          title="访问官方网站"
                        >
                          <Globe className="w-5 h-5" />
                        </button>
                      )}
                      {app.Setapp链接 && (
                        <button
                          onClick={(e) => handleLinkClick(e, app.Setapp链接!)}
                          className="p-2.5 bg-green-50 hover:bg-green-100 text-green-600 hover:text-green-700 rounded-xl transition-all duration-200 hover:scale-110 hover:shadow-md border border-green-200 hover:border-green-300"
                          title="在Setapp中查看"
                        >
                          <ExternalLink className="w-5 h-5" />
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
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group border border-gray-100 hover:border-blue-200 backdrop-blur-sm hover:scale-[1.02]"
      onClick={handleCardClick}
    >
      <div className="p-6 relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-400 via-accent-400 to-secondary-400 rounded-t-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div className="flex items-center justify-center mb-6 relative">
          <div className="absolute -inset-2 bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          <img 
            src={iconSrc}
            alt={app.名称}
            className="relative w-20 h-20 rounded-2xl shadow-xl ring-4 ring-white group-hover:scale-110 transition-transform duration-300"
            onError={handleImageError}
          />
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-3 text-center group-hover:text-primary-600 transition-colors duration-200 font-cal line-clamp-2">
          {app.名称}
        </h3>
        
        <div className="flex items-center justify-center mb-4">
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 px-4 py-2 rounded-full border border-yellow-200/50">
            <div className="flex items-center space-x-1">
              {renderStars(app.评分)}
              <span className="ml-2 text-sm font-semibold text-yellow-700">({app.评分})</span>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center gap-2 mb-4">
          {getPlatformBadges(app.平台)}
        </div>
        
        <p className="text-gray-600 text-sm text-center leading-relaxed line-clamp-3 mb-6">
          {app.功能描述}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-2 rounded-xl border border-green-200/50">
            <span className="text-lg font-bold text-green-700">
              {formatPrice(app.官方订阅价格)}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            {app.官方网站 && (
              <button
                onClick={(e) => handleLinkClick(e, app.官方网站!)}
                className="p-2.5 bg-gray-50 hover:bg-primary-50 text-gray-500 hover:text-primary-600 rounded-xl transition-all duration-200 hover:scale-110 hover:shadow-lg border border-gray-200 hover:border-primary-200"
                title="访问官方网站"
              >
                <Globe className="w-5 h-5" />
              </button>
            )}
            {app.Setapp链接 && (
              <button
                onClick={(e) => handleLinkClick(e, app.Setapp链接!)}
                className="p-2.5 bg-accent-50 hover:bg-accent-100 text-accent-600 hover:text-accent-700 rounded-xl transition-all duration-200 hover:scale-110 hover:shadow-lg border border-accent-200 hover:border-accent-300"
                title="在Setapp中查看"
              >
                <ExternalLink className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}