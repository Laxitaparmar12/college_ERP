import { Link } from "@tanstack/react-router";
import { Brain } from "lucide-react";

export function NavBar() {
  return (
    <header className="sticky top-0 z-50 glass border-b border-border/60">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
            <Brain className="h-5 w-5 text-primary transition-transform group-hover:rotate-12" />
          </span>
          <span className="font-display font-semibold text-lg tracking-tight">SmartERP</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#team" className="hover:text-foreground transition-colors">Team</a>
          <a href="#about" className="hover:text-foreground transition-colors">About</a>
        </nav>
        <Link
          to="/portal"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground shadow-soft hover:shadow-lift transition-all hover:-translate-y-0.5"
        >
          Launch Portal
        </Link>
      </div>
    </header>
  );
}
