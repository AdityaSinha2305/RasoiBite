let cart = [];

// Menu tab functionality
function showMenu(menuType) {
  // Hide all menus
  document.getElementById("lunch-menu").classList.add("hidden");
  document.getElementById("dinner-menu").classList.add("hidden");
  document.getElementById("weekly-menu").classList.add("hidden");

  // Show selected menu
  document.getElementById(menuType + "-menu").classList.remove("hidden");

  // Update active tab
  document
    .querySelectorAll(".tab-button")
    .forEach((btn) => btn.classList.remove("active"));
  event.target.classList.add("active");
}

// Add to cart functionality
function addToCart(itemName, price) {
  cart.push({ name: itemName, price: price });

  // Show confirmation with enhanced animation
  const button = event.target;
  const originalText = button.textContent;
  const originalBg = button.style.background;

  button.textContent = "Added to Cart ✨";
  button.style.background = "linear-gradient(135deg, #10b981 0%, #059669 100%)";
  button.style.transform = "scale(1.1)";

  setTimeout(() => {
    button.textContent = originalText;
    button.style.background = originalBg;
    button.style.transform = "scale(1)";
  }, 2000);

  // Update cart count (you can expand this)
  console.log("Cart Items:", cart);

  // Show floating notification
  showNotification(`${itemName} added to cart!`);
}

// Show notification
function showNotification(message) {
  const notification = document.createElement("div");
  notification.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                color: white;
                padding: 16px 24px;
                border-radius: 12px;
                box-shadow: 0 8px 32px rgba(16, 185, 129, 0.3);
                z-index: 10000;
                font-weight: 600;
                transform: translateX(400px);
                transition: all 0.3s ease;
            `;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  setTimeout(() => {
    notification.style.transform = "translateX(400px)";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Order form handling
function handleOrder(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const orderData = Object.fromEntries(formData);

  // Enhanced validation
  if (!orderData.name || !orderData.phone || !orderData.address) {
    alert("Please fill in all required fields!");
    return;
  }

  // Phone validation
  const phoneRegex = /^[6-9]\d{9}$/;
  if (!phoneRegex.test(orderData.phone.replace(/\D/g, "").slice(-10))) {
    alert("Please enter a valid 10-digit Indian mobile number!");
    return;
  }

  // Simulate order processing with enhanced UX
  const submitButton = event.target.querySelector(".submit-button");
  const originalText = submitButton.textContent;

  submitButton.textContent = "Processing Your Premium Order...";
  submitButton.disabled = true;
  submitButton.style.background =
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";

  setTimeout(() => {
    alert(
      `🎉 Welcome to RasoiBite Premium, ${orderData.name}!\n\nYour premium order has been confirmed! Our culinary team is already preparing to serve you the finest dining experience.\n\n✨ Order Details:\n• Plan: ${orderData.subscription}\n• Start Date: ${orderData["start-date"]}\n• Delivery: ${orderData.address}\n\n🏆 What's Next:\n• Our chef will call you within 5 minutes\n• First meal delivery confirmation\n• Premium customer support access\n\nFor immediate assistance: +91 98765 43210\n\nThank you for choosing premium quality! 🍽️✨`
    );

    submitButton.textContent = originalText;
    submitButton.disabled = false;
    submitButton.style.background =
      "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)";
    event.target.reset();
    cart = []; // Clear cart
  }, 3000);
}

// Enhanced smooth scrolling
document.querySelectorAll(".nav-links a, .cta-button").forEach((link) => {
  link.addEventListener("click", function (e) {
    if (
      this.getAttribute("href") &&
      this.getAttribute("href").startsWith("#")
    ) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  });
});

// Enhanced header scroll effect
window.addEventListener("scroll", function () {
  const header = document.querySelector(".header");
  if (window.scrollY > 100) {
    header.style.background = "rgba(255, 255, 255, 0.98)";
    header.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.15)";
  } else {
    header.style.background = "rgba(255, 255, 255, 0.95)";
    header.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.1)";
  }
});

// Set minimum date to today
document.getElementById("start-date").min = new Date()
  .toISOString()
  .split("T")[0];

// Enhanced intersection observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Initialize animations
document.querySelectorAll(".feature-card, .dish-card").forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(30px)";
  el.style.transition = "all 0.6s ease";
  observer.observe(el);
});

// Initialize floating particles
function createParticles() {
  const particles = document.querySelector(".particles");
  particles.innerHTML = ""; // Clear existing particles

  for (let i = 0; i < 30; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 8 + "s";
    particle.style.animationDuration = Math.random() * 6 + 6 + "s";
    particles.appendChild(particle);
  }
}

// Continuously regenerate particles
function startParticleSystem() {
  createParticles();
  setInterval(createParticles, 12000); // Refresh every 12 seconds
}

// Mobile menu functionality
function toggleMobileMenu() {
  const mobileNav = document.getElementById("mobile-nav");
  const menuBtn = document.querySelector(".mobile-menu-btn");

  mobileNav.classList.toggle("active");

  // Animate hamburger icon
  if (mobileNav.classList.contains("active")) {
    menuBtn.innerHTML = "✕";
    menuBtn.style.transform = "rotate(180deg)";
  } else {
    menuBtn.innerHTML = "☰";
    menuBtn.style.transform = "rotate(0deg)";
  }
}

function closeMobileMenu() {
  const mobileNav = document.getElementById("mobile-nav");
  const menuBtn = document.querySelector(".mobile-menu-btn");

  mobileNav.classList.remove("active");
  menuBtn.innerHTML = "☰";
  menuBtn.style.transform = "rotate(0deg)";
}

// Close mobile menu when clicking outside
document.addEventListener("click", function (event) {
  const mobileNav = document.getElementById("mobile-nav");
  const menuBtn = document.querySelector(".mobile-menu-btn");
  const nav = document.querySelector(".nav");

  if (!nav.contains(event.target) && mobileNav.classList.contains("active")) {
    closeMobileMenu();
  }
});

// Close mobile menu on window resize
window.addEventListener("resize", function () {
  if (window.innerWidth > 768) {
    closeMobileMenu();
  }
});

// Initialize on load
window.addEventListener("load", startParticleSystem);
