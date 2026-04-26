// v17e: All viewports use slice (fill container, clip sides) so sky backdrop
// never shows as a letterbox gap above/below scene content.
// 18th & Vine left-anchors on mobile+medium to keep Parker Memorial in frame.
//
//   mobile (<=640px):     xMinYMax slice       — vine: left-anchor keeps Parker
//                         xMidYMax slice       — all others: centered
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
      if ((isMobile || isMedium) && svg.classList.contains('vine-hero-svg')) {
        // 18th & Vine has key content on the far left (Parker, sign building).
        // Left-anchor so clipping takes from the right (far YMCA edge) rather
        // than the left — on both mobile and medium widths.
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
