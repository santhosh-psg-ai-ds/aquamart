import { products } from "@/lib/data";
import ProductCard from "@/components/product-card";

export default function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const query = searchParams.q || "";
  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.description.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <h1 className="text-3xl font-bold mb-2 font-headline">
        Search Results for &quot;{query}&quot;
      </h1>
      <p className="text-muted-foreground mb-8">
        {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"} found.
      </p>
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold mb-2">No products found</h2>
          <p className="text-muted-foreground">Try a different search term or browse our categories.</p>
        </div>
      )}
    </div>
  );
}
