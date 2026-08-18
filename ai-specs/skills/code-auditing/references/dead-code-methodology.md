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

### Knip (JavaScript/TypeScript)

**Installation:**
```bash
npm install -g knip
# or use via npx (no install required)
```

**Commands:**
```bash
# Detection (default output)
npx knip

# JSON output for parsing
npx knip --reporter json

# Fix automatically (use with caution)
npx knip --fix

# Specific workspace
npx knip --workspace packages/core

# Include/exclude patterns
npx knip --include files --exclude dependencies
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

**Installation:**
```bash
pip install deadcode
```

**Commands:**
```bash
# Detection
deadcode .

# With verbose output
deadcode . --verbose

# Fix automatically
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

### Java/Kotlin (Maven/Gradle)

There is no zero-install, zero-config dead-code tool for a bare Java/Maven or Java/Gradle project. Before running anything:

1. **Check whether the project's own build already declares a relevant plugin** — search `pom.xml` for `spotbugs-maven-plugin`, `pmd-maven-plugin`, or `maven-checkstyle-plugin` (or the Gradle equivalents `com.github.spotbugs`, `pmd`, `checkstyle` in `build.gradle`/`build.gradle.kts`). If one is declared, run it via the wrapper (`./mvnw spotbugs:check`, `./mvnw pmd:check`, `./gradlew check`, etc.) — this is resolving a dependency the project already declares, which is allowed.
2. **If none is declared, do not add one merely to perform this audit.** Adding `spotbugs`/`pmd`/`checkstyle` to `pom.xml`/`build.gradle` to enable dead-code detection is introducing a new, undeclared dependency — not allowed as part of an inspection task. Report this as a limitation instead: "No dead-code/static-analysis tool is configured for this Java project; automated detection was not possible without adding a new build dependency."
3. **Fall back to manual review** for this stack: unused private methods/fields (compiler `-Xlint` warnings can surface some of these during `mvn compile`), unused imports (most IDEs flag these; `mvn compile` does not), and classes with no inbound references found via a repository-wide symbol search (e.g. CodeGraph, if available, or `grep`/`git grep` for the class/method name across `src/`).

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
```bash
# If this skill is installed as a Claude plugin that ships the optional helper script,
# ${CLAUDE_PLUGIN_ROOT}/scripts/dead-code-detect.sh may exist — check before relying on it:
if [ -n "${CLAUDE_PLUGIN_ROOT:-}" ] && [ -x "${CLAUDE_PLUGIN_ROOT}/scripts/dead-code-detect.sh" ]; then
    "${CLAUDE_PLUGIN_ROOT}/scripts/dead-code-detect.sh" --format json
else
    # Fallback: run the stack-appropriate tool directly (see stack sections above).
    # e.g. npx knip --reporter json   |   deadcode . --dry   |   (Java: see Java/Kotlin section — manual review)
    :
fi
```

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
# Only after user confirms
npx knip --fix
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
