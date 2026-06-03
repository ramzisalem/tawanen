(function () {
  "use strict";

  var LANGS = ["en", "fr", "nl", "ar"];
  var RTL_LANGS = ["ar"];
  var DEFAULT_LANG = "en";
  var translations = {};
  var currentLang = DEFAULT_LANG;

  function getStoredLang() {
    try {
      return localStorage.getItem("tawanen-lang");
    } catch (e) {
      return null;
    }
  }

  function storeLang(lang) {
    try {
      localStorage.setItem("tawanen-lang", lang);
    } catch (e) { /* ignore */ }
  }

  function loadTranslations(lang) {
    return fetch("assets/i18n/" + lang + ".json")
      .then(function (res) {
        if (!res.ok) throw new Error("Failed to load " + lang);
        return res.json();
      })
      .then(function (data) {
        translations[lang] = data;
        return data;
      });
  }

  function t(key) {
    var data = translations[currentLang];
    return (data && data[key]) || translations[DEFAULT_LANG][key] || key;
  }

  function applyTranslations() {
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      var value = t(key);
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
        el.placeholder = value;
      } else {
        el.textContent = value;
      }
    });

    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      el.innerHTML = t(el.getAttribute("data-i18n-html"));
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      el.placeholder = t(el.getAttribute("data-i18n-placeholder"));
    });

    document.querySelectorAll("option[data-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n"));
    });

    var titleKey = document.body.getAttribute("data-page-title");
    if (titleKey) {
      document.title = t(titleKey) + " — Tawanen";
    }

    var descKey = document.body.getAttribute("data-page-desc");
    if (descKey) {
      var metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.content = t(descKey);
    }

    document.documentElement.lang = currentLang;
    document.documentElement.dir = RTL_LANGS.indexOf(currentLang) !== -1 ? "rtl" : "ltr";
  }

  function updateSwitcher() {
    document.querySelectorAll(".lang-select").forEach(function (select) {
      select.value = currentLang;
    });
  }

  function setLanguage(lang) {
    if (LANGS.indexOf(lang) === -1) return;

    var apply = function () {
      currentLang = lang;
      storeLang(lang);
      applyTranslations();
      updateSwitcher();
    };

    if (translations[lang]) {
      apply();
    } else {
      loadTranslations(lang).then(apply);
    }
  }

  function initSwitcher() {
    document.querySelectorAll(".lang-select").forEach(function (select) {
      select.addEventListener("change", function () {
        setLanguage(select.value);
      });
    });
  }

  function init() {
    var stored = getStoredLang();
    var initial = stored && LANGS.indexOf(stored) !== -1 ? stored : DEFAULT_LANG;

    loadTranslations(DEFAULT_LANG)
      .then(function () {
        if (initial !== DEFAULT_LANG) {
          return loadTranslations(initial);
        }
      })
      .then(function () {
        currentLang = initial;
        applyTranslations();
        updateSwitcher();
        initSwitcher();
      })
      .catch(function () {
        initSwitcher();
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.TawanenI18n = { setLanguage: setLanguage, t: t };
})();
