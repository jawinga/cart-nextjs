"use client";
import React, { useEffect } from "react";
import CardProduct from "./CardProduct";
import { Product } from "../models/Product";
import { CartItemProps } from "../reducers/ReducerCart";

interface ProductListProps {
  addItem: (item: CartItemProps) => void;
}

const ProductList = ({ addItem }: ProductListProps) => {
  const [products, setProducts] = React.useState<Product[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));

    return () => controller.abort();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 col-span-3">
      {products.map((p) => {
        return (
          <CardProduct key={p.id} product={p} addItem={addItem}></CardProduct>
        );
      })}
    </div>
  );
};

export default ProductList;
