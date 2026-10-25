/* Nayagarh portal — shared behaviour: mobile menu, AOS, contact form, photo lightbox */
(function () {
  // mobile menu
  var nav = document.querySelector('.navbar');
  var toggle = document.querySelector('.nav-toggle');
  if (nav && toggle) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelector('.nav-links').addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') nav.classList.remove('open');
    });
  }

  // scroll animations (AOS, same library Baripada uses)
  if (window.AOS) {
    // stacked layouts on tablets/phones: slide up instead of sideways so the page never gets wider than the screen
    if (window.matchMedia('(max-width: 900px)').matches) {
      document.querySelectorAll('[data-aos="fade-left"], [data-aos="fade-right"]').forEach(function (el) {
        el.setAttribute('data-aos', 'fade-up');
      });
    }
    AOS.init({
      duration: 850,
      offset: 70,
      disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches
    });
  }

  // contact form (front-end only — shows a thank-you message)
  var form = document.querySelector('#contact form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = document.querySelector('.thanks');
      var name = (form.querySelector('input[type=text]').value || '').trim().split(' ')[0];
      if (msg) {
        msg.textContent = 'Thank you' + (name ? ', ' + name : '') + '! Your message has been noted.';
        msg.classList.add('show');
      }
      form.reset();
    });
  }

  // photo lightbox for gallery images
  var box = document.createElement('div');
  box.id = 'lightbox';
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-label', 'Photo viewer');
  box.innerHTML = '<img alt="">';
  document.body.appendChild(box);
  var big = box.querySelector('img');
  document.addEventListener('click', function (e) {
    var t = e.target;
    if (t.classList && t.classList.contains('gallery-img')) {
      big.src = t.src;
      big.alt = t.alt || '';
      box.classList.add('open');
    } else if (box.classList.contains('open')) {
      box.classList.remove('open');
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') box.classList.remove('open');
  });
})();
