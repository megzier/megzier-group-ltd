const cdot = document.getElementById('cdot'), cring = document.getElementById('cring');
const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
if (!isTouch) {
  document.addEventListener('mousemove', e => {
    cdot.style.left = e.clientX + 'px'; cdot.style.top = e.clientY + 'px';
    setTimeout(() => { cring.style.left = e.clientX + 'px'; cring.style.top = e.clientY + 'px'; }, 85);
  });
} else {
  if (cdot) cdot.style.display = 'none';
  if (cring) cring.style.display = 'none';
  document.body.style.cursor = 'auto';
}

// ── TOPBAR & NAV ─────────────────────────────────
const nav = document.getElementById('nav');
const topbar = document.getElementById('topbar');
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const s = window.scrollY;
  nav.classList.toggle('scrolled', s > 60);
  document.getElementById('btop').classList.toggle('show', s > 500);
  
  lastScroll = s;
});

// ── MOBILE MENU ──────────────────────────────────
const ham = document.querySelector('.hamburger'), nl = document.querySelector('.nl');
ham?.addEventListener('click', () => {
  nl.classList.toggle('open');
  ham.classList.toggle('active');
  document.body.style.overflow = nl.classList.contains('open') ? 'hidden' : '';
});
nl?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nl.classList.remove('open');
  ham?.classList.remove('active');
  document.body.style.overflow = '';
}));

// ── BACK TOP ─────────────────────────────────────
document.getElementById('btop')?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ── REVEAL ───────────────────────────────────────
const robs = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) setTimeout(() => e.target.classList.add('in'), +e.target.dataset.d || 0);
}), { threshold: 0.11 });
document.querySelectorAll('.rv,.rv-l,.rv-r').forEach(el => robs.observe(el));

// ── COUNTERS ─────────────────────────────────────
const cobs = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting && !e.target.dataset.done) {
    e.target.dataset.done = 1;
    const target = +e.target.dataset.t, suf = e.target.dataset.s || '';
    let cur = 0; const step = target / (1800 / 16);
    const ti = setInterval(() => { cur += step; if (cur >= target) { cur = target; clearInterval(ti); } e.target.textContent = Math.floor(cur) + suf; }, 16);
  }
}), { threshold: 0.5 });
document.querySelectorAll('[data-t]').forEach(el => cobs.observe(el));

// ── FILTER ───────────────────────────────────────
document.querySelectorAll('.fb').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.fb').forEach(b => b.classList.remove('on'));
    btn.classList.add('on');
    const f = btn.dataset.f;
    document.querySelectorAll('[data-cat]').forEach(item => {
      const show = f === 'all' || item.dataset.cat === f;
      item.style.display = show ? 'block' : 'none';
      item.style.animation = show ? 'fadeIn .4s ease' : '';
    });
  });
});

// ── TYPING ───────────────────────────────────────
const te = document.querySelector('.typing');
if (te) {
  const words = ['Convert', 'Inspire', 'Grow', 'Dominate', 'Succeed'];
  let wi = 0, ci = 0, del = false;
  function type() {
    const w = words[wi];
    te.textContent = del ? w.substring(0, ci--) : w.substring(0, ci++);
    if (!del && ci > w.length) { del = true; setTimeout(type, 2400); return; }
    if (del && ci < 0) { del = false; wi = (wi + 1) % words.length; setTimeout(type, 400); return; }
    setTimeout(type, del ? 60 : 100);
  }
  type();
}

// ── WHATSAPP FORM ────────────────────────────────
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  var fname   = document.getElementById('cf_fname').value.trim();
  var lname   = document.getElementById('cf_lname').value.trim();
  var email   = document.getElementById('cf_email').value.trim();
  var phone   = document.getElementById('cf_phone').value.trim();
  var service = document.getElementById('cf_service').value.trim();
  var details = document.getElementById('cf_details').value.trim();
  var now     = new Date().toLocaleString('en-KE', {
    timeZone:'Africa/Nairobi', weekday:'long', year:'numeric',
    month:'long', day:'numeric', hour:'2-digit', minute:'2-digit'
  });
  var msg =
    '*NEW PROJECT INQUIRY*\n' +
    '*MEGZIER GROUP LTD*\n' +
    '=====================================\n\n' +
    '*CLIENT DETAILS*\n' +
    '- Name: ' + fname + ' ' + lname + '\n' +
    '- Email: ' + email + '\n' +
    '- Phone: ' + (phone || 'Not provided') + '\n\n' +
    '*SERVICE REQUESTED*\n' +
    '- ' + service + '\n\n' +
    '*PROJECT DETAILS*\n' +
    (details || 'No details provided.') + '\n\n' +
    '=====================================\n' +
    'Submitted: ' + now + '\n' +
    'Via: megzier.com';

  var btn     = document.getElementById('cf_submit');
  var btnText = document.getElementById('cf_btn_text');
  btnText.textContent = 'Opening WhatsApp...';
  btn.style.background = 'linear-gradient(135deg,#22C55E,#16A34A)';
  btn.disabled = true;

  var waURL = 'https://api.whatsapp.com/send?phone=254768651556&text=' + encodeURIComponent(msg);
  setTimeout(function() {
    window.location.href = waURL;
  }, 600);
});

// ── SMOOTH SCROLL ────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
  e.preventDefault();
  document.querySelector(a.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}));
