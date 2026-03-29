"use client";

export default function Newsletter() {
  return (
    <section className="w-full py-24 bg-brand-cream" id="newsletter">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-semibold text-black tracking-tighter mb-4">JOIN THE MOVEMENT</h2>
        <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
          Subscribe to our newsletter and get <strong className="text-black">10% off</strong> your first order of sustainable packaging.
        </p>
        
        <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
                type="email" 
                placeholder="Enter your email address" 
                className="w-full sm:w-2/3 px-6 py-4 border-2 border-gray-200 focus:border-black outline-none transition-colors text-lg"
                required
            />
            <button 
                type="submit"
                className="w-full sm:w-1/3 px-6 py-4 bg-black text-white font-normal uppercase tracking-widest hover:bg-brand-dark-brown hover:text-white transition-colors"
            >
                Subscribe
            </button>
        </form>
        <p className="text-xs text-gray-400 mt-4">By subscribing, you agree to our Terms of Service and Privacy Policy.</p>
      </div>
    </section>
  );
}
