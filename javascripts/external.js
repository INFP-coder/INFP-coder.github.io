// 站外链接：新窗口打开 + ↗ 标记
document$.subscribe(() => {
  document.querySelectorAll('a[href^="http"]').forEach((a) => {
    const u = new URL(a.href);
    if (u.hostname !== location.hostname) {
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener');
      a.classList.add('ext-link');
    }
  });
});
