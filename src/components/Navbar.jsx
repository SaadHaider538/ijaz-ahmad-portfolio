import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Services', id: 'services' },
  { label: 'Why Us', id: 'why-us' },
  { label: 'Our Approach', id: 'approach' },
  { label: 'Industries', id: 'industries' },
  { label: 'Leadership', id: 'leadership' },
  { label: 'Contact', id: 'contact' },
];

export default function Navbar({ onRequestConsultation }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');
  const toggleRef = useRef(null);
  const navRef = useRef(null);

  useEffect(() => {
    const sections = links.map(({ id }) => document.getElementById(id)).filter(Boolean);
    let frameId = 0;

    const updateScrolledState = () => {
      setScrolled(window.scrollY > 24);
      frameId = 0;
    };

    const onScroll = () => {
      if (!frameId) frameId = window.requestAnimationFrame(updateScrolledState);
    };

    updateScrolledState();
    window.addEventListener('scroll', onScroll, { passive: true });

    const visibleSections = new Map();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => visibleSections.set(entry.target.id, entry.isIntersecting));
      const visible = sections.filter((section) => visibleSections.get(section.id));
      if (visible.length) {
        const headerHeight = Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--navbar-height')) || 78;
        const current = visible.reduce((closest, section) => (
          Math.abs(section.getBoundingClientRect().top - headerHeight) < Math.abs(closest.getBoundingClientRect().top - headerHeight)
            ? section
            : closest
        ));
        setActive(current.id);
      }
    }, { rootMargin: '0px 0px -70% 0px', threshold: 0.01 });

    sections.forEach((section) => observer.observe(section));

    const syncHash = () => {
      const id = window.location.hash.slice(1);
      if (!links.some((item) => item.id === id)) return;
      setActive(id);
      window.requestAnimationFrame(() => {
        if (id === 'home') window.scrollTo({ top: 0, behavior: 'auto' });
        else document.getElementById(id)?.scrollIntoView({ block: 'start' });
      });
    };

    window.addEventListener('hashchange', syncHash);
    window.addEventListener('popstate', syncHash);
    if (window.location.hash) syncHash();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('hashchange', syncHash);
      window.removeEventListener('popstate', syncHash);
      observer.disconnect();
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleEscape);
    const focusTimer = window.setTimeout(() => navRef.current?.querySelector('a')?.focus(), 0);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open]);

  const navigate = (event, id) => {
    setOpen(false);
    if (!id) return;
    event.preventDefault();
    setActive(id);
    if (window.location.hash !== `#${id}`) window.history.pushState(null, '', `#${id}`);
    if (id === 'home') window.scrollTo({ top: 0, behavior: 'smooth' });
    else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="nav-inner container">
        <a className="brand" href="#home" onClick={(event) => navigate(event, 'home')} aria-label="IJAZ AHMAD & Co. home">
          <span>IJAZ AHMAD &amp; Co.</span><small>Chartered Accountants</small>
        </a>
        <nav id="main-navigation" ref={navRef} className={`nav-links ${open ? 'is-open' : ''}`} aria-label="Main navigation">
          {links.map((item) => (
            <a key={item.id} className={active === item.id ? 'active' : ''} href={`#${item.id}`} aria-current={active === item.id ? 'page' : undefined} onClick={(event) => navigate(event, item.id)}>
              {item.label}
            </a>
          ))}
          <button className="button button--gold nav-cta" type="button" onClick={() => { setOpen(false); onRequestConsultation(); }}>Request a Consultation</button>
        </nav>
        <button ref={toggleRef} className="menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-controls="main-navigation" aria-expanded={open}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
