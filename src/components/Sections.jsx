import { ArrowUpRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { aboutPrinciples, approach, coreValues, industries, leadership, services, trustPoints, vision, mission, whyUs } from '../data';

export function SectionHeading({ eyebrow, title, text, light = false }) {
  return (
    <div className={`section-heading ${light ? 'light' : ''}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {text && <p className="section-intro">{text}</p>}
    </div>
  );
}

export function Services({ onDiscussService }) {
  return (
    <section className="section services" id="services">
      <div className="container">
        <SectionHeading
          eyebrow="Firm Services"
          title="Audit, Tax & Advisory Services"
          text="Integrated professional services to support reliable reporting, regulatory compliance and informed business decisions."
        />
        <div className="service-grid">
          {services.map(({ icon: Icon, number, title, service, slug, summary, items }) => (
            <article className="service-card" key={title}>
              <div className="card-top">
                <span className="icon-box"><Icon /></span>
                <span className="card-number">{number}</span>
              </div>
              <h3>{title}</h3>
              <p>{summary}</p>
              <ul className="service-bullets">
                {items.map((item) => <li key={item}><Check size={14} />{item}</li>)}
              </ul>
              <div className="service-card-actions">
                <Link className="service-card-details" to={`/services/${slug}`}>
                  Explore Service <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
                <button type="button" className="service-card-enquire" onClick={() => onDiscussService(service)}>
                  Discuss This Service <ArrowUpRight size={16} aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section className="section about" id="about">
      <div className="container about-stack">
        <div className="about-grid about-grid--balanced">
          <div className="about-copy">
            <SectionHeading
              eyebrow="About the Firm"
              title="IJAZ AHMAD & Co."
              text="A modern consulting and accounting firm helping businesses navigate growth, governance, financial complexity and regulatory challenges."
            />
            <p>We combine technical excellence with practical business insight to deliver value-driven outcomes across audit, taxation, financial advisory, risk management and business consulting.</p>
            <p>Our approach is designed to support organisations that need dependable professional guidance, clearer reporting, stronger controls and commercially relevant advice.</p>
            <div className="about-pillars">
              {aboutPrinciples.map((item) => <span key={item}><Check size={15} />{item}</span>)}
            </div>
            <article className="about-callout">
              <p className="panel-label">Practice Focus</p>
              <h3>Technical excellence with practical business insight.</h3>
              <p>Audit, taxation, financial advisory, risk management and business consulting delivered with a value-driven approach.</p>
            </article>
          </div>
          <div className="about-panels">
            <article className="about-panel">
              <p className="panel-label">Vision</p>
              <h3>{vision.title}</h3>
              <p>{vision.text}</p>
            </article>
            <article className="about-panel">
              <p className="panel-label">Mission</p>
              <h3>{mission.title}</h3>
              <p>{mission.text}</p>
            </article>
          </div>
        </div>
        <div className="value-grid">
          {coreValues.map(({ icon: Icon, title, text }) => (
            <article className="value-card" key={title}>
              <Icon />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhyUs() {
  return (
    <section className="section why-us" id="why-us">
      <div className="container why-layout">
        <div className="why-copy">
          <SectionHeading
            eyebrow="Why Businesses Trust Us"
            title="Trusted Expertise. Practical Solutions. Measurable Impact."
            text="Trusted advisory for stronger controls, better decisions, and sustainable growth."
          />
          <article className="why-callout">
            <p className="panel-label">Business Value</p>
            <h3>Long-term advisory built around governance, compliance and practical decision support.</h3>
            <p>We focus on disciplined, client-centred professional support and sustainable business outcomes.</p>
          </article>
        </div>
        <div className="why-grid">
          {whyUs.map(({ icon: Icon, title, text }) => (
            <article className="why-card" key={title}>
              <Icon />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <div className="why-strip">
          <span>Trusted advisory for stronger controls, better decisions, and sustainable growth.</span>
          <div className="trust-pills">
            {trustPoints.map((item) => <span key={item}>{item}</span>)}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Approach() {
  return (
    <section className="section approach" id="approach">
      <div className="container">
        <SectionHeading
          eyebrow="Our Approach"
          title="A Practical 4-Step Method"
          text="A clear process for understanding the business, identifying priorities and delivering solutions that support sustainable growth."
        />
        <div className="process-grid">
          {approach.map(({ step, icon: Icon, title, text }) => (
            <article className="process-step" key={title}>
              <span className="process-step-number">{step}</span>
              <Icon />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Industries() {
  return (
    <section className="section industries" id="industries">
      <div className="container">
        <SectionHeading
          eyebrow="Industry Experience"
          title="Sectors Served"
          text="Professional services across diverse business sectors and organisation types."
        />
        <div className="industry-grid">
          {industries.map(({ icon: Icon, title }) => (
            <article className="industry-card" key={title}>
              <Icon />
              <h3>{title}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Leadership() {
  const profile = leadership.find((person) => person.name === 'Ijaz Ahmad');
  if (!profile) return null;

  return (
    <section className="section leadership personal-profile-page" id="leadership">
      <div className="container">
        <header className="personal-profile-heading">
          <p className="eyebrow">Professional Profile</p>
          <h1>Meet Ijaz Ahmad</h1>
          <p>Professional expertise in audit, taxation and business advisory.</p>
        </header>
        <div className="personal-profile-layout">
          <figure className="personal-profile-portrait">
            <img src="/images/ijaz-ahmad-profile.webp" alt="Ijaz Ahmad, Chartered Accountant" width="900" height="1157" decoding="async" />
            <figcaption>{profile.name}, {profile.qualification}</figcaption>
          </figure>
          <div className="personal-profile-copy">
            <p className="panel-label">Professional Qualification</p>
            <h2>{profile.name}, {profile.qualification}</h2>
            <p className="personal-profile-role">Chartered Accountant</p>
            <p>Ijaz Ahmad is a Chartered Accountant. Through this website, clients can explore professional services in audit and assurance, taxation and regulatory compliance, and financial and business advisory.</p>
            <h3>Areas of professional support</h3>
            <ul className="personal-focus-list">
              {services.map(({ slug, title }) => (
                <li key={slug}><Link to={`/services/${slug}`}><Check size={16} aria-hidden="true" />{title}<ArrowUpRight size={15} aria-hidden="true" /></Link></li>
              ))}
            </ul>
            <Link className="button button--navy" to="/contact">Contact Us <ArrowUpRight size={16} /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}

