(function () {
  const projects = window.MEGZIER_PROJECT_DETAILS || [];
  if (!projects.length) return;

  const fallbackProject = projects[0];
  const params = new URLSearchParams(window.location.search);
  const requestedSlug = params.get("project") || fallbackProject.slug;
  const project = projects.find((item) => item.slug === requestedSlug) || fallbackProject;

  if (project.slug !== requestedSlug) {
    const redirectUrl = new URL(window.location.href);
    redirectUrl.searchParams.set("project", project.slug);
    window.history.replaceState({}, "", redirectUrl.toString());
  }

  function updateMeta(selector, attribute, value) {
    const node = document.querySelector(selector);
    if (node && value) {
      node.setAttribute(attribute, value);
    }
  }

  function setText(selector, value) {
    const node = document.querySelector(selector);
    if (node && typeof value === "string") {
      node.textContent = value;
    }
  }

  function setHtml(selector, value) {
    const node = document.querySelector(selector);
    if (node && typeof value === "string") {
      node.innerHTML = value;
    }
  }

  function projectUrl(slug) {
    return `project-details.html?project=${encodeURIComponent(slug)}`;
  }

  function safeText(value) {
    return String(value || "").replace(/[&<>"]/g, function (char) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;"
      }[char];
    });
  }

  const content = document.querySelector(".project-details__content .details__content-right");
  const sidebar = document.querySelector(".project-sidebar .sidebar-widget");

  document.title = `${project.title} - Megzier Group Ltd`;
  updateMeta('meta[name="description"]', "content", `${project.title}. ${project.summary.join(" ")}`);
  updateMeta('meta[name="keywords"]', "content", `${project.title}, ${project.sector}, Megzier Group Ltd`);
  updateMeta('meta[property="og:title"]', "content", `${project.title} - Megzier Group Ltd`);
  updateMeta('meta[property="og:description"]', "content", `${project.summary.join(" ")}`);
  updateMeta('meta[property="og:url"]', "content", window.location.href.split("#")[0]);
  updateMeta('meta[property="twitter:title"]', "content", `${project.title} - Megzier Group Ltd`);
  updateMeta('meta[name="twitter:title"]', "content", `${project.title} - Megzier Group Ltd`);
  updateMeta('meta[name="twitter:description"]', "content", `${project.summary.join(" ")}`);
  updateMeta('meta[property="og:image"]', "content", new URL(project.heroImage, window.location.href).toString());
  updateMeta('meta[name="twitter:image"]', "content", new URL(project.heroImage, window.location.href).toString());

  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) {
    canonical.setAttribute("href", window.location.href.split("#")[0]);
  }

  setText(".page-title .title", project.title);
  setHtml(".page-breadcrumb li:last-child", `<span>/</span> ${safeText(project.title)}`);

  const mainImage = document.querySelector(".project-details__content .details-image img");
  if (mainImage) {
    mainImage.src = project.heroImage;
    mainImage.alt = project.title;
  }

  if (content) {
    const headings = content.querySelectorAll("h3.title");
    if (headings[0]) headings[0].textContent = project.title;
    if (headings[1]) headings[1].textContent = "Project Benefits";
    if (headings[2]) headings[2].textContent = "Complete Result";

    const paragraphs = content.querySelectorAll("p");
    if (paragraphs[0]) paragraphs[0].textContent = project.summary[0];
    if (paragraphs[1]) paragraphs[1].textContent = project.summary[1];
    if (paragraphs[2]) paragraphs[2].textContent = project.benefitsSummary;
    if (paragraphs[3]) paragraphs[3].textContent = project.result;

    const featured = content.querySelector(".featured-list");
    if (featured) featured.textContent = project.featured;

    const benefitList = content.querySelector("ul.list-style-1");
    if (benefitList) {
      benefitList.innerHTML = project.benefits.map((item) => `<li>${safeText(item)}</li>`).join("");
    }

    const detailBoxes = content.querySelectorAll(".details-image-box");
    detailBoxes.forEach((box, index) => {
      const card = project.cards[index] || project.cards[0];
      const image = box.querySelector("img");
      const title = box.querySelector(".title");
      if (image) {
        image.src = card.image;
        image.alt = card.title;
      }
      if (title) {
        title.textContent = card.title;
      }
    });
  }

  const projectInfoList = document.querySelector(".project-sidebar .project-details-box .content ul");
  if (projectInfoList) {
    const liveRow = project.liveUrl
      ? `<li><strong>Live URL :</strong> <a href="${safeText(project.liveUrl)}" target="_blank" rel="noopener noreferrer">${safeText(project.liveUrl.replace(/^https?:\/\//, ""))}</a></li>`
      : `<li><strong>Live URL :</strong> Internal case study</li>`;

    projectInfoList.innerHTML = [
      `<li><strong>Client :</strong> ${safeText(project.client)}</li>`,
      `<li><strong>Sector :</strong> ${safeText(project.sector)}</li>`,
      `<li><strong>Status :</strong> ${safeText(project.status)}</li>`,
      `<li><strong>Timeline :</strong> ${safeText(project.timeline)}</li>`,
      `<li><strong>Duration :</strong> ${safeText(project.duration)}</li>`,
      liveRow
    ].join("");
  }

  if (sidebar && !document.getElementById("project-related-list")) {
    const relatedWidget = document.createElement("div");
    relatedWidget.className = "widget-box project-related-box bg-white mt-30";
    relatedWidget.innerHTML = `
      <h4 class="title">Other Projects</h4>
      <div id="project-related-list"></div>
    `;
    sidebar.appendChild(relatedWidget);
  }

  const relatedList = document.getElementById("project-related-list");
  if (relatedList) {
    relatedList.innerHTML = projects
      .filter((item) => item.slug !== project.slug)
      .map((item) => {
        const href = projectUrl(item.slug);
        return `
          <div class="recent-post-item">
            <figure class="image">
              <a href="${href}"><img src="${item.heroImage}" alt="${safeText(item.title)}"></a>
            </figure>
            <div class="recent-post-info">
              <h4 class="title"><a href="${href}">${safeText(item.title)}</a></h4>
              <span class="post-date">${safeText(item.sector)} / ${safeText(item.status)}</span>
            </div>
          </div>
        `;
      })
      .join("");
  }

  const prevLink = document.querySelector(".details__pagination .previous a");
  const nextLink = document.querySelector(".details__pagination .next a");
  const currentIndex = projects.findIndex((item) => item.slug === project.slug);
  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(currentIndex + 1) % projects.length];

  if (prevLink && prevProject) {
    prevLink.href = projectUrl(prevProject.slug);
    prevLink.querySelector("span").textContent = prevProject.title;
    prevLink.setAttribute("aria-label", `Previous project: ${prevProject.title}`);
  }

  if (nextLink && nextProject) {
    nextLink.href = projectUrl(nextProject.slug);
    nextLink.querySelector("span").textContent = nextProject.title;
    nextLink.setAttribute("aria-label", `Next project: ${nextProject.title}`);
  }
})();
