import { ExternalLink, Globe, Download, Star } from 'lucide-react';

interface OfficialLinksProps {
  setappLink?: string;
  officialWebsite?: string;
  developer?: string;
  layout?: 'horizontal' | 'vertical';
  showLabels?: boolean;
}

export default function OfficialLinks({ 
  setappLink, 
  officialWebsite, 
  developer,
  layout = 'horizontal',
  showLabels = true 
}: OfficialLinksProps) {
  const handleLinkClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const links = [
    {
      url: setappLink,
      label: '在Setapp中查看',
      icon: <ExternalLink className="w-5 h-5" />,
      bgClass: 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
      priority: 1
    },
    {
      url: officialWebsite,
      label: '访问官方网站',
      icon: <Globe className="w-5 h-5" />,
      bgClass: 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
      priority: 2
    }
  ].filter(link => link.url);

  if (links.length === 0) {
    return (
      <div className="text-center text-gray-500 py-4">
        <Globe className="w-8 h-8 mx-auto mb-2 opacity-50" />
        <p className="text-sm">暂无外部链接</p>
      </div>
    );
  }

  const containerClass = layout === 'horizontal' 
    ? 'flex flex-col sm:flex-row gap-3' 
    : 'flex flex-col gap-3';

  return (
    <div className="space-y-4">
      {showLabels && (
        <h4 className="font-semibold text-neutral-900">相关链接</h4>
      )}
      
      <div className={containerClass}>
        {links.map((link, index) => (
          <button
            key={index}
            onClick={() => handleLinkClick(link.url!)}
            className={`
              flex-1 text-white px-6 py-3 rounded-lg font-medium 
              transition-all duration-200 flex items-center justify-center space-x-2
              hover:shadow-lg hover:scale-105 active:scale-95
              ${link.bgClass}
            `}
            title={link.label}
          >
            {link.icon}
            <span>{link.label}</span>
          </button>
        ))}
      </div>

      {developer && (
        <div className="mt-4 p-3 bg-neutral-50 rounded-lg">
          <div className="flex items-center space-x-2 text-sm text-neutral-700">
            <Star className="w-4 h-4" />
            <span className="font-medium">开发者：</span>
            <span>{developer}</span>
          </div>
        </div>
      )}
    </div>
  );
}