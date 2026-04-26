// =============================================================================
// PRODUCT DATA
// Mock product catalogue for JP Materials — rendering products
// =============================================================================

const products = [
  {
    id: 1,
    name: "Atlas Roker U — Adhesive Mortar (25kg)",
    price: 18.99,
    stock: 42,
    category: "Mortars & Adhesives",
    image: "product_images/atlas-roker-u_p_2322_20230419_113006.jpg",
    description:
      "Multi-purpose adhesive mortar for fixing insulation boards to walls and embedding reinforcing mesh. Fibre-reinforced for improved crack resistance. Suitable for EPS, graphite EPS, and mineral wool. Recommended for facade and high acoustic-insulation systems.",
  },
  {
    id: 2,
    name: "Atlas Solaris — Gypsum Plaster (25kg)",
    price: 14.99,
    stock: 55,
    category: "Plasters & Renders",
    image: "product_images/atlas-solaris_p_2374_20230710_120841.jpg",
    description:
      "Hand-applied single-coat gypsum plaster for interior walls and ceilings. Optimal pot life of approximately 120 minutes. Layer thickness 8–30mm. Provides a smooth, paintable finish. For indoor use only.",
  },
  {
    id: 3,
    name: "Atlas Silicone Render — Thin Coat (25kg)",
    price: 44.99,
    stock: 20,
    category: "Plasters & Renders",
    image: "product_images/atlas-silicone-render_p_2325_20230125_123931.png",
    description:
      "Hydrophobic, self-cleaning thin-coat silicone render. Highly vapour-permeable and resistant to UV, operational, and thermal load. Available in a rich palette of colours including extremely dark shades. Ideal for exterior facade finishing.",
  },
  {
    id: 4,
    name: "Atlas Gemini RS — Silicone Render (25kg)",
    price: 54.99,
    stock: 14,
    category: "Plasters & Renders",
    image: "product_images/atlas-gemini-rs_p_4349_20250328_085032.jpg",
    description:
      "Premium thin-coat silicone render featuring 4K technology for an outstanding final result. Ultra-easy application with a simple mix-quick method. Incorporates BioSec and Clean Technology for a long-lasting, clean facade. Consumption approx. 2.3 kg/m².",
  },
  {
    id: 5,
    name: "Atlas Salta — Silicone Facade Paint (10L)",
    price: 34.99,
    stock: 28,
    category: "Paints & Primers",
    image: "product_images/atlas-salta_p_2335_20240620_102118.jpg",
    description:
      "Self-priming silicone facade paint with strong coverage. Highly resistant to dirt, adverse weather, and UV fading. Durable colours with excellent adhesion. No primer required. Suitable for exterior walls and facades.",
  },
  {
    id: 6,
    name: "Atlas Ultragrunt — Quick-Dry Primer (5L)",
    price: 24.99,
    stock: 33,
    category: "Paints & Primers",
    image: "product_images/atlas-ultragrunt_p_2246_20220419_094323.png",
    description:
      "Fast-drying quartz aggregate primer for critical substrates. Suitable under self-levelling compounds, tile adhesives, and on concrete, terrazzo, ceramic tiles, and OSB boards. Improves adhesion significantly. Further applications can begin after just 4 hours. For indoor and outdoor use on walls and floors.",
  },
  {
    id: 7,
    name: "Atlas Flexible Acrylic Caulk (280ml)",
    price: 8.99,
    stock: 80,
    category: "Accessories",
    image: "product_images/atlas-flexible-universal-caulk_p_4128_20231110_100317.jpg",
    description:
      "Elastic universal acrylic caulk with excellent adhesion for filling and profiling joints. Easy to apply and paintable after just 30 minutes. Enhanced resistance to shrinkage and cracking. Suitable for a wide range of interior and exterior applications.",
  },
  {
    id: 8,
    name: "Reinforcing Mesh — Atlas 150 (50m roll)",
    price: 19.99,
    stock: 47,
    category: "Accessories",
    image: "product_images/reinforcing-mesh_p_2339_20201028_123604.jpg",
    description:
      "High-strength fibreglass reinforcing mesh for embedding in base coat render as part of an EWI system. 150 g/m² weight provides excellent tensile strength and crack resistance. Alkali-resistant coating for long-term durability. 50m roll.",
  },
  {
    id: 9,
    name: "Mechanical Fixings — Anchor Pins (100 pack)",
    price: 12.99,
    stock: 60,
    category: "Accessories",
    image: "product_images/mechanical-fixings_p_2340_20201028_124335.png",
    description:
      "Heavy-duty plastic anchor pins with metal nail for mechanically fixing insulation boards to masonry, concrete, and brick substrates. Wide washer head distributes load and prevents pull-through. Compatible with EPS and mineral wool insulation boards.",
  },
  {
    id: 10,
    name: "Facade Profiles for EWI (pack of 10)",
    price: 24.99,
    stock: 25,
    category: "Accessories",
    image: "product_images/faade-profiles-for-external-wall-insulation_p_2341_20201028_130256.jpg",
    description:
      "Pack of PVC/aluminium beading profiles for use in external wall insulation systems. Includes corner beads, starter profiles, and expansion beads with pre-attached fibreglass mesh. Provides clean, sharp edges and expansion joints for a professional finish.",
  },
  {
    id: 11,
    name: "EWI System — Complete Kit",
    price: 299.99,
    stock: 8,
    category: "Systems & Kits",
    image: "product_images/external-thermal-insulation-composite-system-atlas_p_2356_20210507_150330.png",
    description:
      "Complete External Wall Insulation (EWI) composite system. Includes adhesive mortar, insulation fixings, reinforcing mesh, base coat render, and silicone top coat. Suitable for brick, block, and concrete substrates. Improves thermal performance and provides a weatherproof decorative finish.",
  },
];

// =============================================================================
// UTILITY — URL QUERY PARAMS
// =============================================================================

/**
 * Returns the value of a URL query parameter by name.
 * e.g. getQueryParam('id') on product.html?id=3 returns '3'
 */
function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

/**
 * Finds a product object by its numeric ID.
 * Returns undefined if not found.
 */
function getProductById(id) {
  return products.find((p) => p.id === Number(id));
}

// =============================================================================
// CART — localStorage persistence
// Key: 'jp_cart'
// Format: [{ productId: number, quantity: number }, ...]
// =============================================================================

const CART_KEY = "jp_cart";

/** Retrieve the current cart array from localStorage */
function getCart() {
  const raw = localStorage.getItem(CART_KEY);
  return raw ? JSON.parse(raw) : [];
}

/** Persist the cart array to localStorage */
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

/**
 * Add a product to the cart.
 * If the product already exists, increment its quantity.
 * Quantity is capped at available stock.
 */
function addToCart(productId, quantity = 1) {
  const product = getProductById(productId);
  if (!product) return;

  const cart = getCart();
  const existing = cart.find((item) => item.productId === productId);

  if (existing) {
    // Cap at stock level
    existing.quantity = Math.min(existing.quantity + quantity, product.stock);
  } else {
    cart.push({ productId, quantity: Math.min(quantity, product.stock) });
  }

  saveCart(cart);
  updateCartBadge();
}

/**
 * Remove a product entirely from the cart.
 */
function removeFromCart(productId) {
  const cart = getCart().filter((item) => item.productId !== productId);
  saveCart(cart);
  updateCartBadge();
}

/**
 * Set a specific quantity for a cart item.
 * If quantity <= 0, the item is removed.
 * Quantity is capped at available stock.
 */
function updateQuantity(productId, quantity) {
  if (quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  const product = getProductById(productId);
  if (!product) return;

  const cart = getCart();
  const item = cart.find((i) => i.productId === productId);

  if (item) {
    item.quantity = Math.min(quantity, product.stock);
    saveCart(cart);
    updateCartBadge();
  }
}

/**
 * Returns the total number of individual items in the cart.
 */
function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
}

/**
 * Returns the total price for all items in the cart.
 */
function getCartTotal() {
  return getCart().reduce((sum, item) => {
    const product = getProductById(item.productId);
    return product ? sum + product.price * item.quantity : sum;
  }, 0);
}

/**
 * Empty the cart completely.
 */
function clearCart() {
  localStorage.removeItem(CART_KEY);
  updateCartBadge();
}

// =============================================================================
// CART BADGE — updates the item count shown in the navbar
// =============================================================================

/**
 * Updates all elements with class 'cart-badge' to show the current item count.
 * Hides the badge when the cart is empty.
 */
function updateCartBadge() {
  const count = getCartCount();
  document.querySelectorAll(".cart-badge").forEach((badge) => {
    badge.textContent = count;
    badge.style.display = count > 0 ? "inline-flex" : "none";
  });
}

// Run badge update on every page load
document.addEventListener("DOMContentLoaded", updateCartBadge);
