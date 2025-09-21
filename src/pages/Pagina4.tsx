// src/pages/Pagina4.tsx
import React from "react";
import minft from "/src/assets/Presentación Tecnología Diseño Web colorida sencilla moderna5.png";

const Pagina4: React.FC = () => {
  return (
    <div
      className="w-full"
      style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}
    >
      {/* Page title */}
      <div className="px-1 sm:px-0">
        <h1 className="text-[#0d171c] text-2xl md:text-[32px] font-bold leading-tight">
          Unlocked NFT
        </h1>
      </div>

      {/* NFT + details */}
      <section className="mt-3">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4">
          {/* NFT media */}
          <div className="@container">
            <div className="w-full overflow-hidden rounded-lg bg-[#f8fbfc]">
              <div
                className="aspect-[2/3] bg-cover bg-center"
                style={{ backgroundImage: `url(${minft})` }}
                aria-label="Unlocked NFT artwork"
              />
            </div>
          </div>

          {/* Details / actions */}
          <div className="flex flex-col">
            <h2 className="text-[#0d171c] text-[20px] md:text-[22px] font-bold tracking-[-0.015em]">
              Cultural Artifact
            </h2>
            <p className="text-[#0d171c] text-base leading-normal mt-2">
              This NFT represents a traditional artifact from the region, symbolizing its rich
              cultural heritage. It’s a unique digital collectible that captures the essence of
              local artistry and history.
            </p>

            {/* Primary actions */}
            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              <button className="inline-flex items-center justify-center rounded-lg h-10 px-4 bg-[#0da6f2] text-white text-sm font-bold tracking-[0.015em] hover:bg-[#0b8cc7] transition-colors">
                Save to Collection
              </button>
              <button className="inline-flex items-center justify-center rounded-lg h-10 px-4 bg-[#e7eff4] text-[#0d171c] text-sm font-bold tracking-[0.015em] hover:bg-[#d1e0e8] transition-colors">
                Share on Social Media
              </button>
            </div>

            {/* Secondary action */}
            <div className="mt-3">
              <button className="inline-flex items-center justify-center rounded-lg h-10 px-4 bg-[#e7eff4] text-[#0d171c] text-sm font-bold tracking-[0.015em] hover:bg-[#d1e0e8] transition-colors">
                List for Sale
              </button>
            </div>

            {/* Transaction */}
            <div className="mt-6">
              <h3 className="text-[#0d171c] text-[18px] md:text-[20px] font-bold tracking-[-0.015em]">
                Transaction Confirmation
              </h3>
              <p className="text-[#0d171c] text-sm leading-normal mt-2">
                Transaction ID:
                <span className="ml-2 inline-block rounded bg-[#f1f7fb] px-2 py-1 font-mono text-[12px] text-[#0d171c]">
                  0xabc123def4567890…
                </span>
                <span className="ml-2 text-[#49819c]">(Blockchain Confirmation)</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pagina4;
