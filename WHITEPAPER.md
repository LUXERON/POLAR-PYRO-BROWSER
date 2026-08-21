# A Brokered Browser for Proof-Carrying Software Development

Modern coding agents need to see what they built, but a browser is also a credential vault, network pivot, filesystem gateway, and action surface. Giving an LLM a generic browser tool therefore expands both capability and authority at once.

Polar Browser separates them. The UI expresses a closed navigation or observation request. A deterministic host applies URL and tenant policy, selects a backend, and returns evidence. An independent browser or domain oracle interprets that evidence against a frozen application contract. The model may propose a journey but cannot authorize origins, profiles, credentials, downloads, or external writes.

This separation makes the surface replaceable. Obscura can optimize cheap headless work; Chrome DevTools can inspect a real test target; future mobile/webview backends can satisfy the same capability family. The UI remains stable because it consumes normalized receipts, not backend-specific tool descriptions.

For remote delivery, the browser backend may live at the edge behind a 5G service gateway. N3IWF attaches Wi-Fi clients to the 5G core; mTLS/service identity, tenant scope, grants, quotas, receipts, and evidence remain application obligations. Network attachment is never treated as trust.

Success is measured by journey coverage, citation/evidence precision, injection and SSRF rejection, personal-profile isolation, deterministic replay, crash recovery, and warm latency—not by the number of advertised browser tools.

