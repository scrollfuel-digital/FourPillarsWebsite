declare global {
  interface Window {
    __ctrlUReloadAt?: number;
  }
}

/**
 * Triggers a single deduplicated page reload on Ctrl+U / Cmd+U / Cmd+Option+U.
 */
export function triggerCtrlUAutoRefresh(e: KeyboardEvent): void {
  if (e.repeat) return;

  const isCtrl = e.ctrlKey || e.metaKey;
  const isU =
    (e.key && e.key.toLowerCase() === "u") ||
    e.code === "KeyU" ||
    e.keyCode === 85 ||
    e.which === 85;
  const isMacViewSource = e.metaKey && e.altKey && isU;

  if (!((isCtrl && isU) || isMacViewSource)) return;

  const now = Date.now();
  if (now - (window.__ctrlUReloadAt || 0) < 1000) return;
  window.__ctrlUReloadAt = now;

  window.location.reload();
}
