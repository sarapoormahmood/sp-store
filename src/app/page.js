import Navbar from "@/components/layout/Navbar/Navbar";
import CategorySection from "@/components/home/CategorySection/CategorySection";
import HeroSection from "@/components/home/HeroSection/HeroSection";
import ProductSection from "@/components/home/ProductSection/ProductSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <CategorySection />
      <ProductSection />
    </>
  );
}
