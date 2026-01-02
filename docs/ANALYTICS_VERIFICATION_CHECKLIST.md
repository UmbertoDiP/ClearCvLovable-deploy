# Analytics Verification Checklist - ClearCV

**Purpose**: Quick verification that Google Analytics tracking is working correctly after deployment.

**Timeline**: Check 10-15 minutes after deploy (cache propagation time)

---

## ✅ Step-by-Step Verification

### Step 1: Browser Console Check (2 minutes)

1. Open https://clearcvapp.com in Chrome
2. Open DevTools (Press F12 or Right-click → Inspect)
3. Go to Console tab
4. Type: `typeof gtag`
5. Press Enter

**Expected Result**: `"function"`
**If you see**: `"undefined"` → Analytics script not loaded, check CSP headers

**Additional Check**:
```javascript
// Type this in console:
dataLayer

// Expected: Array with gtag events
// Example: [Object, Object, Object]
```

---

### Step 2: Network Tab Check (2 minutes)

1. In DevTools, go to Network tab
2. Filter by "gtag" or "google-analytics"
3. Refresh the page (Ctrl+R)

**Expected Result**:
- Request to `https://www.googletagmanager.com/gtag/js?id=G-VTLG85NBTE` (Status: 200)
- Request to `https://www.google-analytics.com/g/collect` (Status: 200)

**If missing**: CSP blocking or script not loaded correctly

---

### Step 3: View Source Check (1 minute)

1. Right-click on page → View Page Source
2. Press Ctrl+F and search for: `G-VTLG85NBTE`

**Expected Result**: Should find 2 occurrences
- Line ~601: `<script async src="https://www.googletagmanager.com/gtag/js?id=G-VTLG85NBTE">`
- Line ~606: `gtag('config', 'G-VTLG85NBTE'`

**If missing**: Deploy didn't include updated index.html

---

### Step 4: Real-Time Analytics Check (5 minutes after page visit)

1. Open Google Analytics: https://analytics.google.com/analytics/web/#/p468964376/reports/intelligenthome
2. Navigate to: Reports → Real-time
3. Look for "Active users" counter

**Expected Result**:
- Shows "1" (you visiting the site)
- Shows page path "/" or "/index.html"
- Shows location (your country/city)

**If showing 0**:
- Wait 5 more minutes (initial delay normal)
- Clear browser cache and revisit site
- Check browser is not blocking tracking (AdBlock, Privacy Badger, etc.)

---

### Step 5: Event Tracking Check (Optional)

If you configured custom events (performance metrics, PWA installation):

1. In Analytics Real-time view
2. Click on "Events" section
3. Look for custom event names

**Expected Events**:
- `page_view` (automatic)
- Custom events if configured

---

## 🔧 Troubleshooting

### Problem: `typeof gtag` returns "undefined"

**Possible Causes**:
1. CSP headers blocking script
2. Script tag not in HTML
3. Cache serving old version

**Fix**:
```bash
# Check current deployed version
curl -I https://clearcvapp.com

# Re-deploy if needed
npm run deploy

# Wait 5 minutes for cache propagation
```

---

### Problem: Network shows 403/404 for gtag script

**Possible Cause**: CSP blocking Google domains

**Fix**: Verify CSP in index.html includes:
```html
script-src 'self' 'unsafe-inline' ... https://www.googletagmanager.com https://www.google-analytics.com;
connect-src 'self' ... https://www.google-analytics.com https://analytics.google.com https://www.googletagmanager.com;
```

---

### Problem: Real-time shows 0 users

**Possible Causes**:
1. Too early (wait 10-15 minutes after first deploy)
2. Browser blocking tracking (disable AdBlock, Privacy Badger)
3. Incognito mode with tracking protection
4. VPN/Proxy blocking Google Analytics

**Fix**:
- Wait 15 minutes
- Try different browser (Edge, Firefox)
- Disable ad blockers
- Try from mobile device

---

### Problem: Script loads but no data in Real-time

**Possible Cause**: Wrong Measurement ID

**Fix**:
1. Verify ID in script: `G-VTLG85NBTE`
2. Verify same ID in Google Analytics property settings
3. Check Analytics property is for correct website

---

## 📊 Success Criteria

All checks should pass within 15 minutes of deployment:

- [x] `typeof gtag` returns `"function"`
- [x] Network shows 200 OK for gtag.js and collect requests
- [x] View Source shows `G-VTLG85NBTE` in script tags
- [x] Real-time Analytics shows 1+ active user when visiting site
- [x] Page path appears in Real-time view

**If all pass**: ✅ Analytics is working correctly

**If any fail**: Review troubleshooting steps above

---

## 🕐 Timeline Expectations

| Time After Deploy | Expected Status |
|------------------|----------------|
| 0-5 minutes | Script tag in HTML, gtag function available |
| 5-10 minutes | Network requests to Google Analytics succeed |
| 10-15 minutes | Real-time view shows active users |
| 24-48 hours | Reports section shows meaningful data (sessions, pageviews) |
| 1-7 days | Search Console shows indexed pages |
| 7-14 days | Enough data for insights and trends |

---

## 🔗 Quick Links

- **Live Site**: https://clearcvapp.com
- **Analytics Real-time**: https://analytics.google.com/analytics/web/#/p468964376/reports/intelligenthome
- **Analytics Reports**: https://analytics.google.com/analytics/web/#/p468964376/reports/reportinghub
- **Search Console**: https://search.google.com/search-console?resource_id=sc-domain%3Aclearcvapp.com

---

**Last Updated**: 2025-11-24
**Next Check**: Immediately after reading this document
