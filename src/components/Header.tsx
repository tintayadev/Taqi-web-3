import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { WalletConnect } from "./WalletConnect";
import logo from "/src/assets/Group 5.png";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const linkBase =
    "text-[#0d171c] text-sm font-medium transition-colors hover:text-[#49819c]";
  const active = "text-[#0d171c] font-semibold";
  const inactive = "opacity-90";

  return (
    <header className="border-b border-[#e7eff4] bg-white">
      {/* Mobile row: menu • centered logo • bell */}
      <div className="md:hidden h-14 mx-auto max-w-7xl px-4 flex items-center justify-between">
        <button
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          className="inline-flex items-center justify-center rounded-lg h-9 w-9 border border-[#e7eff4]"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
          >
            <path
              d="M4 6h16M4 12h16M4 18h16"
              stroke="#0d171c"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className="flex items-center justify-center">
          <Link
            to="/home" // or just "/" since your index route is Pagina1
            aria-label="Go to Home"
            className="flex items-center justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0da6f2] rounded"
          >
            <img
              src={logo}
              alt="TAQI logo"
              className="h-7 w-auto object-contain md:h-9"
            />
          </Link>
        </div>

        {/* Bell (link to events for now) */}
        <Link
          to="/events"
          aria-label="Notifications"
          className="inline-flex items-center justify-center rounded-lg h-9 w-9 bg-[#e7eff4] text-[#0d171c] hover:bg-[#d1e0e8] transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="currentColor"
            viewBox="0 0 256 256"
            aria-hidden
          >
            <path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216Z" />
          </svg>
        </Link>
      </div>

      {/* Desktop row: logo • nav • bell • connect */}
      <div className="hidden md:flex h-14 items-center justify-between mx-auto max-w-7xl px-6 lg:px-10">
        <div className="shrink-0 flex items-center">
          <img
            src={logo}
            alt="TAQI logo"
            className="h-9 w-auto object-contain lg:h-10"
          />
        </div>

        <div className="flex items-center gap-8">
          <nav className="hidden md:flex items-center gap-9">
            <NavLink
              to="/home"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? active : inactive}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/routes"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? active : inactive}`
              }
            >
              Routes
            </NavLink>
            <NavLink
              to="/nfts"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? active : inactive}`
              }
            >
              NFTs
            </NavLink>
            <NavLink
              to="/events"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? active : inactive}`
              }
            >
              Events
            </NavLink>
          </nav>

          <Link
            to="/events"
            aria-label="Notifications"
            className="inline-flex items-center justify-center rounded-lg h-10 w-10 bg-[#e7eff4] text-[#0d171c] hover:bg-[#d1e0e8] transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              viewBox="0 0 256 256"
              aria-hidden
            >
              <path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216Z" />
            </svg>
          </Link>

          {/* One clear Connect on desktop */}
          <div className="[&>button]:h-10 [&>button]:text-sm">
            <WalletConnect compact />
          </div>
        </div>
      </div>

      {/* Mobile dropdown: Wallet + nav */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-[#e7eff4] bg-white">
          <div className="mx-auto max-w-7xl px-4 py-3 flex flex-col gap-3 text-sm">
            <div className="flex flex-col gap-1">
              <span className="text-[#49819c] text-xs font-medium uppercase tracking-wide">
                Wallet
              </span>
              <div className="w-full [&>button]:w-full [&>button]:h-10 [&>button]:text-sm">
                <WalletConnect compact fullWidth />
              </div>
            </div>

            <NavLink
              to="/home"
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `py-2 ${isActive ? active : "text-[#0d171c] font-medium"}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/routes"
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `py-2 ${isActive ? active : "text-[#0d171c] font-medium"}`
              }
            >
              Routes
            </NavLink>
            <NavLink
              to="/nfts"
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `py-2 ${isActive ? active : "text-[#0d171c] font-medium"}`
              }
            >
              NFTs
            </NavLink>
            <NavLink
              to="/events"
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `py-2 ${isActive ? active : "text-[#0d171c] font-medium"}`
              }
            >
              Events
            </NavLink>
          </div>
        </nav>
      )}
    </header>
  );
}
