/* =========================================================================
   Interactions : navigation mobile, galerie produit, validation du
   formulaire de contact, bandeau cookies. Sans dépendance.
   ========================================================================= */
(function () {
  "use strict";

  /* ---------------------------------------------------------------
     1) Navigation mobile (accessible : aria-expanded + touche Échap)
     --------------------------------------------------------------- */
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("nav-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      menu.classList.toggle("is-open", !open);
    });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        toggle.setAttribute("aria-expanded", "false");
        menu.classList.remove("is-open");
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        toggle.setAttribute("aria-expanded", "false");
        menu.classList.remove("is-open");
        toggle.focus();
      }
    });
  }

  /* ---------------------------------------------------------------
     2) Galerie produit (vignettes -> image principale, clavier OK)
     --------------------------------------------------------------- */
  var mainImg = document.getElementById("gallery-main-img");
  var thumbs = document.querySelectorAll(".gallery-thumb");
  if (mainImg && thumbs.length) {
    thumbs.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var src = btn.getAttribute("data-full");
        var alt = btn.getAttribute("data-alt") || "";
        if (src) { mainImg.setAttribute("src", src); mainImg.setAttribute("alt", alt); }
        thumbs.forEach(function (b) { b.setAttribute("aria-current", "false"); });
        btn.setAttribute("aria-current", "true");
      });
    });
  }

  /* ---------------------------------------------------------------
     3) Formulaire de contact — validation côté client + repli mailto
     --------------------------------------------------------------- */
  var form = document.getElementById("contact-form");
  if (form) {
    var status = document.getElementById("form-status");

    var setError = function (field, msg) {
      var input = form.elements[field];
      if (!input) return;
      var box = document.getElementById("err-" + field);
      input.setAttribute("aria-invalid", msg ? "true" : "false");
      if (box) box.textContent = msg || "";
    };

    var isEmail = function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); };

    var validate = function () {
      var ok = true, firstBad = null;
      var v = {
        nom: form.elements.nom.value.trim(),
        email: form.elements.email.value.trim(),
        sujet: form.elements.sujet.value,
        message: form.elements.message.value.trim(),
        consent: form.elements.consent.checked
      };
      if (v.nom.length < 2) { setError("nom", "Indique ton nom (2 caractères minimum)."); ok = false; firstBad = firstBad || "nom"; }
      else setError("nom", "");

      if (!isEmail(v.email)) { setError("email", "Indique une adresse e-mail valide."); ok = false; firstBad = firstBad || "email"; }
      else setError("email", "");

      if (!v.sujet) { setError("sujet", "Choisis un sujet."); ok = false; firstBad = firstBad || "sujet"; }
      else setError("sujet", "");

      if (v.message.length < 10) { setError("message", "Ton message doit faire au moins 10 caractères."); ok = false; firstBad = firstBad || "message"; }
      else setError("message", "");

      if (!v.consent) { setError("consent", "Tu dois accepter le traitement de ta demande."); ok = false; firstBad = firstBad || "consent"; }
      else setError("consent", "");

      return { ok: ok, firstBad: firstBad, data: v };
    };

    // Validation à la volée une fois le champ quitté
    ["nom", "email", "sujet", "message", "consent"].forEach(function (name) {
      var el = form.elements[name];
      if (el) el.addEventListener("blur", validate);
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var res = validate();
      if (status) { status.className = "form-status"; status.textContent = ""; }

      if (!res.ok) {
        if (status) {
          status.className = "form-status ko show";
          status.textContent = "Merci de corriger les champs signalés avant d'envoyer.";
        }
        if (res.firstBad && form.elements[res.firstBad]) form.elements[res.firstBad].focus();
        return;
      }

      // Pas de backend branché : on ouvre le client mail de l'utilisateur.
      // (Remplaçable par un vrai endpoint — voir README.)
      var cfg = window.SITE_CONFIG || {};
      var to = cfg.EMAIL || "";
      var subject = "[Contact site] " + res.data.sujet + " — " + res.data.nom;
      var body =
        "Nom : " + res.data.nom + "\n" +
        "E-mail : " + res.data.email + "\n" +
        "Sujet : " + res.data.sujet + "\n\n" +
        res.data.message + "\n";

      if (status) {
        status.className = "form-status ok show";
        if (to) {
          status.innerHTML = "Ton logiciel de messagerie va s'ouvrir avec le message pré-rempli. " +
            "Si rien ne s'ouvre, écris directement à <a href=\"mailto:" + to + "\">" + to + "</a>.";
          window.location.href = "mailto:" + to +
            "?subject=" + encodeURIComponent(subject) +
            "&body=" + encodeURIComponent(body);
        } else {
          status.className = "form-status ko show";
          status.textContent = "Adresse de contact non configurée (EMAIL dans js/config.js). Le message n'a pas pu être préparé.";
        }
      }
      form.reset();
    });
  }

  /* ---------------------------------------------------------------
     4) Bandeau cookies (information + mémorisation du choix)
     Aucun cookie/traceur tiers n'est posé par le site : le bandeau
     informe et enregistre uniquement le choix dans localStorage.
     --------------------------------------------------------------- */
  var banner = document.getElementById("cookie-banner");
  if (banner) {
    var KEY = "cookie-choix";
    var choice = null;
    try { choice = localStorage.getItem(KEY); } catch (e) {}
    if (!choice) banner.classList.add("show");
    banner.querySelectorAll("[data-cookie]").forEach(function (b) {
      b.addEventListener("click", function () {
        try { localStorage.setItem(KEY, b.getAttribute("data-cookie")); } catch (e) {}
        banner.classList.remove("show");
      });
    });
  }

  /* ---------------------------------------------------------------
     5) Année courante dans le pied de page (repli si config absente)
     --------------------------------------------------------------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
