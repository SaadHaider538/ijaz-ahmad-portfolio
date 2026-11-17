import { ArrowUp, Mail, MessageCircle } from 'lucide-react';
import { CONTACT, professionalServices } from '../utils/contact';

const telHref = (value) => `tel:${String(value).replace(/[^\d+]/g, '')}`;

export default function Footer() {
  return (
    <footer>
      <div className="container footer-grid">
        <div>
          <a className="brand" href="#home">
            <span>IJAZ AHMAD &amp; Co.</span><small>Chartered Accountants</small>
          </a>
          <p>Professional audit, taxation, regulatory compliance and advisory services delivered with integrity, technical discipline and commercial perspective.</p>
        </div>
        <div>
          <h3>Quick Links</h3>
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#why-us">Why Us</a>
          <a href="#approach">Our Approach</a>
          <a href="#industries">Industries</a>
          <a href="#leadership">Leadership</a>
          <a href="#contact">Contact</a>
        </div>
        <div>
          <h3>Services</h3>
          {professionalServices.map((service) => <a key={service} href="#services">{service}</a>)}
        </div>
        <div>
          <h3>Contact</h3>
          <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer"><MessageCircle />WhatsApp</a>
          <a href={telHref(CONTACT.primaryPhone)}>{CONTACT.primaryPhone}</a>
          <a href={`mailto:${CONTACT.email}`}><Mail />{CONTACT.email}</a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>&copy; 2026 IJAZ AHMAD &amp; Co. All rights reserved.</span>
        <a href="#home">Back to top <ArrowUp /></a>
      </div>
    </footer>
  );
}
