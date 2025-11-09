export function initCustomCursor() {
  const cursorDot = document.createElement('div');
  cursorDot.className = 'custom-cursor';
  document.body.appendChild(cursorDot);

  document.addEventListener('mousemove', (e) => {
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
  });

  // Make cursor slightly transparent on hover of buttons only
  document.addEventListener('mouseover', (e) => {
    if (
      e.target.tagName === 'BUTTON' ||
      e.target.tagName === 'SELECT' ||
      e.target.tagName === 'INPUT'
    ) {
      cursorDot.style.opacity = '0.3';
    } else {
      cursorDot.style.opacity = '1';
    }
  });

  document.addEventListener('mouseout', (e) => {
    cursorDot.style.opacity = '1';
  });
}
