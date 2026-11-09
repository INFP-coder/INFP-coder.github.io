// 页面底部显示「最后更新」日期（数据来自 update_latest.py 生成的 dates.js）
document$.subscribe(() => {
  const D = window.WIKI_DATES;
  if (!D) return;
  let p = decodeURIComponent(location.pathname).replace(/^\//, '').replace(/\/$/, '');
  if (!p) p = 'index';
  let key = null;
  if (D[p + '.md'] !== undefined) key = p + '.md';
  else if (D[p + '/index.md'] !== undefined) key = p + '/index.md';
  if (!key) return;
  const inner = document.querySelector('.md-content__inner');
  if (!inner) return;
  const old = inner.querySelector('.page-date');
  if (old) { old.textContent = '📅 最后更新：' + D[key]; return; }
  const el = document.createElement('div');
  el.className = 'page-date';
  el.textContent = '📅 最后更新：' + D[key];
  inner.appendChild(el);
});
