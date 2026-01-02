/**
 * Cloudflare Worker for ClearCV - Lovable Version
 * Serves the static Lovable React app with SPA routing support
 * Injects Google Analytics and serves custom favicon without modifying Lovable source
 */

// Custom favicon SVG (original ClearCV icon)
const CUSTOM_FAVICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32"> <defs>  <linearGradient id="mainGrad" x1="0%" y1="0%" x2="100%" y2="100%"> <stop offset="0%" style="stop-color:#3B82F6;stop-opacity:1" /> <stop offset="100%" style="stop-color:#1D4ED8;stop-opacity:1" /> </linearGradient>   <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="100%"> <stop offset="0%" style="stop-color:#10B981;stop-opacity:1" /> <stop offset="100%" style="stop-color:#3B82F6;stop-opacity:1" /> </linearGradient>   <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%"> <feDropShadow dx="0" dy="1" stdDeviation="1" flood-color="#1E40AF" flood-opacity="0.3"/> </filter> </defs>   <circle cx="16" cy="16" r="15" fill="url(#mainGrad)" stroke="#1E40AF" stroke-width="0.5" filter="url(#shadow)"/>   <rect x="7" y="5" width="14" height="18" rx="2" ry="2" fill="white" opacity="0.95" stroke="#E5E7EB" stroke-width="0.3"/>   <rect x="9" y="7" width="14" height="18" rx="2" ry="2" fill="white" opacity="0.8" stroke="#E5E7EB" stroke-width="0.3"/>   <rect x="11" y="9" width="10" height="1.5" rx="0.75" fill="url(#mainGrad)"/> <rect x="11" y="11" width="7" height="1" rx="0.5" fill="#6B7280"/>   <rect x="11" y="13.5" width="8" height="0.7" rx="0.35" fill="#9CA3AF"/> <rect x="11" y="14.7" width="9.5" height="0.7" rx="0.35" fill="#9CA3AF"/> <rect x="11" y="15.9" width="6.5" height="0.7" rx="0.35" fill="#9CA3AF"/>  <rect x="11" y="17.5" width="7.5" height="0.7" rx="0.35" fill="#9CA3AF"/> <rect x="11" y="18.7" width="8.5" height="0.7" rx="0.35" fill="#9CA3AF"/> <rect x="11" y="19.9" width="5.5" height="0.7" rx="0.35" fill="#9CA3AF"/>   <circle cx="22" cy="23" r="2" fill="url(#accentGrad)" stroke="white" stroke-width="0.5"/> <path d="M20.5 23 L21.3 23.8 L23.5 21.6" stroke="white" stroke-width="1" fill="none" stroke-linecap="round" stroke-linejoin="round"/>   <circle cx="13" cy="21.5" r="0.3" fill="#D1D5DB"/> <circle cx="15" cy="21.5" r="0.3" fill="#D1D5DB"/> <circle cx="17" cy="21.5" r="0.3" fill="#D1D5DB"/></svg>`;

/**
 * Inject Google Analytics tracking code into HTML
 * This allows us to add Analytics without modifying Lovable code
 * Following wrapper strategy: never touch clear-cv-integration
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

  // Inject before closing </head> tag
  if (html.includes('</head>')) {
    return html.replace('</head>', `${analyticsScript}</head>`);
  }
  return html;
}

/**
 * Replace Lovable favicon with custom ClearCV favicon
 */
function replaceFavicon(html) {
  // Replace favicon.ico references with custom SVG
  return html.replace(/href="\/favicon\.ico"/g, 'href="/favicon.svg"');
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // CORS headers per supportare Supabase
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: corsHeaders
      });
    }

    try {
      // Serve custom favicon.svg (wrapper strategy)
      if (url.pathname === '/favicon.svg') {
        return new Response(CUSTOM_FAVICON, {
          headers: {
            'Content-Type': 'image/svg+xml',
            'Cache-Control': 'public, max-age=604800', // 7 days
            ...corsHeaders
          }
        });
      }

      // Get asset from ASSETS binding
      const asset = await env.ASSETS.fetch(request);

      // Check if it's HTML content (by pathname or content-type)
      const contentType = asset.headers.get('Content-Type') || '';
      const isHTML = contentType.includes('text/html') ||
                     url.pathname === '/' ||
                     url.pathname === '/index.html' ||
                     url.pathname.endsWith('.html') ||
                     asset.status === 404; // SPA fallback

      if (isHTML) {
        let htmlContent;

        if (asset.status === 404) {
          // SPA fallback - serve index.html for all non-asset routes
          const indexHtml = await env.ASSETS.fetch(new URL('/index.html', request.url));
          htmlContent = await indexHtml.text();
        } else {
          htmlContent = await asset.text();
        }

        // Apply modifications (wrapper strategy)
        let modifiedHtml = injectAnalytics(htmlContent);
        modifiedHtml = replaceFavicon(modifiedHtml);

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
