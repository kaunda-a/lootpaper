"use client";

import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import LogoIcon from "@/components/ui/LogoIcon";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";

const links = [
  { href: "/tools", name: "Tools" },
  { href: "/deals", name: "Deals" },
  { href: "/downloads", name: "Downloads" },
  { href: "/blog", name: "Blog" },
  { href: "/about", name: "About" },
];

function isActive(href: string, currentPath: string) {
  if (href === "/") return currentPath === "/";
  return currentPath.startsWith(href);
}

export default function ResizableHeader({ currentPath = "/" }: { currentPath?: string }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggleTheme() {
    const html = document.documentElement;
    const newDark = !html.classList.contains("dark");
    html.classList.toggle("dark", newDark);
    html.classList.add("theme-transition");
    setTimeout(() => html.classList.remove("theme-transition"), 400);
    localStorage.setItem("lootpaper-theme", newDark ? "dark" : "light");
    setIsDark(newDark);
  }

  return (
    <>
      <Navbar>
        <NavBody>
          <a href="/" className="relative z-20 mr-4 flex items-center gap-2.5 px-2 py-1 text-sm font-normal group">
            <span className="inline-block transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_6px_rgba(215,109,119,0.5)]">
              <LogoIcon size={28} />
            </span>
            <span className="text-lg font-bold gradient-text tracking-tight">Lootpaper</span>
          </a>
          <NavItems
            items={links.map((l) => ({
              name: l.name,
              link: l.href,
            }))}
            onItemClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="relative inline-flex size-8 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground hover:text-foreground transition-all duration-200 hover:border-primary/30 hover:shadow-sm"
              aria-label="Toggle theme"
              suppressHydrationWarning
            >
              {isDark ? (
                <Sun className="size-4" />
              ) : (
                <Moon className="size-4" />
              )}
            </button>
            <a
              href="/tools"
              className="inline-flex h-8 items-center justify-center rounded-lg px-3.5 text-xs font-semibold text-[#1a1a1a] shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              style={{ background: "linear-gradient(135deg, #D76D77, #ffca7b)" }}
            >
              Tools
            </a>
          </div>
        </NavBody>

        <MobileNav>
          <MobileNavHeader>
            <a href="/" className="relative z-20 flex items-center gap-2.5 px-2 py-1 group">
              <span className="inline-block transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_6px_rgba(215,109,119,0.5)]">
                <LogoIcon size={28} />
              </span>
              <span className="text-lg font-bold gradient-text tracking-tight">Lootpaper</span>
            </a>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="relative inline-flex size-8 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground hover:text-foreground transition-all duration-200 hover:border-primary/30 hover:shadow-sm"
                aria-label="Toggle theme"
                suppressHydrationWarning
              >
                {isDark ? (
                  <Sun className="size-4" />
                ) : (
                  <Moon className="size-4" />
                )}
              </button>
              <MobileNavToggle
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </div>
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {links.map((link, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "relative rounded-lg px-3 py-2.5 text-sm transition-all duration-200 w-full",
                  isActive(link.href, currentPath)
                    ? "text-foreground font-medium bg-muted"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                )}
              >
                <span className="block">{link.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-3 pt-2">
              <a
                href="/tools"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center h-10 rounded-lg px-4 text-sm font-semibold text-[#1a1a1a] shadow-sm hover:shadow-md transition-all duration-200"
                style={{ background: "linear-gradient(135deg, #D76D77, #ffca7b)" }}
              >
                All Tools
              </a>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
      <div className="h-20" />
    </>
  );
}
