import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const links = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Industries', to: '/industries' },
  { label: 'Professional Profile', to: '/leadership' },
  { label: 'Insights', to: '/insights' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef(null);
  const navRef = useRef(null);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
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
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);

  useEffect(() => { setOpen(false); }, [location.key]);

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

  const closeMenu = () => setOpen(false);

  return (
    <header className={`navbar ${scrolled || !isHome ? 'navbar--scrolled' : ''}`}>
      <div className="nav-inner container">
        <Link className="brand" to="/" onClick={closeMenu} aria-label="IJAZ AHMAD & Co. home">
          <span>IJAZ AHMAD &amp; Co.</span><small>Chartered Accountants</small>
        </Link>
        <nav id="main-navigation" ref={navRef} className={`nav-links ${open ? 'is-open' : ''}`} aria-label="Main navigation">
          {links.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === '/'} className={({ isActive }) => isActive ? 'active' : undefined} onClick={closeMenu}>
              {item.label}
            </NavLink>
          ))}
          <NavLink className="button button--gold nav-cta" to="/contact" onClick={closeMenu}>Contact Us</NavLink>
        </nav>
        <button ref={toggleRef} className="menu-toggle" type="button" onClick={() => setOpen((previous) => !previous)} aria-label={open ? 'Close menu' : 'Open menu'} aria-controls="main-navigation" aria-expanded={open}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
