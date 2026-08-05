/*
  PROJECT DATA SOURCE:
  This file only stores project content. assets/js/script.js reads
  window.portfolioProjects and converts every object into a project card.

  ADD A NEW PROJECT:
  Copy one project object, update its values, and keep the comma between objects.
  category: "company" or "personal"
  url: use "" when the project is private or has no public link
  images: add one or more paths from assets/images/projects/<project-name>/
  tech: displayed as the small technology list at the bottom of the card
  accent: controls the card highlight colour
*/
window.portfolioProjects = [
  // M7 Corporation work
  {
    name: "Thaagam.org",
    subtitle: "NGO Management & Donation Platform",
    category: "company",
    url: "https://thaagam.org/",
    images: ["assets/images/projects/thaagam/thaagam.webp", "assets/images/projects/thaagam/thaagam2page.webp", "assets/images/projects/thaagam/thaagam3page.webp"],
    summary: "An enterprise NGO platform supporting donations, education sponsorship, campaigns, inventory, analytics, and administrator workflows.",
    contribution: "Built donation and student modules, automation bots, image QC tools, inventory logic, referral flows, analytics funnels, and Excel workflows.",
    tech: ["Django", "PostgreSQL", "Bootstrap", "openpyxl"],
    accent: "blue"
  },
  {
    name: "M7.Digital & M7 Corporation",
    subtitle: "Company Web Platform",
    category: "company",
    url: "https://m7.digital/",
    images: ["assets/images/projects/m7-digital/m7digital.webp", "assets/images/projects/m7-digital/m7digital2page.webp", "assets/images/projects/m7-digital/m7digital3page.webp"],
    summary: "Corporate platforms for presenting products, client projects, internal tools, and business services.",
    contribution: "Set up the M7 dashboard, integrated the Label Bot, built Help Desk UI, improved mobile navigation, and resolved production issues.",
    tech: ["Django", "PostgreSQL", "JavaScript"],
    accent: "purple"
  },
  {
    name: "Comm AI",
    subtitle: "AI Communication Platform",
    category: "company",
    url: "https://commai.m7corporation.com/",
    images: ["assets/images/projects/comm-ai/commai.webp", "assets/images/projects/comm-ai/commai2page.webp", "assets/images/projects/comm-ai/commai3page.webp"],
    summary: "A communication platform for managing contacts and automated outreach campaigns.",
    contribution: "Set up the project, developed email campaign modules, and fixed contact-fetching and WhatsApp duplication issues.",
    tech: ["Python", "Django", "AI Integration"],
    accent: "green"
  },
  {
    name: "AcustomSong.com",
    subtitle: "Music Collaboration Platform",
    category: "company",
    url: "https://acustomsong.com/",
    images: ["assets/images/projects/acustomsong/acustomsong.webp", "assets/images/projects/acustomsong/acustomsong2page.webp", "assets/images/projects/acustomsong/acustomsong3page.webp"],
    summary: "A structured communication platform connecting Relationship Managers with Song Creators.",
    contribution: "Built the chat workflow, tested message flows, refined the interface, and validated user interactions.",
    tech: ["Python", "Django", "Messaging"],
    accent: "orange"
  },
  {
    name: "GCC Workforce",
    subtitle: "Attendance & Workforce System",
    category: "company",
    url: "https://privateworkforce.gccservices.in/",
    images: ["assets/images/projects/gcc-workforce/gccworkforce.webp"],
    summary: "A workforce platform covering attendance, leave approval, education operations, and park verification.",
    contribution: "Developed dashboards, approval workflows, hierarchical filtering, Excel uploads, and role-based validation.",
    tech: ["Django", "PostgreSQL", "openpyxl"],
    accent: "blue"
  },
  {
    name: "Tulu Land & Tulu World Foundation",
    subtitle: "Foundation Web Platforms",
    category: "company",
    url: "https://tuluworld.org.in/",
    images: ["assets/images/projects/tulu-land/tululand.webp", "assets/images/projects/tulu-land/tululand2page.webp", "assets/images/projects/tulu-land/tululand3page.webp"],
    summary: "Foundation platforms with causes, user onboarding, referrals, donations, and receipt management.",
    contribution: "Developed the platforms, added OTP authentication, barcode receipts, referred-user dashboards, and receipt verification.",
    tech: ["Django", "PostgreSQL", "Bootstrap"],
    accent: "green"
  },
  {
    name: "Nicola Foundation",
    subtitle: "Foundation Management Platform",
    category: "company",
    url: "https://nicolafoundation.com/",
    images: ["assets/images/projects/nicola-foundation/nikolafoundation.webp", "assets/images/projects/nicola-foundation/nikolafoundation2page.webp", "assets/images/projects/nicola-foundation/nikolafoundation3page.webp"],
    summary: "A Django-based web platform supporting the foundation's public presence and internal operations.",
    contribution: "Delivered the platform and resolved dashboard, performance, UI consistency, and data display issues.",
    tech: ["Python", "Django", "PostgreSQL"],
    accent: "purple"
  },
  {
    name: "KOKO Material",
    subtitle: "Product Catalogue Platform",
    category: "company",
    url: "https://www.kokomaterials.com/",
    images: ["assets/images/projects/koko-material/kokometarials.webp", "assets/images/projects/koko-material/kokometarials2page.webp", "assets/images/projects/koko-material/kokometarials3page.webp"],
    summary: "A product-focused website used to manage and present material listings.",
    contribution: "Handled product updates, status management, content changes, and listing verification.",
    tech: ["Django", "PostgreSQL"],
    accent: "orange"
  },
  {
    name: "Stock Portal",
    subtitle: "Grocery, Gadgets & POS Platform",
    category: "company",
    url: "https://stock.m7.digital/",
    summary: "A multi-store commerce and POS system covering inventory, purchasing, suppliers, billing, and customer management.",
    contribution: "Built store workflows, barcode billing, hold/unhold sales, supplier management, Excel flows, WhatsApp billing, and Quick Print.",
    tech: ["Django", "PostgreSQL", "POS", "Barcode"],
    accent: "green"
  },
  {
    name: "Bharath Medical College and Hospital",
    subtitle: "Hospital Web Platform",
    category: "company",
    url: "https://bharathmedicalcollege.com/",
    summary: "A hospital platform for doctors, departments, clinical services, appointments, events, and public content.",
    contribution: "Built core pages and management workflows, mapped doctors to services, added appointments, validated content, and deployed updates.",
    tech: ["Django", "PostgreSQL", "Healthcare"],
    accent: "blue"
  },
  {
    name: "Email Campaign Bot",
    subtitle: "Lead Generation & Outreach Automation",
    category: "company",
    url: "",
    summary: "An internal lead-generation system for creating, validating, scheduling, sending, and monitoring high-volume email campaigns.",
    contribution: "Built reusable campaign bots, dynamic templates, recipient validation, bounce handling, SMTP configuration, daily sending workflows, and delivery monitoring.",
    tech: ["Python", "SMTP", "Automation"],
    accent: "orange"
  },
  {
    name: "Invoice Generator",
    subtitle: "Multi-client Billing System",
    category: "company",
    url: "",
    summary: "A complete invoice workflow from structured data entry to preview, PDF generation, and delivery.",
    contribution: "Built user-specific templates, document generation, PDF layouts, footers, previews, and validation workflows.",
    tech: ["Python", "Django", "WeasyPrint"],
    accent: "purple"
  },
  {
    name: "LegalCompass",
    subtitle: "AI Legal Analysis Platform",
    category: "company",
    url: "",
    summary: "An AI-assisted platform for reviewing, comparing, organizing, and processing legal judgments.",
    contribution: "Built judgment analysis and comparison, case management, and a bulk JSON extraction pipeline.",
    tech: ["Python", "Django", "AI Integration"],
    accent: "blue"
  },
  // Independent and personal products
  {
    name: "Balaram Child Neuro Care",
    subtitle: "Healthcare Management System",
    category: "personal",
    url: "https://saipoojademo.pythonanywhere.com/",
    images: [
      "assets/images/projects/balaram-child-neuro-care/balaramchildcare.webp",
      "assets/images/projects/balaram-child-neuro-care/balaramchildcare2page.webp",
      "assets/images/projects/balaram-child-neuro-care/balaramchildcare3page.webp",
      "assets/images/projects/balaram-child-neuro-care/balaramchildcare4page.webp",
      "assets/images/projects/balaram-child-neuro-care/balaramchildcare5page.webp"
    ],
    summary: "A multi-role care platform connecting owners, department heads, therapists, parents, and patient workflows.",
    contribution: "Developed patient management, activities, progress reports, documents, announcements, and therapist-parent messaging.",
    tech: ["Django", "DRF", "PostgreSQL"],
    accent: "green"
  },
  {
    name: "Saipooja Software Solutions",
    subtitle: "CRM & Business Automation Platform",
    category: "personal",
    url: "https://saipoojasolutions.in/",
    images: ["assets/images/projects/saipooja/saipoojasolutions.webp", "assets/images/projects/saipooja/saipoojasolutions2page.webp", "assets/images/projects/saipooja/saipoojasolutions3page.webp"],
    summary: "A business platform combining client management, billing, staff operations, dashboards, and workflow automation.",
    contribution: "Designed and developed CRM modules, REST APIs, authentication, reporting, billing, and business workflows.",
    tech: ["Django", "PostgreSQL", "REST API"],
    accent: "orange"
  },
  {
    name: "TCP File Transfer & Remote Access",
    subtitle: "Networking System",
    category: "personal",
    url: "",
    summary: "A Python networking system for secure file, folder, and bulk data transfer with remote connectivity.",
    contribution: "Designed the architecture, implemented socket transfer and remote access, added smart transfer logic, logging, and reliability improvements.",
    tech: ["Python", "TCP", "Sockets", "Networking"],
    accent: "purple"
  }
];
