# Polar Pyro Browser

An independently deployable, sandbox-hostable Browser surface for the Polar Pyro neurosymbolic software forge. It gives a development session an in-app browser without giving the UI direct network, filesystem, credential, or MCP authority.

## North star

Polar Pyro should be able to build a real application, start it in an isolated test environment, navigate its routes, inspect accessibility/network/console/performance evidence, execute declared user journeys, and show the result to a human—all while a 0.6B model remains unable to choose arbitrary browser tools or touch a personal profile.

## Contract

The package contributes a `session.tab` UI and emits only `browser.navigate` and `browser.snapshot` requests. Every request is bound to a host-issued request, project, and session ID. It cannot invoke Obscura or Chrome directly. The Polar Pyro host validates the manifest digest and URL policy, selects a qualified backend, attaches grants, invokes through its broker, and returns a typed receipt. The current production slice admits only the selected project's registered preview origin; arbitrary-web navigation remains fail-closed.

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

## Live qualification — 2026-08-21

The independently served Browser surface was mounted on a separate loopback origin inside the DE-PIN Polar Pyro host. Its automatic initial navigation crossed the source/origin/request/project/session validator, the Qwen host admitted the exact registered `http://127.0.0.1:5173/` project origin, and the external surface rendered the real DE-PIN application in a second sandboxed frame. It then emitted a closed `browser.snapshot` request through the same broker. The host re-admitted the URL and launched `chrome-devtools-mcp@1.7.0` in isolated headless mode with telemetry and CrUX disabled, redacted network headers, a single allowed origin, no personal profile, and bounded time.

The real Chromium qualification enumerated 29 MCP tools and produced a 1,599-character semantic snapshot with SHA-256 `806cdd94d46c984b566ef5630b91e0d666771b871529fc67db5ef9305632877a`; the tool-name catalog digest was `bb75ec786b617260552144cefa7db51dd507df9beaf5e73a672e64bdca7f1647`. The npm release is pinned to version `1.7.0`, upstream Git commit `774d78f5eef5e610407a0c92fa6ec5ed74b027e8`, and integrity `sha512-6xFW7oiUxTxZuHcfyYBkKQtmttjCbfifKZMSEk5CV8H2FucvKweYiJr8CblddYHtYjA4C14K9VAs1r49906RBA==`.

An origin-escape URL and credential-bearing URL are rejected by host tests. This proves governed local project preview plus read-only DOM inspection. It does not authorize arbitrary internet access, a personal Chrome profile, screenshots, interactive journeys, downloads, or mutations.

Status: standalone surface, bound RPC, project-origin admission, live nested preview, pinned Chrome MCP handshake, and hashed DOM snapshot receipt are executable. Performance/network/console inspection, Obscura, arbitrary-web navigation, interactive journeys, and mutations remain fail-closed until their independent broker qualifications pass.
