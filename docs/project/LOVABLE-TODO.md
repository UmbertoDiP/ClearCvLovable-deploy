# TODO Modifiche per Lovable (Prossimo Update)

**Data blocco piano**: 2026-01-02
**Prossimo update disponibile**: 2026-02-02 (tra 1 mese)

---

## Modifiche da Richiedere a Lovable

### 1. Favicon Personalizzato
- [ ] Sostituire favicon Lovable con il ClearCV favicon originale
- [ ] File da usare: `patches/favicon.svg` (già creato nel wrapper)
- [ ] Attualmente wrappato via worker.js, ma sarebbe meglio nativo in Lovable

### 2. Google Analytics Integration
- [ ] Integrare Google Analytics direttamente nell'app Lovable
- [ ] Measurement ID: `G-VTLG85NBTE`
- [ ] Attualmente iniettato via worker.js, ma sarebbe meglio nativo

### 3. Meta Tags SEO (se necessario miglioramento)
- [ ] Verificare meta tags esistenti dopo analisi SEO
- [ ] Eventuali ottimizzazioni keywords per prima pagina Google

---

## Note

- Tutte le modifiche sopra sono attualmente gestite dal **wrapper** (worker.js)
- Il wrapper ci permette di avere queste features in produzione SUBITO
- Quando Lovable si sbloccherà, possiamo richiedere integrazione native
- Vantaggio: eliminare logica wrapper e avere tutto nativo in clear-cv-integration

---

**Last Updated**: 2026-01-02
**Version**: Lovable lovable-v1.0.0, Deploy deploy-v1.0.1
