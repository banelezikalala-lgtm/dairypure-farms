const places = [
  { name: 'DairyPure Farm', address: '123 Farm Road, Magaliesburg', pos: [-25.9889, 27.5427] },
  { name: 'Farm Shop', address: 'Shop 14, Fourways Farmers Market, Fourways', pos: [-26.0225, 28.0108] },
  { name: 'Midrand Depot', address: '8 Distribution Drive, Midrand', pos: [-25.9893, 28.1281] }
];

const map = L.map('map', { scrollWheelZoom: false });
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const markers = places.map(p => L.marker(p.pos).addTo(map).bindPopup(`<strong>${p.name}</strong><br>${p.address}`));
map.fitBounds(places.map(p => p.pos), { padding: [40, 40] });

$('#places').innerHTML = places.map((p, i) =>
  `<li><button class="place" data-place="${i}"><strong>${p.name}</strong><span>${p.address}</span></button></li>`).join('');

$('#places').addEventListener('click', ({ target }) => {
  const button = target.closest('[data-place]');
  if (!button) return;
  const i = +button.dataset.place;
  map.flyTo(places[i].pos, 13);
  markers[i].openPopup();
});
