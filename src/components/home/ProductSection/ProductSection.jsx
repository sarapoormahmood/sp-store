"use client";

import { useEffect, useState } from "react";
import styles from "./ProductSection.module.css";
import ProductCard from "@/components/common/ProductCard/ProductCard";

export default function ProductSection() {
  const [products, setProducts] = useState([]);
  const [price, setPrice] = useState("all");
  const [color, setColor] = useState("all");
  const [size, setSize] = useState("all");

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();

        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error("داده محصولات آرایه نیست:", data);
          setProducts([]);
        }
      } catch (error) {
        console.error("خطا در دریافت محصولات:", error);
      }
    }

    loadProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const priceMatch =
      price === "all" ||
      (price === "under1" && product.price < 1000000) ||
      (price === "1to2" &&
        product.price >= 1000000 &&
        product.price <= 2000000) ||
      (price === "over2" && product.price > 2000000);

    const colorMatch =
      color === "all" ||
      product.colors?.some(
        (item) => item.name === color
      );

    const sizeMatch =
      size === "all" ||
      product.sizes?.some(
        (item) => item.name === size
      );

    return priceMatch && colorMatch && sizeMatch;
  });

  return (
    <section className={styles.productsSection}>
      <h2>جدیدترین محصولات</h2>

      {/* فیلترها */}
      <div className={styles.filters}>

        {/* قیمت */}
        <select
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        >
          <option value="all">همه قیمت‌ها</option>
          <option value="under1">زیر ۱ میلیون</option>
          <option value="1to2">۱ تا ۲ میلیون</option>
          <option value="over2">بیشتر از ۲ میلیون</option>
        </select>

        {/* رنگ */}
        <select
          value={color}
          onChange={(e) => setColor(e.target.value)}
        >
          <option value="all">همه رنگ‌ها</option>
          <option value="سفید">سفید</option>
          <option value="مشکی">مشکی</option>
          <option value="آبی">آبی</option>
          <option value="کرمی">کرمی</option>
          <option value="سبز">سبز</option>
          <option value="لیمویی">لیمویی</option>
          <option value="صورتی">صورتی</option>
          <option value="قهوه‌ای">قهوه‌ای</option>
        </select>

        {/* سایز */}
        <select
          value={size}
          onChange={(e) => setSize(e.target.value)}
        >
          <option value="all">همه سایزها</option>
          <option value="XS">XS</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
          <option value="XXL">XXL</option>
          <option value="فری‌سایز">فری‌سایز</option>
        </select>

      </div>

      {/* محصولات */}
      <div className={styles.productsGrid}>
        {filteredProducts.length > 0 ? (
          filteredProducts.slice(0, 8).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))
        ) : (
          <p>محصولی با این مشخصات پیدا نشد.</p>
        )}
      </div>
    </section>
  );
}