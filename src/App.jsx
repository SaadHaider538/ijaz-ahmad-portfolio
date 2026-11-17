import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { Link, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { About, Approach, Industries, Leadership, Services, WhyUs } from './components/Sections';
import Footer from './components/Footer';
import Contact from './components/Contact';
import PrivacyPolicy from './components/PrivacyPolicy';
import ServiceDetail from './components/ServiceDetail';
import { services } from './data';
import './service-pages.css';
import './ui-refinement.css';
import { applyPageSeo } from './seo.js';
import Insights, { InsightsPreview, InsightDetail } from './components/Insights';
import { insights } from './insightsData';

const pageTitles = {
  '/': 'IJAZ AHMAD & Co. | Chartered Accountants',
  '/about': 'About Us | IJAZ AHMAD & Co.',
  '/services': 'Services | IJAZ AHMAD & Co.',
  '/industries': 'Industries | IJAZ AHMAD & Co.',
  '/leadership': 'Professional Profile | IJAZ AHMAD & Co.',
  '/contact': 'Contact Us | IJAZ AHMAD & Co.',
  '/privacy': 'Privacy Policy | IJAZ AHMAD & Co.',
  '/insights': 'Insights & Publications | IJAZ AHMAD & Co.',
  ...Object.fromEntries(insights.map(({ slug, title }) => [`/insights/${slug}`, `${title} | IJAZ AHMAD & Co.`])),
  ...Object.fromEntries(services.map(({ slug, title }) => [`/services/${slug}`, `${title} | IJAZ AHMAD & Co.`])),
};

const legacyRoutes = {
  '#about': '/about',
  '#services': '/services',
  '#industries': '/industries',
  '#leadership': '/leadership',
  '#contact': '/contact',
  '#insights': '/insights',
  '#why-us': '/about#why-us',
  '#approach': '/about#approach',
};

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const mainRef = useRef(null);
  const pathname = location.pathname.replace(/\/+$/, '') || '/';
  const isHome = pathname === '/';
  const legacyTarget = isHome ? legacyRoutes[location.hash] : undefined;

  const openConsultation = useCallback(() => navigate('/contact'), [navigate]);
  const discussService = useCallback((service) => {
    navigate('/contact', { state: { serviceRequest: { service, requestedAt: Date.now() } } });
  }, [navigate]);

  // Reset scroll after route changes; retain intentional section anchors.
  useLayoutEffect(() => {
    applyPageSeo(pathname, pageTitles[pathname]);
    if (legacyTarget) return;
    const target = location.hash ? document.getElementById(location.hash.slice(1)) : null;
    if (target && location.hash !== '#home') {
      target.scrollIntoView({ block: 'start', behavior: 'instant' });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [pathname, location.hash, legacyTarget]);

  // Existing CSS hides reveal elements until observed. Reconnect on every page.
  useEffect(() => {
    if (legacyTarget) return undefined;
    const selectors = [
      '.section-heading', '.service-card', '.about-copy', '.about-callout',
      '.value-card', '.why-copy', '.why-card', '.why-callout', '.why-strip',
      '.process-step', '.industry-card', '.leader-card', '.contact-copy', '.contact-form',
    ].join(', ');
    const nodes = mainRef.current?.querySelectorAll(selectors);
    if (!nodes) return undefined;

    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      nodes.forEach((node) => node.classList.add('visible'));
      return undefined;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px 60px' });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [pathname, legacyTarget]);

  return (
    <>
      <Navbar />
      <main ref={mainRef} id="main-content" key={pathname} style={isHome ? undefined : { paddingTop: 'var(--navbar-height, 78px)' }}>
        <Routes>
          <Route path="/" element={legacyTarget ? <Navigate to={legacyTarget} replace /> : (
            <>
              <Hero onRequestConsultation={openConsultation} />
              <Services onDiscussService={discussService} />
              <About />
              <InsightsPreview />
            </>
          )} />
          <Route path="/about" element={<><About /><WhyUs /><Approach /></>} />
          <Route path="/services" element={<Services onDiscussService={discussService} />} />
          {services.map((service) => (
            <Route key={service.slug} path={`/services/${service.slug}`}
              element={<ServiceDetail service={service} onDiscussService={discussService} />} />
          ))}
          <Route path="/insights" element={<Insights />} />
          {insights.map((article) => (
            <Route key={article.slug} path={`/insights/${article.slug}`} element={<InsightDetail article={article} />} />
          ))}
          <Route path="/industries" element={<Industries />} />
          <Route path="/leadership" element={<Leadership />} />
          <Route path="/contact" element={<Contact serviceRequest={location.state?.serviceRequest ?? null} />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="*" element={(
            <section className="section">
              <div className="container">
                <p className="eyebrow">404 — Page Not Found</p>
                <h1>We could not find this page.</h1>
                <Link className="button button--navy" to="/">Return to Home</Link>
              </div>
            </section>
          )} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
