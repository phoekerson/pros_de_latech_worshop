"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { Plus, Search } from "lucide-react";
import { APP_NAME, NAV_LINKS } from "@/lib/domain/constants";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1920px] items-center gap-6 px-4 md:px-8">
        <Link href="/" className="shrink-0">
          <span className="text-2xl font-bold tracking-tight text-accent">
            {APP_NAME}
          </span>
        </Link>

        <div className="hidden flex-1 items-center gap-2 md:flex max-w-md">
          <div className="flex h-10 w-full items-center gap-2 rounded-full border border-border bg-surface px-4">
            <Search className="h-4 w-4 text-muted shrink-0" />
            <input
              type="search"
              placeholder="Rechercher des créations..."
              className="w-full bg-transparent text-sm text-foreground placeholder:text-muted outline-none"
            />
          </div>
        </div>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-surface-elevated text-foreground"
                    : "text-muted hover:text-foreground hover:bg-white/5",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <SignedIn>
            <Link
              href="/upload"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-black transition-colors hover:bg-accent-hover"
              aria-label="Publier une création"
            >
              <Plus className="h-5 w-5" />
            </Link>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-9 w-9",
                },
              }}
            />
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="secondary" size="sm">
                Se connecter
              </Button>
            </SignInButton>
            <SignInButton mode="modal">
              <Button variant="accent" size="sm">
                Commencer
              </Button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </header>
  );
}
