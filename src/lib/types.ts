export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  imageHint: string;
  category: string;
  tags?: string[];
};

export type Category = {
  id: string;
  name: string;
};
