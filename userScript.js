// Remote navigation: arrow keys move focus between clickable things, OK clicks,
// Back goes back a page.
(function () {
  const style = document.createElement('style');
  style.textContent = ':focus { outline: 4px solid #4da3ff !important; outline-offset: 2px; }';
  document.head.appendChild(style);

  function focusable() {
    return [...document.querySelectorAll('a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])')]
      .filter(el => el.offsetParent !== null && !el.disabled);
  }

  document.addEventListener('keydown', (e) => {
    const items = focusable();
    if (!items.length) return;
    let i = items.indexOf(document.activeElement);

    switch (e.keyCode) {
      case 39: case 40: i = Math.min(i + 1, items.length - 1); break; // right / down
      case 37: case 38: i = Math.max(i - 1, 0); break;                 // left / up
      case 13: if (document.activeElement) document.activeElement.click(); return; // OK
      case 10009: history.back(); e.preventDefault(); return;          // Back
      default: return;
    }
    e.preventDefault();
    items[i].focus();
    items[i].scrollIntoView({ block: 'center', behavior: 'smooth' });
  }, true);
})();
