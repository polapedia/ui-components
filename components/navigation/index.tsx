import { ComponentProps, ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import Button from "../button";
import Image from "next/image";
import HamburgerIcon from "../icons/HamburgerIcon";
import CloseIcon from "../icons/CloseIcon";

export type NavItem = {
  label: string;
  href: string;
  disabled?: boolean;
};

type Variant = "elevated" | "flat";

export interface NavigationProps extends ComponentProps<"nav"> {
  items: NavItem[];
  activeHref?: string;
  logo?: ReactNode;
  contactLabel?: string;
  onContactClick?: () => void;
  hideContactButton?: boolean;
  sticky?: boolean;
  variant?: Variant;
}

const DefaultLogo = () => (
  <Image
    src="/logo/polapedia.png"
    alt="Logo Polapedia"
    width={500}
    height={500}
  />
);

export default function Navigation({
  items,
  activeHref,
  logo,
  contactLabel = "Contact",
  onContactClick,
  hideContactButton,
  sticky,
  variant = "elevated",
  className,
  ...rest
}: NavigationProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const containerClasses = [
    "w-full flex flex-col items-center px-0 transition-all duration-300",
    sticky ? "sticky top-4 z-50" : "relative top-4",
    className,
  ].join(" ");

  const navClasses = [
    "w-full h-[74px] desktop:h-[102px]",
    "px-4 py-2.5",
    "flex items-center justify-between",
    "rounded-2xl",
    "bg-white",
    "transition-all duration-300",
    variant === "elevated" || scrolled
      ? "shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100"
      : "border border-slate-200",
  ].join(" ");

  const renderNavItem = (item: NavItem, isMobile = false) => {
    const isActive = item.href === activeHref;

    return (
      <Link
        key={item.label}
        href={item.disabled ? "#" : item.href}
        onClick={() => isMobile && setIsMobileOpen(false)}
        className={[
          "relative font-medium transition-colors duration-200",
          isMobile
            ? "text-[16px] py-0"
            : "text-sm tab:text-[16px] desktop:text-[20px]",
          isActive
            ? "bg-clip-text text-transparent bg-linear-to-b from-gradient-primary to-gradient-secondary"
            : "text-content-primary hover:text-primary-600",
          item.disabled && "opacity-50 cursor-not-allowed",
        ].join(" ")}>
        {item.label}
      </Link>
    );
  };

  return (
    <header className={containerClasses}>
      <nav className={navClasses} {...rest}>
        {/* LEFT: Logo */}
        <div className="shrink-0 cursor-pointer w-[150px] desktop:w-[250px]">
          <Link href="/">{logo ?? <DefaultLogo />}</Link>
        </div>

        {/* CENTER: Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          {items.map((item) => renderNavItem(item))}
        </div>

        {/* RIGHT: Actions */}
        <div className="flex items-center gap-3">
          {!hideContactButton && (
            <div className="hidden md:block">
              <Button
                variant="primary"
                size="md"
                shape="pill"
                onClick={onContactClick}>
                {contactLabel}
              </Button>
            </div>
          )}

          {/* Hamburger Button (Mobile Only) */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center p-2 text-slate-700 focus:outline-none"
            onClick={() => setIsMobileOpen((prev) => !prev)}
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileOpen}>
            <span className="relative flex w-8 h-8 items-center justify-center">
              {/* Hamburger icon */}
              <HamburgerIcon
                className={[
                  "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                  "w-7 h-7 transition-all duration-200 ease-out",
                  isMobileOpen ? "opacity-0 scale-95" : "opacity-100 scale-100",
                ].join(" ")}
              />

              {/* Close icon */}
              <CloseIcon
                className={[
                  "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                  "w-5 h-5 transition-all duration-200 ease-out",
                  isMobileOpen ? "opacity-100 scale-100" : "opacity-0 scale-95",
                ].join(" ")}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* MOBILE DRAWER */}
      <div
        className={[
          "md:hidden w-full max-w-6xl overflow-hidden transition-all duration-500 ease-in-out",
          isMobileOpen
            ? "max-h-[500px] opacity-100 mt-4 py-2.5"
            : "max-h-0 opacity-0 mt-0",
        ].join(" ")}>
        <div className="flex flex-col items-center gap-2.5 bg-white font-medium">
          {items.map((item) => renderNavItem(item, true))}

          {/* 2. Mobile Button (Menggunakan Component Button Kamu) */}
          {!hideContactButton && (
            <>
              {renderNavItem({ label: contactLabel, href: "/contact" }, true)}
            </>
          )}
        </div>
      </div>
    </header>
  );
}
