(function () {
  const DEFAULT_AUTHOR = 'Megzier Group Ltd';
  const DEFAULT_TAGS = ['Megzier', 'IT', 'Business'];
  const STORAGE_KEY = 'megzier-blog-drafts';
  const IMAGE_FALLBACK = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800" role="img" aria-label="Megzier image placeholder">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0f172a"/>
          <stop offset="55%" stop-color="#1f2a44"/>
          <stop offset="100%" stop-color="#0ea5e9"/>
        </linearGradient>
        <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#f59e0b"/>
          <stop offset="100%" stop-color="#ec4899"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="800" fill="url(#g)"/>
      <circle cx="980" cy="120" r="150" fill="rgba(255,255,255,0.08)"/>
      <circle cx="240" cy="660" r="220" fill="rgba(255,255,255,0.06)"/>
      <rect x="78" y="92" width="220" height="14" rx="7" fill="url(#accent)"/>
      <rect x="78" y="132" width="420" height="12" rx="6" fill="rgba(255,255,255,0.55)"/>
      <rect x="78" y="156" width="340" height="12" rx="6" fill="rgba(255,255,255,0.28)"/>
      <rect x="78" y="582" width="340" height="12" rx="6" fill="rgba(255,255,255,0.25)"/>
      <rect x="78" y="606" width="520" height="12" rx="6" fill="rgba(255,255,255,0.18)"/>
      <text x="78" y="410" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="54" font-weight="700">Megzier Group</text>
      <text x="78" y="470" fill="rgba(255,255,255,0.82)" font-family="Arial, Helvetica, sans-serif" font-size="26">Image placeholder</text>
    </svg>
  `)}`;

  function escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function slugify(value) {
    return String(value || '')
      .toLowerCase()
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/['".,!?():/\\]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  function normalizeTags(tags) {
    if (Array.isArray(tags)) {
      return tags.map(tag => String(tag).trim()).filter(Boolean);
    }

    return String(tags || '')
      .split(',')
      .map(tag => tag.trim())
      .filter(Boolean);
  }

  function formatDate(value) {
    if (!value) return '';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return String(value);
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(date);
  }

  function formatShortDate(value) {
    if (!value) return '';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return String(value);
    return new Intl.DateTimeFormat('en-GB', {
      month: 'short',
      day: 'numeric',
    }).format(date);
  }

  function estimateReadingTime(text) {
    const words = String(text || '')
      .replace(/<[^>]+>/g, ' ')
      .trim()
      .split(/\s+/)
      .filter(Boolean).length;

    const minutes = Math.max(1, Math.round(words / 180));
    return `${minutes} min`;
  }

  function isAbsoluteUrl(value) {
    return /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(String(value || '').trim());
  }

  function isSiteAssetPath(value) {
    return /^(?:images|css|js|pages|admin|assets|uploads)\//i.test(String(value || '').trim());
  }

  function resolveImageUrl(value) {
    const raw = String(value || '').trim();
    if (!raw) return IMAGE_FALLBACK;
    if (/^(?:data:|blob:)/i.test(raw)) return raw;
    if (/^https?:\/\//i.test(raw)) return raw;
    if (/^\/\//.test(raw)) {
      const protocol = window.location && window.location.protocol === 'http:' ? 'http:' : 'https:';
      return `${protocol}${raw}`;
    }

    const cleaned = raw.replace(/^\.\//, '');
    const fileProtocol = window.location && window.location.protocol === 'file:';
    const siteAsset = isSiteAssetPath(cleaned) || raw.startsWith('/');

    if (fileProtocol) {
      if (raw.startsWith('../') || raw.startsWith('./')) {
        return raw;
      }

      if (siteAsset) {
        const prefix = window.location.pathname && window.location.pathname.includes('/pages/') ? '../' : './';
        return `${prefix}${cleaned.replace(/^\/+/, '')}`;
      }
    } else if (siteAsset) {
      return `/${cleaned.replace(/^\/+/, '')}`;
    }

    return raw;
  }

  function publicImageUrl(value) {
    const raw = String(value || '').trim();
    if (!raw) return '';
    if (/^(?:data:|blob:|https?:\/\/)/i.test(raw)) return raw;
    if (/^\/\//.test(raw)) {
      const protocol = window.location && window.location.protocol === 'http:' ? 'http:' : 'https:';
      return `${protocol}${raw}`;
    }
    if (window.location && window.location.protocol === 'file:') {
      return '';
    }

    try {
      return new URL(resolveImageUrl(raw), window.location.href).href;
    } catch (error) {
      return resolveImageUrl(raw);
    }
  }

  function attachImageFallbacks(root) {
    const scope = root && typeof root.querySelectorAll === 'function' ? root : document;
    if (!scope || typeof scope.querySelectorAll !== 'function') return;

    scope.querySelectorAll('img[data-megzier-image]').forEach(img => {
      if (img.dataset.megzierFallbackBound === '1') return;
      img.dataset.megzierFallbackBound = '1';

      const fallback = img.dataset.fallback || IMAGE_FALLBACK;
      const applyFallback = () => {
        if (img.dataset.megzierFallbackApplied === '1') return;
        img.dataset.megzierFallbackApplied = '1';
        img.src = fallback;
        if (img.removeAttribute) {
          img.removeAttribute('srcset');
        }
        img.classList.add('is-fallback');
      };

      img.addEventListener('error', applyFallback);
      if (img.complete && img.naturalWidth === 0) {
        applyFallback();
      }
    });
  }

  function stripMarkdown(text) {
    return String(text || '')
      .replace(/```[\s\S]*?```/g, ' ')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '$1')
      .replace(/[#>*_\-]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function inlineMarkdown(text) {
    let output = escapeHtml(text);
    output = output.replace(
      /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener">$1</a>'
    );
    output = output.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    output = output.replace(/_([^_]+)_/g, '<em>$1</em>');
    return output;
  }

  function markdownToHtml(text) {
    const input = String(text || '').replace(/\r\n/g, '\n').trim();
    if (!input) return '';

    const blocks = input.split(/\n{2,}/);
    return blocks
      .map(block => {
        const lines = block
          .split('\n')
          .map(line => line.trim())
          .filter(Boolean);

        if (!lines.length) return '';

        if (lines.length === 1 && /^#{1,3}\s+/.test(lines[0])) {
          const heading = lines[0];
          const level = Math.min(3, heading.match(/^#{1,3}/)[0].length + 1);
          return `<h${level}>${inlineMarkdown(heading.replace(/^#{1,3}\s+/, ''))}</h${level}>`;
        }

        if (lines.every(line => /^[-*]\s+/.test(line))) {
          return `<ul>${lines
            .map(line => `<li>${inlineMarkdown(line.replace(/^[-*]\s+/, ''))}</li>`)
            .join('')}</ul>`;
        }

        if (lines.length === 1 && /^>\s+/.test(lines[0])) {
          return `<blockquote>${inlineMarkdown(lines[0].replace(/^>\s+/, ''))}</blockquote>`;
        }

        return `<p>${lines.map(line => inlineMarkdown(line)).join('<br>')}</p>`;
      })
      .join('');
  }

  function buildSocialCaption(post) {
    const tagString = normalizeTags(post.tags)
      .slice(0, 4)
      .map(tag => `#${slugify(tag).replace(/-/g, '')}`)
      .join(' ');

    const base = [
      post.title,
      post.excerpt,
      'Read more on Megzier Group Ltd.',
      tagString,
    ]
      .filter(Boolean)
      .join('\n\n')
      .trim();

    return base.length > 280 ? `${base.slice(0, 276)}...` : base;
  }

  function buildSeoDescription(post) {
    return String(post.seoDescription || post.excerpt || '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function buildPostSearchText(post) {
    return [
      post.title,
      post.excerpt,
      post.category,
      normalizeTags(post.tags).join(' '),
      post.body,
    ]
      .join(' ')
      .toLowerCase();
  }

  function normalizePost(raw) {
    const title = String(raw?.title || '').trim();
    const slug = slugify(raw?.slug || title);
    const body = String(raw?.body || raw?.content || '').trim();
    const excerpt = String(raw?.excerpt || '').trim() || stripMarkdown(body).slice(0, 180) || 'No summary added yet.';
    const image = String(raw?.image || raw?.imageUrl || '').trim();
    const imageAlt = String(raw?.imageAlt || title || 'Megzier blog image').trim();
    const category = String(raw?.category || 'Blog').trim();
    const publishDate = raw?.publishDate || raw?.date || new Date().toISOString().slice(0, 10);
    const tags = normalizeTags(raw?.tags);
    const keywords = normalizeTags(raw?.keywords || raw?.seoKeywords || tags);
    const shareTargets = normalizeTags(raw?.shareTargets || raw?.socialTargets)
      .map(target => slugify(target))
      .filter(Boolean);
    const seoTitle = String(raw?.seoTitle || title).trim();
    const seoDescription = buildSeoDescription({
      seoDescription: raw?.seoDescription,
      excerpt,
    });
    const socialCaption = String(raw?.socialCaption || '').trim() || buildSocialCaption({ title, excerpt, tags });
    const readingTime = String(raw?.readingTime || '').trim() || estimateReadingTime(body || excerpt);
    const status = String(raw?.status || 'published').trim();
    const ctaText = String(raw?.ctaText || '').trim();
    const ctaUrl = String(raw?.ctaUrl || '').trim();
    const subtitle = String(raw?.subtitle || raw?.subheading || '').trim();

    return {
      id: String(raw?.id || slug || slugify(title)).trim(),
      slug,
      title,
      subtitle,
      category,
      excerpt,
      image,
      imageAlt,
      publishDate,
      readingTime,
      featured: Boolean(raw?.featured),
      tags,
      keywords,
      shareTargets,
      seoTitle,
      seoDescription,
      socialCaption,
      body,
      status,
      ctaText,
      ctaUrl,
      author: String(raw?.author || DEFAULT_AUTHOR).trim(),
      updatedAt: String(raw?.updatedAt || new Date().toISOString()).trim(),
      searchText: buildPostSearchText({
        title,
        excerpt,
        category,
        tags,
        body,
      }),
    };
  }

  function sortPosts(posts) {
    return [...posts].sort((a, b) => {
      if (Boolean(a.featured) !== Boolean(b.featured)) {
        return Boolean(b.featured) - Boolean(a.featured);
      }

      const aDate = new Date(a.publishDate || 0).getTime();
      const bDate = new Date(b.publishDate || 0).getTime();
      return bDate - aDate;
    });
  }

  function getPosts(options = {}) {
    const includeLocalDrafts = Boolean(options.includeLocalDrafts);
    const source = Array.isArray(window.MEGZIER_POSTS) ? window.MEGZIER_POSTS : [];
    const localDrafts = getLocalDrafts();
    const merged = includeLocalDrafts ? [...source, ...localDrafts] : source;
    const byId = new Map();

    merged.forEach(raw => {
      const post = normalizePost(raw);
      byId.set(post.id || post.slug, post);
    });

    return sortPosts(Array.from(byId.values()));
  }

  function isRenderablePost(post) {
    const title = String(post?.title || '').trim();
    const excerpt = String(post?.excerpt || '').trim();
    const body = String(post?.body || '').trim();
    return Boolean(title) && (Boolean(excerpt) || Boolean(body));
  }

  function getPublishedPosts(options = {}) {
    return getPosts(options).filter(post => post.status !== 'draft' && isRenderablePost(post));
  }

  function findPost(slug, options = {}) {
    const target = slugify(slug);
    return getPosts(options).find(post => post.slug === target || post.id === target) || null;
  }

  function getLocalDrafts() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      return [];
    }
  }

  function setLocalDrafts(posts) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    } catch (error) {
      return false;
    }
    return true;
  }

  function clearLocalDrafts() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      return false;
    }
    return true;
  }

  function downloadText(filename, text, mimeType) {
    const blob = new Blob([text], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 0);
  }

  function buildDataJs(posts) {
    return `window.MEGZIER_POSTS = ${JSON.stringify(posts, null, 2)};\n`;
  }

  function setMeta(name, content) {
    if (!content) return;
    let el = document.head.querySelector(`meta[name="${name}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute('name', name);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  }

  function setOpenGraph(property, content) {
    if (!content) return;
    let el = document.head.querySelector(`meta[property="${property}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute('property', property);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  }

  function setCanonical(url) {
    if (!url) return;
    let el = document.head.querySelector('link[rel="canonical"]');
    if (!el) {
      el = document.createElement('link');
      el.setAttribute('rel', 'canonical');
      document.head.appendChild(el);
    }
    el.setAttribute('href', url);
  }

  function shareUrl(platform, post, pageUrl) {
    const url = encodeURIComponent(pageUrl || location.href);
    switch (platform) {
      case 'linkedin':
        return `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
      case 'facebook':
        return `https://www.facebook.com/sharer/sharer.php?u=${url}`;
      case 'whatsapp':
        return `https://wa.me/?text=${encodeURIComponent(`${post.title} ${pageUrl || location.href}`)}`;
      case 'x':
        return `https://twitter.com/intent/tweet?url=${url}&text=${encodeURIComponent(post.title)}`;
      default:
        return pageUrl || location.href;
    }
  }

  function getUrlParam(name) {
    try {
      return new URLSearchParams(window.location.search).get(name);
    } catch (error) {
      return null;
    }
  }

  window.MegzierBlog = {
    DEFAULT_AUTHOR,
    DEFAULT_TAGS,
    STORAGE_KEY,
    escapeHtml,
    slugify,
    normalizeTags,
    formatDate,
    formatShortDate,
    estimateReadingTime,
    isAbsoluteUrl,
    isSiteAssetPath,
    resolveImageUrl,
    publicImageUrl,
    attachImageFallbacks,
    imageFallbackUrl: () => IMAGE_FALLBACK,
    stripMarkdown,
    inlineMarkdown,
    markdownToHtml,
    buildSocialCaption,
    buildSeoDescription,
    buildPostSearchText,
    normalizePost,
    sortPosts,
    getPosts,
    getPublishedPosts,
    isRenderablePost,
    findPost,
    getLocalDrafts,
    setLocalDrafts,
    clearLocalDrafts,
    downloadText,
    buildDataJs,
    setMeta,
    setOpenGraph,
    setCanonical,
    shareUrl,
    getUrlParam,
  };
})();
