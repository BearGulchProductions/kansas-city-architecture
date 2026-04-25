// v17d: On narrow viewports, swap signature-scene SVGs from
// preserveAspectRatio="xMidYMid slice" (fills container, clips sides) to
// "xMidYMid meet" (fits entire viewBox inside container with small letterbox).
// Ensures mobile users see the full left/right details of fountain & scene pages.
//
// Three-mode logic (added for 18th & Vine left-clip fix):
//   mobile (<=640px):     xMidYMid meet       — full scene, letterbox
//   medium (641-900px):   xMinYMax slice       — vine only: left-anchor keeps Parker
//                         xMidYMax slice       — all others: centered
//   desktop (>900px):     xMidYMax slice       — centered, bottom-anchored
(function () {
  'use strict';
  var MOBILE_BREAKPOINT = 640;
  var MEDIUM_BREAKPOINT = 900;
  var SELECTOR = [
    '.nichols-hero-svg',
    '.meyer-hero-svg',
    '.bacchus-hero-svg',
    '.pomona-hero-svg',
    '.volker-hero-svg',
    '.firefighters-hero-svg',
    '.fountain-day-svg',
    '.midtown-hero-svg',
    '.vine-hero-svg',
    '.westbottoms-hero-svg',
    '.crossroads-hero-svg'
  ].join(',');

  function applyAspectMode() {
    var svgs = document.querySelectorAll(SELECTOR);
    var isMobile = window.innerWidth <= MOBILE_BREAKPOINT;
    var isMedium = !isMobile && window.innerWidth <= MEDIUM_BREAKPOINT;
    svgs.forEach(function (svg) {
      var mode;
      if (isMobile) {
        mode = 'xMidYMid meet';
      } else if (isMedium && svg.classList.contains('vine-hero-svg')) {
        // 18th & Vine has key content on the far left (Parker, sign building).
        // Left-anchor so medium-width clipping takes from the right (far YMCA
        // edge) rather than the left.
        mode = 'xMinYMax slice';
      } else {
        mode = 'xMidYMax slice';
      }
      if (svg.getAttribute('preserveAspectRatio') !== mode) {
        svg.setAttribute('preserveAspectRatio', mode);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyAspectMode);
  } else {
    applyAspectMode();
  }

  // Throttled resize handler so rotations + browser chrome toggles stay in sync
  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(applyAspectMode, 150);
  });
})();
