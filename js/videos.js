(function () {
  "use strict";

  var EMBED_PARAMS = "rel=0&modestbranding=1";

  function createEmbed(videoId, title) {
    var wrap = document.createElement("div");
    wrap.className = "video-embed";
    var iframe = document.createElement("iframe");
    iframe.src = "https://www.youtube.com/embed/" + videoId + "?" + EMBED_PARAMS;
    iframe.title = title || "Tawanen video";
    iframe.loading = "lazy";
    iframe.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;
    wrap.appendChild(iframe);
    return wrap;
  }

  function createCard(video) {
    var card = document.createElement("article");
    card.className = "video-card reveal";
    card.appendChild(createEmbed(video.id, video.title));
    if (video.title) {
      var heading = document.createElement("h3");
      heading.className = "video-card-title";
      heading.textContent = video.title;
      card.appendChild(heading);
    }
    return card;
  }

  function renderGrid(container, videos) {
    container.innerHTML = "";
    var grid = document.createElement("div");
    grid.className = "video-grid";
    videos.forEach(function (video) {
      grid.appendChild(createCard(video));
    });
    container.appendChild(grid);
  }

  function renderFeatured(container, video) {
    container.innerHTML = "";
    container.appendChild(createEmbed(video.id, video.title));
  }

  function init() {
    fetch("assets/videos.json")
      .then(function (res) {
        if (!res.ok) throw new Error("Failed to load videos");
        return res.json();
      })
      .then(function (data) {
        var videos = data.videos || [];
        if (!videos.length) return;

        document.querySelectorAll("[data-video-grid]").forEach(function (el) {
          renderGrid(el, videos);
        });

        document.querySelectorAll("[data-video-featured]").forEach(function (el) {
          var id = el.getAttribute("data-video-id");
          var video = videos.find(function (v) {
            return v.id === id;
          }) || videos[0];
          renderFeatured(el, video);
        });

        document.querySelectorAll("[data-youtube-channel]").forEach(function (el) {
          el.href = data.channelUrl;
        });

        if (window.TawanenMain && window.TawanenMain.initReveal) {
          window.TawanenMain.initReveal();
        }
      })
      .catch(function () {
        /* fallback: keep static iframes in HTML */
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
