# Official MCP integration verification

Verified on 2026-11-03 with the installed shadcn CLI 4.23.0. No Rillmark MCP server or additional client dependency was introduced.

Run `node scripts/test-mcp.mjs` from the repository. The test builds the registry, serves its public files on a free loopback port, creates a temporary consumer `components.json`, and launches the official `shadcn mcp` executable in that consumer directory. A small read-only stdio test client exercises the existing server and shuts down both processes afterward.

The integration passed:

| Check | Observed result |
| --- | --- |
| Initialize | Server identified itself as `shadcn` version `1.0.0`; negotiated protocol `2025-06-18`. |
| List tools | Seven official tools were exposed. |
| Get project registries | Both the built-in `@shadcn` and configured `@rillmark` namespace were returned. |
| Search `combobox` | Found `combobox` and `combobox-demo`, with the correct `npx shadcn@latest add @rillmark/...` commands. |
| View `@rillmark/combobox` | Returned the exact component name, description, `registry:ui` type, one-file count, and Radix dependency. |
| Get `combobox-demo` example | Returned the complete compiling React example, including imports, state, and the labeled Project lead field. |

The seven tools were `get_project_registries`, `list_items_in_registries`, `search_items_in_registries`, `view_items_in_registries`, `get_item_examples_from_registries`, `get_add_command_for_items`, and `get_audit_checklist`. Discovery, search, view, and example retrieval were called; no install or user configuration mutation was performed through MCP.

Each run retains `verification.json` and readable `responses.json` in its printed temporary fixture directory. These are local test artifacts, not application runtime files.

## Current upstream behavior

In shadcn 4.23.0, `view_items_in_registries` returns metadata rather than file contents, despite describing file contents in its tool help. The example retrieval tool does return full example source. For complete component source, read the registry item's JSON, the focused component documentation's source link, or use the official CLI's `view` command. Rillmark follows the existing tool behavior and does not add competing infrastructure.

This test verifies protocol interoperability with a local registry. It does not configure or launch an individual user's Codex or Claude session, and it does not test an externally deployed registry host. See the [AI setup guide](../public/docs/ai.md) for client configuration.
