# PROMPT ULTRA DEFINITIVO – ESECUZIONE AUTONOMA COMPLETA (Lovable)

## ISTRUZIONE GLOBALE

Continua autonomamente la risoluzione di tutte le attività in carico, senza richiedere ulteriori input dall’utente.

Devi eseguire TUTTI i task elencati, uno alla volta, usando un iteratore sequenziale, procedendo step by step in modo deterministico.

---

## MODALITÀ OPERATIVA OBBLIGATORIA

1. ITERATORE SEQUENZIALE
- Un solo task alla volta
- Vietato saltare, fondere o riordinare i task

2. ESECUZIONE PER STEP
- Ogni task deve essere scomposto in step atomici
- Gli step vanno eseguiti in ordine verificabile

3. AUTONOMIA TOTALE
- Nessuna richiesta di chiarimenti
- Nessuna richiesta di conferme
- Nessuna introduzione di funzionalità non richieste

4. DOCUMENTAZIONE TOKEN-EFFICIENT
- Documentare solo ciò che viene realmente fatto
- Vietato riscrivere requisiti o contesto già noto

5. AUDIT OBBLIGATORIO A FINE DI OGNI TASK
- Stato: DONE | PARTIAL | BLOCKED
- Motivazione tecnica sintetica
- Eventuali limiti non risolvibili in autonomia

6. PERSISTENZA DELLE REGOLE
- Le logiche storiche NON devono mai essere disabilitate
- Le decisioni prese devono restare coerenti nei task successivi

7. CHECKPOINT FINALE
- Al termine di tutti i task, produrre una tabella riepilogativa con:
  - ID task
  - descrizione breve
  - stato
  - note tecniche

---

## ELENCO TASK (ORDINE VINCOLANTE)

### 1. Account Premium (Admin)
Implementare, per utenti amministratore, uno switch nelle developer tools per attivare/disattivare l’account Premium.

---

### 2. Icona Indirizzo
- Icona visibile solo sulla città
- Icona mancante sulla via/indirizzo
- Campo presente nel mock JSON ma NON mappato nella maschera
- Campo NON visibile nell’anteprima del curriculum builder

---

### 3. Switch Admin – Login Mock
Aggiungere un secondo switch admin per:
- simulare stato logged-in
- mostrare dati di login dell’app (NO Google login)
- dati copiabili da dev tools
- testare funzionalità post-login (es. pubblica CV)

---

### 4. Pagina Mock Login
Creare una pagina mock di accesso per:
- visualizzare durante lo sviluppo
- la struttura reale della pagina del CV pubblico

---

### 5. Cover Letter
Nel curriculum builder:
- usare profilo “roberto di puorto senior”
- aggiungere una pagina finale di cover letter

---

### 6. Sistema Download PDF
- Fallback obbligatorio: stampa Google Chrome con istruzioni visibili
- Se tecnicamente possibile:
  - generazione automatica PDF
  - simulazione download
  - salvataggio in cache temporanea
  - cache con svuotamento automatico dopo alcuni giorni
  - download diretto del PDF finale
  - evitare la schermata di stampa

---

### 7. Developer Tools – Log
- Click su log genera errore:
  “Qualcosa è andato storto. Si è verificato un errore imprevisto.”
- Risolvere crash
- Ripristinare visualizzazione log senza reload forzato

---

### 8. Menu Esporta
- Aggiungere bottone PDF dedicato e ben visibile
- Mantenere anche il bottone PDF già esistente

---

### 9. Importa (Esporta / Importa)
- Import resta su “elaborazione in corso”
- Import lento e non completato
- Dati non importati
- Allineare UI e comportamento:
  - supportati SOLO file JSON esportati da ClearCV

---

### 10. Gestione Scroll
- Da landing page, click su “Start Free” apre app in fondo
- A ogni cambio pagina o navigazione:
  - scroll automatico in alto

---

### 11. SISTEMA MULTIPAGINA A4 / PDF – REGRESSIONE CRITICA

- Anteprima app: page break visibile correttamente
- Prima anteprima Chrome: “Pagina 1 di 2”
- Schermata di stampa finale Chrome:
  - seconda pagina NON renderizzata
- Il contenuto della pagina 2 ESISTE ma non viene passato al motore di stampa
- Incoerenza tra:
  - anteprima app
  - anteprima iniziale Chrome
  - rendering finale di stampa

È una REGRESSIONE.

Deve essere ripristinata e MAI disabilitata la logica basata sul:

### PROMPT DEFINITIVO – CURRICULUM PDF

Regole OBBLIGATORIE:
- stabilità layout sopra la linea di fine pagina
- taglio solo delle sezioni che intersecano il limite
- mantenimento colonne
- resize controllato:
  - max 8%
  - font minimo 9pt
- se resize insufficiente → fallback multipagina
- audit interno
- memoria delle decisioni
- comportamento deterministico e ripetibile

Divieti assoluti:
- riordinare sezioni
- cambiare gerarchie visive
- adattare contenuto “per farlo stare”
- semplificare layout

---

### 12. TEMPLATE ELEGANTE – EFFETTO CARD

Nel template elegante già presente:
- dove sono presenti frecce sui titoli di sezione
- applicare anche un effetto CARD

Vincoli:
- usare SOLO stili esistenti
- riferimento diretto a:
  - .experience-item
  - .education-item
- valorizzare:
  - background-color: #f8fafc
  - border-left: 3px solid #bfdbfe
  - border-radius: 4px
- freccia (::before) resta parte integrante della card
- ombre leggere SOLO se coerenti con:
  - --shadow-sm
  - --shadow-md

Applicare a:
- Esperienze Professionali
- Formazione
- Corsi / Certificazioni
- sezioni analoghe compatibili

VIETATO:
- redesign
- cambiare struttura
- cambiare ordine o gerarchie

---

### 13. INTERESSI – CHIPS GIALLE

La sezione Interessi deve usare ESATTAMENTE le chips già definite:

Classe obbligatoria:
.interest-tag

Caratteristiche:
- background-color: #fef3c7
- border: #fcd34d
- color: #92400e

Categorie:
- Tecnologia (Open Source, ML, Blockchain, IoT)
- Sport & Benessere (Corsa, Palestra, Yoga, Trekking)
- Cultura (Fotografia, Lettura, ecc.)

Vincoli:
- leggibili in PDF
- non rompere multipagina
- no overflow

---

## OBIETTIVO FINALE

Portare l’app a uno stato PRODUCTION-READY con:
- esecuzione autonoma
- auditabile
- deterministica
- PDF multipagina stabile
- UI elegante migliorata senza regressioni
- piena coerenza con CSS e layout esistenti

Lovable deve SOLO ESEGUIRE.
