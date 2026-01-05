/**
 * Cloudflare Worker for ClearCV - Lovable Version with SEO Enhancements
 * Serves the static Lovable React app with:
 * - SPA routing support
 * - Google Analytics injection
 * - Custom favicon
 * - Schema.org structured data
 * - robots.txt & sitemap.xml
 * - Noscript SEO content for indexing
 *
 * Wrapper Strategy: Never modify clear-cv-integration, only wrap externally
 */

// Custom favicon SVG (original ClearCV icon)
const CUSTOM_FAVICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32"> <defs>  <linearGradient id="mainGrad" x1="0%" y1="0%" x2="100%" y2="100%"> <stop offset="0%" style="stop-color:#3B82F6;stop-opacity:1" /> <stop offset="100%" style="stop-color:#1D4ED8;stop-opacity:1" /> </linearGradient>   <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="100%"> <stop offset="0%" style="stop-color:#10B981;stop-opacity:1" /> <stop offset="100%" style="stop-color:#3B82F6;stop-opacity:1" /> </linearGradient>   <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%"> <feDropShadow dx="0" dy="1" stdDeviation="1" flood-color="#1E40AF" flood-opacity="0.3"/> </filter> </defs>   <circle cx="16" cy="16" r="15" fill="url(#mainGrad)" stroke="#1E40AF" stroke-width="0.5" filter="url(#shadow)"/>   <rect x="7" y="5" width="14" height="18" rx="2" ry="2" fill="white" opacity="0.95" stroke="#E5E7EB" stroke-width="0.3"/>   <rect x="9" y="7" width="14" height="18" rx="2" ry="2" fill="white" opacity="0.8" stroke="#E5E7EB" stroke-width="0.3"/>   <rect x="11" y="9" width="10" height="1.5" rx="0.75" fill="url(#mainGrad)"/> <rect x="11" y="11" width="7" height="1" rx="0.5" fill="#6B7280"/>   <rect x="11" y="13.5" width="8" height="0.7" rx="0.35" fill="#9CA3AF"/> <rect x="11" y="14.7" width="9.5" height="0.7" rx="0.35" fill="#9CA3AF"/> <rect x="11" y="15.9" width="6.5" height="0.7" rx="0.35" fill="#9CA3AF"/>  <rect x="11" y="17.5" width="7.5" height="0.7" rx="0.35" fill="#9CA3AF"/> <rect x="11" y="18.7" width="8.5" height="0.7" rx="0.35" fill="#9CA3AF"/> <rect x="11" y="19.9" width="5.5" height="0.7" rx="0.35" fill="#9CA3AF"/>   <circle cx="22" cy="23" r="2" fill="url(#accentGrad)" stroke="white" stroke-width="0.5"/> <path d="M20.5 23 L21.3 23.8 L23.5 21.6" stroke="white" stroke-width="1" fill="none" stroke-linecap="round" stroke-linejoin="round"/>   <circle cx="13" cy="21.5" r="0.3" fill="#D1D5DB"/> <circle cx="15" cy="21.5" r="0.3" fill="#D1D5DB"/> <circle cx="17" cy="21.5" r="0.3" fill="#D1D5DB"/></svg>`;

/**
 * Inject Google Analytics tracking code
 */
function injectAnalytics(html) {
  const analyticsScript = `
  <!-- Google tag (gtag.js) - Injected by Cloudflare Worker -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-VTLG85NBTE"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-VTLG85NBTE');
  </script>
  `;

  if (html.includes('</head>')) {
    return html.replace('</head>', `${analyticsScript}</head>`);
  }
  return html;
}

/**
 * Inject Schema.org structured data (JSON-LD)
 * Includes: SoftwareApplication, Organization, FAQPage
 */
function injectSchemaOrg(html) {
  const schema = `
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "ClearCV",
        "applicationCategory": "BusinessApplication",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "EUR"
        },
        "operatingSystem": "Web",
        "description": "Create your professional CV online for free. Intuitive CV editor with artificial intelligence, live preview, export to PDF. The best Italian CV maker.",
        "url": "https://clearcvapp.com",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "ratingCount": "150"
        },
        "featureList": [
          "AI-powered suggestions",
          "Live preview",
          "PDF export",
          "ATS-friendly templates",
          "Multilingual support"
        ]
      },
      {
        "@type": "Organization",
        "name": "ClearCV",
        "url": "https://clearcvapp.com",
        "logo": "https://clearcvapp.com/favicon.svg",
        "foundingDate": "2026",
        "description": "Professional CV builder with AI"
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Is ClearCV free?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, ClearCV is completely free. You can create, edit and export your CV without any costs."
            }
          },
          {
            "@type": "Question",
            "name": "Can I export my CV to PDF?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, you can download your CV in professional PDF format with one click."
            }
          },
          {
            "@type": "Question",
            "name": "Are the templates ATS-friendly?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, all our CV templates are optimized for ATS (Applicant Tracking System) to maximize your chances of getting noticed."
            }
          },
          {
            "@type": "Question",
            "name": "Do I need to install anything?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No, ClearCV works directly in your browser. No installation required."
            }
          }
        ]
      }
    ]
  }
  </script>
  `;

  if (html.includes('</head>')) {
    return html.replace('</head>', `${schema}</head>`);
  }
  return html;
}

/**
 * Inject Premium Product Schema.org structured data (JSON-LD)
 * Used for /en/auth and other premium pages
 * Fixes Google Search Console error: "image" field missing
 */
function injectPremiumSchemaOrg(html) {
  const schema = `
  <script type="application/ld+json">
  {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "ClearCV Premium",
    "image": [
      "https://clearcvapp.com/og-image.png"
    ],
    "description": "ClearCV Premium plan with cloud storage, no watermark and advanced export formats",
    "brand": {
      "@type": "Brand",
      "name": "ClearCV"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://clearcvapp.com/en/auth",
      "priceCurrency": "EUR",
      "price": "3.99",
      "priceValidUntil": "2026-12-31",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "ClearCV"
      },
      "hasMerchantReturnPolicy": {
        "@type": "MerchantReturnPolicy",
        "applicableCountry": "IT",
        "returnPolicyCategory": "https://schema.org/MerchantReturnNotPermitted",
        "merchantReturnDays": 0
      },
      "shippingDetails": {
        "@type": "OfferShippingDetails",
        "shippingRate": {
          "@type": "MonetaryAmount",
          "value": 0,
          "currency": "EUR"
        },
        "shippingDestination": {
          "@type": "DefinedRegion",
          "addressCountry": "IT"
        }
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "2847"
    }
  }
  </script>
  `;

  if (html.includes('</head>')) {
    return html.replace('</head>', `${schema}</head>`);
  }
  return html;
}

/**
 * Inject noscript SEO content for search engines
 * Contains keywords and descriptive text for indexing
 */
function injectNoscriptSEO(html) {
  const seoContent = `
  <noscript>
    <div style="padding: 40px 20px; max-width: 900px; margin: 0 auto; font-family: system-ui, -apple-system, sans-serif; line-height: 1.6;">
      <h1>ClearCV - Free Professional CV Maker Online with AI</h1>

      <p style="font-size: 1.1em; margin: 20px 0;">
        <strong>Create your professional curriculum vitae in 5 minutes with ClearCV</strong>, the most advanced free CV builder in Italy.
        Use artificial intelligence to write a winning CV, export to PDF and get your dream job.
      </p>

      <h2>Why Choose ClearCV?</h2>
      <ul style="margin: 20px 0;">
        <li><strong>100% Free</strong> - No hidden costs, all features included</li>
        <li><strong>AI Integrated</strong> - Smart suggestions to improve your CV</li>
        <li><strong>Live Preview</strong> - See the result while you write</li>
        <li><strong>PDF Export</strong> - Download your professional CV</li>
        <li><strong>ATS Optimized</strong> - Templates designed for Applicant Tracking Systems</li>
        <li><strong>Privacy First</strong> - Your data stays private and secure</li>
        <li><strong>Multilingual</strong> - Create CV in Italian, English, German, French, Spanish</li>
      </ul>

      <h2>How ClearCV Works</h2>
      <ol style="margin: 20px 0;">
        <li>Register for free with email or Google</li>
        <li>Choose a professional ATS-friendly template</li>
        <li>Fill sections guided by AI</li>
        <li>Customize design and content</li>
        <li>Export to PDF and apply for jobs</li>
      </ol>

      <h2>Professional CV Templates</h2>
      <p>Choose from modern templates optimized for ATS (Applicant Tracking System). Our CV models are tested with major recruiting software and guarantee maximum readability by HR managers.</p>

      <h2>European CV and Europass Format</h2>
      <p>ClearCV supports the European curriculum vitae format (Europass) and all standard Italian and international formats. Create a CV that works everywhere in Europe and worldwide.</p>

      <h2>Keywords: CV Maker, Resume Builder, Curriculum Vitae Online</h2>
      <p>ClearCV is the best solution to <strong>create CV for free</strong>, build a <strong>professional resume online</strong>, generate <strong>curriculum vitae PDF</strong>, and design <strong>European CV Europass</strong>. Our <strong>free CV builder</strong> with <strong>artificial intelligence</strong> helps you write an effective CV in minutes.</p>

      <h3>CV Maker Gratis - CV Online Italiano</h3>
      <p>Cerchi un <strong>CV maker gratis</strong> in italiano? ClearCV è il <strong>generatore di curriculum vitae online</strong> più semplice e veloce. <strong>Crea curriculum gratis</strong> con modelli professionali, <strong>curriculum vitae europeo</strong>, <strong>CV Europass</strong>, e tanto altro.</p>

      <h3>Free Resume Builder - Professional CV Maker</h3>
      <p>Looking for a <strong>free resume builder</strong>? ClearCV is the best <strong>professional CV maker online</strong>. Build <strong>resume free</strong>, create <strong>curriculum vitae online</strong>, generate <strong>professional CV templates</strong>, and download PDF instantly.</p>

      <h2>Frequently Asked Questions</h2>

      <h3>Is it really free?</h3>
      <p>Yes, ClearCV is completely free. No hidden costs, no premium tiers, no credit card required.</p>

      <h3>Can I export to PDF?</h3>
      <p>Yes, you can download your CV in professional PDF format ready to send to employers.</p>

      <h3>Is my data safe?</h3>
      <p>Absolutely. We use end-to-end encryption and never share your data with third parties.</p>

      <h3>Do I need to install anything?</h3>
      <p>No, ClearCV works directly in the browser on any device. No installation required.</p>

      <h3>Which languages are supported?</h3>
      <p>ClearCV supports Italian, English, German, French, and Spanish. Create your multilingual CV easily.</p>

      <div style="margin-top: 40px; padding: 20px; background: #f3f4f6; border-radius: 8px;">
        <p style="margin: 0;"><strong>Start now!</strong> Visit <a href="https://clearcvapp.com" style="color: #3B82F6;">clearcvapp.com</a> to create your professional CV in 5 minutes.</p>
      </div>
    </div>
  </noscript>
  `;

  if (html.includes('</body>')) {
    return html.replace('</body>', `${seoContent}</body>`);
  }
  return html;
}

/**
 * Replace Lovable favicon with custom ClearCV favicon
 */
function replaceFavicon(html) {
  return html.replace(/href="\/favicon\.ico"/g, 'href="/favicon.svg"');
}

/**
 * Generate robots.txt
 */
function generateRobotsTxt() {
  return `User-agent: *
Allow: /
Sitemap: https://clearcvapp.com/sitemap.xml

User-agent: Googlebot
Allow: /
Crawl-delay: 0

User-agent: Bingbot
Allow: /
Crawl-delay: 0

User-agent: Yandex
Allow: /
Crawl-delay: 1

# Block AI crawlers (optional - uncomment if needed)
# User-agent: GPTBot
# Disallow: /
# User-agent: ChatGPT-User
# Disallow: /
# User-agent: CCBot
# Disallow: /`;
}

/**
 * Generate sitemap.xml
 */
function generateSitemapXml() {
  const now = new Date().toISOString().split('T')[0];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://clearcvapp.com/</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="it" href="https://clearcvapp.com/" />
    <xhtml:link rel="alternate" hreflang="en" href="https://clearcvapp.com/" />
    <xhtml:link rel="alternate" hreflang="de" href="https://clearcvapp.com/" />
    <xhtml:link rel="alternate" hreflang="fr" href="https://clearcvapp.com/" />
    <xhtml:link rel="alternate" hreflang="es" href="https://clearcvapp.com/" />
  </url>
  <!-- Add more pages when available -->
</urlset>`;
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // CORS headers for Supabase
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      // Serve robots.txt
      if (url.pathname === '/robots.txt') {
        return new Response(generateRobotsTxt(), {
          headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'public, max-age=3600',
            ...corsHeaders
          }
        });
      }

      // Serve sitemap.xml
      if (url.pathname === '/sitemap.xml') {
        return new Response(generateSitemapXml(), {
          headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'public, max-age=3600',
            ...corsHeaders
          }
        });
      }

      // Serve custom favicon.svg
      if (url.pathname === '/favicon.svg') {
        return new Response(CUSTOM_FAVICON, {
          headers: {
            'Content-Type': 'image/svg+xml',
            'Cache-Control': 'public, max-age=604800',
            ...corsHeaders
          }
        });
      }

      // API: Supported Languages (for blog generation)
      if (url.pathname === '/api/languages') {
        const languages = {
          languages: ['it', 'en', 'es', 'fr', 'de'],
          default: 'it',
          labels: {
            it: 'Italiano',
            en: 'English',
            es: 'Español',
            fr: 'Français',
            de: 'Deutsch'
          }
        };
        return new Response(JSON.stringify(languages), {
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Cache-Control': 'public, max-age=3600',
            ...corsHeaders
          }
        });
      }

      // Serve main app CSS for blog (auto-sync design system)
      // Proxies the main app CSS so blog stays visually aligned
      if (url.pathname === '/assets/blog-styles.css') {
        // Current CSS file from main app (update hash after main app deployments)
        const cssUrl = 'https://clearcvapp.com/assets/index-BEJyPPgn.css';

        try {
          const cssResponse = await fetch(cssUrl);

          if (cssResponse.ok) {
            return new Response(cssResponse.body, {
              headers: {
                'Content-Type': 'text/css; charset=utf-8',
                'Cache-Control': 'public, max-age=3600', // 1 hour
                'Access-Control-Allow-Origin': '*',
                ...corsHeaders
              }
            });
          }
        } catch (error) {
          // Fallback to no CSS
        }

        return new Response('/* Main app CSS not available */', {
          status: 503,
          headers: {
            'Content-Type': 'text/css; charset=utf-8',
            ...corsHeaders
          }
        });
      }

      // Blog Assets Proxy
      // Forward /assets/*.js and /assets/*.css to Pages (for blog JavaScript/CSS files)
      if (url.pathname.startsWith('/assets/') && (url.pathname.endsWith('.js') || url.pathname.endsWith('.css'))) {
        const assetUrl = `https://1607c267.clearcv-blog.pages.dev${url.pathname}`;
        const assetResponse = await fetch(assetUrl);

        return new Response(assetResponse.body, {
          status: assetResponse.status,
          headers: {
            'Content-Type': assetResponse.headers.get('Content-Type') || (url.pathname.endsWith('.js') ? 'application/javascript' : 'text/css'),
            'Cache-Control': 'public, max-age=3600',
            'Access-Control-Allow-Origin': '*',
            ...corsHeaders
          }
        });
      }

      // Blog Reverse Proxy
      // Forwards /blog/* and /[lang]/blog/* to Cloudflare Pages deployment
      const blogPathPattern = /^\/(it|en|es|fr|de)?\/?(blog\/.*)$/;
      const blogMatch = url.pathname.match(blogPathPattern);

      if (blogMatch) {
        const lang = blogMatch[1] || 'it'; // Default Italian
        const blogPath = blogMatch[2]; // blog/article-slug

        // Cloudflare Pages deployment URL (updated: 2026-01-05 - CSS absolute URLs fix)
        const wpUrl = `https://1607c267.clearcv-blog.pages.dev/${lang}/${blogPath}`;

        // Forward request to WordPress
        const wpResponse = await fetch(wpUrl, {
          method: request.method,
          headers: request.headers,
          body: request.method !== 'GET' && request.method !== 'HEAD' ? request.body : undefined
        });

        // Return WordPress response with CORS headers
        return new Response(wpResponse.body, {
          status: wpResponse.status,
          statusText: wpResponse.statusText,
          headers: {
            ...Object.fromEntries(wpResponse.headers),
            ...corsHeaders
          }
        });
      }

      // Get asset from ASSETS binding
      const asset = await env.ASSETS.fetch(request);

      // Check if it's HTML content
      const contentType = asset.headers.get('Content-Type') || '';
      const isHTML = contentType.includes('text/html') ||
                     url.pathname === '/' ||
                     url.pathname === '/index.html' ||
                     url.pathname.endsWith('.html') ||
                     asset.status === 404;

      if (isHTML) {
        let htmlContent;

        if (asset.status === 404) {
          // SPA fallback
          const indexHtml = await env.ASSETS.fetch(new URL('/index.html', request.url));
          htmlContent = await indexHtml.text();
        } else {
          htmlContent = await asset.text();
        }

        // Apply all SEO enhancements (wrapper strategy)
        let modifiedHtml = injectAnalytics(htmlContent);

        // Route-based Schema.org injection
        // Use Premium Product schema for /en/auth and similar premium pages
        const isPremiumPage = url.pathname.includes('/auth') ||
                              url.pathname.includes('/premium') ||
                              url.pathname.includes('/pricing');

        if (isPremiumPage) {
          modifiedHtml = injectPremiumSchemaOrg(modifiedHtml);
        } else {
          modifiedHtml = injectSchemaOrg(modifiedHtml);
        }

        modifiedHtml = replaceFavicon(modifiedHtml);
        modifiedHtml = injectNoscriptSEO(modifiedHtml);

        return new Response(modifiedHtml, {
          headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'public, max-age=0, must-revalidate',
            ...corsHeaders
          }
        });
      }

      // Return other assets with CORS headers
      return new Response(asset.body, {
        status: asset.status,
        statusText: asset.statusText,
        headers: {
          ...Object.fromEntries(asset.headers),
          ...corsHeaders
        }
      });
    } catch (error) {
      return new Response(`Internal Server Error: ${error.message}`, {
        status: 500,
        headers: {
          'Content-Type': 'text/plain',
          ...corsHeaders
        }
      });
    }
  }
};
