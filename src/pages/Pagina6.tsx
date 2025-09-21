// src/pages/Pagina6.tsx
import React, { useState } from "react";

type Method = "bank" | "wallet" | "qr";

const Pagina6: React.FC = () => {
  const [method, setMethod] = useState<Method>("bank");

  return (
    <div
      className="w-full"
      style={{
        // keeps your custom radio dot
        // (Tailwind class: checked:bg-[image:--radio-dot-svg])
        // Note: keep this URL-encoded SVG so quotes don't break.
        ["--radio-dot-svg" as any]:
          "url('data:image/svg+xml,%3csvg viewBox=%270 0 16 16%27 fill=%27rgb(13,166,242)%27 xmlns=%27http://www.w3.org/2000/svg%27%3e%3ccircle cx=%278%27 cy=%278%27 r=%273%27/%3e%3c/svg%3e')",
        fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif',
      }}
    >
      {/* Title */}
      <div className="px-1 sm:px-0">
        <h1 className="text-[#0d171c] text-2xl md:text-[32px] font-bold leading-tight">
          Top up Credits
        </h1>
      </div>

      {/* Content wrapper */}
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left column: Payment method + Balance */}
        <section className="rounded-lg">
          <h3 className="text-[#0d171c] text-lg font-bold tracking-[-0.015em] px-1 sm:px-0 pb-2">
            Payment Method
          </h3>

          <div className="flex flex-col gap-3 p-4">
            <label className="flex items-center gap-4 rounded-lg border border-[#cee0e8] p-[15px]">
              <input
                type="radio"
                name="paymentMethod"
                checked={method === "bank"}
                onChange={() => setMethod("bank")}
                className="h-5 w-5 border-2 border-[#cee0e8] bg-transparent text-transparent checked:border-[#0da6f2] checked:bg-[image:--radio-dot-svg] focus:outline-none focus:ring-0 focus:ring-offset-0"
              />
              <div className="flex grow flex-col">
                <p className="text-[#0d171c] text-sm font-medium leading-normal">
                  Bank Transfer
                </p>
              </div>
            </label>

            <label className="flex items-center gap-4 rounded-lg border border-[#cee0e8] p-[15px]">
              <input
                type="radio"
                name="paymentMethod"
                checked={method === "wallet"}
                onChange={() => setMethod("wallet")}
                className="h-5 w-5 border-2 border-[#cee0e8] bg-transparent text-transparent checked:border-[#0da6f2] checked:bg-[image:--radio-dot-svg] focus:outline-none focus:ring-0 focus:ring-offset-0"
              />
              <div className="flex grow flex-col">
                <p className="text-[#0d171c] text-sm font-medium leading-normal">
                  Crypto Wallet
                </p>
              </div>
            </label>

            <label className="flex items-center gap-4 rounded-lg border border-[#cee0e8] p-[15px]">
              <input
                type="radio"
                name="paymentMethod"
                checked={method === "qr"}
                onChange={() => setMethod("qr")}
                className="h-5 w-5 border-2 border-[#cee0e8] bg-transparent text-transparent checked:border-[#0da6f2] checked:bg-[image:--radio-dot-svg] focus:outline-none focus:ring-0 focus:ring-offset-0"
              />
              <div className="flex grow flex-col">
                <p className="text-[#0d171c] text-sm font-medium leading-normal">
                  QR Code
                </p>
              </div>
            </label>
          </div>

          <h3 className="text-[#0d171c] text-lg font-bold tracking-[-0.015em] px-1 sm:px-0 pb-2 pt-4">
            Balance
          </h3>
          <p className="text-[#0d171c] text-base leading-normal pb-3 pt-1 px-1 sm:px-0">
            Your current balance is <b>1200 credits</b>
          </p>

          {/* Optional CTA (kept simple; wire up later if needed) */}
          <div className="px-1 sm:px-0">
            <button className="inline-flex items-center justify-center rounded-lg h-10 px-4 bg-[#0da6f2] text-white text-sm font-bold tracking-[0.015em] hover:bg-[#0b8cc7] transition-colors">
              Continue
            </button>
          </div>
        </section>

        {/* Right column: Recharge History */}
        <section className="rounded-lg">
          <h3 className="text-[#0d171c] text-lg font-bold tracking-[-0.015em] px-1 sm:px-0 pb-2">
            Recharge History
          </h3>

          <div className="px-1 sm:px-0">
            <div className="overflow-x-auto rounded-lg border border-[#cee0e8] bg-[#f8fbfc]">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-[#f8fbfc]">
                    <th className="px-4 py-3 text-left text-[#0d171c] text-sm font-medium">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-[#0d171c] text-sm font-medium">
                      Type
                    </th>
                    <th className="px-4 py-3 text-left text-[#0d171c] text-sm font-medium">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { date: "2024-07-20", type: "Recharge", amt: "+500" },
                    { date: "2024-07-15", type: "Spending", amt: "-200" },
                    { date: "2024-07-10", type: "Recharge", amt: "+1000" },
                  ].map((row) => (
                    <tr key={row.date} className="border-t border-[#cee0e8]">
                      <td className="h-[56px] px-4 py-2 text-[#49819c] text-sm leading-normal whitespace-nowrap">
                        {row.date}
                      </td>
                      <td className="h-[56px] px-4 py-2 text-[#49819c] text-sm leading-normal whitespace-nowrap">
                        {row.type}
                      </td>
                      <td className="h-[56px] px-4 py-2 text-[#49819c] text-sm leading-normal whitespace-nowrap">
                        {row.amt}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Pagina6;
