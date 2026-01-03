#!/bin/bash
# Post-build script to fix robots.txt (remove Disallow /editor/*)
# Run this after: npm run build

DIST_DIR="clear-cv-integration/dist"
ROBOTS_FILE="$DIST_DIR/robots.txt"

if [ -f "$ROBOTS_FILE" ]; then
  echo "Fixing robots.txt: removing 'Disallow: /editor/*'"

  # Remove the line "Disallow: /editor/*"
  sed -i '/^Disallow: \/editor\/\*/d' "$ROBOTS_FILE"

  echo "✅ robots.txt fixed"
else
  echo "⚠️  robots.txt not found in $DIST_DIR"
fi
