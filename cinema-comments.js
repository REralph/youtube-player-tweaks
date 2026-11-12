// Adds a "Comments" button to the left of the Auto-play switch.
// In cinema (theater) mode it opens the comments as a panel on the right of the video.
(() => {
  const BTN_ID = 'ytpt-comments-btn';
  const OPEN = 'ytpt-comments-open';
  const THEATER = 'ytpt-theater';
  const html = document.documentElement;
  const SVG_NS = 'http://www.w3.org/2000/svg';
  // Speech-bubble icon (built without innerHTML: YouTube blocks raw HTML strings)
  const ICON = 'M6 9h24a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H14l-6 5v-5H6a2 2 0 0 1-2-2V11a2 2 0 0 1 2-2zm4 6v2h16v-2zm0 4v2h11v-2z';

  const isOpen = () => html.classList.contains(OPEN);

  function isTheater() {
    const flexy = document.querySelector('ytd-watch-flexy');
    return !!flexy && location.pathname === '/watch' &&
      flexy.hasAttribute('theater') && !document.fullscreenElement;
  }

  function setOpen(open) {
    if (open === isOpen()) return;
    html.classList.toggle(OPEN, open);
    const btn = document.getElementById(BTN_ID);
    if (btn) btn.setAttribute('aria-pressed', String(open));
    placePanel();
    // Let the player re-measure its new width (twice: once now, once after layout settles)
    window.dispatchEvent(new Event('resize'));
    setTimeout(() => window.dispatchEvent(new Event('resize')), 150);
  }

  function makeButton() {
    const btn = document.createElement('button');
    btn.id = BTN_ID;
    btn.className = 'ytp-button';
    btn.title = 'Comments';
    btn.setAttribute('aria-label', 'Show comments beside the video');
    btn.setAttribute('aria-pressed', 'false');
    const svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('viewBox', '0 0 36 36');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    const path = document.createElementNS(SVG_NS, 'path');
    path.setAttribute('d', ICON);
    svg.appendChild(path);
    btn.appendChild(svg);
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      setOpen(!isOpen());
    });
    return btn;
  }

  function addButton() {
    if (document.getElementById(BTN_ID)) return;
    const autoplay = document.querySelector('#movie_player .ytp-autonav-toggle');
    if (autoplay && autoplay.parentElement) {
      autoplay.parentElement.insertBefore(makeButton(), autoplay);
      return;
    }
    const right = document.querySelector('#movie_player .ytp-right-controls');
    if (right) right.insertBefore(makeButton(), right.firstChild);
  }

  // Line the panel's top up with the top of the video (never under the YouTube header)
  function placePanel() {
    if (!isOpen()) return;
    const player = document.querySelector('ytd-watch-flexy #full-bleed-container');
    const header = document.querySelector('#masthead-container');
    const headerBottom = header ? header.getBoundingClientRect().bottom : 56;
    const top = player ? Math.max(headerBottom, player.getBoundingClientRect().top) : headerBottom;
    html.style.setProperty('--ytpt-panel-top', Math.round(top) + 'px');
  }

  function tick() {
    const theater = isTheater();
    html.classList.toggle(THEATER, theater);
    if (!theater) setOpen(false);       // leaving cinema mode closes the panel
    addButton();
    placePanel();
  }

  setInterval(tick, 500);
  window.addEventListener('scroll', placePanel, { passive: true });
  document.addEventListener('fullscreenchange', tick);
  window.addEventListener('yt-navigate-finish', tick);
  tick();
})();
