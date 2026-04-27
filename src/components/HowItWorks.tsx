export default function HowItWorks() {
  const steps = [
    { number: "01", title: "SELECT", desc: "Choose your ideal sustainable packaging format from our curated premium collection." },
    { number: "02", title: "CUSTOMIZE", desc: "Upload your logo or artwork using our interactive 3D design studio." },
    { number: "03", title: "PRODUCE", desc: "We manufacture your boxes with eco-friendly inks and FSC-certified materials." },
    { number: "04", title: "DELIVER", desc: "Receive your stunning packaging in completely carbon-neutral shipping." }
  ];

  return (
    <section className="py-20 lg:py-24 bg-brand-charcoal relative overflow-hidden" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-brand-cream tracking-tight mb-4">How It Works</h2>
          <p className="text-brand-beige/70 font-light text-base lg:text-lg max-w-2xl mx-auto">
            From concept to delivery in four simple steps.
          </p>
        </div>

        {/* Horizontal scroll container for mobile, Grid for desktop */}
        <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 pb-8 -mx-4 px-4 md:mx-0 md:px-0">
          
          {steps.map((step, i) => (
            <div 
              key={i} 
              className="flex flex-col relative z-10 w-[85vw] max-w-[300px] snap-center flex-shrink-0 md:w-auto md:max-w-none bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-colors group"
            >
              <div className="w-14 h-14 rounded-full bg-brand-dark-brown border border-brand-brown/30 text-brand-cream flex items-center justify-center font-serif text-xl mb-6 shadow-xl shrink-0 group-hover:scale-110 transition-transform duration-300">
                {step.number}
              </div>
              <h3 className="text-lg md:text-xl font-serif text-white mb-3 tracking-widest uppercase">{step.title}</h3>
              <p className="text-brand-beige/70 leading-relaxed text-sm font-light">
                {step.desc}
              </p>
            </div>
          ))}

        </div>
      </div>

      {/* Decorative background gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-dark-brown/30 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-brown/20 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>
    </section>
  );
}
