const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const money = n => 'R' + n.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/* Cart: saved in localStorage so it survives page changes */
const CART_KEY = 'dairypure-cart';
const Cart = {
  items() {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch { return []; }
  },
  save(items) {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    updateBadge();
  },
  change(id, delta) {
    const items = this.items();
    const line = items.find(i => i.id === id);
    const max = findProduct(id).stock;
    if (line) line.qty = Math.min(max, line.qty + delta);
    else if (delta > 0 && max > 0) items.push({ id, qty: 1 });
    this.save(items.filter(i => i.qty > 0));
  },
  clear() { this.save([]); },
  count() { return this.items().reduce((n, i) => n + i.qty, 0); },
  total() { return this.items().reduce((sum, i) => sum + findProduct(i.id).price * i.qty, 0); }
};

function updateBadge() {
  $$('[data-cart-count]').forEach(el => { el.textContent = Cart.count(); });
}

/* Mobile menu */
const menuButton = $('.menu-btn');
menuButton.addEventListener('click', () => {
  const open = $('#menu').classList.toggle('open');
  menuButton.setAttribute('aria-expanded', open);
});

/* Footer year */
$$('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });

/* Count-up numbers, run once when scrolled into view */
const observer = new IntersectionObserver(entries => entries.forEach(({ target, isIntersecting }) => {
  if (!isIntersecting) return;
  observer.unobserve(target);
  const end = +target.dataset.count;
  const start = performance.now();
  const tick = now => {
    const t = Math.min((now - start) / 1200, 1);
    target.textContent = Math.round(end * (1 - (1 - t) ** 3)).toLocaleString('en-ZA');
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}));

if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  $$('[data-count]').forEach(el => { el.textContent = '0'; observer.observe(el); });
}

updateBadge();
