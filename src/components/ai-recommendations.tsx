"use client";

import { useEffect, useState } from "react";
import { useUserActivity } from "@/hooks/use-user-activity";
import { productRecommendations } from "@/ai/flows/product-recommendations";
import { products } from "@/lib/data";
import ProductCard from "./product-card";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export default function AiRecommendations() {
  const { browsingHistory, searchQueries } = useUserActivity();
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // only fetch recommendations if there is some activity
    if (browsingHistory || searchQueries) {
      setIsLoading(true);
      productRecommendations({ browsingHistory, searchQueries })
        .then((res) => {
          setRecommendations(res.recommendedProducts);
        })
        .catch(console.error)
        .finally(() => setIsLoading(false));
    }
  }, [browsingHistory, searchQueries]);

  const recommendedProducts = recommendations
    .map(name => products.find(p => p.name.toLowerCase() === name.toLowerCase()))
    .filter((p): p is NonNullable<typeof p> => p !== undefined)
    .slice(0, 4); // Limit to 4 recommendations

  if (!isLoading && recommendedProducts.length === 0) {
    return null; // Don't show the component if there's nothing to recommend
  }

  return (
    <section id="recommendations">
      <Card className="bg-card/50">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center mb-2 font-headline">Just for You</CardTitle>
          <p className="text-muted-foreground text-center">AI-powered recommendations based on your activity.</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {isLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex flex-col space-y-3">
                        <Skeleton className="h-[125px] w-full rounded-xl" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-[250px]" />
                            <Skeleton className="h-4 w-[200px]" />
                        </div>
                    </div>
                ))
            ) : (
                recommendedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
