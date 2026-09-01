# Maple Bowl MVP 执行计划

> 目标：先用静态展示数据搭建出 Maple Bowl 的基本网站形态，验证品牌表达、信息架构、页面模板和内容之间的连接。
>
> 暂不纳入：CMS、后台录入、用户账户、复杂推荐、在线交易、完整数据运营流程。

## 0.1 已确定的实现基线

```text
品牌名       Maple Bowl
技术栈       Next.js + TypeScript + Tailwind CSS + shadcn/ui
部署目标     Vercel
国际化       next-intl
内容优先级   简体中文优先，英文和法文随后完善
根路径语言   `/` 按 locale cookie 和浏览器/系统语言协商，最终 fallback 到 `/zh`
主视觉参考   maplebowls.png
补充参考     maple-bowls.png
Favicon      现有 favicon.png
首页视觉     现有 home-logo.png
```

内容先以静态展示数据为主，尽量接近真实产品和营养信息的结构。
未经核实的内容只用于 MVP 演示和布局验证，正式公开前需要再次核验，
但本阶段不建设 CMS、数据录入或内容审核后台。

## 0. MVP 目标与边界

### MVP 必须形成的体验

- 新用户能在首页快速理解 Maple Bowl 是什么。
- 用户可以选择 Dog、Cat、Both，或跳过。
- 用户可以浏览一篇营养知识内容。
- 用户可以从品牌进入产品，再进入 Ingredient 或 Nutrition Guide。
- 产品页能够展示产品事实、营养信息、配料、来源和 Maple Bowl 说明。
- EN / FR / ZH 三种 locale 路由可以工作，简体中文作为首发主语言。
- 网站在移动端和桌面端都具备基本可用性。

### MVP 首发页面

```text
/[locale]
/[locale]/nutrition-guide
/[locale]/nutrition-guide/[slug]
/[locale]/ingredients/[slug]
/[locale]/food
/[locale]/food/[slug]
/[locale]/brands
/[locale]/brands/[slug]
/[locale]/reviews/[slug]
/[locale]/search
/[locale]/about
/[locale]/methodology
/[locale]/privacy
```

### 暂时延后

- CMS、数据库管理后台和内容录入界面
- 复杂的搜索引擎和中文分词
- 高级营养筛选和产品评分
- 个性化喂养计划、计算器和 AI 推荐
- 用户账户、收藏、评论和社区
- 购物、Affiliate 链接和品牌合作模块
- 视频、Recipes、Tools 的完整功能；可以保留轻量入口或 Coming Soon 模块

## 1. 项目执行原则

- 每个阶段先完成一个可运行、可检查的结果，再进入下一阶段。
- 优先做一条完整链路，而不是同时铺开所有页面。
- 所有页面从第一天就放在 `app/[locale]/` 下。
- 静态数据也使用接近最终领域模型的结构，避免为了 mock 数据创建临时组件接口。
- Server Components 优先；只有偏好选择、菜单、搜索交互等需要浏览器状态的部分使用 Client Component。
- 先实现真实内容的小样本，再扩展内容数量。
- 每个 milestone 结束时都进行 EN / FR / ZH、移动端和键盘操作检查。

## 2. Milestone 总览

| Milestone | 目标 | 主要产出 |
| --- | --- | --- |
| M0 | 工程初始化与范围冻结 | 可启动的 Next.js 项目、基础规范 |
| M1 | 品牌壳和全局导航 | Layout、Header、Footer、locale 路由 |
| M2 | 完整垂直切片 | Home → Brand → Product → Ingredient → Guide |
| M3 | 页面模板和静态内容系统 | 目录、详情页、统一静态 schema |
| M4 | 多语言和轻量偏好 | EN / FR / ZH、语言切换、pet cookie |
| M5 | 搜索与内容发现 | 基础搜索、筛选、相关内容链接 |
| M6 | 品质、SEO 和上线准备 | 无障碍、响应式、metadata、错误状态、部署 |

---

## M0 — 工程初始化与范围冻结

### 目标

建立可以持续开发的 Next.js + TypeScript + Tailwind + shadcn/ui 基础，并把本轮 MVP 的范围固定下来。

### Checklist

- [x] 确认 Next.js App Router 结构。
- [x] 创建 `app/[locale]/` 路由骨架。
- [x] 配置 TypeScript、Tailwind、shadcn/ui 和项目 alias。
- [ ] 建立基础目录：`components/ui`、`components/brand`、`components/navigation`、`components/product`、`components/content`、`lib`、`content`。
- [x] 定义 `Locale`、`PetPreference`、`Species`、`FoodType` 等基础类型。
- [x] 安装并配置 `next-intl`，建立 `messages/en.json`、`messages/fr.json`、`messages/zh.json`。
- [x] 明确 `next-intl` 管理 UI 文案，产品/品牌/Ingredient/文章翻译由静态领域数据管理。
- [x] 建立 semantic theme tokens，并按 `ui-design.md` 映射品牌颜色。
- [ ] 确定字体和 `next/font` 加载方式。
- [x] 添加基础 lint 和 typecheck 命令。
- [ ] 添加 format 命令。
- [x] 写出当前 MVP 的页面清单和延后清单。

### 完成条件

- [x] 本地可以启动项目。
- [x] `/en`、`/fr`、`/zh` 至少能渲染独立 locale 页面。
- [x] 主题、字体和基础 Button/Card/Badge 能正常使用。
- [x] 不再需要通过修改页面代码来切换 locale。

## M1 — 品牌壳和全局导航

### 目标

先建立网站的整体感觉和跨页面结构，使后续页面可以直接复用。

### Checklist

- [x] 实现 Maple Bowl Logo/wordmark 组件。
- [x] 实现全局 `SiteHeader`。
- [x] 实现桌面导航：Nutrition Guide、Product Reviews、Brands、Recipes、Videos、Tools。
- [x] 实现移动端 Header 和 Sheet 菜单。
- [x] 实现 Footer，包含 About、Methodology、Privacy 和 locale 入口。
- [x] 实现 Breadcrumb。
- [x] 实现 Language Switcher，并保留当前页面概念路径。
- [x] 实现基础 Link、Button、Card、Badge、Section Container。
- [x] 处理 404 和基础错误页面的品牌样式。
- [x] 为 Header、Footer、Sheet、Dropdown 添加键盘焦点和 aria 标签。

### 完成条件

- [x] 任意 locale 下都能访问首页和主要导航入口。
- [x] 桌面和移动端导航均可操作。
- [x] 法语较长菜单项不会溢出。
- [x] 中文导航、行高和按钮布局正常。
- [x] 页面不存在时显示可理解的 404 页面，而不是空白或异常堆栈。

## M2 — 完整垂直切片

### 目标

用少量真实静态内容完成最重要的一条用户路径：

```text
Home → Brand → Product → Ingredient → Nutrition Guide
```

### 建议静态数据

- 3 个品牌
- 每个品牌 1–2 个产品
- 5 个 Ingredient
- 3 个 Nutrition Topic
- 2–3 篇 Guide

### Checklist

- [x] 定义静态数据 schema 和示例数据。
- [x] 实现 Home 页面。
- [x] 实现 Brand 详情页。
- [x] 实现 Product 详情页。
- [x] 实现 Ingredient 详情页。
- [x] 实现 Nutrition Topic 页面。
- [x] 实现 Guide / Article 页面。
- [x] 实现 Product Card、Brand Card、Article Card。
- [x] 实现 Nutrition Facts Table，支持 min/max、单位和缺失值。
- [x] 实现 Ingredient List，并支持链接到已知 Ingredient 页面。
- [x] 实现 Source List、Last Verified 和 Maple Bowl Notes 区域。
- [x] 在页面之间建立人工维护的相关链接。
- [x] 产品事实、来源和编辑说明使用明显不同的视觉层级。

### 完成条件

- [x] 从首页开始，不依赖浏览器后退，也能完成整条内容链路。
- [x] 不同产品的数据缺失不会导致页面结构损坏。
- [x] 产品页在 375px 左右宽度下可读，无横向溢出。
- [x] 页面不是单纯的占位卡片，至少使用一组真实产品内容验证布局。

## M3 — 页面模板和静态内容系统

### 目标

把垂直切片中验证过的模式扩展成可重复使用的 Maple Bowl 静态内容网站。

### Checklist

- [ ] 实现 Nutrition Guide Landing。
- [ ] 实现 Brands Directory。
- [ ] 实现 Pet Food Directory。
- [ ] 实现 Food Type、Life Stage、Species 的基础展示和筛选状态。
- [ ] 实现 `/food/dog`、`/food/cat` 或等价的 species 入口。
- [ ] 为目录页添加 empty state。
- [ ] 为产品详情页添加 loading/error/not-found 处理。
- [ ] 将页面内容从组件 JSX 中移出，统一放入 `content` 或 `data` 层。
- [ ] 为静态数据添加基础校验，避免 slug、关联 ID 和必填字段错误。
- [ ] 确定列表排序规则，先使用固定、可预测的排序。
- [ ] 统一处理缺少图片、缺少营养字段、缺少翻译的情况。
- [ ] 控制首页内容密度，不把未来模块全部提前放入首页。
- [ ] 为 Brand、Product、Ingredient、Nutrition Topic、Guide 统一显示 draft/verified 状态。
- [ ] 为静态内容增加关联完整性校验，覆盖 slug、brandId、ingredientId、topicId 和 related IDs。
- [ ] 将内容校验错误与页面查询错误区分，避免查询层静默过滤缺失关联。
- [ ] 收紧查询层接口，优先返回只读实体和只读列表，避免页面意外修改 canonical data。
- [ ] 抽取组合查询，统一处理产品与品牌、Ingredient 与产品、Guide 与相关内容的关联。
- [ ] 为 FoodType、life stage 等开放字段提供完整翻译或明确 fallback，避免新增数据出现空标签。
- [ ] 评估 Nutrition Topic 与 Guide 的路由和领域边界，决定是否采用独立路径或统一 entry 类型。

### 完成条件

- [ ] 新增一个 Brand/Product/Ingredient 主要通过添加数据完成，而不是复制页面组件。
- [ ] 目录、详情页和关联链接使用同一套实体数据。
- [ ] 空数据和无结果状态有明确文案和返回路径。
- [ ] 页面层没有大段重复的产品/品牌展示逻辑。
- [ ] 内容关联错误能在校验阶段被定位，不会在页面渲染时静默丢失。
- [ ] 新增内容只需更新数据和必要的校验，不需要复制关联拼装逻辑。
- [ ] 所有 draft 内容在页面上有清晰状态提示，开放字段不会产生空白 UI 标签。

## M4 — 多语言和轻量偏好

### 目标

完成 V1 的 locale 基础，不要求所有长篇文章一开始都三语齐全，但核心 UI 和核心页面必须可用。

### Checklist

- [ ] 建立 EN / FR / ZH UI translation dictionary。
- [ ] 优先完成简体中文 UI、首页和核心页面文案。
- [ ] 对品牌名、产品专名和技术术语采用中文或中文 + 原文双语，并保留原文 alias。
- [ ] 使用 `next-intl` 提供 Server Components 和 Client Components 的翻译访问方式。
- [ ] 为 Header、Footer、按钮、Breadcrumb、筛选、空状态、错误页提供三语言文案。
- [ ] 为核心品牌、产品、Ingredient 和 Guide 添加本地化字段或明确 fallback。
- [ ] 明确缺少翻译时的行为：fallback、隐藏、或显示未翻译状态。
- [ ] 实现 locale 切换并保留当前实体。
- [ ] 添加 locale-aware `title`、description 和 Open Graph metadata。
- [ ] 生成 canonical URL 和合适的 alternate/hreflang 信息。
- [ ] 实现首次访问 Dog / Cat / Both / Skip 选择。
- [ ] 使用 `maple_paws_pet` cookie 保存偏好。
- [ ] 在 Header 提供修改偏好的入口。
- [ ] 确保偏好只影响排序/默认筛选，不隐藏内容。
- [ ] 为中文内容调整合理的 line-height 和段落宽度。

### 完成条件

- [ ] `/en/...`、`/fr/...`、`/zh/...` 都能稳定渲染核心页面。
- [ ] `/zh/...` 的核心用户流程优先达到完整可用，不能出现空白字段或未翻译 key。
- [ ] 切换语言后仍停留在对应的品牌、产品或内容实体。
- [ ] 缺少某篇文章翻译时，不会出现空标题、未翻译 key 或破坏布局。
- [ ] 偏好选择刷新页面后仍然生效。
- [ ] Dog 偏好用户仍可访问 Cat 内容，反之亦然。

## M5 — 搜索与内容发现

### 目标

让用户不依赖首页导航也能找到内容，并验证实体之间的知识连接。

### MVP 搜索范围

先搜索以下字段：

```text
品牌名称
产品名称
Ingredient 名称和 aliases
Nutrition Topic 标题
Guide 标题
```

### Checklist

- [ ] 实现全局 Search Trigger 和 Search 页面/面板。
- [ ] 对静态数据建立简单搜索索引或查询层。
- [ ] 支持基础大小写、空格和重音符号规范化。
- [ ] 支持多语言名称和 aliases。
- [ ] 按实体类型、名称匹配度和 pet preference 做稳定排序。
- [ ] 不因 Dog/Cat 偏好排除其他物种结果。
- [ ] 实现无输入、无结果、结果过多和错误状态。
- [ ] 在 Product、Ingredient、Topic、Guide 页面加入相关内容区。
- [ ] 检查品牌 → 产品、产品 → Ingredient、Guide → 产品的链接闭环。

### 完成条件

- [ ] 可以通过品牌名、产品名、Ingredient alias 找到对应实体。
- [ ] 搜索结果在 EN / FR / ZH 下都有合理的标题和链接。
- [ ] 搜索结果点击后不会丢失 locale。
- [ ] 相关内容不是随机推荐，而是有明确关联字段或人工关系。

## M6 — 品质、SEO 和上线准备

### 目标

把“能浏览的 demo”提升为“可以邀请真实用户试用的 MVP”。

### Checklist：响应式和可访问性

- [ ] 检查 375px、768px、1024px、1440px 等关键宽度。
- [ ] 检查长英文产品名、长法语标签和中文段落。
- [ ] 检查营养表、配料表和筛选器的移动端表现。
- [ ] 所有交互控件支持键盘操作。
- [ ] 所有图像有合适的 alt 或标记为 decorative。
- [ ] 检查 focus 状态、颜色对比度和触控目标尺寸。
- [ ] 检查 reduced-motion 行为。
- [ ] 检查页面 heading 层级和 landmark 结构。

### Checklist：SEO 和元数据

- [ ] 每个核心页面有唯一 title 和 description。
- [ ] 实现 sitemap。
- [ ] 实现 robots 配置。
- [ ] 实现 canonical 和已发布语言的 alternate links。
- [ ] 检查 Open Graph / 分享卡片。
- [ ] 检查 Breadcrumb、Article 等适用的结构化数据。
- [ ] 确认未翻译或不完整页面是否应该被索引。
- [ ] 检查所有内部链接和不存在的 slug。

### Checklist：内容可信度

- [ ] 每个产品页面标出数据来源和最后核验时间。
- [ ] 区分 manufacturer facts、Maple Bowl notes 和 editorial content。
- [ ] 避免未经支持的健康、疾病和“最佳产品”表达。
- [ ] About / Methodology / Privacy 页面内容可读且不是占位文本。
- [ ] 明确产品图片、品牌 logo 和包装图的使用授权或来源。
- [ ] 补充联系/纠错入口，即使暂时只使用普通邮件链接。

### Checklist：工程和发布

- [ ] production build 成功。
- [ ] typecheck、lint、基本页面测试成功。
- [ ] 检查图片尺寸、压缩和 loading 行为。
- [ ] 检查环境变量和部署配置。
- [ ] 配置基础错误监控或至少保留可追踪的错误日志。
- [ ] 确认 404、错误边界和空状态不会泄露开发信息。
- [ ] 在目标部署环境验证 locale 路由、静态资源和 metadata。
- [ ] 做一次从首页到产品页的真实用户走查。

### 完成条件

- [ ] 新用户能独立完成 Definition of Success 中的 8 项核心任务。
- [ ] EN / FR / ZH 核心流程没有阻塞性问题。
- [ ] 移动端没有明显横向溢出或不可操作控件。
- [ ] 生产构建、核心页面、基础 SEO 和无障碍检查通过。

## 3. 推荐执行顺序

建议按照以下顺序推进：

```text
M0 工程初始化
  ↓
M1 品牌壳和导航
  ↓
M2 Home → Brand → Product → Ingredient → Guide
  ↓
M3 目录与静态内容系统
  ↓
M4 三语言与偏好
  ↓
M5 搜索与内容发现
  ↓
M6 上线质量验收
```

其中 M2 是最关键的决策点：如果产品页、Ingredient 页和 Guide 页无法自然连接，应先修正页面结构和静态数据 schema，再继续扩展页面数量。

## 4. 每个 Milestone 的固定交付流程

每个阶段都使用同一套节奏：

1. 明确本阶段不做什么。
2. 先定义数据结构和页面状态。
3. 实现最小可运行版本。
4. 用真实内容验证，不只用 lorem ipsum。
5. 检查 EN / FR / ZH。
6. 检查移动端和键盘操作。
7. 运行 typecheck、lint 和 production build。
8. 记录遗留问题，再进入下一阶段。

## 5. MVP 完成后的合理下一步

MVP 验证通过后，再考虑：

- 将静态数据迁移到数据库或 CMS；
- 建立内容审核、翻译和来源复核流程；
- 扩展产品数量和产品版本模型；
- 升级搜索和筛选；
- 增加收藏、比较和更深层的宠物偏好；
- 增加合作、Affiliate 或其他商业模块。

这些能力应建立在 MVP 已验证的实体关系、页面模板和用户行为之上。
