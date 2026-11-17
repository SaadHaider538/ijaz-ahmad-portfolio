import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export default function Hero({ onRequestConsultation }) {
  return (
    <section className="home" id="home">
      <div className="hero">
        <div className="hero-grid container">
          <div className="hero-copy reveal">
            <p className="eyebrow">
              <span>AUDIT</span>
              <i />
              <span>TAX</span>
              <i />
              <span>ADVISORY</span>
            </p>

            <h1>IJAZ AHMAD &amp; Co.</h1>
            <h2>Chartered Accountants</h2>

            <p className="hero-tagline">
              Building Trust. Delivering Clarity.<em> Enabling Growth.</em>
            </p>

            <p className="hero-description">
              Professional assurance, taxation, regulatory compliance and business advisory
              solutions designed to strengthen governance and support sustainable business growth.
            </p>

            <div className="hero-actions">
              <Link className="button button--gold" to="/services">
                Explore Our Services <ArrowRight size={17} />
              </Link>
              <button className="button button--outline" type="button" onClick={onRequestConsultation}>
                Contact Us
              </button>
            </div>
          </div>

          <div className="hero-visual reveal personal-hero-visual">
            <figure className="personal-hero-card">
              <div className="personal-hero-photo">
                <img src="/images/ijaz-ahmad-profile.jpeg" alt="Ijaz Ahmad, Chartered Accountant" width="900" height="1157" decoding="async" fetchPriority="high" />
              </div>
              <figcaption>
                <strong>Ijaz Ahmad, FCA</strong>
                <span>Chartered Accountant</span>
                <Link to="/leadership" className="personal-profile-link">View Professional Profile <ArrowRight size={15} /></Link>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>

      <div className="trust-bar" aria-label="Firm positioning highlights">
        <div className="container trust-items">
          {['Financial Clarity', 'Compliance', 'Governance', 'Assurance', 'Advisory'].map((item, index) => (
            <div key={item}><ShieldCheck size={17} /><span>{item}</span>{index < 4 && <i />}</div>
          ))}
        </div>
      </div>
    </section>
  );
}
