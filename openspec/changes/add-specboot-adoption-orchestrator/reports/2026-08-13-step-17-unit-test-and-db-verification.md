# Step 17 — Unit Tests and Database State Verification

Date: 2026-08-13. Host: `Darwin 22.6.0`, zsh. Branch: `feature/add-specboot-adoption-orchestrator`.

Supersedes the 2026-08-12 report, which described a suite that has since gained the delivery-mode
campaign (tasks 4.14–4.22, 5.11–5.18).

## 17.1 — Pre-change baseline

```text
Branch: feature/add-specboot-adoption-orchestrator
Baseline (2026-08-12 report): mvn 8/8 pass; npm 27 pass / 1 fail
```

The single npm failure in the prior baseline was a payload race between parallel test files, not an
assertion defect. It is fixed (see the GREEN record) and does not recur.

## 17.2 — Java suite (`mvn -o test`)

```text
Tests run: 1, Failures: 0, Errors: 0, Skipped: 0 - PriceEntityModelConverterTest
Tests run: 1, Failures: 0, Errors: 0, Skipped: 0 - PriceServiceImplTest
Tests run: 1, Failures: 0, Errors: 0, Skipped: 0 - AppPricesRestApplicationTests
Tests run: 5, Failures: 0, Errors: 0, Skipped: 0 - PriceControllerTest
Tests run: 8, Failures: 0, Errors: 0, Skipped: 0
BUILD SUCCESS
```

**Exit code 0. 8 tests, 0 failures.** Re-executed rather than carried forward.

Evidence that no Java path changed in this revision: `git diff --name-only | grep '^src/'` returns
nothing.

## 17.3 — Installer suite (`npm test` in `packages/specboot/`)

Command: `node --test --test-concurrency=1 "test/*.test.js"`

```text
ℹ tests 58
ℹ suites 16
ℹ pass 58
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
```

**Exit code 0. 58 tests, 0 failures, 0 skipped, 0 todo.** The suite grew from 27 to 58 tests with
the delivery-mode campaign.

Design **D-O** evidence is recorded in `installer-tdd-green.md`: first-invocation passes from a
clean checkout and from an intentionally stale assembled payload, plus a repeated pass.

## 17.4 — Database state (recorded non-applicability)

| Indicator | Value | Justification |
|---|---|---|
| Pre-change DB state | **N/A** | this repository's suite uses no external database |
| Post-change DB state | **N/A** | no persistence code, entity, or migration is touched |
| `docs/data-model.md` | unchanged | no data-model change; confirmed under task 20.1 |

Recorded explicitly as N/A with its justification rather than omitted.

## Drift check

```text
Drift failures  0 (enforcing)
Drift warnings  5 (warn-only, pre-existing template — design D-I, out of scope)
```

Enforcing for the kit payload, warn-only for the pre-existing `packages/specboot/template/` drift
recorded at task 1.4.

## 17.6 — Verdict

**Both suites pass and this report file exists.** Java 8/8; installer 58/58; drift 0 enforcing
failures.
