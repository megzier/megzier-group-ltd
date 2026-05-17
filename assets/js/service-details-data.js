(function () {
  const mediaCycle = [
    "assets/images/service/details-img01.webp",
    "assets/images/service/details-img02.webp",
    "assets/images/service/details-img03.webp",
    "assets/images/service/hm1-img01.webp",
    "assets/images/service/hm1-img02.webp",
    "assets/images/service/hm1-img03.webp"
  ];

  const iconCycle = [
    "assets/images/service/hm5-icon01.webp",
    "assets/images/service/hm5-icon02.webp",
    "assets/images/service/hm5-icon03.webp",
    "assets/images/service/hm5-icon04.webp",
    "assets/images/service/hm5-icon05.webp",
    "assets/images/service/hm5-icon06.webp",
    "assets/images/service/hm6-icon01.webp",
    "assets/images/service/hm6-icon02.webp",
    "assets/images/service/hm6-icon03.webp",
    "assets/images/service/hm6-icon04.webp",
    "assets/images/service/hm7-icon01.webp",
    "assets/images/service/hm7-icon02.webp",
    "assets/images/service/hm7-icon03.webp",
    "assets/images/service/hm7-icon04.webp",
    "assets/images/service/hm8-icon01.webp",
    "assets/images/service/hm8-icon02.webp",
    "assets/images/service/hm8-icon03.webp",
    "assets/images/service/hm8-icon04.webp"
  ];

  const relatedPages = [
    { label: "Visit Web Design Agency", href: "web-design-agency.html" },
    { label: "Visit Software Agency", href: "software-agency.html" },
    { label: "Visit IT Services Page", href: "it-services.html" },
    { label: "Visit Software Agency", href: "software-agency.html" },
    { label: "Visit Digital Marketing", href: "digital-marketing.html" },
    { label: "Visit Digital Marketing", href: "digital-marketing.html" },
    { label: "Visit Digital Marketing", href: "digital-marketing.html" },
    { label: "Visit IT Services Page", href: "it-services.html" },
    { label: "Visit Business Consulting", href: "business-consulting.html" },
    { label: "Visit Business Consulting", href: "business-consulting.html" },
    { label: "Visit IT Services Page", href: "it-services.html" },
    { label: "Visit Business Consulting", href: "business-consulting.html" },
    { label: "Visit Startup Page", href: "startup.html" },
    { label: "Visit Software Agency", href: "software-agency.html" },
    { label: "Visit IT Services Page", href: "it-services.html" },
    { label: "Visit IT Services Page", href: "it-services.html" },
    { label: "Visit AI Agency", href: "ai-agency.html" },
    { label: "Visit Software Agency", href: "software-agency.html" }
  ];

  const descriptors = [
    {
      slug: "website-development",
      title: "Website Development",
      titleHtml: "Website Development",
      summary: [
        "High-performance websites using React, Next.js, and modern stacks.",
        "We design and build responsive business websites that load fast, stay maintainable, and support conversion from the first launch."
      ],
      process: [
        {
          title: "Discovery",
          text: "We map pages, content, and launch goals before development starts."
        },
        {
          title: "Delivery",
          text: "We ship a clean, SEO-ready website that can expand with your business."
        }
      ],
      features: [
        "Responsive mobile-first builds",
        "Fast loading and SEO structure",
        "CMS or custom content flow",
        "Launch support and handoff"
      ],
      result: "The result is a website that looks sharp, loads quickly, and gives your team a practical sales tool.",
      tags: ["React", "Next.js", "SEO", "Responsive", "CMS"]
    },
    {
      slug: "mobile-app-development",
      title: "Mobile App Development",
      titleHtml: "Mobile App Development",
      summary: [
        "iOS and Android apps with React Native and Flutter.",
        "We build apps that support real workflows, customer engagement, and repeat use across mobile devices."
      ],
      process: [
        {
          title: "Product Mapping",
          text: "We define the app flow, screens, and feature set around the real use case."
        },
        {
          title: "Release Support",
          text: "We prepare the build for store submission, testing, and future updates."
        }
      ],
      features: [
        "Cross-platform delivery",
        "API and backend integration",
        "Secure user flows",
        "App store ready release support"
      ],
      result: "The result is a mobile product that feels practical for users and straightforward for your team to maintain.",
      tags: ["React Native", "Flutter", "iOS", "Android", "APIs"]
    },
    {
      slug: "cybersecurity",
      title: "Cybersecurity",
      titleHtml: "Cybersecurity",
      summary: [
        "Penetration testing, vulnerability audits, security hardening, firewall setup, and threat monitoring.",
        "We reduce risk with practical assessments and hardening steps that protect systems, users, and data."
      ],
      process: [
        {
          title: "Assessment",
          text: "We review the environment for exposed services, weak access controls, and obvious attack paths."
        },
        {
          title: "Protection",
          text: "We harden the stack and set up controls that reduce the chance of avoidable incidents."
        }
      ],
      features: [
        "Vulnerability assessment",
        "Firewall and access control",
        "Security hardening",
        "Monitoring and response"
      ],
      result: "The result is a safer environment with clear steps for reducing risk and responding faster when issues appear.",
      tags: ["Audit", "Hardening", "Firewall", "Monitoring", "Response"]
    },
    {
      slug: "custom-software-pos",
      title: "Custom Software & POS",
      titleHtml: "Custom Software &amp;<br>POS",
      summary: [
        "POS systems, PMS, accounting software, ERP. Bespoke enterprise solutions for your operations.",
        "We design custom systems that align with your workflow instead of forcing your business to fit a generic product."
      ],
      process: [
        {
          title: "Workflow Design",
          text: "We translate your operation into modules, roles, and screens that match the business process."
        },
        {
          title: "Implementation",
          text: "We build a system that can handle transactions, records, and reporting without unnecessary complexity."
        }
      ],
      features: [
        "Point of sale workflows",
        "Enterprise modules",
        "Role-based access",
        "Operational reporting"
      ],
      result: "The result is a custom platform that removes manual work and gives your team better control over operations.",
      tags: ["POS", "ERP", "PMS", "Accounting", "Enterprise"]
    },
    {
      slug: "graphic-design-branding",
      title: "Graphic Design & Branding",
      titleHtml: "Graphic Design &amp;<br>Branding",
      summary: [
        "Complete brand identity - logo, guidelines, print, and digital materials that command attention.",
        "We shape brand assets that stay consistent across print, web, and social channels while keeping the identity recognizable."
      ],
      process: [
        {
          title: "Brand Direction",
          text: "We establish the visual direction, tone, and practical design rules for the identity."
        },
        {
          title: "Asset Delivery",
          text: "We produce logos, layouts, and marketing assets that your team can use immediately."
        }
      ],
      features: [
        "Logo and identity systems",
        "Brand guidelines",
        "Marketing collateral",
        "Print and digital assets"
      ],
      result: "The result is a brand system that is easier to apply consistently across campaigns and customer touchpoints.",
      tags: ["Branding", "Logo", "Print", "Identity", "Design"]
    },
    {
      slug: "e-commerce-solutions",
      title: "E-Commerce Solutions",
      titleHtml: "E-Commerce Solutions",
      summary: [
        "WooCommerce, Shopify, and custom stores with M-Pesa, card payments, and inventory management.",
        "We build stores that are easy to manage, easy to buy from, and ready for local payment workflows."
      ],
      process: [
        {
          title: "Store Setup",
          text: "We structure products, categories, checkout, and admin flows so selling stays manageable."
        },
        {
          title: "Payments",
          text: "We connect checkout and inventory tools so the store can run smoothly after launch."
        }
      ],
      features: [
        "Shopify and WooCommerce",
        "M-Pesa and card checkout",
        "Inventory management",
        "Order and product workflows"
      ],
      result: "The result is a store that supports purchases, inventory, and growth without a messy backend.",
      tags: ["E-Commerce", "M-Pesa", "Shopify", "WooCommerce", "Payments"]
    },
    {
      slug: "google-my-business-seo",
      title: "Google My Business & SEO",
      titleHtml: "Google My Business &amp;<br>SEO",
      summary: [
        "Full GMB setup, review management, and local SEO strategy to dominate Google results.",
        "We improve local visibility with profiles, pages, and content that help your business rank and stay discoverable."
      ],
      process: [
        {
          title: "Visibility Setup",
          text: "We optimize the profile, service categories, and local signals that influence discovery."
        },
        {
          title: "Ranking Support",
          text: "We align content, reviews, and on-page SEO with the search terms that matter."
        }
      ],
      features: [
        "GMB setup and optimization",
        "Review management",
        "Local SEO planning",
        "On-page technical support"
      ],
      result: "The result is a stronger search presence that supports visibility, calls, and local trust.",
      tags: ["SEO", "GMB", "Local SEO", "Google Maps", "Reviews"]
    },
    {
      slug: "professional-email-cloud",
      title: "Professional Email & Cloud",
      titleHtml: "Professional Email &amp;<br>Cloud",
      summary: [
        "Google Workspace, Microsoft 365, custom domains, cloud migration, and managed hosting.",
        "We set up reliable communication and hosting systems so your team can work with a professional domain and stable infrastructure."
      ],
      process: [
        {
          title: "Workspace Setup",
          text: "We configure email, DNS, and collaboration tools around your domain and user count."
        },
        {
          title: "Migration",
          text: "We move data and hosting in a way that keeps daily operations available and organized."
        }
      ],
      features: [
        "Workspace setup",
        "Domain email configuration",
        "Cloud migration",
        "Managed hosting and backup"
      ],
      result: "The result is a professional communication stack with less downtime and clearer ownership.",
      tags: ["Email", "Google Workspace", "Microsoft 365", "Hosting", "Cloud"]
    },
    {
      slug: "portfolio-profile-creation",
      title: "Portfolio & Profile Creation",
      titleHtml: "Portfolio &amp;<br>Profile Creation",
      summary: [
        "Digital portfolios, personal brand websites, and company profiles that open doors.",
        "We create polished profiles that present people, teams, and companies with clear structure and strong visual identity."
      ],
      process: [
        {
          title: "Content Structuring",
          text: "We organize achievements, services, and proof points so the story is easy to follow."
        },
        {
          title: "Presentation",
          text: "We package the profile for web, PDF, or pitch use depending on the audience."
        }
      ],
      features: [
        "Personal brand sites",
        "Company profile decks",
        "Case study layouts",
        "Pitch-ready presentation"
      ],
      result: "The result is a portfolio or profile that helps the right audience understand your value quickly.",
      tags: ["Portfolio", "Profile", "Pitch Deck", "Brand", "Presentation"]
    },
    {
      slug: "surveys-data-collection",
      title: "Surveys & Data Collection",
      titleHtml: "Surveys &amp;<br>Data Collection",
      summary: [
        "Digital survey design, deployment platforms, data collection tools, and analysis reports.",
        "We build survey systems that collect reliable responses and turn them into information teams can act on."
      ],
      process: [
        {
          title: "Survey Design",
          text: "We structure the questions and response flow so the form is easy to complete and useful to analyze."
        },
        {
          title: "Reporting",
          text: "We organize the captured data into reports that support planning and decisions."
        }
      ],
      features: [
        "Survey forms and flows",
        "Data capture tools",
        "Response management",
        "Analysis-ready exports"
      ],
      result: "The result is a cleaner data pipeline that supports research, feedback, and operational insight.",
      tags: ["Survey", "Forms", "Data", "Research", "Reporting"]
    },
    {
      slug: "network-it-infrastructure",
      title: "Network & IT Infrastructure",
      titleHtml: "Network &amp; IT<br>Infrastructure",
      summary: [
        "LAN/WAN, server setup, structured cabling, VPN, and complete office IT deployment.",
        "We design the network foundation that supports devices, users, and secure office operations."
      ],
      process: [
        {
          title: "Infrastructure Audit",
          text: "We review the current setup and map the hardware, access, and connectivity requirements."
        },
        {
          title: "Deployment",
          text: "We install and configure the network so it can support business use with fewer bottlenecks."
        }
      ],
      features: [
        "LAN/WAN design",
        "Structured cabling",
        "VPN and security",
        "Server and office setup"
      ],
      result: "The result is an IT foundation that is easier to manage and ready for real day-to-day work.",
      tags: ["Networking", "LAN", "WAN", "VPN", "Infrastructure"]
    },
    {
      slug: "data-analytics",
      title: "Data & Analytics",
      titleHtml: "Data &amp; Analytics",
      summary: [
        "Power BI dashboards, database architecture, business intelligence, and reporting automation.",
        "We organize data into dashboards and reports that help decision makers see what matters fast."
      ],
      process: [
        {
          title: "Data Modeling",
          text: "We structure the data so reports and dashboards remain consistent and meaningful."
        },
        {
          title: "Insight Delivery",
          text: "We turn raw records into reports and views that can guide daily and strategic decisions."
        }
      ],
      features: [
        "Dashboards and BI",
        "Data modeling",
        "Automated reporting",
        "KPI visibility"
      ],
      result: "The result is a clearer reporting layer that helps leaders track performance without manual effort.",
      tags: ["Analytics", "Power BI", "BI", "Dashboards", "Reporting"]
    },
    {
      slug: "research-feasibility",
      title: "Research & Feasibility",
      titleHtml: "Research &amp;<br>Feasibility",
      summary: [
        "IT feasibility studies, technology research, market analysis, and strategic consulting.",
        "We evaluate ideas before investment so teams can choose the right scope, tools, and delivery path."
      ],
      process: [
        {
          title: "Research",
          text: "We review market signals, technical requirements, and operational assumptions before building."
        },
        {
          title: "Recommendation",
          text: "We package the findings into a practical plan with clear risks, costs, and next steps."
        }
      ],
      features: [
        "Feasibility review",
        "Market and technical research",
        "Cost and risk analysis",
        "Implementation guidance"
      ],
      result: "The result is a stronger decision-making process before large time or budget commitments are made.",
      tags: ["Research", "Feasibility", "Strategy", "Analysis", "Consulting"]
    },
    {
      slug: "cloud-services-hosting",
      title: "Cloud Services & Hosting",
      titleHtml: "Cloud Services &amp;<br>Hosting",
      summary: [
        "AWS, Azure, Google Cloud management, website hosting, backups, and disaster recovery.",
        "We move infrastructure to reliable cloud environments and keep it available, recoverable, and monitored."
      ],
      process: [
        {
          title: "Cloud Planning",
          text: "We choose the right hosting approach based on the application load, uptime needs, and recovery targets."
        },
        {
          title: "Operations",
          text: "We handle the monitoring, backup, and deployment side so the stack stays steady after launch."
        }
      ],
      features: [
        "Cloud setup and management",
        "Hosting and deployment",
        "Backups and recovery",
        "Performance monitoring"
      ],
      result: "The result is hosting that is easier to maintain and more resilient when traffic or failures increase.",
      tags: ["AWS", "Azure", "Google Cloud", "Hosting", "Recovery"]
    },
    {
      slug: "it-training-capacity-building",
      title: "IT Training & Capacity Building",
      titleHtml: "IT Training &amp;<br>Capacity Building",
      summary: [
        "Corporate tech training, software onboarding, digital skills workshops, and learning programs.",
        "We help teams use tools confidently by building practical training that fits real workplace needs."
      ],
      process: [
        {
          title: "Skills Review",
          text: "We assess the current comfort level and map the learning outcomes that matter most."
        },
        {
          title: "Training Delivery",
          text: "We run workshops and onboarding sessions that make adoption faster and less stressful."
        }
      ],
      features: [
        "Team workshops",
        "Software onboarding",
        "Digital skills programs",
        "Adoption support"
      ],
      result: "The result is a more capable team that can adopt systems with less friction and support overhead.",
      tags: ["Training", "Onboarding", "Workshops", "Skills", "Capacity"]
    },
    {
      slug: "managed-it-support",
      title: "Managed IT Support",
      titleHtml: "Managed IT Support",
      summary: [
        "Monthly IT retainers, remote monitoring, preventive maintenance, and priority helpdesk.",
        "We keep systems healthy with ongoing support, proactive checks, and fast response when issues appear."
      ],
      process: [
        {
          title: "Monitoring",
          text: "We watch for issues before they become downtime and keep the support queue organized."
        },
        {
          title: "Maintenance",
          text: "We handle updates and preventive work so the environment stays stable over time."
        }
      ],
      features: [
        "Retainer support",
        "Remote monitoring",
        "Preventive maintenance",
        "Priority helpdesk"
      ],
      result: "The result is a support model that keeps your team moving without waiting on avoidable tech issues.",
      tags: ["Support", "Helpdesk", "Maintenance", "Monitoring", "Retainer"]
    },
    {
      slug: "ai-automation",
      title: "AI & Automation",
      titleHtml: "AI &amp; Automation",
      summary: [
        "Chatbot development, AI integrations, workflow automation, and payment gateway setups.",
        "We automate repeat work and connect AI tools where they improve speed, consistency, and service quality."
      ],
      process: [
        {
          title: "Use Case Mapping",
          text: "We identify the repetitive work or decision flow that AI can support without adding noise."
        },
        {
          title: "Implementation",
          text: "We connect the automation so it improves speed while remaining understandable and controlled."
        }
      ],
      features: [
        "Chatbots and copilots",
        "Workflow automation",
        "AI integrations",
        "Process orchestration"
      ],
      result: "The result is less manual repetition and a more efficient workflow for the team and your customers.",
      tags: ["AI", "Automation", "Chatbot", "Workflow", "Integration"]
    },
    {
      slug: "digital-payments-integration",
      title: "Digital Payments Integration",
      titleHtml: "Digital Payments<br>Integration",
      summary: [
        "M-Pesa Daraja API, Stripe, PayPal, and bank integrations for apps, websites, and POS systems.",
        "We connect payment channels so your systems can collect, verify, and reconcile transactions cleanly."
      ],
      process: [
        {
          title: "Gateway Planning",
          text: "We choose the payment flow that fits the platform, customer journey, and reconciliation needs."
        },
        {
          title: "Integration",
          text: "We wire the gateways into the product so payments move smoothly from checkout to reporting."
        }
      ],
      features: [
        "M-Pesa Daraja API",
        "Card and wallet payments",
        "Bank integrations",
        "Reconciliation support"
      ],
      result: "The result is a payment stack that is easier to trust, monitor, and scale across products.",
      tags: ["Payments", "M-Pesa", "Stripe", "PayPal", "Fintech"]
    }
  ];

  function assignVisuals(entry, index) {
    const heroImage = mediaCycle[index % mediaCycle.length];
    return {
      ...entry,
      icon: iconCycle[index % iconCycle.length],
      heroImage,
      supportImages: [
        mediaCycle[(index + 1) % mediaCycle.length],
        mediaCycle[(index + 2) % mediaCycle.length]
      ],
      relatedPage: relatedPages[index % relatedPages.length],
      link: `service-details.html?service=${encodeURIComponent(entry.slug)}`
    };
  }

  window.MEGZIER_SERVICE_DETAILS = descriptors.map(assignVisuals);
})();
