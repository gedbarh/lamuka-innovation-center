// LAMUKA INNOVATION CENTER
// Website interactions

// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");

menuToggle.addEventListener("click", function () {
  navigation.classList.toggle("open");

  const isOpen = navigation.classList.contains("open");
  menuToggle.setAttribute("aria-expanded", isOpen);
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Close mobile menu after clicking a link
const navigationLinks = navigation.querySelectorAll("a");

navigationLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    navigation.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

// Automatically display the current year
document.getElementById("year").textContent =
  new Date().getFullYear();

  
/* LAMUKA IMPACT COUNTER ANIMATION */

const impactSection = document.querySelector("#impact");
const counters = document.querySelectorAll(".count-number");

let countersStarted = false;

function startImpactCounters() {
  if (countersStarted || !impactSection) return;

  countersStarted = true;

  counters.forEach((counter) => {
    const target = Number(counter.dataset.target);
    const duration = 2200;
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const currentNumber = Math.floor(target * progress);

      counter.textContent = currentNumber.toLocaleString() + "+";

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target.toLocaleString() + "+";
      }
    }

    requestAnimationFrame(updateCounter);
  });
}

if (impactSection) {
  const impactObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        startImpactCounters();
        impactObserver.disconnect();
      }
    });
  }, { threshold: 0.3 });

  impactObserver.observe(impactSection);
}


/* PARTICIPANT SUCCESS STORY EXPAND/COLLAPSE */


/* PARTICIPANT SUCCESS STORY EXPAND/COLLAPSE */

function toggleStory(storyId, button) {
  const story = document.getElementById(storyId);
  const track = document.getElementById("successStoryTrack");

  if (!story) return;

  const isHidden = story.hidden;

  story.hidden = !isHidden;

  button.textContent = isHidden
    ? "Close Full Story ↑"
    : "Read Full Story →";

  // Pause automatic sliding while a full story is open
  if (track) {
    if (isHidden) {
      track.classList.add("story-reading");
    } else {
      const anotherStoryOpen = track.querySelector(
        ".full-story:not([hidden])"
      );

      if (!anotherStoryOpen) {
        track.classList.remove("story-reading");
      }
    }
  }
}



/* SUCCESS STORIES CAROUSEL NAVIGATION */

function moveStories(direction) {
  const track = document.getElementById("successStoryTrack");

  if (!track) return;

  const card = track.querySelector(".success-story-card");

  if (!card) return;

  const gap = parseFloat(getComputedStyle(track).gap) || 0;
  const distance = card.getBoundingClientRect().width + gap;

  track.scrollBy({
    left: direction * distance,
    behavior: "smooth"
  });
}

/* AUTOMATIC STORY SLIDING */

const storyTrack = document.getElementById("successStoryTrack");

if (storyTrack) {
  let autoSlide;

  function startStoryAutoSlide() {
    clearInterval(autoSlide);

    autoSlide = setInterval(() => {
      if (storyTrack.classList.contains("story-reading")) return;
      const card = storyTrack.querySelector(".success-story-card");

      if (!card) return;

      const distance = card.getBoundingClientRect().width +
        (parseFloat(getComputedStyle(storyTrack).gap) || 0);

      if (storyTrack.scrollLeft + storyTrack.clientWidth >=
          storyTrack.scrollWidth - 5) {
        storyTrack.scrollTo({
          left: 0,
          behavior: "smooth"
        });
      } else {
        storyTrack.scrollBy({
          left: distance,
          behavior: "smooth"
        });
      }
    }, 5000);
  }

  startStoryAutoSlide();

  storyTrack.addEventListener("mouseenter", () =>
    clearInterval(autoSlide)
  );

  storyTrack.addEventListener("mouseleave", startStoryAutoSlide);

  storyTrack.addEventListener("touchstart", () =>
    clearInterval(autoSlide)
  );

  storyTrack.addEventListener("touchend", startStoryAutoSlide);
}

/* LAMUKA HERO SLIDESHOW */

const heroSlides = document.querySelectorAll(".hero-slide");
const heroDots = document.querySelectorAll(".hero-dot");
const heroNext = document.querySelector("#heroNext");
const heroPrev = document.querySelector("#heroPrev");
const heroProgressBar = document.querySelector("#heroProgressBar");

let currentHeroSlide = 0;
let heroTimer;
let heroProgressTimer;
let heroProgress = 0;

function showHeroSlide(index) {
  heroSlides[currentHeroSlide].classList.remove("active");
  heroDots[currentHeroSlide].classList.remove("active");

  currentHeroSlide = (index + heroSlides.length) % heroSlides.length;

  heroSlides[currentHeroSlide].classList.add("active");
  heroDots[currentHeroSlide].classList.add("active");
}

function startHeroTimer() {
  clearInterval(heroTimer);
  clearInterval(heroProgressTimer);

  heroProgress = 0;
  heroProgressBar.style.width = "0%";

  heroProgressTimer = setInterval(() => {
    heroProgress += 2;
    heroProgressBar.style.width = heroProgress + "%";
  }, 100);

  heroTimer = setInterval(() => {
    showHeroSlide(currentHeroSlide + 1);
    startHeroTimer();
  }, 5000);
}

if (
  heroSlides.length &&
  heroDots.length &&
  heroNext &&
  heroPrev &&
  heroProgressBar
) {
  heroNext.addEventListener("click", () => {
    showHeroSlide(currentHeroSlide + 1);
    startHeroTimer();
  });

  heroPrev.addEventListener("click", () => {
    showHeroSlide(currentHeroSlide - 1);
    startHeroTimer();
  });

  heroDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showHeroSlide(index);
      startHeroTimer();
    });
  });

  startHeroTimer();
}
/* ==============================
   EXPAND AND COLLAPSE SUCCESS STORIES
================================ */

function toggleStory(storyId, button) {
  const story = document.getElementById(storyId);

  if (!story) return;

  const isHidden = story.hidden;

  story.hidden = !isHidden;

  button.textContent = isHidden
    ? "Read Less ↑"
    : "Read Full Story →";
}


/* ==============================
   IMPACT STATISTICS COUNTING ANIMATION
================================ */

function startImpactCounters() {

  const counters = document.querySelectorAll(".count-number");

  counters.forEach(function (counter) {

    const target = Number(counter.getAttribute("data-target"));

    if (!target) return;

    const duration = 2000;
    const startTime = performance.now();

    function updateCounter(currentTime) {

      const progress = Math.min(
        (currentTime - startTime) / duration,
        1
      );

      const easedProgress = 1 - Math.pow(1 - progress, 3);

      const currentNumber = Math.floor(target * easedProgress);

      counter.textContent = currentNumber.toLocaleString() + "+";

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target.toLocaleString() + "+";
      }

    }

    requestAnimationFrame(updateCounter);

  });

}

if (document.readyState === "loading") {

  document.addEventListener("DOMContentLoaded", startImpactCounters);

} else {

  startImpactCounters();

}


/* ==============================
   LAMUKA CONTACT FORM
================================ */

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const submitButton = contactForm.querySelector(".contact-submit-btn");
    const formStatus = document.getElementById("formStatus");

    submitButton.disabled = true;
    submitButton.innerHTML = "Sending...";

    formStatus.textContent = "Sending your message. Please wait...";
    formStatus.style.color = "#168AC5";

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: new FormData(contactForm),
        headers: {
          Accept: "application/json"
        }
      });

      if (response.ok) {
        contactForm.reset();

        formStatus.textContent =
          "✓ Thank you! Your message has been sent successfully. Our team will get back to you soon.";

        formStatus.style.color = "#16803A";
        formStatus.style.background = "#EAF7EE";
        formStatus.style.padding = "15px";
        formStatus.style.borderRadius = "8px";

      } else {
        formStatus.textContent =
          "Sorry! We could not send your message. Please try again.";

        formStatus.style.color = "#D93025";
      }

    } catch (error) {
      formStatus.textContent =
        "Connection error. Please check your internet and try again.";

      formStatus.style.color = "#D93025";
    }

    submitButton.disabled = false;
    submitButton.innerHTML =
      'Send Message <i class="fas fa-paper-plane"></i>';
  });
}


// PARTNERS CAROUSEL
document.querySelectorAll(".partners-track").forEach(track => {

  if (track.dataset.cloned === "true") return;

  const originalGroup = track.querySelector(".partners-group");

  if (originalGroup) {
    const clonedGroup = originalGroup.cloneNode(true);

    clonedGroup.setAttribute("aria-hidden", "true");

    track.appendChild(clonedGroup);

    track.dataset.cloned = "true";
  }

});
