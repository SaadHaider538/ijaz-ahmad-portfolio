import { ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { services } from '../data';
import { serviceDetails } from '../serviceDetails';

export default function ServiceDetail({ service, onDiscussService }) {
  const details = serviceDetails[service.slug];
  const Icon = service.icon;
  const related = services.filter((item) => item.slug !== service.slug);

  return (
    <article className="service-detail-page">
      <header className="sd-hero">
        <div className="container sd-hero-inner">
          <nav className="sd-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link><ChevronRight size={14} aria-hidden="true" />
            <Link to="/services">Services</Link><ChevronRight size={14} aria-hidden="true" />
            <span aria-current="page">{service.title}</span>
          </nav>
          <div className="sd-hero-grid">
            <div>
              <p className="sd-kicker">Professional Services / {service.number}</p>
              <h1>{service.title}</h1>
              <p className="sd-headline">{details.headline}</p>
              <p className="sd-summary">{service.summary}</p>
              <button className="button button--gold" type="button" onClick={() => onDiscussService(service.service)}>
                Discuss Your Requirements <ArrowRight size={17} aria-hidden="true" />
              </button>
            </div>
            <div className="sd-hero-panel">
              <Icon size={42} strokeWidth={1.4} aria-hidden="true" />
              <span>Our service focus</span>
              <strong>{details.headline}</strong>
              <p>{service.items.length} areas of professional support</p>
            </div>
          </div>
        </div>
      </header>

      <section className="sd-section" aria-labelledby="sd-overview">
        <div className="container sd-overview-grid">
          <div>
            <p className="sd-kicker">Overview</p>
            <h2 id="sd-overview">How we can assist</h2>
            <p className="sd-body">{details.introduction}</p>
          </div>
          <aside className="sd-note">
            <p className="sd-kicker">An engagement built around your needs</p>
            <h3>Clear scope. Professional judgment.</h3>
            <p>Specific deliverables, terms and responsibilities are agreed before work begins. All engagements are subject to applicable professional requirements and acceptance procedures.</p>
          </aside>
        </div>
      </section>

      <section className="sd-section sd-section-alt" aria-labelledby="sd-scope">
        <div className="container">
          <div className="sd-heading">
            <p className="sd-kicker">Scope of services</p>
            <h2 id="sd-scope">Areas of professional support</h2>
          </div>
          <div className="sd-scope-grid">
            {service.items.map((item, index) => (
              <article className="sd-scope-card" key={item}>
                <div className="sd-card-number"><Check size={19} aria-hidden="true" /><span>{String(index + 1).padStart(2, '0')}</span></div>
                <h3>{item}</h3>
                <p>{details.scope[item]}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sd-section" aria-labelledby="sd-benefits">
        <div className="container">
          <div className="sd-heading"><p className="sd-kicker">Client value</p><h2 id="sd-benefits">What our support aims to achieve</h2></div>
          <div className="sd-benefit-grid">
            {details.benefits.map(([title, text]) => <article className="sd-benefit" key={title}><Check size={22} aria-hidden="true" /><h3>{title}</h3><p>{text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="sd-section sd-section-alt" aria-labelledby="sd-approach">
        <div className="container">
          <div className="sd-heading"><p className="sd-kicker">Our approach</p><h2 id="sd-approach">A structured engagement process</h2></div>
          <ol className="sd-process-grid">
            {details.steps.map(([title, text], index) => <li className="sd-process-card" key={title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{text}</p></li>)}
          </ol>
        </div>
      </section>

      <section className="sd-section" aria-labelledby="sd-related">
        <div className="container">
          <div className="sd-heading"><p className="sd-kicker">Integrated expertise</p><h2 id="sd-related">Related professional services</h2></div>
          <div className="sd-related-grid">
            {related.map((item) => {
              const RelatedIcon = item.icon;
              return <Link className="sd-related-card" key={item.slug} to={`/services/${item.slug}`}><RelatedIcon size={26} aria-hidden="true" /><div><h3>{item.title}</h3><p>{item.summary}</p></div><ArrowUpRight size={20} aria-hidden="true" /></Link>;
            })}
          </div>
          <Link className="sd-back" to="/services"><ArrowLeft size={17} aria-hidden="true" /> All services</Link>
        </div>
      </section>

      <section className="sd-cta" aria-labelledby="sd-contact">
        <div className="container sd-cta-inner">
          <div><p className="sd-kicker">Get in touch</p><h2 id="sd-contact">Discuss your business requirements.</h2><p>Tell us how we can assist. We will review your enquiry and discuss the appropriate next steps.</p></div>
          <button className="button button--navy" type="button" onClick={() => onDiscussService(service.service)}>Contact Our Team <ArrowRight size={17} aria-hidden="true" /></button>
        </div>
      </section>
    </article>
  );
}
