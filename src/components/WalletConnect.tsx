import { useEffect, useMemo, useRef, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import type { Connector } from "wagmi";
import { baseSepolia } from "wagmi/chains";

type Props = {
  /** smaller height/padding for header use */
  compact?: boolean;
  /** make the button full width (great in mobile menu) */
  fullWidth?: boolean;
  className?: string;
};

export function WalletConnect({ compact = false, fullWidth = false, className = "" }: Props) {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending, error: connectError } = useConnect();
  const { disconnect } = useDisconnect();

  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  const short = useMemo(
    () => (address ? `${address.slice(0, 6)}...${address.slice(-4)}` : ""),
    [address]
  );

  const size = compact ? "h-9 px-3 text-sm" : "h-10 px-4 text-sm";
  const width = fullWidth ? "w-full justify-center" : "";

  if (isConnected) {
    return (
      <div className={`relative flex items-center gap-3 ${className}`}>
        <div className="flex flex-col items-end">
          <span className="text-sm font-medium text-[#0d171c]">{short}</span>
          <span className="text-xs text-[#49819c]">Base Sepolia</span>
        </div>
        <button
          onClick={() => disconnect()}
          className={`inline-flex items-center rounded-lg bg-[#e7eff4] text-[#0d171c] hover:bg-[#d1e0e8] transition-colors ${size}`}
        >
          Disconnect
        </button>
      </div>
    );
  }

  // disconnected
  const hasSingle = connectors.length === 1;

  return (
    <div className={`relative ${className}`} ref={ref}>
      <button
        onClick={() => {
          if (hasSingle) {
            connect({ connector: connectors[0] as Connector, chainId: baseSepolia.id });
          } else {
            setOpen((v) => !v);
          }
        }}
        disabled={isPending}
        className={`inline-flex items-center rounded-lg bg-[#0da6f2] text-white font-medium hover:bg-[#0b8cc7] transition-colors disabled:opacity-50 ${size} ${width}`}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {isPending ? "Connecting…" : "Connect Wallet"}
        {!hasSingle && (
          <svg className="ml-2" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      {!hasSingle && open && (
        <div
          role="menu"
          className="absolute z-50 mt-2 w-56 rounded-lg border border-[#e7eff4] bg-white shadow-lg overflow-hidden"
        >
          {connectors.map((connector) => (
            <button
              key={connector.uid}
              role="menuitem"
              onClick={() => {
                setOpen(false);
                connect({ connector, chainId: baseSepolia.id });
              }}
              disabled={isPending}
              className="w-full text-left px-4 py-2 text-sm hover:bg-[#f1f7fb]"
            >
              Connect with {connector.name}
            </button>
          ))}
        </div>
      )}

      {connectError && (
        <p className="mt-2 text-xs text-red-600">
          {String(connectError?.message ?? "Failed to connect")}
        </p>
      )}
    </div>
  );
}
