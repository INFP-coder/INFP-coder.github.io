document$.subscribe(() => {
  const c = document.getElementById('graph');
  if (!c) return;
  const ctx = c.getContext('2d');

  // 高分屏清晰渲染
  const dpr = window.devicePixelRatio || 1;
  const W = 720, H = 360;
  c.width = W * dpr;
  c.height = H * dpr;
  c.style.width = W + 'px';
  c.style.height = H + 'px';
  ctx.scale(dpr, dpr);

  const nodes = [
    { label: 'OI', url: '/' },
    { label: '数据结构', url: '/ds/' },
    { label: '线段树', url: '/ds/线段树/' },
    { label: '图论', url: '/graph/' },
    { label: '字符串', url: '/string/' },
    { label: '动态规划', url: '/dp/' },
    { label: '数论', url: '/math/' },
    { label: '写作模板', url: '/writing/' },
    { label: '归档', url: '/archive/' },
    { label: '标签', url: '/tags/' },
  ];
  const edges = [[0,1],[0,3],[0,4],[0,5],[0,6],[0,7],[0,8],[0,9],[1,2]];

  nodes.forEach((n, i) => {
    const a = (i / nodes.length) * Math.PI * 2;
    n.x = W/2 + Math.cos(a) * 160;
    n.y = H/2 + Math.sin(a) * 110;
    n.vx = 0; n.vy = 0;
  });

  function step() {
    for (let i = 0; i < nodes.length; i++)
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        let dx = a.x - b.x, dy = a.y - b.y;
        let d2 = dx*dx + dy*dy || 1, d = Math.sqrt(d2);
        let f = 3000 / d2;
        dx /= d; dy /= d;
        a.vx += dx*f; a.vy += dy*f; b.vx -= dx*f; b.vy -= dy*f;
      }
    for (const [i,j] of edges) {
      const a = nodes[i], b = nodes[j];
      let dx = b.x - a.x, dy = b.y - a.y;
      let d = Math.sqrt(dx*dx + dy*dy) || 1;
      let f = (d - 110) * 0.03;
      dx /= d; dy /= d;
      a.vx += dx*f; a.vy += dy*f; b.vx -= dx*f; b.vy -= dy*f;
    }
    for (const n of nodes) {
      n.vx += (W/2 - n.x) * 0.002;
      n.vy += (H/2 - n.y) * 0.002;
      n.vx *= 0.88; n.vy *= 0.88;
      n.x += n.vx; n.y += n.vy;
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (const [i,j] of edges) {
      ctx.beginPath();
      ctx.moveTo(nodes[i].x, nodes[i].y);
      ctx.lineTo(nodes[j].x, nodes[j].y);
      ctx.strokeStyle = 'rgba(122,162,247,0.35)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      const hot = (i === hover);
      // 外圈光晕（hover 放大变亮，柔和但不糊）
      ctx.beginPath();
      ctx.arc(n.x, n.y, hot ? 14 : 9, 0, Math.PI * 2);
      ctx.fillStyle = hot ? 'rgba(122,162,247,0.30)' : 'rgba(122,162,247,0.18)';
      ctx.fill();
      // 实心核心（清晰）
      ctx.beginPath();
      ctx.arc(n.x, n.y, hot ? 5.5 : 4.5, 0, Math.PI * 2);
      ctx.fillStyle = hot ? '#a8c4ff' : '#7aa2f7';
      ctx.fill();
      // 文字（清晰）
      ctx.fillStyle = hot ? '#e0e6ff' : '#c0caf5';
      ctx.font = (hot ? 'bold ' : '') + '13px -apple-system, PingFang SC, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(n.label, n.x, n.y - 16);
    }
  }

  let hover = -1;
  c.addEventListener('mousemove', (e) => {
    const r = c.getBoundingClientRect();
    const mx = e.clientX - r.left, my = e.clientY - r.top;
    let h = -1;
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      if ((mx - n.x) ** 2 + (my - n.y) ** 2 < 16 ** 2) { h = i; break; }
    }
    if (h !== hover) {
      hover = h;
      c.style.cursor = h >= 0 ? 'pointer' : 'default';
    }
  });

  c.addEventListener('click', (e) => {
    const r = c.getBoundingClientRect();
    const mx = e.clientX - r.left, my = e.clientY - r.top;
    for (const n of nodes) {
      if ((mx-n.x)**2 + (my-n.y)**2 < 16**2) {
        window.location.href = n.url;
        return;
      }
    }
  });

  (function loop() {
    for (let i = 0; i < 3; i++) step();
    draw();
    requestAnimationFrame(loop);
  })();
});
