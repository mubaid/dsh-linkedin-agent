# UPSTREAM mapping — Jakeschincariol/linkedin-agent-skill → dsh-linkedin-agent

Every upstream artefact below is reproduced byte-for-byte. The mapping table
below, this header, and the LICENSE copyright line (see LICENSE) are the only
differences from the upstream tree.

| Upstream path                     | DSH path                      | status    | sha256 |
|-----------------------------------|-------------------------------|-----------|--------|
| skills/li-audit/SKILL.md          | skills/li-audit/SKILL.md      | verbatim  | bdb5b12c699ca5d512b785f7168f8e494e020a1ff1195aaa9a58cd5b193c1bf2 |
| skills/li-carousel/SKILL.md       | skills/li-carousel/SKILL.md   | verbatim  | fa1a8801e661ed83e55eb5c44e0810a773b490eac930bd3200d783d4bbd23094 |
| skills/li-comment/SKILL.md        | skills/li-comment/SKILL.md    | verbatim  | 05bfb1fb28976d6ee5d50b31ec7c8d7fc13fba9db71257dc1dad2a0ffd21e071 |
| skills/li-dm/SKILL.md             | skills/li-dm/SKILL.md         | verbatim  | 14b0ee4cffedc2d3eb1d9f8dd6d6cce7bc04c95e221ea1e68809fb5aad525747 |
| skills/li-human/SKILL.md          | skills/li-human/SKILL.md      | verbatim  | 2ebda9ff1b63f0d567cd8e30b6fc1465e05c46e166809ea0569cba3591d73d90 |
| skills/li-human/detect.py         | skills/li-human/detect.py     | verbatim  | d8cf740741968f25ce49ec6cc65538f53e97f28f6f2ce21b7f21864475fe2075 |
| skills/li-human/humanize.py       | skills/li-human/humanize.py   | verbatim  | 8627c813e461459604c5019d28052fbde11a544af86a1c4652b1aff3b38d8757 |
| skills/li-human/slop.json         | skills/li-human/slop.json     | verbatim  | 2d227835a80ca20259c8d255501cb752cdc4232468c12bb9223fccf5acc724bb |
| skills/li-inbox/SKILL.md          | skills/li-inbox/SKILL.md      | verbatim  | 816c1088fdac6a58295b9868267031b210eb57fd325bf837226fb764bce94c77 |
| skills/li-plan/SKILL.md           | skills/li-plan/SKILL.md       | verbatim  | 5799665246d1c47ab6b37840bd4f4f94700f24ff54ae4d3a1fbaf49b1cd71f9b |
| skills/li-post/SKILL.md           | skills/li-post/SKILL.md       | verbatim  | acfc8eadc47fee812f2dbaf8c97a93c313661d46963291bcbf8f154b065abee0 |
| skills/li-post/hooks.json         | skills/li-post/hooks.json     | verbatim  | 08988c9afae234199f51323c42baf2507101a4be2ba832384cf20f940972d712 |
| skills/li-profile/SKILL.md        | skills/li-profile/SKILL.md    | verbatim  | 4f0ebdcf8a3ef035d70aae89838ff916fc8a33a4a12b333e58bb2bc41727d11e |
| skills/li-profile/rubric.json     | skills/li-profile/rubric.json | verbatim  | d1add490dad3cc32aab4826c3d5a40bd1552d26a92424deaad9ee2e3c7c05d14 |
| skills/li-reply/SKILL.md          | skills/li-reply/SKILL.md      | verbatim  | 26f95e55f384ca2ec1b692d3f95d08d33796fea404db8740387aca15b1248751 |
| skills/li-repurpose/SKILL.md      | skills/li-repurpose/SKILL.md  | verbatim  | 9524d3958f153d8be3d679a372c8cb5065e30653ed2a7bf4596e921b2baa39df |
| templates/voice.md                | templates/voice.md            | verbatim  | b12d87d932e4e3ab1dcd957c65fd973368a576839ce3f6974ad4f1e8d319bcc2 |

Dropped (upstream-only files, not needed by DSH):

| Upstream path          | DSH path | status |
|------------------------|----------|--------|
| .claude-plugin/        | —        | dropped: Claude-only marketplace/plugin manifests; DSH uses the package bundle and the `ctx.skills` provider, not these files. |
| README.md              | README.md| dropped: replaced by this port's README.md / README.zh-CN.md. |
| LICENSE                | LICENSE  | see NOTICE: the MIT grant text is byte-identical; one added port-author copyright line per PORTING-RULES.md §8. |
| .gitignore             | .gitignore| dropped: replaced by this port's .gitignore. |

Port-authored additions (not in this table): `package.json`, `lib/`, `test/`,
`README.md`, `README.zh-CN.md`, `VERIFICATION.md`, `NOTICE`, `UPSTREAM.md`,
`cordis.patch.yml`, and the `docs/` directory. These are the only additions to
the upstream tree beyond the git repository structure itself.

Every file in `skills/` and `templates/` can be re-verified with:

```bash
for f in $(find skills templates -type f); do
  cmp "$f" <(curl -sL "https://raw.githubusercontent.com/Jakeschincariol/linkedin-agent-skill/main/$f") \
    || echo "DRIFT: $f"
done
```
