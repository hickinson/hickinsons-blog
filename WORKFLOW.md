# Safe Git and GitHub workflow

This is the normal way to change and publish `hickinsons.blog`.

## The one rule

> Start from `main`, work on a short-lived branch, review the preview, then squash-merge a pull request.

`main` is production. Merging into `main` triggers the live Cloudflare deployment.

## What the main terms mean

- **Repository** — the project and its history.
- **`main`** — the production branch. It should always be safe to deploy.
- **Working branch** — a temporary place for one change.
- **Commit** — a saved checkpoint on a branch.
- **Push** — send local commits to GitHub.
- **Pull request** — the review checkpoint before production.
- **Cloudflare preview** — a temporary version of the site built from the working branch.
- **Squash merge** — turn the pull request into one clear commit on `main`.

## Branch names

Use a short, plain-English name:

```text
post-ai-and-access
fix-reading-navigation
chore-update-build-workflow
```

Use:

- `post-` for writing and publishing;
- `fix-` for corrections;
- `chore-` for maintenance and configuration.

One branch should contain one coherent change.

## Before starting any work

Open a terminal in the repository root.

Check where you are and whether anything is already changed:

```powershell
git status --short --branch
```

A clean starting point on production looks like:

```text
## main...origin/main
```

If extra files or changes appear and you do not recognise them, stop and read [RECOVERY.md](RECOVERY.md).

Update local `main` safely:

```powershell
git switch main
git pull --ff-only
git status --short --branch
```

`--ff-only` prevents Git from creating an unexpected merge commit during a pull.

Create the working branch:

```powershell
git switch -c post-short-description
```

Replace `post-short-description` with the real branch name.

Confirm that the branch changed:

```powershell
git status --short --branch
```

## Make the change

Edit only the files needed for this piece of work.

Check the working tree regularly:

```powershell
git status
git diff
```

Do not ignore an unexpected change to `package-lock.json`. Stop and investigate it before continuing.

## Test before committing

For ordinary content or code changes, run:

```powershell
npm run build
```

The command must finish successfully. Warnings may still need review, but an error means the change is not ready.

For layout or content changes, also run the local site and inspect it in the browser:

```powershell
npm run develop
```

## Stage only the intended files

Add files by name rather than adding everything blindly:

```powershell
git add path/to/file
```

Repeat for each intended file, then review exactly what will be committed:

```powershell
git diff --cached
git status
```

If an unrelated file appears, remove it from the staged set:

```powershell
git restore --staged path/to/file
```

## Commit the change

Use a short command-style message:

```powershell
git commit -m "Add article about AI access"
```

Good commit messages include:

```text
Add article about AI access
Fix reading navigation dates
Document safe Git workflow
```

## Push the branch

Push the current branch and set its upstream:

```powershell
git push -u origin HEAD
```

This does not change production. It creates or updates the branch on GitHub and triggers a Cloudflare preview.

## Open and review the pull request

On GitHub:

1. Open a pull request from the working branch into `main`.
2. Complete the pull-request checklist.
3. Review the **Files changed** tab.
4. Wait for `Gatsby Check PR / build` to pass.
5. Open the Cloudflare branch preview and inspect the change.
6. Confirm that no unrelated files are included.
7. Confirm that any `package-lock.json` change is deliberate and explained.

Do not merge while a required check is failing or the preview is wrong.

## Publish using squash merge

Use **Squash and merge** on GitHub.

The merge into `main` triggers the production Cloudflare deployment.

After GitHub shows the pull request as merged, verify the live deployment before treating the work as complete.

## Clean up locally

Return to production and update it:

```powershell
git switch main
git pull --ff-only
git fetch --prune
```

Confirm the pull request is merged and your work is present on `main`.

Then delete the local working branch:

```powershell
git branch -D post-short-description
```

Use `-D` here only after the pull request has been successfully squash-merged. Squash merging creates a new commit on `main`, so Git may not recognise the original branch commits as merged.

GitHub automatically deletes the remote working branch after merge.

## Stop rather than improvise

Stop and use [RECOVERY.md](RECOVERY.md) when:

- you accidentally work directly on `main`;
- `git pull --ff-only` refuses;
- Git reports a conflict;
- the build fails;
- the preview is wrong;
- `package-lock.json` changes unexpectedly;
- Git suggests force-pushing;
- `git status` lists files you do not understand.

Do not use these as routine fixes:

```text
git push --force
git reset --hard
git clean -fd
npm audit fix
npm audit fix --force
deleting package-lock.json
```

## The complete route

```text
Update main
→ create a branch
→ make one small change
→ review the diff
→ build locally
→ commit selected files
→ push the branch
→ review the GitHub check
→ review the Cloudflare preview
→ squash merge
→ verify production
→ update local main
→ delete the local branch
```
