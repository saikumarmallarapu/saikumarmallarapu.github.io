(function () {
  "use strict";

  // projects.js creates this global array before this file loads.
  var projects = Array.isArray(window.portfolioProjects) ? window.portfolioProjects : [];
  var companyTarget = document.getElementById("companyProjects");
  var personalTarget = document.getElementById("personalProjects");

  // Escape project data before inserting it into generated HTML.
  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Convert one project object into its complete card markup.
  function renderProject(project, index) {
    var safeUrl = /^https:\/\//i.test(project.url || "") ? project.url : "";
    var imageSources = Array.isArray(project.images)
      ? project.images
      : (project.image ? [project.image] : []);
    // Keep valid local images or HTTPS images and reject parent-folder paths.
    var safeImages = imageSources.map(function (source) {
      return String(source || "");
    }).filter(function (source) {
      return /^(?:https:\/\/|[a-zA-Z0-9_./-]+\.(?:avif|webp|png|jpe?g))$/i.test(source) && source.indexOf("..") === -1;
    });
    var tech = (project.tech || []).map(function (item) {
      return "<span>" + escapeHtml(item) + "</span>";
    }).join("");

    // Loop through each screenshot to create the horizontal gallery slides.
    var gallerySlides = safeImages.map(function (source, imageIndex) {
      return '<div class="project-slide"><img src="' + escapeHtml(source) + '" alt="' + escapeHtml(project.name) + ' screenshot ' + (imageIndex + 1) + '" loading="lazy" decoding="async"></div>';
    }).join("");
    var galleryControls = safeImages.length > 1
      ? '<div class="project-gallery-controls"><span class="project-gallery-count"><b>1</b> / ' + safeImages.length + '</span><div><button type="button" data-gallery-direction="-1" aria-label="Previous ' + escapeHtml(project.name) + ' screenshot">&#8592;</button><button type="button" data-gallery-direction="1" aria-label="Next ' + escapeHtml(project.name) + ' screenshot">&#8594;</button></div></div>'
      : "";
    var gallery = safeImages.length
      ? '<div class="project-gallery"><div class="project-gallery-track">' + gallerySlides + '</div>' + galleryControls + '</div>'
      : "";

    var desktopProjects = [
      "TCP File Transfer & Remote Access",
      "Email Campaign Bot"
    ];
    
    var privateLabel = desktopProjects.includes(project.name)
      ? "DESKTOP APPLICATION"
      : "PRIVATE PROJECT";
    
    var action = safeUrl
      ? '<a class="project-link" href="' + escapeHtml(safeUrl) + '" target="_blank" rel="noopener noreferrer" aria-label="Visit ' + escapeHtml(project.name) + '">Live website &#8599;</a>'
      : '<span class="private-label">' + privateLabel + '</span>';
    var projectType = project.category === "company" ? "M7 experience" : "Independent build";

    return [
      '<article class="project-card', safeImages.length ? ' has-images' : '', '" data-accent="', escapeHtml(project.accent || "blue"), '">',
      '<div class="project-top"><span class="project-index">', String(index + 1).padStart(2, "0"), '</span><span class="project-type">', projectType, '</span></div>',
      gallery,
      '<h4>', escapeHtml(project.name), '</h4>',
      '<p class="project-subtitle">', escapeHtml(project.subtitle), '</p>',
      '<p class="project-summary">', escapeHtml(project.summary), '</p>',
      '<p class="project-contribution"><strong>My contribution:</strong> ', escapeHtml(project.contribution), '</p>',
      '<div class="project-footer"><div class="project-tech">', tech, '</div>', action, '</div>',
      '</article>'
    ].join("");
  }

  // Projects with a public website are displayed before private projects.
  function publicProjectsFirst(first, second) {
    return Number(Boolean(second.url)) - Number(Boolean(first.url));
  }

  // Split the shared project list into the two homepage sections.
  var companyProjects = projects
    .filter(function (project) { return project.category === "company"; })
    .sort(publicProjectsFirst);
  var personalProjects = projects
    .filter(function (project) { return project.category === "personal"; })
    .sort(publicProjectsFirst);

  // map() renders every project; join() combines the cards into one HTML string.
  if (companyTarget) companyTarget.innerHTML = companyProjects.map(renderProject).join("");
  if (personalTarget) personalTarget.innerHTML = personalProjects.map(renderProject).join("");
  document.getElementById("companyCount").textContent = companyProjects.length + " projects";
  document.getElementById("personalCount").textContent = personalProjects.length + " projects";

  // Store one playback updater per gallery for browser tab visibility changes.
  var galleryPlaybackControls = [];

  // Give every gallery navigation, but only autoplay it while it is near the viewport.
  document.querySelectorAll(".project-gallery").forEach(function (gallery) {
    var track = gallery.querySelector(".project-gallery-track");
    var slides = Array.from(track.children);
    var counter = gallery.querySelector(".project-gallery-count b");
    var buttons = gallery.querySelectorAll("[data-gallery-direction]");
    var autoplayTimer = null;
    var galleryIsVisible = false;
    var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Calculate the visible slide from the gallery's horizontal scroll position.
    function getActiveIndex() {
      return Math.round(track.scrollLeft / Math.max(track.clientWidth, 1));
    }

    // Wrap at both ends so autoplay can continue without stopping.
    function goToSlide(index) {
      var targetIndex = (index + slides.length) % slides.length;
      var isWrapping = index < 0 || index >= slides.length;
      track.scrollTo({ left: track.clientWidth * targetIndex, behavior: isWrapping ? "auto" : "smooth" });
    }

    function stopAutoplay() {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }

    // Off-screen galleries stay idle to avoid many timers and image updates on mobile.
    function startAutoplay() {
      stopAutoplay();
      if (!galleryIsVisible || slides.length < 2 || prefersReducedMotion || document.hidden) return;
      autoplayTimer = setInterval(function () {
        goToSlide(getActiveIndex() + 1);
      }, 4200);
    }

    function updateGalleryState() {
      var activeIndex = getActiveIndex();
      if (counter) counter.textContent = activeIndex + 1;
      buttons.forEach(function (button) {
        button.disabled = slides.length < 2;
      });
    }

    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        goToSlide(getActiveIndex() + Number(button.dataset.galleryDirection));
        startAutoplay();
      });
    });
    track.addEventListener("scroll", updateGalleryState, { passive: true });
    gallery.addEventListener("mouseenter", stopAutoplay);
    gallery.addEventListener("mouseleave", startAutoplay);
    gallery.addEventListener("focusin", stopAutoplay);
    gallery.addEventListener("focusout", startAutoplay);
    gallery.addEventListener("touchstart", stopAutoplay, { passive: true });
    gallery.addEventListener("touchend", startAutoplay, { passive: true });
    updateGalleryState();

    if ("IntersectionObserver" in window) {
      var galleryObserver = new IntersectionObserver(function (entries) {
        galleryIsVisible = entries[0].isIntersecting;
        if (galleryIsVisible) startAutoplay(); else stopAutoplay();
      }, { rootMargin: "160px 0px", threshold: 0.01 });
      galleryObserver.observe(gallery);
    } else {
      galleryIsVisible = true;
      startAutoplay();
    }

    galleryPlaybackControls.push(function () {
      if (document.hidden) stopAutoplay(); else startAutoplay();
    });
  });

  // Pause or restart only the galleries that are currently visible.
  document.addEventListener("visibilitychange", function () {
    galleryPlaybackControls.forEach(function (updatePlayback) { updatePlayback(); });
  });

  // Theme selection updates the page, browser colour, and stored preference.
  var themeToggle = document.getElementById("themeToggle");
  var themeIcon = document.getElementById("themeIcon");
  var themeLabel = document.getElementById("themeLabel");
  var themeColor = document.getElementById("themeColor");

  function applyTheme(theme) {
    var isDark = theme === "dark";
    document.documentElement.dataset.theme = isDark ? "dark" : "light";
    themeIcon.textContent = isDark ? "\u2600" : "\u263C";
    themeLabel.textContent = isDark ? "Light" : "Dark";
    themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
    themeToggle.setAttribute("title", isDark ? "Switch to light mode" : "Switch to dark mode");
    themeColor.setAttribute("content", isDark ? "#07090c" : "#f6f8fb");
  }

  applyTheme(document.documentElement.dataset.theme || "dark");

  themeToggle.addEventListener("click", function () {
    var nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    try { localStorage.setItem("portfolio-theme", nextTheme); } catch (error) {}
  });

  // Mobile navigation is connected through aria-expanded for accessibility.
  var menuButton = document.getElementById("menuButton");
  var mobileNav = document.getElementById("mobileNav");

  function closeMenu() {
    menuButton.setAttribute("aria-expanded", "false");
    mobileNav.classList.remove("open");
    document.body.classList.remove("menu-open");
  }

  menuButton.addEventListener("click", function () {
    var willOpen = menuButton.getAttribute("aria-expanded") !== "true";
    menuButton.setAttribute("aria-expanded", String(willOpen));
    mobileNav.classList.toggle("open", willOpen);
    document.body.classList.toggle("menu-open", willOpen);
  });

  mobileNav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeMenu();
  });

  // Update the floating header and active desktop link while scrolling.
  var header = document.getElementById("siteHeader");
  var desktopLinks = Array.from(document.querySelectorAll(".desktop-nav a"));
  var observedSections = Array.from(document.querySelectorAll("main section[id]"));

  function updateNavigation() {
    header.classList.toggle("scrolled", window.scrollY > 20);
    var current = "";
    // Loop in document order; the last passed section becomes active.
    observedSections.forEach(function (section) {
      if (window.scrollY >= section.offsetTop - 180) current = section.id;
    });
    desktopLinks.forEach(function (link) {
      link.classList.toggle("active", link.getAttribute("href") === "#" + current);
    });
  }

  window.addEventListener("scroll", updateNavigation, { passive: true });
  updateNavigation();

  // Reveal sections only when they enter the viewport.
  var revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -24px", threshold: 0.01 });
    revealItems.forEach(function (item) { revealObserver.observe(item); });
  } else {
    revealItems.forEach(function (item) { item.classList.add("visible"); });
  }

  // Copy the contact email and show confirmation inside the compact button.
  var copyEmailButton = document.getElementById("copyEmail");
  var copyResetTimer;

  function showCopiedState() {
    copyEmailButton.textContent = "Copied";
    copyEmailButton.classList.add("copied");
    copyEmailButton.setAttribute("aria-label", "Email address copied");
    clearTimeout(copyResetTimer);
    copyResetTimer = setTimeout(function () {
      copyEmailButton.textContent = "Copy";
      copyEmailButton.classList.remove("copied");
      copyEmailButton.setAttribute("aria-label", "Copy email address");
    }, 1800);
  }

  function fallbackCopy(email) {
    // Fallback for local previews or older browsers without Clipboard API.
    var temporaryInput = document.createElement("textarea");
    temporaryInput.value = email;
    temporaryInput.setAttribute("readonly", "");
    temporaryInput.style.position = "fixed";
    temporaryInput.style.opacity = "0";
    document.body.appendChild(temporaryInput);
    temporaryInput.select();
    document.execCommand("copy");
    temporaryInput.remove();
    showCopiedState();
  }

  copyEmailButton.addEventListener("click", function () {
    var email = "saikumar.pydev@gmail.com";
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(email).then(showCopiedState).catch(function () {
        fallbackCopy(email);
      });
      return;
    }
    fallbackCopy(email);
  });

  // Keep the footer year current without manual editing.
document.getElementById("currentYear").textContent = new Date().getFullYear();


/* =========================================================
   PORTFOLIO ASSISTANT
========================================================= */

var assistantLauncher = document.getElementById("assistantLauncher");
var assistantPanel = document.getElementById("assistantPanel");
var assistantClose = document.getElementById("assistantClose");
var assistantForm = document.getElementById("assistantForm");
var assistantInput = document.getElementById("assistantInput");
var assistantMessages = document.getElementById("assistantMessages");


function openAssistant() {
  assistantPanel.classList.add("open");
  assistantPanel.setAttribute("aria-hidden", "false");
  assistantInput.focus();
}


function closeAssistant() {
  assistantPanel.classList.remove("open");
  assistantPanel.setAttribute("aria-hidden", "true");
}


function addAssistantMessage(message, type) {
  var messageElement = document.createElement("div");

  messageElement.className = "assistant-message " + type;
  messageElement.textContent = message;

  assistantMessages.appendChild(messageElement);
  assistantMessages.scrollTop = assistantMessages.scrollHeight;
}


function getProjectAnswer() {
  if (!projects.length) {
    return "Project information is currently unavailable.";
  }

  var featuredProjects = projects.slice(0, 5);

  var projectList = featuredProjects.map(function (project) {
    return "• " + project.name + "\n  " + project.subtitle;
  }).join("\n\n");

  return (
    "Featured projects:\n\n" +
    projectList +
    "\n\nUse the Projects section to view all projects."
  );
}


function getPortfolioAnswer(question) {
  var query = question.toLowerCase().trim();

  if (
    query.includes("who is") ||
    query.includes("who are") ||
    query.includes("about him") ||
    query.includes("know him") ||
    query.includes("saikumar")
  ) {
    return (
      "Saikumar Mallarapu is a Python Django Developer with " +
      "production experience in Django applications, REST APIs, " +
      "PostgreSQL systems, automation workflows, and backend development."
    );
  }

  if (
    query.includes("skill") ||
    query.includes("technology") ||
    query.includes("tech stack") ||
    query.includes("what he knows")
  ) {
    return (
      "Main skills:\n" +
      "• Python\n" +
      "• Django\n" +
      "• Django REST Framework\n" +
      "• PostgreSQL\n" +
      "• REST APIs\n" +
      "• Redis and Celery\n" +
      "• Docker, Linux, Nginx, Gunicorn, and AWS"
    );
  }

  if (
    query.includes("experience") ||
    query.includes("where he works") ||
    query.includes("where is he working") ||
    query.includes("working company") ||
    query.includes("company") ||
    query.includes("job")
  ) {
    return (
      "Saikumar works as a Python Django Developer at M7 Corporation " +
      "in Chennai, India."
    );
  }

  if (
    query.includes("location") ||
    query.includes("where is he") ||
    query.includes("city") ||
    query.includes("place")
  ) {
    return "His current work location is Chennai, India.";
  }

  var cleanedProjectQuery = query
  .replace("project", "")
  .replace("details", "")
  .trim();

  var matchedProject = projects.find(function (project) {
    var projectName = project.name.toLowerCase();
    var projectSubtitle = project.subtitle.toLowerCase();

    return (
      projectName.includes(cleanedProjectQuery) ||
      projectSubtitle.includes(cleanedProjectQuery)
    );
  });

  if (cleanedProjectQuery && matchedProject) {
    return (
      matchedProject.name + "\n\n" +
      matchedProject.subtitle + "\n\n" +
      matchedProject.summary + "\n\n" +
      "My contribution:\n" +
      matchedProject.contribution + "\n\n" +
      "Technologies:\n" +
      matchedProject.tech.join(", ")
    );
  }

  if (
    query.includes("project") ||
    query.includes("portfolio") ||
    query.includes("what he built")
  ) {
    return getProjectAnswer();
  }

  if (
    query.includes("education") ||
    query.includes("degree") ||
    query.includes("study") ||
    query.includes("qualification")
  ) {
    return (
      "Education:\n" +
      "• Master of Computer Applications\n" +
      "• Bachelor of Computer Applications"
    );
  }

  if (
    query.includes("mobile") ||
    query.includes("phone") ||
    query.includes("number") ||
    query.includes("call")
  ) {
    return "His phone number is +91 9360650448.";
  }

  if (
    query.includes("email") ||
    query.includes("mail")
  ) {
    return "His email address is saikumar.pydev@gmail.com.";
  }

  if (
    query.includes("contact") ||
    query.includes("reach")
  ) {
    return (
      "Contact details:\n" +
      "Email: saikumar.pydev@gmail.com\n" +
      "Phone: +91 9360650448"
    );
  }

  if (
    query.includes("resume") ||
    query.includes("cv")
  ) {
    return (
      "You can open his resume using the Resume button " +
      "in the portfolio header."
    );
  }

  return (
    "Please ask about Saikumar's profile, skills, projects, experience, " +
    "education, location, resume, email, or phone number."
  );
}


assistantLauncher.addEventListener("click", openAssistant);
assistantClose.addEventListener("click", closeAssistant);


function showTyping() {
  var typing = document.createElement("div");

  typing.className = "assistant-typing";
  typing.id = "assistantTyping";
  typing.innerHTML = "<span></span><span></span><span></span>";

  assistantMessages.appendChild(typing);
  assistantMessages.scrollTop = assistantMessages.scrollHeight;
}

function hideTyping() {
  var typing = document.getElementById("assistantTyping");

  if (typing) {
    typing.remove();
  }
}

function handleAssistantQuestion(question) {
  if (!question) {
    return;
  }

  addAssistantMessage(question, "user");
  showTyping();

  var answer = getPortfolioAnswer(question);

  window.setTimeout(function () {
    hideTyping();
    addAssistantMessage(answer, "bot");
    showAssistantSuggestions();
  }, 700);
}

assistantForm.addEventListener("submit", function (event) {
  event.preventDefault();

  var question = assistantInput.value.trim();

  assistantInput.value = "";
  handleAssistantQuestion(question);
});

document.querySelectorAll("[data-question]").forEach(function (button) {
  button.addEventListener("click", function () {
    handleAssistantQuestion(button.dataset.question);
  });
});
function showAssistantSuggestions() {
  var suggestions = document.createElement("div");

  suggestions.className = "assistant-suggestions";

  suggestions.innerHTML = `
    <button type="button" data-question="Who is Saikumar?">About</button>
    <button type="button" data-question="What are his skills?">Skills</button>
    <button type="button" data-question="Show me his projects">Projects</button>
    <button type="button" data-question="How can I contact him?">Contact</button>
  `;

  assistantMessages.appendChild(suggestions);

  suggestions.querySelectorAll("[data-question]").forEach(function (button) {
    button.addEventListener("click", function () {
      suggestions.remove();
      handleAssistantQuestion(button.dataset.question);
    });
  });

  assistantMessages.scrollTop = assistantMessages.scrollHeight;
}

}());
