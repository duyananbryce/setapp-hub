import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Star, Zap, Shield, Users, Smartphone, Monitor } from 'lucide-react';
import { FeatureGalleryProps, EnhancedFeature } from '@/types/app';

const FeatureGallery: React.FC<FeatureGalleryProps> = ({
  features,
  displayMode = 'grid',
  locale = 'zh-CN',
  showScreenshots = true,
}) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('core');
  
  // 按类别分组功能
  const groupedFeatures = features.reduce((acc, feature) => {
    const category = feature.category || 'core';
    if (!acc[category]) acc[category] = [];
    acc[category].push(feature);
    return acc;
  }, {} as Record<string, EnhancedFeature[]>);
  
  // 获取功能图标
  const getFeatureIcon = (category: string, index: number) => {
    const icons = {
      core: [Star, Zap, Shield],
      advanced: [Users, Smartphone, Monitor],
      integration: [Monitor, Users, Zap],
    };
    const IconComponent = icons[category as keyof typeof icons]?.[index % 3] || Star;
    return IconComponent;
  };
  
  // 渲染功能卡片
  const renderFeatureCard = (feature: EnhancedFeature, index: number) => {
    const IconComponent = getFeatureIcon(feature.category, index);
    
    return (
      <div 
        key={index}
        className="bg-white rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden group"
      >
        <div className="p-6">
          {/* 功能标题和图标 */}
          <div className="flex items-center space-x-3 mb-4">
            <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
              <IconComponent className="w-5 h-5 text-primary-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-neutral-900 mb-1">
                {feature.title}
              </h3>
              <div className="flex items-center space-x-2">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  feature.category === 'core' ? 'bg-primary-100 text-primary-600' :
                  feature.category === 'advanced' ? 'bg-accent-100 text-accent-600' :
                  'bg-success-100 text-success-600'
                }`}>
                  {feature.category === 'core' ? 
                    (locale === 'zh-CN' ? '核心功能' : locale === 'ja-JP' ? 'コア機能' : 'Core') :
                    feature.category === 'advanced' ? 
                    (locale === 'zh-CN' ? '高级功能' : locale === 'ja-JP' ? '高度な機能' : 'Advanced') :
                    (locale === 'zh-CN' ? '集成功能' : locale === 'ja-JP' ? '統合機能' : 'Integration')
                  }
                </span>
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < feature.priority ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* 功能描述 */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {feature.description}
          </p>
          
          {/* 功能优势 */}
          {feature.benefits && feature.benefits.length > 0 && (
            <div className="space-y-2">
              {feature.benefits.slice(0, 3).map((benefit, benefitIndex) => (
                <div key={benefitIndex} className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };
  
  // 网格布局
  if (displayMode === 'grid') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            {t('ui.labels.detailedFeatures')}
          </h2>
          
          {/* 类别过滤器 */}
          <div className="flex space-x-2">
            {Object.keys(groupedFeatures).map((category) => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeTab === category
                    ? 'bg-primary-600 text-white shadow-colored'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category === 'core' ? 
                  (locale === 'zh-CN' ? '核心' : locale === 'ja-JP' ? 'コア' : 'Core') :
                  category === 'advanced' ? 
                  (locale === 'zh-CN' ? '高级' : locale === 'ja-JP' ? '高度' : 'Advanced') :
                  (locale === 'zh-CN' ? '集成' : locale === 'ja-JP' ? '統合' : 'Integration')
                }
                <span className="ml-2 bg-white/20 px-2 py-0.5 rounded-full text-xs">
                  {groupedFeatures[category].length}
                </span>
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(groupedFeatures[activeTab] || []).map((feature, index) => 
            renderFeatureCard(feature, index)
          )}
        </div>
      </div>
    );
  }
  
  return null;
};

export default FeatureGallery;