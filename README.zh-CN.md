# dsh-linkedin-agent

**用 DeepSeek Harness 管理领英形象：十一项 Agent 技能——按 21 种钩子公式生成帖文、
评论、回复、100 分的资料评分、一周规划，并在发出前用「去 AI 化」工具抹掉机器痕迹。
免费、MIT 协议、无需注册。**

[English](./README.md) | **简体中文**

---

## 问题所在

你想让 Agent 替你打理领英形象：发帖、评论他人的动态、回复自己的帖文、
给资料评分、规划一周。这是 11 个工作流；做好它们需要一贯的语调和判断力，
敷衍了事的产出只会让你看起来像套模板。

## 解决方案

本插件安装 11 个 `li-*` 技能。它们负责起草一切——你发出一切。
没有任何内容会未经你的手动确认就发出。

```bash
dsh plugin add github:mubaid/dsh-linkedin-agent
```

重启 profile。`/li-post` 即可使用。

## 立竿见影的时刻

```
/li-post I shipped a proposal template that cut prep time in half
```

```
HOOKS
1. #17 Time Anchor   Writing a proposal used to take me half a day. It now takes 20 minutes.
2. #12 Comparison    A freelance consultant vs a weekend and a template. The weekend won.
3. #3  Mistake       For two years I charged for hours I spent fixing my own messy process.

Post #17. It is a ratio, and the number is yours.
```

三个钩子选项，一个最强草稿，发出前已做去 AI 化处理。

## 为什么是这个插件

**去 AI 化是核心。** 每篇帖文、评论、回复和私信都先过 `/li-human`——把破折号换成逗号、删掉 113 词的 AI 套话词典、清除零宽指纹字符，再经五项检查评分。通过的项目可读；不通过的会被退回给人工修改，而不是二次润色。

**不搞自动化表演。** 这些技能不会向领英发帖——它们不该发：个人资料没有批准的 API，浏览器自动化违反领英用户协议并会导致账号被封。每项技能都以可复制的代码块结尾。你粘贴。这是设计，不是补救性的限制。

**不编造内容。** 如果草稿需要你提供某个数字而你还没给，它会带着 `{{your number}}` 占位符和提示返回——每次如此。不编造指标、客户或成果。

**真实的个人风格。** `/li-plan` 等技能都读 `templates/voice.md`——先填好它，或者贴三篇你自己的帖文，说 "write my voice.md from these"。所有技能都会读取它。跳过它，一切产出都会很泛。

## 主要功能

- **/li-post**——一个想法生成一篇帖文。21 种公式中的三个钩子选项、一篇完整草稿、发出前已去 AI 化。
- **/li-comment**——评论他人的帖文，九种类型由帖文内容决定。拒绝 "Great post!" 式的万金油。
- **/li-reply**——你自己帖文下的回复，按 lead / substance / peer / support / noise 的顺序撰写。
- **/li-profile**——12 部分、100 分 Rubric，然后给出修复优先级的改写。
- **/li-plan**——周计划：发什么、何时发、与谁互动。
- **/li-carousel**——图文帖的逐页文案，以及 PDF。
- **/li-repurpose**——一支视频、一篇通讯或一份文稿，转化为一周独立的帖文。
- **/li-dm**——200 字符邀请语、首条消息、两条跟进。然后停止。
- **/li-inbox**——筛选好友申请和 DM、标记跟进序列。
- **/li-audit**——对已发布内容的复盘，按互动率（而非曝光量）排序。
- **/li-human**——抹掉 AI 指纹，按五项检查评分。

## 快速开始

```bash
dsh plugin add github:mubaid/dsh-linkedin-agent
dsh --profile <your-profile> agent
/li-post <an idea>
```

先花十分钟填写 `templates/voice.md`。

## 真实场景

**写出像你本人的帖文。** 用三篇自己的帖文填满 voice 文件，"drafts I post" 和 "drafts I rewrite" 之间的差距会立刻拉大。

**互动轮次。** `/li-plan` 建一份 10 人互动名单（5 个触达、3 个同行、2 个买家）；`/li-comment` 负责评论；`/li-inbox` 让漏斗保持真实。

**发帖前证明它是人写的。** `/li-human` 审校最终草稿：
`BURSTINESS`、`SPECIFICITY`、`SLOP DENSITY`、`FINGERPRINT`、`VOICE`——判定取均值 60% 与最弱项 40% 的加权。

## 技术细节

技能通过 `dsh-skill-filesystem` 以提供者名称 `linkedin-agent` 注册，扫描 `lib/` 旁的 `skills/` 目录。每项技能都是与上游逐字节复现的 `SKILL.md`。

## 对比

| | Claude Code 安装 | 代理 / 聚合器 | 本插件 |
|---|---|---|---|
| Harness | Claude Code only | Any | DeepSeek Harness |
| Install surface | `~/.claude/skills/` | Any | `dsh plugin add` |
| Humanizer built in | Yes | Depends | Yes (local, runs on your machine) |
| Posts to LinkedIn | No | Depends | No |
| Upfront cost | Clone + copy | Key + route | Zero config |

## 第一步做什么

1. 填写 `templates/voice.md`——三篇你自己的帖文，或一段风格描述。这是产出像不像你的最大影响因素。
2. 阅读 [UPSTREAM.md](./UPSTREAM.md) 获取与上游 `Jakeschincariol/linkedin-agent-skill` 的完整逐文件映射。
3. 查看 [VERIFICATION.md](./VERIFICATION.md)，了解已针对 DeepSeek Harness `0.2.0-rc.2` 验证的项目和待办项。

## 许可

MIT。参见 [LICENSE](LICENSE) 和 [NOTICE](NOTICE)。
Port of [Jakeschincariol/linkedin-agent-skill](https://github.com/Jakeschincariol/linkedin-agent-skill)。
