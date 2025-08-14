import { products } from "@/lib/data";
import { notFound } from "next/navigation";
import ProductDetail from "./product-detail";

export async function generateStaticParams() {
    return products.map(product => ({
        id: product.id
    }))
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}
