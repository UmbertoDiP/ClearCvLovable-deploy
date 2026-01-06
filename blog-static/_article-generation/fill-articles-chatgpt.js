#!/usr/bin/env node
/**
 * Auto-fill articles with ChatGPT API
 *
 * Reads prompts from JSON, calls ChatGPT API, updates content
 *
 * Requirements:
 * npm install openai dotenv
 *
 * Setup:
 * 1. Create .env file:
 *    OPENAI_API_KEY=sk-...
 *
 * Usage:
 * node fill-articles-chatgpt.js --input blog-content/clearcv-blog-it-2026-01-03.json
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Rate limiting
const RATE_LIMIT_MS = 2000; // 2 seconds between requests
const MAX_RETRIES = 3;

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function callChatGPT(prompt, retries = 0) {
  try {
    console.log('  📡 Calling ChatGPT API...');

    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview', // or gpt-3.5-turbo for cheaper
      messages: [
        {
          role: 'system',
          content: 'You are an expert SEO content writer specializing in CV/resume guides. Write in a natural, professional yet accessible tone. Follow all instructions precisely.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 3000
    });

    const content = completion.choices[0].message.content;
    const usage = completion.usage;

    console.log(`  ✅ Generated ${usage.total_tokens} tokens (${usage.completion_tokens} output)`);

    return content;

  } catch (error) {
    if (retries < MAX_RETRIES) {
      console.log(`  ⚠️  Error: ${error.message}. Retrying (${retries + 1}/${MAX_RETRIES})...`);
      await sleep(5000);
      return callChatGPT(prompt, retries + 1);
    }
    throw error;
  }
}

async function fillArticles(inputFile) {
  console.log(`\n🚀 Starting ChatGPT content generation\n`);
  console.log(`📁 Input: ${inputFile}\n`);

  // Read JSON
  const articles = JSON.parse(fs.readFileSync(inputFile, 'utf-8'));

  console.log(`📊 Total articles: ${articles.length}\n`);

  let totalCost = 0;
  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < articles.length; i++) {
    const article = articles[i];
    console.log(`\n[${i + 1}/${articles.length}] Processing: ${article.title}`);

    try {
      // Call ChatGPT
      const content = await callChatGPT(article.chatgpt_prompt);

      // Update article content
      articles[i].content = content;

      // Extract meta description from ChatGPT output
      const metaMatch = content.match(/\*\*Meta Description\*\*:\s*(.+)/);
      if (metaMatch) {
        articles[i].meta_description = metaMatch[1].trim();
      }

      successCount++;

      // Estimate cost (rough)
      const inputTokens = article.chatgpt_prompt.length / 4;
      const outputTokens = content.length / 4;
      const cost = (inputTokens * 0.00001) + (outputTokens * 0.00003);
      totalCost += cost;

      console.log(`  💰 Estimated cost: $${cost.toFixed(4)}`);

      // Rate limiting
      await sleep(RATE_LIMIT_MS);

    } catch (error) {
      console.error(`  ❌ Error: ${error.message}`);
      errorCount++;
      // Keep original content (will be placeholder)
    }
  }

  // Save updated JSON
  const outputFile = inputFile.replace('.json', '-filled.json');
  fs.writeFileSync(outputFile, JSON.stringify(articles, null, 2), 'utf-8');

  // Also save as CSV
  const csvFile = outputFile.replace('.json', '.csv');
  exportToCSV(articles, csvFile);

  console.log(`\n\n✅ Generation Complete!\n`);
  console.log(`📊 Statistics:`);
  console.log(`   Success: ${successCount}`);
  console.log(`   Errors: ${errorCount}`);
  console.log(`   Total cost: $${totalCost.toFixed(2)}\n`);
  console.log(`📁 Output files:`);
  console.log(`   JSON: ${outputFile}`);
  console.log(`   CSV: ${csvFile}\n`);
}

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
      return `"${value.toString().replace(/"/g, '""')}"`;
    });
    csv += row.join(',') + '\n';
  });

  fs.writeFileSync(filename, csv, 'utf-8');
  console.log(`   CSV: ${filename}`);
}

// Main
function main() {
  const args = process.argv.slice(2);
  const inputFile = args.find(arg => arg.startsWith('--input='))?.split('=')[1];

  if (!inputFile) {
    console.error('❌ Error: --input parameter required');
    console.log('\nUsage:');
    console.log('  node fill-articles-chatgpt.js --input blog-content/clearcv-blog-it-2026-01-03.json');
    process.exit(1);
  }

  if (!fs.existsSync(inputFile)) {
    console.error(`❌ Error: File not found: ${inputFile}`);
    process.exit(1);
  }

  if (!process.env.OPENAI_API_KEY) {
    console.error('❌ Error: OPENAI_API_KEY not found in .env file');
    console.log('\nCreate a .env file with:');
    console.log('  OPENAI_API_KEY=sk-...');
    process.exit(1);
  }

  fillArticles(inputFile).catch(error => {
    console.error(`\n❌ Fatal error: ${error.message}`);
    process.exit(1);
  });
}

if (require.main === module) {
  main();
}
