(function () {
  "use strict";

  var nextInput = document.getElementById("form-next");
  if (nextInput) {
    nextInput.value = window.location.origin + window.location.pathname + "?sent=1";
  }

  var params = new URLSearchParams(window.location.search);

  if (params.get("sent") === "1") {
    var status = document.getElementById("form-status");
    if (status) {
      status.hidden = false;
      status.className = "form-status form-status-success";
      status.textContent = getMessage();
      window.history.replaceState({}, "", window.location.pathname);
    }
  }

  function getMessage() {
    var lang = document.documentElement.lang || "en";
    var messages = {
      en: "Thank you — your message has been sent. We will get back to you soon.",
      fr: "Merci — votre message a été envoyé. Nous vous répondrons bientôt.",
      nl: "Bedankt — uw bericht is verzonden. We nemen snel contact met u op.",
      ar: "شكراً — تم إرسال رسالتك. سنتواصل معك قريباً."
    };
    return messages[lang] || messages.en;
  }
})();
