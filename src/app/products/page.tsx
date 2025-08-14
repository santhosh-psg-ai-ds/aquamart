import { products, categories } from "@/lib/data";
import ProductCard from "@/components/product-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ProductsPage({ searchParams }: { searchParams: { category?: string } }) {
  const { category } = searchParams;

  const filteredProducts = category
    ? products.filter((p) => p.category === category)
    : products;
  
  const selectedCategory = categories.find(c => c.id === category);

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <aside id="categories" className="w-full md:w-1/4 lg:w-1/5">
          <Card>
            <CardHeader>
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <ul className="space-y-2">
                <li>
                  <Button variant={!category ? "secondary" : "ghost"} className="w-full justify-start" asChild>
                    <Link href="/products">All Products</Link>
                  </Button>
                </li>
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <Button variant={category === cat.id ? "secondary" : "ghost"} className="w-full justify-start" asChild>
                      <Link href={`/products?category=${cat.id}`}>{cat.name}</Link>
                    </Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </aside>
        <main className="w-full md:w-3/4 lg:w-4/5">
          <h1 className="text-3xl font-bold mb-8 font-headline">
            {selectedCategory ? selectedCategory.name : 'All Products'}
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p>No products found in this category.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
