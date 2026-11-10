// 首页 hero 数据胶囊（数据来自 update_latest.py 生成的 stats.js）
document$.subscribe(() => {
  const hero = document.querySelector('.hero');
  if (!hero || !window.WIKI_STATS || hero.querySelector('.hero-stats')) return;
  const s = window.WIKI_STATS;
  const el = document.createElement('div');
  el.className = 'hero-stats';
  el.innerHTML =
    '<span class="hero-stat"><b>' + s.pages + '</b>&nbsp;篇文章</span>' +
    '<span class="hero-stat"><b>' + s.tags + '</b>&nbsp;个标签</span>' +
    '<span class="hero-stat">更新于&nbsp;<b>' + s.updated + '</b></span>';
  hero.appendChild(el);
});
