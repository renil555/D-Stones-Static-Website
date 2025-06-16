
(function () {
  "use strict";

  // Load navbar
  fetch('navbar.html')
    .then(res => res.text())
    .then(data => {
      document.getElementById('navbar').innerHTML = data;
    });

  // Load footer
  fetch('footer.html')
    .then(res => res.text())
    .then(data => {
      document.getElementById('footer').innerHTML = data;
    });

  // Floating Contact Buttons
  document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelector('.floating-contact-buttons');
    const toggle = document.querySelector('.contact-toggle');

    function toggleContactButtons() {
      buttons.classList.toggle('show');
      toggle.classList.toggle('rotated');
    }

    if (toggle) {
      toggle.addEventListener('click', toggleContactButtons);
    }
  });


  //scroll to top button
  const scrollBtn = document.getElementById("scrollToTopBtn");

  window.addEventListener("scroll", () => {
    scrollBtn.style.display = window.scrollY > 200 ? "block" : "none";
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Initialize AOS
  AOS.init({
    once: true,
    duration: 1000,
    easing: 'ease-in-out'
  });

  //Gallery Swipper in Index
  const swiper = new Swiper(".gallerySwiper", {
    slidesPerView: 1,
    spaceBetween: 10,
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    breakpoints: {
      768: {
        slidesPerView: 2
      },
      1024: {
        slidesPerView: 3
      }
    }
  });

  // Load products
  const productsSection = document.querySelector('.products');

  // Preload all background images
  function preloadImage(url) {
    const img = new Image();
    img.src = url;
  }

  const productswiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    on: {
      init: function () {
        preloadAndSetBackground(this.slides[this.activeIndex].dataset.bg);
      },
      slideChange: function () {
        preloadAndSetBackground(this.slides[this.activeIndex].dataset.bg);
      }
    }
  });
  function preloadAndSetBackground(url) {
    const img = new Image();
    img.onload = function () {
      productsSection.style.backgroundImage = `url('${url}')`;
    };
    img.src = url;
  }

  //Product desc Page
  document.addEventListener("DOMContentLoaded", function () {
    GLightbox({
      selector: '.glightbox',
      touchNavigation: true,
      loop: true,
      zoomable: true,
      download: false,
    });
  });

  // Show spinner until page fully loads
  window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    if (loader) {
      loader.style.display = "none";
    }

    // Initialize GLightbox
    GLightbox({
      selector: ".glightbox",
      touchNavigation: true,
      loop: true,
      zoomable: true,
      download: false,
    });

    // Display product category
    const category = new URLSearchParams(window.location.search).get("category");
    if (category) {
      const section = document.getElementById(category);
      if (section) section.style.display = "block";
    }
  });

  // Handle category display
  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  function displayCategory() {
    const category = getQueryParam("category");
    document.querySelectorAll('.category-section > div').forEach(section => {
      section.style.display = "none";
    });
    if (category) {
      const sectionToShow = document.getElementById(category + "-section");
      if (sectionToShow) {
        sectionToShow.style.display = "block";
      }
    }
  }

  window.addEventListener("load", displayCategory);

})();