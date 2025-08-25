export default function initHeader() {
  // Highlight active nav link
  const links = document.querySelectorAll("nav a");
  links.forEach((link) => {
    if (link.href === window.location.href) {
      link.classList.add("text-secondary", "font-bold");
    }
  });

  // Mobile menu toggle
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  const closeMenu = document.getElementById("closeMenu");

  if (hamburger && mobileMenu && closeMenu) {
    hamburger.addEventListener("click", () => {
      mobileMenu.classList.remove("hidden");
      mobileMenu.classList.add("flex");
    });

    closeMenu.addEventListener("click", () => {
      mobileMenu.classList.remove("flex");
      mobileMenu.classList.add("hidden");
    });

    // Close menu when clicking a link (mobile only)
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("flex");
        mobileMenu.classList.add("hidden");
      });
    });

    // Hide menu if resizing to desktop
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 768) {
        mobileMenu.classList.remove("flex");
        mobileMenu.classList.add("hidden");
      }
    });
  }
}
