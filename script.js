// =============================================================================
// PRODUCT DATA
// Mock product catalogue for JP Materials — rendering products
// =============================================================================

const products = [
  {
    id: 1,
    name: "Premium Base Coat",
    price: 24.99,
    stock: 48,
    image: "https://picsum.photos/seed/basecoat/600/400",
    description:
      "A high-performance base coat designed to prime surfaces before applying render. Suitable for both interior and exterior use. Provides excellent adhesion and moisture resistance.",
  },
  {
    id: 2,
    name: "Fine Finish Render",
    price: 39.99,
    stock: 30,
    image: "https://picsum.photos/seed/finerender/600/400",
    description:
      "Smooth, fine-grade render ideal for creating a polished finish on walls and ceilings. Easy to work with and dries to a hard, durable surface.",
  },
  {
    id: 3,
    name: "Textured Exterior Render",
    price: 44.99,
    stock: 22,
    image: "https://picsum.photos/seed/texrender/600/400",
    description:
      "Coarse-textured render formulated for exterior facades. Weather-resistant and UV-stable, providing a classic roughcast appearance.",
  },
  {
    id: 4,
    name: "Acrylic Render Mix",
    price: 54.99,
    stock: 15,
    image: "https://picsum.photos/seed/acrylicrender/600/400",
    description:
      "Flexible acrylic-based render that resists cracking. Perfect for surfaces prone to movement. Available in a natural off-white finish.",
  },
  {
    id: 5,
    name: "Waterproof Render Additive",
    price: 14.99,
    stock: 60,
    image: "https://picsum.photos/seed/waterproofadd/600/400",
    description:
      "Liquid additive mixed into render batches to significantly boost waterproofing. Ideal for below-ground and high-exposure areas.",
  },
  {
    id: 6,
    name: "Render Bonding Agent",
    price: 18.99,
    stock: 35,
    image: "https://picsum.photos/seed/bondingagent/600/400",
    description:
      "Brush-on bonding agent that dramatically improves adhesion on smooth or difficult surfaces such as painted walls and dense concrete.",
  },
  {
    id: 7,
    name: "Coloured Top Coat Render",
    price: 49.99,
    stock: 18,
    image: "https://picsum.photos/seed/topcoatrender/600/400",
    description:
      "Pre-coloured finishing render available in a range of earth tones. Eliminates the need for painting and provides a long-lasting decorative finish.",
  },
  {
    id: 8,
    name: "Sand & Cement Render Bag",
    price: 9.99,
    stock: 100,
    image: "https://picsum.photos/seed/sandcement/600/400",
    description:
      "Traditional pre-mixed sand and cement render in a 25kg bag. Reliable, cost-effective, and suitable for a wide range of general plastering and rendering jobs.",
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
