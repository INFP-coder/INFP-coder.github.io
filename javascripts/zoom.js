// 图片点击放大（轻量 lightbox：opacity/transform 动画，ESC 或点击关闭）
document$.subscribe(() => {
  let overlay = document.querySelector('.zoom-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'zoom-overlay';
    const img = document.createElement('img');
    overlay.appendChild(img);
    const close = () => { overlay.classList.remove('open'); img.removeAttribute('src'); };
    overlay.addEventListener('click', close);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
    document.body.appendChild(overlay);
  }
  const img = overlay.querySelector('img');
  const open = (src, alt) => { img.src = src; img.alt = alt || ''; overlay.classList.add('open'); };
  document.querySelectorAll('.md-typeset img').forEach((el) => {
    if (el.classList.contains('about-avatar') || el.closest('.zoom-overlay')) return;
    el.style.cursor = 'zoom-in';
    el.addEventListener('click', () => open(el.currentSrc || el.src, el.alt));
  });
});
