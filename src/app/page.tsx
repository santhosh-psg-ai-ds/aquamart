import { products } from "@/lib/data";
import ProductCard from "@/components/product-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import AiRecommendations from "@/components/ai-recommendations";
import Image from "next/image";

export default function Home() {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <section className="relative w-full h-[50vh] rounded-lg overflow-hidden mb-12">
        <Image
          src="https://placehold.co/1200x600"
          alt="Hero background with various colorful fish and corals"
          data-ai-hint="underwater coral"
          fill
          className="object-cover"
        />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white bg-black/50 p-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 font-headline">
            Dive Into a New World
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mb-8">
            Discover the best aquatic products, from vibrant fish to state-of-the-art aquarium gear at AquaMart.
          </p>
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/products">Shop All Products</Link>
          </Button>
        </div>
      </section>

      <section id="featured-products" className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8 font-headline">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <AiRecommendations />
    </div>
  );
}
