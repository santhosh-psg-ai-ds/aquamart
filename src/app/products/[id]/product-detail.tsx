"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { useUserActivity } from "@/hooks/use-user-activity";
import type { Product } from "@/lib/types";
import { categories } from "@/lib/data";
import Link from "next/link";

export default function ProductDetail({ product }: { product: Product }) {
  const { addBrowsingHistory } = useUserActivity();

  useEffect(() => {
    addBrowsingHistory(product.name);
  }, [product.name, addBrowsingHistory]);

  const categoryName = categories.find(c => c.id === product.category)?.name || product.category;

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div className="aspect-square relative rounded-lg overflow-hidden shadow-lg">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            data-ai-hint={product.imageHint}
          />
        </div>
        <div className="flex flex-col justify-center">
          <Badge asChild variant="secondary" className="w-fit mb-2">
             <Link href={`/products?category=${product.category}`}>{categoryName}</Link>
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 font-headline">{product.name}</h1>
          <p className="text-muted-foreground text-lg mb-6">{product.description}</p>
          <div className="flex items-center justify-between mb-8">
            <p className="text-4xl font-bold text-primary">₹{product.price.toFixed(2)}</p>
          </div>
          <Button size="lg" className="w-full md:w-auto bg-accent text-accent-foreground hover:bg-accent/90">
            <ShoppingCart className="mr-2 h-5 w-5" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
