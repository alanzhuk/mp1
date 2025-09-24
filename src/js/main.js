/* Your JS here. */
document.addEventListener("DOMContentLoaded", () => {

    //navbar resizing
    const nav = document.querySelector("nav");
    const navLinks = document.querySelectorAll(".nav__list a");
  
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        nav.classList.add("nav--small");
        navLinks.forEach(link => link.classList.add("nav-link--small"));
      } else {
        nav.classList.remove("nav--small");
        navLinks.forEach(link => link.classList.remove("nav-link--small"));
      }
    });
  
    //This is so it goes down the page smoothly when you click the navbar
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  
    //highlights where in the page the user is
    const sections = document.querySelectorAll("main section");
    const navItems = document.querySelectorAll(".nav__list a");
  
    function updateActiveLink() {
      let index = sections.length;
  
      // Find the section currently in view
      while (--index && window.scrollY + nav.offsetHeight < sections[index].offsetTop) {}
  
      navItems.forEach(link => link.classList.remove("nav_current"));
      navItems[index].classList.add("nav_current");
    }
  
    window.addEventListener("scroll", updateActiveLink);
    updateActiveLink(); // run once at start
  
    //impliments modals
    const modal = document.getElementById("modal");
    const modalBody = document.getElementById("modal-body");
    const modalCloseBtns = document.querySelectorAll("[data-close-modal]");
  
    document.querySelectorAll(".open-modal").forEach(btn => {
      btn.addEventListener("click", () => {
        const img = btn.querySelector("img").cloneNode();
        modalBody.innerHTML = "";
        modalBody.appendChild(img);
        modal.classList.add("open");
        modal.setAttribute("aria-hidden", "false");
      });
    });
  
    modalCloseBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        modal.classList.remove("open");
        modal.setAttribute("aria-hidden", "true");
      });
    });
  
    window.addEventListener("click", e => {
      if (e.target === modal) {
        modal.classList.remove("open");
        modal.setAttribute("aria-hidden", "true");
      }
    });
  
    //gets the carousel working
    const track = document.querySelector(".carousel-track");
    const slides = Array.from(track.children);
    const nextButton = document.querySelector(".carousel-btn.next");
    const prevButton = document.querySelector(".carousel-btn.prev");
    let currentSlide = 0;
  
    function updateCarousel() {
      const slideWidth = slides[0].getBoundingClientRect().width;
      track.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    }
  
    nextButton.addEventListener("click", () => {
      currentSlide = (currentSlide + 1) % slides.length;
      updateCarousel();
    });
  
    prevButton.addEventListener("click", () => {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      updateCarousel();
    });
  
    // Adjust when window resizes
    window.addEventListener("resize", updateCarousel);
  
    updateCarousel(); // initial alignment
  });