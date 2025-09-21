// src/pages/Pagina5.tsx
import React, { useMemo, useState } from "react";

type NftItem = {
  id: string;
  title: string;
  tag: "Free" | "Paid" | "Limited Edition";
  price?: string; // e.g., "10 USDC"
  image: string;
};

const ITEMS: NftItem[] = [
  {
    id: "paris-pass",
    title: "Event Pass: Paris Fashion Week",
    tag: "Free",
    image:
      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAT9Soagb_h8x_EPcGN2oi8WvaYkQ35FwxssWu6cPFfIIhT5EjucJZ83Jhj2CI6tML5hS8Zi3tV-y73tYr5bllMev6Npgm0rEfi5WX06Tn25BkD042j1ufbE-dzLzQ42oqDcmuArm_90rb0qPs3OhqLXt4ZpBQfcoG7FqFpCNIq_9V_0B5mNHXtjrz5HVCQd-wtncMP1csOPss4L-wrU2k0ZIXRIw6KvtRnjkRs7xe_Q9iJ7rbUHSqiMx5oKGhPzuQSSmtI1YX6wzo")',
  },
  {
    id: "riviera-route",
    title: "Premium Route: Italian Riviera",
    tag: "Paid",
    price: "10 USDC",
    image:
      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBaWQbx4MkukK1RhckxCvQ8nTWgrzN1lI_jvWCpbsavXIJli09JcQAmAYYCjYg5a94lU8PTJ1agq6wCKVNmgs7oSvpAxNL_9sf05KxIHKYpsNWSK41-BtwIEkZ4dqCnb83m2E-0FAOaw9X87d9XAYSyLviccLn-LjrCIaD2Y2HN_oE26cRm0SkvpP49hnkmtwpZPMzk8ZoiFKt0vkQ4TSFK8qMD64nCqAsdJxXCawqVE1m4T5R5hcPnBv668ra_EKwPg_bei0KBM7A")',
  },
  {
    id: "fuji-limited",
    title: "Limited Edition: Mount Fuji Sunrise",
    tag: "Limited Edition",
    price: "50 USDC",
    image:
      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBd3ZoRhMfo-gowBGl5wPHNfCHiSdNtJdHyrK0v9I988NJK56vMHMf2jqtB4xubM9czG1XHZoZKbGX0o0y_b-8wR_vmTHqlqpDhdyMCNnanC-92-NCnr63Z8NW8UQUrIID_7ZD0lXwG2Zm6_quw4BkZ-3yLmaTYt5CvyE2oUb6R1UTTbsMAOg_6Rt5tD-Jut3nIpZX5jn9JYjlcZfaWvO1AAsB1z37s8-J8ASCZiCnu0ObXLmdtCW_kcNtRDdjMjsaSODYc-DvY3ag")',
  },
];

type FilterKey = "All" | NftItem["tag"];

const Pagina5: React.FC = () => {
  const [filter, setFilter] = useState<FilterKey>("All");
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  const filtered = useMemo(() => {
    if (filter === "All") return ITEMS;
    return ITEMS.filter((i) => i.tag === filter);
  }, [filter]);

  const selectedCount = useMemo(
    () => Object.values(selected).filter(Boolean).length,
    [selected]
  );

  const toggle = (id: string) =>
    setSelected((s) => ({ ...s, [id]: !s[id] }));

  const handleBuy = () => {
    const ids = Object.entries(selected)
      .filter(([, v]) => v)
      .map(([k]) => k);
    console.log("Buying items:", ids); // hook into your purchase flow here
  };

  return (
    <div
      className="w-full"
      style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}
    >
      {/* Title */}
      <div className="px-1 sm:px-0">
        <h1 className="text-[#0d171c] text-2xl md:text-[32px] font-bold leading-tight">
          NFTs
        </h1>
      </div>

      {/* Filter chips */}
      <div className="flex gap-3 p-3 flex-wrap">
        {(["All", "Free", "Paid", "Limited Edition"] as FilterKey[]).map(
          (key) => {
            const active = filter === key;
            return (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`flex h-8 items-center justify-center gap-x-2 rounded-lg px-4 transition-colors ${
                  active
                    ? "bg-[#0da6f2] text-white"
                    : "bg-[#e7eff4] text-[#0d171c] hover:bg-[#d1e0e8]"
                } text-sm font-medium`}
              >
                {key}
              </button>
            );
          }
        )}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-4">
        {filtered.map((item) => {
          const isSelected = !!selected[item.id];
          return (
            <div
              key={item.id}
              className={`flex flex-col gap-3 pb-3 rounded-lg border ${
                isSelected ? "border-[#0da6f2]" : "border-transparent"
              }`}
            >
              <button
                onClick={() => toggle(item.id)}
                className="relative w-full rounded-lg overflow-hidden group"
                aria-pressed={isSelected}
                aria-label={`Select ${item.title}`}
              >
                <div
                  className="w-full bg-center bg-no-repeat aspect-square bg-cover"
                  style={{ backgroundImage: item.image }}
                />
                {/* Selection halo */}
                <div
                  className={`pointer-events-none absolute inset-0 ring-2 rounded-lg transition ${
                    isSelected ? "ring-[#0da6f2]" : "ring-transparent"
                  }`}
                />
                {/* Check mark */}
                <div
                  className={`absolute top-2 right-2 h-7 w-7 rounded-full flex items-center justify-center transition ${
                    isSelected ? "bg-[#0da6f2] text-white" : "bg-white/80"
                  }`}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 256 256"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34Z" />
                  </svg>
                </div>
              </button>

              <div className="px-1">
                <p className="text-[#0d171c] text-base font-medium leading-normal line-clamp-2">
                  {item.title}
                </p>
                <p className="text-[#49819c] text-sm leading-normal">
                  {item.tag === "Free" ? "Free" : item.price}
                </p>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="p-6 text-sm text-[#98aebc]">
            No items in this category.
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="flex px-4 py-3 justify-end">
        <button
          onClick={handleBuy}
          disabled={selectedCount === 0}
          className="flex min-w-[84px] max-w-[480px] items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#0da6f2] text-white text-sm font-bold tracking-[0.015em] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#0b8cc7] transition-colors"
        >
          {selectedCount > 0 ? `Buy (${selectedCount})` : "Buy"}
        </button>
      </div>
    </div>
  );
};

export default Pagina5;
