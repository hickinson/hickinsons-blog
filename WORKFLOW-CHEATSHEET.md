# Git workflow cheat sheet

Use this page for normal work. Read [WORKFLOW.md](WORKFLOW.md) for explanations and [RECOVERY.md](RECOVERY.md) when something unexpected happens.

## 1. Start safely

```powershell
git switch main
git pull --ff-only
git status --short --branch
```

Expected clean result:

```text
## main...origin/main
```

Create one branch for one change:

```powershell
git switch -c post-short-description
```

Common prefixes:

```text
post-   Writing or publishing
fix-    A correction
chore-  Maintenance or configuration
```

## 2. Review and test

```powershell
git status
git diff
npm run build
```

Stop if:

- the build fails;
- an unexpected file appears;
- `package-lock.json` changes unexpectedly.

## 3. Stage only the intended files

```powershell
git add path/to/file
git diff --cached
git status
```

Remove an accidentally staged file:

```powershell
git restore --staged path/to/file
```

## 4. Commit and push

```powershell
git commit -m "Add short description"
git push -u origin HEAD
```

## 5. Review on GitHub

Before merging:

- review **Files changed**;
- wait for `Gatsby Check PR / build` to pass;
- open and inspect the Cloudflare branch preview;
- confirm there are no unrelated changes;
- use **Squash and merge**.

Merging into `main` deploys production.

## 6. Clean up after merge

Only after GitHub shows the pull request as merged:

```powershell
git switch main
git pull --ff-only
git fetch --prune
git branch -D post-short-description
```

Replace the example branch name with the branch you used.

## Never use as a routine shortcut

```text
git push --force
git reset --hard
git clean -fd
npm audit fix
npm audit fix --force
deleting package-lock.json
```
