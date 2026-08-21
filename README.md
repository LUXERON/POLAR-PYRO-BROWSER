# Polar Pyro Browser

An independently deployable, sandbox-hostable Browser surface for the Polar Pyro neurosymbolic software forge. It gives a development session an in-app browser without giving the UI direct network, filesystem, credential, or MCP authority.

## North star

Polar Pyro should be able to build a real application, start it in an isolated test environment, navigate its routes, inspect accessibility/network/console/performance evidence, execute declared user journeys, and show the result to a human—all while a 0.6B model remains unable to choose arbitrary browser tools or touch a personal profile.

## Contract

The package contributes a `session.tab` UI and emits only `browser.navigate` requests. Every request is bound to a host-issued request, project, and session ID. It cannot invoke Obscura or Chrome directly. The Polar Pyro host validates the manifest digest and URL policy, selects a qualified backend, attaches grants, invokes through its broker, and returns a typed receipt.

```text
Browser iframe → polar.ui-request/v1 → governed host
  → URL/SSRF policy → capability registry
  → Obscura | Chrome DevTools MCP | future backend
  → snapshot/trace receipt → browser/domain oracle
```

The UI accepts HTTP(S) only, rejects credentials embedded in URLs, and requires an explicit `localPreviewGranted` context flag for loopback. Production URL policy must additionally resolve DNS, block private/link-local/metadata networks, defend against rebinding/redirects, cap bodies and time, and confine downloads.

## Backend roles

- Obscura: lightweight headless execution, DOM snapshots and screenshots.
- Chrome DevTools MCP: inspection of an admitted Chromium test target, network/console/performance evidence.
- Browser UI: address/history/viewport and evidence presentation. It is not a crawler or policy authority.

Personal browser profiles, cookies, storage state, file URLs, private networks, downloads, camera/microphone, clipboard, and interactive mutations are denied unless a separate credential/effect grant explicitly admits the exact operation.

## Run and test

Serve `web/` from any static loopback server, then mount it in a sandboxed iframe. The host sends `polar.ui-context/v1`; the plugin emits `polar.ui-ready/v1`, `polar.ui-request/v1`, or `polar.ui-error/v1` envelopes.

```powershell
npm test
```

The package has no runtime dependencies. See [WHITEPAPER.md](WHITEPAPER.md) for the design thesis and rollout gates.

## Roadmap

1. Implement origin-pinned host RPC with event-source validation.
2. Add address/history/viewport state and normalized navigation receipts.
3. Add snapshot, console, network, accessibility, Lighthouse and trace viewers.
4. Add deterministic journey playback from frozen `BrowserJourneyIR`.
5. Add screenshots/video only as evidence, never as authorization.
6. Qualify Obscura and Chrome adapters with SSRF, injection, cookie and crash gauntlets.
7. Deliver remote browser services through an authenticated MEC gateway over N3IWF/5GC while preserving the same grant/receipt semantics.

Status: contract and standalone sandbox surface are executable; direct backend invocation is intentionally absent until broker qualification.

