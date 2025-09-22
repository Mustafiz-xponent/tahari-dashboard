import { Product } from "@/types/product";

export interface Category {
  categoryId: string;
  name: string;
  description?: string;
  image?: string;
  accessibleImageUrl?: string;
  products: Product[];
  createdAt: string;
  updatedAt: string;
}
