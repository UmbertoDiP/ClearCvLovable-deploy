#!/bin/bash
# Script per aggiornare HTML esistenti con i nuovi link CSS

echo "🔄 Updating HTML files with new CSS links..."

# Funzione per aggiornare un file HTML
update_html() {
    local file="$1"
    if [ -f "$file" ]; then
        # Backup
        cp "$file" "$file.bak"
        
        # Rimuovi vecchi <style> inline se presenti
        # Aggiungi link CSS se non presenti
        if ! grep -q "assets/blog-styles.css" "$file"; then
            # Trova </head> e inserisci i link CSS prima
            sed -i '/<\/head>/i \    <!-- ClearCV Design System - Main app CSS (design tokens & components) -->\n    <link rel="stylesheet" href="../../assets/blog-styles.css">\n\n    <!-- Blog-specific styles (minimal overrides for blog layout) -->\n    <link rel="stylesheet" href="../../_templates/blog-overrides.css">' "$file"
            echo "  ✅ Updated: $file"
        else
            echo "  ⏭️  Already updated: $file"
        fi
    fi
}

# Aggiorna index.html principale
update_html "index.html"

# Aggiorna tutti gli index.html delle lingue
for lang in it en es fr de; do
    update_html "$lang/blog/index.html"
done

# Aggiorna articolo di esempio
update_html "it/blog/come-scrivere-cv-perfetto.html"

echo ""
echo "✅ HTML files updated!"
echo "📁 Backups saved with .bak extension"
