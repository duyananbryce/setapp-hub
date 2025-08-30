import { Monitor, HardDrive, Cpu, MemoryStick, Info } from 'lucide-react';

interface SystemRequirementsProps {
  requirements?: string;
  platform: string;
  appSize?: string;
  lastUpdated?: string;
  showExtended?: boolean;
}

export default function SystemRequirements({ 
  requirements, 
  platform,
  appSize,
  lastUpdated,
  showExtended = false 
}: SystemRequirementsProps) {
  const platforms = platform.split(',').map(p => p.trim());
  
  // 解析系统要求字符串（如果提供）
  const parseRequirements = (reqString?: string) => {
    if (!reqString) return null;
    
    // 尝试解析常见的系统要求格式
    const parsed = {
      os: '',
      processor: '',
      memory: '',
      storage: '',
      other: []
    };
    
    // 简单的解析逻辑，可以根据实际数据格式调整
    if (reqString.includes('macOS') || reqString.includes('Mac OS')) {
      parsed.os = reqString.match(/(macOS|Mac OS)[^\,\;]*/)?.[0] || '';
    }
    
    return parsed;
  };

  const getDefaultRequirements = (platformName: string) => {
    if (platformName.includes('Mac')) {
      return {
        os: 'macOS 10.15 或更高版本',
        processor: 'Intel 或 Apple Silicon',
        memory: '4 GB RAM',
        storage: '100 MB 可用空间'
      };
    } else if (platformName.includes('iOS')) {
      return {
        os: 'iOS 14.0 或更高版本',
        processor: 'A12 仿生芯片或更新',
        memory: '2 GB RAM',
        storage: '50 MB 可用空间'
      };
    } else if (platformName.includes('iPad')) {
      return {
        os: 'iPadOS 14.0 或更高版本',
        processor: 'A12 仿生芯片或更新',
        memory: '3 GB RAM',
        storage: '100 MB 可用空间'
      };
    } else if (platformName.includes('Web')) {
      return {
        os: '现代浏览器支持',
        processor: '无特殊要求',
        memory: '1 GB RAM',
        storage: '无需本地存储'
      };
    }
    
    return null;
  };

  const requirementItems = [
    { icon: <Monitor className="w-5 h-5" />, label: '操作系统', key: 'os' },
    { icon: <Cpu className="w-5 h-5" />, label: '处理器', key: 'processor' },
    { icon: <MemoryStick className="w-5 h-5" />, label: '内存', key: 'memory' },
    { icon: <HardDrive className="w-5 h-5" />, label: '存储空间', key: 'storage' }
  ];

  if (!showExtended && platforms.length === 1) {
    // 简化显示模式
    return (
      <div className="space-y-3">
        <h4 className="font-semibold text-gray-900 flex items-center">
          <Info className="w-4 h-4 mr-2" />
          系统信息
        </h4>
        <div className="grid grid-cols-2 gap-3 text-sm">
          {appSize && (
            <div className="flex items-center space-x-2 text-gray-600">
              <HardDrive className="w-4 h-4" />
              <span>大小：{appSize}</span>
            </div>
          )}
          {lastUpdated && (
            <div className="flex items-center space-x-2 text-gray-600">
              <Monitor className="w-4 h-4" />
              <span>更新：{lastUpdated}</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-gray-900 flex items-center">
        <Info className="w-4 h-4 mr-2" />
        系统要求
      </h4>
      
      {platforms.map((platformName, index) => {
        const parsedReqs = parseRequirements(requirements);
        const defaultReqs = getDefaultRequirements(platformName);
        const reqs = parsedReqs || defaultReqs;
        
        if (!reqs) return null;
        
        return (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <h5 className="font-medium text-gray-900 mb-3">{platformName}</h5>
            
            <div className="space-y-3">
              {requirementItems.map((item, idx) => {
                const value = reqs[item.key as keyof typeof reqs];
                if (!value) return null;
                
                return (
                  <div key={idx} className="flex items-start space-x-3">
                    <div className="text-gray-500 mt-0.5">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <span className="font-medium text-gray-700">{item.label}：</span>
                      <span className="text-gray-600 ml-1">{value}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      
      {/* 额外信息 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-sm">
        {appSize && (
          <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
            <HardDrive className="w-4 h-4 text-gray-500" />
            <span className="text-gray-600">应用大小：{appSize}</span>
          </div>
        )}
        {lastUpdated && (
          <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
            <Monitor className="w-4 h-4 text-gray-500" />
            <span className="text-gray-600">最后更新：{lastUpdated}</span>
          </div>
        )}
      </div>
    </div>
  );
}