// src/pages/Pagina3.tsx
import React, { useMemo, useState } from "react";

type Place = { title: string; status: string };

const PLACES: Place[] = [
  { title: "Golden Gate Bridge", status: "Completed" },
  { title: "Fisherman's Wharf", status: "Completed" },
  { title: "Alcatraz Island", status: "Completed" },
  { title: "Lombard Street", status: "Completed" },
  { title: "Cable Cars", status: "Completed" },
  { title: "Golden Gate Park", status: "Completed" },
  { title: "Painted Ladies", status: "Completed" },
  { title: "Golden Gate Bridge Photo Spot", status: "Completed" },
];

const Pagina3: React.FC = () => {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PLACES;
    return PLACES.filter((p) => p.title.toLowerCase().includes(q));
  }, [query]);

  return (
    <div
      className="w-full"
      style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}
    >
      {/* Title */}
      <div className="px-1 sm:px-0">
        <h1 className="text-[#0d171c] text-2xl md:text-[32px] font-bold leading-tight">
          Route Progress
        </h1>
      </div>

      {/* Hero with search + map controls */}
      <section className="@container mt-3">
        <div className="@[480px]:px-4 @[480px]:py-3">
          <div
            className="relative bg-cover bg-center min-h-[280px] md:min-h-[320px] flex flex-col justify-between rounded-none @[480px]:rounded-lg"
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDw_V1EQHY1PMYZhUVFnrBA-vs1T1AOifTL2zd-oA-7nZokkc9FyEw3R5IEC28M-2rkagm0IhJvY0EjDMn9cUPGfn-Z5MeOE4i_aTG3xeIPVBUoIoyhZIv5JPqWex_0niTp1F8siPoA1XcmEfCZ6-SljYSOglQy4LEHWFIQnJMFn4qhK_YnSPdDfONkrU5-d4h6hwwwsC4yf2NT7J87fWwImZAEC0002VEFClpPc5NGXRmmK0o0ADGLXaC1XdzDx66s86apUfemWn4")',
            }}
          >
            {/* Search */}
            <div className="px-4 pt-4 md:px-8 md:pt-8">
              <label className="block w-full max-w-md" aria-label="Search places on this route">
                <div className="flex items-stretch h-12 min-w-40">
                  <span className="inline-flex items-center justify-center pl-4 pr-2 rounded-l-lg bg-[#f8fbfc] text-[#49819c]">
                    {/* Magnifier */}
                    <svg width="22" height="22" viewBox="0 0 256 256" fill="currentColor" aria-hidden>
                      <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
                    </svg>
                  </span>
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search places on this route"
                    className="flex w-full min-w-0 flex-1 rounded-r-lg bg-[#f8fbfc] text-[#0d171c] placeholder:text-[#49819c] px-4 text-base focus:outline-none"
                  />
                </div>
              </label>
            </div>

            {/* Map controls (right side) */}
            <div className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
              <div className="flex flex-col gap-0.5">
                <button
                  className="flex size-10 items-center justify-center rounded-t-lg bg-[#f8fbfc] shadow-[0_2px_4px_rgba(0,0,0,0.1)]"
                  aria-label="Zoom in"
                >
                  <svg width="22" height="22" viewBox="0 0 256 256" fill="currentColor" aria-hidden>
                    <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z" />
                  </svg>
                </button>
                <button
                  className="flex size-10 items-center justify-center rounded-b-lg bg-[#f8fbfc] shadow-[0_2px_4px_rgba(0,0,0,0.1)]"
                  aria-label="Zoom out"
                >
                  <svg width="22" height="22" viewBox="0 0 256 256" fill="currentColor" aria-hidden>
                    <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128Z" />
                  </svg>
                </button>
              </div>
              <button
                className="flex size-10 items-center justify-center rounded-lg bg-[#f8fbfc] shadow-[0_2px_4px_rgba(0,0,0,0.1)]"
                aria-label="Center on my position"
              >
                <svg width="22" height="22" viewBox="0 0 256 256" fill="currentColor" aria-hidden>
                  <path d="M229.33,98.21,53.41,33l-.16-.05A16,16,0,0,0,32.9,53.25a1,1,0,0,0,.05.16L98.21,229.33A15.77,15.77,0,0,0,113.28,240h.3a15.77,15.77,0,0,0,15-11.29l23.56-76.56,76.56-23.56a16,16,0,0,0,.62-30.38ZM224,113.3l-76.56,23.56a16,16,0,0,0-10.58,10.58L113.3,224h0l-.06-.17L48,48l175.82,65.22.16.06Z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Places to Visit */}
      <h2 className="text-[#0d171c] text-[20px] md:text-[22px] font-bold leading-tight tracking-[-0.015em] px-1 sm:px-0 pb-3 pt-5">
        Places to Visit
      </h2>

      <ul className="rounded-lg overflow-hidden">
        {filtered.map((p) => (
          <li key={p.title} className="flex items-center gap-4 bg-[#f8fbfc] px-4 min-h-[72px] py-2">
            <div
              className="text-[#0d171c] flex items-center justify-center rounded-lg bg-[#e7eff4] shrink-0 size-12"
              aria-hidden
            >
              {/* CheckCircle */}
              <svg width="22" height="22" viewBox="0 0 256 256" fill="currentColor">
                <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
              </svg>
            </div>
            <div className="flex flex-col justify-center min-w-0">
              <p className="text-[#0d171c] text-base font-medium leading-normal truncate">{p.title}</p>
              <p className="text-[#49819c] text-sm leading-normal truncate">{p.status}</p>
            </div>
          </li>
        ))}
        {filtered.length === 0 && (
          <li className="px-4 py-6 text-sm text-[#98aebc]">No places match your search.</li>
        )}
      </ul>

      {/* CTA */}
      <div className="flex px-1 sm:px-0 py-4 justify-center">
        <button className="flex min-w-[84px] max-w-[480px] items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#0da6f2] text-white text-sm font-bold tracking-[0.015em]">
          <span className="truncate">Upload Proof</span>
        </button>
      </div>
    </div>
  );
};

export default Pagina3;
