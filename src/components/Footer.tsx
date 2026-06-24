import Link from "next/link";
import { Linkedin, Instagram, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#2C1E16] text-[#FAF6F0]/80 pt-16 pb-8 relative border-t border-[#FAF6F0]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 5-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Column 1: Brand block */}
          <div className="lg:col-span-1 flex flex-col justify-start">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group inline-flex">
              <img 
                src="/images/image.png" 
                alt="PreciousPack" 
                className="h-10 w-auto object-contain mix-blend-screen brightness-200" 
              />
              <span className="font-serif text-2xl font-bold text-white tracking-wide group-hover:opacity-90 transition-opacity">
                Precious<span className="font-normal font-sans text-white/90">Pack</span>
              </span>
            </Link>
            <h4 className="text-[10px] font-sans font-bold text-[#D4AF37] tracking-[0.2em] uppercase mb-3">
              Elegance Meets Sustainability
            </h4>
            <p className="text-xs text-[#FAF6F0]/70 leading-relaxed mb-5 max-w-sm">
              Manufacturers of premium luxury packaging solutions that elevate your brand and protect our planet.
            </p>
            {/* Social Icons */}
            <div className="flex gap-2.5">
              <a 
                href="https://www.linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full border border-[#FAF6F0]/20 flex items-center justify-center text-[#FAF6F0]/80 hover:bg-[#FAF6F0] hover:text-[#2C1E16] hover:border-[#FAF6F0] transition-colors duration-300"
              >
                <Linkedin size={15} />
              </a>
              <a 
                href="https://www.instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram"
                className="w-9 h-9 rounded-full border border-[#FAF6F0]/20 flex items-center justify-center text-[#FAF6F0]/80 hover:bg-[#FAF6F0] hover:text-[#2C1E16] hover:border-[#FAF6F0] transition-colors duration-300"
              >
                <Instagram size={15} />
              </a>
              <a 
                href="https://wa.me/919082289062" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-full border border-[#FAF6F0]/20 flex items-center justify-center text-[#FAF6F0]/80 hover:bg-[#FAF6F0] hover:text-[#2C1E16] hover:border-[#FAF6F0] transition-colors duration-300"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.966C16.59 2.01 14.116.99 11.487.99 6.05 10.99 1.624 5.361 1.62 10.79c-.001 1.705.46 3.37 1.332 4.832l-.99 3.618 3.71-.973zm11.758-6.196c-.322-.162-1.905-.941-2.199-1.049-.294-.108-.508-.162-.722.162-.214.32-.829 1.049-1.016 1.262-.188.214-.374.241-.696.079-.322-.162-1.358-.501-2.586-1.599-.954-.852-1.6-1.905-1.787-2.22-.188-.32-.02-.493.141-.654.145-.145.322-.379.483-.568.161-.19.215-.324.322-.541.108-.217.054-.407-.027-.569-.08-.162-.722-1.741-.99-2.39-.26-.628-.526-.543-.722-.553l-.615-.01c-.214 0-.562.08-.856.406-.294.32-1.123 1.101-1.123 2.684 0 1.583 1.15 3.111 1.31 3.328.16.216 2.263 3.456 5.483 4.851.765.332 1.363.53 1.83.678.769.245 1.469.21 2.023.128.618-.093 1.905-.78 2.172-1.53.267-.749.267-1.39.188-1.53-.08-.138-.294-.22-.616-.382z"/>
                </svg>
              </a>
              <a 
                href="mailto:Preciouspack1@gmail.com" 
                aria-label="Mail"
                className="w-9 h-9 rounded-full border border-[#FAF6F0]/20 flex items-center justify-center text-[#FAF6F0]/80 hover:bg-[#FAF6F0] hover:text-[#2C1E16] hover:border-[#FAF6F0] transition-colors duration-300"
              >
                <Mail size={15} />
              </a>
            </div>
          </div>

          {/* Column 2: Shop */}
          <div>
            <h4 className="font-sans font-bold text-[10px] uppercase tracking-[0.2em] text-white mb-5">Shop</h4>
            <ul className="space-y-3 text-xs text-[#FAF6F0]/70 font-sans">
              <li><Link href="/products?category=ring-boxes" className="hover:text-white transition-colors">Ring Boxes</Link></li>
              <li><Link href="/products?category=earring-boxes" className="hover:text-white transition-colors">Earring Boxes</Link></li>
              <li><Link href="/products?category=necklace-boxes" className="hover:text-white transition-colors">Necklace Boxes</Link></li>
              <li><Link href="/products?category=drawer-boxes" className="hover:text-white transition-colors">Drawer Boxes</Link></li>
              <li><Link href="/products?category=paper-bags" className="hover:text-white transition-colors">Pouches & Bags</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">All Products</Link></li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="font-sans font-bold text-[10px] uppercase tracking-[0.2em] text-white mb-5">Company</h4>
            <ul className="space-y-3 text-xs text-[#FAF6F0]/70 font-sans">
              <li><Link href="/#why-choose-us" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/#our-process" className="hover:text-white transition-colors">Our Process</Link></li>
              <li><Link href="/#why-choose-us" className="hover:text-white transition-colors">Why Choose Us</Link></li>
              <li><Link href="/#why-choose-us" className="hover:text-white transition-colors">Sustainability</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 4: Support */}
          <div>
            <h4 className="font-sans font-bold text-[10px] uppercase tracking-[0.2em] text-white mb-5">Support</h4>
            <ul className="space-y-3 text-xs text-[#FAF6F0]/70 font-sans">
              <li><Link href="/legal/shipping" className="hover:text-white transition-colors">Shipping Policy</Link></li>
              <li><Link href="/legal/refunds" className="hover:text-white transition-colors">Refund & Cancellation</Link></li>
              <li><Link href="/legal/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/legal/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/#faq" className="hover:text-white transition-colors">FAQs</Link></li>
            </ul>
          </div>

          {/* Column 5: Contact Us */}
          <div className="flex flex-col col-span-1 sm:col-span-2 md:col-span-1">
            <h4 className="font-sans font-bold text-[10px] uppercase tracking-[0.2em] text-white mb-5">Contact Us</h4>
            <ul className="space-y-3.5 text-xs text-[#FAF6F0]/70 font-sans">
              <li className="flex items-start gap-2.5">
                <MapPin size={15} className="mt-0.5 text-[#D4AF37] flex-shrink-0" />
                <span>Mumbai, Maharashtra, India</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={14} className="text-[#D4AF37] flex-shrink-0" />
                <a href="tel:+919082289062" className="hover:text-white transition-colors">+91 90822 89062</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={14} className="text-[#D4AF37] flex-shrink-0" />
                <a href="mailto:Preciouspack1@gmail.com" className="hover:text-white transition-colors">Preciouspack1@gmail.com</a>
              </li>
            </ul>
            
            {/* WHATSAPP US CTA */}
            <a 
              href="https://wa.me/919082289062" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-[#FAF6F0] text-[#2C1E16] hover:bg-[#FAF6F0]/90 font-sans text-xs tracking-wider uppercase font-bold rounded-full transition-colors w-full sm:w-auto justify-center"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.966C16.59 2.01 14.116.99 11.487.99 6.05 10.99 1.624 5.361 1.62 10.79c-.001 1.705.46 3.37 1.332 4.832l-.99 3.618 3.71-.973zm11.758-6.196c-.322-.162-1.905-.941-2.199-1.049-.294-.108-.508-.162-.722.162-.214.32-.829 1.049-1.016 1.262-.188.214-.374.241-.696.079-.322-.162-1.358-.501-2.586-1.599-.954-.852-1.6-1.905-1.787-2.22-.188-.32-.02-.493.141-.654.145-.145.322-.379.483-.568.161-.19.215-.324.322-.541.108-.217.054-.407-.027-.569-.08-.162-.722-1.741-.99-2.39-.26-.628-.526-.543-.722-.553l-.615-.01c-.214 0-.562.08-.856.406-.294.32-1.123 1.101-1.123 2.684 0 1.583 1.15 3.111 1.31 3.328.16.216 2.263 3.456 5.483 4.851.765.332 1.363.53 1.83.678.769.245 1.469.21 2.023.128.618-.093 1.905-.78 2.172-1.53.267-.749.267-1.39.188-1.53-.08-.138-.294-.22-.616-.382z"/>
              </svg>
              WHATSAPP US
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#FAF6F0]/10 flex flex-col md:flex-row justify-center items-center text-[11px] text-[#FAF6F0]/40 font-sans tracking-wide">
          <p>© 2026 Precious Pack. All rights reserved.</p>
        </div>

      </div>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/919082289062"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4.5 rounded-full shadow-lg hover:scale-110 hover:bg-[#20ba5a] transition-all duration-300 flex items-center justify-center cursor-pointer group"
        aria-label="Contact us on WhatsApp"
      >
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.966C16.59 2.01 14.116.99 11.487.99 6.05 10.99 1.624 5.361 1.62 10.79c-.001 1.705.46 3.37 1.332 4.832l-.99 3.618 3.71-.973zm11.758-6.196c-.322-.162-1.905-.941-2.199-1.049-.294-.108-.508-.162-.722.162-.214.32-.829 1.049-1.016 1.262-.188.214-.374.241-.696.079-.322-.162-1.358-.501-2.586-1.599-.954-.852-1.6-1.905-1.787-2.22-.188-.32-.02-.493.141-.654.145-.145.322-.379.483-.568.161-.19.215-.324.322-.541.108-.217.054-.407-.027-.569-.08-.162-.722-1.741-.99-2.39-.26-.628-.526-.543-.722-.553l-.615-.01c-.214 0-.562.08-.856.406-.294.32-1.123 1.101-1.123 2.684 0 1.583 1.15 3.111 1.31 3.328.16.216 2.263 3.456 5.483 4.851.765.332 1.363.53 1.83.678.769.245 1.469.21 2.023.128.618-.093 1.905-.78 2.172-1.53.267-.749.267-1.39.188-1.53-.08-.138-.294-.22-.616-.382z"/>
        </svg>
      </a>
    </footer>
  );
}

