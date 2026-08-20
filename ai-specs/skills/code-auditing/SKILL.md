---
name: code-auditing
description: Task-focused project skill.
version: 1.0.0
---
# Code Auditing Skill

Comprehensive methodology for systematic code quality audits.

## When to Use

- Comprehensive code quality audits
- Security vulnerability assessments
- Technical debt identification
- Pre-release code reviews
- Best practices verification
- Library and dependency audits

## Audit Phases

### Phase 0: Pre-Analysis Setup
1. Check for project configuration files appropriate to the detected stack — for example
   `package.json`/`tsconfig.json` (Node/TypeScript), `pom.xml`/`build.gradle` (Java/JVM),
   `requirements.txt`/`pyproject.toml` (Python), `go.mod` (Go), `Cargo.toml` (Rust); detect from
   files that actually exist in the repository rather than assuming any one ecosystem
2. Identify tech stack and main libraries from that same evidence
3. Check for linting/formatting configs already declared by the project (do not add a new one)
4. Run only the project's own already-configured linting/testing commands as baseline — never
   install or download an undeclared tool merely to perform this audit; resolving a dependency
   the project already declares is fine, introducing a new one is not
5. Load documentation for identified core libraries the project already depends on

### Phase 1: Discovery
1. Find all code files by type
2. Create tracking list for each file
3. Group files by module/feature for contextual analysis

### Phase 2: File-by-File Analysis
For each file, analyze for:
- Dead code (unused functions, variables, imports)
- Code smells and anti-patterns
- Custom implementations that could use established libraries
- Security vulnerabilities
- Performance issues
- Outdated patterns or deprecated APIs
- Missing error handling
- Overly complex functions
- Duplicate code

### Phase 3: Best Practices Verification
For every library and framework:
1. Retrieve official documentation
2. Compare implementation against official patterns
3. Identify deviations from recommendations
4. Note outdated usage patterns
5. Flag discouraged anti-patterns

### Phase 4: Pattern Detection
Look for recurring issues:
- Common anti-patterns across files
- Duplicated logic that could be abstracted
- Inconsistent coding styles
- Missing error handling patterns

### Phase 5: Library Recommendations
For custom implementations:
1. Check if current libraries provide the functionality
2. Search for mature ecosystem packages — external web, GitHub, or package-registry research
   requires explicit user authorization before it is performed
3. Verify library health (commits, issues, activity)
4. Check compatibility with project setup

### Phase 6: Comprehensive Report
Generate detailed report with:
- Executive summary
- Critical issues requiring immediate attention
- File-by-file findings
- Prioritized action plan
- Effort estimates
- Library recommendations

## Issue Priority Levels

- **Critical** - Security vulnerabilities, broken functionality
- **High Priority** - Performance bottlenecks, unmaintainable code
- **Medium Priority** - Code quality, best practices deviations
- **Low Priority** - Style, minor improvements
- **Quick Wins** - Less than 30 minutes to fix

## Analysis Categories

### Security
- Hardcoded secrets
- SQL injection risks
- XSS vulnerabilities
- Missing input validation
- Exposed sensitive data

### Performance
- Inefficient algorithms
- Blocking operations
- Memory leaks
- Missing caching opportunities
- N+1 query patterns

### Type Safety
Check the aspect that applies to the detected language:
- **TypeScript**: missing type annotations, use of `any`, custom types duplicating official
  types, missing `@types` packages
- **Java/JVM**: raw types instead of generics, unchecked/unsafe casts, missing `@Nullable`/
  `@NonNull` annotations where the project already uses them, overly broad `Object`/`Exception`
  typing where a specific type is available
- **Python**: missing type hints, use of `Any`, `# type: ignore` without justification
- Other statically-typed languages: the equivalent compiler-enforced type-safety gaps

### Async/Promise Issues
- Missing await keywords
- Unhandled promise rejections
- Callback hell

### Dead Code
- Unused imports and exports
- Unused functions, classes, and methods
- Unused variables and types
- Unreachable code blocks
- Unused files (not imported anywhere)
- Unused dependencies

**Tools** (use only when already a declared dependency of the project, or already installed on
the machine — never install one merely to run this audit; see `references/dead-code-methodology.md`
for the full list):
- JavaScript/TypeScript: `knip` (via `npx knip --reporter json`, only if the project already
  depends on it or `npx` resolving it from the npm registry is acceptable in this environment)
- Python: `deadcode . --dry`
- Java/JVM: no bundled dead-code tool is listed here; rely on the build tool's own compiler
  warnings (unused imports/variables) and, if the project already configures one, a static
  analysis tool it already depends on (for example Checkstyle, PMD, or an IDE inspection
  already part of the project setup) — do not add a new static-analysis dependency for this
  audit alone
- Other languages: use whatever dead-code/lint tool the project already declares; if none is
  declared, note the gap in the report rather than introducing one

**Important:** Always verify tool findings before reporting. Check for:
- Dynamic imports (`import(variable)`)
- Framework patterns (React components, decorators)
- Re-exports for public API
- Entry points (CLI scripts, serverless handlers)

## Resources

See the reference documents for complete methodologies:

- `references/audit-methodology.md` - Full 6-phase audit process with detailed checklists
- `references/dead-code-methodology.md` - Dead code detection tools, verification, and cleanup workflows

## Quick Reference

### Before Starting
- [ ] Read project configuration files
- [ ] Identify tech stack and libraries
- [ ] Run existing linters as baseline
- [ ] Create file tracking list

### During Audit
- [ ] Mark files as in-progress
- [ ] Analyze each category systematically
- [ ] Note specific line numbers
- [ ] Document before/after examples
- [ ] Mark files as completed

### After Audit
- [ ] Categorize all findings by priority
- [ ] Generate comprehensive report
- [ ] Save report to project root
- [ ] Provide brief console summary
