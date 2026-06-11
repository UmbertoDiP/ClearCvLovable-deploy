# Recupera Credenziali Supabase ClearCV

**Data**: 2026-05-12
**Account**: dipuortoumberto@gmail.com
**Progetto trovato**: C:\Users\umber\Documents\MyProjects\ClearCvLovable\clear-cv-integration

---

## Stato Attuale

### ✅ Già Identificato

- **Supabase URL**: `https://plbdiehcqwaakrbksclh.supabase.co`
- **Project ID**: `plbdiehcqwaakrbksclh`
- **Anon Key** (public): `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYmRpZWhjcXdhYWtyYmtzY2xoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcxMTcyMjAsImV4cCI6MjA4MjY5MzIyMH0.pBrcF7pX6NuVxH-psQkupLRyXJP3xs0zguNmGVwy4mk`

### ❌ Mancante (NECESSARIO)

- **SERVICE_ROLE Key**: Serve per export utenti (ha permessi admin completi)

---

## Come Recuperare SERVICE_ROLE Key

### Opzione 1: Supabase Dashboard (Consigliato)

1. **Login Supabase**:
   ```
   URL: https://supabase.com/dashboard
   Account: dipuortoumberto@gmail.com
   ```

2. **Seleziona Progetto ClearCV**:
   - Dashboard → Projects
   - Cerca progetto con ID: `plbdiehcqwaakrbksclh`
   - Oppure cerca per nome: "ClearCV" o "clear-cv-integration"

3. **Vai alle API Settings**:
   - Project → Settings (⚙️) → API
   - Oppure: https://supabase.com/dashboard/project/plbdiehcqwaakrbksclh/settings/api

4. **Copia SERVICE_ROLE Key**:
   - Scroll fino a sezione "Project API keys"
   - Trova **service_role key** (secret)
   - Click su "Reveal" o "Copy" per ottenere la key completa
   - Formato atteso: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey...` (molto lunga, ~200+ caratteri)

5. **⚠️ IMPORTANTE**:
   - La service_role key è SECRET (non condividere)
   - Ha permessi ADMIN completi
   - Diversa dalla anon key (che è pubblica)

### Opzione 2: Lovable Cloud Dashboard

Se il progetto è ancora gestito da Lovable:

1. **Login Lovable**:
   ```
   URL: https://lovable.dev
   Account: dipuortoumberto@gmail.com
   ```

2. **Apri Progetto ClearCV**:
   - Dashboard → My Projects → ClearCV

3. **Backend Settings**:
   - Settings → Backend → Supabase
   - Oppure: Settings → API
   - Cerca "service_role" key

---

## Inserimento Credenziali

Una volta ottenuta la SERVICE_ROLE key:

### Step 1: Aggiorna .env

```powershell
cd C:\Users\umber\Documents\MyProjects\ClearCvLovable

# Edit .env file
notepad .env
```

Inserisci la SERVICE_ROLE key nel file `.env`:

```env
# Supabase ClearCV (per export utenti)
SUPABASE_URL=https://plbdiehcqwaakrbksclh.supabase.co
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey...   ← INSERISCI QUI
```

### Step 2: Test Connessione (Optional)

Per verificare che la key funzioni:

```powershell
.\export-clearcv-users.ps1
```

Se vedi "SUCCESS: Connected to Supabase" → OK
Se vedi "ERROR: Authentication failed" → Key errata o scaduta

---

## Next Steps (dopo inserimento key)

1. **Export Utenti Supabase**:
   ```powershell
   .\export-clearcv-users.ps1
   ```
   Output atteso:
   - `export-YYYYMMDD-HHMMSS/users.json`
   - `export-YYYYMMDD-HHMMSS/premium-users.json`
   - Verifica che ci sia almeno 1 premium user

2. **Setup Database Render** (se non già fatto):
   - Aggiungi `DATABASE_URL` in `.env`
   - Ottieni da: Render Dashboard → PostgreSQL → api-service-db → Internal Database URL

3. **Migrazione Completa**:
   ```powershell
   .\start-migration.ps1
   ```
   Durata: 15-30 min
   Migra tutti gli utenti + premium users da Supabase → Render PostgreSQL

---

## Troubleshooting

### "Authentication failed" dopo inserimento key

**Causa**: Key errata o copiata male

**Fix**:
- Verifica non ci siano spazi prima/dopo la key
- Verifica key completa (lunghezza ~200+ char)
- Riprova a copiarla da Supabase Dashboard

### "Project not found"

**Causa**: URL Supabase errato o progetto eliminato

**Fix**:
- Verifica URL: `https://plbdiehcqwaakrbksclh.supabase.co`
- Controlla su Supabase Dashboard se progetto esiste ancora
- Verifica account corretto (dipuortoumberto@gmail.com)

### "Forbidden: service_role required"

**Causa**: Stai usando anon key invece di service_role key

**Fix**:
- Assicurati di copiare la **service_role** key (secret), NON la anon key (public)
- La service_role key inizia con `eyJhbGci...` ed è molto più lunga

---

## File Preparati

Tutti gli script sono pronti in `ClearCvLovable/`:

- ✅ `export-clearcv-users.ps1` - Export automatico utenti
- ✅ `render-database-schema.sql` - Schema PostgreSQL completo
- ✅ `start-migration.ps1` - Orchestratore migrazione 9 fasi

Serve solo la SERVICE_ROLE key per partire!

---

**STATUS**: ⏳ Waiting for SERVICE_ROLE key

**ETA dopo key**: Export + Migrazione completa in 20-40 min
