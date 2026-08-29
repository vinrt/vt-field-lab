import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { books } from "../../content/books";
import { quantumConcepts } from "../../content/quantum";
import { simulations } from "../../simulations/registry";
import {
  AtomIcon,
  BookmarkIcon,
  BookIcon,
  CloseIcon,
  ConceptsIcon,
  FlaskIcon,
  HomeIcon,
  InfoIcon,
  MailIcon,
  RoadmapIcon,
  SearchIcon,
  SunIcon,
  UserIcon,
} from "../../components/ui/Icons";

const navigation = [
  { to: "/", label: "Home", icon: HomeIcon, end: true },
  { to: "/simulations", label: "Simulations", icon: FlaskIcon },
  { to: "/concepts", label: "Concepts", icon: ConceptsIcon, badge: "New" },
  { to: "/quantum", label: "Quantum", icon: AtomIcon },
  { to: "/books", label: "Books", icon: BookIcon },
  { to: "/learn", label: "Roadmap", icon: RoadmapIcon },
  { to: "/about", label: "About", icon: InfoIcon },
];

type Theme = "light" | "dark";

export function AppShell() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [theme, setTheme] = useState<Theme>(() => localStorage.getItem("vt-theme") === "dark" ? "dark" : "light");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupStatus, setSignupStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("vt-theme", theme);
  }, [theme]);

  useEffect(() => {
    setMenuOpen(false);
    setSearchFocused(false);
    setSearchQuery("");
  }, [location.hash, location.pathname, location.search]);

  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (query.length < 2) return [];

    return [
      ...simulations.map((simulation) => ({ title: simulation.title, detail: simulation.category, route: simulation.status === "available" ? simulation.route : "/simulations/library", type: "Simulation" })),
      ...quantumConcepts.map((concept) => ({ title: concept.title, detail: concept.shortDescription, route: `/concepts/quantum-physics#${concept.id}`, type: "Concept" })),
      ...books.map((book) => ({ title: book.title, detail: book.author, route: "/books", type: "Book" })),
    ].filter((item) => `${item.title} ${item.detail} ${item.type}`.toLowerCase().includes(query)).slice(0, 7);
  }, [searchQuery]);

  const submitSignup = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (signupStatus === "sending") return;
    setSignupStatus("sending");
    const body = new URLSearchParams({ "form-name": "newsletter", email: signupEmail });
    try {
      const response = await fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: body.toString() });
      if (!response.ok) throw new Error("Signup request failed");
      setSignupEmail("");
      setSignupStatus("sent");
    } catch {
      setSignupStatus("error");
    }
  };

  return (
    <div className="app-shell dashboard-shell">
      <aside id="application-sidebar" className={`application-sidebar${menuOpen ? " is-open" : ""}`} aria-label="Primary navigation">
        <Link className="sidebar-brand" to="/">
          <span className="sidebar-brand-mark"><AtomIcon /></span>
          <span><strong>VT Field Lab</strong><small>Explore. Simulate. Understand.</small></span>
        </Link>
        <nav className="sidebar-navigation">
          {navigation.map((item) => {
            const Icon = item.icon;
            return <NavLink key={item.to} to={item.to} end={item.end} className={({ isActive }) => isActive ? "is-active" : undefined}><Icon /><span>{item.label}</span>{item.badge && <small>{item.badge}</small>}</NavLink>;
          })}
        </nav>
        <div className="sidebar-spacer" />
        <aside className="sidebar-support"><strong>Support VT Field Lab</strong><p>Help us build more free, accurate, and beautiful simulations.</p><a href="https://github.com" target="_blank" rel="noreferrer">★ Star on GitHub</a></aside>
        <label className="sidebar-theme-control"><SunIcon /><span>{theme === "light" ? "Light mode" : "Dark mode"}</span><input type="checkbox" checked={theme === "dark"} onChange={() => setTheme((current) => current === "light" ? "dark" : "light")} /><i /></label>
        <small className="sidebar-copyright">© {new Date().getFullYear()} VT Field Lab</small>
      </aside>

      {menuOpen && <button className="sidebar-scrim" type="button" aria-label="Close navigation" onClick={() => setMenuOpen(false)} />}

      <div className="application-main">
        <header className="application-topbar">
          <button className="dashboard-menu-button" type="button" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-controls="application-sidebar" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <CloseIcon /> : <span><i /><i /><i /></span>}</button>
          <Link className="mobile-dashboard-brand" to="/"><AtomIcon /><strong>VT Field Lab</strong></Link>
          <div className="global-search">
            <SearchIcon />
            <label className="visually-hidden" htmlFor="global-search-input">Search simulations, concepts, and books</label>
            <input id="global-search-input" type="search" placeholder="Search simulations, concepts, topics..." value={searchQuery} onFocus={() => setSearchFocused(true)} onChange={(event) => { setSearchQuery(event.target.value); setSearchFocused(true); }} onKeyDown={(event) => { if (event.key === "Escape") setSearchFocused(false); }} />
            {searchFocused && searchQuery.trim().length >= 2 && <div className="global-search-results" role="listbox" aria-label="Search results">
              {searchResults.length ? searchResults.map((result) => <Link key={`${result.type}-${result.title}`} to={result.route} role="option"><span>{result.type}</span><strong>{result.title}</strong><small>{result.detail}</small></Link>) : <p>No matching simulations, concepts, or books.</p>}
            </div>}
          </div>
          <div className="topbar-actions">
            <button type="button" aria-label="Toggle color theme" onClick={() => setTheme((current) => current === "light" ? "dark" : "light")}><SunIcon /></button>
            <Link to="/books" aria-label="Saved reading"><BookmarkIcon /></Link>
            <Link className="topbar-profile" to="/about" aria-label="About VT Field Lab"><UserIcon /></Link>
          </div>
        </header>

        <Outlet />

        <footer className="site-footer dashboard-footer">
          <div className="page-width footer-inner">
            <div className="footer-brand-block"><Link className="brand brand--footer" to="/"><span className="brand-mark"><AtomIcon /></span><span><strong>VT</strong> Field Lab</span></Link><p>Interactive models that connect curiosity with understanding.</p></div>
            <nav aria-label="Footer explore"><strong>Explore</strong><Link to="/simulations">Simulations</Link><Link to="/concepts">Concepts</Link><Link to="/books">Books</Link></nav>
            <nav aria-label="Footer learn"><strong>Learn</strong><Link to="/quantum">Quantum</Link><Link to="/learn">Roadmap</Link><Link to="/about">About</Link></nav>
            <form className="footer-signup" name="newsletter" method="post" data-netlify="true" data-netlify-honeypot="bot-field" onSubmit={submitSignup}>
              <input type="hidden" name="form-name" value="newsletter" />
              <label className="visually-hidden">Do not fill this out<input name="bot-field" tabIndex={-1} /></label>
              <strong>Stay curious.</strong>
              <label><span className="visually-hidden">Email address</span><input type="email" name="email" placeholder="you@example.com" autoComplete="email" required value={signupEmail} onChange={(event) => { setSignupEmail(event.target.value); if (signupStatus !== "idle") setSignupStatus("idle"); }} /><button type="submit" aria-label="Subscribe" disabled={signupStatus === "sending"}><MailIcon /></button></label>
              <span className={`signup-status signup-status--${signupStatus}`} role="status">{signupStatus === "sending" && "Sending..."}{signupStatus === "sent" && "Sent. Thanks for subscribing."}{signupStatus === "error" && "Could not send. Check hosting form setup."}</span>
            </form>
            <span className="footer-legal">© {new Date().getFullYear()} VT Field Lab</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
