#!/usr/bin/env python3
"""
CV Data Extractor
Estrae tutti i dati testuali e strutturali da CV HTML e genera JSON pulito
"""
import json
import re
from pathlib import Path
from bs4 import BeautifulSoup

def clean_text(text):
    """Pulisce il testo rimuovendo spazi multipli e newline"""
    if not text:
        return ""
    return re.sub(r'\s+', ' ', text.strip())

def extract_header(soup):
    """Estrae dati header (nome, titolo, foto)"""
    header = soup.find('header', class_='main-header')
    if not header:
        return {}

    photo_container = header.find('div', class_='header-photo-container')
    photo_url = ""
    if photo_container:
        img = photo_container.find('img')
        if img and 'src' in img.attrs:
            photo_url = img['src']

    header_text = header.find('div', class_='header-text')
    name = ""
    title = ""
    if header_text:
        h1 = header_text.find('h1')
        h2 = header_text.find('h2')
        if h1:
            name = clean_text(h1.get_text())
        if h2:
            title = clean_text(h2.get_text())

    return {
        "name": name,
        "title": title,
        "photo_url": photo_url
    }

def extract_contacts(soup):
    """Estrae dati contatti"""
    contacts = []
    contact_section = soup.find('section', class_='contact-section')
    if not contact_section:
        return contacts

    ul = contact_section.find('ul', id='contacts-list')
    if not ul:
        return contacts

    for li in ul.find_all('li'):
        # Cerca anchor tag per link
        a_tag = li.find('a')
        if a_tag:
            label = clean_text(a_tag.get_text())
            value = a_tag.get('href', '')
            contacts.append({
                "type": "link",
                "label": label,
                "value": value
            })
        else:
            # Testo semplice (es. location, P.IVA)
            text = clean_text(li.get_text())
            if text:
                contacts.append({
                    "type": "text",
                    "label": text,
                    "value": text
                })

    return contacts

def extract_skills(soup):
    """Estrae competenze tecniche"""
    skills = []
    skills_section = soup.find('section', class_='skills-section')
    if not skills_section:
        return skills

    skill_categories = skills_section.find_all('div', class_='skill-category')
    for category in skill_categories:
        h4 = category.find('h4')
        category_name = clean_text(h4.get_text()) if h4 else "Uncategorized"

        tags = []
        skills_tags_div = category.find('div', class_='skills-tags')
        if skills_tags_div:
            for skill_tag in skills_tags_div.find_all('span', class_='skill-tag'):
                tag_text = clean_text(skill_tag.get_text())
                if tag_text:
                    tags.append(tag_text)

        if tags:
            skills.append({
                "category": category_name,
                "tags": tags
            })

    return skills

def extract_experience(soup):
    """Estrae esperienze lavorative"""
    experiences = []
    experience_sections = soup.find_all('section', class_='experience-section')

    for section in experience_sections:
        items = section.find_all('div', class_='experience-item')
        for item in items:
            # Job title - cerca span.job-title
            job_title_tag = item.find('span', class_='job-title')
            job_title = clean_text(job_title_tag.get_text()) if job_title_tag else ""

            # Dates - cerca span.dates
            dates_tag = item.find('span', class_='dates')
            dates = clean_text(dates_tag.get_text()) if dates_tag else ""

            # Company - cerca span.company-name-inline
            company_tag = item.find('span', class_='company-name-inline')
            company = clean_text(company_tag.get_text()) if company_tag else ""

            # Description - cerca ul.achievements-list
            achievements_list = item.find('ul', class_='achievements-list')
            description = ""
            if achievements_list:
                achievements = []
                for li in achievements_list.find_all('li'):
                    achievements.append(clean_text(li.get_text()))
                description = " | ".join(achievements)

            experiences.append({
                "job_title": job_title,
                "company": company,
                "dates": dates,
                "description": description
            })

    return experiences

def extract_education(soup):
    """Estrae formazione"""
    education = []
    # Cerca education items in tutto il documento
    items = soup.find_all('div', class_='education-item')

    for item in items:
        # Qualification - cerca span.qualification
        qualification_tag = item.find('span', class_='qualification')
        qualification = clean_text(qualification_tag.get_text()) if qualification_tag else ""

        # Dates - cerca span.dates
        dates_tag = item.find('span', class_='dates')
        dates = clean_text(dates_tag.get_text()) if dates_tag else ""

        # Institution - cerca p.institution
        institution_tag = item.find('p', class_='institution')
        institution = clean_text(institution_tag.get_text()) if institution_tag else ""

        # Details - cerca p.details-text
        details_tag = item.find('p', class_='details-text')
        details = clean_text(details_tag.get_text()) if details_tag else ""

        # Combina institution e details
        full_details = institution
        if details:
            full_details = f"{institution} - {details}" if institution else details

        education.append({
            "qualification": qualification,
            "dates": dates,
            "details": full_details
        })

    return education

def extract_profile(soup):
    """Estrae profilo/sommario"""
    profile_section = soup.find('section', class_='profile-section')
    if not profile_section:
        return ""

    about_desc = profile_section.find('div', class_='about-description')
    if about_desc:
        return clean_text(about_desc.get_text())

    return ""

def extract_certifications(soup):
    """Estrae certificazioni"""
    certifications = []
    cert_section = soup.find('section', {'data-section-id': 'certifications'})
    if not cert_section:
        return certifications

    cert_items = cert_section.find_all('div', class_='certification-item')
    for item in cert_items:
        header = item.find('div', class_='certification-header')
        if not header:
            continue

        h4 = header.find('h4')
        date_tag = item.find('div', class_='certification-date')
        issuer_tag = item.find('div', class_='certification-issuer')
        credential_tag = item.find('div', class_='certification-credential')

        name = clean_text(h4.get_text()) if h4 else ""
        date = clean_text(date_tag.get_text()) if date_tag else ""
        issuer = clean_text(issuer_tag.get_text()) if issuer_tag else ""
        credential = clean_text(credential_tag.get_text()) if credential_tag else ""

        certifications.append({
            "name": name,
            "date": date,
            "issuer": issuer,
            "credential": credential
        })

    return certifications

def extract_languages(soup):
    """Estrae lingue"""
    languages = []
    lang_section = soup.find('section', {'data-section-id': 'languages'})
    if not lang_section:
        return languages

    lang_items = lang_section.find_all('div', class_='language-item')
    for item in lang_items:
        name_tag = item.find('span', class_='language-name')
        level_tag = item.find('span', class_='language-level')

        name = clean_text(name_tag.get_text()) if name_tag else ""
        level = clean_text(level_tag.get_text()) if level_tag else ""

        languages.append({
            "name": name,
            "level": level
        })

    return languages

def extract_footer(soup):
    """Estrae footer disclaimer"""
    footer = soup.find('div', class_='page-footer')
    if not footer:
        return ""

    footer_left = footer.find('div', class_='footer-left')
    if footer_left:
        return clean_text(footer_left.get_text())

    return ""

def main():
    """Main extraction logic"""
    cv_path = Path(__file__).parent.parent / "backup" / "CV_LAVORO.html"

    print(f"Reading CV from: {cv_path}")
    with open(cv_path, 'r', encoding='utf-8') as f:
        html_content = f.read()

    print("Parsing HTML with BeautifulSoup...")
    soup = BeautifulSoup(html_content, 'html.parser')

    print("Extracting structured data...")
    cv_data = {
        "header": extract_header(soup),
        "profile": extract_profile(soup),
        "contacts": extract_contacts(soup),
        "skills": extract_skills(soup),
        "experience": extract_experience(soup),
        "education": extract_education(soup),
        "certifications": extract_certifications(soup),
        "languages": extract_languages(soup),
        "footer_disclaimer": extract_footer(soup)
    }

    output_path = Path(__file__).parent / "cv_data.json"
    print(f"Writing JSON to: {output_path}")
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(cv_data, f, ensure_ascii=False, indent=2)

    print("\n✅ Extraction completed successfully!")
    print(f"📄 Output: {output_path}")

    # Print statistics
    print("\n📊 Statistics:")
    print(f"  - Name: {cv_data['header']['name']}")
    print(f"  - Title: {cv_data['header']['title']}")
    print(f"  - Contacts: {len(cv_data['contacts'])}")
    print(f"  - Skills Categories: {len(cv_data['skills'])}")
    print(f"  - Experiences: {len(cv_data['experience'])}")
    print(f"  - Education: {len(cv_data['education'])}")
    print(f"  - Certifications: {len(cv_data['certifications'])}")
    print(f"  - Languages: {len(cv_data['languages'])}")

if __name__ == "__main__":
    main()
