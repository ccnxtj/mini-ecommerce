export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
};

export const brands = ["ASICS", "Nike", "PUMA", "New Balance", "adidas", "Mizuno", "HOKA"];

const loremDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

export const products: Product[] = [
  { id: "1", name: "ASICS Megablast", price: 5325, category: "รองเท้าวิ่ง", description: loremDescription, image: "/products/1013a170-500-asics-megablast-edo-purple-black-1-sq.webp" },
  { id: "2", name: "Nike Vomero Plus", price: 4125, category: "รองเท้าวิ่ง", description: loremDescription, image: "/products/nike-vomero-plus-rev-online-7153798.webp" },
  { id: "3", name: "PUMA Fast-R Nitro Elite 3", price: 6675, category: "รองเท้าวิ่ง", description: loremDescription, image: "/products/FAST-R-NITRO™-Elite-3-Running-Shoes-Women.jpg" },
  { id: "4", name: "New Balance SC Elite v5", price: 4706, category: "รองเท้าวิ่ง", description: loremDescription, image: "/products/NE081SH346EPTH-0.webp" },
  { id: "5", name: "adidas Boston 13", price: 4350, category: "รองเท้าวิ่ง", description: loremDescription, image: "/products/boston-13-white.png" },
  { id: "6", name: "ASICS Nimbus 27", price: 3525, category: "รองเท้าวิ่ง", description: loremDescription, image: "/products/AS206SH227EQTH-0.webp" },
  { id: "7", name: "Mizuno Neo Vista 2", price: 3761, category: "รองเท้าวิ่ง", description: loremDescription, image: "/products/th-11134207-81zto-mh19koulfk0bed.jpg" },
  { id: "8", name: "ASICS Novablast 5", price: 3705, category: "รองเท้าวิ่ง", description: loremDescription, image: "/products/th-11134207-7rash-m9y96gni92i9df.jpg" },
  { id: "9", name: "HOKA Rocket 3", price: 4794, category: "รองเท้าวิ่ง", description: loremDescription, image: "/products/hoka-rocket-x-3-rev-online-7998427_e9d6be70-b3f7-4f1b-bcce-d2a1fda8c047.jpg" },
  { id: "10", name: "adidas EVO SL", price: 4012, category: "รองเท้าวิ่ง", description: loremDescription, image: "/products/evo-sl-white.png" },
];

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("th-TH", { style: "currency", currency: "THB", maximumFractionDigits: 0 }).format(price);
