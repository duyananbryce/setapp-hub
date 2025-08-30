import { SupportedLocale } from '@/lib/i18n';
import { SupportedCurrency } from '@/lib/currency';

export interface App {
  名称: string;
  功能描述: string;
  Setapp链接?: string;
  官方网站?: string;
  官方订阅价格: number | string;
  评分: number;
  平台: string;
  
  // 新增：扩展信息字段
  开发者?: string;
  应用分类?: string;
  最后更新?: string;
  应用大小?: string;
  系统要求?: string;
  支持平台?: PlatformSupport;
  功能介绍?: AppFeatureDescription;
}

// 新增：平台支持信息
export interface PlatformSupport {
  Mac: PlatformDetail;
  iOS?: PlatformDetail;
  iPadOS?: PlatformDetail;
  Web?: PlatformDetail;
}

export interface PlatformDetail {
  supported: boolean;
  minVersion?: string;
  features?: string[];
  limitations?: string[];
}

// 新增：中文功能介绍体系
export interface AppFeatureDescription {
  应用概述: string; // 一句话精准概述（30-50字）
  核心亮点: FeatureHighlight[]; // 3-5个主要功能亮点
  详细功能: DetailedFeature[]; // 详细功能模块说明
  使用场景: UseCase[]; // 适用场景和用户群体
  专业特性: ProfessionalFeature[]; // 技术特点和性能优势
  用户收益: UserBenefit[]; // 解决的问题和带来的价值
  工作流程?: WorkflowStep[]; // 典型的使用流程
  集成能力?: IntegrationCapability[]; // 与其他工具的集成
}

// 功能亮点
export interface FeatureHighlight {
  标题: string; // 亮点名称（10-15字）
  描述: string; // 详细说明（30-60字）
  图标?: string; // 对应图标
  重要程度: 'high' | 'medium' | 'low'; // 重要程度
}

// 详细功能模块
export interface DetailedFeature {
  模块名称: string;
  功能说明: string; // 100-200字的详细说明
  子功能?: string[]; // 子功能列表
  技术特点?: string[]; // 技术实现特点
  操作示例?: string; // 使用示例
}

// 使用场景
export interface UseCase {
  场景名称: string;
  适用人群: string; // 目标用户群体
  问题描述: string; // 解决的具体问题
  解决方案: string; // 如何解决
  效果展示?: string; // 预期效果
}

// 专业特性
export interface ProfessionalFeature {
  特性名称: string;
  技术说明: string;
  性能优势: string;
  对比优势?: string; // 与竞品的对比
}

// 用户收益
export interface UserBenefit {
  收益类型: 'efficiency' | 'quality' | 'cost' | 'experience'; // 收益类型
  收益描述: string;
  量化指标?: string; // 可量化的收益
}

// 工作流程步骤
export interface WorkflowStep {
  步骤序号: number;
  步骤名称: string;
  操作说明: string;
  注意事项?: string;
}

// 集成能力
export interface IntegrationCapability {
  集成对象: string; // 集成的工具或平台
  集成方式: string; // 集成方法
  集成效果: string; // 集成后的效果
}

export interface FilterOptions {
  searchTerm: string;
  platform: string;
  priceRange: [number, number];
  minRating: number;
  sortBy: 'name' | 'price' | 'rating' | 'platform';
  sortOrder: 'asc' | 'desc';
}

export interface AppStats {
  totalApps: number;
  macApps: number;
  iosApps: number;
  crossPlatformApps: number;
  averagePrice: number;
  averageRating: number;
}

// 国际化应用内容接口
export interface AppI18nContent {
  locale: SupportedLocale;
  app: {
    name: string;
    description: string;
    features: {
      [key: string]: {
        title: string;
        description: string;
        benefits: string[];
      }
    };
    categories: string[];
    systemRequirements: string;
  };
  ui: {
    buttons: {
      [key: string]: string;
    };
    labels: {
      [key: string]: string;
    };
  };
}

// 增强型应用详情模态框属性
export interface EnhancedAppDetailModalProps {
  app: App | null;
  isOpen: boolean;
  onClose: () => void;
  locale?: SupportedLocale;
  currency?: SupportedCurrency;
  onLocaleChange?: (locale: SupportedLocale) => void;
  onCurrencyChange?: (currency: SupportedCurrency) => void;
  showLanguageSelector?: boolean;
  showCurrencySelector?: boolean;
  featureDisplayMode?: 'grid' | 'carousel' | 'tabs';
}

// 价格显示组件属性
export interface PriceDisplayProps {
  basePrice: number;
  baseCurrency: 'USD';
  targetCurrency?: SupportedCurrency;
  showConverter?: boolean;
  displayMode: 'compact' | 'detailed' | 'comparison';
  locale?: SupportedLocale;
}

// 功能画廊组件属性
export interface FeatureGalleryProps {
  features: EnhancedFeature[];
  displayMode: 'grid' | 'carousel' | 'tabs';
  locale: SupportedLocale;
  showScreenshots: boolean;
  autoplayCarousel?: boolean;
}

// 增强型功能特性
export interface EnhancedFeature {
  title: string;
  description: string;
  icon?: string;
  screenshot?: string;
  benefits: string[];
  category: 'core' | 'advanced' | 'integration';
  priority: number;
}

// 语言货币选择器组件属性
export interface LanguageCurrencySelectorProps {
  currentLocale: SupportedLocale;
  currentCurrency: SupportedCurrency;
  onLocaleChange: (locale: SupportedLocale) => void;
  onCurrencyChange: (currency: SupportedCurrency) => void;
  position: 'header' | 'floating' | 'sidebar';
  compact?: boolean;
}