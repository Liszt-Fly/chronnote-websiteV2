# ChronNote 经纬 Design System

> 统一设计文档 — 设计师与前端工程师的单一权威来源
>
> Source of truth: `packages/theme-tokens/src/`

---

## 目录

1. [产品哲学与品牌](#1-产品哲学与品牌)
2. [视觉基础](#2-视觉基础)
3. [动效](#3-动效)
4. [布局系统](#4-布局系统)
5. [无障碍](#5-无障碍)
6. [交互模式](#6-交互模式)
7. [组件规范](#7-组件规范)
8. [页面模式](#8-页面模式)
9. [内容与文案](#9-内容与文案)
10. [Token 系统](#10-token-系统)
11. [治理](#11-治理)
12. [反模式总览](#12-反模式总览)

---

## 1. 产品哲学与品牌

### 1.1 最高原则

Chronnote 有两条不可妥协的顶层原则：

1. **认识你自己**
2. **提问、思考、灵感的闭环**

这不是口号，而是评估产品、界面和交互决策的首要标准。

**认识你自己** — Chronnote 应帮助用户更清晰地理解自己，而非更依赖自动化。

- 澄清在先，回答在后
- 先揭示结构，再建议行动
- 支持回顾、记忆与对比
- 引导而非命令

**提问→思考→灵感闭环** — Chronnote 不是一次性回答机器，而是支持循环：

- 提问 → 思考 → 获得洞察 → 回到更好的问题
- 不要只优化"prompt → answer"
- 创建支持重访、比较和延展思考的界面
- 让捕捉、反思和综合之间的过渡自然连贯

### 1.2 品牌人格

**五词标签**：克制 · 禅意 · 考古 · 诗意 · 仪式感
(Restrained · Zen · Archaeological · Poetic · Ritualistic)

**参考对标**：Notion/Linear（留白、内容驱动）、Bear/iA Writer（专注、字体）、Are.na/Figma Community（编辑调性、设计品味）、Zen Editor / VSCode（扁平层级、无浮动面板）

**产品隐喻表**：

| 系统概念 | 隐喻 | 说明 |
|---------|------|------|
| Chron engine | 德尔斐主殿 | 核心空间不是"聊天框"，而是"神庙" |
| Assistant persona | 皮提亚 | 解读型、冷静、有结构、不越俎代庖 |
| Usage quota / credits | 月桂叶 | 额度的语义表达 |
| Lightweight answer | 低语 | 快速轻量回答 |
| Deep answer | 神谕 | 深度回答 |
| Memory | 皮提亚的认识 | 系统记忆 |
| Main workspace | 主殿 | 主工作区 |
| Sub workspace | 神龛 | 子工作区 |

**品牌运用规则**：

- 火焰、烟雾、石柱、月桂叶等只能作为语义强化层，不能压过内容本身
- 状态如"月桂叶不足""等待启示""进入神谕"要落在明确的系统反馈和行动提示上
- 全产品共享同一母体语言——非 Chron 页面也保留沉静、可信、思辨的气质
- 功能界面可降低戏剧性，但不能失去精神内核

### 1.3 设计原则

1. **让内容自己说话 — Content speaks for itself**
   永远不要在内容已经表达其目的的地方添加标签。Section headers 和 helper text 必须被 earned，不是反射性添加。

2. **留白是设计 — Whitespace is design**
   负空间是主要媒介。密度必须感觉经过考虑，而非默认值。

3. **仪式感从简洁中生长 — Ritual emerges from simplicity**
   德尔斐格言之所以有效，是因为没有任何东西与之竞争。每添加一个元素都会稀释现有元素。

4. **克制的层级 — Restrained hierarchy**
   每个 section 最多两级视觉层级。出现第三级意味着至少有一个元素不应该在那里。

5. **渐进披露 — Progressive disclosure**
   不要一次展示所有功能。初始状态只显示核心操作（创建、搜索、导航），高级功能通过二级菜单、快捷键或命令面板触达。

6. **可预测性 — Predictability**
   相同的交互模式在全应用保持一致。动效方向与操作方向一致。反馈即时：操作后 120ms 内必须有视觉响应。

7. **宽容性 — Forgiveness**
   所有编辑操作支持 Ctrl+Z 撤销。删除操作先归档/软删除，提供恢复窗口。表单不会因为一个错误字段丢失所有已填内容。

8. **系统一致性 — System consistency**
   Tokens 是 source of truth。无 one-off 值。偏离需要证明。

### 1.4 视觉方向 — Delphi x Arena

品牌气质关键词：`academic` · `precise` · `trustworthy` · `prestigious`

- 浅色背景：暖沙、羊皮纸、石灰白，不是冷白
- 深色结构层：深棕黑、蓝黑、墨色，形成"纸张 + 墨迹/皮革"关系
- 强调色克制且有语义——红、蓝、青、绿分别服务提醒、交互、链接、数据区分
- 布局体现研究感和秩序感，留白有节奏

**反面参照（Anti-references）**：

- Busy SaaS dashboards
- 亮紫 + 玻璃拟态 + 漂浮卡片泛滥的 AI 工具
- 任何 over-explains itself 的界面
- Section labels as defaults
- 嵌套圆角面板（"island" layout）

### 1.5 UX 决策规则

在批准任何重大 UI 变更前，回答以下问题：

1. 这个方案是否帮助用户更好地理解自己的问题、处境或判断？
2. 是否支持 提问→思考→灵感 的循环？
3. 是否保持 Chronnote 沉静、反思、可信赖的调性？
4. 是在增加真正的语义价值，还是只是视觉新奇？
5. 是在减少噪音、重复或混乱，还是在增加？

如果前两个问题的答案偏弱，设计偏离策略，即使看起来精致也应拒绝。

---

## 2. 视觉基础

### 2.1 色彩系统

Source: `packages/theme-tokens/src/`

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--base-background` | `hsl(36 45% 98%)` warm parchment | `oklch(0.185 0.016 55)` leather/ink | Page base |
| `--actual-background` | `hsl(40 38% 99%)` | `oklch(0.205 0.016 56)` | Elevated surfaces |
| `--base-content` | `oklch(0.235 0.012 58)` | `oklch(0.925 0.007 92)` | Primary text |
| `--note-accent` | `#b24a3f` rust/burnt sienna | `#d06a5d` brighter rust | Brand accent |
| `--base-border` | `oklch(0.910 0.008 91)` barely visible | — | Borders |

**语义强调色**：

| 语义 | 说明 |
|------|------|
| `--info` | 研究蓝 (research blue) |
| `--success` | 植物绿 (plant green) |
| `--warning` | 青铜金 (bronze gold) |
| `--error` | 陶土红 (terracotta red) |
| `--note-accent` | 余烬/月桂暖色 (ember / laurel-adjacent warm accent) |

不要用品牌色淹没整个界面。

**色彩混合规则**：始终使用 `color-mix(in oklab, var(--token) X%, transparent)`。绝不硬编码 `rgba()` 值。

**暗色模式特殊考虑**：

- 主题切换应立即生效，无页面刷新；提供系统跟随选项
- 切换时使用 200ms 全局 transition 避免闪烁
- 阴影在深色模式下不够明显——使用更高透明度 (3x)
- 避免纯黑 (`#000`) 背景——使用深灰 (`oklch(0.13)`) 减少视觉疲劳
- 图片和代码块在深色模式下可能需要降低亮度
- 功能色使用更亮的变体以维持可读性

### 2.2 字体排版

**UI font stack**：`'SN Pro', 'MiSans', 'Inter Variable', 'Inter', 'PingFang SC', system-ui`

**Serif / editorial** (`.chron-shell__serif`)：
`'Iowan Old Style', 'Palatino Linotype', 'Book Antiqua', Georgia, serif`
→ 用于：德尔斐格言、有叙事重量的页面标题

**Code**：`'Cascadia Code', 'Cascadia Mono', 'Fira Code', 'IBM Plex Mono', monospace`

**双轨排版模型**：

- 有表现力的 serif 倾向：用于选定的标题和品牌识别时刻
- 清晰的 sans：用于界面、正文、控件和密集阅读
- mono 仅用于系统、代码、token 或命令上下文

规则：不要对大段正文使用 serif；保持阅读舒适度优先于氛围；mono 仅限系统/代码场景。

**字号比例**：

| Role | Size | Weight | Notes |
|------|------|--------|-------|
| Section label | `0.68rem` | 700 | Uppercase, `letter-spacing: 0.16em` — 慎用 |
| Caption/secondary | `0.75–0.84rem` | 400 | |
| Body | `0.875–0.9rem` | 400 | |
| Input | `1.03rem` | 400 | Composer |
| Delphic maxim | `clamp(1.4rem, 2.2vw, 1.9rem)` | 500 | Italic serif — **首页视觉锚点** |

**规则**：德尔斐格言必须是首页上最大的非结构性元素，没有任何其他元素与之竞争。

**开发者 Token 规则**：

- 模板内优先使用语义 token class，避免硬编码样式
- 标准正文：`text-base`（`13px` / `0.8125rem`）；样式变量场景用 `var(--text-base)`
- 超小字号：`text-small`（`10px` / `0.625rem`）；样式变量场景用 `var(--text-small)`
- 不使用 `text-[9px]`、`text-[10px]`、`text-[11px]`，统一收敛为 `text-small`
- 不新增 `text-standard` 命名；历史存量按需迁移至 `text-base`

### 2.3 间距

Scale: 4 → 6 → 8 → 12 → 16 → 24 → 32 → 48px

**密度指引**：

| 区域 | 密度 | 理由 |
|------|------|------|
| 导航/工具 UI | 紧凑 | 高效，少滚动 |
| 内容区域 | 中等 | 需要呼吸感 |
| 编辑器 | 宽松 | 阅读和写作需要充足留白 |
| 列表/表格 | 紧凑 | 扫描效率优先 |

**规则**：所有新增间距和尺寸是 4px 的倍数。使用一致的比例尺，避免任意的 one-off padding 和 margin 值。

### 2.4 圆角

| Value | Token | Usage |
|-------|-------|-------|
| `4px` | `--radius-sm` | Chips, tags |
| `6px` | `--radius-md` | Buttons, small inputs |
| `8px` | `--radius-lg` | General panels, cards |
| `10px` | — | Main input surface (hero surface, 上限) |
| `999px` | — | State badges, tab pills |

**上限规则**：主要容器最大 10px，卡片类组件最大 8px (`--radius-lg`)。pill 形状仅用于语义场景（chips、tags）。

**开发者 class 规则**：

- 圆角统一四档：`rounded-small`、`rounded-medium`、`rounded-large`、`rounded-full`
- 仅当 class utility 难以表达时才使用 `var(--radius-*)`（如 `:deep(...)`、伪元素、`calc(...)`）
- 除渲染/导出兼容场景外，不新增裸值圆角（`px`、`em`、`rem`）

### 2.5 边框与分隔

Chronnote 依赖微妙的分隔：

- 优先用柔和的边框对比度，而非粗重描边
- 层级首先通过表面色调、间距和排版建立
- 仅在输入框、焦点状态或交互边界使用较强边框

### 2.6 阴影与层级

```css
/* Micro */
0 1px 2px oklch(0 0 0 / 0.04)

/* Panel */
0 10px 24px -20px color-mix(in oklab, var(--base-content) 18%, transparent)

/* Focus ring */
0 0 0 3px color-mix(in oklab, var(--note-accent) 12%, transparent)
```

**规则**：

- 阴影只用中性色，不再使用 accent 色 shadow（如 note-accent glow）
- 用阴影表示浮动表面和分层界面（菜单、对话框），不用作装饰
- 阴影应轻盈克制

### 2.7 渐变禁令

禁止在 UI 组件的背景上使用 CSS `linear-gradient` 或 `radial-gradient`。

唯一例外：功能性渐变（如 scrollable 区域的 fade mask）。

原因：渐变与克制美学冲突，给界面带来不必要的戏剧感。

---

## 3. 动效

### 3.1 时长与缓动

| Variable | Duration | Usage |
|----------|----------|-------|
| `--duration-micro` | `120ms` | Hover, icon swaps |
| `--duration-state` | `200ms` | Visibility, color transitions |
| `--duration-layout` | `300ms` | Panel opens, layout shifts |
| Easing | `cubic-bezier(0.25, 0.1, 0.25, 1.0)` | 所有 UI 动效 — 自然减速 |

**禁止的缓动**：

- `linear` — 机械感
- `ease-in` — 慢启动不自然
- `bounce` / `elastic` — 过于活泼，不符合"经纬"气质

### 3.2 动效目的

每个动效必须回答："这个动画帮助用户理解了什么？"

| 目的 | 示例 |
|------|------|
| 因果关系 | 点击按钮 → 按钮缩小 → 结果出现 |
| 空间关系 | Sidebar 展开方向表明内容来源 |
| 状态变化 | 颜色过渡表明状态正在改变 |
| 注意引导 | 微位移引导视线到新内容 |

### 3.3 禁止的动效

- 纯装饰性动画（不传达信息的旋转、弹跳）
- 阻塞用户操作的动画（必须等动画结束才能点击）
- 超过 300ms 的界面切换动效
- 连续循环动画（除了加载状态和 AI 思考动效）

### 3.4 运动敏感

遵守 `prefers-reduced-motion` 媒体查询：

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 4. 布局系统

### 4.1 Shell 层级

层次通过**底色差异**建立，不依赖 border、shadow 或 rounded box。

| Layer | Class / Element | Background | 语义 |
|-------|----------------|-----------|------|
| 窗口底座 | `.chron-shell` | `var(--base-background)` | 窗口帧 |
| 导航层 | Sidebar | `color-mix(base-background 94%, base-content 6%)` | 略深，沉入感 |
| 工作面 | `.chron-shell__main` | `var(--actual-background)` | 略亮净，浮出感 |

**规则**：

- Sidebar 与内容区之间只用一条 `1px border-r`，无 rounded 外壳
- TopBar 背景透明，继承工作面底色
- 内容区内部组件（paper-panel）可以有微妙 border 和轻 shadow，但不允许嵌套使用

### 4.2 Sidebar 规范

| 位置 | 值 |
|------|-----|
| 外层容器 | `px-2 pt-2 pb-3` |
| 各 section 间距 | `space-y-2` |
| Section 内元素间距 | `space-y-0.5`（导航项） |
| 无背景 section | **不加额外 padding**，由外层容器统一控制 |

### 4.3 信息架构

**导航层级**：

```
Level 0: Sidebar — 全局导航（首页、收件箱、探索、设置）
Level 1: Workspace 树 — 页面/文件组织
Level 2: 面板内容 — 文档、Todo、白板等
Level 3: 命令面板 — 快速跳转和操作 (Ctrl+J)
```

**信息密度**：

| 区域 | 密度 | 理由 |
|------|------|------|
| Sidebar 导航 | 紧凑 | 导航需要高效，少滚动 |
| HomePage | 中等 | 概览需要呼吸感，但不浪费空间 |
| 编辑器 | 宽松 | 阅读和写作需要充足的留白 |
| 列表/表格 | 紧凑 | 扫描效率优先 |

**视觉权重分配**：

```
[低]  TopBar  ───  几乎透明，不争夺注意力
[低]  Sidebar ───  柔和背景，服务型角色
[高]  Content ───  最高对比度，最大面积
```

### 4.4 响应式设计

**断点系统**：

| 名称 | 宽度条件 | 高度条件 | 行为 |
|------|---------|---------|------|
| Full | > 1000px | > 680px | 完整布局，所有元素可见 |
| Compact | < 1000px | < 680px | 缩减间距，简化布局 |
| Minimal | < 760px | < 560px | 最小化导航，移除次要元素 |

**适配策略**：

| 元素 | Full | Compact | Minimal |
|------|------|---------|---------|
| Sidebar | 220px 展开，图标+文字 | 可折叠为 40px 图标模式 | 默认折叠，覆盖式展开 |
| TopBar | 搜索输入框 + 完整按钮 | 搜索缩为图标按钮 | — |
| HomePage | 640px 居中，三列指标卡 | 缩减间距，两列指标 | 单列堆叠 |
| 编辑器 | 居中 `max-width: 720px`，左右 padding 48px | — | padding 缩减到 24px |

**触摸友好**：

- 所有可点击目标最小 `32x32px`（符合 WCAG 2.2 Level AA）
- 按钮间距至少 `8px`
- 滑动手势不覆盖原生行为

---

## 5. 无障碍

### 5.1 色彩对比度

| 元素 | 最低对比度 (WCAG AA) | 当前状态 |
|------|---------------------|----------|
| 正文 vs 内容背景 | 4.5:1 | `oklch(0.15)` vs `oklch(0.995)` ≈ 15:1 |
| 次要文字 vs 背景 | 4.5:1 | `oklch(0.40)` vs `oklch(0.995)` ≈ 7:1 |
| 辅助文字 vs 背景 | 3:1 (大文字) | `oklch(0.55)` vs `oklch(0.995)` ≈ 4.5:1 |
| 占位符 vs 背景 | 3:1 | `oklch(0.70)` vs `oklch(0.975)` ≈ 2.5:1 — 注意边界 |

**规则**：

- 可交互元素的文字对比度 >= 4.5:1
- 纯装饰性文字（占位符）允许低至 2:1，但搭配 `placeholder` HTML 属性
- 功能色在深色主题中使用更亮的变体以维持对比度
- 不使用纯色彩传达信息——始终搭配文字或图标

### 5.2 键盘导航

| 操作 | 快捷键 |
|------|--------|
| 全局搜索 / 命令面板 | `Ctrl+J` / `Cmd+J` |
| 新建笔记 | 导航栏按钮或快捷键 |
| 切换 Sidebar | 点击切换按钮 |
| Tab 导航 | 所有可交互元素支持 Tab 焦点 |
| Escape | 关闭弹窗、取消操作 |

**规则**：

- 所有功能必须可通过键盘完成（不依赖鼠标）
- 焦点指示器不能被隐藏——当前使用 `outline: none` 时，必须提供替代焦点样式
- 模态对话框启用焦点陷阱（focus trap）
- 下拉菜单支持方向键导航

### 5.3 屏幕阅读器

- 所有图标按钮提供 `aria-label`
- 导航区域使用 `<nav>` + `aria-label`
- 动态内容变化使用 `aria-live` 通知
- 不使用仅依赖颜色的状态区分

---

## 6. 交互模式

### 6.1 Hover 状态

| 元素 | Hover 效果 | 时机 |
|------|-----------|------|
| 导航项 | 背景色变化 (`base-100`) | 120ms |
| 卡片/列表项 | 背景色变化 + 微位移 (`translateY(-1px)`) | 120ms |
| 按钮 | 背景色变深一级 | 120ms |
| 链接 (编辑器) | 下划线消失 | 120ms |
| 图标按钮 | 背景色变化 | 120ms |

**规则**：Hover 效果只改变**一个属性**——不要同时改变颜色、大小、位置。

### 6.2 Click / Active 状态

- 按钮：`scale(0.98)` 轻微缩放，提供"按下"触感
- 列表项：背景变为 `base-200`
- 所有点击反馈必须在 **50ms 内** 出现

### 6.3 Focus 状态

- 输入框：背景变浅 (`base-50`) + 微阴影 (`shadow-sm`)
- 不使用浏览器默认的蓝色 outline
- 提供明确的焦点环（keyboard-only focus 时）

### 6.4 Loading 状态

| 时间 | 用户感知 | 应对策略 |
|------|---------|---------|
| 0-100ms | 即时 | 无需加载提示 |
| 100-300ms | 轻微延迟 | 状态变化即可（如按钮变色） |
| 300ms-1s | 明显延迟 | 显示加载指示器 |
| 1-5s | 缓慢 | 显示进度 + 可取消 |
| > 5s | 太慢 | 转为后台任务 + 通知完成 |

- 短操作 (< 300ms)：无加载指示器，直接显示结果
- 中等操作 (300ms - 2s)：显示骨架屏（skeleton）或文字扫描动效
- 长操作 (> 2s)：显示进度条或带文字说明的加载状态
- 永远不让用户看到空白的等待页面

### 6.5 空状态

每个空状态都应包含：

1. 一句话描述（这里应该有什么）
2. 一个主操作按钮（如何开始创建）
3. 可选：一个辅助链接（了解更多）

空状态应该引导思考、打开可能性，而非让用户走进死胡同。不要在空状态中填充低价值噪音。

### 6.6 感知性能

**优化策略**：

- **面板缓存**：使用 LRU 缓存 + `v-show` 而非 `v-if`，避免重渲染
- **懒加载**：列表项延迟加载内容，优先渲染可见区域
- **乐观更新**：本地操作立即反映到 UI，异步同步后端
- **预加载**：鼠标 hover 导航项时预加载目标内容

---

## 7. 组件规范

### 7.1 组件哲学

Chronnote 组件应感觉：calm、intentional、compact but not cramped、仅在与产品有意义关联时才具表现力。

组件不是孤立的装饰对象。每个组件应支持：更清晰的思考、更干净的任务流、更低的 UI 噪音、更强的系统一致性。

### 7.2 全局组件规则

1. **一个组件，一个语义职责** — 不要让一个组件承载不相关的含义。Primary button 不应冒充 navigation tab。
2. **优先语义变体，而非自定义 one-off** — 使用 default / hover / active / disabled / destructive / success。避免 `homepage-special`、`warm-paper-alt-2` 之类。
3. **状态设计是强制的** — 每个交互组件必须定义 default / hover / focus / active / disabled。相关时还需定义 loading / selected / error / empty。
4. **紧凑必须保持清晰** — 紧凑不能折叠点击目标、擦除层级或降低可读性。
5. **组件应继承系统，而非重新样式化** — 使用现有 surface tokens、spacing scale、radius grammar、semantic text hierarchy。避免与系统竞争的局部重设样式。

### 7.3 组件文档模板

每个共享组件 spec 最终应包含：

1. Purpose
2. Anatomy
3. Variants
4. States
5. Content rules
6. Interaction rules
7. Accessibility notes
8. Anti-patterns
9. Token mapping

### 7.4 具体组件实现

#### Section Labels (`.chron-shell__section-label`)

**慎用**。仅在内容无法自行传达其目的时使用。

- ❌ 首页 sections（内容自明）
- ✅ Panel/dialog headers（否则会失去上下文）
- ✅ Sidebar section 分割线（如"我的项目"）

#### Deck Cards

- Width: `138px`, min-height: `156px`, border-radius: `rounded-lg` (8px)
- Background: 扁平 `color-mix`，无 gradient
- Shadow: 中性轻 shadow，无 accent 色
- Stagger: `DECK_ROTS = [-1.4, 0.8, -0.6, 1.0, -0.4]°`
- Hover: `translateY(-6px)`, z-index escalate

#### TopBar Search

- 默认展开（threshold: viewport ≤ 560px 才折叠为图标）
- Shape: `rounded-lg`（8px），不使用 `rounded-full`
- Style: VSCode-style 矩形搜索框，显示快捷键提示（Ctrl+J / ⌘+J）

### 7.5 优先组件清单

下一阶段应完整文档化的组件：

| 类别 | 组件 |
|------|------|
| Navigation | sidebar items, top bar actions, breadcrumbs, panel headers |
| Inputs | text inputs, search fields, command palette input, composer input |
| Actions | buttons, icon buttons, menu items, segmented controls |
| Containers | cards, popovers, dialogs, panels, empty states |
| Knowledge & Thinking UI | message blocks, thought/analysis blocks, note previews, references, memory surfaces |

---

## 8. 页面模式

### 8.1 Homepage 典范布局

```
[Delphic maxim — italic serif, centered, dominant]

[Input surface — rounded-hero (10px), chron-shell__paper-panel]
  padding: 0.65rem 0.9rem 0.6rem (surface) + 0.6rem 0.75rem (editor内)
  editor min-height: 3.8rem
  NO internal header/label
  composer + footer hint + send button

[Deck row — staggered fan of rounded-lg (8px) cards]

[── 历史原子 — minimal link with line prefix, below cards]
```

**规则**：

- 主操作有限，不重复全局快捷方式
- 空状态消息应打开思考，而非简单推销功能
- 保持情感调性设定的作用

### 8.2 全局命令面板

- 统一搜索、快速操作和命令入口
- 一个明确的全局快捷键入口（`Ctrl+J`）
- 最小化其他地方的重复提示
- 最近项、操作和命令应清晰分隔

### 8.3 Sidebar 与导航

- 在工作区和面板之间提供稳定的导向
- 导航保持紧凑和可预测
- 标签应比图标更清晰
- 辅助提示不应与主导航任务竞争

### 8.4 思考界面

支持阅读、比较、反思和综合。

- Chron 对话、笔记阅读面板、综合/洞察区块
- 层级应突出思维结构而非聊天噪音
- 答案应可扫描、可重访
- 深度模式应比轻量模式更刻意

### 8.5 工作区与面板

- 面板创建应明确
- 面板身份应保持稳定
- 分割视图应帮助比较而非制造杂乱

**模式审查问题**：

1. 这个模式是否帮助用户延续思考而非重启上下文？
2. 下一步操作是否明显？
3. 全局操作是否在不该重复的地方重复了？
4. 模式是否保持了平静和秩序？
5. 用户能否从困惑中快速恢复？

---

## 9. 内容与文案

### 9.1 语气模型

Chronnote 应该听起来：

- **calm** — 平静
- **clear** — 清晰
- **thoughtful** — 深思熟虑
- **interpretive** — 解读型
- **respectful** — 尊重

不应该听起来：hype-driven、overconfident、cute for its own sake、pseudo-mystical without clarity。

### 9.2 皮提亚之声

Chron 可以带一点皮提亚风味，但只在提升意义时使用。

- 好的：suggestive、composed、reflective、在深层上下文中轻度仪式感
- 坏的：archaic roleplay、theatrical fantasy speech、在需要直接指引时过度隐喻

### 9.3 明文规则

**当清晰与氛围冲突时，选择清晰。**

直接措辞用于：错误、破坏性操作、确认、空状态、设置、引导说明。

保留神话/诗意框架用于：产品级身份时刻、深度思考上下文、精心选择的标题或状态。

### 9.4 界面文案规则

**标签**：简短、使用熟悉的语言、避免对常见任务使用装饰性措辞。

**空状态**：说明用户在哪里、建议下一步、保持支持性而非推销性的情感调性。

**错误信息**（三要素）：

1. **发生了什么**（简述问题）
2. **为什么发生**（如果有帮助的话）
3. **怎么解决**（给出下一步操作）

```
❌ "操作失败"
✅ "无法保存文档——网络连接中断。请检查网络后重试。"
```

**时间表达**：

| 时间范围 | 表达 |
|---------|------|
| 1分钟内 | 刚刚 |
| 1小时内 | X 分钟前 |
| 今天 | 今天 HH:MM |
| 昨天 | 昨天 |
| 本周 | 周X |
| 更早 | MM月DD日 |

**快捷键与提示**：不要在多个地方无附加价值地重复同一提示；保持快捷键格式一致。

### 9.5 产品术语表

| 中文术语 | 使用场景 |
|---------|---------|
| 月桂叶 | 额度/credits 相关 |
| 低语 | 轻量回答 |
| 神谕 | 深度回答 |
| 皮提亚 | AI persona |
| 主殿 | 主工作区 |
| 神龛 | 子工作区 |

仅在上下文支持理解时使用这些术语。在实用型 UI 中（如计费、配额设置页），直接的功能性措辞可能更好。

---

## 10. Token 系统

### 10.1 Token 分类

| 层 | 示例 | 用途 |
|----|------|------|
| **Base Surface** | `--base-background`, `--actual-background`, `--base-50` ~ `--base-950` | 表面、层级、中性分层 |
| **Content** | `--base-content`, `--base-content-secondary`, `-tertiary`, `-quaternary` | 可读文本层级、弱化标签、元信息 |
| **Semantic** | `--info`, `--success`, `--warning`, `--error`, `--note-accent` | 有意义的 UI、状态消息、内容强调 |
| **Structural** | `--sidebar-bg`, `--bg-section`, `--popover-background`, `--popover-foreground` | 系统级表面上下文、重复结构容器 |
| **Interaction** | `--shadow-sm/md/lg`, `--duration-micro/state/layout`, `--easing-default` | 高程、过渡、界面节奏 |
| **Shape** | `--radius-sm`, `--radius-md`, `--radius-lg` | 控件形状语法、容器圆角、一致的组件几何 |

### 10.2 使用规则

**命名规则**：

- ✅ 优先语义含义：`--popover-background`、`--base-content-secondary`
- ❌ 避免页面专用命名：`--homepage-card-light-beige`、`--chronnote-super-button-brown`

**Token 引用规则**：

- 避免 one-off tokens，除非它们代表真正的系统模式
- 如果只有一个页面需要某个值，先问：应该是 local style 吗？是否已有近义 token？
- 不要在组件中绕过已有 token 而硬编码值

**开发者用法**：

- class 场景优先 `text-base`、`text-small`、`rounded-small` 等语义 class
- 样式变量场景优先 `var(--text-base)`、`var(--radius-sm)` 等

### 10.3 源文件

- Light theme: `packages/theme-tokens/src/themes/light.css`
- Dark theme: `packages/theme-tokens/src/themes/dark.css`
- Typography: `packages/theme-tokens/src/foundations/typography.css`
- Tailwind adapter: `packages/theme-tokens/src/adapters/tailwind-theme.css`

### 10.4 当前缺口

Chronnote 尚未完全规范化以下 token 子系统：

- spacing scale（间距比例）
- density tiers（密度层级）
- component-level radius grammar（组件级圆角语法）
- component-level semantic aliases（组件级语义别名）

这些应在下一阶段的 token 清理中解决。

---

## 11. 治理

### 11.1 变更层级

| Level | 示例 | 要求 |
|-------|------|------|
| **L1: 局部 UI 调整** | 文案微调、单视图间距修复、单组件状态抛光 | 局部审查，无系统扩展 |
| **L2: 共享组件调整** | 按钮行为更新、面板头部模式变更、通用空状态结构更新 | 检查原则/基础/token影响，更新组件或模式文档 |
| **L3: 系统变更** | 新 token 类别、基础间距规则变更、圆角语法重写、新全局交互入口 | 显式设计推理、跨文档更新、实现审计 |

### 11.2 新增 Token 规则

**添加 token 的条件**（全部满足）：

1. 含义可复用
2. 值出现在多个组件或模式中
3. 现有语义 token 无法干净表达

**拒绝 token 的条件**（满足任一）：

- 只为匹配一张截图而存在
- 编码了页面名或临时功能名
- 重复了现有语义角色
- 削弱了 token 系统的清晰度

### 11.3 新增组件规则

添加组件的条件：

- 行为可复用
- 无法由现有原语组合表示
- 命名和目的足够稳定可文档化

### 11.4 例外规则

允许例外的条件：

- 用户任务有实质性不同
- 现有系统规则造成真实的 UX 伤害
- 例外已文档化且可审查

不允许因以下原因的例外：截图看起来更好、one-off 布局感觉更快、local custom style 省去了读手册的麻烦。

### 11.5 变更流程

**变更前**：

1. 识别影响的语义层
2. 检查 theme 文件和 UI 代码中的当前使用情况
3. 验证变更是否仍符合 Chronnote 原则
4. 检查对比度、层级和重复风险

**变更后**：

1. 验证受影响的 themes
2. 验证受影响的 surfaces
3. 语义含义变化时更新此文档

### 11.6 统一审查清单

每个新功能上线前 / 每次重大 UI 变更审批前：

**原则对齐**：
- [ ] 是否帮助用户更好地思考、查找、判断、回顾？
- [ ] 是否支持 提问→思考→灵感 循环？
- [ ] 是否保持 Chronnote 的沉静、反思、可信赖调性？
- [ ] 是在增加语义价值还是只是视觉新奇？
- [ ] 是在减少噪音而非增加？

**实现质量**：
- [ ] 键盘可达：不依赖鼠标即可完成所有操作
- [ ] 焦点管理：打开/关闭弹窗后焦点正确恢复
- [ ] 空状态：数据为空时显示引导而非空白
- [ ] 加载状态：超过 300ms 的操作有视觉反馈
- [ ] 错误处理：失败时有明确的错误信息和恢复路径
- [ ] 深色模式：在深色主题下视觉正确
- [ ] 响应式：在 Compact 和 Minimal 断点下可用
- [ ] 动效一致：使用 `transition-jingwei` / `hover-lift` / `active-press`
- [ ] 4px 对齐：所有新增间距和尺寸是 4px 的倍数
- [ ] 文案审核：按钮、提示、错误信息语言简洁明确

**系统完整**：
- [ ] 是否使用现有 tokens 而非自定义值？
- [ ] 是否是真正可复用的原语？
- [ ] 是否所有关键状态都已定义？
- [ ] 是否需要更新此文档？

---

## 12. 反模式总览

以下行为违反 Chronnote 设计系统：

**布局与结构**：
- 默认为新 UI section 添加 section label（内容自明时不需要）
- 将每个分组包裹在可见的有边框 card 中
- 单一视图内出现 3+ 级文本层级
- 嵌套圆角面板（"island" layout）
- 堆叠竞争性的 call-to-actions
- 多个竞争入口指向同一操作

**视觉**：
- 在 UI 组件上使用渐变背景（包括 Hero 输入框叠层、卡片背景）
- 圆角超过 10px 的非功能性面板
- 在 token 系统外硬编码颜色
- 使用 accent 色 shadow
- 亮紫 + 玻璃拟态 + 漂浮卡片泛滥

**交互与内容**：
- 内联解释元素的用途（信任用户）
- 永久性地向核心流程添加欢迎/品牌文案
- 纯装饰性动画（不传达信息的旋转、弹跳）
- 超过 300ms 的界面切换动效
- 将反思性任务简化为通用聊天气泡

**组件与系统**：
- 创建仅为满足一个页面的新组件
- 硬编码绕过 token 系统的 spacing/color/radius 值
- 同一组件用于多个冲突含义
- 只设计 default 状态而忽略 focus/disabled/empty
- 添加破坏 提问→思考→灵感 循环的新流程
- 用装饰密度填充，信息层级却很弱
