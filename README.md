# Megzier Group Ltd Website

This folder contains the Megzier Group website and the new blog publishing flow.

## What is included

- `index.html` - homepage
- root HTML pages - about, services, portfolio, blog, post, and supporting pages
- `css/` - shared styles
- `js/` - shared scripts and blog render helpers
- `admin/` - blog editor and upload API for cPanel
- `images/` - logos and project images

## Blog publishing flow

1. Open the private admin page at `/admin.html` on the live site.
2. Sign in with the seeded admin account, then change the password from Settings.
3. Fill in the post fields:
   - title
   - subtitle
   - slug
   - category
   - excerpt
   - cover image
   - tags
   - SEO title and description
   - social caption
   - body content
   - CTA text and CTA URL
4. Save as draft or publish.

The blog page and post page read from `js/posts-data.js`, so the website updates from the same source the admin editor saves.

## Files the admin updates

- `js/posts-data.js`
- `rss.xml`
- `sitemap.xml`
- uploaded blog images in `images/blog/`

## Social API requirements

You will need the following if you want direct autoposting later:

- LinkedIn developer app and posting permissions
- Meta/Facebook developer app and Page access token
- TikTok developer app with Content Posting API access

The website is already prepared for website-first publishing. Social posting can be added after the platform permissions are approved.

## Notes

- The admin area is blocked from search engines with `robots.txt`.
- Blog uploads are stored in `images/blog/`.
- The public blog URLs are:
  - `blog.html`
  - `blog-details.html?slug=...`
