(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  var lightbox = document.getElementById('photo-lightbox');
  if (lightbox) {
    var closeLightbox = function () {
      lightbox.setAttribute('hidden', '');
      var trigger = document.querySelector('[data-reveal-target="photo-lightbox"]');
      if (trigger) {
        trigger.setAttribute('aria-expanded', 'false');
      }
    };
    lightbox.addEventListener('click', closeLightbox);
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !lightbox.hasAttribute('hidden')) {
        closeLightbox();
      }
    });
  }

  var revealTriggers = document.querySelectorAll('[data-reveal-target]');
  Array.prototype.forEach.call(revealTriggers, function (trigger) {
    var panel = document.getElementById(trigger.getAttribute('data-reveal-target'));
    if (!panel) {
      return;
    }
    trigger.addEventListener('click', function (event) {
      event.preventDefault();
      var willShow = panel.hasAttribute('hidden');
      if (willShow) {
        panel.removeAttribute('hidden');
      } else {
        panel.setAttribute('hidden', '');
      }
      trigger.setAttribute('aria-expanded', willShow ? 'true' : 'false');
    });
  });

  var copyButtons = document.querySelectorAll('.btn-copy');
  Array.prototype.forEach.call(copyButtons, function (button) {
    button.addEventListener('click', function () {
      var value = button.getAttribute('data-copy') || '';
      var markCopied = function () {
        button.textContent = '¡Copiado!';
        window.setTimeout(function () {
          button.textContent = 'Copiar';
        }, 2000);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(value).then(markCopied);
      } else {
        var temp = document.createElement('textarea');
        temp.value = value;
        temp.setAttribute('readonly', '');
        temp.style.position = 'absolute';
        temp.style.left = '-9999px';
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
        markCopied();
      }
    });
  });

  var revealEls = Array.prototype.slice.call(document.querySelectorAll('.reveal'));

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach(function (el) {
    observer.observe(el);
  });
})();
