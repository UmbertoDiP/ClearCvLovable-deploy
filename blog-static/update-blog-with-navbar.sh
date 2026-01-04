#!/bin/bash
# Update existing blog HTML files with new navbar structure
# This replaces old header with new navbar from templates

echo "🔄 Updating blog HTML files with new navbar..."

# Function to update HTML file
update_html() {
    local file="$1"
    local template_type="$2" # "index" or "article"

    if [ ! -f "$file" ]; then
        echo "⚠️  File not found: $file"
        return
    fi

    echo "📝 Updating: $file"

    # Read the template to extract navbar section
    local navbar_start='<!-- Theme and Language Management Scripts -->'
    local navbar_end='<div class="breadcrumbs">'

    # For article template
    if [ "$template_type" = "article" ]; then
        # Extract navbar section from article template
        local navbar_content=$(sed -n "/$navbar_start/,/$navbar_end/p" _templates/article.html | sed '$d')

        # Replace in HTML file (from <!-- ClearCV Design System --> to <header>)
        awk -v navbar="$navbar_content" '
            BEGIN { in_replace=0 }
            /<!-- ClearCV Design System -->/ { in_replace=1 }
            in_replace==1 && /<header>/ {
                print navbar
                in_replace=0
            }
            in_replace==0 { print }
        ' "$file" > "$file.tmp" && mv "$file.tmp" "$file"
    else
        # For index template
        local navbar_content=$(sed -n "/$navbar_start/,/$navbar_end/p" _templates/index.html | sed '$d')

        # Replace in HTML file
        awk -v navbar="$navbar_content" '
            BEGIN { in_replace=0 }
            /<!-- ClearCV Design System -->/ { in_replace=1 }
            in_replace==1 && /<header>/ {
                print navbar
                in_replace=0
            }
            in_replace==0 { print }
        ' "$file" > "$file.tmp" && mv "$file.tmp" "$file"
    fi

    echo "✅ Updated: $file"
}

# Update root index.html
if [ -f "index.html" ]; then
    update_html "index.html" "index"
fi

# Update all language-specific blog pages
for lang in it en es fr de pt nl pl ro el cs hu sv da fi no sk hr sl bg lt lv et; do
    # Update language blog index
    if [ -f "$lang/blog/index.html" ]; then
        update_html "$lang/blog/index.html" "index"
    fi

    # Update all articles in language
    if [ -d "$lang/blog" ]; then
        find "$lang/blog" -name "*.html" -not -name "index.html" | while read article; do
            update_html "$article" "article"
        done
    fi
done

echo ""
echo "✅ Blog HTML update completed!"
echo ""
echo "📁 Files updated:"
echo "  - index.html (root)"
echo "  - */blog/index.html (language indexes)"
echo "  - */blog/*.html (all articles)"
echo ""
echo "🎨 Changes applied:"
echo "  - Added navbar from main app"
echo "  - Added theme-manager.js script"
echo "  - Added language-manager.js script"
echo "  - Functional language selector (23 languages)"
echo "  - Functional theme toggle (light/dark mode)"
echo "  - Shared localStorage with main app"
echo ""
echo "🚀 Next step: Deploy to Cloudflare Pages"
echo "   cd blog-static && npx wrangler pages deploy ."
