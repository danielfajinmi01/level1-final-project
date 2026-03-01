const slider = document.getElementById("slider-track");
let scrollAmount = 0;

if (slider) {
  function autoPlay() {
    const firstCard = slider.querySelector(".mr-banking-cards");
    if (!firstCard) return;

    const cardWidth = firstCard.offsetWidth + 20;
    const maxScroll = slider.scrollWidth - slider.clientWidth;

    if (scrollAmount >= maxScroll) {
      scrollAmount = 0;
    } else {
      scrollAmount += cardWidth;
    }

    slider.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  }

  let slideTimer = setInterval(autoPlay, 3000);
  slider.addEventListener("mouseover", () => clearInterval(slideTimer));
  slider.addEventListener(
    "mouseout",
    () => (slideTimer = setInterval(autoPlay, 3000))
  );
}

const nav = document.querySelector(".nav-main");
if (nav) {
  const desktopMainLinks = nav.querySelector(".main-nav-links");
  const hamburger = nav.querySelector(".mobile-menu-icon .bi-list");

  if (desktopMainLinks && hamburger) {
    const topFiveMainLinks = Array.from(
      desktopMainLinks.querySelectorAll(":scope > li > a")
    ).slice(0, 5);

    if (topFiveMainLinks.length) {
      const mobileNav = document.createElement("ul");
      mobileNav.className = "main-nav-links mobile-main-nav";

      topFiveMainLinks.forEach((link) => {
        const item = document.createElement("li");
        const mobileLink = document.createElement("a");
        mobileLink.href = link.getAttribute("href") || "#";
        mobileLink.textContent = link.textContent.trim();
        item.appendChild(mobileLink);
        mobileNav.appendChild(item);
      });

      nav.appendChild(mobileNav);
      hamburger.setAttribute("role", "button");
      hamburger.setAttribute("aria-label", "Toggle main navigation");
      hamburger.setAttribute("aria-expanded", "false");

      const closeMobileNav = () => {
        mobileNav.classList.remove("mobile-open");
        hamburger.setAttribute("aria-expanded", "false");
      };

      const isHamburgerVisible = () =>
        window.getComputedStyle(hamburger).display !== "none";

      hamburger.addEventListener("click", (event) => {
        event.stopPropagation();
        const isOpen = mobileNav.classList.toggle("mobile-open");
        hamburger.setAttribute("aria-expanded", String(isOpen));
      });

      document.addEventListener("click", (event) => {
        if (!nav.contains(event.target)) {
          closeMobileNav();
        }
      });

      window.addEventListener("resize", () => {
        if (!isHamburgerVisible()) {
          closeMobileNav();
        }
      });
    }
  }
}
