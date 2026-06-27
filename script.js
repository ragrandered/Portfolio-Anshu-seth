document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide Icons
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }

  // ==========================================================================
  // MOBILE MENU INTERACTION
  // ==========================================================================
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuIcon = document.getElementById("menu-icon");
  const mobileLinks = document.querySelectorAll(".mobile-nav-link");

  function toggleMobileMenu() {
    mobileMenu.classList.toggle("open");
    const isOpen = mobileMenu.classList.contains("open");
    
    // Change menu icon between menu and X
    if (isOpen) {
      menuIcon.setAttribute("data-lucide", "x");
      document.body.style.overflow = "hidden"; // Disable scroll when menu is open
    } else {
      menuIcon.setAttribute("data-lucide", "menu");
      document.body.style.overflow = ""; // Enable scroll
    }
    
    if (typeof lucide !== "undefined") {
      lucide.createIcons();
    }
  }

  menuToggle.addEventListener("click", toggleMobileMenu);

  // Close menu when clicking a link
  mobileLinks.forEach(link => {
    link.addEventListener("click", () => {
      if (mobileMenu.classList.contains("open")) {
        toggleMobileMenu();
      }
    });
  });

  // ==========================================================================
  // SCROLL-BASED INTERACTIONS (NAVBAR, SCROLL PROGRESS, FLOATING WHATSAPP)
  // ==========================================================================
  const navbar = document.getElementById("navbar");
  const scrollProgress = document.getElementById("scroll-progress");
  const whatsappFloating = document.getElementById("whatsapp-floating");

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    // 1. Navbar style shift
    if (scrollTop > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // 2. Scroll progress indicator width update
    if (scrollProgress) {
      scrollProgress.style.width = `${scrollPercent}%`;
    }

    // 3. Floating WhatsApp visibility toggle
    if (whatsappFloating) {
      if (scrollTop > 500) {
        whatsappFloating.classList.add("visible");
      } else {
        whatsappFloating.classList.remove("visible");
      }
    }
  }, { passive: true });

  // Trigger scroll event on load to sync navbar state
  window.dispatchEvent(new Event("scroll"));

  // ==========================================================================
  // REVEAL ANIMATIONS ON SCROLL (INTERSECTION OBSERVER)
  // ==========================================================================
  const revealElements = document.querySelectorAll(".reveal-element");

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target); // Unobserve once animated
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

  // ==========================================================================
  // ACTIVE NAVIGATION LINK HIGHLIGHTING
  // ==========================================================================
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  const navObserverOptions = {
    threshold: 0.3,
    rootMargin: "-20% 0px -40% 0px"
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        
        // Remove active class from all links
        navLinks.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }, navObserverOptions);

  sections.forEach(section => {
    navObserver.observe(section);
  });

  // ==========================================================================
  // CONTACT FORM TO MAILTO HANDLER
  // ==========================================================================
  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("form-name").value.trim();
      const email = document.getElementById("form-email").value.trim();
      const service = document.getElementById("form-service").value;
      const details = document.getElementById("form-details").value.trim();

      if (!name || !email || !service || !details) {
        formStatus.textContent = "Please fill in all required fields.";
        formStatus.className = "form-status error";
        return;
      }

      // Email details configuration
      const mailtoEmail = "anshuseth.design@gmail.com";
      const subject = encodeURIComponent(`Design Project Inquiry - ${service}`);
      const body = encodeURIComponent(
        `Hi Anshu,\n\nI would like to inquire about your "${service}" services.\n\n` +
        `Project Details:\n${details}\n\n` +
        `My Contact Information:\n` +
        `- Name: ${name}\n` +
        `- Email: ${email}\n\n` +
        `Best regards,\n${name}`
      );

      // Pre-fill the status message
      formStatus.textContent = "Opening your default email application...";
      formStatus.className = "form-status success";

      // Trigger standard email client redirection
      setTimeout(() => {
        window.location.href = `mailto:${mailtoEmail}?subject=${subject}&body=${body}`;
        contactForm.reset();
        
        // Clear message after a short timeout
        setTimeout(() => {
          formStatus.textContent = "";
          formStatus.className = "form-status";
        }, 5000);
      }, 800);
    });
  }
});
