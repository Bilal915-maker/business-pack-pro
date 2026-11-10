/* =========================================================================
   Remplacement des variables {{CLE}} par les valeurs de config.js.
   - Si une valeur est renseignée : le texte est inséré.
   - Si elle est vide : le jeton {{CLE}} reste visible et surligné (classe
     .ph-empty) pour signaler ce qu'il reste à compléter.
   Gère aussi le <title>, les <meta>, et les liens d'achat (data-buy-link).
   Fonctionne sans dépendance, au chargement de la page.
   ========================================================================= */
(function () {
  "use strict";
  var CONFIG = window.SITE_CONFIG || {};
  var TOKEN = /\{\{\s*([A-Z0-9_]+)\s*\}\}/g;

  function valueFor(key) {
    return Object.prototype.hasOwnProperty.call(CONFIG, key) ? CONFIG[key] : undefined;
  }

  /* Remplacement dans une chaîne simple (titre, meta, attributs) :
     une valeur vide ou inconnue laisse le jeton tel quel. */
  function replacePlain(str) {
    return str.replace(TOKEN, function (m, key) {
      var v = valueFor(key);
      return (v === undefined || v === "") ? m : v;
    });
  }

  /* Remplacement dans un nœud texte, avec surlignage des valeurs manquantes.
     Renvoie un fragment si un remplacement a eu lieu, sinon null. */
  function replaceInTextNode(node) {
    var text = node.nodeValue;
    if (text.indexOf("{{") === -1) return null;
    TOKEN.lastIndex = 0;
    var frag = document.createDocumentFragment();
    var last = 0, m, changed = false;
    while ((m = TOKEN.exec(text)) !== null) {
      var key = m[1], v = valueFor(key);
      if (m.index > last) frag.appendChild(document.createTextNode(text.slice(last, m.index)));
      if (v === undefined || v === "") {
        var span = document.createElement("span");
        span.className = "ph-empty";
        span.setAttribute("title", "Valeur à compléter dans js/config.js : " + key);
        span.textContent = m[0];
        frag.appendChild(span);
      } else {
        frag.appendChild(document.createTextNode(v));
      }
      last = m.index + m[0].length;
      changed = true;
    }
    if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
    return changed ? frag : null;
  }

  function walk(root) {
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        var p = n.parentNode;
        if (!p) return NodeFilter.FILTER_REJECT;
        var tag = p.nodeName;
        if (tag === "SCRIPT" || tag === "STYLE") return NodeFilter.FILTER_REJECT;
        return n.nodeValue.indexOf("{{") !== -1 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    var nodes = [], n;
    while ((n = walker.nextNode())) nodes.push(n);
    nodes.forEach(function (node) {
      var frag = replaceInTextNode(node);
      if (frag && node.parentNode) node.parentNode.replaceChild(frag, node);
    });
  }

  function run() {
    // 1) Titre & métadonnées
    if (document.title) document.title = replacePlain(document.title);
    var metas = document.querySelectorAll('meta[name="description"], meta[property="og:title"], meta[property="og:description"], meta[property="og:site_name"]');
    metas.forEach(function (el) {
      var c = el.getAttribute("content");
      if (c) el.setAttribute("content", replacePlain(c));
    });

    // 2) Attributs textuels (alt, aria-label, title, placeholder, content…)
    //    Valeur vide : le jeton reste tel quel (un attribut ne peut pas être surligné).
    var ATTRS = ["alt", "aria-label", "title", "placeholder", "value", "content"];
    ATTRS.forEach(function (attr) {
      document.querySelectorAll("[" + attr + "*='{{']").forEach(function (el) {
        el.setAttribute(attr, replacePlain(el.getAttribute(attr)));
      });
    });

    // 3) Corps visible
    walk(document.body);

    // 3) Liens d'achat -> LIEN_ACHAT (ou désactivés si non renseigné)
    var buy = valueFor("LIEN_ACHAT");
    document.querySelectorAll("[data-buy-link]").forEach(function (a) {
      if (buy) {
        a.setAttribute("href", buy);
        a.setAttribute("rel", "noopener");
        a.setAttribute("target", "_blank");
        a.removeAttribute("aria-disabled");
      } else {
        a.setAttribute("href", "#");
        a.setAttribute("aria-disabled", "true");
        a.setAttribute("title", "Lien d'achat à renseigner dans js/config.js (LIEN_ACHAT)");
        a.addEventListener("click", function (e) {
          e.preventDefault();
          alert("Le lien d'achat n'est pas encore configuré.\nRenseigne LIEN_ACHAT dans js/config.js.");
        });
      }
    });

    // 4) Liens e-mail de contact -> EMAIL
    var email = valueFor("EMAIL");
    document.querySelectorAll("[data-email-link]").forEach(function (a) {
      if (email) {
        a.setAttribute("href", "mailto:" + email);
        a.textContent = email;
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
})();
