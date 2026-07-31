# Git recovery guide

Use this guide when the normal workflow stops making sense.

## First response to anything unexpected

> Stop. Do not commit, push, reset or delete anything yet.

Run:

```powershell
git status --short --branch
git status
```

Read the output before taking another action. Keep the terminal open and preserve any error message.

## I edited `main` but have not committed

Your changes can be moved safely onto a new branch.

Create the branch immediately:

```powershell
git switch -c fix-short-description
```

The uncommitted changes move with you. Confirm:

```powershell
git status --short --branch
```

Continue only when the first line shows the new branch rather than `main`.

## I committed on `main` but have not pushed

Do not push `main`.

First confirm that the working tree is clean:

```powershell
git status
```

Create a working branch at the current commit so the work is preserved:

```powershell
git switch -c fix-short-description
```

While staying on that new branch, restore the local `main` pointer to the remote production branch:

```powershell
git branch --force main origin/main
```

Confirm the current branch and recent history:

```powershell
git status --short --branch
git log --oneline --decorate -5
```

Your commits should remain on the working branch. `main` should point to the same commit as `origin/main`.

Stop and get help if the working tree was not clean or the log does not look as expected.

## `git pull --ff-only` refused

This is a safety feature. Do not replace it with ordinary `git pull`.

Run:

```powershell
git status
git log --left-right --oneline main...origin/main
```

Do not merge, rebase or force-push. Preserve the output and identify whether local commits, remote commits or uncommitted files are blocking the update.

When uncertain, create a safety pointer before any repair:

```powershell
git branch rescue-before-pull
```

Then stop and review the history rather than guessing.

## Git reports a conflict

Do not choose files at random or accept every incoming change.

Run:

```powershell
git status
```

Git will normally say which operation is in progress.

To return to the state before an accidental merge:

```powershell
git merge --abort
```

To return to the state before an accidental rebase:

```powershell
git rebase --abort
```

To return to the state before an accidental cherry-pick:

```powershell
git cherry-pick --abort
```

Use only the command matching the operation named by `git status`.

After aborting, run:

```powershell
git status --short --branch
```

## `package-lock.json` changed unexpectedly

Do not stage or commit it.

Inspect the change:

```powershell
git diff -- package-lock.json
git status
```

If no dependency change was intended and `package.json` is unchanged, discard only the accidental lockfile edit:

```powershell
git restore --staged package-lock.json
git restore package-lock.json
```

The first command is harmless when the file was not staged. Confirm:

```powershell
git status
```

Stop rather than restoring the lockfile when `package.json` was deliberately changed. Dependency work needs its own branch and validation.

Never try to repair this by deleting `package-lock.json`, running `npm audit fix` or regenerating everything casually.

## The Gatsby build fails

Do not commit or merge a failing build.

Look for the first actual error rather than the final summary. If the error appears to involve stale Gatsby-generated files, try:

```powershell
npm run clean
npm run build
```

If the build still fails, preserve the output and investigate the first error. Do not change dependencies as a speculative fix.

## The Cloudflare preview is wrong

Do not merge.

Check:

```powershell
git status
git log --oneline --decorate -5
```

Confirm that the intended commit was pushed:

```powershell
git push
```

Wait for the new preview deployment and review it again. A successful build does not prove that the content or layout is correct.

## I staged the wrong file

Remove it from the staged set without deleting the file:

```powershell
git restore --staged path/to/file
```

Then review again:

```powershell
git diff --cached
git status
```

## I am being told to force-push

Stop.

The normal workflow for this repository does not require force-pushing. Do not run:

```text
git push --force
git push --force-with-lease
```

Preserve the branch and review why Git believes the histories differ.

## Safe information to collect when asking for help

These commands do not change the repository:

```powershell
git status --short --branch
git branch -vv
git remote -v
git log --graph --decorate --oneline --all --max-count=20
git diff
git diff --cached
```

Use `git --no-pager` before a command when you want the output to remain directly in the terminal.
