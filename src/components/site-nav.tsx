import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const items = [
  ["Home", "/"],
  ["Work", "/work"],
  ["About", "/about"],
  ["Resume", "/resume"],
  ["Contact", "/contact"],
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="site-header">
      <Link to="/" className="monogram" aria-label="Fatma Mourad, home">
        <span>F</span>
        <span>M</span>
      </Link>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {items.map(([label, to]) => {
          const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
          return (
            <Link
              key={to}
              to={to}
              className={active ? "active" : ""}
              aria-current={active ? "page" : undefined}
            >
              {label}
            </Link>
          );
        })}
      </nav>
      <Button
        variant="nav"
        size="icon"
        className="mobile-menu-button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X /> : <Menu />}
      </Button>
      <div className={open ? "mobile-drawer open" : "mobile-drawer"} aria-hidden={!open}>
        <nav aria-label="Mobile navigation">
          {items.map(([label, to], index) => (
            <Link
              key={to}
              to={to}
              className={pathname === to || (to !== "/" && pathname.startsWith(to)) ? "active" : ""}
              tabIndex={open ? 0 : -1}
            >
              <span>0{index + 1}</span>
              {label}
            </Link>
          ))}
        </nav>
        <p>Designing clearer paths through complicated things.</p>
      </div>
    </header>
  );
}
