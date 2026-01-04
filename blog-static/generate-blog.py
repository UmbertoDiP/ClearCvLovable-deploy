#!/usr/bin/env python3
"""
Simple blog generator from templates
"""
import os
from pathlib import Path

# Read templates
template_dir = Path("_templates")
index_template = (template_dir / "index.html").read_text(encoding="utf-8")

# Italian blog index
it_data = {
    "lang": "it",
    "title": "Blog ClearCV - Guide CV e Curriculum Vitae",
    "description": "ClearCV Blog - Guide, consigli e template per creare il CV perfetto. Articoli su curriculum vitae, lettere di presentazione e ricerca lavoro.",
    "keywords": "cv, curriculum vitae, resume, guida cv, template cv, come scrivere cv",
    "canonical": "https://clearcvapp.com/it/blog/",
    "articlesGrid": """
        <div class="article-card">
            <div class="article-image">📝</div>
            <div class="article-content">
                <div class="article-meta">📅 3 Gennaio 2026 • ⏱️ 8 min lettura</div>
                <h2 class="article-title"><a href="/it/blog/come-scrivere-cv-perfetto">Come Scrivere un CV Perfetto - Guida Completa</a></h2>
                <p class="article-excerpt">Scopri i segreti per creare un curriculum vitae efficace che catturi l'attenzione dei recruiter. Guida completa con esempi pratici.</p>
                <div class="article-tags">
                    <span class="tag">Guida</span>
                    <span class="tag">CV</span>
                </div>
            </div>
        </div>
    """
}

# Generate Italian index
output = index_template
for key, value in it_data.items():
    output = output.replace(f"{{{{{key}}}}}", value)

# Write output
it_blog = Path("it/blog")
it_blog.mkdir(parents=True, exist_ok=True)
(it_blog / "index.html").write_text(output, encoding="utf-8")

print("Generated: it/blog/index.html")
