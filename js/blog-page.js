(function () {
  function el(id) {
    return document.getElementById(id);
  }

  function postUrl(post) {
    return `post.html?slug=${encodeURIComponent(post.slug)}`;
  }

  function renderImage(post, className) {
    const src = MegzierBlog.resolveImageUrl(post.image);
    const alt = post.imageAlt || post.title || 'Megzier post image';
    const cls = className ? ` class="${className}"` : '';
    const fallback = MegzierBlog.imageFallbackUrl();
    return `<img${cls} src="${MegzierBlog.escapeHtml(src)}" alt="${MegzierBlog.escapeHtml(alt)}" loading="lazy" decoding="async" data-megzier-image="1" data-fallback="${MegzierBlog.escapeHtml(fallback)}"/>`;
  }

  function summaryText(post) {
    const candidate = [
      post.excerpt,
      post.seoDescription,
      MegzierBlog.stripMarkdown(post.body || ''),
    ]
      .map(value => String(value || '').trim())
      .find(Boolean);

    if (!candidate) {
      return 'A fresh post is ready. Open the article for the full details and next steps.';
    }

    return candidate.length > 150 ? `${candidate.slice(0, 147)}...` : candidate;
  }

  function cardMarkup(post) {
    const tags = MegzierBlog.normalizeTags(post.tags).slice(0, 1).join(' / ') || post.category;
    return `
      <article class="bc rv">
        ${renderImage(post, 'bc-img')}
        <div class="bc-body">
          <span class="bc-tag">${MegzierBlog.escapeHtml(tags)}</span>
          <h3 class="bc-title">${MegzierBlog.escapeHtml(post.title)}</h3>
          <p class="bc-exc">${MegzierBlog.escapeHtml(summaryText(post))}</p>
          <div class="bc-meta">
            <span>${MegzierBlog.formatDate(post.publishDate)} | ${MegzierBlog.escapeHtml(post.readingTime)}</span>
            <a class="bc-readmore" href="${postUrl(post)}">Read More</a>
          </div>
        </div>
      </article>
    `;
  }

  function featuredMarkup(post) {
    const cta = post.ctaText && post.ctaUrl
      ? `<a class="btn btn-dark" href="${MegzierBlog.escapeHtml(post.ctaUrl)}">${MegzierBlog.escapeHtml(post.ctaText)}</a>`
      : '';

    return `
      <div class="blog-featured-card rv">
        <div class="blog-featured-media">${renderImage(post, '')}</div>
        <div class="blog-featured-copy">
          <div class="tag">${MegzierBlog.escapeHtml(post.category)}</div>
          <h3>${MegzierBlog.escapeHtml(post.title)}</h3>
          <p>${MegzierBlog.escapeHtml(summaryText(post))}</p>
          <div class="bc-meta">
            <span>${MegzierBlog.formatDate(post.publishDate)} | ${MegzierBlog.escapeHtml(post.readingTime)} read</span>
            <a href="${postUrl(post)}">Open post -></a>
          </div>
          <div class="blog-featured-links">
            <a href="${postUrl(post)}">Read article</a>
            ${cta}
          </div>
        </div>
      </div>
    `;
  }

  function panelMarkup(posts) {
    const latest = posts[0];
    const next = posts.slice(1, 3);

    return `
      <div class="blog-panel-card rv">
        ${latest ? `
          ${renderImage(latest, 'blog-panel-img')}
          <div class="blog-panel-body">
            <div class="blog-panel-meta">
              <span>Latest post</span>
              <span>${MegzierBlog.formatDate(latest.publishDate)} | ${MegzierBlog.escapeHtml(latest.readingTime)}</span>
            </div>
            <h3>${MegzierBlog.escapeHtml(latest.title)}</h3>
            <p>${MegzierBlog.escapeHtml(summaryText(latest))}</p>
            <div style="margin-top:16px">
              <a class="btn btn-dark" href="${postUrl(latest)}">Read post</a>
            </div>
          </div>
        ` : `
          <div class="blog-panel-body">
            <div class="blog-panel-meta"><span>No posts yet</span></div>
            <h3>Ready to publish your first article</h3>
            <p>Use the admin panel to create a post and it will appear here automatically.</p>
          </div>
        `}
      </div>
      <div class="blog-mini-list">
        ${next.map(post => `
            <a class="blog-mini-item" href="${postUrl(post)}">
              ${renderImage(post, '')}
              <div>
                <div class="meta">${MegzierBlog.formatDate(post.publishDate)} | ${MegzierBlog.escapeHtml(post.category)}</div>
                <h4>${MegzierBlog.escapeHtml(post.title)}</h4>
                <p>${MegzierBlog.escapeHtml(summaryText(post).slice(0, 92))}</p>
              </div>
            </a>
          `).join('')}
      </div>
    `;
  }

  function renderFilters(tags, state) {
    const buttons = ['all', ...tags];
    return buttons.map(tag => `
      <button type="button" class="blog-chip${state.tag === tag ? ' active' : ''}" data-tag="${MegzierBlog.escapeHtml(tag)}">
        ${tag === 'all' ? 'All Posts' : MegzierBlog.escapeHtml(tag)}
      </button>
    `).join('');
  }

  function matches(post, state) {
    const query = state.query.trim().toLowerCase();
    const activeTag = state.tag;
    const tagMatch = activeTag === 'all' || MegzierBlog.normalizeTags(post.tags).some(tag => tag.toLowerCase() === activeTag.toLowerCase()) || post.category.toLowerCase() === activeTag.toLowerCase();
    const queryMatch = !query || (post.searchText || '').includes(query);
    return tagMatch && queryMatch;
  }

  function relatedList(posts) {
    return posts.map(post => cardMarkup(post)).join('');
  }

  function revealDynamicSection(container) {
    if (!container) return;
    container.querySelectorAll('.rv, .rv-l, .rv-r').forEach(el => {
      el.classList.add('in');
    });
  }

  function init() {
    const search = el('blogSearch');
    const filters = el('blogFilters');
    const featured = el('blogFeatured');
    const grid = el('blogGrid');
    const empty = el('blogEmpty');
    const resultCount = el('blogResultCount');
    const featureNote = el('blogFeatureNote');
    const blogCount = el('blogCount');
    const categoryCount = el('blogCategoryCount');
    const latestDate = el('blogLatestDate');
    const panel = el('blogHeroPanel');

    if (!search || !filters || !featured || !grid || !empty || !resultCount || !featureNote || !blogCount || !categoryCount || !latestDate || !panel || !window.MegzierBlog) {
      return;
    }

    const state = {
      query: '',
      tag: 'all',
      posts: MegzierBlog.getPublishedPosts(),
    };

    const uniqueTags = Array.from(new Set(
      state.posts.flatMap(post => MegzierBlog.normalizeTags(post.tags))
    )).sort((a, b) => a.localeCompare(b));

    blogCount.textContent = String(state.posts.length);
    categoryCount.textContent = String(new Set(state.posts.map(post => post.category)).size);
    latestDate.textContent = state.posts.length ? MegzierBlog.formatDate(state.posts[0].publishDate) : 'N/A';
    panel.innerHTML = panelMarkup(state.posts.slice(0, 3));
    MegzierBlog.attachImageFallbacks(panel);
    revealDynamicSection(panel);
    filters.innerHTML = renderFilters(uniqueTags, state);

    function render() {
      const filtered = state.posts.filter(post => matches(post, state));
      const featuredPost = filtered.find(post => post.featured) || filtered[0] || null;
      const rest = filtered.filter(post => !featuredPost || post.id !== featuredPost.id);

      if (featuredPost) {
        featured.innerHTML = featuredMarkup(featuredPost);
        featured.hidden = false;
        MegzierBlog.attachImageFallbacks(featured);
        revealDynamicSection(featured);
      } else {
        featured.innerHTML = '';
        featured.hidden = true;
      }

      grid.innerHTML = relatedList(rest);
      grid.hidden = !rest.length;
      MegzierBlog.attachImageFallbacks(grid);
      revealDynamicSection(grid);

      empty.hidden = filtered.length > 0;
      resultCount.innerHTML = filtered.length
        ? `<strong>${filtered.length}</strong> post${filtered.length === 1 ? '' : 's'} found`
        : 'No posts matched your search';

      featureNote.textContent = state.tag === 'all'
        ? 'Showing the latest published insights.'
        : `Filtered by ${state.tag}.`;
    }

    search.addEventListener('input', () => {
      state.query = search.value;
      render();
    });

    filters.addEventListener('click', event => {
      const button = event.target.closest('[data-tag]');
      if (!button) return;
      state.tag = button.dataset.tag || 'all';
      filters.querySelectorAll('.blog-chip').forEach(chip => chip.classList.toggle('active', chip.dataset.tag === state.tag));
      render();
    });

    render();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
