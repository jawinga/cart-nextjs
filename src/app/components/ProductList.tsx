"use client";
import React, { useEffect } from "react";
import CardProduct from "./CardProduct";
import type { Product } from "../models/Product";
import type { CartItemProps } from "../reducers/ReducerCart";

interface ProductListProps {
  addItem: (item: CartItemProps) => void;
  handleTotalPrice: (item: number, actionButton: string) => void;
  totalPrice: number;
}

const ProductList = ({
  addItem,
  handleTotalPrice,
  totalPrice,
}: ProductListProps) => {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const controller = new AbortController();

    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    return () => controller.abort();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
              <div className="mb-4 h-48 rounded-xl bg-slate-200 dark:bg-slate-700" />
              <div className="space-y-3">
                <div className="h-4 rounded bg-slate-200 dark:bg-slate-700" />
                <div className="h-4 w-2/3 rounded bg-slate-200 dark:bg-slate-700" />
                <div className="flex justify-between">
                  <div className="h-6 w-16 rounded bg-slate-200 dark:bg-slate-700" />
                  <div className="h-10 w-24 rounded-xl bg-slate-200 dark:bg-slate-700" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {products.map((p) => {
        return (
          <CardProduct
            key={p.id}
            product={p}
            addItem={addItem}
            totalPrice={totalPrice}
            handleTotalPrice={handleTotalPrice}
          />
        );
      })}
    </div>
  );
};

export default ProductList;
