import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SupportedLocale } from '@/lib/i18n';

// 支持的货币列表
export const supportedCurrencies = ['USD', 'CNY', 'EUR', 'JPY', 'GBP'] as const;
export type SupportedCurrency = typeof supportedCurrencies[number];

// 货币信息
export interface CurrencyInfo {
  code: SupportedCurrency;
  symbol: string;
  name: string;
  nameZh: string;
}

export const currencyInfoMap: Record<SupportedCurrency, CurrencyInfo> = {
  USD: { code: 'USD', symbol: '$', name: 'US Dollar', nameZh: '美元' },
  CNY: { code: 'CNY', symbol: '¥', name: 'Chinese Yuan', nameZh: '人民币' },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro', nameZh: '欧元' },
  JPY: { code: 'JPY', symbol: '¥', name: 'Japanese Yen', nameZh: '日元' },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound', nameZh: '英镑' },
};

// 汇率数据缓存
interface ExchangeRateCache {
  rates: Record<string, number>;
  lastUpdated: number;
  ttl: number; // 缓存时间（毫秒）
}

// 国际化状态管理
interface I18nState {
  locale: SupportedLocale;
  currency: SupportedCurrency;
  exchangeRates: ExchangeRateCache;
  setLocale: (locale: SupportedLocale) => void;
  setCurrency: (currency: SupportedCurrency) => void;
  updateExchangeRates: (rates: Record<string, number>) => void;
  getExchangeRate: (from: SupportedCurrency, to: SupportedCurrency) => number;
  convertPrice: (amount: number, from: SupportedCurrency, to: SupportedCurrency) => number;
}

// 汇率服务
class ExchangeRateService {
  private static instance: ExchangeRateService;
  private apiUrl = 'https://api.exchangerate-api.com/v4/latest/USD';
  
  static getInstance(): ExchangeRateService {
    if (!ExchangeRateService.instance) {
      ExchangeRateService.instance = new ExchangeRateService();
    }
    return ExchangeRateService.instance;
  }
  
  async fetchExchangeRates(): Promise<Record<string, number>> {
    try {
      const response = await fetch(this.apiUrl);
      const data = await response.json();
      return data.rates;
    } catch (error) {
      console.error('Failed to fetch exchange rates:', error);
      // 返回默认汇率作为fallback
      return {
        USD: 1,
        CNY: 7.2,
        EUR: 0.85,
        JPY: 110,
        GBP: 0.75,
      };
    }
  }
}

// 创建国际化存储
export const useI18nStore = create<I18nState>()(
  persist(
    (set, get) => ({
      locale: 'zh-CN',
      currency: 'USD',
      exchangeRates: {
        rates: {
          USD: 1,
          CNY: 7.2,
          EUR: 0.85,
          JPY: 110,
          GBP: 0.75,
        },
        lastUpdated: Date.now(),
        ttl: 3600000, // 1小时
      },
      
      setLocale: (locale) => set({ locale }),
      
      setCurrency: (currency) => set({ currency }),
      
      updateExchangeRates: (rates) => set({
        exchangeRates: {
          rates,
          lastUpdated: Date.now(),
          ttl: 3600000,
        },
      }),
      
      getExchangeRate: (from, to) => {
        const { exchangeRates } = get();
        
        if (from === to) return 1;
        
        // 检查缓存是否过期
        const isExpired = Date.now() - exchangeRates.lastUpdated > exchangeRates.ttl;
        
        if (isExpired) {
          // 异步更新汇率
          ExchangeRateService.getInstance().fetchExchangeRates().then((rates) => {
            get().updateExchangeRates(rates);
          });
        }
        
        // 通过 USD 作为基准货币进行转换
        const fromRate = exchangeRates.rates[from] || 1;
        const toRate = exchangeRates.rates[to] || 1;
        
        return toRate / fromRate;
      },
      
      convertPrice: (amount, from, to) => {
        const rate = get().getExchangeRate(from, to);
        return amount * rate;
      },
    }),
    {
      name: 'i18n-storage',
      partialize: (state) => ({
        locale: state.locale,
        currency: state.currency,
        exchangeRates: state.exchangeRates,
      }),
    }
  )
);

// 格式化价格的工具函数
export const formatPrice = (
  amount: number,
  currency: SupportedCurrency,
  locale: SupportedLocale
): string => {
  const currencyInfo = currencyInfoMap[currency];
  
  if (amount === 0) {
    return locale === 'zh-CN' ? '免费使用' : 
           locale === 'ja-JP' ? '無料で使用' : 'Free to Use';
  }
  
  // 根据货币和地区格式化数字
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: currency === 'JPY' ? 0 : 2,
    maximumFractionDigits: currency === 'JPY' ? 0 : 2,
  });
  
  try {
    return formatter.format(amount);
  } catch (error) {
    // Fallback 格式化
    return `${currencyInfo.symbol}${amount.toFixed(currency === 'JPY' ? 0 : 2)}`;
  }
};

// 检测用户默认货币的工具函数
export const detectDefaultCurrency = (): SupportedCurrency => {
  const locale = navigator.language || 'en-US';
  
  const currencyMap: Record<string, SupportedCurrency> = {
    'zh': 'CNY',
    'zh-CN': 'CNY',
    'zh-TW': 'CNY',
    'zh-HK': 'CNY',
    'en-US': 'USD',
    'en-GB': 'GBP',
    'ja': 'JPY',
    'ja-JP': 'JPY',
    'de': 'EUR',
    'fr': 'EUR',
    'it': 'EUR',
    'es': 'EUR',
  };
  
  // 先尝试精确匹配
  if (currencyMap[locale]) {
    return currencyMap[locale];
  }
  
  // 再尝试语言前缀匹配
  const langPrefix = locale.split('-')[0];
  if (currencyMap[langPrefix]) {
    return currencyMap[langPrefix];
  }
  
  // 默认返回 USD
  return 'USD';
};