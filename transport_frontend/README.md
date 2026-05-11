# Trust Drive India Frontend

Landing page for `Trust Drive India`, built with React, TypeScript, and Vite.

## Contact Number Setup

Create a `.env` file in the project root and add:

```bash
VITE_PHONE_DIAL_NUMBER=+919000000000
VITE_WHATSAPP_NUMBER=+919111111111
VITE_CONTACT_EMAIL=trustdriveindia5@gmail.com
VITE_INSTAGRAM_URL=https://www.instagram.com/trust.driveindia
VITE_FACEBOOK_URL=https://www.facebook.com/your-page
VITE_LINKEDIN_URL=https://www.linkedin.com/company/your-page
```

These numbers are used for:

- `Call now` dial links from `VITE_PHONE_DIAL_NUMBER`
- `WhatsApp` launcher from `VITE_WHATSAPP_NUMBER`
- `Email` contact from `VITE_CONTACT_EMAIL`
- `Social profile` links and SEO structured data from the social URL variables

Backward compatibility:

- `VITE_CONTACT_NUMBER` still works as a shared fallback if you want to use one number for both.
- If nothing is set, the UI falls back to a placeholder number.

## Run the Project

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
# trustdriveindia
