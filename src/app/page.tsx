import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import FeaturedProducts from "@/components/FeaturedProducts";
import Categories from "@/components/Categories";
import AboutUs from "@/components/AboutUs";
import WhyChooseUs from "@/components/WhyChooseUs";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import PromoBanner from "@/components/PromoBanner";
// import Newsletter from "@/components/Newsletter";
import InstagramFeed from "@/components/InstagramFeed";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen relative font-sans break-words w-[100vw] overflow-x-hidden">
      <Header />
      <Hero />
      <Marquee />
      <WhyChooseUs />
      <FeaturedProducts />
      <Categories />
      <AboutUs />
      <HowItWorks />
      <Testimonials />
      {/* <PromoBanner /> */}
      {/* <Newsletter /> */}
      <InstagramFeed />
      <FAQ />
      <Footer />
    </main>
  );
}
