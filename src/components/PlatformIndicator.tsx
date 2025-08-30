import { Monitor, Smartphone, Tablet, Globe } from 'lucide-react';
import { PlatformSupport } from '@/types/app';

interface PlatformIndicatorProps {
  platform: string;
  supportDetails?: PlatformSupport;
  showDetails?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function PlatformIndicator({ 
  platform, 
  supportDetails,
  showDetails = false,
  size = 'md'
}: PlatformIndicatorProps) {
  const platforms = platform.split(',').map(p => p.trim());
  
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  const badgeSizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };
  
  const getPlatformIcon = (platformName: string) => {
    const iconClass = sizeClasses[size];
    
    if (platformName.includes('Mac')) {
      return <Monitor className={iconClass} />;
    } else if (platformName.includes('iOS') || platformName.includes('iPhone')) {
      return <Smartphone className={iconClass} />;
    } else if (platformName.includes('iPad')) {
      return <Tablet className={iconClass} />;
    } else if (platformName.includes('Web')) {
      return <Globe className={iconClass} />;
    } else {
      return <Monitor className={iconClass} />;
    }
  };
  
  const getPlatformStyle = (platformName: string) => {
    // Claude风格的统一平台标签样式
    return 'bg-neutral-100 text-claude-text border border-claude-border-light';
  };

  const getPlatformDetail = (platformName: string) => {
    if (!supportDetails) return null;
    
    if (platformName.includes('Mac')) return supportDetails.Mac;
    if (platformName.includes('iOS')) return supportDetails.iOS;
    if (platformName.includes('iPad')) return supportDetails.iPadOS;
    if (platformName.includes('Web')) return supportDetails.Web;
    
    return null;
  };

  if (!showDetails) {
    return (
      <div className="flex flex-wrap gap-2">
        {platforms.map((platformName, index) => (
          <span 
            key={index}
            className={`inline-flex items-center ${badgeSizeClasses[size]} rounded-lg font-medium shadow-claude ${getPlatformStyle(platformName)}`}
          >
            {getPlatformIcon(platformName)}
            <span className="ml-1.5">{platformName}</span>
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h4 className="font-semibold text-claude-text-heading mb-3">平台支持</h4>
      {platforms.map((platformName, index) => {
        const detail = getPlatformDetail(platformName);
        
        return (
          <div key={index} className="border border-claude-border-light rounded-xl p-4">
            <div className="flex items-center mb-3">
              <span className={`inline-flex items-center ${badgeSizeClasses[size]} rounded-lg font-medium shadow-claude ${getPlatformStyle(platformName)}`}>
                {getPlatformIcon(platformName)}
                <span className="ml-1.5">{platformName}</span>
              </span>
            </div>
            
            {detail && (
              <div className="space-y-2 text-sm text-claude-text-secondary">
                {detail.minVersion && (
                  <div>
                    <span className="font-medium text-claude-text">最低版本要求：</span>
                    {detail.minVersion}
                  </div>
                )}
                
                {detail.features && detail.features.length > 0 && (
                  <div>
                    <span className="font-medium text-claude-text">支持功能：</span>
                    <ul className="list-disc list-inside mt-1">
                      {detail.features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {detail.limitations && detail.limitations.length > 0 && (
                  <div>
                    <span className="font-medium text-claude-text">功能限制：</span>
                    <ul className="list-disc list-inside mt-1">
                      {detail.limitations.map((limitation, idx) => (
                        <li key={idx} className="text-claude-accent">{limitation}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}