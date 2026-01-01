/**
 * Cloudflare Worker for ClearCV - Lovable Version
 * Serves the static Lovable React app with SPA routing support
 */

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
      // Get asset from KV or return index.html for SPA routing
      const asset = await env.ASSETS.fetch(request);

      if (asset.status === 404) {
        // SPA fallback - serve index.html for all non-asset routes
        const indexHtml = await env.ASSETS.fetch(new URL('/index.html', request.url));
        return new Response(indexHtml.body, {
          ...indexHtml,
          headers: {
            ...Object.fromEntries(indexHtml.headers),
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
