import { Product } from "@/types/product";

export interface Farmer {
  address: string;
  contactInfo: string;
  farmName: string;
  farmerId: string;
  name: string;
  products?: Product[];
  createdAt?: string;
  updatedAt?: string;
}
