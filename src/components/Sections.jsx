import { ArrowUpRight, Check } from 'lucide-react';
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
          text="Comprehensive professional support organised around the three principal service groups identified in the firm profile."
        />
        <div className="service-grid">
          {services.map(({ icon: Icon, number, title, service, summary, items }) => (
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
              <button type="button" onClick={() => onDiscussService(service)}>Discuss This Service <ArrowUpRight size={16} /></button>
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
            <p>The firm's profile emphasises a disciplined, client-centric approach with attention to sustainable business outcomes.</p>
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
          text="Experience across the industries and organisation types identified in the firm presentation."
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
  return (
    <section className="section leadership" id="leadership">
      <div className="container">
        <SectionHeading
          eyebrow="Leadership Team"
          title="Approved Team Profiles"
          text="Leadership profiles shown using the names and qualifications provided in the approved firm brief."
        />
        <div className="leader-grid">
          {leadership.map(({ icon: Icon, name, qualification, text }) => (
            <article className="leader-card" key={name}>
              <div className="leader-icon"><Icon /></div>
              <h3>{name}</h3>
              <p className="leader-qual">{qualification}</p>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
