## Why

The current admin system already covers the main management modules, but several existing pages still lack complete operational workflows. This change is needed to strengthen the current management experience without changing the existing navigation style or introducing unnecessary new features.

## What Changes

- Keep the current admin design and menu structure without adding a workbench or redesigning the information architecture.
- Refine existing content management capabilities so post review and comment handling are more complete and practical.
- Refine existing knowledge base management capabilities so current pages better support document and knowledge-base administration.
- Refine existing AI record and notification management capabilities only where needed to complete current management workflows.
- Limit the scope to existing management functions and avoid introducing unrelated new product features.

## Capabilities

### New Capabilities
- `content-management-refinement`: Improve the completeness of existing post and comment management workflows within the current admin design.
- `knowledge-management-refinement`: Improve the completeness of existing knowledge base and document management workflows within the current admin design.
- `admin-operations-refinement`: Improve the completeness of existing AI record and notification management workflows within the current admin design.

### Modified Capabilities
- None.

## Impact

- Affected frontend management pages under `src/pages/Admin`.
- Affected service usage across existing modules in `src/services/post`, `src/services/ai`, and `src/services/notification`.
- No new admin entry point, no workbench page, and no backend API redesign are required by this change.
