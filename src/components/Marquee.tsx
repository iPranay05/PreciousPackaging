export default function Marquee() {
  const brands = [
    "VOGUE", "FORBES", "GQ", "ELLE", "WIRED", "TECHCRUNCH", "VANITY FAIR", "TIME"
  ];

  return (
    <section className="w-full bg-brand-dark-brown py-6 border-y border-white/10 overflow-hidden flex whitespace-nowrap">
      <div className="animate-[marquee_20s_linear_infinite] flex items-center gap-16 lg:gap-32 pr-16 lg:pr-32">
        {brands.map((brand, i) => (
          <span key={i} className="text-xl sm:text-2xl font-semibold text-white opacity-80 tracking-widest">{brand}</span>
        ))}
      </div>
      <div className="animate-[marquee_20s_linear_infinite] flex items-center gap-16 lg:gap-32 pr-16 lg:pr-32" aria-hidden="true">
        {brands.map((brand, i) => (
          <span key={`clone-${i}`} className="text-xl sm:text-2xl font-semibold text-white opacity-80 tracking-widest">{brand}</span>
        ))}
      </div>
    </section>
  );
}
