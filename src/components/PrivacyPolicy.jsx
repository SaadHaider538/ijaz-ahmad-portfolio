import { Link } from 'react-router-dom';
import { CONTACT } from '../utils/contact';
import '../privacy.css';

export default function PrivacyPolicy() {
  return (
    <section className="section privacy-policy" id="privacy">
      <div className="container privacy-content">
        <p className="eyebrow">Website Privacy</p>
        <h1>Privacy Policy</h1>
        <p className="privacy-intro">This notice describes how IJAZ AHMAD &amp; Co. handles information submitted through this professional website.</p>
        <div className="privacy-panel">
          <h2>1. Information we collect</h2>
          <p>When you submit an enquiry, you provide your name, email address, telephone number, selected service and a description of your requirements. Hosting and third-party service providers may also process technical information such as IP addresses and browser or request data.</p>
          <h2>2. How information is used</h2>
          <p>Enquiry information is used to respond to your request, assess the nature of the professional support required, arrange follow-up communication and maintain appropriate administrative records.</p>
          <h2>3. Third-party services</h2>
          <p>The website is hosted on Vercel, uses Google Fonts and sends email enquiries through EmailJS and an email provider. If you choose WhatsApp, your prepared message is opened in WhatsApp for you to review and send. These providers process information under their own terms and privacy notices.</p>
          <h2>4. Disclosure and confidentiality</h2>
          <p>Information may be shared with service providers needed to process your enquiry, with persons authorised to assess or respond to it, or where disclosure is required by law. Please do not submit passwords, bank credentials, tax portal credentials or confidential financial documents through the initial enquiry form.</p>
          <h2>5. Retention and security</h2>
          <p>Enquiry records should be retained only as necessary for communication, administration and applicable legal or professional obligations. Third-party providers may retain records according to their settings and policies. No online transmission method can guarantee absolute security.</p>
          <h2>6. Your privacy enquiries</h2>
          <p>You may contact us to request access to, correction of, or deletion of your enquiry information, subject to applicable legal and professional recordkeeping requirements.</p>
          <p><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></p>
          <h2>7. Scope and updates</h2>
          <p>Submitting an enquiry does not establish a professional engagement. This notice concerns website enquiries and may be updated as the website or its services change.</p>
          <Link className="button button--navy" to="/contact">Contact Us</Link>
        </div>
      </div>
    </section>
  );
}
