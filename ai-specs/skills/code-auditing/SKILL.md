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
1. Check for project configuration files that actually exist (e.g. `package.json`/`tsconfig.json` for JS/TS, `pom.xml`/`build.gradle` for Java/Kotlin, `requirements.txt`/`pyproject.toml` for Python, `go.mod` for Go, etc.) — never assume a stack; detect it from files present in the repository.
2. Identify tech stack and main libraries from those files
3. Check for linting/formatting/static-analysis configs already declared by the project (e.g. eslint/prettier configs, a `checkstyle.xml`/`checkstyle`, `spotbugs`, or `pmd` Maven/Gradle plugin, `black`/`flake8` configs) — do not assume a tool is available unless it is declared in the project's own build or dependency files
4. Run existing linting/testing commands as baseline, using only commands the project's own build tooling already provides (see `references/audit-methodology.md` for stack-conditional commands)
5. Load documentation for identified core libraries

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
2. Search for mature ecosystem packages
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

### TypeScript/Type Safety
- Missing type annotations
- Use of `any` type
- Custom types duplicating official types
- Missing @types packages

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

**Tools (use only when the ecosystem/tool is already present for the project being audited — never install an undeclared tool merely to audit):**
- JavaScript/TypeScript: `npx knip --reporter json` (npx resolves a project's own declared tooling; do not `npm install -g` an undeclared tool)
- Python: `deadcode . --dry`
- Java/Kotlin (Maven/Gradle): no zero-install equivalent ships with a bare Spring/Java build. Only run a dead-code/static-analysis tool (e.g. a `spotbugs`/`pmd`/`checkstyle` Maven or Gradle plugin) if the project's `pom.xml`/`build.gradle` already declares it; otherwise treat this as manual-review-only and note the gap rather than installing a new plugin. See `references/dead-code-methodology.md` for detail.

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
