const CATEGORIES = { all: 'All', milk: 'Milk', cheese: 'Cheese', yoghurt: 'Yoghurt', butter: 'Butter & cream' };

const PRODUCTS = [
  { id: 'whole-milk', name: 'Fresh Whole Milk', category: 'milk', price: 42, unit: '2 L', stock: 120, image: 'images/milk.jpg', alt: 'Illustration of a bottle of whole milk', desc: 'Pasteurised for safety, with all its natural goodness.' },
  { id: 'skim-milk', name: 'Organic Skim Milk', category: 'milk', price: 46, unit: '2 L', stock: 80, image: 'images/skim-milk.jpg', alt: 'Illustration of a bottle of skim milk', desc: 'Light on fat, full on nutrition.' },
  { id: 'cheddar', name: 'Artisan Cheddar', category: 'cheese', price: 98, unit: '250 g', stock: 40, image: 'images/cheddar-cheese.jpg', alt: 'Illustration of a wedge of cheddar cheese', desc: 'Aged for eight months from a traditional recipe.' },
  { id: 'gouda', name: 'Farmhouse Gouda', category: 'cheese', price: 92, unit: '250 g', stock: 6, image: 'images/gouda-cheese.jpg', alt: 'Illustration of a wedge of gouda cheese', desc: 'Smooth, mild and slightly sweet.' },
  { id: 'feta', name: 'Feta in Brine', category: 'cheese', price: 64, unit: '200 g', stock: 0, image: 'images/feta-cheese.jpg', alt: 'Illustration of a block of feta cheese', desc: 'Crumbly and tangy, made in small batches.' },
  { id: 'plain-yoghurt', name: 'Plain Yoghurt', category: 'yoghurt', price: 54, unit: '1 kg', stock: 60, image: 'images/plain-yoghurt.jpg', alt: 'Illustration of a tub of plain yoghurt', desc: 'Thick, creamy and live-cultured.' },
  { id: 'berry-yoghurt', name: 'Berry Yoghurt', category: 'yoghurt', price: 32, unit: '500 g', stock: 45, image: 'images/berry-yoghurt.jpg', alt: 'Illustration of a tub of berry yoghurt', desc: 'Real fruit stirred through every tub.' },
  { id: 'butter', name: 'Salted Butter', category: 'butter', price: 58, unit: '500 g', stock: 70, image: 'images/butter.jpg', alt: 'Illustration of a block of butter', desc: 'Churned slowly with a pinch of sea salt.' },
  { id: 'cream', name: 'Fresh Cream', category: 'butter', price: 36, unit: '250 ml', stock: 8, image: 'images/cream.jpg', alt: 'Illustration of a block of butter representing cream', desc: 'Pours thick and whips beautifully.' }
];

const findProduct = id => PRODUCTS.find(p => p.id === id);
