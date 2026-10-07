import { electricBeds } from "@/data/electricBeds";

export type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  features: string[];
  details?: { title?: string; items: string[] }[];
  registration?: string;
  image: string;
};

const sharedDetails = electricBeds[0].details;

export const products: Product[] = electricBeds.map((bed) => ({
  id: bed.slug,
  name: bed.name,
  price: bed.price,
  originalPrice: bed.originalPrice,
  category: bed.category,
  features: bed.features,
  details: sharedDetails,
  registration: bed.registration,
  image: bed.image,
}));

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("th-TH", { style: "currency", currency: "THB", maximumFractionDigits: 0 }).format(price);
