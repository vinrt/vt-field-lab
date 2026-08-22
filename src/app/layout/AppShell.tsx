import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { AtomIcon } from "../../components/ui/Icons";

const navigation = [
  { to: "/simulations", label: "Simulations" },
  { to: "/learn", label: "Learn" },
  { to: "/books", label: "Books" },
  { to: "/about", label: "About" },
];

export function AppShell() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="header-inner">
          <Link className="brand" to="/" onClick={() => setMenuOpen(false)}>
            <span className="brand-mark"><AtomIcon /></span>
            <span><strong>VT</strong> Field Lab</span>
          </Link>
          <button
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>
          <nav
            id="primary-navigation"
            className={`primary-navigation${menuOpen ? " is-open" : ""}`}
            aria-label="Primary navigation"
          >
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) => (isActive ? "is-active" : undefined)}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <Outlet />
      <footer className="site-footer">
        <div className="page-width footer-inner">
          <Link className="brand brand--footer" to="/">
            <span className="brand-mark"><AtomIcon /></span>
            <span><strong>VT</strong> Field Lab</span>
          </Link>
          <p>Interactive physics and mathematics, built to be measured.</p>
          <span>© {new Date().getFullYear()} VT Field Lab</span>
        </div>
      </footer>
    </div>
  );
}
