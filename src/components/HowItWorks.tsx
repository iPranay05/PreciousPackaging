export default function HowItWorks() {
  const steps = [
    { number: "01", title: "SELECT", desc: "Choose your ideal sustainable packaging format from our curated premium collection." },
    { number: "02", title: "CUSTOMIZE", desc: "Upload your logo or artwork using our interactive 3D design studio." },
    { number: "03", title: "PRODUCE", desc: "We manufacture your boxes with eco-friendly inks and FSC-certified materials." },
    { number: "04", title: "DELIVER", desc: "Receive your stunning packaging in completely carbon-neutral shipping." }
  ];

  return (
    <section className="py-24 bg-[#1a1a1a]" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">HOW IT WORKS</h2>
          <p className="text-gray-400 font-medium max-w-2xl mx-auto">From concept to delivery in four simple steps.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 relative">
          
          {/* Connecting line for desktop */}
          <div className="hidden lg:block absolute top-[20%] left-10 right-10 h-0.5 bg-gray-800 -z-0"></div>

          {steps.map((step, i) => (
            <div key={i} className="flex flex-col relative z-10 w-full">
              <div className="w-16 h-16 rounded-full bg-[#0A2540] text-white flex items-center justify-center font-black text-2xl mb-6 shadow-xl shrink-0">
                {step.number}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-widest">{step.title}</h3>
              <p className="text-gray-400 leading-relaxed pr-4">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
