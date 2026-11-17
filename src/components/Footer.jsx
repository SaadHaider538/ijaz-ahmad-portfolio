import { ArrowUp, Mail, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CONTACT, professionalServices } from '../utils/contact';

const telHref = (value) => `tel:${String(value).replace(/[^\d+]/g, '')}`;

export default function Footer() {
  const backToTop = (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  };

  return (
    <footer>
      <div className="container footer-grid">
        <div>
          <Link className="brand" to="/">
            <span>IJAZ AHMAD &amp; Co.</span><small>Chartered Accountants</small>
          </Link>
          <p>Professional audit, taxation, regulatory compliance and advisory services delivered with integrity, technical discipline and commercial perspective.</p>
        </div>
        <div>
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/services">Services</Link>
          <Link to="/about#why-us">Why Us</Link>
          <Link to="/about#approach">Our Approach</Link>
          <Link to="/industries">Industries</Link>
          <Link to="/leadership">Professional Profile</Link>
          <Link to="/insights">Insights &amp; Publications</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div>
          <h3>Services</h3>
          {professionalServices.map((service) => <Link key={service} to="/services">{service}</Link>)}
        </div>
        <div>
          <h3>Contact</h3>
          <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer"><MessageCircle />WhatsApp</a>
          <a href={telHref(CONTACT.primaryPhone)}>{CONTACT.primaryPhone}</a>
          <a href={`mailto:${CONTACT.email}`}>
  <Mail />{CONTACT.email}
</a>

<a
  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(CONTACT.email)}`}
  target="_blank"
  rel="noopener noreferrer"
>
  <Mail /> Compose in Gmail
</a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>&copy; 2026 IJAZ AHMAD &amp; Co. All rights reserved.</span>
        <a href="#main-content" onClick={backToTop}>Back to top <ArrowUp /></a>
      </div>
    </footer>
  );
}
