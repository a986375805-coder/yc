(() => {
  'use strict';
  if (location.hostname !== 'a986375805-coder.github.io' || !['/yc/', '/yc/index.html'].includes(location.pathname)) return;
  const endpoint = 'https://yaochang-portfolio-events.creamyangel5.chatgpt.site/api/collect';
  const projects = new Set(['gamepulse', 'cms', 'feishu', 'top-redesign', 'detail-redesign', 'timeline-config', 'iot-project']);
  const channels = new Set(['boss', 'liepin', 'zhilian', 'lagou', 'linkedin', 'wechat', 'email', 'referral', 'github']);
  const query = new URLSearchParams(location.search);
  const privacySignal = navigator.doNotTrack === '1' || navigator.globalPrivacyControl === true;
  let excluded = false;
  try {
    if (query.get('analytics') === 'off') localStorage.setItem('yc-analytics-off', '1');
    if (query.get('analytics') === 'on') localStorage.removeItem('yc-analytics-off');
    excluded = localStorage.getItem('yc-analytics-off') === '1';
  } catch { excluded = query.get('analytics') === 'off'; }
  let channel = channels.has(query.get('utm_source')) ? query.get('utm_source') : '';
  let referrer = '';
  try { const u = new URL(document.referrer); if (['http:', 'https:'].includes(u.protocol)) referrer = u.origin; } catch {}
  let memorySession;
  function session() {
    const now = Date.now();
    let saved = memorySession;
    try { saved = JSON.parse(sessionStorage.getItem('yc-analytics-session')) || saved; } catch {}
    if (!saved || now - saved.updated > 30 * 60 * 1000 || !/^[a-f0-9-]{36}$/i.test(saved.id)) saved = { id: crypto.randomUUID(), updated: now, channel };
    saved.updated = now;
    if (channel) saved.channel = channel;
    channel = channels.has(saved.channel) ? saved.channel : '';
    memorySession = saved;
    try { sessionStorage.setItem('yc-analytics-session', JSON.stringify(saved)); } catch {}
    return saved.id;
  }
  function send(kind, target = '') {
    if (excluded || privacySignal || !crypto.randomUUID) return;
    try {
      const sessionId = session();
      fetch(endpoint, { method: 'POST', credentials: 'omit', keepalive: true, referrerPolicy: 'no-referrer', headers: { 'Content-Type': 'text/plain' }, body: JSON.stringify({ id: crypto.randomUUID(), session: sessionId, path: location.pathname, kind, target, channel, referrer }) }).catch(() => {});
    } catch {}
  }
  const toggle = document.getElementById('analytics-toggle');
  function label() {
    if (!toggle) return;
    toggle.hidden = false;
    toggle.textContent = privacySignal ? '匿名统计：已按隐私偏好关闭' : excluded ? '匿名统计：关闭' : '匿名统计：开启';
    toggle.setAttribute('aria-pressed', String(!excluded && !privacySignal));
    toggle.disabled = privacySignal;
    toggle.title = '记录匿名访问与项目点击，不保存 IP 或联系方式；点击切换。';
  }
  label();
  toggle?.addEventListener('click', () => {
    excluded = !excluded;
    try { if (excluded) localStorage.setItem('yc-analytics-off', '1'); else localStorage.removeItem('yc-analytics-off'); } catch {}
    label();
  });
  send('pageview');
  document.addEventListener('click', event => {
    const element = event.target instanceof Element ? event.target : null;
    const anchor = element?.closest('a[href]');
    if (anchor) {
      let url; try { url = new URL(anchor.href, location.href); } catch { return; }
      if (url.protocol === 'mailto:') return send('contact', 'email');
      if (url.origin === location.origin && url.pathname === location.pathname && projects.has(url.hash.slice(1))) return send('project', url.hash.slice(1));
      if (url.hostname === 'github.com') {
        const repo = url.pathname.replace(/\/$/, '').toLowerCase();
        const target = { '/a986375805-coder/gamepulse-ai': 'gamepulse', '/a986375805-coder/17173-cms-publisher': 'cms', '/a986375805-coder/feishu-openclaw-skill': 'feishu', '/a986375805-coder': 'github-profile' }[repo];
        if (target) send('outbound', target);
      }
      return;
    }
    const summary = element?.closest('summary');
    const details = summary?.parentElement;
    if (details?.tagName === 'DETAILS' && !details.open) {
      const id = summary.querySelector('h3[id]')?.id;
      if (projects.has(id)) send('project', id);
    }
  });
})();
