# dotkit — 計画書

> UI のすべてを「ドットの集まり」で表現する、ゼロランタイムの CSS フレームワーク。
> React などのフレームワーク向けラッパーを同梱し、**npm には公開せず GitHub だけで配布する**。

## 1. ゴール

- 見た目のすべてを CSS 変数（`--dk-size` / `--dk-gap` / `--dk-color`）で制御する、JS 不要の CSS を「唯一の実装」にする
- React 等のラッパーは「props → クラス / CSS 変数」の変換だけを行う薄い層にする（RSC でそのまま使える）
- 配布・ドキュメント・リリースを GitHub（Releases / Pages / Actions）だけで完結させる

## 2. 非ゴール（v0.x 時点）

- npm レジストリ（npmjs.com / GitHub Packages）への公開
- ダイアログ・メニュー等の操作系コンポーネントの独自実装（将来はヘッドレス UI に委譲）

## 3. 設計方針

| 項目 | 方針 |
|---|---|
| コア | `dotkit.css`。`@layer dotkit.base, dotkit.utilities, dotkit.components` で詳細度を管理し、利用者の通常 CSS が常に勝つ |
| 命名 | 接頭辞 `dk-`（例: `dk-dots`, `dk-border`, `dk-btn--solid`） |
| アニメーション | `@property` で `--dk-size` / `--dk-gap` を登録し、hover 等でドットの膨張を補間 |
| アイコン | 7×7 のビットマップを `icons/icons.json` に定義し、CSS と TS 型をビルド時に生成（単一ソース） |
| テーマ | ink / paper のトークン。`.dk-theme-dark` でダーク化。`currentColor` 基調 |
| a11y | `forced-colors` 時は実線・実色にフォールバック、`prefers-reduced-motion` で動きを停止、`:focus-visible` はドット状のアウトライン |
| パッケージ形態 | 単一パッケージ `dotkit` + subpath exports（`dotkit/css`, `dotkit/react`）。React は optional peer |

## 4. 配布（npm 非公開）

| 利用形態 | 方法 |
|---|---|
| パッケージマネージャ | GitHub Releases の tarball: `npm i https://github.com/daisuke-awaji/dotkit/releases/download/v0.1.0/dotkit-0.1.0.tgz` |
| semver 範囲で追従 | `npm i "github:daisuke-awaji/dotkit#semver:^0.1"`（ビルド済み成果物だけを持つ `dist` ブランチにタグを打つ） |
| CDN / HTML 直書き | jsDelivr の GitHub エンドポイント、または GitHub Pages から `dotkit.css` を配信 |
| 改ざん検証 | GitHub Artifact Attestations（`gh attestation verify`） |

リリースは `workflow_dispatch`（version 入力）で実行し、以下を自動化する。

1. ビルド・型チェック
2. `dist` ブランチへビルド済みパッケージをコミットし `vX.Y.Z` タグを付与
3. `npm pack` した tarball を GitHub Release に添付し、build provenance を attest

## 5. ドキュメント（GitHub Pages）

`main` への push で GitHub Actions がビルドし Pages にデプロイする。サイト自体を dotkit で構築する（dogfooding）。

- Home — コンセプトとハイライト
- Getting Started — 導入方法（tarball / git semver / CDN）、HTML と React の最小例、テーマ
- Catalog — 全プリミティブ・テクニック・コンポーネントのライブプレビュー + HTML / React コード、size / gap のプレイグラウンド
- Icons — アイコン一覧（クリックでコピー）
- React API — props 一覧
- Accessibility & Support — フォールバック方針とブラウザ対応
- `llms.txt` — コーディングエージェント向けの要約

## 6. ロードマップ

| バージョン | 内容 |
|---|---|
| **v0.1** | `dotkit.css`、アイコン生成、`dotkit/react`、ドキュメントサイト、Pages / Release ワークフロー |
| v0.2 | Tailwind v4 用ユーティリティ（`dotkit/tailwind`）、アイコン追加 |
| v0.3 | shadcn 形式 registry を Pages で配信、操作系コンポーネント（Ark UI ベース） |
| v0.4 | Vue / Svelte ラッパー、json-render カタログ（`dotkit/json-render`） |
| v1.0 | Playwright による Chromium / WebKit / Firefox のビジュアルリグレッション、a11y 監査 |

## 7. 既知の課題

- `background-clip: text`・`filter: contrast()`（ハーフトーン）・`round()` のブラウザ差異の検証
- Hi-DPI での端数サイズのにじみ・モアレ（既定値は整数寄りにする）
- 大面積で `--dk-size` をアニメーションさせた際の再描画コスト

## 8. ライセンス

MIT
