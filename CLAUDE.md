# ワークフローアプリケーション開発ガイド

## プロジェクト概要
このプロジェクトは、ログイン認証付きのワークフロー（稟議）管理システムです。ユーザーが申請を行い、設定されたルールに従って承認フローが進行します。

## 技術スタック
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: SQLite (開発環境) / PostgreSQL (本番環境推奨)
- **ORM**: Prisma
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS
- **Form Handling**: React Hook Form + Zod
- **State Management**: Zustand

## 開発環境のセットアップ

### 1. 依存関係のインストール
```bash
npm install
```

### 2. 環境変数の設定
`.env`ファイルを作成し、以下の内容を設定：
```
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
```

### 3. データベースのセットアップ
```bash
npm run db:push
npm run db:seed
```

### 4. 開発サーバーの起動
```bash
npm run dev
```

## プロジェクト構造
```
workflow-app/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API Routes
│   │   ├── auth/              # 認証関連ページ
│   │   ├── dashboard/         # ダッシュボード
│   │   └── workflows/         # ワークフロー関連ページ
│   ├── components/            # Reactコンポーネント
│   ├── lib/                   # ユーティリティ関数
│   ├── types/                 # TypeScript型定義
│   ├── hooks/                 # カスタムフック
│   └── store/                 # Zustand Store
├── prisma/
│   ├── schema.prisma          # データベーススキーマ
│   └── seed.ts               # 初期データ
└── public/                    # 静的ファイル
```

## 主要機能

### 1. 認証システム
- NextAuth.jsを使用したセッション管理
- メールアドレスとパスワードによるログイン
- ロールベースのアクセス制御

### 2. ワークフロー管理
- 申請の作成・編集・削除
- 承認ルートの設定
- ステータス管理（申請中、承認中、却下、完了）
- 承認・却下アクション
- コメント機能

### 3. ダッシュボード
- 申請一覧表示
- ステータスフィルタリング
- 承認待ち案件の通知

## データベーススキーマ

### User（ユーザー）
- id, email, password, name, role, department

### Workflow（ワークフロー定義）
- id, name, description, rules (JSON)

### Application（申請）
- id, title, content, status, userId, workflowId

### Approval（承認）
- id, applicationId, approverId, status, comment

## 開発時の注意事項

### コーディング規約
- TypeScriptの厳格モードを使用
- React Hook Formでのフォームバリデーション
- Zodスキーマによる型安全性の確保
- コンポーネントは関数コンポーネントで記述

### Git操作
```bash
# 機能開発時
git checkout -b feature/機能名

# コミット前の確認
npm run lint
npm run build
```

### テスト
```bash
npm run test
npm run test:watch
```

## よくある問題と解決方法

### データベース接続エラー
```bash
# Prismaクライアントの再生成
npx prisma generate
```

### 型エラー
```bash
# TypeScript型の再生成
npm run build
```

## 今後の実装予定
1. メール通知機能
2. ファイル添付機能
3. 承認フローのビジュアル表示
4. 統計・レポート機能
5. API連携機能

## 開発コマンド一覧
```bash
npm run dev        # 開発サーバー起動
npm run build      # ビルド
npm run start      # プロダクションサーバー起動
npm run lint       # Lintチェック
npm run db:push    # DBスキーマ反映
npm run db:migrate # マイグレーション実行
npm run db:studio  # Prisma Studio起動
npm run db:seed    # 初期データ投入
```