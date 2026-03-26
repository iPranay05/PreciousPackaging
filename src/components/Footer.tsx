import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0A2540] text-white pt-12 md:pt-24 pb-10 border-t-[6px] md:border-t-[16px] border-[#06182c]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* Top: Brand block */}
        <div className="mb-10 md:mb-16">
          <Link href="/" className="flex items-center gap-3 mb-4 group inline-flex">
            <img src="/images/LOGO.jpg" alt="PreciousPackaging" className="h-14 w-auto object-contain invert mix-blend-screen contrast-125" />
            <span className="font-serif font-medium tracking-wide text-2xl text-white group-hover:opacity-80 transition-opacity">
              Precious<span className="text-white/80">Packaging</span>
            </span>
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-6">
            Sustainable, premium packaging solutions that elevate your brand and protect our planet.
          </p>
          <div className="flex gap-3">
            <a href="#" aria-label="LinkedIn" className="w-9 h-9 rounded-full bg-white/10 hover:bg-white hover:text-[#0A2540] transition-all flex items-center justify-center text-xs font-bold cursor-pointer">In</a>
            <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full bg-white/10 hover:bg-white hover:text-[#0A2540] transition-all flex items-center justify-center text-xs font-bold cursor-pointer">Fb</a>
            <a href="#" aria-label="Twitter" className="w-9 h-9 rounded-full bg-white/10 hover:bg-white hover:text-[#0A2540] transition-all flex items-center justify-center text-xs font-bold cursor-pointer">Tw</a>
          </div>
        </div>

        {/* Nav links: 2 cols on mobile, 3 on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 mb-12">
          <div>
            <h4 className="font-bold uppercase tracking-widest text-[#4169E1] mb-4 text-xs">Shop</h4>
            <ul className="space-y-2.5 text-gray-300 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">Rigid Boxes</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Mailer Boxes</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Standup Pouches</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Custom Printing</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-widest text-[#4169E1] mb-4 text-xs">Company</h4>
            <ul className="space-y-2.5 text-gray-300 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">Our Story</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Sustainability</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <h4 className="font-bold uppercase tracking-widest text-[#4169E1] mb-4 text-xs">Support</h4>
            <ul className="space-y-2.5 text-gray-300 text-sm">
              <li><Link href="/legal/shipping" className="hover:text-white transition-colors">Shipping Policy</Link></li>
              <li><Link href="/legal/refunds" className="hover:text-white transition-colors">Refund &amp; Cancellation</Link></li>
              <li><Link href="/legal/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/legal/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} PreciousPackaging. All rights reserved.</p>
          <div className="flex gap-2 opacity-50">
            <div className="w-10 h-6 bg-white/20 rounded" />
            <div className="w-10 h-6 bg-white/20 rounded" />
            <div className="w-10 h-6 bg-white/20 rounded" />
          </div>
        </div>

      </div>
    </footer>
  );
}
