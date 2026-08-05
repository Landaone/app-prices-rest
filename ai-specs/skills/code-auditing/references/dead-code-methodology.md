# Dead Code Detection Methodology

This document provides guidance on detecting and removing dead code using automated tools and manual verification.

## Overview

Dead code is code that exists in the codebase but is never executed. It increases maintenance burden, bundle size, and cognitive load. This methodology uses specialized tools combined with agent verification to filter false positives.

## Types of Dead Code

### 1. Unused Imports
Import statements for modules/symbols that are never used:
```javascript
import { unused } from './utils';  // Never referenced
```

### 2. Unused Exports
Functions, classes, variables exported but never imported elsewhere:
```javascript
export function formatDate() { ... }  // Not imported anywhere
```

### 3. Unused Variables
Variables declared but never read:
```python
result = compute()  # Never used after assignment
```

### 4. Unused Functions/Methods
Functions defined but never called:
```typescript
function legacyHelper() { ... }  // Never invoked
```

### 5. Unused Files
Entire files not imported anywhere in the codebase.

### 6. Unused Dependencies
Packages in package.json/requirements.txt not used in code.

### 7. Unreachable Code
Code after return/throw statements or in dead branches:
```javascript
function foo() {
  return 42;
  console.log('never runs');  // Unreachable
}
```

## Detection Tools

**Never install or download a tool to satisfy this methodology.** Detect the
repository's stack and existing tooling first (package files, lockfiles,
build config), and only run a tool below if it is already declared as a
project dependency and already available locally. If the detected stack has
no applicable tool already configured, skip to Manual Verification instead
of installing one.

### Knip (JavaScript/TypeScript)

**Preconditions (check before using):**
- `knip` (or `knip.json`/`knip` config) is already declared in `package.json`
  (`dependencies`/`devDependencies`), and
- its executable is already available locally (e.g. resolvable in
  `node_modules/.bin` without a network fetch).

If either precondition is not met, do not install it — fall back to Manual
Verification.

**Commands (only when preconditions above are met; run the already-installed
local binary, not a network-fetching invocation):**
```bash
# Detection (default output)
knip

# JSON output for parsing
knip --reporter json

# Fix automatically (use with caution, after user approval)
knip --fix

# Specific workspace
knip --workspace packages/core

# Include/exclude patterns
knip --include files --exclude dependencies
```

**Configuration (`knip.json`):**
```json
{
  "$schema": "https://unpkg.com/knip@latest/schema.json",
  "entry": ["src/index.ts"],
  "project": ["src/**/*.ts"],
  "ignore": ["**/*.test.ts"],
  "ignoreDependencies": ["@types/*"]
}
```

**Categories detected:**
- files, dependencies, devDependencies
- exports, nsExports, classMembers
- types, nsTypes, enumMembers
- unlisted, binaries, unresolved, duplicates

### Deadcode (Python)

**Preconditions (check before using):**
- `deadcode` is already declared/configured for this repository (e.g.
  listed in `requirements*.txt`, `pyproject.toml`, or a lockfile), and
- it is already installed in the project's environment.

If either precondition is not met, do not install it — fall back to Manual
Verification.

**Commands (only when preconditions above are met):**
```bash
# Detection
deadcode .

# With verbose output
deadcode . --verbose

# Fix automatically (after user approval)
deadcode . --fix

# Dry run (show what would be fixed)
deadcode . --dry

# Specific path
deadcode src/

# Exclude patterns
deadcode . --exclude tests/
```

**Detection capabilities:**
- Unused imports (DC01)
- Unused variables (DC02)
- Unused functions (DC03)
- Unused classes (DC04)
- Unused methods (DC05)

### Other stacks (Java/JVM, Go, Rust, etc.)

There is no universal dead-code CLI for every stack. Use only a
static-analysis tool or build plugin that is **already configured** in the
repository's build files (e.g. an existing Maven/Gradle plugin, `go vet`,
`cargo clippy` if already part of the project's toolchain). If nothing is
configured, use Manual Verification below — do not add a new plugin or
dependency just to run this check.

## False Positive Detection

**CRITICAL: Always verify findings before reporting to the user.**

### Common False Positives

#### 1. Dynamic Imports
```javascript
// These imports appear unused but are loaded at runtime
const module = await import(modulePath);
require(variableName);
```

#### 2. Framework Magic
```typescript
// React components used in JSX
export const Button = () => <button />;  // Used as <Button />

// Decorators in TypeScript/Python
@decorator
export class Controller {}

// Vue setup functions
export function useCounter() { ... }  // Used in <script setup>
```

#### 3. Re-exports for Public API
```typescript
// index.ts barrel file - exports ARE the purpose
export { Helper } from './helper';  // Re-exported for external use
```

#### 4. Entry Points
```javascript
// CLI scripts, serverless handlers, etc.
export const handler = async (event) => { ... };  // AWS Lambda entry
```

#### 5. Test Utilities
```typescript
// Only used in test files
export class TestHelper {}  // Referenced in *.test.ts
```

#### 6. String-Based References
```javascript
// Accessed via strings or reflection
const fn = functions['dynamicName'];
getattr(obj, 'method_name')()
```

### Verification Checklist

For each flagged item, the agent MUST:

1. **Read the flagged code** to understand context
2. **Search for dynamic references**:
   - `import(` or `require(` with variables
   - String interpolation with the item name
   - `eval`, `getattr`, or reflection patterns
3. **Check framework patterns**:
   - React: Is it a component used in JSX?
   - Angular: Is it decorated with @Component, @Injectable, etc.?
   - Express: Is it middleware or route handler?
4. **Check for re-exports**:
   - Is this in an index.ts/index.js barrel file?
   - Is this part of the public API?
5. **Check entry points**:
   - Is this a CLI script, serverless handler, or worker?
   - Is it referenced in package.json scripts or config files?

## Workflow

### 1. Run Detection Tool

Detect the repository's stack first, then run only an already-configured,
already-installed tool for that stack (see Detection Tools above). Do not
invoke a helper script or package unless it already exists in this
repository. If nothing applicable is configured, skip straight to Manual
Verification (search for references, review compiler/build warnings).

### 2. Parse and Categorize
Group findings by type:
- Unused exports
- Unused files
- Unused dependencies
- Unused imports
- Unused class members

### 3. Verify Each Finding
For each item:
1. Read the code
2. Check for false positive patterns
3. Mark as "verified" or "likely false positive"

### 4. Present Verified Report
Show user:
- Summary counts (verified items only)
- Detailed list with file:line references
- Filtered items with reasons

### 5. Apply Fixes (After Approval)
```bash
# Only after user confirms, and only using the already-installed local tool
knip --fix
# or
deadcode . --fix
```

## Integration with Audits

### Quick Check Integration
- Run detection as part of automated checks
- Report findings under "Dead Code" category
- Don't auto-fix; inform user of findings

### Deep Audit Integration
- Run as Phase 2.5: Dead Code Detection
- Include in comprehensive report
- Provide fix commands for user to run

### Standalone `/dead-code` Command
- Focused workflow for dead code only
- Interactive cleanup with user approval
- Show verification process

## Best Practices

1. **Run regularly** - Include in CI/CD pipeline
2. **Configure properly** - Set up ignore rules for framework patterns
3. **Test after removal** - Ensure nothing breaks
4. **Review before commit** - Manual verification recommended
5. **Document exceptions** - Comment why certain "dead" code is intentional
6. **Start conservative** - Better to miss some than to break things
