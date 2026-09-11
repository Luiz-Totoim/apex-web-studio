const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const navToggle = document.getElementById('navToggle');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    const isOpen = document.querySelector('.nav-links').classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

document.querySelectorAll('.faq-item').forEach(item => {
  const question = item.querySelector('.faq-q');
  question.addEventListener('click', () => {
    const wasOpen = item.classList.contains('is-open');
    document.querySelectorAll('.faq-item.is-open').forEach(el => {
      el.classList.remove('is-open');
      el.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
    });
    item.classList.toggle('is-open', !wasOpen);
    question.setAttribute('aria-expanded', String(!wasOpen));
  });
});

document.querySelectorAll('.command-badge[data-copy]').forEach(badge => {
  badge.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(badge.dataset.copy);
      badge.classList.add('is-copied');
      setTimeout(() => badge.classList.remove('is-copied'), 1500);
    } catch (err) {}
    window.open(badge.href, '_blank');
  });
});

const contactForm = document.getElementById('contactForm');
if (contactForm) {
  const WHATSAPP_NUMBER = '5561999654140';

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const segment = document.getElementById('segment').value;
    const message = document.getElementById('message').value.trim();

    const lines = [
      '*Novo contato do site - Apex Web Studio*',
      '',
      `*Nome:* ${name}`,
      `*Telefone:* ${phone}`,
      `*E-mail:* ${email}`,
      `*Tipo de negócio:* ${segment}`,
    ];
    if (message) lines.push(`*Mensagem:* ${message}`);

    const text = encodeURIComponent(lines.join('\n'));
    document.getElementById('formSuccess').classList.add('is-visible');

    setTimeout(() => {
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank', 'noopener');
      contactForm.reset();
    }, 500);
  });
}
