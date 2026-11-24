const ENDPOINT = 'https://jsonplaceholder.typicode.com/posts';
const MAIL_TO = 'info@dairypurefarms.co.za';
const FREE_DELIVERY_FROM = 500;
const DELIVERY_FEE = 65;

/* Each rule returns true, or the error message to show */
const rules = {
  name: v => v.trim().length >= 2 || 'Enter your full name.',
  email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Enter a valid email, like name@example.com.',
  phone: v => /^(\+27|0)[1-9]\d{8}$/.test(v.replace(/[\s-]/g, '')) || 'Enter a South African number, like 082 123 4567.',
  product: v => !!v || 'Choose a product.',
  quantity: v => (Number.isInteger(+v) && +v >= 1 && +v <= 500) || 'Enter a whole number from 1 to 500.',
  date: v => !v || v >= new Date().toISOString().slice(0, 10) || 'Choose today or a later date.',
  topic: v => !!v || 'Choose a topic.',
  message: v => v.trim().length >= 10 || 'Write at least 10 characters.'
};

function check(el) {
  const result = rules[el.dataset.rule](el.value);
  const valid = result === true;
  el.setAttribute('aria-invalid', !valid);
  $('.error', el.closest('.field')).textContent = valid ? '' : result;
  return valid;
}

function bindForm(form, onValid) {
  form.noValidate = true;
  form.addEventListener('focusout', ({ target }) => target.dataset.rule && check(target));
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const fields = $$('[data-rule]', form).filter(el => !el.closest('[hidden]'));
    if (fields.map(check).includes(false)) return $('[aria-invalid="true"]', form).focus();
    const button = $('button[type="submit"]', form);
    button.disabled = true;
    try {
      await onValid(Object.fromEntries(new FormData(form)));
    } catch {
      $('.status', form).textContent = 'Something went wrong. Check your connection and try again.';
      button.disabled = false;
    }
  });
}

function showResult(form) {
  const out = $('#result');
  form.hidden = true;
  out.hidden = false;
  out.focus();
  return out;
}

/* Sends the form data in the background (AJAX) without reloading the page */
async function send(payload) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error('Request failed');
}

/* Enquiry: validates, then answers with cost and availability */
const enquiry = $('#enquiry-form');
if (enquiry) {
  const cartItems = Cart.items();
  const select = $('#product');
  select.innerHTML += PRODUCTS.map(p => `<option value="${p.id}">${p.name}, ${p.unit} (${money(p.price)})</option>`).join('');
  select.value = new URLSearchParams(location.search).get('product') || '';

  if (cartItems.length) {
    $('#single').hidden = true;
    $('#cart-summary').hidden = false;
    $('#cart-lines').innerHTML = cartItems.map(({ id, qty }) =>
      `<li><span>${findProduct(id).name} × ${qty}</span><span>${money(findProduct(id).price * qty)}</span></li>`).join('');
  }

  bindForm(enquiry, async data => {
    const items = cartItems.length ? cartItems : [{ id: data.product, qty: +data.quantity }];
    const ref = 'DPF-' + Date.now().toString(36).toUpperCase();
    await send({ ref, ...data, items });

    const lines = items.map(({ id, qty }) => ({ p: findProduct(id), qty }));
    const subtotal = lines.reduce((sum, { p, qty }) => sum + p.price * qty, 0);
    const delivery = subtotal >= FREE_DELIVERY_FROM ? 0 : DELIVERY_FEE;
    const availability = ({ p, qty }) =>
      p.stock === 0 ? 'Out of stock, we will confirm a date' : qty > p.stock ? `Only ${p.stock} available now` : 'In stock';

    const out = showResult(enquiry);
    out.innerHTML = `
      <h2>Thank you, <span data-who></span>.</h2>
      <p class="muted">Quote reference <strong>${ref}</strong>. We will email a confirmation to <span data-email></span> within one working day.</p>
      <div class="table-wrap"><table>
        <thead><tr><th>Item</th><th>Availability</th><th>Cost</th></tr></thead>
        <tbody>${lines.map(l => `<tr><td>${l.p.name} × ${l.qty}</td><td>${availability(l)}</td><td>${money(l.p.price * l.qty)}</td></tr>`).join('')}</tbody>
        <tfoot>
          <tr><td colspan="2">Delivery (free from ${money(FREE_DELIVERY_FROM)})</td><td>${delivery ? money(delivery) : 'Free'}</td></tr>
          <tr><td colspan="2">Total</td><td>${money(subtotal + delivery)}</td></tr>
        </tfoot>
      </table></div>
      <a class="btn" href="products.html">Keep shopping</a>`;
    $('[data-who]', out).textContent = data.name.split(' ')[0];
    $('[data-email]', out).textContent = data.email;
    if (cartItems.length) Cart.clear();
  });
}

/* Contact: validates, then compiles an email the visitor can send */
const contact = $('#contact-form');
if (contact) {
  bindForm(contact, async data => {
    const subject = `[${data.topic}] Message from ${data.name}`;
    const body = `Name: ${data.name}\nEmail: ${data.email}\nTopic: ${data.topic}\n\n${data.message}`;
    const out = showResult(contact);
    $('#preview', out).textContent = `To: ${MAIL_TO}\nSubject: ${subject}\n\n${body}`;
    $('#send-mail', out).href = `mailto:${MAIL_TO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}
