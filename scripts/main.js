document.addEventListener("DOMContentLoaded", () => {
  const mobileMenu = document.querySelector(".mobile-menu")
  const navLinks = document.querySelector(".nav-links")

  mobileMenu.addEventListener("click", function () {
    navLinks.style.display = navLinks.style.display === "flex" ? "none" : "flex"
    this.classList.toggle("active")
  })

  // Close mobile menu when clicking outside
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".nav")) {
      navLinks.style.display = "none"
      mobileMenu.classList.remove("active")
    }
  })

  // Handle window resize
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      navLinks.style.display = "flex"
    } else {
      navLinks.style.display = "none"
    }
  })
})

