#!/bin/bash
# Deployment Wrapper per Lovable Export
# NON modifica il codice interno di Lovable, wrappa solo il deployment

set -e

echo "======================================"
echo "  CLEARCV DEPLOYMENT WRAPPER"
echo "======================================"
echo ""

# Step 1: Build progetto Lovable (unmodified)
echo "Step 1/4: Building Lovable project..."
cd clear-cv-integration
npm run build
cd ..

# Step 2: Merge sitemap (wrapper esterno)
echo ""
echo "Step 2/4: Merging sitemaps (wrapper)..."
python3 << 'EOF'
import xml.etree.ElementTree as ET

NS = {'ns': 'http://www.sitemaps.org/schemas/sitemap/0.9',
      'xhtml': 'http://www.w3.org/1999/xhtml'}

ET.register_namespace('', 'http://www.sitemaps.org/schemas/sitemap/0.9')
ET.register_namespace('xhtml', 'http://www.w3.org/1999/xhtml')

# Read app sitemap from Lovable dist
app_tree = ET.parse('clear-cv-integration/dist/sitemap.xml')
app_root = app_tree.getroot()

# Read blog sitemap from static blog
blog_tree = ET.parse('blog-static/sitemap.xml')
blog_root = blog_tree.getroot()

# Merge
merged_root = app_root
for url in blog_root.findall('ns:url', NS):
    merged_root.append(url)

# Write back to Lovable dist
merged_tree = ET.ElementTree(merged_root)
ET.indent(merged_tree, space='  ')
merged_tree.write('clear-cv-integration/dist/sitemap.xml',
                  encoding='UTF-8',
                  xml_declaration=True)

url_count = len(merged_root.findall('ns:url', NS))
print(f"✓ Merged sitemap created: {url_count} URLs")
EOF

# Step 3: Copy blog-static to dist
echo ""
echo "Step 3/4: Copying blog-static to dist..."
cp -r blog-static clear-cv-integration/dist/

# Step 4: Deploy to Cloudflare
echo ""
echo "Step 4/4: Deploying to Cloudflare..."
cd clear-cv-integration/dist
wrangler pages deploy . --project-name=clearcv
cd ../..

echo ""
echo "======================================"
echo "  ✓ DEPLOYMENT COMPLETED"
echo "======================================"
echo ""
echo "Verify sitemap:"
echo "  curl -s https://clearcvapp.com/sitemap.xml | grep -c '<url>'"
echo ""
