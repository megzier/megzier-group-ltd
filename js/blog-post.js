(function () {
  function el(id) {
    return document.getElementById(id);
  }

  function postUrl(post) {
    return `blog-details.html?slug=${encodeURIComponent(post.slug)}`;
  }

  function currentPageUrl(post) {
    const url = new URL(window.location.href);
    url.search = `?slug=${encodeURIComponent(post.slug)}`;
    url.hash = '';
    return url.toString();
  }

  function renderTags(post) {
    return MegzierBlog.normalizeTags(post.tags)
      .map(tag => `<span class="post-tag">${MegzierBlog.escapeHtml(tag)}</span>`)
      .join('');
  }

  function renderShareButtons(post, pageUrl, includeCopyLink) {
    const items = [
      ['LinkedIn', 'linkedin'],
      ['Facebook', 'facebook'],
      ['X', 'x'],
      ['WhatsApp', 'whatsapp'],
    ];

    return items
      .map(([label, platform]) => `
        <a href="${MegzierBlog.shareUrl(platform, post, pageUrl)}" target="_blank" rel="noopener">${label}</a>
      `)
      .join('') + (includeCopyLink ? `
        <button type="button" id="copyPostLink">Copy link</button>
      ` : '');
  }

  function renderRelated(post, posts) {
    const related = posts
      .filter(item => item.id !== post.id)
      .sort((a, b) => {
        const aScore = a.category === post.category ? 2 : 0;
        const bScore = b.category === post.category ? 2 : 0;
        if (aScore !== bScore) return bScore - aScore;
        return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
      })
      .slice(0, 3);

    if (!related.length) {
      return '<p class="lead">No related posts yet. Publish another article to create suggestions here.</p>';
    }

    return `
      <div class="post-related-grid">
        ${related.map(item => `
          <article class="bc post-related-card">
            <img src="${MegzierBlog.escapeHtml(MegzierBlog.resolveImageUrl(item.image))}" alt="${MegzierBlog.escapeHtml(item.imageAlt || item.title)}" loading="lazy" decoding="async" data-megzier-image="1" data-fallback="${MegzierBlog.escapeHtml(MegzierBlog.imageFallbackUrl())}"/>
            <div class="bc-body">
              <span class="bc-tag">${MegzierBlog.escapeHtml(item.category)}</span>
              <h3 class="bc-title">${MegzierBlog.escapeHtml(item.title)}</h3>
              <p class="bc-exc">${MegzierBlog.escapeHtml((item.excerpt || item.seoDescription || 'Read the full article for the summary.').slice(0, 150))}</p>
              <div class="bc-meta">
                <span>${MegzierBlog.formatDate(item.publishDate)} | ${MegzierBlog.escapeHtml(item.readingTime)}</span>
                <a class="bc-readmore" href="${postUrl(item)}">Read More</a>
              </div>
            </div>
          </article>
        `).join('')}
      </div>
    `;
  }

  function init() {
    const posts = MegzierBlog.getPublishedPosts();
    const slug = MegzierBlog.getUrlParam('slug');
    const post = (slug && MegzierBlog.findPost(slug)) || posts[0] || null;

    const titleEl = el('postTitle');
    const subtitleEl = el('postSubtitle');
    const categoryEl = el('postCategory');
    const excerptEl = el('postExcerpt');
    const metaEl = el('postMeta');
    const sidebarTop = el('postSidebarTop');
    const coverEl = el('postCover');
    const bodyEl = el('postBody');
    const tagsEl = el('postTags');
    const ctaEl = el('postCta');
    const shareEl = el('postShareBox');
    const relatedEl = el('postRelatedBox');
    const heroShareEl = el('postHeroShare');
    const emptyEl = el('postEmpty');
    const heroSection = document.querySelector('.post-hero');
    const contentSection = document.querySelector('.sec.sec-alt');

    if (!post || !titleEl || !categoryEl || !excerptEl || !metaEl || !sidebarTop || !coverEl || !bodyEl || !tagsEl || !ctaEl || !shareEl || !relatedEl || !heroShareEl) {
      if (heroSection) {
        heroSection.hidden = true;
      }
      if (contentSection) {
        contentSection.hidden = true;
      }
      if (emptyEl) {
        emptyEl.hidden = false;
      }
      return;
    }

    const pageUrl = currentPageUrl(post);

    document.title = `${post.seoTitle || post.title} | Megzier Group Ltd`;
    MegzierBlog.setCanonical(pageUrl);
    MegzierBlog.setMeta('description', post.seoDescription || post.excerpt);
    MegzierBlog.setOpenGraph('og:type', 'article');
    MegzierBlog.setOpenGraph('og:url', pageUrl);
    MegzierBlog.setOpenGraph('og:title', post.seoTitle || post.title);
    MegzierBlog.setOpenGraph('og:description', post.seoDescription || post.excerpt);
    const ogImage = MegzierBlog.publicImageUrl(post.image);
    if (ogImage) {
      MegzierBlog.setOpenGraph('og:image', ogImage);
    }
    MegzierBlog.setOpenGraph('article:published_time', post.publishDate);
    MegzierBlog.setOpenGraph('article:modified_time', post.updatedAt);

    categoryEl.textContent = post.category;
    titleEl.textContent = post.title;
    if (subtitleEl) {
      subtitleEl.textContent = post.subtitle || '';
      subtitleEl.hidden = !post.subtitle;
    }
    excerptEl.textContent = post.excerpt;

    metaEl.innerHTML = `
      <span class="post-meta-pill">${MegzierBlog.formatDate(post.publishDate)}</span>
      <span class="post-meta-pill">${MegzierBlog.escapeHtml(post.readingTime)}</span>
      <span class="post-meta-pill">${MegzierBlog.escapeHtml(post.author)}</span>
    `;

    coverEl.innerHTML = post.image
      ? `<img src="${MegzierBlog.escapeHtml(MegzierBlog.resolveImageUrl(post.image))}" alt="${MegzierBlog.escapeHtml(post.imageAlt || post.title)}" loading="eager" decoding="async" data-megzier-image="1" data-fallback="${MegzierBlog.escapeHtml(MegzierBlog.imageFallbackUrl())}"/>`
      : `<img src="${MegzierBlog.escapeHtml(MegzierBlog.imageFallbackUrl())}" alt="${MegzierBlog.escapeHtml(post.imageAlt || post.title || 'Megzier post image')}" loading="eager" decoding="async" data-megzier-image="1" data-fallback="${MegzierBlog.escapeHtml(MegzierBlog.imageFallbackUrl())}"/>`;

    bodyEl.innerHTML = `<div class="post-prose">${MegzierBlog.markdownToHtml(post.body)}</div>`;
    tagsEl.innerHTML = renderTags(post);

    ctaEl.innerHTML = post.ctaText && post.ctaUrl
      ? `
        <h3>${MegzierBlog.escapeHtml(post.ctaText)}</h3>
        <p>Use the next step below if you want help putting this idea into action.</p>
        <a class="btn btn-dark" href="${MegzierBlog.escapeHtml(post.ctaUrl)}">${MegzierBlog.escapeHtml(post.ctaText)}</a>
      `
      : '';
    ctaEl.hidden = !(post.ctaText && post.ctaUrl);

    sidebarTop.innerHTML = `
      <div class="side-title">Quick facts</div>
      <div class="side-list">
        <div class="side-row"><strong>Category</strong><span>${MegzierBlog.escapeHtml(post.category)}</span></div>
        <div class="side-row"><strong>Published</strong><span>${MegzierBlog.formatDate(post.publishDate)}</span></div>
        <div class="side-row"><strong>Reading time</strong><span>${MegzierBlog.escapeHtml(post.readingTime)}</span></div>
        <div class="side-row"><strong>Tags</strong><span>${MegzierBlog.normalizeTags(post.tags).length}</span></div>
      </div>
    `;

    const shareButtons = renderShareButtons(post, pageUrl, true);
    heroShareEl.innerHTML = shareButtons;
    shareEl.innerHTML = `
      <div class="side-title">Share this post</div>
      <div class="post-share">${renderShareButtons(post, pageUrl, false)}</div>
      ${post.socialCaption ? `
        <button type="button" id="copyCaptionButton" class="btn btn-dark" style="margin-top:12px">Copy social caption</button>
        <p style="margin-top:12px;color:var(--soft);font-size:.85rem;line-height:1.7">${MegzierBlog.escapeHtml(post.socialCaption.slice(0, 220))}${post.socialCaption.length > 220 ? '...' : ''}</p>
      ` : ''}
    `;

    relatedEl.innerHTML = `
      <div class="side-title">Related articles</div>
      <div class="post-related">
        ${renderRelated(post, posts)}
      </div>
    `;
    MegzierBlog.attachImageFallbacks(document);

    const copyButton = document.getElementById('copyPostLink');
    copyButton?.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(pageUrl);
        copyButton.textContent = 'Copied';
        setTimeout(() => {
          copyButton.textContent = 'Copy link';
        }, 1600);
      } catch (error) {
        copyButton.textContent = 'Copy failed';
      }
    });

    const captionButton = document.getElementById('copyCaptionButton');
    captionButton?.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(post.socialCaption || '');
        captionButton.textContent = 'Caption copied';
        setTimeout(() => {
          captionButton.textContent = 'Copy social caption';
        }, 1600);
      } catch (error) {
        captionButton.textContent = 'Copy failed';
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
