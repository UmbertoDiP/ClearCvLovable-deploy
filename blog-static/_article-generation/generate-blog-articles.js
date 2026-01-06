#!/usr/bin/env node
/**
 * Article Generator for ClearCV Blog
 *
 * Generates ChatGPT prompts to create SEO-optimized blog articles
 * Outputs to CSV/JSON for WordPress bulk import
 *
 * Usage:
 * node generate-blog-articles.js --count 30 --lang it --output csv
 */

const fs = require('fs');
const path = require('path');

// Keywords Database (Italian + English)
const KEYWORDS_IT = [
  // High Traffic (1000-10000 searches/month)
  { keyword: "come scrivere un cv perfetto", volume: 8100, difficulty: "medium" },
  { keyword: "cv europeo 2026 compilabile", volume: 5400, difficulty: "low" },
  { keyword: "curriculum vitae esempio", volume: 6600, difficulty: "medium" },
  { keyword: "cv formato europeo", volume: 4500, difficulty: "low" },
  { keyword: "lettera di presentazione esempio", volume: 3600, difficulty: "medium" },
  { keyword: "curriculum vitae gratis", volume: 2900, difficulty: "low" },
  { keyword: "cv europass italiano", volume: 2400, difficulty: "low" },
  { keyword: "modelli cv gratis", volume: 2100, difficulty: "medium" },
  { keyword: "curriculum vitae europeo pdf", volume: 1900, difficulty: "low" },
  { keyword: "come fare un curriculum efficace", volume: 1600, difficulty: "medium" },

  // Medium Traffic (100-1000 searches/month)
  { keyword: "cv con intelligenza artificiale", volume: 880, difficulty: "low" },
  { keyword: "cv ats friendly cosa significa", volume: 720, difficulty: "low" },
  { keyword: "errori da evitare nel cv", volume: 650, difficulty: "medium" },
  { keyword: "cv creativo esempi", volume: 590, difficulty: "medium" },
  { keyword: "cv per laureati senza esperienza", volume: 540, difficulty: "medium" },
  { keyword: "cv formato europass", volume: 490, difficulty: "low" },
  { keyword: "differenza cv e curriculum", volume: 440, difficulty: "low" },
  { keyword: "cv cronologico vs funzionale", volume: 380, difficulty: "low" },
  { keyword: "lunghezza ideale cv", volume: 320, difficulty: "low" },
  { keyword: "cv europass vantaggi svantaggi", volume: 290, difficulty: "low" },

  // Long-Tail (10-100 searches/month, high conversion)
  { keyword: "cv sviluppatore software junior", volume: 140, difficulty: "low" },
  { keyword: "cv marketing digitale esempio", volume: 130, difficulty: "low" },
  { keyword: "cv cambio carriera", volume: 120, difficulty: "low" },
  { keyword: "cv europass vs curriculum normale", volume: 95, difficulty: "low" },
  { keyword: "cv designer grafico portfolio", volume: 88, difficulty: "low" },
  { keyword: "cv project manager esempio", volume: 82, difficulty: "low" },
  { keyword: "cv data scientist template", volume: 76, difficulty: "low" },
  { keyword: "cv receptionist hotel", volume: 68, difficulty: "low" },
  { keyword: "cv infermiere esempio", volume: 61, difficulty: "low" },
  { keyword: "cv commesso senza esperienza", volume: 54, difficulty: "low" },
  { keyword: "cv insegnante scuola primaria", volume: 49, difficulty: "low" },
  { keyword: "cv barista ristorante", volume: 43, difficulty: "low" },
  { keyword: "cv magazziniere logistica", volume: 38, difficulty: "low" },
  { keyword: "cv architetto neolaureato", volume: 32, difficulty: "low" },
  { keyword: "cv elettricista certificato", volume: 27, difficulty: "low" },
];

const KEYWORDS_EN = [
  // High Traffic
  { keyword: "how to write a perfect cv", volume: 12000, difficulty: "high" },
  { keyword: "free cv maker online", volume: 9800, difficulty: "high" },
  { keyword: "resume builder free", volume: 8600, difficulty: "high" },
  { keyword: "professional cv template", volume: 7400, difficulty: "medium" },
  { keyword: "ats friendly resume", volume: 5200, difficulty: "medium" },

  // Medium Traffic
  { keyword: "cv with ai assistance", volume: 920, difficulty: "low" },
  { keyword: "resume mistakes to avoid", volume: 810, difficulty: "medium" },
  { keyword: "cv for career change", volume: 740, difficulty: "medium" },
  { keyword: "creative cv examples", volume: 680, difficulty: "medium" },
  { keyword: "europass cv format", volume: 590, difficulty: "low" },

  // Long-Tail
  { keyword: "software developer cv junior", volume: 180, difficulty: "low" },
  { keyword: "digital marketing cv template", volume: 165, difficulty: "low" },
  { keyword: "data scientist resume example", volume: 142, difficulty: "low" },
  { keyword: "project manager cv sample", volume: 128, difficulty: "low" },
  { keyword: "graphic designer portfolio cv", volume: 115, difficulty: "low" },
];

// Article Templates by Type
const ARTICLE_TYPES = {
  guide: {
    title_pattern: "{keyword} - Guida Completa 2026",
    title_pattern_en: "{keyword} - Complete Guide 2026",
    structure: `
# {title}

{intro_problem}

## Cosa Troverai in Questa Guida

{toc}

## {section1_title}

{section1_content}

## {section2_title}

{section2_content}

## {section3_title}

{section3_content}

## FAQ: {keyword}

{faq}

## Conclusione

{conclusion}

**Pronto a creare il tuo CV perfetto?**
[Inizia Gratis con ClearCV →](https://clearcvapp.com)
`
  },

  howto: {
    title_pattern: "Come {keyword}: Guida Pratica",
    title_pattern_en: "How to {keyword}: Practical Guide",
    structure: `
# {title}

{intro}

## Perché {keyword}?

{why}

## Passo 1: {step1}

{step1_content}

## Passo 2: {step2}

{step2_content}

## Passo 3: {step3}

{step3_content}

## Errori Comuni da Evitare

{mistakes}

## FAQ

{faq}

## Conclusione + Tool Consigliato

{cta}
`
  },

  comparison: {
    title_pattern: "{option1} vs {option2}: Quale Scegliere?",
    title_pattern_en: "{option1} vs {option2}: Which to Choose?",
    structure: `
# {title}

{intro}

## Cos'è {option1}?

{option1_desc}

## Cos'è {option2}?

{option2_desc}

## Confronto Diretto

| Caratteristica | {option1} | {option2} |
|---------------|-----------|-----------|
{comparison_table}

## Quando Usare {option1}

{option1_when}

## Quando Usare {option2}

{option2_when}

## Conclusione

{conclusion}
`
  },

  template: {
    title_pattern: "{keyword} - Template ed Esempi Gratis",
    title_pattern_en: "{keyword} - Free Templates & Examples",
    structure: `
# {title}

{intro}

## Esempio 1: {example1_title}

{example1}

## Esempio 2: {example2_title}

{example2}

## Esempio 3: {example3_title}

{example3}

## Come Personalizzare il Template

{customization}

## Download Template Gratis

{download_cta}
`
  }
};

// ChatGPT Prompt Template
function generateChatGPTPrompt(keyword, lang = 'it', articleType = 'guide') {
  const template = ARTICLE_TYPES[articleType];
  const isItalian = lang === 'it';

  return `Scrivi un articolo SEO-optimized per blog in ${isItalian ? 'italiano' : 'inglese'}:

**Keyword principale**: ${keyword}
**Keywords secondarie**: ${generateSecondarykeywords(keyword)}
**Lunghezza**: 1800-2200 parole
**Tono**: Professionale ma accessibile
**Target**: Job seeker 25-40 anni

**Struttura obbligatoria**:
${template.structure}

**REGOLE IMPORTANTI**:
1. Includi keyword principale in:
   - H1 (titolo)
   - Primo paragrafo (entro 100 parole)
   - Almeno 2 H2
   - URL slug suggerito
2. Densità keyword: 1-2% (naturale, non forzato)
3. Inserisci link interno a clearcvapp.com:
   - Anchor text: "${isItalian ? 'creatore cv gratis' : 'free cv maker'}"
   - Position: Dopo sezione 2 o nella conclusione
4. Scrivi in linguaggio naturale, conversazionale
5. Aggiungi esempi pratici concreti
6. Includi 4-6 FAQ (formato Q&A)
7. CTA finale: "Crea il tuo CV con ClearCV"
8. Meta description (155 caratteri): [genera]

**SEO Checklist**:
- [ ] Keyword in H1
- [ ] Keyword in primo paragrafo
- [ ] Keyword in 2+ H2
- [ ] Link interno a clearcvapp.com
- [ ] 4-6 FAQ
- [ ] CTA chiaro
- [ ] Lista numerata o bullet in ogni sezione
- [ ] Immagini suggerite (descrivi)

**Output Format**:
\`\`\`markdown
# [H1 Titolo]

[Contenuto completo]
\`\`\`

**Meta Description**: [155 caratteri]
**URL Slug**: ${slugify(keyword)}
**Focus Keyphrase**: ${keyword}
`;
}

// Generate secondary keywords
function generateSecondarykeywords(mainKeyword) {
  const keywords = {
    it: ['curriculum vitae', 'cv gratis', 'cv online', 'cv professionale', 'cv europass'],
    en: ['resume', 'cv template', 'free cv', 'professional cv', 'online cv maker']
  };

  return keywords.it.join(', ');
}

// Slugify keyword for URL
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/--+/g, '-')
    .trim();
}

// Generate article data for WordPress import
function generateArticleData(keyword, index, lang = 'it') {
  const today = new Date();
  const publishDate = new Date(today);
  publishDate.setDate(today.getDate() + index); // Autopubblica 1 al giorno

  const articleType = index % 4 === 0 ? 'comparison' :
                     index % 3 === 0 ? 'template' :
                     index % 2 === 0 ? 'howto' : 'guide';

  return {
    title: keyword.keyword,
    slug: slugify(keyword.keyword),
    content: `<!-- GENERATED BY CHATGPT - Prompt below -->\n\n${generateChatGPTPrompt(keyword.keyword, lang, articleType)}`,
    excerpt: `Guida completa: ${keyword.keyword}. Scopri come creare un CV perfetto con esempi, template e consigli pratici.`,
    status: 'scheduled', // WordPress auto-publish
    publish_date: publishDate.toISOString(),
    author: 'ClearCV Blog',
    category: getCategoryFromKeyword(keyword.keyword),
    tags: generateTags(keyword.keyword),
    featured_image: '', // Da generare con Midjourney/DALL-E
    meta_description: `${keyword.keyword} - Guida completa 2026. Template, esempi e consigli per scrivere un CV vincente.`,
    focus_keyphrase: keyword.keyword,
    seo_title: `${keyword.keyword} - Guida 2026 | ClearCV`,
    lang: lang,
    chatgpt_prompt: generateChatGPTPrompt(keyword.keyword, lang, articleType)
  };
}

// Get category from keyword
function getCategoryFromKeyword(keyword) {
  if (keyword.includes('come') || keyword.includes('how')) return 'Guide CV';
  if (keyword.includes('esempio') || keyword.includes('example') || keyword.includes('template')) return 'Template CV';
  if (keyword.includes('vs') || keyword.includes('differenza')) return 'Confronti CV';
  if (keyword.includes('europass') || keyword.includes('europeo')) return 'CV Europeo';
  if (keyword.includes('ats')) return 'CV ATS';
  return 'Guide Generali';
}

// Generate tags
function generateTags(keyword) {
  const baseTags = ['cv gratis', 'curriculum vitae', 'cv maker', 'cv online'];
  const specificTags = keyword.split(' ').filter(word => word.length > 3);
  return [...baseTags, ...specificTags].slice(0, 8).join(', ');
}

// Export to CSV for WordPress import
function exportToCSV(articles, filename) {
  const headers = [
    'title',
    'slug',
    'content',
    'excerpt',
    'status',
    'publish_date',
    'author',
    'category',
    'tags',
    'meta_description',
    'focus_keyphrase',
    'seo_title',
    'lang'
  ];

  let csv = headers.join(',') + '\n';

  articles.forEach(article => {
    const row = headers.map(header => {
      const value = article[header] || '';
      // Escape quotes and wrap in quotes
      return `"${value.toString().replace(/"/g, '""')}"`;
    });
    csv += row.join(',') + '\n';
  });

  fs.writeFileSync(filename, csv, 'utf-8');
  console.log(`✅ CSV exported: ${filename}`);
}

// Export to JSON for WordPress REST API
function exportToJSON(articles, filename) {
  const json = JSON.stringify(articles, null, 2);
  fs.writeFileSync(filename, json, 'utf-8');
  console.log(`✅ JSON exported: ${filename}`);
}

// Export ChatGPT prompts to separate file
function exportPrompts(articles, filename) {
  let content = `# ChatGPT Prompts for ClearCV Blog Articles\n\n`;
  content += `Generated: ${new Date().toISOString()}\n`;
  content += `Total articles: ${articles.length}\n\n`;
  content += `---\n\n`;

  articles.forEach((article, index) => {
    content += `## Article ${index + 1}: ${article.title}\n\n`;
    content += `**Category**: ${article.category}\n`;
    content += `**Publish Date**: ${article.publish_date}\n`;
    content += `**Lang**: ${article.lang}\n\n`;
    content += `### Prompt:\n\n`;
    content += '```\n';
    content += article.chatgpt_prompt;
    content += '\n```\n\n';
    content += `---\n\n`;
  });

  fs.writeFileSync(filename, content, 'utf-8');
  console.log(`✅ Prompts exported: ${filename}`);
}

// Main execution
function main() {
  const args = process.argv.slice(2);
  const count = parseInt(args.find(arg => arg.startsWith('--count='))?.split('=')[1]) || 30;
  const lang = args.find(arg => arg.startsWith('--lang='))?.split('=')[1] || 'it';
  const format = args.find(arg => arg.startsWith('--output='))?.split('=')[1] || 'both';

  console.log(`🚀 Generating ${count} articles in ${lang.toUpperCase()}...\n`);

  // Select keywords
  const keywords = lang === 'it' ? KEYWORDS_IT : KEYWORDS_EN;
  const selectedKeywords = keywords.slice(0, count);

  // Generate articles
  const articles = selectedKeywords.map((keyword, index) =>
    generateArticleData(keyword, index, lang)
  );

  // Create output directory
  const outputDir = path.join(__dirname, '..', 'blog-content');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Export
  const timestamp = new Date().toISOString().split('T')[0];
  const baseFilename = `clearcv-blog-${lang}-${timestamp}`;

  if (format === 'csv' || format === 'both') {
    exportToCSV(articles, path.join(outputDir, `${baseFilename}.csv`));
  }

  if (format === 'json' || format === 'both') {
    exportToJSON(articles, path.join(outputDir, `${baseFilename}.json`));
  }

  // Always export prompts
  exportPrompts(articles, path.join(outputDir, `${baseFilename}-prompts.md`));

  console.log(`\n✅ Generated ${articles.length} articles`);
  console.log(`📁 Output directory: ${outputDir}`);
  console.log(`\n📝 Next Steps:`);
  console.log(`1. Copy prompts from ${baseFilename}-prompts.md`);
  console.log(`2. Paste each prompt to ChatGPT (or use API)`);
  console.log(`3. Copy markdown output back to CSV/JSON`);
  console.log(`4. Import to WordPress with WP All Import plugin`);
  console.log(`5. Schedule auto-publish (1/day)`);
}

// Run
if (require.main === module) {
  main();
}

module.exports = { generateChatGPTPrompt, generateArticleData, slugify };
