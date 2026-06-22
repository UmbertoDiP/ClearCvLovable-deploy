# AlignMe Features — Roadmap per ClearCV

Idee assorbite dal progetto AlignCvApp (eliminato). Da integrare in ClearCV come
evoluzione B2B e differenziatore rispetto a tool gratuiti tipo Jobscan.

## Feature 1: CV-Job Matching (B2C)

Aggiunge al flusso esistente (upload CV) la possibilita' di incollare una job description
o URL offerta e ricevere:
- Match score (0-100%) — keyword overlap tra CV e requisiti
- Gap analysis — skills richieste mancanti nel CV
- ATS check — compatibilita' con sistemi di parsing automatico
- Suggerimenti — frasi da aggiungere/modificare per migliorare il match

Stack: Claude Sonnet per semantic matching, Supabase per salvare storico analisi.

## Feature 2: Recruiter Marketplace (B2B — differenziatore chiave)

Job seeker autorizza il proprio CV a essere "adottato" da recruiter.
Il recruiter (pagante):
- Accede al pool di CV autorizzati (filtrabili per skill, seniority, area)
- Puo' anonimizzare (oscurare cognome, citta', contatti)
- Genera una copia del CV con il proprio branding agenzia
- Propone all'azienda cliente direttamente da ClearCV

Monetizzazione recruiter: 29-99 EUR/mese per accesso al pool.

## Business Model

| Piano | Target | Prezzo | Feature |
|-------|--------|--------|---------|
| Free | Job seeker | 0 | Build CV, 3 analisi/mese |
| Pro | Job seeker | 4.99 EUR/mese | Analisi illimitate, ATS, storico |
| Recruiter | Agenzie | 29-99 EUR/mese | Pool CV, anonimizzazione, branding |

Strategia: volume B2C (tanti utenti a poco) + margine B2B (recruiter pagano bene).

## Brand / Dominio

- Dominio pensato: alignme.eu (disponibile al momento della ideazione)
- Alternativa: sezione "Match Jobs" dentro clearcvapp.com
- Slogan IT: "Il CV giusto per il lavoro giusto"
- Slogan EN: "Align your career, land your dream job"

## Stato

- Nessun codice scritto (solo spec da AlignCvApp)
- Autenticazione Supabase gia' presente in clear-cv-integration (riutilizzabile)
- Valutare: integrare in ClearCV o prodotto separato alignme.eu
