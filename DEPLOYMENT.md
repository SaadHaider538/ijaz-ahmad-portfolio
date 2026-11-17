# Production deployment

Build command: `npm run build`

Publish directory: `dist`

Configure these variables in the hosting provider's environment settings before building:

- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`

The EmailJS template must deliver to `ijazahmedca@gmail.com`, use `{{email_subject}}` and `{{email_body}}`, and set Reply-To to `{{client_email}}`. Restrict the EmailJS public key/template to the deployed domain in the EmailJS dashboard. Review provider usage limits and add provider-supported CAPTCHA protection if abusive traffic becomes material.

Local `.env` files are intentionally ignored and must not be deployed or committed. Recreate their values in Netlify, Cloudflare Pages, Vercel, or the selected host. Never place Gmail passwords, OAuth secrets, or EmailJS private keys in frontend variables.

After selecting the production domain:

1. Add a canonical `<link>` and `og:url` using the final HTTPS URL.
2. Add `sitemap.xml` with that final URL and reference it from `robots.txt`.
3. Create a branded 1200×630 social-sharing image, add `og:image` and `twitter:image`, and use its absolute production URL.

The current social metadata intentionally omits domain-dependent URLs and images rather than publishing incorrect values.
