const state = { q: '', sort: 'name', category: 'all' };
const requested = new URLSearchParams(location.search).get('category');
if (requested in CATEGORIES) state.category = requested;

const grid = $('#grid');
const box = $('#lightbox');
const sorters = {
  name: (a, b) => a.name.localeCompare(b.name),
  low: (a, b) => a.price - b.price,
  high: (a, b) => b.price - a.price
};

const card = p => `
  <article class="card">
    <button class="thumb" data-zoom="${p.id}" aria-label="Enlarge ${p.name}">
      <img src="${p.image}" alt="${p.alt}" width="400" height="400" loading="lazy">
    </button>
    <h3>${p.name}</h3>
    <p>${p.desc}</p>
    <div class="row"><strong>${money(p.price)}</strong><span class="muted">${p.unit}</span></div>
    ${p.stock > 0 && p.stock < 10 ? `<span class="flag">Only ${p.stock} left</span>` : ''}
    <button class="btn" data-add="${p.id}" ${p.stock ? '' : 'disabled'}>${p.stock ? 'Add to cart' : 'Sold out'}</button>
  </article>`;

function renderChips() {
  $('#chips').innerHTML = Object.entries(CATEGORIES).map(([key, label]) =>
    `<button class="chip" data-category="${key}" aria-pressed="${key === state.category}">${label}</button>`).join('');
}

function renderGrid() {
  const list = PRODUCTS
    .filter(p => (state.category === 'all' || p.category === state.category) && `${p.name} ${p.desc}`.toLowerCase().includes(state.q))
    .sort(sorters[state.sort]);
  grid.innerHTML = list.map(card).join('') || '<p class="empty">No products match. Try another search or category.</p>';
  $('#count').textContent = `${list.length} product${list.length === 1 ? '' : 's'}`;
}

function renderCart() {
  const items = Cart.items();
  $('#cart-items').innerHTML = items.map(({ id, qty }) => {
    const p = findProduct(id);
    return `<li>
      <span>${p.name}<small>${money(p.price)} each</small></span>
      <span class="qty">
        <button data-dec="${id}" aria-label="Remove one ${p.name}">−</button>${qty}
        <button data-inc="${id}" aria-label="Add one ${p.name}" ${qty >= p.stock ? 'disabled' : ''}>+</button>
      </span>
    </li>`;
  }).join('') || '<li class="empty">Your cart is empty.</li>';
  $('#cart-total').textContent = money(Cart.total());
  $('#cart-actions').hidden = !items.length;
}

function openLightbox(id) {
  const p = findProduct(id);
  $('img', box).src = p.image;
  $('img', box).alt = p.alt;
  $('figcaption', box).textContent = `${p.name}, ${p.unit}. ${p.desc}`;
  box.showModal();
}

$('#search').addEventListener('input', e => { state.q = e.target.value.toLowerCase().trim(); renderGrid(); });
$('#sort').addEventListener('change', e => { state.sort = e.target.value; renderGrid(); });
box.addEventListener('click', e => { if (e.target === box || e.target.dataset.close !== undefined) box.close(); });

document.addEventListener('click', ({ target }) => {
  const el = target.closest('[data-add],[data-inc],[data-dec],[data-zoom],[data-category],#clear');
  if (!el) return;
  const { add, inc, dec, zoom, category } = el.dataset;
  if (add || inc) Cart.change(add || inc, 1);
  else if (dec) Cart.change(dec, -1);
  else if (el.id === 'clear') Cart.clear();
  else if (category) { state.category = category; renderChips(); renderGrid(); }
  else if (zoom) openLightbox(zoom);
  renderCart();
});

renderChips();
renderGrid();
renderCart();
