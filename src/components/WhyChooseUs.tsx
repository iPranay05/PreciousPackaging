import { Leaf, Truck, Palette, IndianRupee } from "lucide-react";

const features = [
  {
    title: "Eco-Friendly Materials",
    description: "Sustainably sourced and fully recyclable luxury packaging.",
    icon: <Leaf className="w-8 h-8 text-brand-brown" strokeWidth={1.5} />,
  },
  {
    title: "Fast Delivery",
    description: "Reliable and rapid shipping to meet your business needs.",
    icon: <Truck className="w-8 h-8 text-brand-brown" strokeWidth={1.5} />,
  },
  {
    title: "Custom Designs",
    description: "Tailor-made solutions to perfectly reflect your brand identity.",
    icon: <Palette className="w-8 h-8 text-brand-brown" strokeWidth={1.5} />,
  },
  {
    title: "Affordable Pricing",
    description: "Premium quality packaging at highly competitive rates.",
    icon: <IndianRupee className="w-8 h-8 text-brand-brown" strokeWidth={1.5} />,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-brand-cream relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-semibold text-brand-dark-brown tracking-tight mb-4">
            Why Choose Us
          </h2>
          <p className="text-brand-charcoal/70 text-lg">
            We combine premium quality with sustainable practices to deliver the finest packaging solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-brand-cream rounded-2xl p-8 shadow-sm border border-brand-brown/10 hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 rounded-full bg-brand-beige flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-normal text-brand-charcoal mb-3">{feature.title}</h3>
              <p className="text-brand-charcoal/70 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
