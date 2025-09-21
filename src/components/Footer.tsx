export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 text-xs text-[#98aebc]">
        © {new Date().getFullYear()} TAQI
      </div>
    </footer>
  );
}
