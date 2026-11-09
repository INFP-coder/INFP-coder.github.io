// 侧栏开关：点击隐藏/显示左侧导航与右侧目录（仅桌面宽度生效，状态记忆在 localStorage）
function applySidebarState(closed) {
  document.documentElement.classList.toggle('sb-closed', closed);
}

document$.subscribe(() => {
  const inner = document.querySelector('.md-header__inner');
  if (!inner || document.getElementById('sb-toggle')) return;

  const btn = document.createElement('button');
  btn.id = 'sb-toggle';
  btn.className = 'md-header__button md-icon';
  btn.type = 'button';
  btn.title = '开关侧栏';
  btn.setAttribute('aria-label', '开关侧栏');
  btn.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">' +
    '<path d="M4 5h16v14H4z" fill="none" stroke="currentColor" stroke-width="1.8"/>' +
    '<path d="M9 5v14" fill="none" stroke="currentColor" stroke-width="1.8"/>' +
    '</svg>';

  btn.addEventListener('click', () => {
    const closed = !document.documentElement.classList.contains('sb-closed');
    applySidebarState(closed);
    try { localStorage.setItem('sb-closed', closed ? '1' : '0'); } catch (e) {}
  });

  inner.appendChild(btn);

  let closed = false;
  try { closed = localStorage.getItem('sb-closed') === '1'; } catch (e) {}
  applySidebarState(closed);
});
