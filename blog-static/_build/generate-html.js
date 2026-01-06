#!/usr/bin/env node
/**
 * Blog Static Site Generator
 * Combines templates + markdown content → HTML output
 *
 * Features:
 * - Template/content separation
 * - Automatic language detection from app
 * - Markdown → HTML compilation
 * - SEO metadata injection
 *
 * Usage:
 *   node generate-html.js --lang=it --article=come-scrivere-cv-perfetto
 *   node generate-html.js --rebuild-all
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Paths
const TEMPLATES_DIR = path.join(__dirname, '..', '_templates');
const CONTENT_DIR = path.join(__dirname, '..', '_content');
const OUTPUT_DIR = path.join(__dirname, '..');

// All 23 supported languages from ClearCV app (synced with src/lib/i18n/translations.ts)
const ALL_SUPPORTED_LANGUAGES = [
  'it', 'en', 'de', 'fr', 'es', 'pt', 'nl', 'pl', 'ro', 'el',
  'cs', 'hu', 'sv', 'da', 'fi', 'no', 'sk', 'hr', 'sl', 'bg',
  'lt', 'lv', 'et'
];

// Fetch supported languages from app
async function fetchSupportedLanguages() {
  return new Promise((resolve, reject) => {
    https.get('https://clearcvapp.com/api/languages', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json.languages || ALL_SUPPORTED_LANGUAGES);
        } catch (e) {
          // Fallback to all 23 languages
          console.log('API not available, using all 23 supported languages');
          resolve(ALL_SUPPORTED_LANGUAGES);
        }
      });
    }).on('error', (e) => {
      console.log('API fetch failed, using all 23 supported languages');
      resolve(ALL_SUPPORTED_LANGUAGES);
    });
  });
}

// Load template
function loadTemplate(templateName) {
  const templatePath = path.join(TEMPLATES_DIR, `${templateName}.html`);
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Template not found: ${templateName}`);
  }
  return fs.readFileSync(templatePath, 'utf8');
}

// Parse YAML frontmatter from markdown
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    // No frontmatter, return content as-is with empty metadata
    return { content, metadata: {} };
  }

  const yamlContent = match[1];
  const markdownContent = match[2];

  // Simple YAML parser (works for basic key-value pairs)
  const metadata = {};
  yamlContent.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > -1) {
      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();

      // Remove quotes
      if ((value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }

      // Parse arrays [item1, item2]
      if (value.startsWith('[') && value.endsWith(']')) {
        value = value.slice(1, -1).split(',').map(v => v.trim().replace(/['"]/g, ''));
      }

      // Parse booleans
      if (value === 'true') value = true;
      if (value === 'false') value = false;

      metadata[key] = value;
    }
  });

  return { content: markdownContent, metadata };
}

// Load content (markdown with frontmatter or separate JSON)
function loadContent(lang, articleSlug) {
  const contentPath = path.join(CONTENT_DIR, lang, `${articleSlug}.md`);
  const metaPath = path.join(CONTENT_DIR, lang, `${articleSlug}.json`);

  if (!fs.existsSync(contentPath)) {
    throw new Error(`Content not found: ${lang}/${articleSlug}.md`);
  }

  const rawContent = fs.readFileSync(contentPath, 'utf8');

  // Try to parse frontmatter first
  const { content, metadata: frontmatterMeta } = parseFrontmatter(rawContent);

  // If separate JSON exists, merge it (JSON takes precedence for backwards compatibility)
  let metadata = frontmatterMeta;
  if (fs.existsSync(metaPath)) {
    const jsonMeta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
    metadata = { ...frontmatterMeta, ...jsonMeta };
  }

  return { content, metadata };
}

// Simple markdown → HTML (can be replaced with marked.js)
function markdownToHtml(markdown) {
  return markdown
    // H1
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    // H2
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    // H3
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Links
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
    // Paragraphs
    .replace(/^(?!<[h|u|o|d]|$)(.+)$/gm, '<p>$1</p>')
    // Line breaks
    .replace(/\n\n/g, '\n');
}

// Render template with data
function renderTemplate(template, data) {
  let output = template;

  // Replace placeholders: {{variable}}
  Object.keys(data).forEach(key => {
    const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
    output = output.replace(regex, data[key]);
  });

  return output;
}

// Generate single article HTML
async function generateArticle(lang, articleSlug) {
  console.log(`Generating: ${lang}/blog/${articleSlug}.html`);

  // Load template
  const template = loadTemplate('article');

  // Load content
  const { content, metadata } = loadContent(lang, articleSlug);

  // Convert markdown to HTML
  const htmlContent = markdownToHtml(content);

  // Get supported languages for language switcher
  const languages = await fetchSupportedLanguages();
  const langSwitcher = languages.map(l =>
    `<a href="/${l}/blog/${articleSlug}" class="${l === lang ? 'active' : ''}">${l.toUpperCase()}</a>`
  ).join('\n');

  // Render template with data
  const data = {
    lang,
    slug: articleSlug,
    title: metadata.title || 'Blog ClearCV',
    description: metadata.description || 'Guida CV',
    canonical: `https://clearcvapp.com/${lang}/blog/${articleSlug}`,
    content: htmlContent,
    langSwitcher,
    date: metadata.date || new Date().toISOString().split('T')[0],
    readTime: metadata.readTime || '5 min',
    keywords: metadata.keywords || 'cv, curriculum, guida'
  };

  const output = renderTemplate(template, data);

  // Write output
  const outputDir = path.join(OUTPUT_DIR, lang, 'blog');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, `${articleSlug}.html`);
  fs.writeFileSync(outputPath, output, 'utf8');

  console.log(`✅ Generated: ${outputPath}`);
}

// Generate blog index page
async function generateIndex(lang) {
  console.log(`Generating: ${lang}/blog/index.html`);

  // Load template
  const template = loadTemplate('index');

  // Get articles from content directory
  const articlesDir = path.join(CONTENT_DIR, lang);
  if (!fs.existsSync(articlesDir)) {
    console.log(`⚠️  No content directory for ${lang}`);
    return;
  }

  const articles = fs.readdirSync(articlesDir)
    .filter(f => f.endsWith('.md'))
    .map(f => {
      const slug = f.replace('.md', '');
      const metaPath = path.join(articlesDir, `${slug}.json`);
      const metadata = fs.existsSync(metaPath)
        ? JSON.parse(fs.readFileSync(metaPath, 'utf8'))
        : {};

      return {
        slug,
        title: metadata.title || slug,
        excerpt: metadata.excerpt || '',
        date: metadata.date || '',
        tags: metadata.tags || []
      };
    });

  // Get supported languages
  const languages = await fetchSupportedLanguages();
  const langSwitcher = languages.map(l =>
    `<a href="/${l}/blog/" class="${l === lang ? 'active' : ''}">${l.toUpperCase()}</a>`
  ).join('\n');

  // Generate article cards HTML
  const articleCards = articles.map(a => `
    <div class="article-card">
      <div class="article-image">📝</div>
      <div class="article-content">
        <div class="article-meta">📅 ${a.date} • ⏱️ 8 min lettura</div>
        <h3 class="article-title">
          <a href="/${lang}/blog/${a.slug}">${a.title}</a>
        </h3>
        <p class="article-excerpt">${a.excerpt}</p>
        <div class="article-tags">
          ${a.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('\n');

  // Render template
  const data = {
    lang,
    title: `Blog ClearCV - Guide CV`,
    description: 'Guide CV e template per curriculum perfetto',
    canonical: `https://clearcvapp.com/${lang}/blog/`,
    langSwitcher,
    articleCards
  };

  const output = renderTemplate(template, data);

  // Write output
  const outputDir = path.join(OUTPUT_DIR, lang, 'blog');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, 'index.html');
  fs.writeFileSync(outputPath, output, 'utf8');

  console.log(`✅ Generated: ${outputPath}`);
}

// Rebuild all articles
async function rebuildAll() {
  console.log('🔄 Rebuilding all blog content...\n');

  const languages = await fetchSupportedLanguages();

  for (const lang of languages) {
    const articlesDir = path.join(CONTENT_DIR, lang);
    if (!fs.existsSync(articlesDir)) {
      console.log(`⚠️  Skipping ${lang} (no content directory)`);
      continue;
    }

    // Generate index
    await generateIndex(lang);

    // Generate all articles
    const articles = fs.readdirSync(articlesDir)
      .filter(f => f.endsWith('.md'))
      .map(f => f.replace('.md', ''));

    for (const articleSlug of articles) {
      await generateArticle(lang, articleSlug);
    }

    console.log('');
  }

  console.log('✅ Rebuild complete!');
}

// CLI
async function main() {
  const args = process.argv.slice(2);

  if (args.includes('--rebuild-all')) {
    await rebuildAll();
  } else if (args.some(a => a.startsWith('--lang='))) {
    const lang = args.find(a => a.startsWith('--lang=')).split('=')[1];
    const articleArg = args.find(a => a.startsWith('--article='));

    if (articleArg) {
      const articleSlug = articleArg.split('=')[1];
      await generateArticle(lang, articleSlug);
    } else {
      await generateIndex(lang);
    }
  } else {
    console.log(`
Usage:
  node generate-html.js --rebuild-all
  node generate-html.js --lang=it --article=come-scrivere-cv-perfetto
  node generate-html.js --lang=en
    `);
  }
}

main().catch(console.error);
