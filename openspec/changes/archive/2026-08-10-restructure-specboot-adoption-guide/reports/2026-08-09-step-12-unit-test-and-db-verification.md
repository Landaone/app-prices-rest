# Step 12 Report — Unit Tests and Database Verification

- Date: 2026-08-09
- Change: restructure-specboot-adoption-guide
- Agent: Claude Opus 5 (`/opsx:apply`)
- Branch: `feature/restructure-specboot-adoption-guide`

**Path normalization.** Personal home-directory prefixes in captured environment output are
represented as `$HOME`; all other evidence is preserved as recorded.

**Revision note.** An earlier version of this report classified the Java 26 compile failure
as a pre-existing project baseline defect and predicted it would reproduce on `master`. That
classification was **wrong** and is corrected below: it was an execution-environment
mismatch. The Java 26 evidence is preserved as historical record, not deleted.

## Outcome: Step 12 status — **PASS**

The project baseline passes on the required Java 11 toolchain, from a genuinely clean build
with no stale compiled output available.

## Authoritative baseline — fresh Java 11, isolated copy

An isolated copy of the repository was created excluding `.git/` and `target/`, so **no
stale compiled classes existed** (`find -name '*.class'` → 0, `find -name '*.jar'` → 0).

Toolchain, explicitly set:

```text
JAVA_HOME=$HOME/.sdkman/candidates/java/11.0.31-amzn
PATH=$JAVA_HOME/bin:$PATH
```

```text
$ java -version
openjdk version "11.0.31" 2026-04-21 LTS
OpenJDK Runtime Environment Corretto-11.0.31.11.1 (build 11.0.31+11-LTS)
OpenJDK 64-Bit Server VM Corretto-11.0.31.11.1 (build 11.0.31+11-LTS, mixed mode)

$ mvn -v
Apache Maven 3.9.16 (2bdd9fddda4b155ebf8000e807eb73fd829a51d5)
Java version: 11.0.31, vendor: Amazon.com Inc., runtime: $HOME/.sdkman/candidates/java/11.0.31-amzn
OS name: "mac os x", version: "13.7.8", arch: "x86_64", family: "mac"
```

Result:

```text
$ mvn -o test
[INFO] Compiling 13 source files to <iso>/target/classes
[INFO] Compiling 4 source files to <iso>/target/test-classes
[INFO] Tests run: 1, ... - in com.llandaeta.prices.core.converters.PriceEntityModelConverterTest
[INFO] Tests run: 1, ... - in com.llandaeta.prices.core.services.impl.PriceServiceImplTest
[INFO] Tests run: 1, ... - in com.llandaeta.prices.AppPricesRestApplicationTests
[INFO] Tests run: 5, ... - in com.llandaeta.prices.rest.controllers.PriceControllerTest
[INFO] Tests run: 8, Failures: 0, Errors: 0, Skipped: 0
[INFO] BUILD SUCCESS
```

| Measure | Value |
|---|---|
| **Exit status** | **0** |
| Tests run | **8** |
| Failures | **0** |
| Errors | **0** |
| Skipped | **0** |
| Main sources compiled from scratch | **13** |
| Test sources compiled from scratch | **4** |
| Reference baseline expectation | 8 tests, 0 failures, 0 errors, 0 skipped — **matched** |

The 13-file main compilation is the decisive evidence: Lombok's annotation processor ran and
generated `Error.builder()` and the `@Slf4j` `log` field successfully under Java 11. The
result cannot have come from stale artifacts, because none existed in the copy.

## Historical evidence — the Java 26 execution environment

Preserved as recorded observation. **Reclassified: execution-environment mismatch, not a
project defect.**

| Run | Environment | Outcome |
|---|---|---|
| 1 | JDK 26.0.2 (inherited shell) | **FAILED** — `cannot find symbol: method builder()` on `com.llandaeta.prices.rest.dto.Error`; `cannot find symbol: variable log` in `HttpErrorHandler` |
| 2 | JDK 26.0.2, worktree | BUILD SUCCESS, 8 tests — **no main compilation occurred** |
| 3 | JDK 26.0.2, worktree | BUILD SUCCESS, 8 tests — no main compilation occurred |

The session shell had inherited:

```text
JAVA_HOME=$HOME/Library/Application Support/Code/User/globalStorage/pleiades.java-extension-pack-jdk/java/latest
→ openjdk version "26.0.2"
```

`org.projectlombok:lombok:1.18.20` cannot run its annotation processor on JDK 26, so
generated members were absent and main compilation failed. The project declares and requires
Java 11, which is installed (Corretto 11.0.31) and on which the same sources compile and pass
cleanly. **No project dependency, `pom.xml` entry, or source file is at fault, and nothing was
changed to obtain the passing result.**

### The stale-output observation stands, with corrected significance

Worktree runs 2 and 3 passed without recompiling main sources, executing against
`target/classes` artifacts dated 02:06 (`maven-status/.../createdFiles.lst` empty; no
`Compiling ... to target/classes` line). That is a genuine instance of the trap the adoption
guide documents in `ADOPT-16`: "A build tool that skips recompilation when it believes output
is current can produce a false baseline."

What it was masking is now correctly identified: **a toolchain mismatch in the session shell,
not a defect in the project.** Those two green runs were still not valid baseline evidence —
they proved only that previously built classes still run — which is why they were not
reported as a PASS at the time. The authoritative baseline is the fresh Java 11 run above.

## Database State Verification

- Pre-test baseline: **N/A** — the suite uses no external database. `PriceServiceImplTest`
  and `PriceEntityModelConverterTest` are unit tests with mocks;
  `AppPricesRestApplicationTests` is a context load; `PriceControllerTest` is a web-layer
  slice. No datasource is provisioned outside the Spring test context.
- Post-test validation: **N/A**, same reason.
- State restored: not applicable — no state was mutated.
- This change touches no persistence code and no `docs/data-model.md`.

## Isolation and non-mutation guarantees

| Guarantee | Evidence |
|---|---|
| `pom.xml` unmodified | `git status --short` — not listed |
| Application code and tests unmodified | `git diff --name-only` → 4 files, all `.md` |
| Worktree `target/` untouched | still 16 `.class` files, timestamps 02:06, unchanged before and after |
| Build artifacts confined to the isolated copy | all output under `<scratchpad>/iso-baseline/target/` |
| No dependency changed to make the build pass | only `JAVA_HOME` and `PATH` were set, per the required Java 11 baseline |

## Blocking Issues

**None.** Tasks 12.2 and 12.5 are satisfied:

- **12.2** — baseline run, exit status 0, 8 tests / 0 failures / 0 errors / 0 skipped,
  matching the reference expectation.
- **12.5** — the baseline passes and this report file physically exists.

## Environment note for future runs (not a code change)

Running `mvn -o test` in a shell whose `JAVA_HOME` points at the VSCode Java extension pack's
`java/latest` will fail against this project. Select the project's Java 11 toolchain first —
for example `sdk use java 11.0.31-amzn`, or set `JAVA_HOME` explicitly as above. Recorded as
operator guidance; no repository file is changed for it.

---

## Re-confirmation after the D4/D13 contract corrections (2026-08-10)

Re-run because the D4/D13 corrections edited the guide set and this change's reports. Result
unchanged, and re-derived rather than assumed:

- `git diff --name-only` contains **zero** `src/` paths — no Java source or test file is in this
  change's diff, so no test could have been affected.
- `mvn -o test` re-run regardless, per the project's agent-execution requirement that
  verifications are executed and not asserted: **BUILD SUCCESS**, `Tests run: 8, Failures: 0,
  Errors: 0, Skipped: 0`, matching the reference baseline exactly.
- Database state: unchanged and non-applicable for the same reason recorded above — the suite
  uses no external database and this change touches no persistence code or `docs/data-model.md`.

This is a report-only addition made after the fact; under the verification-evidence persistence
contract it does not invalidate the group-12 result it records.
