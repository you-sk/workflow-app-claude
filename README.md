# ワークフローアプリ

申請・承認管理システム

## 概要

このアプリケーションは、企業内での各種申請（経費精算、休暇申請など）を管理し、設定されたワークフローに従って承認プロセスを進めるためのWebアプリケーションです。

## 機能

- ユーザー認証（ログイン/ログアウト）
- 申請の作成・編集・削除
- ワークフローに基づく承認プロセス
- 承認・却下機能
- ダッシュボード表示
- ロールベースのアクセス制御

## 技術スタック

- Next.js 14 (App Router)
- TypeScript
- Prisma (ORM)
- SQLite (開発環境)
- NextAuth.js (認証)
- Tailwind CSS (スタイリング)
- React Hook Form + Zod (フォーム処理)

## セットアップ

1. リポジトリをクローン
```bash
git clone <repository-url>
cd workflow-app
```

2. 依存関係をインストール
```bash
npm install
```

3. 環境変数を設定
```bash
cp .env.example .env
```

`.env`ファイルを編集し、必要な環境変数を設定してください。

4. データベースをセットアップ
```bash
npm run db:push
npm run db:seed
```

5. 開発サーバーを起動
```bash
npm run dev
```

http://localhost:3000 でアプリケーションにアクセスできます。

## テストユーザー

シードデータには以下のテストユーザーが含まれています：

- 管理者: admin@example.com / admin123
- 一般ユーザー: user1@example.com / user123
- マネージャー: user2@example.com / user123
- ディレクター: user3@example.com / user123

## プロジェクト構造

```
workflow-app/
├── src/
│   ├── app/           # Next.js App Router
│   ├── components/    # Reactコンポーネント
│   ├── lib/          # ユーティリティ関数
│   ├── types/        # TypeScript型定義
│   ├── hooks/        # カスタムフック
│   └── store/        # 状態管理
├── prisma/           # データベース関連
├── public/           # 静的ファイル
└── ...
```

## ライセンス

MIT