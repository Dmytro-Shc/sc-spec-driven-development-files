---
name: changelog
description: Update CHANGELOG.md from git history before merging
---

# Changelog Skill

Update `CHANGELOG.md` with entries derived from the git history since the last recorded date.

## When to invoke

The user will invoke this manually before merging a branch. Example: `/changelog`

## Procedure

1. Read `CHANGELOG.md` to find the most recent date heading (e.g. `## 2026-07-18`).
2. Run `git log --format="%H %ad %s" --date=short --since="<that-date>"` to get all commits since that date.
3. For each commit that is not already covered, run `git show --stat --format="" <hash>` to see which files changed.
4. Group commits by date. For each date, write a bullet list of **meaningful changes** — skip noise commits (merge commits, "asd"-style messages where the diff is empty or trivial). Use the file stats to infer what actually changed when the commit message is unhelpful.
5. Prepend the new entries to the changelog body (after the `# Changelog` heading), keeping the existing entries below.
6. If today's date already has a heading, add new bullets under it rather than creating a duplicate heading.

## Guidelines

- Write in the same style as existing entries: past tense, concise, grouped by feature/area.
- Skip commits with no meaningful changes (empty commits, whitespace-only, etc.).
- If a commit message is gibberish but the diff is meaningful, write a proper entry based on the files changed.
- Merge commits that don't bring in new changes can be skipped.
- Don't include entries about the changelog updating itself.