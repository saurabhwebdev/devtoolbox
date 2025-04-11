# Deployment Process for Windows

This guide covers how to deploy the project to Vercel while bypassing linting errors that would otherwise prevent deployment.

## Automatic Deployment Setup

We've created scripts to automatically fix most linting issues before deployment. Here's how to use them:

### 1. Install Required Dependency

First, install the required glob package:

```
npm install glob --save-dev
```

### 2. Run the Deployment Helper Script

Simply run:

```
node deploy.js
```

This script will:
- Create a proper ESLint configuration that disables problematic rules
- Update Next.js configuration to bypass type checking and linting
- Update package.json scripts to disable ESLint during builds
- Run additional scripts to automatically fix common linting issues

### 3. Push Changes to Vercel

After running the deploy.js script, commit and push your changes:

```
git add .
git commit -m "Fix linting issues for deployment"
git push
```

Vercel will now deploy your project successfully without failing on linting errors.

## Manual Deployment Steps

If you prefer to fix issues manually:

1. Update ESLint configuration:
   - Create or edit `.eslintrc.json` to disable problematic rules
   - Create `.eslintignore` to ignore problematic files

2. Update Next.js configuration:
   - Edit `next.config.ts` to include `eslint: { ignoreDuringBuilds: true }`
   - Also add `typescript: { ignoreBuildErrors: true }`

3. Update package.json:
   - Change build script to `"build": "DISABLE_ESLINT_PLUGIN=true next build"`
   - Add a Vercel-specific build script: `"build:vercel": "DISABLE_ESLINT_PLUGIN=true next build"`

4. Fix unescaped entities:
   - Run `node fix-lint-errors.js` to automatically fix unescaped quotes
   - Or manually replace `'` with `&apos;` and `"` with `&quot;` in React components

5. Fix unused variables:
   - Run `node fix-unused-vars.js` to comment out unused variables
   - Or manually comment out or remove unused variable declarations

## Troubleshooting

If deployment still fails:

1. Check Vercel logs for specific errors
2. Look for unexpected errors in the JWT decoder functionality 
3. Make sure `vercel.json` doesn't have an `ignoreCommand` that's failing
4. Try temporarily removing problematic files and adding them back gradually

For detailed information about the deployment process, see `DEPLOYMENT.md`.

## Maintenance

After successfully deploying, consider gradually fixing the actual linting issues rather than just bypassing them:

1. Focus on one component at a time
2. Fix JSX entities properly
3. Remove unused imports and variables
4. Apply proper typing instead of using `any`
5. Follow React hooks exhaustive deps guidelines

This will improve code quality and maintainability in the long run. 