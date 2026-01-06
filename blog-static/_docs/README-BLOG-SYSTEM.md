# ClearCV Blog System - Template/Content Architecture

## Architecture Overview

```
blog-static/
├── _templates/          # UX/UI templates (separati dal contenuto)
│   ├── article.html     # Template articolo singolo
│   ├── index.html       # Template homepage blog
│   └── styles.css       # CSS design system ClearCV
├── _content/            # Contenuti markdown + metadata JSON
│   ├── it/
│   │   ├── come-scrivere-cv-perfetto.md
│   │   └── come-scrivere-cv-perfetto.json
│   ├── en/
│   ├── es/
│   ├── fr/
│   └── de/
├── _build/              # Build system
│   └── generate-html.js # Script template+content → HTML
├── it/blog/             # Output HTML generato (IT)
├── en/blog/             # Output HTML generato (EN)
├── es/blog/             # Output HTML generato (ES)
├── fr/blog/             # Output HTML generato (FR)
├── de/blog/             # Output HTML generato (DE)
├── sitemap.xml          # Sitemap globale multilingua
├── robots.txt           # Robots.txt ottimizzato SEO
├── _headers             # Custom HTTP headers Cloudflare
├── _redirects           # Redirects multilingua
└── index.html           # Root redirect → /it/blog/
```

## Key Principles

### 1. Template/Content Separation

**Problem**: Mixing UX/UI with content makes updates hard
**Solution**: Templates use placeholders `{{variable}}`, content is pure markdown

**Benefits**:
- Work on design without touching content
- Update articles without breaking layout
- Easy to A/B test different templates
- Content writers don't need HTML knowledge

### 2. Build System

**Script**: `_build/generate-html.js`

**Process**:
1. Fetch supported languages from `/api/languages` endpoint
2. Load template from `_templates/`
3. Load content from `_content/LANG/article.md`
4. Load metadata from `_content/LANG/article.json`
5. Convert markdown → HTML
6. Inject data into template placeholders
7. Write final HTML to `LANG/blog/article.html`

**Usage**:
```bash
# Generate single article
node _build/generate-html.js --lang=it --article=come-scrivere-cv-perfetto

# Rebuild all articles
node _build/generate-html.js --rebuild-all
```

### 3. SEO Optimization (Multilingual)

#### Sitemap.xml

**Location**: `/sitemap.xml` (global) + `/LANG/blog/sitemap.xml` (per-language)

**Features**:
- All 5 languages indexed
- `<xhtml:link>` for hreflang alternate URLs
- Priority: Homepage 1.0, Articles 0.8
- Changefreq: Homepage daily, Articles monthly
- Last modified dates

**Example entry**:
```xml
<url>
    <loc>https://clearcvapp.com/it/blog/come-scrivere-cv-perfetto</loc>
    <lastmod>2026-01-04</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="it" href="..."/>
    <xhtml:link rel="alternate" hreflang="en" href="..."/>
    <!-- ... other languages ... -->
</url>
```

#### Robots.txt

**Location**: `/robots.txt`

**Configuration**:
```
User-agent: *
Allow: /

# Allow all blog content
Allow: /it/blog/
Allow: /en/blog/
Allow: /es/blog/
Allow: /fr/blog/
Allow: /de/blog/

# Disallow internal directories
Disallow: /_templates/
Disallow: /_content/
Disallow: /_build/

# Sitemap references
Sitemap: https://clearcvapp.com/sitemap.xml
Sitemap: https://clearcvapp.com/it/blog/sitemap.xml
Sitemap: https://clearcvapp.com/en/blog/sitemap.xml
...
```

#### Custom HTTP Headers (_headers)

**Location**: `/_headers`

**Features**:
- Security headers (X-Frame-Options, CSP, etc.)
- `Content-Language` per language path
- `Link` headers for hreflang alternates
- Cache-Control optimization:
  - HTML: 1 hour
  - CSS: 1 year (immutable)
  - Sitemap: 1 hour

**Example**:
```
/it/blog/*
  Content-Language: it
  Link: <https://clearcvapp.com/it/blog/>; rel="alternate"; hreflang="it"
  Link: <https://clearcvapp.com/en/blog/>; rel="alternate"; hreflang="en"
  ...
```

#### Redirects (_redirects)

**Location**: `/_redirects`

**Rules**:
- `/blog` → `/it/blog/` (default language)
- `/blog/*` → `/it/blog/:splat` (legacy URLs)
- Trailing slash normalization

### 4. CSS Design System Integration

**File**: `_templates/styles.css`

**Source**: Copied from `clear-cv-integration/src/index.css`

**Features**:
- Same CSS custom properties as main app
- Identical color scheme (HSL format)
- Matching gradients and animations
- 100% visual consistency

**Variables**:
```css
:root {
  --primary: 217 91% 60%;          /* Primary blue */
  --accent: 262 83% 58%;            /* Purple accent */
  --gradient-primary: linear-gradient(135deg, ...);
}
```

## Workflow: Adding New Article

### Step 1: Create Content Files

**Create markdown**: `_content/it/nuovo-articolo.md`
```markdown
# Titolo Articolo

Contenuto in markdown...

## Sezione 1

Testo...
```

**Create metadata**: `_content/it/nuovo-articolo.json`
```json
{
  "title": "Titolo Completo Articolo",
  "description": "Meta description per SEO",
  "keywords": "keyword1, keyword2, keyword3",
  "date": "2026-01-04",
  "readTime": "10 min",
  "author": "ClearCV Team",
  "category": "Guide",
  "tags": ["tag1", "tag2"],
  "featured": true
}
```

### Step 2: Generate HTML

```bash
cd blog-static/_build
node generate-html.js --lang=it --article=nuovo-articolo
```

**Output**: `blog-static/it/blog/nuovo-articolo.html`

### Step 3: Update Sitemap

Add entry to `sitemap.xml`:
```xml
<url>
    <loc>https://clearcvapp.com/it/blog/nuovo-articolo</loc>
    <lastmod>2026-01-04</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <!-- hreflang links for all languages -->
</url>
```

### Step 4: Deploy

```bash
cd blog-static
npx wrangler pages deploy . --project-name=clearcv-blog --branch=production --commit-dirty=true
```

## Workflow: Updating Template Design

### Step 1: Edit Template

Modify `_templates/article.html` or `_templates/styles.css`

**Example**: Change header gradient
```css
/* _templates/styles.css */
header {
  background: var(--gradient-primary);  /* Uses design system variable */
}
```

### Step 2: Rebuild All Articles

```bash
cd _build
node generate-html.js --rebuild-all
```

This regenerates ALL articles with new template design.

### Step 3: Deploy

All articles now use updated design without touching content files.

## Integration with Main App

### Language API Endpoint

**Worker endpoint**: `/api/languages`

**Response**:
```json
{
  "languages": ["it", "en", "es", "fr", "de"],
  "default": "it",
  "labels": {
    "it": "Italiano",
    "en": "English",
    ...
  }
}
```

**Usage**: Build script fetches languages dynamically

**Benefit**: Add new language to main app → automatically available in blog

### CSS Design System

**Source**: `clear-cv-integration/src/index.css`

**Sync Process**:
1. Extract CSS variables from main app
2. Copy to `_templates/styles.css`
3. Blog inherits design system
4. Changes to main app design → update blog CSS

**Immutability**: Main app (`clear-cv-integration`) is **never modified** (Lovable requirement), only read for CSS extraction.

## SEO Best Practices

### URL Structure (Path-based)

✅ **CORRECT** (SEO-friendly):
- `clearcvapp.com/it/blog/come-scrivere-cv-perfetto`
- `clearcvapp.com/en/blog/how-to-write-perfect-resume`

❌ **WRONG** (subdomain splits authority):
- `blog.clearcvapp.com/it/come-scrivere-cv-perfetto`

**Why**: Path-based URLs consolidate SEO authority on main domain

### Hreflang Tags

**In HTML** (`<head>`):
```html
<link rel="alternate" hreflang="it" href="https://clearcvapp.com/it/blog/article">
<link rel="alternate" hreflang="en" href="https://clearcvapp.com/en/blog/article">
...
```

**In Sitemap**:
```xml
<xhtml:link rel="alternate" hreflang="it" href="..."/>
```

**In HTTP Headers** (`_headers`):
```
Link: <https://clearcvapp.com/it/blog/>; rel="alternate"; hreflang="it"
```

**Result**: Google knows all language versions exist and indexes correctly

### Schema.org Structured Data

**In article template**:
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "{{title}}",
  "datePublished": "{{date}}",
  "author": {
    "@type": "Organization",
    "name": "ClearCV"
  },
  ...
}
```

**Benefits**:
- Rich snippets in Google results
- Better CTR from search
- FAQ schema support (planned)

### Performance Optimization

**Cache Control** (`_headers`):
- HTML articles: 1 hour (frequent updates)
- CSS/static: 1 year immutable
- Sitemap: 1 hour (changes when new articles)

**Result**: Fast load times + fresh content

## Deployment

### Production URL

**Backend**: `https://6f5e12e6.clearcv-blog.pages.dev`
**Public**: `https://clearcvapp.com/it/blog/` (via worker reverse proxy)

### Deploy Command

```bash
cd blog-static
npx wrangler pages deploy . \
  --project-name=clearcv-blog \
  --branch=production \
  --commit-dirty=true
```

### What Gets Deployed

**Included**:
- All HTML files (`it/`, `en/`, `es/`, `fr/`, `de/`)
- `_templates/` (for CSS)
- `sitemap.xml`
- `robots.txt`
- `_headers`
- `_redirects`
- `index.html` (root redirect)

**Excluded** (via `.gitignore` for Wrangler):
- `.credentials/`
- `_build/` (build scripts)
- `_content/` (raw markdown, not needed in production)
- `.git/`

## Future Enhancements

### Planned Features

1. **Automated Sitemap Generation**
   - Script scans `_content/` and auto-generates `sitemap.xml`
   - No manual editing needed

2. **RSS Feed**
   - Generate `feed.xml` for blog subscribers
   - Per-language RSS feeds

3. **Search Functionality**
   - Client-side search with Fuse.js
   - Index generated from content files

4. **Comments System**
   - Integrate Disqus or Commento
   - Static blog + dynamic comments

5. **Analytics Integration**
   - Google Analytics 4
   - Cloudflare Web Analytics (free)

### WordPress Integration (Optional)

**When Docker available**:
1. Run WordPress locally (`blog-local/docker-compose.yml`)
2. Polylang plugin for multilingual
3. WP All Import for bulk articles
4. Simply Static export → HTML
5. Deploy exported HTML to Cloudflare Pages

**Benefits**:
- Visual editor for non-technical writers
- Bulk content generation
- Plugin ecosystem (SEO, forms, etc.)

**Drawback**: Extra build step, but same final output (static HTML)

## Troubleshooting

### Problem: Sitemap Not Found

**Symptom**: `404` on `/sitemap.xml`

**Solution**:
- Verify file exists: `ls blog-static/sitemap.xml`
- Redeploy: `npx wrangler pages deploy ...`
- Check Cloudflare Pages dashboard → Deployments

### Problem: Template Changes Not Visible

**Symptom**: Updated CSS but blog looks same

**Solution**:
1. Rebuild HTML: `node generate-html.js --rebuild-all`
2. Clear browser cache (Ctrl+Shift+R)
3. Check deployment includes `_templates/styles.css`

### Problem: Language Switcher Not Working

**Symptom**: All language links point to same page

**Solution**:
- Verify metadata has `slug` field matching across languages
- Check template uses `{{slug}}` in language switcher
- Ensure all language versions exist (`it/`, `en/`, etc.)

### Problem: Google Not Indexing Articles

**Symptom**: Articles not in Google Search Console

**Solution**:
1. Submit sitemap in Google Search Console
2. Verify `robots.txt` allows indexing
3. Check `_headers` has no `x-robots-tag: noindex`
4. Request indexing for individual URLs
5. Wait 2-7 days for crawling

## Cost & Performance

### Hosting Cost

**Cloudflare Pages**: €0/month (free tier)
- Unlimited bandwidth
- Unlimited requests
- 500 builds/month
- Global CDN

**Total**: **€0/month** ✅

### Performance Metrics

**Load Time**:
- HTML: ~200ms (CDN cached)
- CSS: ~50ms (immutable cache)
- Total FCP: < 1s worldwide

**Lighthouse Score** (expected):
- Performance: 95-100
- SEO: 100
- Best Practices: 95-100
- Accessibility: 90-95

## Comparison with Alternatives

| Feature | Static (Current) | WordPress Live | Substack |
|---------|-----------------|----------------|----------|
| **Cost** | €0/month | €3.99-6/month | €0-10/month |
| **Maintenance** | None | OS updates, security | None |
| **Speed** | < 1s load | 2-4s load | 1-2s load |
| **SEO Control** | Full | Full | Limited |
| **Custom Design** | 100% | 100% | 30% |
| **Multilingua** | Full | Plugins | No |
| **Build Time** | 5 min | N/A | N/A |

**Winner**: Static for cost, speed, and control.

## Links

- **Production Blog**: https://clearcvapp.com/it/blog/
- **Cloudflare Pages**: https://6f5e12e6.clearcv-blog.pages.dev
- **Sitemap**: https://clearcvapp.com/sitemap.xml
- **Robots**: https://clearcvapp.com/robots.txt

**Last Updated**: 2026-01-04
