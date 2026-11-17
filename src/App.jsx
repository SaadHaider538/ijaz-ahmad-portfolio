import { useCallback, useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { About, Approach, Industries, Leadership, Services, WhyUs } from './components/Sections';
import Footer from './components/Footer';
import Contact from './components/Contact';


export default function App() {
  const [serviceRequest, setServiceRequest] = useState(null);

 const openConsultation = useCallback(() => {
  const contactSection = document.getElementById('contact');

  if (!contactSection) return;

  if (window.location.hash !== '#contact') {
    window.history.pushState(null, '', '#contact');
  }

  contactSection.scrollIntoView({
    block: 'start',
  });
}, []);
  const discussService = useCallback((service) => setServiceRequest({ service, requestedAt: Date.now() }), []);

  useEffect(() => {
    const selectors = [
      '.section-heading',
      '.service-card',
      '.about-copy',
      '.about-callout',
      '.value-card',
      '.why-copy',
      '.why-card',
      '.why-callout',
      '.why-strip',
      '.process-step',
      '.industry-card',
      '.leader-card',
      '.contact-copy',
      '.contact-form',
    ].join(', ');
    const nodes = document.querySelectorAll(selectors);

    if (!('IntersectionObserver' in window)) {
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
  }, []);

  return (
    <>
      <Navbar onRequestConsultation={openConsultation} />
      <main>
        <Hero onRequestConsultation={openConsultation} />
        <Services onDiscussService={discussService} />
        <About />
        <WhyUs />
        <Approach />
        <Industries />
        <Leadership />
        
        <Contact serviceRequest={serviceRequest} />
      </main>
      <Footer />
    
    </>
  );
}
