// Toggle class active
const navbarNav = document.querySelector(".navbar-nav");
document.querySelector("#hamburger-menu").onclick = () => {
  navbarNav.classList.toggle("active");
};
// klik diluar sidebar untuk menghilangkan nav
const hamburger = document.querySelector("#hamburger-menu");
document.addEventListener("click", function (e) {
  if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
});
document
        .getElementById("wa-form")
        .addEventListener("submit", function (e) {
          e.preventDefault(); // Mencegah form submit default

          const nama = document.getElementById("nama").value;
          const email = document.getElementById("email").value;
          const nohp = document.getElementById("nohp").value;

          const pesan = `Halo, saya ingin menghubungi MnM Drink.%0A%0ANama: ${nama}%0AEmail: ${email}%0ANo HP: ${nohp}`;

          // Ganti 6281234567890 dengan nomor WA tujuan (gunakan format internasional tanpa tanda +)
          const nomorWA = "6285932125532";

          const url = `https://wa.me/qr/O6HRANAY5CHJO1`;

          window.open(url, "_blank"); // Buka di tab baru
        });