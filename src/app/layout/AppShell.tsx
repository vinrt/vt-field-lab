import { useState, type FormEvent } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { AtomIcon, MailIcon, SearchIcon, SunIcon } from "../../components/ui/Icons";

const navigation = [
  { to: "/simulations", label: "Simulations" },
  { to: "/books", label: "Books" },
  { to: "/about", label: "About" },
  { to: "/learn", label: "Learn" },
];

export function AppShell() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [signupEmail, setSignupEmail] = useState("");
  const [signupStatus, setSignupStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const submitSignup = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (signupStatus === "sending") return;

    setSignupStatus("sending");
    const body = new URLSearchParams({
      "form-name": "newsletter",
      email: signupEmail,
    });

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });

      if (!response.ok) throw new Error("Signup request failed");
      setSignupEmail("");
      setSignupStatus("sent");
    } catch {
      setSignupStatus("error");
    }
  };

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="header-inner">
          <Link className="brand" to="/" onClick={() => setMenuOpen(false)}>
            <span className="brand-mark"><AtomIcon /></span>
            <span><strong>VT</strong> Field Lab</span>
          </Link>
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
          <div className="header-actions" aria-label="Header actions">
            <label className="search-box">
              <SearchIcon />
              <span className="visually-hidden">Search</span>
              <input type="search" placeholder="Search..." />
            </label>
            <button className="icon-button" type="button" aria-label="Display settings">
              <SunIcon />
            </button>
          </div>
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
        </div>
      </header>
      <Outlet />
      <footer className="site-footer">
        <div className="page-width footer-inner">
          <div className="footer-brand-block">
            <Link className="brand brand--footer" to="/">
              <span className="brand-mark"><AtomIcon /></span>
              <span><strong>VT</strong> Field Lab</span>
            </Link>
            <p>Interactive models that connect curiosity with understanding.</p>
          </div>
          <nav aria-label="Footer explore">
            <strong>Explore</strong>
            <Link to="/simulations">Simulations</Link>
            <Link to="/books">Books</Link>
          </nav>
          <nav aria-label="Footer learn">
            <strong>Learn</strong>
            <Link to="/learn">Guides</Link>
            <Link to="/about">About</Link>
          </nav>
          <form
            className="footer-signup"
            name="newsletter"
            method="post"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={submitSignup}
          >
            <input type="hidden" name="form-name" value="newsletter" />
            <label className="visually-hidden">
              Do not fill this out
              <input name="bot-field" tabIndex={-1} />
            </label>
            <strong>Stay curious.</strong>
            <label>
              <span className="visually-hidden">Email address</span>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
                value={signupEmail}
                onChange={(event) => {
                  setSignupEmail(event.target.value);
                  if (signupStatus !== "idle") setSignupStatus("idle");
                }}
              />
              <button type="submit" aria-label="Subscribe" disabled={signupStatus === "sending"}>
                <MailIcon />
              </button>
            </label>
            <span className={`signup-status signup-status--${signupStatus}`} role="status">
              {signupStatus === "sending" && "Sending..."}
              {signupStatus === "sent" && "Sent. Thanks for subscribing."}
              {signupStatus === "error" && "Could not send. Check hosting form setup."}
            </span>
          </form>
          <span className="footer-legal">© {new Date().getFullYear()} VT Field Lab</span>
        </div>
      </footer>
    </div>
  );
}
