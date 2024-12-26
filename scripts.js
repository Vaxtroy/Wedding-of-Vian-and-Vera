// Menangani overflow ketika offcanvas dibuka
const offcanvas = document.querySelector(".offcanvas");
const hamburger = document.querySelector(".navbar-toggler");
const stickyTop = document.querySelector(".sticky-top");

hamburger.addEventListener("click", function () {
  stickyTop.style.overflow = "visible";
});

offcanvas.addEventListener("hidden.bs.offcanvas", function () {
  stickyTop.style.overflow = "hidden";
});

// Menangani audio dan scroll
const rootElement = document.querySelector(":root");
const audioIconWrapper = document.querySelector(".audio-icon-wrapper");
const audioIcon = document.querySelector(".audio-icon-wrapper i");
const song = document.querySelector("#song");
let isPlaying = false;

// Menonaktifkan scroll
function disableScroll() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

  window.onscroll = function () {
    window.scrollTo(scrollTop, scrollLeft);
  };

  rootElement.style.scrollBehavior = "auto"; // Menonaktifkan scroll smooth
}

// Mengaktifkan scroll dan memulai audio
function enableScroll() {
  window.onscroll = function () {}; // Menonaktifkan scroll
  rootElement.style.scrollBehavior = "smooth"; // Mengaktifkan scroll smooth
  playAudio();
}

// Memulai pemutaran audio
function playAudio() {
  song.volume = 0.1;
  audioIconWrapper.style.display = "flex";
  song.play();
  isPlaying = true;
}

// Fungsi untuk mengubah status play/pause ketika audio di-klik
audioIconWrapper.addEventListener("click", function () {
  if (isPlaying) {
    song.pause();
    audioIcon.classList.remove("bi-disc");
    audioIcon.classList.add("bi-pause-circle");
  } else {
    song.play();
    audioIcon.classList.add("bi-disc");
    audioIcon.classList.remove("bi-pause-circle");
  }
  isPlaying = !isPlaying;
});

// Menonaktifkan scroll ketika halaman dimuat
disableScroll();

// Form submission
window.addEventListener("load", function () {
  // Menangani pengiriman form RSVP jika masih ada
  const form = document.getElementById("my-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const data = new FormData(form);
      const action = e.target.action;
      fetch(action, {
        method: "POST",
        body: data,
      })
        .then(() => {
          alert("Konfirmasi kehadiran berhasil terkirim!");
        })
        .catch((error) => {
          alert("Terjadi kesalahan saat mengirim data. Silakan coba lagi.");
        });
    });
  }

  // Query Parameters
  const urlParams = new URLSearchParams(window.location.search);
  const nama = urlParams.get("n") || "";
  const pronoun = urlParams.get("p") || "Bapak/Ibu/Saudara/i";
  const namaContainer = document.querySelector(".hero h4 span");
  if (namaContainer) {
    namaContainer.innerText = `${pronoun} ${nama},`.replace(/ ,$/, ",");
  }

  const namaInput = document.querySelector("#nama");
  if (namaInput) {
    namaInput.value = nama;
  }

  // Offcanvas Navbar
  const offcanvasNavbar = document.getElementById("offcanvasNavbar");
  const navLinks = document.querySelectorAll(".nav-link");
  const bsOffcanvas = new bootstrap.Offcanvas(offcanvasNavbar);

  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      bsOffcanvas.hide();
    });
  });

  // Initialize AOS (Animate On Scroll)
  AOS.init({
    once: false,
  });
});

// Fungsi untuk menyalin teks
function copyText(element) {
  const textToCopy = element.parentElement.querySelector(".number").innerText; // Mengambil teks dari elemen dengan kelas 'number'

  // Buat elemen textarea untuk menyalin teks
  const textarea = document.createElement("textarea");
  textarea.value = textToCopy;
  document.body.appendChild(textarea);

  // Pilih teks di textarea
  textarea.select();
  textarea.setSelectionRange(0, 99999); // Untuk mobile devices

  // Salin teks ke clipboard
  document.execCommand("copy");

  // Hapus textarea setelah menyalin
  document.body.removeChild(textarea);

  // Ubah teks tombol menjadi "Berhasil disalin"
  $(element).html("Berhasil disalin!");

  // Kembalikan teks tombol setelah 2 detik
  setTimeout(function () {
    $(element).html('<i class="fas fa-fw fa-copy"></i> Copy');
  }, 2000);
}

// Validasi Formulir
document.getElementById("my-form")?.addEventListener("submit", function (event) {
  const statusSelect = document.getElementById("status");
  if (statusSelect.value === "") {
    event.preventDefault(); // Mencegah pengiriman formulir
    alert("Konfirmasi wajib dipilih!"); // Menampilkan pesan kesalahan
  }
});

// Scroll Animation
$(document).ready(function () {
  $('a[href="#gift"]').on("click", function (event) {
    event.preventDefault();
    $("html, body").animate(
      {
        scrollTop: $("#gift").offset().top - 200,
      },
      100 // Durasi animasi
    );
  });
});
