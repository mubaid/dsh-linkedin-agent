# dsh-linkedin-agent

**Eleven LinkedIn agent skills in DeepSeek Harness — posts off 21 hook
formulas, comments, replies, a 100-point profile score, a weekly plan, and a
humanizer that strips the AI fingerprint before anything goes out. Free, MIT,
no signup.**

**English** | [简体中文](./README.zh-CN.md)

---

## The problem

You want to run a LinkedIn presence with an agent. You write posts,
comment on other people's threads, reply under your own, score your profile,
and plan the week. That is eleven workflows, and doing them well takes
consistent voice and judgement. Doing them sloppily makes you look like a
template.

## The solution

This plugin installs eleven `li-*` skills. They write everything — you post
everything. Nothing reaches LinkedIn without your thumbs-on-keyboard yes.

```bash
dsh plugin add github:mubaid/dsh-linkedin-agent
```

Restart the profile. `/li-post` is ready.

## The wow moment

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

Three hook options, one draft on the strongest, humanized before you see it.

## Why this plugin

**The humanizer is the whole point.** Every post, comment, reply and DM runs
through `/li-human` first — em dashes to commas, the 113-word AI slop lexicon,
zero-width fingerprint characters — and scores on a five-check panel. A
post that passes the panel is readable; a post that fails comes back for
human work, not a second polish.

**No automation theatre.** These skills do not post to LinkedIn, and they
should not: there is no approved API for posting to a personal profile, and
browser automation violates LinkedIn's User Agreement and gets accounts
restricted. Every skill ends with a copy-ready block. You paste. That is the
design, not a bolted-on limit.

**Nothing fabricated.** If a draft needs a number you haven't given, it comes
back with `{{your number}}` and a flag, every time. No invented metrics,
clients or outcomes.

**Voice, actually.** `/li-plan` and the rest read `templates/voice.md` — fill
it in first, or paste three of your own posts and say "write my voice.md from
these". Every skill reads it. Skip it and everything comes out generic.

## Key features

- **/li-post** — one idea into a post. Three hook options from 21 formulas,
  one full draft, humanized before you see it.
- **/li-comment** — comments on other people's posts, nine types picked by
  what the post actually is. Never "Great post!".
- **/li-reply** — the replies under your own post, sorted lead / substance /
  peer / support / noise, written in that order.
- **/li-profile** — 12-part, 100-point rubric, then fix-first rewrites.
- **/li-plan** — the week: what to post, when, and who to engage with.
- **/li-carousel** — slide-by-slide copy for a document post, plus the PDF.
- **/li-repurpose** — one video, newsletter or transcript into a week of
  standalone posts.
- **/li-dm** — the 200-character invite, the first message, and two
  follow-ups. Then stop.
- **/li-inbox** — triage connection requests and DMs; mark the sequences.
- **/li-audit** — post-mortem on what you have already published, ranked by
  engagement rate, not impressions.
- **/li-human** — strips the AI fingerprint and scores it on a five-check
  panel.

## Quick start

```bash
dsh plugin add github:mubaid/dsh-linkedin-agent
dsh --profile <your-profile> agent
/li-post <an idea>
```

Ten minutes on `templates/voice.md` first.

## Real-world examples

**Writing posts that sound like you.** Fill in the voice file with three of
your own posts, and the gap between "drafts I post" and "drafts I rewrite"
widens immediately.

**Engagement rounds.** `/li-plan` builds a 10-person engage list (5 reach, 3
peers, 2 buyers); `/li-comment` does the commenting; `/li-inbox` keeps the
pipeline honest.

**Before you post, prove it's human.** `/li-human` on the final draft:
`BURSTINESS`, `SPECIFICITY`, `SLOP DENSITY`, `FINGERPRINT`, `VOICE` — the
verdict weights the mean at 60% and the weakest check at 40%.

## Technical details

The skills are registered through `dsh-skill-filesystem` under provider name
`linkedin-agent`, scanning the `skills/` directory next to `lib/`. Each skill is a `SKILL.md`
reproduced byte-for-byte from upstream.

## Comparison

| | Claude Code install | Proxy / aggregator | This plugin |
|---|---|---|---|
| Harness | Claude Code only | Any | DeepSeek Harness |
| Install surface | `~/.claude/skills/` | Any | `dsh plugin add` |
| Humanizer built in | Yes | Depends | Yes (local, runs on your machine) |
| Posts to LinkedIn | No | Depends | No |
| Upfront cost | Clone + copy | Key + route | Zero config |

## What to do first

1. Fill in `templates/voice.md` — three of your own posts, or a description of
   your style. It is the single biggest factor in whether the output sounds
   like you.
2. Read `UPSTREAM.md` for the full file-by-file mapping to the upstream
   `Jakeschincariol/linkedin-agent-skill`.
3. See [VERIFICATION.md](./VERIFICATION.md) for what has been verified against
   DeepSeek Harness `0.2.0-rc.2` and what is still pending.

## License

MIT. See [LICENSE](LICENSE) and [NOTICE](NOTICE). Port of
[Jakeschincariol/linkedin-agent-skill](https://github.com/Jakeschincariol/linkedin-agent-skill).
