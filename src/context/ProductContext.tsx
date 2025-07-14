// src/context/ProductContext.tsx
import React, { createContext, useContext } from 'react';

export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
};

const products: Product[] = [
  { id: '1', name: 'Wireless Headphones', price: 99.99, category: 'Electronics', image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=300' },
  //{ id: '9', name: 'Apple', price: 99.99, category: 'Electronics', image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { id: '2', name: 'Fresh apple', price: 4.99, category: 'Groceries', image: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { id: '3', name: 'Cotton T-Shirt', price: 19.99, category: 'Clothing', image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { id: '4', name: 'Smartphone', price: 699.99, category: 'Electronics', image: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { id: '5', name: 'Fresh Bread', price: 2.99, category: 'Groceries', image: 'https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { id: '6', name: 'Running Shoes', price: 89.99, category: 'Sports', image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { id: '7', name: 'Coffee Beans', price: 12.99, category: 'Groceries', image: 'https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { id: '8', name: 'Laptop', price: 999.99, category: 'Electronics', image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=300' },
];

const ProductContext = createContext<Product[]>([]);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ProductContext.Provider value={products}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
