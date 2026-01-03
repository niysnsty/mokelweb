// Initialize Cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartContent = document.getElementById("cart-content");

// Format Currency
const formatRupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};

// Render Cart
function renderCart() {
  if (cart.length === 0) {
    cartContent.innerHTML = `
      <div class="empty-cart">
        <p>Keranjang belanja Anda kosong.</p>
        <a href="marketplace.html" class="cta" style="display:inline-block; margin-top:1rem;">Belanja Sekarang</a>
      </div>
    `;
    return;
  }

  let cartHTML = `
    <table class="cart-table">
      <thead>
        <tr>
          <th>Produk</th>
          <th>Harga</th>
          <th>Jumlah</th>
          <th>Total</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
  `;

  let subtotal = 0;

  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;

    cartHTML += `
      <tr>
        <td>
          <div class="cart-item-info">
            <img src="${item.image}" alt="${item.name}">
            <span>${item.name}</span>
          </div>
        </td>
        <td>${formatRupiah(item.price)}</td>
        <td>
          <div class="quantity-control">
            <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
            <span>${item.quantity}</span>
            <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
          </div>
        </td>
        <td>${formatRupiah(itemTotal)}</td>
        <td>
          <i data-feather="trash-2" class="remove-btn" onclick="removeItem(${item.id})"></i>
        </td>
      </tr>
    `;
  });

  cartHTML += `
      </tbody>
    </table>

    <div class="cart-summary">
      <h3>Ringkasan Belanja</h3>
      <div class="summary-row">
        <span>Total</span>
        <span>${formatRupiah(subtotal)}</span>
      </div>
      <button class="checkout-btn" onclick="checkout()">Checkout via WhatsApp</button>
    </div>
  `;

  cartContent.innerHTML = cartHTML;
  feather.replace(); // Re-initialize icons
}

// Update Quantity
function updateQuantity(productId, change) {
  const itemIndex = cart.findIndex((item) => item.id === productId);

  if (itemIndex !== -1) {
    cart[itemIndex].quantity += change;

    if (cart[itemIndex].quantity <= 0) {
      cart.splice(itemIndex, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }
}

// Remove Item
function removeItem(productId) {
  cart = cart.filter((item) => item.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Checkout Function
function checkout() {
  if (cart.length === 0) return;

  let message = "Halo, saya ingin memesan:\n\n";
  let total = 0;

  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    message += `- ${item.name} (${item.quantity}x) - ${formatRupiah(itemTotal)}\n`;
  });

  message += `\nTotal: ${formatRupiah(total)}`;
  
  // Replace with your WhatsApp number
  const phoneNumber = "6285932125532"; 
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  
  window.open(url, "_blank");
}

// Initial Render
renderCart();
