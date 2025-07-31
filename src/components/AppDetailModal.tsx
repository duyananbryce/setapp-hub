import { X, Star, Globe, ExternalLink, Download, Shield, Clock } from 'lucide-react';
import { App } from '@/types/app';
import { getAppIcon } from '@/utils/dataLoader';
import { useEffect } from 'react';

interface AppDetailModalProps {
  app: App | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function AppDetailModal({ app, isOpen, onClose }: AppDetailModalProps) {
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
          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <Star key={i} className="w-5 h-5 fill-yellow-400/50 text-yellow-400" />
        );
      } else {
        stars.push(
          <Star key={i} className="w-5 h-5 text-gray-300" />
        );
      }
    }
    return stars;
  };
  
  const formatPrice = (price: number) => {
    if (price === 0) return '免费使用';
    return `$${price}/年`;
  };
  
  const getPlatformInfo = (platform: string) => {
    const platforms = platform.split(',').map(p => p.trim());
    return platforms;
  };
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* 背景遮罩 */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* 模态框内容 */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* 关闭按钮 */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
          
          {/* 头部信息 */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-xl">
            <div className="flex items-start space-x-4">
              <img 
                src={iconSrc}
                alt={app.名称}
                className="w-20 h-20 rounded-xl shadow-lg bg-white/10 p-1"
                onError={handleImageError}
              />
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">{app.名称}</h2>
                <div className="flex items-center space-x-3 mb-3">
                  <div className="flex items-center space-x-1">
                    {renderStars(app.评分)}
                  </div>
                  <span className="text-blue-100">({app.评分}/100)</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {getPlatformInfo(app.平台).map((platform, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium"
                    >
                      {platform}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* 主要内容 */}
          <div className="p-6">
            {/* 价格信息 */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {formatPrice(app.官方订阅价格)}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {app.官方订阅价格 === 0 ? '无需付费即可使用' : '官方订阅价格'}
                  </p>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>年付订阅</span>
                </div>
              </div>
            </div>
            
            {/* 功能描述 */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">功能描述</h3>
              <p className="text-gray-700 leading-relaxed">
                {app.功能描述}
              </p>
            </div>
            
            {/* 特性标签 */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">应用特性</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span>Setapp认证应用</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Download className="w-4 h-4 text-blue-500" />
                  <span>一键安装</span>
                </div>
                {app.官方订阅价格 === 0 && (
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>免费使用</span>
                  </div>
                )}
                {app.评分 >= 95 && (
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Star className="w-4 h-4 text-purple-500" />
                    <span>编辑推荐</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* 操作按钮 */}
            <div className="flex flex-col sm:flex-row gap-3">
              {app.Setapp链接 && (
                <button
                  onClick={() => window.open(app.Setapp链接, '_blank')}
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <ExternalLink className="w-5 h-5" />
                  <span>在Setapp中查看</span>
                </button>
              )}
              {app.官方网站 && (
                <button
                  onClick={() => window.open(app.官方网站, '_blank')}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <Globe className="w-5 h-5" />
                  <span>访问官方网站</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}