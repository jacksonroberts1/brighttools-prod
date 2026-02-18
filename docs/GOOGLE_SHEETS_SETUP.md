/**
 * GOOGLE SHEETS CONTACT FORM SETUP
 * 
 * This guide walks you through setting up Google Sheets to receive form submissions.
 * No external services needed — everything is within Google!
 */

/**
 * ═══════════════════════════════════════════════════════════════
 * STEP 1: CREATE GOOGLE SHEET (2 minutes)
 * ═══════════════════════════════════════════════════════════════
 * 
 * 1. Go to https://sheets.google.com
 * 2. Click "Create new spreadsheet"
 * 3. Name it: "Contact Form Submissions"
 * 4. In the first row, add headers:
 *    A1: Name
 *    B1: Email
 *    C1: Message
 *    D1: Timestamp
 * 5. Save (Ctrl+S or Cmd+S)
 * 
 * Done! Now to the hard part...
 */

/**
 * ═══════════════════════════════════════════════════════════════
 * STEP 2: CREATE GOOGLE APPS SCRIPT (3 minutes)
 * ═══════════════════════════════════════════════════════════════
 * 
 * Google Apps Script lets you create a webhook that receives form data.
 * 
 * 1. In your Google Sheet, top menu → Extensions → Apps Script
 *    (This opens a new page)
 * 
 * 2. You'll see a blank script editor with a function called myFunction()
 *    SELECT ALL and DELETE everything
 * 
 * 3. Copy-paste this code:
 * 
 * ─────────────────────────────────────────────────────────────
 * 
 * function doPost(e) {
 *   try {
 *     // Get the spreadsheet and sheet
 *     const ss = SpreadsheetApp.getActiveSpreadsheet();
 *     const sheet = ss.getSheetByName("Sheet1");
 *     
 *     // Parse incoming JSON data
 *     const data = JSON.parse(e.postData.contents);
 *     
 *     // Add row to spreadsheet
 *     sheet.appendRow([
 *       data.name,
 *       data.email,
 *       data.message,
 *       new Date()
 *     ]);
 *     
 *     // Return success response
 *     return ContentService.createTextOutput(JSON.stringify({success: true}))
 *       .setMimeType(ContentService.MimeType.JSON);
 *   } catch(error) {
 *     // Return error response
 *     return ContentService.createTextOutput(JSON.stringify({success: false, error: error.message}))
 *       .setMimeType(ContentService.MimeType.JSON);
 *   }
 * }
 * 
 * ─────────────────────────────────────────────────────────────
 * 
 * 4. Press Ctrl+S (or Cmd+S) to save
 *    Name the project: "Contact Form Webhook"
 * 
 * 5. Top right → Deploy → New Deployment
 * 
 * 6. Click the gear icon → Select "Web app"
 * 
 * 7. Fill out the deployment dialog:
 *    • Execute as: [Your Email Address]
 *    • Who has access: Anyone
 * 
 * 8. Click "Deploy"
 * 
 * 9. You'll see a popup with a URL like:
 *    https://script.google.com/macros/d/1234...
 *    
 *    👉 COPY THIS URL - You need it in the next step!
 */

/**
 * ═══════════════════════════════════════════════════════════════
 * STEP 3: ADD URL TO VERCEL (2 minutes)
 * ═══════════════════════════════════════════════════════════════
 * 
 * 1. Go to Vercel Dashboard: https://vercel.com/dashboard
 * 2. Click on your "brighttools-prod" project
 * 3. Go to Settings → Environment Variables
 * 4. Add a new variable:
 *    
 *    Name:  GOOGLE_SHEET_WEBHOOK_URL
 *    Value: [Paste the URL from Step 2.9]
 * 
 * 5. Make sure it's set for Production, Preview, and Development
 * 6. Save
 * 
 * Vercel will automatically redeploy with the new variable.
 * ⏳ Wait 1-2 minutes for deployment to finish.
 */

/**
 * ═══════════════════════════════════════════════════════════════
 * STEP 4: TEST (2 minutes)
 * ═══════════════════════════════════════════════════════════════
 * 
 * 1. Visit your website: https://yourdomain.com (or localhost:3000 locally)
 * 2. Click "Contact Us" button
 * 3. Fill out form:
 *    Name: Your Name
 *    Email: your@email.com
 *    Message: Test message from the contact form
 * 4. Click "Send Message"
 * 5. See "Message received!" confirmation
 * 
 * 6. Check your Google Sheet:
 *    → Go back to your "Contact Form Submissions" sheet
 *    → You should see a new row with your form data!
 * 
 * ✅ If you see the data → IT WORKS!
 * ❌ If nothing appears → See troubleshooting below
 */

/**
 * ═══════════════════════════════════════════════════════════════
 * TROUBLESHOOTING
 * ═══════════════════════════════════════════════════════════════
 * 
 * Issue: Form says success but no data in sheet
 * └─────────────────────────────────────────────
 * Check:
 * 1. Did you copy the ENTIRE URL correctly?
 * 2. Did you deploy the Apps Script? (Deploy → New Deployment)
 * 3. Is the URL set in Vercel environment variables?
 * 4. Did Vercel finish redeploying? (Check Deployments tab)
 * 
 * To debug:
 * 1. Open browser DevTools (F12)
 * 2. Go to Network tab
 * 3. Fill and submit form
 * 4. Look for request to "script.google.com"
 * 5. Check response - should be {"success":true}
 * 
 * 
 * Issue: "Form submission service not configured"
 * ────────────────────────────────────────────────
 * The GOOGLE_SHEET_WEBHOOK_URL environment variable is missing.
 * Solution: Add it to Vercel (see Step 3 above)
 * 
 * 
 * Issue: Form hangs on "Sending..."
 * ──────────────────────────────────
 * Check:
 * 1. Is the URL correct? (Copy it exactly)
 * 2. Is the Apps Script deployed properly?
 * 3. Check browser console for network errors (F12)
 * 4. Try the Apps Script URL directly in browser
 *    (should show error in browser, but URL must be accessible)
 * 
 * 
 * Issue: Apps Script won't deploy
 * ────────────────────────────────
 * Try:
 * 1. Refresh the page
 * 2. Click Deploy → New Deployment again
 * 3. Make sure you're selecting "Web app" (not Library)
 * 4. Check that "Anyone" is selected for permissions
 */

/**
 * ═══════════════════════════════════════════════════════════════
 * HOW IT WORKS
 * ═══════════════════════════════════════════════════════════════
 * 
 * Form Submission Flow:
 * 
 * User fills form
 *   ↓
 * Browser sends POST to /api/contact (your Next.js API)
 *   ↓
 * API route validates and strips HTML
 *   ↓
 * API sends POST to Google Apps Script webhook URL
 *   ↓
 * Apps Script receives data and appends to Google Sheet
 *   ↓
 * Sheet updates in real-time
 *   ↓
 * API returns 200 success
 *   ↓
 * Frontend shows "Message received!" and closes modal
 * 
 * Everything stays within Google + your infrastructure!
 */

/**
 * ═══════════════════════════════════════════════════════════════
 * FEATURES
 * ═══════════════════════════════════════════════════════════════
 * 
 * ✅ No external services needed
 * ✅ All data stays in your Google account
 * ✅ Real-time updates in Google Sheet
 * ✅ Easy filtering and sorting
 * ✅ Can share sheet with team
 * ✅ Download as CSV/Excel anytime
 * ✅ Free tier (unlimited submissions)
 * ✅ No API keys to manage
 * 
 * Enhancement Options:
 * • Add email notifications when new submission arrives
 * • Use Google Forms integrations to send reminders
 * • Create pivot tables/charts from submissions
 * • Archive old submissions to separate sheet
 * • Add form response templates
 */

/**
 * ═══════════════════════════════════════════════════════════════
 * LOCAL TESTING (.env.local)
 * ═══════════════════════════════════════════════════════════════
 * 
 * If you want to test locally before deploying:
 * 
 * 1. Create a .env.local file in project root:
 *    
 *    GOOGLE_SHEET_WEBHOOK_URL=https://script.google.com/macros/d/YOUR_ID/usercallable
 * 
 * 2. npm run dev
 * 3. Visit http://localhost:3000
 * 4. Test the form
 * 5. Check it appears in your Google Sheet
 */

/**
 * ═══════════════════════════════════════════════════════════════
 * SAMPLE APPS SCRIPT (REFERENCE)
 * ═══════════════════════════════════════════════════════════════
 * 
 * If you want to customize the Apps Script further:
 * 
 * Add logging:
 * ───────────
 * Logger.log("Received data: " + JSON.stringify(data));
 * 
 * 
 * Add email notification:
 * ──────────────────────
 * GmailApp.sendEmail("your@email.com", "New contact form submission", 
 *   "From: " + data.name + "\nEmail: " + data.email + "\n\n" + data.message);
 * 
 * 
 * Add timestamp formatting:
 * ────────────────────────
 * const now = new Date();
 * const timestamp = Utilities.formatDate(now, Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm:ss");
 */

export {}
