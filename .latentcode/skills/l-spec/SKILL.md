---
name: l-spec
description: Coordinate L-Spec for substantial feature, fix, refactor, or product-planning work. Use when the user mentions L-Spec or asks to plan or implement a meaningful project change. It safely offers initialization when needed and routes an initialized project to explore, propose, apply, update, sync, or archive. Do not use for explanations, reviews, or trivial edits.
license: MIT
compatibility: Requires Latentcode's native l_spec workflow tool.
metadata:
  author: latentcode
  version: "1.0"
  generatedBy: "latentcode"
---

# L-Spec coordinator

Use L-Spec as a state-aware workflow, not as a collection of competing skills. Explicit `/l-spec-*` commands are user overrides; otherwise route from the request and current project state.

## Mode boundary

Plan and Ultra-Plan modes are read-only. In those modes you may inspect or explain L-Spec state, but never initialize L-Spec, create or update artifacts, edit project code, sync specs, or archive a change. Tell the user to switch to Build or Auto mode before a write is needed.

## First check

Call the native `l_spec` tool with `["onboarding", "status", "--json"]` before choosing a workflow. Every L-Spec engine operation must use `l_spec`; never launch Latentcode recursively through the shell tool. Convert documented commands by passing only the tokens after `l-spec` as the tool's `arguments` array.

If the project is not initialized:

- If `automaticInitialization` is `always`, call `l_spec` with `["init", ".", "--no-animation"]` and continue.
- Otherwise ask one question with the question tool: "Use L-Spec workflow for this project?" Offer exactly these choices:
  - `Enable` — initialize this project and continue with L-Spec.
  - `Not now` — continue the current request normally and do not ask again during this request.
  - `Always` — initialize this project, and automatically initialize future projects when this skill matches.
- For `Enable`, call `l_spec` with `["init", ".", "--no-animation"]`.
- For `Always`, first call `l_spec` with `["onboarding", "preference", "always"]`, then initialize.
- If the question tool is unavailable, ask the same short question in chat and wait. Never initialize from silence or an ambiguous response.

After initialization, or when already initialized:

1. Call `l_spec` with `["list", "--json"]` and inspect relevant active changes with `["status", "--change", "<name>", "--json"]`.
2. Select exactly one workflow:
   - **Explore** for uncertain scope, investigation, comparison, or read-only thinking. Do not write artifacts or code.
   - **Propose** for a new substantial change with no matching ready change. Produce planning artifacts only and stop. Even when the initial request says "build" or "fix", do not implement in the same response.
   - **Apply** only when the user is now asking to implement and the matching change is ready according to L-Spec status.
   - **Update** only when the user asks to revise an existing change's planning artifacts.
   - **Sync** only when the user asks to merge delta specifications without archiving.
   - **Archive** only after implementation tasks are complete, strict validation passes, and the user explicitly confirms archival.
3. Read the selected detailed workflow from `.latentcode/commands/l-spec-<workflow>.md`, substitute the user's request for `$ARGUMENTS`, and follow it. Do not load a second L-Spec skill.

## Invariants

- Never apply an incomplete or ambiguous change. Ask the user to select a change when multiple changes plausibly match.
- Never turn an initial proposal into implementation in the same response.
- Never bypass a failed L-Spec command by editing artifacts or project code directly.
- Treat a nonzero `exitCode` from `l_spec` as a failed command even when it returns diagnostic output.
- Keep engine instructions private; the visible chat should show only what the user typed and concise progress.
- Open the browser workbench only when the user runs or asks for the view workflow.
