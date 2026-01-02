# Patches Directory

Questa directory contiene fix urgenti applicati via wrapper senza modificare il codice Lovable.

## File

- `css-overrides.css` - Override CSS per fix UI urgenti
- `js-patches.js` - Patch JavaScript per fix runtime
- `api-wrappers.js` - Wrapper per fix API/endpoint

## Quando Usare

✅ **Usa patches per**:
- Bug critici in produzione
- Fix CSS/UI minori
- Hotfix che non possono aspettare update Lovable
- Workaround temporanei

❌ **NON usare patches per**:
- Nuove feature
- Refactoring architetturale
- Modifiche complesse multi-componente

## Come Applicare Patch

1. Crea/modifica file in questa directory
2. Modifica `worker.js` per iniettare patch
3. Test con `wrangler dev`
4. Deploy con `wrangler deploy`
5. Purge cache Cloudflare

## Note

- Documenta ogni patch con commenti
- Annota per integrazione in prossimo update Lovable
- Rimuovi patch quando integrate in Lovable
