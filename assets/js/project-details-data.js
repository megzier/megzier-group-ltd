(function () {
  const defaultCardImages = [
    "assets/images/project/details-img02.webp",
    "assets/images/project/details-img03.webp"
  ];

  function cards(title1, text1, title2, text2) {
    return [
      { image: defaultCardImages[0], title: title1, text: text1 },
      { image: defaultCardImages[1], title: title2, text: text2 }
    ];
  }

  window.MEGZIER_PROJECT_DETAILS = [
    {
      slug: "webx-development",
      title: "Webx - Websie Development",
      sector: "Development",
      status: "Concept",
      client: "Megzier template showcase",
      timeline: "August 2025",
      duration: "Short build",
      heroImage: "assets/images/project/project01.webp",
      summary: [
        "Webx is a responsive business website concept built around clear messaging, service discovery, and quick navigation.",
        "The layout keeps the hero section, service cards, and call to action in a simple flow that works across desktop and mobile."
      ],
      benefitsSummary: "This case study shows how a compact website can still support lead generation and future page expansion.",
      benefits: [
        "Simple conversion flow",
        "Reusable card structure",
        "Responsive layout",
        "Easy to expand with more pages"
      ],
      cards: cards(
        "Discovery",
        "Mapped the page flow, service priority, and content hierarchy.",
        "Delivery",
        "Built a lean layout that can be reused for additional business pages."
      ),
      featured: "A compact website foundation that can be expanded into a full service site without reworking the layout.",
      result: "The result is a flexible business site concept with a clean hierarchy and enough structure for lead generation.",
      tags: ["Website", "Development", "UI"]
    },
    {
      slug: "care-3d-beauty-mockup",
      title: "Care - 3D Beauty Mockup",
      sector: "Design",
      status: "Concept",
      client: "Megzier template showcase",
      timeline: "August 2025",
      duration: "Short build",
      heroImage: "assets/images/project/project02.webp",
      summary: [
        "Care is a polished beauty mockup concept focused on product presentation, brand polish, and visual clarity.",
        "The composition is built to make the design feel premium while keeping the layout easy to scan."
      ],
      benefitsSummary: "The mockup demonstrates how strong spacing and product framing can make a brand feel more refined.",
      benefits: [
        "Premium visual presentation",
        "Clean product hierarchy",
        "Brand-friendly spacing",
        "Easy marketing reuse"
      ],
      cards: cards(
        "Presentation",
        "Shaped the mockup so the product stays centered and easy to read.",
        "Brand Fit",
        "Kept the layout simple enough for ads, mockups, and portfolio use."
      ),
      featured: "A presentation-first mockup that works well for brand showcases and marketing previews.",
      result: "The result is a clean visual asset that can be reused in brand decks, posters, and portfolio pages.",
      tags: ["Design", "Mockup", "Branding"]
    },
    {
      slug: "booky-book-cover-design",
      title: "Booky - Book Cover Design",
      sector: "Design",
      status: "Concept",
      client: "Megzier template showcase",
      timeline: "August 2025",
      duration: "Short build",
      heroImage: "assets/images/project/project03.webp",
      summary: [
        "Booky is a book cover concept that focuses on typography, balance, and a strong editorial look.",
        "The layout keeps the title readable at a glance while still leaving room for creative branding."
      ],
      benefitsSummary: "The cover shows how a strong title block can help a book stand out in both digital and print formats.",
      benefits: [
        "Readable title hierarchy",
        "Balanced visual rhythm",
        "Print-ready layout",
        "Reusable marketing asset"
      ],
      cards: cards(
        "Typography",
        "Focused on a title system that stays legible across formats.",
        "Editorial Look",
        "Balanced the layout so the cover feels polished and professional."
      ),
      featured: "A cover concept built for strong first impressions and easy adaptation to different publishing channels.",
      result: "The result is a clean editorial cover that can be adapted for paperback, ebook, and marketing artwork.",
      tags: ["Design", "Publishing", "Typography"]
    },
    {
      slug: "pack-coffee-mug-design",
      title: "Pack - Coffee Mug Design",
      sector: "Design",
      status: "Concept",
      client: "Megzier template showcase",
      timeline: "August 2025",
      duration: "Short build",
      heroImage: "assets/images/project/project04.webp",
      summary: [
        "Pack is a merchandise mockup that turns a simple coffee mug into a branded promotional item.",
        "The design is kept bold and clear so it works well for print, giveaways, and office branding."
      ],
      benefitsSummary: "The mug artwork shows how a simple object can carry a strong brand presence with very little noise.",
      benefits: [
        "Simple branded merchandise",
        "Easy print reproduction",
        "Strong visual recall",
        "Suitable for promo campaigns"
      ],
      cards: cards(
        "Print Setup",
        "Prepared the artwork so it remains readable on a small physical item.",
        "Brand Recall",
        "Kept the composition simple so the logo and message stand out fast."
      ),
      featured: "A merchandise concept designed for promotions, gifting, and everyday office use.",
      result: "The result is a practical mug design that can be used for internal branding or client-facing promotions.",
      tags: ["Design", "Merchandise", "Print"]
    },
    {
      slug: "landy-web-landing-page",
      title: "Landy - Web Landing Page",
      sector: "Development",
      status: "Concept",
      client: "Megzier template showcase",
      timeline: "September 2025",
      duration: "Short build",
      heroImage: "assets/images/project/project05.webp",
      summary: [
        "Landy is a conversion-focused landing page concept built to drive clicks, signups, and focused inquiries.",
        "The section flow is intentionally short so the user can move from value proposition to action without friction."
      ],
      benefitsSummary: "The page demonstrates how a landing page can stay compact while still giving users enough trust signals to convert.",
      benefits: [
        "Clear conversion path",
        "Short and focused structure",
        "Strong hero messaging",
        "Easy to test and iterate"
      ],
      cards: cards(
        "Hero Message",
        "Placed the core offer early so visitors understand the value fast.",
        "Conversion Flow",
        "Kept the action steps simple to reduce friction and keep attention."
      ),
      featured: "A landing page foundation optimized for campaigns, ads, and lead capture.",
      result: "The result is a compact landing page layout that can be reused for launches and service campaigns.",
      tags: ["Development", "Landing Page", "Conversion"]
    },
    {
      slug: "pak-box-packaging-mockup",
      title: "Pak - Box Packaging Mockup",
      sector: "Design",
      status: "Concept",
      client: "Megzier template showcase",
      timeline: "September 2025",
      duration: "Short build",
      heroImage: "assets/images/project/project06.webp",
      summary: [
        "Pak is a packaging mockup concept that focuses on clean product presentation and shelf visibility.",
        "The layout keeps the box readable while preserving enough brand space for product identity."
      ],
      benefitsSummary: "The packaging concept shows how simple geometry and label hierarchy can improve shelf appeal.",
      benefits: [
        "Shelf-ready composition",
        "Easy brand recognition",
        "Print-friendly structure",
        "Works for mockups and final packaging"
      ],
      cards: cards(
        "Product Frame",
        "Structured the box so the product area stays clear and easy to brand.",
        "Shelf Appeal",
        "Used a clean mockup style that works for both review and presentation."
      ),
      featured: "A packaging concept built for mockup presentation, product launches, and brand review.",
      result: "The result is a box design that can support packaging tests, mockup decks, and retail previews.",
      tags: ["Design", "Packaging", "Mockup"]
    },
    {
      slug: "applio-finance-apps-dev",
      title: "Applio - Finance Apps Dev",
      sector: "Development",
      status: "Concept",
      client: "Megzier template showcase",
      timeline: "September 2025",
      duration: "Short build",
      heroImage: "assets/images/project/project07.webp",
      summary: [
        "Applio is a finance app concept centered on clear data presentation and practical user flow.",
        "It is built to feel dependable, modern, and usable across common financial tasks."
      ],
      benefitsSummary: "The app layout is structured to support account actions, balance checking, and quick decision making.",
      benefits: [
        "Clear data hierarchy",
        "Practical app flow",
        "Mobile-friendly design",
        "Suitable for finance workflows"
      ],
      cards: cards(
        "Data Flow",
        "Arranged the interface so users can track key numbers without confusion.",
        "App Usability",
        "Kept the interaction model simple for everyday financial tasks."
      ),
      featured: "A finance app foundation designed for quick checks, clear records, and usable workflows.",
      result: "The result is an app concept that can support budgeting, account views, and financial tracking.",
      tags: ["Development", "App", "Finance"]
    },
    {
      slug: "cardex-business-card",
      title: "Cardex - Business Card",
      sector: "Design",
      status: "Concept",
      client: "Megzier template showcase",
      timeline: "October 2025",
      duration: "Short build",
      heroImage: "assets/images/project/project08.webp",
      summary: [
        "Cardex is a business card concept focused on compact identity, strong typography, and clean brand recall.",
        "The design is simple enough to stay professional while still giving the card a memorable look."
      ],
      benefitsSummary: "The card concept shows how a small format can still carry a strong and polished brand identity.",
      benefits: [
        "Compact professional identity",
        "Strong type hierarchy",
        "Print-ready dimensions",
        "Easy to adapt for brand kits"
      ],
      cards: cards(
        "Front Layout",
        "Built the front of the card to keep the brand identity sharp and focused.",
        "Print Balance",
        "Made sure the layout still reads well when trimmed and printed."
      ),
      featured: "A business card concept designed for everyday networking and brand presentation.",
      result: "The result is a clean stationery piece that can be used as part of a wider brand identity system.",
      tags: ["Design", "Branding", "Print"]
    },
    {
      slug: "beauty-neilpolish-bottle",
      title: "Beauty - Neilpolish Bottle",
      sector: "Design",
      status: "Concept",
      client: "Megzier template showcase",
      timeline: "October 2025",
      duration: "Short build",
      heroImage: "assets/images/project/project09.webp",
      summary: [
        "Beauty is a cosmetic bottle concept built to present a product in a clean and attractive way.",
        "The design uses a simple visual hierarchy so the bottle can stand out in beauty marketing assets."
      ],
      benefitsSummary: "The mockup is useful for product launches where packaging clarity and shelf appeal matter.",
      benefits: [
        "Beauty-product presentation",
        "Clean brand visibility",
        "Works in digital ads",
        "Easy to translate to packaging"
      ],
      cards: cards(
        "Product Focus",
        "Framed the bottle so the label and shape stay visible at a glance.",
        "Marketing Ready",
        "Kept the mockup clean for use in campaigns, stores, and catalogs."
      ),
      featured: "A product mockup that makes a cosmetics brand look polished and retail-ready.",
      result: "The result is a presentation-friendly bottle design for launch decks and product promotion.",
      tags: ["Design", "Packaging", "Beauty"]
    },
    {
      slug: "zaya-travels-and-tours",
      title: "Zaya Travels and Tours",
      sector: "Travel & Tours",
      status: "LIVE",
      client: "Zaya Travels and Tours",
      timeline: "Live",
      duration: "Active platform",
      heroImage: "assets/images/project/zaya-travels.webp",
      liveUrl: "https://zayatravelsandtours.com",
      summary: [
        "Zaya Travels and Tours is a full-featured travel booking platform with flight search, hotel listings, airport transfers, and tour guide bookings.",
        "The design uses a dark, premium look that keeps the booking flow clear while still feeling polished and modern."
      ],
      benefitsSummary: "The platform was built so travelers can move from search to booking without losing context.",
      benefits: [
        "Flight and hotel booking flow",
        "Airport transfer support",
        "Tour guide booking options",
        "Premium dark-themed presentation"
      ],
      cards: cards(
        "Booking Search",
        "Focused the interface around quick travel search and clear booking actions.",
        "Travel Services",
        "Kept flights, hotels, transfers, and guides visible in the same journey."
      ),
      featured: "A travel platform designed for fast search, easy booking, and strong first impressions.",
      result: "The result is a travel site that can handle multiple booking paths while keeping the experience simple.",
      tags: ["Travel", "Booking", "Platform"]
    },
    {
      slug: "mokawa-group-ltd",
      title: "Mokawa Group Ltd",
      sector: "Hospitality",
      status: "LIVE",
      client: "Mokawa Group Ltd",
      timeline: "Live",
      duration: "Active platform",
      heroImage: "assets/images/project/mokawa-group.webp",
      summary: [
        "Mokawa Group Ltd is a luxury hospitality management website with an elegant cream and gold design.",
        "The site presents a split-screen hero, property portfolio showcase, team pages, and contact management for a polished brand experience."
      ],
      benefitsSummary: "The website is structured to support hospitality branding, portfolio presentation, and customer inquiries.",
      benefits: [
        "Elegant hospitality presentation",
        "Property portfolio showcase",
        "Team and contact pages",
        "Luxury visual identity"
      ],
      cards: cards(
        "Split Hero",
        "Designed the opening section to feel premium and immediately recognizable.",
        "Property Portfolio",
        "Organized the property view so it is easy to browse and present."
      ),
      featured: "A hospitality website that balances brand prestige with practical contact and portfolio pages.",
      result: "The result is a refined management site that supports hospitality sales and brand trust.",
      tags: ["Hospitality", "Luxury", "Management"]
    },
    {
      slug: "eskin-medicare-limited",
      title: "Eskin Medicare Limited",
      sector: "Healthcare",
      status: "LIVE",
      client: "Eskin Medicare Limited",
      timeline: "Live",
      duration: "Active platform",
      heroImage: "assets/images/project/eskin-medicare.webp",
      summary: [
        "Eskin Medicare Limited is a professional medical services website focused on wound, ostomy, and continence care.",
        "The site uses a mint-green visual style and includes service booking, product catalogue, WhatsApp integration, pricing pages, and specialized medical content."
      ],
      benefitsSummary: "The build gives patients and staff a clear way to find services, products, and contact options quickly.",
      benefits: [
        "Healthcare service booking",
        "Product catalogue access",
        "WhatsApp support integration",
        "Specialized medical content"
      ],
      cards: cards(
        "Service Booking",
        "Made it easy for visitors to find and request care services.",
        "Medical Catalogue",
        "Structured the product area so items are easier to review and share."
      ),
      featured: "A healthcare website that combines trust, clarity, and practical support options.",
      result: "The result is a focused medical platform that supports patient communication and service discovery.",
      tags: ["Healthcare", "Medical", "Support"]
    },
    {
      slug: "rachum-international-foundation",
      title: "Rachum International Foundation",
      sector: "NGO",
      status: "LIVE",
      client: "Rachum International Foundation",
      timeline: "Live",
      duration: "Active platform",
      heroImage: "assets/images/project/rachum-foundation.webp",
      summary: [
        "Rachum International Foundation is a bold NGO website centered on women empowerment and community development.",
        "The site includes a full-screen hero, program showcases, impact statistics, team pages, and donation and volunteer integration."
      ],
      benefitsSummary: "The website is organized to help the foundation explain its mission and convert visitors into supporters.",
      benefits: [
        "Strong mission storytelling",
        "Impact statistics section",
        "Donation and volunteer paths",
        "Program showcase structure"
      ],
      cards: cards(
        "Programs",
        "Highlighted the community programs so the mission is clear at a glance.",
        "Donations",
        "Set up the site so support actions are easy to find and use."
      ),
      featured: "A mission-led NGO website designed to present impact, trust, and opportunities to support the cause.",
      result: "The result is a community-focused platform that can inform, inspire, and drive action.",
      tags: ["NGO", "Community", "Impact"]
    },
    {
      slug: "freepdfedit",
      title: "FreePDFEdit",
      sector: "Tools",
      status: "LIVE",
      client: "FreePDFEdit",
      timeline: "Live",
      duration: "Active platform",
      heroImage: "assets/images/project/freepdfedit.webp",
      liveUrl: "https://freepdfedit.megzier.com",
      summary: [
        "FreePDFEdit is a browser-based PDF editor and signer built for fast document work in the browser.",
        "The product supports text editing, signatures, highlights, annotations, image placement, and instant download."
      ],
      benefitsSummary: "The tool makes document edits faster because users can stay in the browser from start to finish.",
      benefits: [
        "Browser-based editing workflow",
        "Text and annotation tools",
        "Signature support",
        "Instant download output"
      ],
      cards: cards(
        "Editing Tools",
        "Grouped the document actions so editing remains quick and practical.",
        "Instant Export",
        "Built the flow so users can finish edits and download without delay."
      ),
      featured: "A document tool focused on speed, clarity, and browser-first workflow.",
      result: "The result is a fast PDF editor that can support everyday editing, signing, and annotation tasks.",
      tags: ["PDF", "Tools", "Browser"]
    },
    {
      slug: "megzierai-humanizer",
      title: "MegzierAI Humanizer",
      sector: "AI",
      status: "LIVE",
      client: "MegzierAI Humanizer",
      timeline: "Live",
      duration: "Active platform",
      heroImage: "assets/images/project/megzierai-humanizer.webp",
      liveUrl: "https://humanizer.megzier.com",
      summary: [
        "MegzierAI Humanizer is an AI text humanizer and writing workflow for polishing generated copy into more natural sounding text.",
        "It is built as a fast browser workflow so users can move from rough output to cleaner, more readable copy quickly."
      ],
      benefitsSummary: "The product gives users a faster way to shape AI output into something that sounds more human and useful.",
      benefits: [
        "Humanizer writing workflow",
        "Fast browser interface",
        "Copy refinement focus",
        "Useful for content polishing"
      ],
      cards: cards(
        "Humanizer Flow",
        "Kept the text workflow straightforward so users can move quickly.",
        "Tone Refinement",
        "Focused on making generated text read more naturally."
      ),
      featured: "An AI writing tool built to improve clarity, tone, and final copy quality.",
      result: "The result is a practical humanizer that supports editing, rewriting, and polished output creation.",
      tags: ["AI", "Writing", "Workflow"]
    }
  ];
})();
