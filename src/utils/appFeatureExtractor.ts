import { App } from '@/types/app';
import { SupportedLocale } from '@/lib/i18n';

/**
 * 智能应用功能提取器
 * 基于应用的实际功能描述生成个性化的核心功能和技术特点
 */

// 功能关键词映射表 - 更全面和精确
const FEATURE_KEYWORDS = {
  // 截图和录制
  screenshot: {
    keywords: ['截图', '屏幕录制', 'screenshot', 'capture', '录制', '标注', '编辑', '分享'],
    coreFeatures: {
      'zh-CN': ['智能截图捕获', '实时编辑标注', '快速分享发布'],
      'en-US': ['Smart Screenshot Capture', 'Real-time Editing & Annotation', 'Quick Share & Publish'],
      'ja-JP': ['スマートスクリーンショット', 'リアルタイム編集・注釈', 'クイック共有・発行']
    },
    technicalFeatures: {
      'zh-CN': ['高效图像处理引擎', '多格式导出支持', '云端同步技术'],
      'en-US': ['Efficient Image Processing Engine', 'Multi-format Export Support', 'Cloud Sync Technology'],
      'ja-JP': ['効率的画像処理エンジン', 'マルチフォーマット対応', 'クラウド同期技術']
    }
  },

  // 系统清理和优化
  cleanup: {
    keywords: ['清理', '优化', '垃圾', 'clean', 'optimize', '缓存', '重复', '卸载', '性能'],
    coreFeatures: {
      'zh-CN': ['深度系统扫描', '智能垃圾识别', '安全文件清理'],
      'en-US': ['Deep System Scanning', 'Smart Junk Detection', 'Safe File Cleanup'],
      'ja-JP': ['深度システムスキャン', 'スマートジャンク検出', '安全ファイル削除']
    },
    technicalFeatures: {
      'zh-CN': ['先进扫描算法', '安全删除机制', '实时监控系统'],
      'en-US': ['Advanced Scanning Algorithm', 'Safe Deletion Mechanism', 'Real-time Monitoring'],
      'ja-JP': ['高度スキャンアルゴリズム', '安全削除メカニズム', 'リアルタイム監視']
    }
  },

  // PDF处理
  pdf: {
    keywords: ['PDF', 'pdf', '文档', '编辑', '转换', '合并', '拆分', '签名', 'OCR'],
    coreFeatures: {
      'zh-CN': ['专业PDF编辑', 'OCR文字识别', '格式转换处理'],
      'en-US': ['Professional PDF Editing', 'OCR Text Recognition', 'Format Conversion'],
      'ja-JP': ['プロフェッショナルPDF編集', 'OCRテキスト認識', 'フォーマット変換']
    },
    technicalFeatures: {
      'zh-CN': ['高精度OCR引擎', '无损格式转换', '数字签名验证'],
      'en-US': ['High-precision OCR Engine', 'Lossless Format Conversion', 'Digital Signature Verification'],
      'ja-JP': ['高精度OCRエンジン', '無損失フォーマット変換', 'デジタル署名検証']
    }
  },

  // 思维导图和笔记
  mindmap: {
    keywords: ['思维导图', '笔记', 'mind', 'note', '整理', '知识', '管理', '协作'],
    coreFeatures: {
      'zh-CN': ['可视化思维整理', '实时协作编辑', '多平台同步'],
      'en-US': ['Visual Mind Organization', 'Real-time Collaborative Editing', 'Multi-platform Sync'],
      'ja-JP': ['視覚的思考整理', 'リアルタイム協働編集', 'マルチプラットフォーム同期']
    },
    technicalFeatures: {
      'zh-CN': ['云端实时同步', '智能布局算法', '多媒体集成'],
      'en-US': ['Cloud Real-time Sync', 'Smart Layout Algorithm', 'Multimedia Integration'],
      'ja-JP': ['クラウドリアルタイム同期', 'スマートレイアウトアルゴリズム', 'マルチメディア統合']
    }
  },

  // 菜单栏管理
  menubar: {
    keywords: ['菜单栏', 'menu', 'bar', '管理', '隐藏', '图标', '整理'],
    coreFeatures: {
      'zh-CN': ['菜单栏图标管理', '智能显示隐藏', '自定义排列'],
      'en-US': ['Menu Bar Icon Management', 'Smart Show/Hide', 'Custom Arrangement'],
      'ja-JP': ['メニューバーアイコン管理', 'スマート表示・非表示', 'カスタム配置']
    },
    technicalFeatures: {
      'zh-CN': ['系统级权限管理', '实时状态监控', '内存优化技术'],
      'en-US': ['System-level Permission Management', 'Real-time Status Monitoring', 'Memory Optimization'],
      'ja-JP': ['システムレベル権限管理', 'リアルタイム状態監視', 'メモリ最適化技術']
    }
  },

  // 代码和开发
  development: {
    keywords: ['代码', '开发', 'code', 'dev', 'programming', 'AI', '编程', '格式化', '片段'],
    coreFeatures: {
      'zh-CN': ['智能代码管理', 'AI辅助编程', '代码质量检测'],
      'en-US': ['Intelligent Code Management', 'AI-Assisted Programming', 'Code Quality Detection'],
      'ja-JP': ['インテリジェントコード管理', 'AI支援プログラミング', 'コード品質検出']
    },
    technicalFeatures: {
      'zh-CN': ['机器学习算法', '多语言支持', '实时错误检测'],
      'en-US': ['Machine Learning Algorithms', 'Multi-language Support', 'Real-time Error Detection'],
      'ja-JP': ['機械学習アルゴリズム', '多言語サポート', 'リアルタイムエラー検出']
    }
  },

  // 系统增强
  system: {
    keywords: ['系统', '增强', '自定义', 'system', 'enhance', '快捷', '效率', '插件'],
    coreFeatures: {
      'zh-CN': ['系统功能增强', '个性化定制', '快捷操作集成'],
      'en-US': ['System Function Enhancement', 'Personalized Customization', 'Shortcut Integration'],
      'ja-JP': ['システム機能強化', 'パーソナライズカスタマイズ', 'ショートカット統合']
    },
    technicalFeatures: {
      'zh-CN': ['深度系统集成', '插件化架构', '低级别API调用'],
      'en-US': ['Deep System Integration', 'Plugin Architecture', 'Low-level API Calls'],
      'ja-JP': ['深度システム統合', 'プラグインアーキテクチャ', '低レベルAPI呼び出し']
    }
  },

  // 音频处理
  audio: {
    keywords: ['音频', '录音', 'audio', 'record', '声音', '音乐', '编辑', '处理'],
    coreFeatures: {
      'zh-CN': ['高质量音频录制', '智能降噪处理', '多格式转换'],
      'en-US': ['High-quality Audio Recording', 'Smart Noise Reduction', 'Multi-format Conversion'],
      'ja-JP': ['高品質オーディオ録音', 'スマートノイズリダクション', 'マルチフォーマット変換']
    },
    technicalFeatures: {
      'zh-CN': ['DSP数字信号处理', '实时音频分析', '无损压缩算法'],
      'en-US': ['DSP Digital Signal Processing', 'Real-time Audio Analysis', 'Lossless Compression'],
      'ja-JP': ['DSPデジタル信号処理', 'リアルタイム音声解析', '無損失圧縮アルゴリズム']
    }
  },

  // 视频处理
  video: {
    keywords: ['视频', '录制', 'video', 'record', '编辑', '剪辑', '转换', '压缩'],
    coreFeatures: {
      'zh-CN': ['专业视频编辑', '高效编码压缩', '实时预览渲染'],
      'en-US': ['Professional Video Editing', 'Efficient Encoding Compression', 'Real-time Preview Rendering'],
      'ja-JP': ['プロフェッショナルビデオ編集', '効率的エンコード圧縮', 'リアルタイムプレビュー']
    },
    technicalFeatures: {
      'zh-CN': ['硬件加速编码', '多轨道处理', 'GPU优化渲染'],
      'en-US': ['Hardware-accelerated Encoding', 'Multi-track Processing', 'GPU-optimized Rendering'],
      'ja-JP': ['ハードウェア加速エンコード', 'マルチトラック処理', 'GPU最適化レンダリング']
    }
  },

  // 文件管理
  file: {
    keywords: ['文件', '管理', 'file', 'manage', '整理', '搜索', '同步', '备份'],
    coreFeatures: {
      'zh-CN': ['智能文件整理', '快速搜索定位', '自动同步备份'],
      'en-US': ['Smart File Organization', 'Quick Search & Locate', 'Automatic Sync & Backup'],
      'ja-JP': ['スマートファイル整理', 'クイック検索・位置特定', '自動同期・バックアップ']
    },
    technicalFeatures: {
      'zh-CN': ['高效索引算法', '增量同步技术', '元数据分析'],
      'en-US': ['Efficient Indexing Algorithm', 'Incremental Sync Technology', 'Metadata Analysis'],
      'ja-JP': ['効率的インデックスアルゴリズム', '増分同期技術', 'メタデータ解析']
    }
  },

  // 安全和隐私
  security: {
    keywords: ['密码', '安全', '加密', 'password', 'security', 'encrypt', '隐私', '保护'],
    coreFeatures: {
      'zh-CN': ['军用级加密保护', '智能密码生成', '安全数据同步'],
      'en-US': ['Military-grade Encryption', 'Smart Password Generation', 'Secure Data Sync'],
      'ja-JP': ['軍用グレード暗号化', 'スマートパスワード生成', '安全データ同期']
    },
    technicalFeatures: {
      'zh-CN': ['AES-256位加密', '零知识架构', '生物识别验证'],
      'en-US': ['AES-256 Encryption', 'Zero-knowledge Architecture', 'Biometric Authentication'],
      'ja-JP': ['AES-256暗号化', 'ゼロナレッジアーキテクチャ', '生体認証']
    }
  }
};

/**
 * 从应用描述中提取关键词并匹配功能类型
 */
function detectAppType(app: App): string | null {
  const description = app.功能描述.toLowerCase();
  const appName = app.名称.toLowerCase();
  const combinedText = `${description} ${appName}`;

  let maxScore = 0;
  let detectedType: string | null = null;

  // 计算每种类型的匹配分数
  for (const [type, config] of Object.entries(FEATURE_KEYWORDS)) {
    let score = 0;
    for (const keyword of config.keywords) {
      const keywordLower = keyword.toLowerCase();
      // 计算关键词在描述中出现的次数
      const occurrences = (combinedText.match(new RegExp(keywordLower, 'g')) || []).length;
      score += occurrences;
    }
    
    if (score > maxScore && score > 0) {
      maxScore = score;
      detectedType = type;
    }
  }

  return detectedType;
}

/**
 * 从功能描述中智能提取关键功能点
 */
function extractKeyPointsFromDescription(description: string): string[] {
  const keyPoints: string[] = [];
  
  // 分句处理
  const sentences = description.split(/[。！？；.!?;]/)
    .map(s => s.trim())
    .filter(s => s.length > 5);

  // 功能关键词匹配
  const functionKeywords = [
    '支持', '提供', '实现', '具备', '包含', '内置', '集成', '优化', '增强', '改善',
    'support', 'provide', 'feature', 'include', 'built-in', 'integrate', 'optimize', 'enhance'
  ];

  for (const sentence of sentences) {
    // 查找包含功能关键词的句子
    if (functionKeywords.some(keyword => sentence.includes(keyword))) {
      // 提取关键短语（去除冗余词汇）
      const cleanSentence = sentence
        .replace(/通过|让你|帮助|可以|能够|支持|提供/g, '')
        .replace(/，.*$/, '') // 移除逗号后的内容
        .trim();
      
      if (cleanSentence.length > 3 && cleanSentence.length < 50) {
        keyPoints.push(cleanSentence);
      }
    }
  }

  return keyPoints.slice(0, 3); // 限制为最多3个
}

/**
 * 智能提取应用核心功能
 */
export function extractCoreFeatures(app: App, locale: SupportedLocale = 'zh-CN'): string[] {
  // 首先尝试基于类型匹配
  const appType = detectAppType(app);
  
  if (appType && FEATURE_KEYWORDS[appType]) {
    const typeFeatures = FEATURE_KEYWORDS[appType].coreFeatures[locale];
    if (typeFeatures) {
      return [...typeFeatures];
    }
  }

  // 如果类型匹配失败，则从描述中智能提取
  const extractedPoints = extractKeyPointsFromDescription(app.功能描述);
  
  if (extractedPoints.length >= 2) {
    return extractedPoints;
  }

  // 最后的兜底策略：基于应用名称生成通用功能
  const appNameLower = app.名称.toLowerCase();
  const fallbackFeatures = {
    'zh-CN': [
      `${app.名称}的核心功能实现`,
      '用户友好的操作界面',
      '高效稳定的性能表现'
    ],
    'en-US': [
      `Core functionality of ${app.名称}`,
      'User-friendly interface',
      'Efficient and stable performance'
    ],
    'ja-JP': [
      `${app.名称}のコア機能実装`,
      'ユーザーフレンドリーなインターフェース',
      '効率的で安定したパフォーマンス'
    ]
  };

  return fallbackFeatures[locale];
}

/**
 * 智能生成技术特点
 */
export function generateTechnicalFeatures(app: App, locale: SupportedLocale = 'zh-CN'): string[] {
  const appType = detectAppType(app);
  const features: string[] = [];

  // 基于应用类型的技术特点
  if (appType && FEATURE_KEYWORDS[appType]) {
    const typeFeatures = FEATURE_KEYWORDS[appType].technicalFeatures[locale];
    if (typeFeatures) {
      features.push(...typeFeatures);
    }
  }

  // 基于平台的技术特点
  if (app.平台) {
    const platformFeatures = {
      'zh-CN': {
        'Mac': '原生macOS深度集成',
        'iOS': '原生iOS系统优化',
        'Mac,iOS': '跨平台数据同步'
      },
      'en-US': {
        'Mac': 'Native macOS Deep Integration',
        'iOS': 'Native iOS System Optimization', 
        'Mac,iOS': 'Cross-platform Data Sync'
      },
      'ja-JP': {
        'Mac': 'ネイティブmacOS深度統合',
        'iOS': 'ネイティブiOSシステム最適化',
        'Mac,iOS': 'クロスプラットフォームデータ同期'
      }
    };

    const platformKey = app.平台.includes('Mac') && app.平台.includes('iOS') ? 'Mac,iOS' : app.平台;
    const platformFeature = platformFeatures[locale][platformKey];
    if (platformFeature && !features.includes(platformFeature)) {
      features.unshift(platformFeature); // 添加到开头
    }
  }

  // 基于评分的质量特点
  if (app.评分 >= 95) {
    const excellentFeatures = {
      'zh-CN': '卓越的软件工程质量',
      'en-US': 'Excellent Software Engineering Quality',
      'ja-JP': '卓越したソフトウェアエンジニアリング品質'
    };
    features.push(excellentFeatures[locale]);
  } else if (app.评分 >= 85) {
    const goodFeatures = {
      'zh-CN': '可靠稳定的性能表现',
      'en-US': 'Reliable and Stable Performance',
      'ja-JP': '信頼性と安定したパフォーマンス'
    };
    features.push(goodFeatures[locale]);
  }

  // 确保至少有3个特点
  while (features.length < 3) {
    const additionalFeatures = {
      'zh-CN': [
        '内存占用优化技术',
        '用户数据隐私保护',
        '持续更新维护支持'
      ],
      'en-US': [
        'Memory Usage Optimization',
        'User Data Privacy Protection', 
        'Continuous Update Support'
      ],
      'ja-JP': [
        'メモリ使用量最適化技術',
        'ユーザーデータプライバシー保護',
        '継続的アップデートサポート'
      ]
    };

    for (const feature of additionalFeatures[locale]) {
      if (!features.includes(feature) && features.length < 3) {
        features.push(feature);
      }
    }
  }

  return features.slice(0, 3);
}

/**
 * 智能生成使用场景
 */
export function generateUseCases(app: App, locale: SupportedLocale = 'zh-CN'): string[] {
  const appType = detectAppType(app);
  const description = app.功能描述;
  
  // 基于应用类型的使用场景
  const typeUseCases = {
    screenshot: {
      'zh-CN': ['产品演示和教程制作', '设计稿标注和反馈', '技术问题截图报告'],
      'en-US': ['Product demos and tutorials', 'Design annotation and feedback', 'Technical issue screenshots'],
      'ja-JP': ['製品デモとチュートリアル作成', 'デザイン注釈とフィードバック', '技術問題スクリーンショット']
    },
    cleanup: {
      'zh-CN': ['定期系统维护清理', '软件卸载残留清除', '存储空间紧急释放'],
      'en-US': ['Regular system maintenance', 'Uninstall leftover cleanup', 'Emergency storage release'],
      'ja-JP': ['定期システムメンテナンス', 'アンインストール残留クリーンアップ', '緊急ストレージ解放']
    },
    pdf: {
      'zh-CN': ['合同文档编辑签名', '学术论文整理发表', '报告制作格式转换'],
      'en-US': ['Contract editing and signing', 'Academic paper organization', 'Report creation and conversion'],
      'ja-JP': ['契約文書編集・署名', '学術論文整理・発表', 'レポート作成・変換']
    },
    mindmap: {
      'zh-CN': ['项目规划头脑风暴', '学习笔记知识整理', '团队协作想法共享'],
      'en-US': ['Project planning brainstorming', 'Study notes organization', 'Team collaboration sharing'],
      'ja-JP': ['プロジェクト企画ブレインストーミング', '学習ノート知識整理', 'チーム協働アイデア共有']
    },
    development: {
      'zh-CN': ['代码片段管理重用', 'AI辅助代码优化', '代码质量检测提升'],
      'en-US': ['Code snippet management', 'AI-assisted optimization', 'Code quality enhancement'],
      'ja-JP': ['コードスニペット管理・再利用', 'AI支援コード最適化', 'コード品質検出・向上']
    }
  };

  if (appType && typeUseCases[appType]) {
    return typeUseCases[appType][locale];
  }

  // 通用使用场景
  const generalUseCases = {
    'zh-CN': ['日常工作效率提升', '专业任务处理优化', '个人数字生活改善'],
    'en-US': ['Daily work efficiency', 'Professional task optimization', 'Personal digital life improvement'],
    'ja-JP': ['日常業務効率向上', '専門タスク処理最適化', '個人デジタルライフ改善']
  };

  return generalUseCases[locale];
}

/**
 * 智能生成适用人群
 */
export function generateTargetAudience(app: App, locale: SupportedLocale = 'zh-CN'): string[] {
  const appType = detectAppType(app);
  
  const typeAudiences = {
    screenshot: {
      'zh-CN': ['设计师和创意工作者', '技术文档编写者', '产品经理和演示者'],
      'en-US': ['Designers and creatives', 'Technical writers', 'Product managers and presenters'],
      'ja-JP': ['デザイナーとクリエイティブワーカー', '技術文書作成者', '製品マネージャーとプレゼンター']
    },
    cleanup: {
      'zh-CN': ['Mac系统深度用户', '存储空间管理者', '系统性能优化者'],
      'en-US': ['Mac power users', 'Storage managers', 'Performance optimizers'],
      'ja-JP': ['Macシステムパワーユーザー', 'ストレージ管理者', 'パフォーマンス最適化者']
    },
    pdf: {
      'zh-CN': ['办公文档处理者', '学术研究工作者', '法务和合规人员'],
      'en-US': ['Document processors', 'Academic researchers', 'Legal and compliance staff'],
      'ja-JP': ['文書処理者', '学術研究者', '法務・コンプライアンス担当者']
    },
    development: {
      'zh-CN': ['软件开发工程师', 'AI技术研究者', '代码质量管理者'],
      'en-US': ['Software developers', 'AI researchers', 'Code quality managers'],
      'ja-JP': ['ソフトウェア開発エンジニア', 'AI技術研究者', 'コード品質管理者']
    }
  };

  if (appType && typeAudiences[appType]) {
    return typeAudiences[appType][locale];
  }

  // 通用适用人群
  const generalAudiences = {
    'zh-CN': ['专业领域工作者', '效率工具使用者', '数字化办公人员'],
    'en-US': ['Professional workers', 'Productivity tool users', 'Digital office workers'],
    'ja-JP': ['専門分野労働者', '生産性ツールユーザー', 'デジタルオフィスワーカー']
  };

  return generalAudiences[locale];
}