# Publishing Rillmark

The private Git source is [BereketAbera/rillmark](https://github.com/BereketAbera/rillmark). The public documentation are [rillmark.vercel.app](https://rillmark.vercel.app). GitHub pushes and Vercel deployments are separate; the Vercel project disables Git-triggered deployment.

## npm package

`packages/rillmark/` is the publishable package; the repository root remains private. Its JavaScript, declarations, CSS and tokens are generated from the canonical package source and `tokens.json`. React and React DOM are peers. Vite, documentation code and test tooling are not runtime dependencies.

1. Update the package version deliberately in `packages/rillmark/package.json`.
2. Run `npm run check`, `npm run build` and `npm run test:package` with headed Chrome available. CI uses headed Chromium under Xvfb.
3. Inspect `evidence/npm-package/report.json`. It records the packed files, size, integrity and the exact tested tarball path. Review the allowlisted package contents before publication.
4. Verify the intended publisher with `npm whoami`, then publish that exact tested tarball: `npm publish /absolute/path/to/rillmark-VERSION.tgz --access public --registry=https://registry.npmjs.org`. Complete any npm authentication challenge in your own browser.
5. Verify the published version and integrity with `npm view rillmark@VERSION version dist.integrity --json`, and install that version in a fresh consumer.

The package offers precompiled `rillmark/styles.css` without a Tailwind requirement, or `rillmark/tailwind.css` for an existing Tailwind CSS 4 build. Never import both. The package README is included in the tarball.

## Documentation

Run `vercel deploy --prod --scope bereketaberas-projects` from the linked checkout. A new checkout first runs `vercel link --yes --project rillmark --scope bereketaberas-projects`. The local `.vercel/` metadata is ignored by Git. No environment secrets are required for this static site.

After deployment, verify the public endpoints and the actual distribution path:

```sh
RILLMARK_SITE_URL=https://rillmark.vercel.app npm run test:e2e
```

The browser suite always runs headed. The documentation examples and npm package must use the same canonical component revision. Public source links and generated API metadata are also checked by the local validation step.
