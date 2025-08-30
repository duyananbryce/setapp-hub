import { SupportedLocale } from '@/lib/i18n';

/**
 * 应用描述智能翻译系统 V2
 * 为每个应用提供个性化的多语言描述，避免通用模板
 */

// 具体应用的个性化描述映射
const SPECIFIC_APP_DESCRIPTIONS = {
  'CleanShot X': {
    'en-US': 'Professional screenshot and screen recording tool with powerful annotation features, cloud sharing, and advanced editing capabilities.',
    'ja-JP': 'プロフェッショナルなスクリーンショットと画面録画ツール。強力な注釈機能、クラウド共有、高度な編集機能を提供。'
  },
  'Bartender 4': {
    'en-US': 'Organize and control your Mac menu bar items. Hide, show, and rearrange menu bar icons for a cleaner desktop experience.',
    'ja-JP': 'Macのメニューバー項目を整理・制御。メニューバーアイコンの非表示、表示、並び替えでデスクトップをクリーンに。'
  },
  'Bartender': {
    'en-US': 'Organize and control your Mac menu bar items. Hide, show, and rearrange menu bar icons for a cleaner desktop experience.',
    'ja-JP': 'Macのメニューバー項目を整理・制御。メニューバーアイコンの非表示、表示、並び替えでデスクトップをクリーンに。'
  },
  'TablePlus': {
    'en-US': 'Modern, native database management tool with intuitive GUI for multiple database systems including MySQL, PostgreSQL, SQLite.',
    'ja-JP': 'MySQL、PostgreSQL、SQLiteなど複数のデータベースシステムに対応した直感的なGUIを持つモダンなデータベース管理ツール。'
  },
  'Ulysses': {
    'en-US': 'Powerful writing app for creative writers, bloggers, and students. Features distraction-free interface, markup-based text editor.',
    'ja-JP': 'クリエイティブライター、ブロガー、学生向けの強力な執筆アプリ。集中できるインターフェース、マークアップベースのテキストエディター。'
  },
  'MindNode – Mind Map & Outline': {
    'en-US': 'Delightful mind mapping and visual brainstorming tool. Create beautiful mind maps with infinite canvas and powerful organization.',
    'ja-JP': '楽しいマインドマッピングとビジュアルブレインストーミングツール。無限キャンバスと強力な整理機能で美しいマインドマップを作成。'
  },
  'TextSniper': {
    'en-US': 'Extract and recognize text from images, videos, and other non-selectable content using advanced OCR technology.',
    'ja-JP': '高度なOCR技術を使用して、画像、動画、その他の選択できないコンテンツからテキストを抽出・認識。'
  },
  'CleanMyMac': {
    'en-US': 'All-in-one Mac optimization and cleaning tool. Remove junk files, malware, and optimize system performance.',
    'ja-JP': 'オールインワンのMac最適化・クリーニングツール。ジャンクファイル、マルウェアを削除し、システムパフォーマンスを最適化。'
  },
  'Numi': {
    'en-US': 'Beautiful calculator app that combines text and math. Write calculations naturally and see results in real-time.',
    'ja-JP': 'テキストと数学を組み合わせた美しい計算機アプリ。自然に計算を書いてリアルタイムで結果を確認。'
  },
  'DevUtils': {
    'en-US': 'All-in-one toolbox for developers. JSON formatter, hash generator, timestamp converter, and more developer utilities.',
    'ja-JP': '開発者向けオールインワンツールボックス。JSONフォーマッター、ハッシュ生成器、タイムスタンプ変換器など。'
  },
  'Proxyman': {
    'en-US': 'Modern web debugging proxy for macOS. Capture, inspect, and manipulate HTTP/HTTPS traffic with ease.',
    'ja-JP': 'macOS向けモダンWebデバッグプロキシ。HTTP/HTTPSトラフィックのキャプチャ、検査、操作を簡単に。'
  },
  'Soulver 3': {
    'en-US': 'Notepad calculator that solves math as you type. Perfect for everyday calculations with natural language support.',
    'ja-JP': '入力しながら数学を解くノートパッド計算機。自然言語サポートで日常の計算に最適。'
  },
  'Dash': {
    'en-US': 'API documentation browser and code snippet manager. Instant offline access to 200+ documentation sets.',
    'ja-JP': 'APIドキュメントブラウザとコードスニペットマネージャー。200以上のドキュメントセットへのオフライン即座アクセス。'
  },
  'BetterTouchTool': {
    'en-US': 'Powerful customization tool for trackpads, mice, and keyboards. Create custom gestures and shortcuts.',
    'ja-JP': 'トラックパッド、マウス、キーボード用強力なカスタマイゼーションツール。カスタムジェスチャーとショートカットを作成。'
  },
  'Timing': {
    'en-US': 'Automatic time tracking for Mac. See exactly how you spend your time across apps, documents, and websites.',
    'ja-JP': 'Mac用自動時間追跡。アプリ、ドキュメント、ウェブサイトでの時間の使い方を正確に把握。'
  },
  'PopClip': {
    'en-US': 'Text selection popup tool with customizable actions. Copy, paste, search, and transform text efficiently.',
    'ja-JP': 'カスタマイズ可能なアクション付きテキスト選択ポップアップツール。コピー、ペースト、検索、テキスト変換を効率的に。'
  },
  'Paste': {
    'en-US': 'Smart clipboard manager that stores everything you copy. Search, organize, and reuse your clipboard history.',
    'ja-JP': 'コピーしたすべてを保存するスマートクリップボードマネージャー。クリップボード履歴の検索、整理、再利用。'
  },
  // 添加更多DOM中表示的应用
  '24 Hour Wallpaper': {
    'en-US': 'Automatic wallpaper changer that cycles through beautiful images throughout the day based on time and lighting.',
    'ja-JP': '時間と照明に基づいて一日を通して美しい画像を循環する自動壁紙チェンジャー。'
  },
  '2Do': {
    'en-US': 'Powerful task manager and to-do list app with advanced features, project organization, and flexible workflow management.',
    'ja-JP': '高度な機能、プロジェクト整理、柔軟なワークフロー管理を備えた強力なタスクマネージャーとTo-Doリストアプリ。'
  },
  'AdLock': {
    'en-US': 'Advanced ad blocker and privacy protection tool that blocks ads, trackers, and malicious content across all apps.',
    'ja-JP': 'すべてのアプリで広告、トラッカー、悪意のあるコンテンツをブロックする高度な広告ブロッカーとプライバシー保護ツール。'
  },
  'AirBuddy': {
    'en-US': 'AirPods battery level monitor and connection manager that provides detailed information about your AirPods status.',
    'ja-JP': 'AirPodsのバッテリーレベル監視と接続管理により、AirPodsの状態に関する詳細情報を提供。'
  },
  'AlDente Pro': {
    'en-US': 'Battery charge limiter for MacBook that helps extend battery lifespan by controlling charging behavior and thermal management.',
    'ja-JP': '充電動作と熱管理を制御してバッテリーの寿命を延ばすMacBook用バッテリー充電制限ツール。'
  },
  'Almighty': {
    'en-US': 'Comprehensive system monitor and performance optimizer that provides detailed insights into Mac system resources and performance.',
    'ja-JP': 'Macシステムリソースとパフォーマンスに関する詳細な洞察を提供する包括的なシステムモニターとパフォーマンスオプティマイザー。'
  },
  'Antinote': {
    'en-US': 'Minimalist note-taking app with markdown support, distraction-free writing environment, and powerful organization features.',
    'ja-JP': 'マークダウンサポート、集中できる執筆環境、強力な整理機能を備えたミニマリストノート作成アプリ。'
  },
  'AnyDroid': {
    'en-US': 'Android device manager for Mac that enables file transfer, data backup, and device management for Android smartphones.',
    'ja-JP': 'Androidスマートフォンのファイル転送、データバックアップ、デバイス管理を可能にするMac用Androidデバイスマネージャー。'
  },
  'AnyTrans for iOS': {
    'en-US': 'Complete iOS device manager for transferring, backing up, and organizing iPhone and iPad content without iTunes.',
    'ja-JP': 'iTunesなしでiPhoneとiPadコンテンツの転送、バックアップ、整理を行う完全なiOSデバイスマネージャー。'
  },
  'App Tamer': {
    'en-US': 'CPU usage controller that prevents apps from consuming excessive system resources and slowing down your Mac.',
    'ja-JP': 'アプリが過度のシステムリソースを消費してMacを遅くするのを防ぐCPU使用量コントローラー。'
  },
  'AppWage': {
    'en-US': 'App Store analytics and sales tracking tool for iOS and Mac app developers to monitor revenue and download statistics.',
    'ja-JP': 'iOSとMacアプリ開発者向けの収益とダウンロード統計を監視するApp Storeアナリティクスと売上追跡ツール。'
  },
  'Archiver': {
    'en-US': 'Powerful file archiver that creates and extracts compressed archives in multiple formats with advanced compression options.',
    'ja-JP': '高度な圧縮オプションで複数の形式の圧縮アーカイブを作成・抽出する強力なファイルアーカイバー。'
  },
  'Asset Catalog Creator Pro': {
    'en-US': 'iOS and macOS app icon generator that creates all required icon sizes and formats for App Store submission.',
    'ja-JP': 'App Store提出に必要なすべてのアイコンサイズと形式を作成するiOSとmacOSアプリアイコンジェネレーター。'
  },
  'Awesome Habits': {
    'en-US': 'Habit tracking app that helps build positive routines and break bad habits with visual progress tracking and motivational features.',
    'ja-JP': '視覚的な進捗追跡とモチベーション機能で良い習慣を築き、悪い習慣を断つのを助ける習慣追跡アプリ。'
  },
  'Backtrack': {
    'en-US': 'Screen recording tool that continuously records your screen in the background, allowing you to save important moments retroactively.',
    'ja-JP': 'バックグラウンドで画面を継続的に録画し、重要な瞬間を遡って保存できる画面録画ツール。'
  },
  'Base': {
    'en-US': 'SQLite database editor with modern interface for creating, editing, and managing SQLite databases with powerful query tools.',
    'ja-JP': '強力なクエリツールでSQLiteデータベースの作成、編集、管理を行うモダンインターフェースのSQLiteデータベースエディター。'
  },
  // 第二批应用描述
  'Batteries': {
    'en-US': 'Monitor battery levels of all your connected devices including AirPods, iPhone, iPad, and other Bluetooth accessories from the menu bar.',
    'ja-JP': 'AirPods、iPhone、iPad、その他のBluetoothアクセサリなど、接続されたすべてのデバイスのバッテリーレベルをメニューバーから監視。'
  },
  'Be Focused': {
    'en-US': 'Pomodoro timer app that helps maintain focus and productivity with customizable work and break intervals.',
    'ja-JP': 'カスタマイズ可能な作業と休憩の間隔で集中力と生産性を維持するポモドーロタイマーアプリ。'
  },
  'BetterZip': {
    'en-US': 'Archive utility that lets you preview and extract files from compressed archives without fully extracting them.',
    'ja-JP': '完全に抽出することなく圧縮アーカイブからファイルをプレビューして抽出できるアーカイブユーティリティ。'
  },
  'Bike': {
    'en-US': 'Fast and fluid outliner for organizing thoughts, ideas, and projects with powerful keyboard navigation.',
    'ja-JP': '強力なキーボードナビゲーションで思考、アイデア、プロジェクトを整理する高速で流暢なアウトライナー。'
  },
  'BoltAI': {
    'en-US': 'AI-powered writing assistant that helps with content creation, coding, and learning tasks using advanced language models.',
    'ja-JP': '高度な言語モデルを使用してコンテンツ作成、コーディング、学習タスクを支援するAI搭載ライティングアシスタント。'
  },
  'Boom 3D': {
    'en-US': 'Audio enhancer that delivers immersive 3D surround sound experience with volume booster and equalizer.',
    'ja-JP': 'ボリュームブースターとイコライザーで没入感のある3Dサラウンドサウンド体験を提供するオーディオエンハンサー。'
  },
  'BusyCal': {
    'en-US': 'Advanced calendar app with task management, weather integration, and powerful scheduling features.',
    'ja-JP': 'タスク管理、天気統合、強力なスケジューリング機能を備えた高度なカレンダーアプリ。'
  },
  'BusyContacts': {
    'en-US': 'Contact management app that organizes and syncs contacts with advanced search and customization options.',
    'ja-JP': '高度な検索とカスタマイズオプションで連絡先を整理・同期する連絡先管理アプリ。'
  },
  'CameraBag Pro': {
    'en-US': 'Photo and video editor with vintage filters, advanced color correction, and professional editing tools.',
    'ja-JP': 'ヴィンテージフィルター、高度な色補正、プロフェッショナル編集ツールを備えた写真・動画エディター。'
  },
  'Canary Mail': {
    'en-US': 'Secure email client with end-to-end encryption, unified inbox, and intelligent filtering features.',
    'ja-JP': 'エンドツーエンド暗号化、統合受信箱、インテリジェントフィルタリング機能を備えたセキュアメールクライアント。'
  },
  'Capto': {
    'en-US': 'Screen recording and image capture tool with advanced editing, annotation, and sharing capabilities.',
    'ja-JP': '高度な編集、注釈、共有機能を備えた画面録画・画像キャプチャツール。'
  },
  'ChatMate for WhatsApp': {
    'en-US': 'WhatsApp client for Mac that brings native WhatsApp experience to your desktop with enhanced features.',
    'ja-JP': '強化された機能でネイティブなWhatsApp体験をデスクトップにもたらすMac用WhatsAppクライアント。'
  },
  'Chronicle': {
    'en-US': 'Bill tracking and subscription management app that monitors recurring payments and upcoming due dates.',
    'ja-JP': '定期支払いと今後の支払期日を監視する請求書追跡・サブスクリプション管理アプリ。'
  },
  'ChronoSync Express': {
    'en-US': 'File synchronization tool that keeps folders in sync between different locations and devices.',
    'ja-JP': '異なる場所とデバイス間でフォルダーの同期を保つファイル同期ツール。'
  },
  'Clariti': {
    'en-US': 'Focus and concentration app that uses ambient sounds and guided meditation to enhance mental clarity.',
    'ja-JP': '環境音とガイド付き瞑想を使用して精神的な明晰さを高める集中・瞑想アプリ。'
  },
  'ClearVPN': {
    'en-US': 'User-friendly VPN service with intelligent connection modes and privacy protection for safe browsing.',
    'ja-JP': 'インテリジェント接続モードと安全なブラウジングのためのプライバシー保護を備えたユーザーフレンドリーなVPNサービス。'
  },
  'Clop': {
    'en-US': 'Image, video, and PDF compression tool that automatically optimizes file sizes while maintaining quality.',
    'ja-JP': '品質を維持しながらファイルサイズを自動的に最適化する画像、動画、PDF圧縮ツール。'
  },
  'Cloud Outliner': {
    'en-US': 'Outline editor with cloud sync that helps organize ideas, projects, and notes in a hierarchical structure.',
    'ja-JP': 'アイデア、プロジェクト、ノートを階層構造で整理するクラウド同期付きアウトラインエディター。'
  },
  'CloudMounter': {
    'en-US': 'Cloud storage manager that mounts cloud drives as local volumes in Finder for seamless file access.',
    'ja-JP': 'シームレスなファイルアクセスのためにクラウドドライブをFinderのローカルボリュームとしてマウントするクラウドストレージマネージャー。'
  },
  // 第三批应用描述
  'CodeRunner': {
    'en-US': 'Lightweight IDE for quickly writing, editing, and running code in multiple programming languages.',
    'ja-JP': '複数のプログラミング言語でコードを素早く書き、編集、実行するための軽量IDE。'
  },
  'Commander One': {
    'en-US': 'Dual-pane file manager with advanced features like cloud storage integration, file compression, and terminal access.',
    'ja-JP': 'クラウドストレージ統合、ファイル圧縮、ターミナルアクセスなどの高度な機能を備えたデュアルペインファイルマネージャー。'
  },
  'Core Shell': {
    'en-US': 'Full-featured SSH terminal with modern interface, key management, and advanced connection features.',
    'ja-JP': 'モダンインターフェース、キー管理、高度な接続機能を備えたフル機能のSSHターミナル。'
  },
  'Craft': {
    'en-US': 'Beautiful note-taking and document creation app with linking, blocks, and collaborative features.',
    'ja-JP': 'リンク、ブロック、コラボレーション機能を備えた美しいノート作成・文書作成アプリ。'
  },
  'Daily': {
    'en-US': 'Simple time tracking app that helps monitor how you spend your time throughout the day.',
    'ja-JP': '一日を通して時間の使い方を監視するのに役立つシンプルな時間追跡アプリ。'
  },
  'Dato': {
    'en-US': 'Menu bar calendar that shows date, time, and upcoming events with customizable display options.',
    'ja-JP': 'カスタマイズ可能な表示オプションで日付、時刺、今後のイベントを表示するメニューバーカレンダー。'
  },

  'DeskMinder²': {
    'en-US': 'Desktop reminder app that creates floating notes and alerts for important tasks and deadlines.',
    'ja-JP': '重要なタスクや期限のためのフローティングノートとアラートを作成するデスクトップリマインダーアプリ。'
  },
  'Diagrams': {
    'en-US': 'Diagramming app for creating flowcharts, organizational charts, and visual diagrams with professional templates.',
    'ja-JP': 'プロフェッショナルなテンプレートでフローチャート、組織図、視覚的な図表を作成するダイアグラムアプリ。'
  },
  'Diarly': {
    'en-US': 'Personal diary and journaling app with encryption, mood tracking, and beautiful writing interface.',
    'ja-JP': '暗号化、気分追跡、美しい文章インターフェースを備えた個人的な日記・ジャーナリングアプリ。'
  },
  'DisplayBuddy': {
    'en-US': 'External display controller that manages brightness, volume, and input switching for multiple monitors.',
    'ja-JP': '複数モニターの明るさ、音量、入力切り替えを管理する外部ディスプレイコントローラー。'
  },
  'Dropshare': {
    'en-US': 'File sharing tool that quickly uploads and shares files via cloud storage with custom short links.',
    'ja-JP': 'カスタム短縮リンクでクラウドストレージ経由でファイルを素早くアップロード・共有するファイル共有ツール。'
  },
  'Dropzone': {
    'en-US': 'Drag and drop enhancement tool that provides quick actions for files like upload, compress, and share.',
    'ja-JP': 'アップロード、圧縮、共有などのファイルのクイックアクションを提供するドラッグ＆ドロップ機能強化ツール。'
  },
  'Due': {
    'en-US': 'Persistent reminder app that ensures you never miss important tasks with continuous nagging alerts.',
    'ja-JP': '継続的なしつこいアラートで重要なタスクを絶対に見逃さない持続的リマインダーアプリ。'
  },
  'Elephas': {
    'en-US': 'AI writing assistant that integrates with macOS to provide smart text generation and editing capabilities.',
    'ja-JP': 'macOSと統合してスマートなテキスト生成と編集機能を提供するAIライティングアシスタント。'
  },

  'Endurance': {
    'en-US': 'Battery life extender that automatically adjusts system settings to maximize MacBook battery performance.',
    'ja-JP': 'MacBookのバッテリーパフォーマンスを最大化するためにシステム設定を自動調整するバッテリー寿命延長ツール。'
  },
  'Euclid': {
    'en-US': 'Calculator app that uses Excel-like formulas and supports complex mathematical operations and functions.',
    'ja-JP': 'Excel風の数式を使用し、複雑な数学演算と関数をサポートする計算機アプリ。'
  },
  'Expenses': {
    'en-US': 'Expense tracking app that helps monitor spending habits and manage personal finances.',
    'ja-JP': '支出習慣を監視し、個人の財務を管理するのに役立つ支出追跡アプリ。'
  },
  'Expressions': {
    'en-US': 'Regular expression tool that helps create, test, and debug regex patterns with live preview.',
    'ja-JP': 'ライブプレビューで正規表現パターンの作成、テスト、デバッグを支援する正規表現ツール。'
  },
  'Filmage Editor': {
    'en-US': 'Professional video editing software with advanced editing tools, effects, and format support.',
    'ja-JP': '高度な編集ツール、エフェクト、フォーマットサポートを備えたプロフェッショナルビデオ編集ソフトウェア。'
  },
  'Flinto': {
    'en-US': 'App prototyping tool for creating interactive app prototypes with transitions and animations.',
    'ja-JP': 'トランジションとアニメーションでインタラクティブなアプリプロトタイプを作成するアプリプロトタイピングツール。'
  },
  'Focus': {
    'en-US': 'Website and app blocker that helps maintain focus by blocking distracting sites and applications.',
    'ja-JP': '気を散らすサイトやアプリケーションをブロックして集中力を維持するのに役立つウェブサイト・アプリブロッカー。'
  },
  'Focus 2': {
    'en-US': 'Advanced website and app blocking tool with scheduling, whitelist management, and productivity insights.',
    'ja-JP': 'スケジューリング、ホワイトリスト管理、生産性の洞察を備えた高度なウェブサイト・アプリブロッキングツール。'
  },
  'Focused': {
    'en-US': 'Distraction-free writing app with minimal interface that helps maintain focus while writing.',
    'ja-JP': '執筆中の集中力維持を支援するミニマルなインターフェースの集中執筆アプリ。'
  },
  'Focused Work': {
    'en-US': 'Pomodoro timer with task management that combines time tracking with productivity techniques.',
    'ja-JP': '時間追跡と生産性技法を組み合わせたタスク管理付きポモドーロタイマー。'
  },
  'Folx': {
    'en-US': 'Download manager that supports torrent downloads, speed control, and auto-tagging features.',
    'ja-JP': 'トレントダウンロード、速度制御、自動タグ付け機能をサポートするダウンロードマネージャー。'
  },
  'Forecast Bar': {
    'en-US': 'Weather app that shows current conditions, forecasts, and weather alerts in the menu bar.',
    'ja-JP': 'メニューバーに現在の気象状況、予報、気象警報を表示する天気アプリ。'
  },
  'ForkLift': {
    'en-US': 'Advanced file manager with dual-pane interface, remote connections, and powerful file operations.',
    'ja-JP': 'デュアルペインインターフェース、リモート接続、強力なファイル操作を備えた高度なファイルマネージャー。'
  },
  // 第四批应用描述（分批処理）
  'Gemini': {
    'en-US': 'Duplicate file finder that scans and removes duplicate files to free up disk space.',
    'ja-JP': 'ディスクスペースを解放するために重複ファイルをスキャン・削除する重複ファイルファインダー。'
  },
  'Get Backup Pro': {
    'en-US': 'Backup software with incremental backups, scheduling, and multiple destination support.',
    'ja-JP': '増分バックアップ、スケジューリング、複数宛先サポートを備えたバックアップソフトウェア。'
  },
  'GetAPI': {
    'en-US': 'API testing tool that simplifies REST API testing with intuitive interface and request management.',
    'ja-JP': '直感的なインターフェースとリクエスト管理でREST APIテストを簡素化するAPIテストツール。'
  },
  'GetSound': {
    'en-US': 'AI-powered ambient sound generator that creates personalized soundscapes for focus and relaxation.',
    'ja-JP': '集中とリラックスのためのパーソナライズされたサウンドスケープを作成するAI搭載環境音ジェネレーター。'
  },
  'Gitfox': {
    'en-US': 'Git client with powerful diff visualization, branch management, and intuitive version control interface.',
    'ja-JP': '強力な差分視覚化、ブランチ管理、直感的なバージョンコントロールインターフェースを備えたGitクライアント。'
  },
  'GlueMotion': {
    'en-US': 'Time-lapse video creator that transforms photos into smooth time-lapse videos with customizable settings.',
    'ja-JP': 'カスタマイズ可能な設定で写真をスムーズなタイムラプス動画に変換するタイムラプス動画作成ツール。'
  },
  'Glyphs Mini': {
    'en-US': 'Font design tool for creating and editing fonts with professional typography features.',
    'ja-JP': 'プロフェッショナルなタイポグラフィ機能でフォントを作成・編集するフォントデザインツール。'
  },
  'Godspeed': {
    'en-US': 'Fast task management app that focuses on quick task entry and simple project organization.',
    'ja-JP': '素早いタスク入力とシンプルなプロジェクト組織に焦点を当てた高速タスク管理アプリ。'
  },
  'Goldie App': {
    'en-US': 'Golden ratio design tool that helps apply mathematical proportions to create visually pleasing layouts.',
    'ja-JP': '視覚的に美しいレイアウトを作成するために数学的比率を適用する黄金比デザインツール。'
  },
  // 基于CSV数据添加更多热门应用的个性化描述
  'Supercharge': {
    'en-US': 'Powerful Mac enhancement tool with rich plugin system and shortcuts that significantly improves Mac efficiency and personalization.',
    'ja-JP': '豊富なプラグインシステムとショートカットでMacの効率性とパーソナライゼーションを大幅に向上させる強力なMac拡張ツール。'
  },
  'Code Snippets AI': {
    'en-US': 'AI-powered code snippet management and optimization tool that automatically detects code issues and provides intelligent fixes.',
    'ja-JP': 'コードの問題を自動検出し、インテリジェントな修正を提供するAI搭載のコードスニペット管理・最適化ツール。'
  },
  'Yoink': {
    'en-US': 'Drag and drop enhancement tool that provides temporary storage area to improve file operation experience with batch operations.',
    'ja-JP': 'バッチ操作でファイル操作体験を向上させる一時保存エリアを提供するドラッグ＆ドロップ機能強化ツール。'
  },
  'Lungo': {
    'en-US': 'Prevents Mac from automatically sleeping with one-click control through menu bar icon, perfect for long-running tasks.',
    'ja-JP': 'メニューバーアイコンからワンクリック制御でMacの自動スリープを防ぐ、長時間実行タスクに最適なツール。'
  },
  'PixelSnap': {
    'en-US': 'Precise screen measurement tool for designers and developers with pixel-level accuracy, color picking, and measurement export.',
    'ja-JP': 'ピクセルレベルの精度、カラーピッキング、測定結果エクスポート機能を備えたデザイナー・開発者向け精密画面測定ツール。'
  },
  'HazeOver': {
    'en-US': 'Window focus management tool that automatically dims inactive windows to highlight current work window and reduce visual distractions.',
    'ja-JP': '非アクティブウィンドウを自動的に暗くして現在の作業ウィンドウを強調し、視覚的な気を散らすものを減らすウィンドウフォーカス管理ツール。'
  },
  'SnippetsLab': {
    'en-US': 'Professional code snippet management tool with syntax highlighting, tag categorization, and full-text search for developers.',
    'ja-JP': '構文ハイライト、タグ分類、全文検索機能を備えた開発者向けプロフェッショナルコードスニペット管理ツール。'
  },
  'In Your Face': {
    'en-US': 'Full-screen meeting reminder tool that ensures important meetings and appointments are never missed with prominent alerts.',
    'ja-JP': '目立つアラートで重要な会議や約束を絶対に見逃さないことを保証する全画面会議リマインダーツール。'
  },
  'TextSoap': {
    'en-US': 'Powerful text cleaning and formatting tool that automatically detects and fixes text formatting issues with custom rules.',
    'ja-JP': 'カスタムルールでテキストフォーマットの問題を自動検出・修正する強力なテキストクリーニング・フォーマットツール。'
  },
  'IconJar': {
    'en-US': 'Professional icon management and organization tool for designers with format support, tagging, and direct drag-to-design integration.',
    'ja-JP': 'フォーマットサポート、タグ付け、デザインソフトへの直接ドラッグ統合を備えたデザイナー向けプロフェッショナルアイコン管理・整理ツール。'
  },
  'SnapMotion': {
    'en-US': 'Video frame extraction and snapshot tool that captures high-quality static images from video files with batch processing.',
    'ja-JP': 'バッチ処理で動画ファイルから高品質な静止画像をキャプチャする動画フレーム抽出・スナップショットツール。'
  },
  'Buildwatch': {
    'en-US': 'Xcode build time monitoring tool that helps iOS developers track and optimize project compilation performance with detailed statistics.',
    'ja-JP': '詳細な統計でiOS開発者がプロジェクトのコンパイルパフォーマンスを追跡・最適化するXcodeビルド時間監視ツール。'
  },
  'Downie': {
    'en-US': 'Professional online video downloader supporting 1000+ websites including YouTube and Vimeo with multiple format options.',
    'ja-JP': 'YouTubeやVimeoを含む1000以上のウェブサイトに対応し、複数のフォーマットオプションを提供するプロフェッショナルオンライン動画ダウンローダー。'
  },
  'Permute': {
    'en-US': 'Multimedia format conversion tool supporting audio, video, and image conversion with preset configurations and batch processing.',
    'ja-JP': 'プリセット設定とバッチ処理でオーディオ、ビデオ、画像変換をサポートするマルチメディアフォーマット変換ツール。'
  },
  'Session': {
    'en-US': 'Pomodoro-based time management tool that helps maintain focus and productivity with customizable work and break intervals.',
    'ja-JP': 'カスタマイズ可能な作業と休憩間隔で集中力と生産性を維持するポモドーロベースの時間管理ツール。'
  },
  'One Switch': {
    'en-US': 'Quick access tool for macOS system functions providing one-click toggle for Wi-Fi, Bluetooth, and other system settings.',
    'ja-JP': 'Wi-Fi、Bluetooth、その他のシステム設定のワンクリック切り替えを提供するmacOSシステム機能クイックアクセスツール。'
  },
  'QuitAll': {
    'en-US': 'Batch application quit tool that closes all running applications with one click to free up system resources and improve performance.',
    'ja-JP': 'システムリソースを解放し、パフォーマンスを向上させるためにワンクリックで実行中のすべてのアプリケーションを終了するバッチアプリケーション終了ツール。'
  },
  'PDF Squeezer': {
    'en-US': 'PDF compression tool that significantly reduces file size while maintaining document quality with batch processing support.',
    'ja-JP': 'バッチ処理サポートでドキュメント品質を維持しながらファイルサイズを大幅に削減するPDF圧縮ツール。'
  },
  'Pulltube': {
    'en-US': 'Online video download and editing tool that supports downloading from major video sites with simple editing capabilities.',
    'ja-JP': 'シンプルな編集機能で主要動画サイトからのダウンロードをサポートするオンライン動画ダウンロード・編集ツール。'
  },

  'Mission Control Plus': {
    'en-US': 'Mission Control enhancement tool that allows closing windows directly from Mission Control interface for improved multitasking.',
    'ja-JP': 'マルチタスクの改善のためにMission Controlインターフェースから直接ウィンドウを閉じることができるMission Control機能強化ツール。'
  },
  'Movist Pro': {
    'en-US': 'Professional video player supporting wide range of video formats and codecs with high-quality playback and subtitle support.',
    'ja-JP': '高品質再生と字幕サポートで幅広いビデオフォーマットとコーデックをサポートするプロフェッショナルビデオプレーヤー。'
  },
  'HoudahSpot': {
    'en-US': 'Enhanced file search tool providing more powerful and flexible search capabilities than Spotlight with complex search conditions.',
    'ja-JP': '複雑な検索条件でSpotlightよりも強力で柔軟な検索機能を提供する拡張ファイル検索ツール。'
  },
  'Typeface': {
    'en-US': 'Font management and preview tool for designers and creators with font comparison, sample generation, and quick activation features.',
    'ja-JP': 'フォント比較、サンプル生成、クイック有効化機能を備えたデザイナー・クリエイター向けフォント管理・プレビューツール。'
  },
  'TouchRetouch': {
    'en-US': 'Intelligent image repair tool that easily removes unwanted objects and blemishes from photos using advanced algorithms.',
    'ja-JP': '高度なアルゴリズムを使用して写真から不要なオブジェクトや傷を簡単に除去するインテリジェント画像修復ツール。'
  },
  'Gifox': {
    'en-US': 'Lightweight GIF recording tool that quickly captures screen activity and generates high-quality GIF animations for tutorials.',
    'ja-JP': '画面アクティビティを素早くキャプチャし、チュートリアル用の高品質GIFアニメーションを生成する軽量GIF録画ツール。'
  },
  'Hand Mirror': {
    'en-US': 'One-click camera preview tool that lets users quickly check camera feed before video meetings to ensure best appearance.',
    'ja-JP': 'ビデオ会議前にカメラ映像を素早くチェックして最高の外観を確保するワンクリックカメラプレビューツール。'
  },
  'Unclutter': {
    'en-US': 'Desktop file and note management tool providing hidden storage space to organize temporary files and notes for clean desktop.',
    'ja-JP': 'クリーンなデスクトップのために一時ファイルとノートを整理する隠れた保存スペースを提供するデスクトップファイル・ノート管理ツール。'
  },
  'TaskPaper': {
    'en-US': 'Plain text-based task management tool using simple markup syntax to organize tasks and projects with open data format.',
    'ja-JP': 'オープンデータフォーマットでタスクとプロジェクトを整理するシンプルなマークアップ構文を使用したプレーンテキストベースのタスク管理ツール。'
  },
  'iStat Menus': {
    'en-US': 'System monitoring tool that displays real-time CPU, memory, network, and storage status information in the menu bar.',
    'ja-JP': 'メニューバーにリアルタイムのCPU、メモリ、ネットワーク、ストレージ状態情報を表示するシステム監視ツール。'
  },
  'SideNotes': {
    'en-US': 'Screen-side note tool that floats on screen edge for instant idea recording with rich text editing and quick access.',
    'ja-JP': 'リッチテキスト編集とクイックアクセスで瞬時のアイデア記録のために画面端に浮かぶ画面サイドノートツール。'
  },
  'NotePlan': {
    'en-US': 'Productivity tool combining note-taking and task management with Markdown support, calendar integration, and project planning.',
    'ja-JP': 'Markdownサポート、カレンダー統合、プロジェクト計画でノート作成とタスク管理を組み合わせた生産性ツール。'
  },

  'OpenIn': {
    'en-US': 'Browser selection tool that allows users to specify different browsers for different types of links with rule-based matching.',
    'ja-JP': 'ルールベースのマッチングで異なるタイプのリンクに対して異なるブラウザーを指定できるブラウザー選択ツール。'
  },
  'Swish': {
    'en-US': 'Trackpad gesture customization tool for MacBook users providing rich trackpad operation options for window management and app switching.',
    'ja-JP': 'ウィンドウ管理とアプリ切り替えのための豊富なトラックパッド操作オプションを提供するMacBookユーザー向けトラックパッドジェスチャーカスタマイズツール。'
  },
  'TripMode': {
    'en-US': 'Network data management tool that helps control and save internet data usage by blocking specific app network access.',
    'ja-JP': '特定のアプリのネットワークアクセスをブロックしてインターネットデータ使用量を制御・節約するネットワークデータ管理ツール。'
  },
  'Pareto Security': {
    'en-US': 'System security check tool that automatically scans Mac security settings and provides improvement recommendations for enhanced protection.',
    'ja-JP': 'Macのセキュリティ設定を自動スキャンし、保護強化のための改善推奨事項を提供するシステムセキュリティチェックツール。'
  },
  'SQLPro Studio': {
    'en-US': 'Multi-database management tool supporting MySQL, PostgreSQL, Oracle, SQL Server with unified interface and advanced query features.',
    'ja-JP': '統一インターフェースと高度なクエリ機能でMySQL、PostgreSQL、Oracle、SQL Serverをサポートするマルチデータベース管理ツール。'
  },
  'WiFi Explorer': {
    'en-US': 'Wireless network analysis and troubleshooting tool that helps diagnose WiFi connection issues with signal strength and interference analysis.',
    'ja-JP': '信号強度と干渉分析でWiFi接続問題を診断するワイヤレスネットワーク分析・トラブルシューティングツール。'
  },
  'Magic Window Air': {
    'en-US': 'Immersive screensaver app providing stunning aerial landscapes and natural scenery that transforms Mac screen into viewing window.',
    'ja-JP': 'Macスクリーンを観賞ウィンドウに変換する見事な航空風景と自然景観を提供する没入型スクリーンセーバーアプリ。'
  }
};

// 应用类型的描述模板（更具体和个性化）
const TYPE_BASED_TEMPLATES = {
  '截图': {
    'en-US': (appName: string) => `Professional screenshot and screen recording application with advanced editing and sharing capabilities.`,
    'ja-JP': (appName: string) => `高度な編集と共有機能を備えたプロフェッショナルなスクリーンショット・画面録画アプリケーション。`
  },
  '文件管理': {
    'en-US': (appName: string) => `Advanced file management tool that enhances Finder with powerful organization and navigation features.`,
    'ja-JP': (appName: string) => `強力な整理とナビゲーション機能でFinderを強化する高度なファイル管理ツール。`
  },
  '开发': {
    'en-US': (appName: string) => `Developer productivity tool designed to streamline coding workflow and enhance development efficiency.`,
    'ja-JP': (appName: string) => `コーディングワークフローを合理化し、開発効率を向上させる開発者生産性ツール。`
  },
  '写作': {
    'en-US': (appName: string) => `Writing application focused on creating distraction-free environment for authors, bloggers, and content creators.`,
    'ja-JP': (appName: string) => `作家、ブロガー、コンテンツクリエイター向けの集中できる環境を提供する執筆アプリケーション。`
  },
  '系统': {
    'en-US': (appName: string) => `System utility that optimizes macOS experience with enhanced functionality and better user control.`,
    'ja-JP': (appName: string) => `機能強化とユーザー制御の向上でmacOSエクスペリエンスを最適化するシステムユーティリティ。`
  },
  '数据库': {
    'en-US': (appName: string) => `Database management tool with intuitive interface for working with multiple database systems efficiently.`,
    'ja-JP': (appName: string) => `複数のデータベースシステムを効率的に操作するための直感的なインターフェースを持つデータベース管理ツール。`
  },
  '翻译': {
    'en-US': (appName: string) => `Translation tool that breaks language barriers with accurate and fast multilingual translation capabilities.`,
    'ja-JP': (appName: string) => `正確で高速な多言語翻訳機能で言語の壁を取り除く翻訳ツール。`
  },
  '思维导图': {
    'en-US': (appName: string) => `Mind mapping application that helps visualize ideas and organize thoughts with beautiful, intuitive interface.`,
    'ja-JP': (appName: string) => `美しく直感的なインターフェースでアイデアを視覚化し、思考を整理するマインドマッピングアプリケーション。`
  },
  '计算': {
    'en-US': (appName: string) => `Advanced calculator with natural language input and powerful mathematical computation capabilities.`,
    'ja-JP': (appName: string) => `自然言語入力と強力な数学計算機能を備えた高度な計算機。`
  },
  '清理': {
    'en-US': (appName: string) => `System cleaning and optimization tool that maintains Mac performance by removing unnecessary files and optimizing storage.`,
    'ja-JP': (appName: string) => `不要なファイルを削除しストレージを最適化してMacのパフォーマンスを維持するシステムクリーニング・最適化ツール。`
  },
  '时间': {
    'en-US': (appName: string) => `Time management and productivity application that helps track tasks, schedule, and optimize daily workflow.`,
    'ja-JP': (appName: string) => `タスク、スケジュールの追跡、日常ワークフローの最適化を支援する時間管理・生産性向上アプリケーション。`
  },
  '网络': {
    'en-US': (appName: string) => `Network utility tool for monitoring, debugging, and managing network connections and web traffic.`,
    'ja-JP': (appName: string) => `ネットワーク接続とWebトラフィックの監視、デバッグ、管理を行うネットワークユーティリティツール。`
  },
  '视频': {
    'en-US': (appName: string) => `Video processing and editing application with powerful conversion and enhancement features.`,
    'ja-JP': (appName: string) => `強力な変換と強化機能を備えたビデオ処理・編集アプリケーション。`
  },
  '音频': {
    'en-US': (appName: string) => `Audio editing and metadata management tool for organizing and enhancing music collections.`,
    'ja-JP': (appName: string) => `音楽コレクションの整理と強化のためのオーディオ編集とメタデータ管理ツール。`
  },
  'PDF': {
    'en-US': (appName: string) => `PDF processing tool that provides advanced features for editing, compressing, and managing PDF documents.`,
    'ja-JP': (appName: string) => `PDFドキュメントの編集、圧縮、管理のための高度な機能を提供するPDF処理ツール。`
  },
  '压缩': {
    'en-US': (appName: string) => `Archive management tool that handles multiple compression formats with advanced extraction and creation features.`,
    'ja-JP': (appName: string) => `高度な抽出と作成機能で複数の圧縮形式を処理するアーカイブ管理ツール。`
  },
  '笔记': {
    'en-US': (appName: string) => `Note-taking and information management application with powerful organization and search capabilities.`,
    'ja-JP': (appName: string) => `強力な整理と検索機能を備えたノート作成と情報管理アプリケーション。`
  },
  '设计': {
    'en-US': (appName: string) => `Creative design tool with professional features for graphic editing, typography, and visual content creation.`,
    'ja-JP': (appName: string) => `グラフィック編集、タイポグラフィ、ビジュアルコンテンツ作成のためのプロフェッショナル機能を備えたクリエイティブデザインツール。`
  }
};

// 应用名称到功能类型的映射
const APP_NAME_TO_TYPE: Record<string, string> = {
  'CleanShot X': '截图',
  'Bartender': '系统',
  'CleanMyMac': '清理',
  'TablePlus': '数据库',
  'Ulysses': '写作',
  'MindNode': '思维导图',
  'TextSniper': '截图',
  'Numi': '计算',
  'DevUtils': '开发',
  'Proxyman': '网络',
  'Soulver': '计算',
  'Dash': '开发',
  'BetterTouchTool': '系统',
  'Timing': '时间',
  'PopClip': '系统',
  'Paste': '系统',
  'Downie': '视频',
  'Permute': '视频',
  'Archiver': '压缩',
  'Meta': '音频',
  'Mate Translate': '翻译',
  'PDF Squeezer': 'PDF',
  'NotePlan': '笔记',
  'SnippetsLab': '开发',
  'Typeface': '设计',
  'TouchRetouch': '设计',
  'Gifox': '截图',
  'Unclutter': '文件管理',
  'TaskPaper': '笔记',
  'Base': '数据库',
  'Chronicle': '时间',
  'Craft': '写作',
  'Commander One': '文件管理',
  'BetterZip': '压缩',
  'ForkLift': '文件管理',
  // 添加DOM中表示的应用
  '24 Hour Wallpaper': '系统',
  '2Do': '时间',
  'AdLock': '系统',
  'AirBuddy': '系统',
  'AlDente Pro': '系统',
  'Almighty': '系统',
  'Antinote': '写作',
  'AnyDroid': '文件管理',
  'AnyTrans for iOS': '文件管理',
  'App Tamer': '系统',
  'AppWage': '开发',
  'Asset Catalog Creator Pro': '开发',
  'Awesome Habits': '时间',
  'Backtrack': '截图',
  // 新增的应用映射
  'Batteries': '系统',
  'Be Focused': '时间',
  'Bike': '笔记',
  'BoltAI': '写作',
  'Boom 3D': '音频',
  'Buildwatch': '开发',
  'BusyCal': '时间',
  'BusyContacts': '系统',
  'CameraBag Pro': '设计',
  'Canary Mail': '系统',
  'Capto': '截图',
  'ChatMate for WhatsApp': '系统',
  'ChronoSync Express': '文件管理',
  'Clariti': '音频',
  'ClearVPN': '网络',
  'Clop': '设计',
  'Cloud Outliner': '笔记',
  'CloudMounter': '文件管理',
  'CodeRunner': '开发',
  'Daily': '时间',
  'Dato': '时间',
  'Default Folder X': '文件管理',
  'DeskMinder²': '系统',
  'Diagrams': '设计',
  'Diarly': '笔记',
  'DisplayBuddy': '系统',
  'Dropshare': '文件管理',
  'Due': '时间',
  'Elephas': '写作',
  'Elmedia Player': '视频',
  'Endurance': '系统',
  'Euclid': '计算',
  'Expenses': '时间',
  'Expressions': '开发',
  'Filmage Editor': '视频',
  'Flinto': '设计',
  'Focus': '系统',
  'Focus 2': '系统',
  'Focused': '写作',
  'Focused Work': '时间',
  'Folx': '网络',
  'Forecast Bar': '系统',
  'Gemini': '文件管理',
  'Get Backup Pro': '文件管理',
  'GetAPI': '开发',
  'GetSound': '音频',
  'Gitfox': '开发',
  'GlueMotion': '视频',
  'Glyphs Mini': '设计',
  'Godspeed': '时间',
  'Goldie App': '设计',
  // 基于CSV数据新增的应用映射
  'Supercharge': '系统',
  'Code Snippets AI': '开发',
  'Yoink': '文件管理',
  'Lungo': '系统',
  'PixelSnap': '设计',
  'HazeOver': '系统',
  'In Your Face': '时间',
  'TextSoap': '写作',
  'IconJar': '设计',
  'SnapMotion': '视频',
  'Session': '时间',
  'One Switch': '系统',
  'QuitAll': '系统',
  'Pulltube': '视频',
  'Mission Control Plus': '系统',
  'Movist Pro': '视频',
  'HoudahSpot': '文件管理',
  'Hand Mirror': '系统',
  'iStat Menus': '系统',
  'SideNotes': '笔记',
  'OpenIn': '系统',
  'Swish': '系统',
  'TripMode': '网络',
  'Pareto Security': '系统',
  'SQLPro Studio': '数据库',
  'WiFi Explorer': '网络',
  'Magic Window Air': '系统'
};

/**
 * 検測应用类型
 */
function detectAppType(appName: string, description: string): string {
  // 先根据应用名称检测
  if (APP_NAME_TO_TYPE[appName]) {
    return APP_NAME_TO_TYPE[appName];
  }

  // 根据描述关键词检测
  const keywords = {
    '截图': ['截图', '屏幕', '录制', 'screenshot', 'screen', 'record'],
    'ファイル管理': ['ファイル', '管理', 'ドラッグ放り', 'file', 'manage', 'folder'],
    'ビデオ': ['ビデオ', '映像', '編集', 'video', 'movie', 'edit'],
    '開発': ['コード', '開発', 'プログラミング', 'code', 'dev', 'program'],
    '書き込み': ['書き込み', 'ドキュメント', '編集', 'write', 'document', 'text'],
    'システム': ['システム', 'メニューバー', 'ショートカット', 'system', 'menubar', 'shortcut'],
    '時間': ['時間', 'タスク', '管理', 'time', 'task', 'schedule'],
    'クリーニング': ['クリーニング', '最適化', 'ゴミ', 'clean', 'optimize', 'junk'],
    'データベース': ['データベース', 'database', 'SQL', 'query'],
    '翻訳': ['翻訳', 'translate', '言語', 'language'],
    '計算': ['計算', '数学', 'calculator', 'math'],
    'PDF': ['PDF', 'ドキュメント処理'],
    '圧縮': ['圧縮', '解凍', 'zip', 'archive']
  };

  for (const [type, typeKeywords] of Object.entries(keywords)) {
    for (const keyword of typeKeywords) {
      if (description.includes(keyword)) {
        return type;
      }
    }
  }

  return 'システム'; // デフォルトタイプ
}

/**
 * 生成应用描述の翻訳版本
 */
function generateTranslatedDescription(
  originalDescription: string,
  appName: string,
  targetLocale: SupportedLocale
): string {
  // ターゲット言語が中国語の場合は、元の説明をそのまま返す
  if (targetLocale === 'zh-CN') {
    return originalDescription;
  }

  // 1. 特定のアプリの個別の説明を優先的にチェック
  if (SPECIFIC_APP_DESCRIPTIONS[appName]?.[targetLocale]) {
    return SPECIFIC_APP_DESCRIPTIONS[appName][targetLocale];
  }

  // 2. アプリタイプを検出し、タイプテンプレートを使用
  const appType = detectAppType(appName, originalDescription);
  if (appType && TYPE_BASED_TEMPLATES[appType]?.[targetLocale]) {
    return TYPE_BASED_TEMPLATES[appType][targetLocale](appName);
  }

  // 3. 元の説明内容に基づいてスマート翻訳を生成
  return generateSmartTranslation(originalDescription, appName, targetLocale);
}

/**
 * 元の説明内容に基づいてスマート翻訳
 */
function generateSmartTranslation(
  originalDescription: string,
  appName: string,
  targetLocale: SupportedLocale
): string {
  // 説明からキーワードを抽出
  const keywords = extractKeywords(originalDescription);
  
  // キーワードに基づいて説明を構築
  const templates = {
    'en-US': {
      hasScreenshot: 'Advanced screenshot and screen recording tool with powerful editing and sharing capabilities.',
      hasFileManagement: 'Powerful file management and organization utility that enhances productivity and workflow.',
      hasDevelopment: 'Developer-focused productivity tool designed to streamline coding workflow and enhance development efficiency.',
      hasWriting: 'Writing and text editing application with distraction-free interface for content creators.',
      hasSystem: 'System utility for Mac optimization that enhances functionality and user control.',
      hasDesign: 'Creative design and editing tool with professional features for visual content creation.',
      hasDatabase: 'Database management and query tool with intuitive interface for multiple database systems.',
      hasTime: 'Time tracking and productivity application that helps optimize daily workflow and task management.',
      hasNetwork: 'Network monitoring and debugging tool for analyzing and managing network connections.',
      hasCalculation: 'Advanced calculator with natural language support and powerful mathematical computation capabilities.',
      hasClean: 'System cleaning and optimization tool that maintains Mac performance by removing unnecessary files.',
      hasTranslation: 'Translation tool that breaks language barriers with accurate multilingual capabilities.',
      hasMindMap: 'Mind mapping application that helps visualize ideas and organize thoughts with intuitive interface.',
      hasAudio: 'Audio editing and metadata management tool for organizing and enhancing music collections.',
      hasVideo: 'Video processing and editing application with powerful conversion and enhancement features.',
      hasPDF: 'PDF processing tool that provides advanced features for editing and managing PDF documents.',
      hasArchive: 'Archive management tool that handles multiple compression formats with advanced features.',
      hasNote: 'Note-taking and information management application with powerful organization capabilities.',
      generic: `Professional Mac application designed to enhance productivity and user experience.`
    },
    'ja-JP': {
      hasScreenshot: '高度な編集と共有機能を備えたプロフェッショナルなスクリーンショット・画面録画ツール。',
      hasFileManagement: '生産性とワークフローを向上させる強力なファイル管理と整理ユーティリティ。',
      hasDevelopment: 'コーディングワークフローを合理化し、開発効率を向上させる開発者向け生産性ツール。',
      hasWriting: 'コンテンツクリエイター向けの集中できるインターフェースを持つ執筆・テキスト編集アプリケーション。',
      hasSystem: '機能強化とユーザー制御の向上でmacOSを最適化するシステムユーティリティ。',
      hasDesign: 'ビジュアルコンテンツ作成のためのプロフェッショナル機能を備えたクリエイティブデザイン・編集ツール。',
      hasDatabase: '複数のデータベースシステムに対応した直感的なインターフェースを持つデータベース管理・クエリツール。',
      hasTime: '日常ワークフローとタスク管理の最適化を支援する時間追跡・生産性向上アプリケーション。',
      hasNetwork: 'ネットワーク接続の分析と管理を行うネットワーク監視・デバッグツール。',
      hasCalculation: '自然言語サポートと強力な数学計算機能を備えた高度な計算機。',
      hasClean: '不要なファイルを削除してMacのパフォーマンスを維持するシステムクリーニング・最適化ツール。',
      hasTranslation: '正確な多言語機能で言語の壁を取り除く翻訳ツール。',
      hasMindMap: '直感的なインターフェースでアイデアを視覚化し、思考を整理するマインドマッピングアプリケーション。',
      hasAudio: '音楽コレクションの整理と強化のためのオーディオ編集・メタデータ管理ツール。',
      hasVideo: '強力な変換と強化機能を備えたビデオ処理・編集アプリケーション。',
      hasPDF: 'PDFドキュメントの編集と管理のための高度な機能を提供するPDF処理ツール。',
      hasArchive: '高度な機能で複数の圧縮形式を処理するアーカイブ管理ツール。',
      hasNote: '強力な整理機能を備えたノート作成・情報管理アプリケーション。',
      generic: `Mac用生産性向上とユーザーエクスペリエンス強化を目的としたプロフェッショナルアプリケーション。`
    }
  };

  // 中文关键词匹配逻辑 - 优化后的更精确匹配
  const description = originalDescription.toLowerCase();
  
  // 优先匹配更具体的关键词组合
  if ((description.includes('截图') || description.includes('屏幕')) && (description.includes('录制') || description.includes('录屏') || description.includes('编辑'))) {
    return templates[targetLocale].hasScreenshot;
  }
  if ((description.includes('文件') && description.includes('管理')) || description.includes('finder') || description.includes('文件夹') || description.includes('同步')) {
    return templates[targetLocale].hasFileManagement;
  }
  if ((description.includes('开发') || description.includes('代码')) && (description.includes('编程') || description.includes('api') || description.includes('调试') || description.includes('git'))) {
    return templates[targetLocale].hasDevelopment;
  }
  if ((description.includes('写作') || description.includes('文档')) && (description.includes('编辑') || description.includes('文本') || description.includes('markdown') || description.includes('笔记'))) {
    return templates[targetLocale].hasWriting;
  }
  if ((description.includes('系统') && (description.includes('优化') || description.includes('菜单栏') || description.includes('触控板') || description.includes('快捷键') || description.includes('自动化')))) {
    return templates[targetLocale].hasSystem;
  }
  if ((description.includes('设计') || description.includes('图形')) && (description.includes('图像') || description.includes('照片') || description.includes('编辑') || description.includes('创意'))) {
    return templates[targetLocale].hasDesign;
  }
  if (description.includes('数据库') || (description.includes('sql') && description.includes('查询')) || description.includes('数据管理')) {
    return templates[targetLocale].hasDatabase;
  }
  if ((description.includes('时间') && (description.includes('跟踪') || description.includes('管理'))) || description.includes('任务') || description.includes('日程') || description.includes('提醒') || description.includes('番茄钟')) {
    return templates[targetLocale].hasTime;
  }
  if ((description.includes('网络') && (description.includes('监控') || description.includes('分析'))) || description.includes('连接') || description.includes('代理') || description.includes('流量') || description.includes('vpn')) {
    return templates[targetLocale].hasNetwork;
  }
  if ((description.includes('计算') && (description.includes('器') || description.includes('数学'))) || description.includes('算术') || description.includes('公式')) {
    return templates[targetLocale].hasCalculation;
  }
  if ((description.includes('清理') || description.includes('垃圾')) && (description.includes('优化') || description.includes('性能') || description.includes('缓存'))) {
    return templates[targetLocale].hasClean;
  }
  if (description.includes('翻译') && (description.includes('语言') || description.includes('多语言') || description.includes('词典'))) {
    return templates[targetLocale].hasTranslation;
  }
  if (description.includes('思维导图') || description.includes('脑图') || description.includes('导图') || (description.includes('思维') && description.includes('整理'))) {
    return templates[targetLocale].hasMindMap;
  }
  if ((description.includes('音频') || description.includes('音乐')) && (description.includes('编辑') || description.includes('播放') || description.includes('管理'))) {
    return templates[targetLocale].hasAudio;
  }
  if ((description.includes('视频') || description.includes('影片')) && (description.includes('编辑') || description.includes('转换') || description.includes('播放'))) {
    return templates[targetLocale].hasVideo;
  }
  if (description.includes('pdf') && (description.includes('编辑') || description.includes('管理') || description.includes('压缩'))) {
    return templates[targetLocale].hasPDF;
  }
  if ((description.includes('压缩') || description.includes('解压')) && (description.includes('归档') || description.includes('文件'))) {
    return templates[targetLocale].hasArchive;
  }
  if ((description.includes('笔记') || description.includes('记录')) && (description.includes('管理') || description.includes('备忘') || description.includes('整理'))) {
    return templates[targetLocale].hasNote;
  }

  // 如果没有匹配到具体类型，尝试基于应用名称进行更智能的推断
  const appNameLower = appName.toLowerCase();
  if (appNameLower.includes('screen') || appNameLower.includes('shot') || appNameLower.includes('capture')) {
    return templates[targetLocale].hasScreenshot;
  }
  if (appNameLower.includes('file') || appNameLower.includes('finder') || appNameLower.includes('folder')) {
    return templates[targetLocale].hasFileManagement;
  }
  if (appNameLower.includes('code') || appNameLower.includes('dev') || appNameLower.includes('git')) {
    return templates[targetLocale].hasDevelopment;
  }
  if (appNameLower.includes('write') || appNameLower.includes('text') || appNameLower.includes('note')) {
    return templates[targetLocale].hasWriting;
  }
  if (appNameLower.includes('system') || appNameLower.includes('menu') || appNameLower.includes('bar')) {
    return templates[targetLocale].hasSystem;
  }
  if (appNameLower.includes('design') || appNameLower.includes('photo') || appNameLower.includes('image')) {
    return templates[targetLocale].hasDesign;
  }
  if (appNameLower.includes('database') || appNameLower.includes('sql') || appNameLower.includes('db')) {
    return templates[targetLocale].hasDatabase;
  }
  if (appNameLower.includes('time') || appNameLower.includes('task') || appNameLower.includes('calendar')) {
    return templates[targetLocale].hasTime;
  }
  if (appNameLower.includes('network') || appNameLower.includes('proxy') || appNameLower.includes('vpn')) {
    return templates[targetLocale].hasNetwork;
  }
  if (appNameLower.includes('calc') || appNameLower.includes('math') || appNameLower.includes('soulver')) {
    return templates[targetLocale].hasCalculation;
  }
  if (appNameLower.includes('clean') || appNameLower.includes('optimize') || appNameLower.includes('performance')) {
    return templates[targetLocale].hasClean;
  }
  if (appNameLower.includes('translate') || appNameLower.includes('language')) {
    return templates[targetLocale].hasTranslation;
  }
  if (appNameLower.includes('mind') || appNameLower.includes('map') || appNameLower.includes('outline')) {
    return templates[targetLocale].hasMindMap;
  }
  if (appNameLower.includes('audio') || appNameLower.includes('music') || appNameLower.includes('sound')) {
    return templates[targetLocale].hasAudio;
  }
  if (appNameLower.includes('video') || appNameLower.includes('movie') || appNameLower.includes('film')) {
    return templates[targetLocale].hasVideo;
  }
  if (appNameLower.includes('pdf')) {
    return templates[targetLocale].hasPDF;
  }
  if (appNameLower.includes('zip') || appNameLower.includes('archive') || appNameLower.includes('compress')) {
    return templates[targetLocale].hasArchive;
  }
  if (appNameLower.includes('note') || appNameLower.includes('memo') || appNameLower.includes('journal')) {
    return templates[targetLocale].hasNote;
  }

  return templates[targetLocale].generic;
}

/**
 * 説明からキーワードを抽出
 */
function extractKeywords(description: string): string[] {
  const keywords: string[] = [];
  const keywordMap = {
    'スクリーンショット': ['スクリーンショット', 'スクリーン', '録画', 'screenshot'],
    'ファイル': ['ファイル', '管理', 'ドラッグ放り', 'file'],
    '開発': ['コード', '開発', 'プログラミング', 'code', 'dev'],
    '書き込み': ['書き込み', 'ドキュメント', '編集', 'write', 'text'],
    'システム': ['システム', 'メニューバー', 'ショートカット', 'system', 'menu'],
    'デザイン': ['デザイン', 'クリエイティブ', '画像', 'design', 'creative'],
    'データベース': ['データベース', 'database', 'SQL'],
    '時間': ['時間', 'タスク', '日程', 'time', 'task'],
    'ネットワーク': ['ネットワーク', '接続', 'プロキシ', 'network', 'proxy'],
    '計算': ['計算', '数学', '計算機', 'calculator', 'math']
  };

  for (const [key, terms] of Object.entries(keywordMap)) {
    if (terms.some(term => description.includes(term))) {
      keywords.push(key);
    }
  }

  return keywords;
}

/**
 * 智能翻訳アプリ説明
 * @param description 元の中国語説明
 * @param appName アプリケーション名
 * @param targetLocale 目標言語
 * @returns 翻訳後の説明
 */
export function translateAppDescription(
  description: string,
  appName: string,
  targetLocale: SupportedLocale = 'zh-CN'
): string {
  if (!description || targetLocale === 'zh-CN') {
    return description;
  }

  try {
    return generateTranslatedDescription(description, appName, targetLocale);
  } catch (error) {
    console.warn(`Failed to translate description for ${appName}:`, error);
    return description; // 翻訳に失敗した場合は元のテキストを返す
  }
}

/**
 * バッチ翻訳アプリ説明
 */
export function batchTranslateDescriptions(
  apps: Array<{ 名称: string; 功能説明: string }>,
  targetLocale: SupportedLocale
): Array<{ 名称: string; 功能説明: string; translatedDescription?: string }> {
  return apps.map(app => ({
    ...app,
    translatedDescription: translateAppDescription(app.功能説明, app.名称, targetLocale)
  }));
}

/**
 * アプリ説明を取得（現在の言語に基づく）
 */
export function getLocalizedDescription(
  description: string,
  appName: string,
  locale: SupportedLocale
): string {
  return translateAppDescription(description, appName, locale);
}