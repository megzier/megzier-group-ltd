(function () {
  const services = window.MEGZIER_SERVICE_DETAILS || [];
  if (!services.length) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const requestedSlug = params.get("service");
  const currentIndex = Math.max(
    0,
    services.findIndex((service) => service.slug === requestedSlug)
  );
  const current = services[currentIndex] || services[0];

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function titleMarkup(service) {
    return service.titleHtml || escapeHtml(service.title);
  }

  function buildFaqItems(service) {
    const detail = service.summary && service.summary[1] ? service.summary[1] : service.summary[0];
    const feature = service.features && service.features[0] ? service.features[0] : "a practical implementation plan";

    return [
      {
        title: `What does ${service.title} include?`,
        text: `This service is tailored around the agreed scope and can include planning, delivery, content support, and the technical follow-through needed to launch well.`
      },
      {
        title: `Can ${service.title} be customized?`,
        text: `Yes. We adapt the delivery around your workflow, your current tools, and the outcomes you need, instead of forcing a fixed package.`
      },
      {
        title: `Do you provide support after launch?`,
        text: `Yes. We can continue with updates, performance checks, and technical support so the solution remains stable after launch.`
      },
      {
        title: `What is the main benefit of ${service.title}?`,
        text: `The focus is on ${feature.toLowerCase()} and a clear delivery process that turns the idea into something useful for the business. ${detail}`
      }
    ];
  }

  function renderSidebar(servicesList, activeSlug, currentService) {
    return `
      <div class="sidebar-widget service-sidebar-single">
        <div class="widget-box category-list">
          <h4 class="sidebar-title">Services</h4>
          <div class="sidebar-service-list">
            <ul>
              ${servicesList.map((service) => `
                <li class="${service.slug === activeSlug ? "current" : ""}">
                  <a href="${service.link}">${escapeHtml(service.title)} <i class="fas fa-arrow-right"></i></a>
                </li>
              `).join("")}
            </ul>
          </div>
        </div>
        <div class="widget-box service-details-help bg-dark">
          <div class="bg image"><img src="assets/images/service/details-bg.webp" alt=""></div>
          <div class="service-details-content">
            <div class="icon"><img src="assets/images/icons/contact.png" alt=""></div>
            <h2 class="help-title">Need ${escapeHtml(currentService.title)} Help?<br>Contact Us</h2>
            <p class="text">We build dependable digital solutions that help businesses work smarter and grow with confidence.</p>
            <div class="help-contact">
              <a href="contact.html" class="theme-btn br-30">
                <span class="link-effect">
                  <span class="effect-1">Contact with Us</span>
                  <span class="effect-1">Contact with Us</span>
                </span>
                <span class="arrow-all">
                  <i>
                    <svg width="16" height="19" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 6H10M10 6L6 2M10 6L6 10" stroke="#1053f3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                    <svg width="16" height="19" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 6H10M10 6L6 2M10 6L6 10" stroke="#1053f3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                  </i>
                </span>
              </a>
            </div>
          </div>
        </div>
        <div class="widget-box service-download-box mt-4">
          <h4 class="sidebar-title">Downloads</h4>
          <div class="service-download-btn mb-10">
            <a href="#" class="theme-btn btn-style-1 d-grid">
              <span class="btn-title"><img class="mr-10" src="assets/images/service/service-details-icon01.webp" alt="">Company Report 2025.pdf</span>
            </a>
          </div>
          <div class="service-download-btn">
            <a href="#" class="theme-btn btn-style-2 d-grid bg-dark">
              <span class="btn-title"><img class="mr-10" src="assets/images/service/service-details-icon02.webp" alt="">Company Brochure.doc</span>
            </a>
          </div>
        </div>
      </div>
    `;
  }

  function renderContent(service) {
    const serviceFaqs = buildFaqItems(service);
    const featureSplit = Math.ceil((service.features || []).length / 2) || 1;
    const featureLeft = (service.features || []).slice(0, featureSplit);
    const featureRight = (service.features || []).slice(featureSplit);
    const supportImages = service.supportImages || [];
    const cards = service.process || [];

    return `
      <div class="services-details__content">
        <div class="image overlay-anim1">
          <img class="br-10 w-100" src="${service.heroImage}" alt="${escapeHtml(service.title)}">
        </div>
        <h3 class="title-two">${escapeHtml(service.title)}</h3>
        <p>${escapeHtml(service.summary && service.summary[0] ? service.summary[0] : "")}</p>
        <p class="mb-25">${escapeHtml(service.summary && service.summary[1] ? service.summary[1] : "")}</p>
        <div class="row service-details-box my-40 md-my-0 md-gy-30">
          ${cards.map((card, index) => `
            <div class="col-lg-6 col-md-6">
              <div class="service-details-block">
                <div class="inner-box d-flex align-items-center">
                  <div class="icon ${index === 1 ? "bg-dark" : ""} mr-20"><img src="${service.icon}" alt=""></div>
                  <h5 class="title my-0">${escapeHtml(card.title)}</h5>
                </div>
              </div>
            </div>
          `).join("")}
        </div>
        <h3 class="title">What You Get</h3>
        <p class="my-0">${escapeHtml(service.result)}</p>
        <div class="mt-30 mb-40">
          <a href="${escapeHtml((service.relatedPage && service.relatedPage.href) || "service.html")}" class="theme-btn br-30">
            <span class="link-effect">
              <span class="effect-1">${escapeHtml((service.relatedPage && service.relatedPage.label) || "Visit Related Page")}</span>
              <span class="effect-1">${escapeHtml((service.relatedPage && service.relatedPage.label) || "Visit Related Page")}</span>
            </span>
            <span class="arrow-all">
              <i>
                <svg width="16" height="19" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 6H10M10 6L6 2M10 6L6 10" stroke="#1053f3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
                <svg width="16" height="19" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 6H10M10 6L6 2M10 6L6 10" stroke="#1053f3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
              </i>
            </span>
          </a>
        </div>
        <div class="row md-gy-30 align-items-center mt-30 md-mt-0 mb-40 md-mb-0">
          <div class="col-lg-6 col-md-6 col-sm-6">
            <div class="featured-list">
              <ul class="list-style-1">
                ${featureLeft.map((feature) => `
                  <li><span><img src="assets/images/service/details-check.webp" alt=""></span> ${escapeHtml(feature)}</li>
                `).join("")}
              </ul>
            </div>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-6">
            <div class="featured-list">
              <ul class="list-style-1">
                ${featureRight.map((feature) => `
                  <li><span><img src="assets/images/service/details-check.webp" alt=""></span> ${escapeHtml(feature)}</li>
                `).join("")}
              </ul>
            </div>
          </div>
        </div>
        <div class="row md-gy-30 align-items-center">
          <div class="col-lg-6 col-md-6 col-sm-6">
            <div class="details-image-box overlay-anim1">
              <img class="img1 w-100 br-10" src="${supportImages[0] || "assets/images/service/details-img02.webp"}" alt="">
            </div>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-6">
            <div class="details-image-box overlay-anim1">
              <img class="img1 w-100 br-10" src="${supportImages[1] || "assets/images/service/details-img03.webp"}" alt="">
            </div>
          </div>
        </div>
        <div class="innerpage mt-70 sm-mt-30">
          <h3 class="title mb-30 vxs-mb-25">Frequently Asked Questions</h3>
          <div class="tv-faq-section">
            <ul class="accordion-box">
              ${serviceFaqs.map((faq, index) => `
                <li class="accordion ${index === 0 ? "active-block" : ""}">
                  <div class="acc-btn bg-white ${index === 0 ? "active" : ""}">${String(index + 1).padStart(2, "0")}. ${escapeHtml(faq.title)}
                    <div class="icon${index === 0 ? "" : " fa fa-angle-right"}"></div>
                  </div>
                  <div class="acc-content ${index === 0 ? "active" : ""}">
                    <div class="content bg-white">
                      <div class="text">${escapeHtml(faq.text)}</div>
                    </div>
                  </div>
                </li>
              `).join("")}
            </ul>
          </div>
        </div>
      </div>
    `;
  }

  const breadcrumbTitle = document.querySelector(".page-title .title");
  if (breadcrumbTitle) {
    breadcrumbTitle.textContent = current.title;
  }

  const breadcrumbItems = document.querySelectorAll(".page-breadcrumb li");
  if (breadcrumbItems.length >= 3) {
    breadcrumbItems[breadcrumbItems.length - 1].textContent = current.title;
  }

  const description = document.querySelector('meta[name="description"]');
  if (description) {
    description.setAttribute("content", `${current.title} service details from Megzier Group Ltd covering strategy, delivery, and support.`);
  }

  const keywords = document.querySelector('meta[name="keywords"]');
  if (keywords) {
    keywords.setAttribute("content", `Megzier service details, ${current.title}, IT services Kenya, website support, cybersecurity`);
  }

  document.title = `${current.title} - Service Details | Megzier Group Ltd`;

  const container = document.querySelector(".services-details .container");
  if (container) {
    container.innerHTML = `
      <div class="row">
        <div class="col-xl-4 col-lg-4">
          <div class="service-sidebar">
            ${renderSidebar(services, current.slug, current)}
          </div>
        </div>
        <div class="col-xl-8 col-lg-8">
          ${renderContent(current)}
        </div>
      </div>
    `;
  }
})();
