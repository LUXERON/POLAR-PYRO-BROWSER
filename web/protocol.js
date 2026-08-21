export const PLUGIN_ID = 'dev.luxeron.polar.browser';
export const CAPABILITIES = Object.freeze(['browser.navigate']);

export function normalizeUrl(input, { localPreviewGranted = false } = {}) {
  const raw = String(input ?? '').trim();
  if (!raw) throw new Error('URL is required');
  const candidate = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  const url = new URL(candidate);
  if (!['http:', 'https:'].includes(url.protocol)) throw new Error('Only HTTP(S) URLs are admitted');
  if (url.username || url.password) throw new Error('URL credentials are forbidden');
  const local = ['localhost', '127.0.0.1', '::1'].includes(url.hostname);
  if (local && !localPreviewGranted) throw new Error('Loopback navigation requires a local-preview grant');
  return url.href;
}

export function navigationRequest(url, context) {
  if (!context?.requestId || !context?.projectId || !context?.sessionId) throw new Error('Bound host context is required');
  return {
    schema_version: 'polar.ui-request/v1', plugin_id: PLUGIN_ID, capability_id: 'browser.navigate',
    request_id: context.requestId, project_id: context.projectId, session_id: context.sessionId,
    payload: { url: normalizeUrl(url, context) },
  };
}
