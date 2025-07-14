// src/context/ProductContext.tsx
import React, { createContext, useContext } from "react";

export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
};

const products: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    price: 99.99,
    category: "Electronics",
    image:
      "https://images.pexels.com/photos/3945667/pexels-photo-3945667.jpeg?auto=compress&cs=tinysrgb&w=300",
  },
  {
    id: "2",
    name: "Organic Apples",
    price: 4.99,
    category: "Groceries",
    image:
      "https://images.pexels.com/photos/192930/pexels-photo-192930.jpeg?auto=compress&cs=tinysrgb&w=300",
  },
  {
    id: "3",
    name: "Cotton T‑Shirt",
    price: 19.99,
    category: "Clothing",
    image:
      "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=300",
  },
  {
    id: "4",
    name: "Smartphone",
    price: 699.99,
    category: "Electronics",
    image:
      "https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=300",
  },
  {
    id: "5",
    name: "Fresh Bread",
    price: 2.99,
    category: "Groceries",
    image:
      "https://images.pexels.com/photos/14565951/pexels-photo-14565951.jpeg?auto=compress&cs=tinysrgb&w=300",
  },
  {
    id: "6",
    name: "Running Shoes",
    price: 89.99,
    category: "Sports",
    image:
      "https://images.pexels.com/photos/414029/pexels-photo-414029.jpeg?auto=compress&cs=tinysrgb&w=300",
  },
  {
    id: "7",
    name: "Coffee Beans",
    price: 12.99,
    category: "Groceries",
    image:
      "https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=300",
  },
  {
    id: "8",
    name: "Laptop",
    price: 999.99,
    category: "Electronics",
    image:
      "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=300",
  },
  {
    id: "9",
    name: "Bluetooth Speaker",
    price: 49.99,
    category: "Electronics",
    image:
      "https://images.pexels.com/photos/14309806/pexels-photo-14309806.jpeg",
  },
  {
    id: "10",
    name: "Organic Bananas",
    price: 3.99,
    category: "Groceries",
    image: "https://images.pexels.com/photos/5966630/pexels-photo-5966630.jpeg",
  },
  {
    id: "11",
    name: "Denim Jeans",
    price: 39.99,
    category: "Clothing",
    image: "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg",
  },
  {
    id: "12",
    name: "Fitness Tracker",
    price: 59.99,
    category: "Electronics",
    image: "https://images.pexels.com/photos/2779018/pexels-photo-2779018.jpeg",
  },
  {
    id: "13",
    name: "Almond Milk",
    price: 3.49,
    category: "Groceries",
    image: "https://images.pexels.com/photos/3735209/pexels-photo-3735209.jpeg",
  },
  {
    id: "14",
    name: "Graphic Hoodie",
    price: 29.99,
    category: "Clothing",
    image:
      "https://images.pexels.com/photos/24244065/pexels-photo-24244065.jpeg",
  },
  {
    id: "15",
    name: "Yoga Mat",
    price: 24.99,
    category: "Sports",
    image: "https://images.pexels.com/photos/2394051/pexels-photo-2394051.jpeg",
  },
  {
    id: "16",
    name: "Protein Bar",
    price: 2.49,
    category: "Groceries",
    image:
      "https://images.pexels.com/photos/14416430/pexels-photo-14416430.jpeg",
  },
  {
    id: "17",
    name: "LED Desk Lamp",
    price: 34.99,
    category: "Electronics",
    image:
      "https://images.pexels.com/photos/15519510/pexels-photo-15519510.jpeg",
  },
  {
    id: "18",
    name: "Water Bottle (Stainless Steel)",
    price: 15.99,
    category: "Sports",
    image: "https://images.pexels.com/photos/1188649/pexels-photo-1188649.jpeg",
  },
  {
    id: "19",
    name: "Fresh Salad Mix",
    price: 5.99,
    category: "Groceries",
    image: "https://images.pexels.com/photos/4198015/pexels-photo-4198015.jpeg",
  },
  {
    id: "20",
    name: "Wireless Mouse",
    price: 25.99,
    category: "Electronics",
    image:
      "https://images.pexels.com/photos/32967173/pexels-photo-32967173.jpeg",
  },
  {
    id: "21",
    name: "Cotton Socks (Pack of 5)",
    price: 12.99,
    category: "Clothing",
    image: "https://images.pexels.com/photos/9587954/pexels-photo-9587954.jpeg",
  },
  {
    id: "22",
    name: "Basketball",
    price: 19.99,
    category: "Sports",
    image: "https://images.pexels.com/photos/1462618/pexels-photo-1462618.jpeg",
  },
  {
    id: "23",
    name: "Greek Yogurt",
    price: 1.99,
    category: "Groceries",
    image: "https://images.pexels.com/photos/4006347/pexels-photo-4006347.jpeg",
  },
  {
    id: "24",
    name: "Baseball Cap",
    price: 14.99,
    category: "Clothing",
    image: "https://images.pexels.com/photos/1124465/pexels-photo-1124465.jpeg",
  },
  {
    id: "25",
    name: "Digital Alarm Clock",
    price: 29.99,
    category: "Electronics",
    image:
      "https://images.pexels.com/photos/25781690/pexels-photo-25781690.jpeg",
  },
  {
    id: "26",
    name: "Organic Honey Jar",
    price: 8.99,
    category: "Groceries",
    image: "https://images.pexels.com/photos/8140790/pexels-photo-8140790.jpeg",
  },
  {
    id: "27",
    name: "Swim Goggles",
    price: 16.99,
    category: "Sports",
    image: "https://images.pexels.com/photos/8028456/pexels-photo-8028456.jpeg",
  },
  {
    id: "28",
    name: "Tailored Blazer",
    price: 59.99,
    category: "Clothing",
    image: "https://images.pexels.com/photos/1450114/pexels-photo-1450114.jpeg",
  },
  {
    id: "29",
    name: "Electric Toothbrush",
    price: 39.99,
    category: "Electronics",
    image: "https://images.pexels.com/photos/8823972/pexels-photo-8823972.jpeg",
  },
  {
    id: "30",
    name: "Protein Powder",
    price: 24.99,
    category: "Groceries",
    image:
      "https://images.pexels.com/photos/31555272/pexels-photo-31555272.jpeg",
  },
];

const ProductContext = createContext<Product[]>([]);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ProductContext.Provider value={products}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);