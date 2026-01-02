/**
 * Cloudflare Worker for ClearCV - Lovable Version
 * Serves the static Lovable React app with SPA routing support
 * Injects Google Analytics without modifying Lovable source code
 */

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
  return html.replace('</head>', `${analyticsScript}</head>`);
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
      // Get asset from ASSETS binding
      const asset = await env.ASSETS.fetch(request);

      if (asset.status === 404) {
        // SPA fallback - serve index.html for all non-asset routes
        const indexHtml = await env.ASSETS.fetch(new URL('/index.html', request.url));
        const htmlText = await indexHtml.text();

        // Inject Google Analytics into HTML
        const modifiedHtml = injectAnalytics(htmlText);

        return new Response(modifiedHtml, {
          headers: {
            ...Object.fromEntries(indexHtml.headers),
            ...corsHeaders,
            'Content-Type': 'text/html; charset=utf-8'
          }
        });
      }

      // Check if it's the index.html file and inject Analytics
      if (url.pathname === '/' || url.pathname === '/index.html') {
        const htmlText = await asset.text();

        // Inject Google Analytics into HTML
        const modifiedHtml = injectAnalytics(htmlText);

        return new Response(modifiedHtml, {
          headers: {
            ...Object.fromEntries(asset.headers),
            ...corsHeaders,
            'Content-Type': 'text/html; charset=utf-8'
          }
        });
      }

      // Return asset with CORS headers
      return new Response(asset.body, {
        ...asset,
        headers: {
          ...Object.fromEntries(asset.headers),
          ...corsHeaders
        }
      });
    } catch (error) {
      return new Response('Internal Server Error', {
        status: 500,
        headers: corsHeaders
      });
    }
  }
};
