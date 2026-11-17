import { ArrowRight, BadgeCheck, LineChart, ShieldCheck } from 'lucide-react';

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
              <a className="button button--gold" href="#services">
                Explore Our Services <ArrowRight size={17} />
              </a>
              <button className="button button--outline" type="button" onClick={onRequestConsultation}>
                Contact Us
              </button>
            </div>
          </div>

          <div className="hero-visual reveal" aria-label="Corporate advisory profile visual">
            <div className="portrait-frame">
              <div className="portrait-grid">
                <img className="profile-photo hero-profile-photo" src="/images/ijaz-ahmad-profile.jpeg" alt="Ijaz Ahmad, Chartered Accountant" width="900" height="1157" decoding="async" fetchPriority="high" onError={(event) => { event.currentTarget.hidden = true; }} />
              </div>
              <div className="portrait-title"><span>Firm Profile</span><strong>Trusted advisory for stronger controls, better decisions, and sustainable growth.</strong></div>
              <div className="floating-badge"><BadgeCheck size={22} /><span><b>Audit • Tax • Advisory</b>Integrated professional support</span></div>
              <LineChart className="portrait-chart" />
            </div>
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
