VELORA REALTY - HOW TO MAKE IT YOURS AND PUBLISH

1) PUT YOUR PHOTOS IN THE "images" FOLDER (use these exact names, .jpg)
   dubai-property.jpg   About section photo (about 1200 x 900)
   property-1.jpg ... property-6.jpg   Listing photos (about 1000 x 700)
   agent-1.jpg ... agent-4.jpg   Agent portraits, square (about 400 x 400)
   og-image.jpg   Preview image when the link is shared (1200 x 630)
   Any photo you leave out is skipped and the drawn placeholder shows instead.
   Compress photos first (squoosh.app) so each is under about 300 KB.

2) REPLACE EVERY [BRACKETED] TEXT
   In your code editor, search for "[" in index.html, script.js and privacy.html.
   Items: phone, email, address, licence number, prices, beds/baths/sq ft,
   agent names, languages, job titles, About text, privacy policy details.
   Prices and details for listings are in script.js (the listings list).
   Agent names are in script.js too (the agents list), or edit the card text.

3) CONNECT THE CONTACT FORM
   - Create a free account at formspree.io and make a new form.
   - Copy its endpoint, like https://formspree.io/f/abcd1234
   - In script.js, replace https://formspree.io/f/YOUR_FORM_ID with it.

4) UPDATE THE LINKS IN THE <head> OF index.html
   - og:image and canonical details once you know your domain.
   - Change the title and description if you want different wording.

5) PUBLISH (free)
   - Netlify: go to app.netlify.com/drop and drag this whole folder in.
   - Or GitHub Pages / Vercel if you prefer.
   Keep index.html, style.css, script.js, privacy.html and images/ together.

6) BEFORE GOING LIVE
   - Open on your phone and in a second browser.
   - Send a test message through the form.
   - Only list properties that are real and that you are allowed to advertise.
   - Have the privacy policy checked for your situation.
