(function () {
  "use strict";

  function initHeroVideo() {
    var video = document.querySelector(".hero-video-wrap video");
    if (!video) return;

    var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    function handleMotion() {
      if (reducedMotion.matches) {
        video.pause();
        video.removeAttribute("autoplay");
      } else {
        video.play().catch(function () { /* autoplay blocked */ });
      }
    }

    handleMotion();
    reducedMotion.addEventListener("change", handleMotion);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initHeroVideo);
  } else {
    initHeroVideo();
  }
})();
