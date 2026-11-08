// 折叠框平滑展开 / 收起动画
// 用 Web Animations API 精确测量高度，比 CSS transition 更流畅、兼容性更好

function bindDetails(details) {
  if (details.dataset.animBound) return;
  details.dataset.animBound = "1";

  const summary = details.querySelector(":scope > summary");
  if (!summary) return;

  function inset() {
    const cs = getComputedStyle(details);
    return (
      parseFloat(cs.paddingTop) +
      parseFloat(cs.paddingBottom) +
      parseFloat(cs.borderTopWidth) +
      parseFloat(cs.borderBottomWidth)
    );
  }

  details.addEventListener("toggle", () => {
    if (details.__anim) details.__anim.cancel();

    const collapsed = summary.offsetHeight + inset();
    const full = details.scrollHeight + inset();

    let from, to, duration;
    if (details.open) {
      from = collapsed;
      to = full;
      duration = 280;
      details.__full = full;
    } else {
      from = details.__full || full;
      to = collapsed;
      duration = 220;
    }

    details.style.overflow = "hidden";
    const anim = details.animate(
      { height: [from + "px", to + "px"] },
      { duration, easing: "cubic-bezier(0.4, 0, 0.2, 1)" }
    );
    details.__anim = anim;

    const cleanup = () => {
      details.style.height = "";
      details.style.overflow = "";
      if (details.__anim === anim) details.__anim = null;
    };
    anim.onfinish = cleanup;
    anim.oncancel = cleanup;
  });
}

document$.subscribe(() => {
  document.querySelectorAll("details").forEach(bindDetails);
});
