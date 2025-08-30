import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// 支持的语言列表
export const supportedLocales = ['zh-CN', 'en-US', 'ja-JP'] as const;
export type SupportedLocale = typeof supportedLocales[number];

// 语言资源
const resources = {
  'zh-CN': {
    translation: {
      app: {
        name: '应用名称',
        description: '应用描述',
        features: '功能特性',
        developer: '开发者',
        category: '应用分类',
        lastUpdated: '最后更新',
        appSize: '应用大小',
        systemRequirements: '系统要求',
        price: '价格',
        rating: '评分',
        platform: '平台',
        freeToUse: '免费使用',
        officialPrice: '官方价格',
        year: '年',
      },
      ui: {
        buttons: {
          close: '关闭',
          viewInSetapp: '在 Setapp 中查看',
          visitWebsite: '访问官方网站',
          showMore: '查看更多',
          showLess: '收起',
          switchLanguage: '切换语言',
          switchCurrency: '切换货币',
        },
        labels: {
          overview: '概览',
          highlights: '核心亮点',
          detailedFeatures: '详细功能',
          useCases: '使用场景',
          specifications: '技术规格',
          screenshots: '功能截图',
          reviews: '用户评价',
        },
        features: {
          easyToUse: '易于使用',
          easyToUseDesc: '直观的用户界面，快速上手无需学习成本',
          powerful: '功能强大',
          powerfulDesc: '丰富的功能特性，满足专业用户需求',
          efficient: '高效稳定',
          efficientDesc: '经过优化的性能，确保稳定可靠的使用体验',
        },
      },
    },
  },
  'en-US': {
    translation: {
      app: {
        name: 'App Name',
        description: 'App Description',
        features: 'Features',
        developer: 'Developer',
        category: 'Category',
        lastUpdated: 'Last Updated',
        appSize: 'App Size',
        systemRequirements: 'System Requirements',
        price: 'Price',
        rating: 'Rating',
        platform: 'Platform',
        freeToUse: 'Free to Use',
        officialPrice: 'Official Price',
        year: 'year',
      },
      ui: {
        buttons: {
          close: 'Close',
          viewInSetapp: 'View in Setapp',
          visitWebsite: 'Visit Official Website',
          showMore: 'Show More',
          showLess: 'Show Less',
          switchLanguage: 'Switch Language',
          switchCurrency: 'Switch Currency',
        },
        labels: {
          overview: 'Overview',
          highlights: 'Key Features',
          detailedFeatures: 'Detailed Features',
          useCases: 'Use Cases',
          specifications: 'Specifications',
          screenshots: 'Screenshots',
          reviews: 'Reviews',
        },
        features: {
          easyToUse: 'Easy to Use',
          easyToUseDesc: 'Intuitive user interface with no learning curve',
          powerful: 'Powerful',
          powerfulDesc: 'Rich feature set to meet professional user needs',
          efficient: 'Efficient & Stable',
          efficientDesc: 'Optimized performance for reliable user experience',
        },
      },
    },
  },
  'ja-JP': {
    translation: {
      app: {
        name: 'アプリ名',
        description: 'アプリの説明',
        features: '機能',
        developer: '開発者',
        category: 'カテゴリ',
        lastUpdated: '最終更新',
        appSize: 'アプリサイズ',
        systemRequirements: 'システム要件',
        price: '価格',
        rating: '評価',
        platform: 'プラットフォーム',
        freeToUse: '無料で使用',
        officialPrice: '公式価格',
        year: '年',
      },
      ui: {
        buttons: {
          close: '閉じる',
          viewInSetapp: 'Setappで表示',
          visitWebsite: '公式サイトを訪問',
          showMore: 'もっと見る',
          showLess: '折りたたむ',
          switchLanguage: '言語を切り替え',
          switchCurrency: '通貨を切り替え',
        },
        labels: {
          overview: '概要',
          highlights: '主要機能',
          detailedFeatures: '詳細機能',
          useCases: '使用例',
          specifications: '仕様',
          screenshots: 'スクリーンショット',
          reviews: 'レビュー',
        },
        features: {
          easyToUse: '使いやすい',
          easyToUseDesc: '直感的なユーザーインターフェースで学習コストなし',
          powerful: '強力',
          powerfulDesc: 'プロフェッショナルユーザーのニーズに応える豊富な機能',
          efficient: '効率的で安定',
          efficientDesc: '最適化されたパフォーマンスで信頼性の高いユーザー体験',
        },
      },
    },
  },
};

// i18n 配置
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'zh-CN',
    supportedLngs: supportedLocales,
    debug: false,
    detection: {
      order: ['navigator', 'localStorage', 'sessionStorage'],
      caches: ['localStorage', 'sessionStorage'],
      lookupLocalStorage: 'i18nextLng',
      lookupSessionStorage: 'i18nextLng',
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;