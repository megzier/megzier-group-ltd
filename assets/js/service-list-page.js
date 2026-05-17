(function () {
  const services = window.MEGZIER_SERVICE_DETAILS || [];
  const grid = document.querySelector("#megzier-service-grid");

  if (!grid || !services.length) {
    return;
  }

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

  grid.innerHTML = services.map((service, index) => {
    const delay = (0.1 + ((index % 6) * 0.1)).toFixed(1);
    const summary = service.summary && service.summary[0] ? service.summary[0] : "";
    return `
      <div class="col-xl-4 col-lg-6 col-md-6 col-sm-6">
        <div class="tv-service-single-box wow fadeInUp" data-wow-delay="${delay}s">
          <div class="inner-box">
            <div class="icon"><img src="${service.icon}" alt="${escapeHtml(service.title)} icon"></div>
            <h4 class="title">${titleMarkup(service)}</h4>
            <div class="border2 mt-20 mb-20"></div>
            <p class="text">${escapeHtml(summary)}</p>
            <a href="${service.link}" class="theme-btn w-100 mt-40">
              <span class="link-effect">
                <span class="effect-1">LEARN MORE</span>
                <span class="effect-1">LEARN MORE</span>
              </span>
              <i class="fa-solid fa-arrow-up-right"></i>
            </a>
          </div>
        </div>
      </div>
    `;
  }).join("");
})();
