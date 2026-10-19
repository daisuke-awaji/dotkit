# Design Catalog 拡充アイデア集

> 状態: 候補リスト。採用したものは PLAN.md のロードマップに移し、下の「実装状況」に記録する。
>
> 凡例 — **適合**: dotkit らしさ（ドットそのものが情報・機能になっているか） ★〜★★★ / **難度**: S=CSS のみで小 / M=CSS 中・React で補助 / L=データ生成や新しい仕組みが必要 / **区分**: 新規 = 前回提案から追加したもの

v0.1 時点の 16 項目: Dots / Shape / Fade / Border / Halftone / Dot text / Icon / Loader / Button / Badge / Input / Divider / Meter / Bar chart / Card / Composition

---

## A. データビジュアライゼーション

| # | アイデア | 概要 | 実装メモ | 適合 | 難度 | 区分 |
|---|---|---|---|---|---|---|
| A1 | Heatmap (Contribution) | 日次値をドット濃度で表示 | grid + 各セル `--v` → `opacity`/`--dk-size` | ★★★ | S | 前回 |
| A2 | Waffle chart | 10×10 = 100 ドットで割合 | `:nth-child(-n + var)` は不可 → React で塗り分け or `--pct` と mask の 2 層 | ★★★ | S | 前回 |
| A3 | Ring meter | 円周ドットで進捗 | `conic-gradient` mask × dot 面 | ★★★ | M | 前回 |
| A4 | Dot plot / Strip | 値の散らばり | absolute 配置、React で座標化 | ★★ | M | 前回 |
| A5 | Dot-matrix digits | 5×7 の数字 | icons.json に `0-9 : . -` を追加 | ★★★ | S | 前回 |
| A6 | **Uptime bar** | ステータスページの「90 日分のドット」 | flex + `data-state="ok|degraded|down"` | ★★★ | S | 新規 |
| A7 | **Sparkline** | 列ごとに 1 点を高さ `--v` に置く折れ線風 | grid 列 × `align-self` / `translate` | ★★★ | S | 新規 |
| A8 | **Area dots** | 値の下をドットで埋める面グラフ | Sparkline + 列ごとの縦 dot 面（`fade-t` 併用） | ★★★ | M | 新規 |
| A9 | **Stacked / grouped bar** | 系列ごとに色・形を変える | 既存 BarChart を `series[]` 対応に拡張 | ★★ | M | 新規 |
| A10 | **Pictogram (Isotype)** | 1 アイコン = N 件 | DotIcon の繰り返し + 端数は mask で欠けさせる | ★★★ | S | 新規 |
| A11 | **Gauge** | 半円メーター（スピードメーター） | A3 の 180° 版 + 針もドット | ★★ | M | 新規 |
| A12 | **Wilkinson dot histogram** | 分布をドットの積み上げで表す | React でビン集計 → 縦に dot 面 | ★★★ | M | 新規 |
| A13 | **Dot map（日本 / 世界）** | 「点描の地図」。都道府県ごとの値を濃度で | 地図をビットマップ JSON 化 → icons と同じ生成パイプライン | ★★★ | L | 新規 |
| A14 | **Signal / Battery** | 段階表示（電波・電池・強度） | 縦に伸びるドット列 × `data-level` | ★★ | S | 新規 |
| A15 | **Calendar dots** | 月カレンダー + 予定のある日にドット | grid 7 列、件数でドット数 | ★★ | S | 新規 |
| A16 | **Compare bar** | Before / After・A/B 比較 | 左右から伸びる 2 本のドットバー | ★★ | S | 新規 |
| A17 | **Leaderboard** | 順位表 + ドットのスコアバー | Meter をテーブル行に埋め込む | ★ | S | 新規 |

## B. フォーム / 入力

| # | アイデア | 概要 | 実装メモ | 適合 | 難度 | 区分 |
|---|---|---|---|---|---|---|
| B1 | Checkbox / Radio | チェック時にドットが詰まる / 1 点膨らむ | ネイティブ + `appearance:none`、`:checked` で `--dk-size` 遷移 | ★★★ | S | 前回 |
| B2 | Switch | ドットのノブが移動 | `input[type=checkbox][role=switch]` | ★★★ | S | 前回 |
| B3 | Range slider | ドット目盛り + 塗り | `::-webkit-slider-runnable-track` / `::-moz-range-track` 両対応が必要 | ★★★ | M | 前回 |
| B4 | Textarea / Select | `.dk-field` 拡張 | Select は `appearance: base-select` を段階的強化として | ★ | S | 前回 |
| B5 | **Segmented control** | 選択中セグメントだけ dot 面 | radio グループ + `:has(:checked)` | ★★ | S | 新規 |
| B6 | **OTP / PIN input** | 入力済み桁がドットで埋まる | 6 個の input or 1 input + 背景ドット | ★★★ | M | 新規 |
| B7 | **Password strength** | 強度をドット 4〜5 個で表示 | Meter の離散版、判定ロジックは利用者側 | ★★ | S | 新規 |
| B8 | **Rating input** | ★ の代わりにドット 5 段階 | radio 逆順 + `~` 結合子の定番手法 | ★★ | S | 新規 |
| B9 | **File drop zone** | 「行進するドット」の枠 | `.dk-border` の `background-position` をアニメ | ★★★ | S | 新規 |
| B10 | **Tag / Chip input** | ドット枠のチップ、削除ボタン付き | Badge 拡張 | ★ | S | 新規 |
| B11 | **Number stepper** | ± ボタン + ドットの値表示 | A5 digits と組み合わせ | ★★ | S | 新規 |
| B12 | **Date picker（見た目のみ）** | 選択日が大きなドット | A15 の再利用、操作は利用者 | ★★ | M | 新規 |
| B13 | **Color swatch picker** | 色見本がドット面 | radio + `--dk-color` | ★★ | S | 新規 |
| B14 | **Form validation 表示** | エラー時に枠のドットが赤く・不揃いに | `:user-invalid` で `--dk-color` 切替 | ★★ | S | 新規 |

## C. ナビゲーション / 構造

| # | アイデア | 概要 | 実装メモ | 適合 | 難度 | 区分 |
|---|---|---|---|---|---|---|
| C1 | Tabs | 選択タブの下線がドット | `[aria-selected=true]` に Divider | ★★ | S | 前回 |
| C2 | Pagination dots | カルーセル位置インジケータ | button 群、現在位置だけ横長ドット | ★★★ | S | 前回 |
| C3 | Accordion | `<details>` + ドット矢印 | `::details-content` は段階的強化 | ★ | S | 前回 |
| C4 | **Stepper / Wizard** | ドットと点線で工程を接続 | ol + `::before` の dot 線 | ★★★ | S | 新規 |
| C5 | **Breadcrumb** | 区切りが「•」ドット | `li + li::before` | ★★ | S | 新規 |
| C6 | **Sidebar nav indicator** | 現在地の左にドット柱 | `[aria-current=page]` | ★★ | S | 新規 |
| C7 | **Data table** | 行区切りがドット線、ソート方向がドット矢印 | `tr + tr` に Divider 背景 | ★★ | M | 新規 |
| C8 | **Tree view** | ドットのガイド線で階層表示 | `ul ul` に縦ドット線 | ★★★ | M | 新規 |
| C9 | **Dot leaders（目次）** | 「第 1 章 ………… 12」 | flex + 間の要素に横ドット面 | ★★★ | S | 新規 |
| C10 | **Command palette (⌘K)** | Dialog + 検索 + ハーフトーン backdrop | D3 と B 系の組み合わせ例 | ★ | M | 新規 |
| C11 | **Menu / Dropdown** | Popover API (`popover`) + ドット枠 | `[popover]` は JS 不要で開閉可 | ★ | M | 新規 |
| C12 | **Scroll progress** | ページ上端のドットバーが進む | `animation-timeline: scroll()`（段階的強化） | ★★ | S | 新規 |
| C13 | **Kbd** | キーキャップをドット枠で | `kbd.dk-kbd` | ★ | S | 新規 |

## D. フィードバック / オーバーレイ

| # | アイデア | 概要 | 実装メモ | 適合 | 難度 | 区分 |
|---|---|---|---|---|---|---|
| D1 | Skeleton | ドットのゆっくりした明滅 | `@keyframes` で `opacity`、reduced-motion で静止 | ★★★ | S | 前回 |
| D2 | Status dot | 1 点 + 波紋 | `::after` の scale + fade | ★★★ | S | 前回 |
| D3 | Dialog | `<dialog>` + `::backdrop` ハーフトーン | ネイティブ、`showModal()` のみ利用者 | ★★ | S | 前回 |
| D4 | Tooltip / Toast | ドット枠の吹き出し | Popover API + anchor positioning（段階的強化） | ★ | M | 前回 |
| D5 | **Typing indicator** | チャットの「…」入力中表示 | Loader の 3 ドット版。AI チャット UI に直結 | ★★★ | S | 新規 |
| D6 | **Alert / Callout** | 左端にハーフトーンの帯 | `info / success / warning / danger` | ★★ | S | 新規 |
| D7 | **Empty state** | 大きな点描イラスト + 説明 | icons.json に 16×16 / 32×32 サイズを追加 | ★★★ | M | 新規 |
| D8 | **Notification counter** | アイコン右上のドット / 数字ドット | A5 digits の小型版 | ★★ | S | 新規 |
| D9 | **Loader variants** | orbit / pulse / matrix rain / bounce | 既存 Loader に `variant` 追加 | ★★★ | S | 新規 |
| D10 | **Success burst** | 完了時にドットが弾ける | `@keyframes` × 8 方向、reduced-motion で無効 | ★★ | M | 新規 |

## E. タイポグラフィ

| # | アイデア | 概要 | 実装メモ | 適合 | 難度 | 区分 |
|---|---|---|---|---|---|---|
| E1 | **Dot-matrix font（ASCII 5×7）** | 見出し用ビットマップフォント | 生成スクリプトで A-Z/0-9 の CSS mask を出力 | ★★★ | L | 新規 |
| E2 | **Halftone headline** | 文字内部の網点が上から下へ粗くなる | `background-clip:text` + Halftone | ★★★ | S | 新規 |
| E3 | **Dotted underline link** | 細すぎる `dotted` ではなく正円ドットの下線 | `background` で下端に 1 列のドット | ★★ | S | 新規 |
| E4 | **Halftone highlighter** | 蛍光ペン風マーカーを網点で | `mark.dk-mark` | ★★ | S | 新規 |
| E5 | **Drop cap** | 段落の頭文字をドット塗り | `::first-letter` + DotText | ★ | S | 新規 |
| E6 | **Code block gutter** | 行番号の代わりにドット、差分行は色ドット | `pre` に counter + ドット列 | ★★ | S | 新規 |

## F. 表現テクニック / モーション

| # | アイデア | 概要 | 実装メモ | 適合 | 難度 | 区分 |
|---|---|---|---|---|---|---|
| F1 | Image halftone | 写真を網点印刷風に | blur + dot 重ね + `contrast()` | ★★★ | M | 前回 |
| F2 | Dithering (Bayer) | 4 段階の網パターン | 新しい `shape`/`pattern` トークン | ★★★ | M | 前回 |
| F3 | Hover swell | ホバーでドットが膨らむ | `@property --dk-size` transition | ★★★ | S | 前回 |
| F4 | Scroll reveal | スクロールでドットが現れる | `animation-timeline: view()` | ★★ | M | 前回 |
| F5 | LED marquee | 電光掲示板の流れる文字 | E1 + `translate` アニメ | ★★★ | M | 前回 |
| F6 | **Duotone dots** | 2 色のドットが交互・グラデーション | 2 層の dot 面を半ピッチずらす | ★★★ | S | 新規 |
| F7 | **Pattern library** | stripes / checker / diagonal / cross / stipple | `--dk-pattern` トークンとして整理 | ★★★ | M | 新規 |
| F8 | **Shape mask** | 円・ブロブ・ハート形に切り抜いたドット面 | `mask-image` に SVG / `shape()` | ★★ | S | 新規 |
| F9 | **Marching border** | 枠のドットが回る（フォーカス・選択中） | `background-position` アニメ | ★★★ | S | 新規 |
| F10 | **Click ripple** | 押した位置からドットが広がる | `:active` + radial mask（位置固定版は CSS のみ） | ★★ | M | 新規 |
| F11 | **Pixel dissolve transition** | ページ遷移でドット状に溶ける | View Transitions API + ドット mask | ★★★ | M | 新規 |
| F12 | **Spotlight / cursor glow** | カーソル周辺だけドットが濃い | `--mx/--my` を JS で渡す「オプションのアドオン」 | ★★ | M | 新規 |
| F13 | **CRT / Scanline** | ブラウン管風の走査線 + 発光 | 横ストライプ + `text-shadow` | ★★ | S | 新規 |
| F14 | **Wave background** | ドット面が波打つ | 行ごとに `animation-delay` 差 | ★★ | M | 新規 |

## G. ブランド / イラスト / 生成系

| # | アイデア | 概要 | 実装メモ | 適合 | 難度 | 区分 |
|---|---|---|---|---|---|---|
| G1 | Avatar | イニシャル / ハーフトーン写真 | Card + F1 | ★★ | S | 前回 |
| G2 | **Identicon** | 文字列ハッシュから 5×5 左右対称パターン | React の純関数（状態なし・RSC 可） | ★★★ | S | 新規 |
| G3 | **Logo / wordmark builder** | テキスト → ドットロゴ（Overview の dotkit 風） | DotText のプリセット集 | ★★ | S | 新規 |
| G4 | **Pixel-art sprites** | 16×16 のキャラ・絵文字風素材 | icons.json の多サイズ化（D7 と共通基盤） | ★★★ | M | 新規 |
| G5 | **OG image / Social card** | ドットで構成した共有用カード | 静的 HTML テンプレート（画像化は利用者側） | ★★ | M | 新規 |
| G6 | **Perforated ticket** | ミシン目（ドット切り欠き）のチケット | `mask` で側面に半円の連続 | ★★★ | S | 新規 |
| G7 | **Receipt** | レシート風（ドットリーダー + ギザギザ端） | C9 + G6 の組み合わせ例 | ★★★ | S | 新規 |
| G8 | **Terminal window** | 信号機ボタン 3 ドット + ドット背景 | Card のバリアント | ★★ | S | 新規 |

## H. テーマ / トークン

| # | アイデア | 概要 | 実装メモ | 適合 | 難度 | 区分 |
|---|---|---|---|---|---|---|
| H1 | **Theme presets** | Mono / Game Boy 緑 / Amber CRT / Newspaper / Risograph | `.dk-theme-*` として変数セットを追加 | ★★★ | S | 新規 |
| H2 | **Size scale tokens** | `--dk-size-1..5` と `--dk-gap-1..5` の段階 | 自由値に加えて推奨段階を提示 | ★★ | S | 新規 |
| H3 | **Print stylesheet** | 印刷時に網点を最適化（細かく・濃く） | `@media print` | ★★ | S | 新規 |
| H4 | **Dark の mute 調整** | ダークで控えめドットが沈む問題の解消 | `--dk-mute` を `#4a4a4a` 前後で検証 | ★ | S | 新規 |

## I. テンプレート（完成ページ例）

| # | ページ | 主な構成要素 |
|---|---|---|
| I1 | Dashboard | A1 Heatmap, A7 Sparkline, A3 Ring, C7 Table |
| I2 | **Status page** | A6 Uptime bar, D2 Status dot, D6 Alert |
| I3 | Pricing | Card, Badge, C9 Dot leaders, Button |
| I4 | Login / Sign up | B1/B2, B6 OTP, B7 Password strength |
| I5 | 404 / Error | A5 digits（巨大）, D7 Empty state |
| I6 | **AI chat UI** | D5 Typing indicator, E6 Code gutter, G2 Identicon avatar |
| I7 | Changelog / Timeline | Timeline, Badge, E3 underline |
| I8 | Settings | B2 Switch, B5 Segmented, B13 Swatch |
| I9 | Event ticket / Receipt | G6, G7, G2 |
| I10 | Docs layout | C6 Sidebar, C9 TOC, C12 Scroll progress |

## J. カタログ自体の機能

| # | アイデア | 概要 |
|---|---|---|
| J1 | 項目ごとのミニプレイグラウンド | size / gap / shape / color のつまみ |
| J2 | Light / Dark 並列プレビュー | 1 クリックで両テーマ比較 |
| J3 | **Forced-colors / Reduced-motion プレビュー** | 擬似的に切り替えて代替表示を確認 |
| J4 | Do / Don't | 使ってよい場面・避ける場面 |
| J5 | **検索・タグ絞り込み** | 項目数増加に備え「form」「chart」「motion」などで絞る |
| J6 | **バリアント単位のパーマリンク** | `#/catalog/button?variant=outline` |
| J7 | **a11y メモ欄** | 各項目に role / キーボード操作 / 読み上げ例 |
| J8 | **パフォーマンス注記** | 大面積のグラデーション再描画コスト、推奨上限 |
| J9 | **StackBlitz で開く** | その場で改変できるリンク |
| J10 | **コンポーネント別 llms.txt** | エージェント向けに API と例を分割配信 |
| J11 | **ビジュアル回帰のスナップショット** | v1.0 の VRT と兼用し、サムネイルにも利用 |

---

## 優先度マップ（適合 ★★★ × 難度 S を最優先）

| 波 | 内容 | 狙い |
|---|---|---|
| **v0.2** | A1 Heatmap, B1/B2 Checkbox・Radio・Switch, F1 Image halftone, A6 Uptime bar, D5 Typing indicator, C9 Dot leaders | 前回の 3 本柱 + 「ドット＝情報」が一目で伝わる小物 |
| **v0.3** | A5 digits, A7 Sparkline, A10 Pictogram, C4 Stepper, D1 Skeleton, D2 Status dot, F9 Marching border, G2 Identicon, H1 Theme presets | 小さく作れて見栄えが大きいものをまとめて |
| **v0.4** | A3 Ring, B3 Range, C1 Tabs, C2 Pagination, D3 Dialog, D6 Alert, E2 Halftone headline, F6 Duotone, F7 Pattern library, I2 Status page, I6 AI chat UI | 部品の網羅 + 最初のテンプレート |
| **v0.5+** | A13 Dot map, E1 Dot-matrix font, G4 Sprites, F11 Pixel dissolve, J 系の整備 | 生成パイプライン拡張が必要な大物 |

### 共通基盤として先に作ると効くもの

1. **ビットマップ生成パイプラインの一般化**（icons.json → 任意サイズ）: A5 / A13 / D7 / E1 / G4 がすべてこれに乗る
2. **`data-state` / `--v` の値渡し規約**: A1 / A6 / A7 / A14 / B7 で共通の書き方にする
3. **動きのガイドライン**: D1 / D9 / F4 / F5 / F9 / F14 の reduced-motion 時の振る舞いを一箇所で定義

---

## 実装状況

| バージョン | 実装した項目 |
|---|---|
| v0.2.0 | A1 Heatmap, B1 Checkbox / Radio, B2 Switch, F1 Image halftone, A6 Uptime bar, D5 Typing indicator, C9 Dot leaders |
| v0.3.0 | A5 Dot-matrix digits（共通基盤: グリフ生成の一般化）, A7 Sparkline（+ A8 の簡易版 `--area`）, A10 Pictogram, C4 Stepper, D1 Skeleton, D2 Status dot, F9 Marching border, G2 Identicon, H1 Theme presets |
| v0.4.0 | A3 Ring meter, B3 Range, C1 Tabs, C2 Pagination dots, D3 Dialog, D6 Alert, E2 Halftone headline, F6 Duotone, F7 Pattern library, I2 Status page, I6 AI chat UI |
