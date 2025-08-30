import React from 'react';
import { App } from '@/types/app';
import AppCard from '@/components/AppCard';
import AppDetailModal from '@/components/AppDetailModal';
import { useState } from 'react';

// 测试数据
const testApp: App = {
  名称: 'CleanMyMac',
  功能描述: '专业的Mac系统清理和优化工具，深度扫描清理垃圾文件、恶意软件检测、应用卸载和系统优化。提供实时保护、性能监控和维护建议，保持Mac高性能运行。界面直观，操作安全可靠。',
  Setapp链接: 'https://setapp.com/apps/cleanmymac',
  官方网站: 'https://cleanmymac.com',
  官方订阅价格: 39.95,
  评分: 97,
  平台: 'Mac, iOS',
  开发者: 'MacPaw',
  应用分类: '系统工具',
  最后更新: '2024-08-20',
  应用大小: '120 MB',
  系统要求: 'macOS 10.15 或更高版本'
};

export default function TestPage() {
  const [selectedApp, setSelectedApp] = useState<App | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleCardClick = () => {
    setSelectedApp(testApp);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedApp(null);
  };

  return (
    <div className="min-h-screen bg-neutral-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-neutral-900 mb-8 text-center">
          Setapp Apps Showcase - 功能测试页面
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div onClick={handleCardClick}>
            <AppCard 
              app={testApp} 
              viewMode="grid" 
              showPlatformDetails={false}
            />
          </div>
          
          <div onClick={handleCardClick}>
            <AppCard 
              app={testApp} 
              viewMode="grid" 
              showPlatformDetails={true}
            />
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">列表视图测试</h2>
          <div onClick={handleCardClick}>
            <AppCard 
              app={testApp} 
              viewMode="list" 
              showPlatformDetails={true}
            />
          </div>
        </div>
        
        <AppDetailModal 
          app={selectedApp}
          isOpen={showModal}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  );
}