"use client";

import styles from "./ProductsPage.module.css";
import { useEffect, useState } from "react";
import ProductCard from "@/components/common/ProductCard/ProductCard";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch("/api/products");

        if (!response.ok) {
          throw new Error("خطا در دریافت محصولات");
        }

        const data = await response.json();

        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>
        همه محصولات
      </h1>

      {loading ? (
        <p className={styles.empty}>
          در حال بارگذاری محصولات...
        </p>
      ) : products.length === 0 ? (
        <p className={styles.empty}>
          هنوز محصولی اضافه نشده است.
        </p>
      ) : (
        <div className={styles.productsGrid}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}
    </main>
  );
}