# hickinsons-blog

Personal site and blog for Phil Hickinson, built with Gatsby and MDX.

The production site is deployed automatically by Cloudflare whenever a pull request is merged into `main`. Do not work directly on `main`.

## Start here

New to the repository? Read these in order:

1. [WORKFLOW.md](WORKFLOW.md) — the complete beginner-safe way to make and publish a change.
2. [WORKFLOW-CHEATSHEET.md](WORKFLOW-CHEATSHEET.md) — the normal commands on one page.
3. [RECOVERY.md](RECOVERY.md) — what to do when Git behaves unexpectedly.

## Requirements

- Windows, macOS or Linux
- Git
- Node version manager such as `fnm`
- Node `20.5.0`, as declared in [.nvmrc](.nvmrc)

The currently verified Windows setup uses Node `20.5.0` and npm `9.8.0`.

## Local setup

Open a terminal in the repository root.

On Windows PowerShell, initialise `fnm` in the current terminal if necessary:

```powershell
$env:Path = "$env:LOCALAPPDATA\fnm;$env:Path"
fnm env --use-on-cd --shell powershell | Out-String | Invoke-Expression
```

Select the repository's Node version and verify it:

```powershell
fnm use 20.5.0
node --version
npm --version
```

Install exactly the dependencies recorded in `package-lock.json`:

```powershell
npm ci
```

Do not use ordinary `npm install` for routine setup. It may rewrite `package-lock.json`.

Start the local Gatsby site:

```powershell
npm run develop
```

Open the local address shown in the terminal, normally `http://localhost:8000`.

## Useful commands

```powershell
npm run develop   # Start the local development site
npm run build     # Create a production build
npm run clean     # Clear Gatsby's generated cache
npm run serve     # Serve an existing production build
```

## Deployment model

- `main` is the production branch.
- Cloudflare deploys `main` to `hickinsons.blog`.
- Cloudflare creates a preview for every pushed non-production branch.
- GitHub Actions checks that each pull request can install and build successfully.
- Production changes are made by squash-merging a reviewed pull request into `main`.

Node and dependency upgrades must be handled as separate maintenance changes. Do not mix them into an unrelated post, fix or design change.
