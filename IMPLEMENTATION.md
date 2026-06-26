# Implementation checklist

- [x] Initialize Git and inspect workspace guidance.
- [x] Lightweight name check: Rillmark, no matching UI library found (2026-11-03; not trademark clearance).
- [x] Research reference systems and explore three small same-screen directions.
- [x] Select Fieldnotes; implement canonical tokens, light/dark themes and Radix primitives.
- [x] Implement all 31 requested components plus EmptyState and the practical patterns.
- [x] Build searchable documentation and three complete working example screens.
- [x] Generate focused API/docs/examples and an installable npm-consuming agent skill.
- [x] Use independent npm distribution and remove obsolete installer tooling.
- [x] Package independent JavaScript, declarations, styles, tokens and editable TypeScript source.
- [x] Complete packed-package verification, including project-scoped Codex/Claude skill installation.
- [ ] Complete final headed browser verification against the deployed npm-only documentation.
- [ ] Publish the exact tested package to npm.
- [ ] Redeploy the npm-only documentation on Vercel and verify the public release.
- [ ] Commit completed work in coherent chunks and push to BereketAbera/rillmark.

## Checkpoint

The original 32 components and all three applications are complete. Rillmark is now an independent npm design system; reference systems inform research only. Canonical code moved to packages/rillmark/src, demos to examples/components, and consumer docs use direct npm imports. npm is authenticated as bekab; publication awaits the account's required two-factor authentication; gh is authenticated as BereketAbera. The private BereketAbera/rillmark repository is created and linked. Never push to bekabt; the user deleted that earlier remote. The npm-only site is deployed on Vercel with the bundled skill instructions. Local checks pass 21 unit tests and both packed-package browser modes. The final deployed 17-test browser suite remains to run; the package artifact includes the verified consuming skill.

## Scope

React 19, TypeScript, original tokens and components, Radix primitives, precompiled CSS with optional Tailwind CSS 4 integration. Standard npm publication, focused AI documentation and an installable consuming skill. No custom CLI, MCP server or configuration framework.
