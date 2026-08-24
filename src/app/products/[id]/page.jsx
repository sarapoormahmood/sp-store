"use client";

import Link from "next/link";
import Image from "next/image";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useCart } from "@/context/CartContext";

export default function ProductPage({ params }) {
  const router = useRouter();
  const resolvedParams = use(params);

  const id = Number(resolvedParams.id);

  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    async function loadProduct() {
      try {
        const res = await fetch("/api/products");

        if (!res.ok) {
          throw new Error("خطا در دریافت محصولات");
        }

        const products = await res.json();

        const foundProduct = products.find(
          (item) => item.id === id
        );

        setProduct(foundProduct || null);

        if (foundProduct) {
          const productColors =
            foundProduct.colors?.map(
              (color) => color.name
            ) || [];

          const productSizes =
            foundProduct.sizes?.map(
              (size) => size.name
            ) || [];

          setSelectedColor(productColors[0] || "");
          setSelectedSize(productSizes[0] || "");
        }
      } catch (error) {
        console.error(error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <main
        style={{
          padding: "40px",
          direction: "rtl",
        }}
      >
        <p>در حال بارگذاری محصول...</p>
      </main>
    );
  }

  if (!product) {
    return (
      <main
        style={{
          padding: "40px",
          direction: "rtl",
        }}
      >
        <h1>محصول پیدا نشد</h1>

        <Link href="/products">
          بازگشت به محصولات
        </Link>
      </main>
    );
  }

  const productColors =
    product.colors?.map(
      (color) => color.name
    ) || [];

  const productSizes =
    product.sizes?.map(
      (size) => size.name
    ) || [];

  function handleAddToCart() {
    addToCart({
      ...product,
      selectedColor,
      selectedSize,
      quantity: 1,
    });

    router.push("/cart");
  }

  return (
    <main
      style={{
        padding: "40px",
        direction: "rtl",
      }}
    >
      <Image
        src={product.image}
        alt={product.name}
        width={400}
        height={400}
        style={{
          objectFit: "cover",
          borderRadius: "12px",
        }}
      />

      <h1>{product.name}</h1>

      {product.description && (
        <p>{product.description}</p>
      )}

      <h2>
        {product.price.toLocaleString()} تومان
      </h2>

      {/* رنگ‌ها */}
      {productColors.length > 0 && (
        <>
          <h3>انتخاب رنگ:</h3>

          <div>
            {productColors.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() =>
                  setSelectedColor(color)
                }
                style={{
                  margin: "5px",
                  padding: "8px 15px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  border:
                    selectedColor === color
                      ? "2px solid #315c3a"
                      : "1px solid #ddd",
                  background:
                    selectedColor === color
                      ? "#315c3a"
                      : "#f5efe3",
                  color:
                    selectedColor === color
                      ? "#fff"
                      : "#333",
                }}
              >
                {color}
              </button>
            ))}
          </div>
        </>
      )}

      {/* سایزها */}
      {productSizes.length > 0 && (
        <>
          <h3>انتخاب سایز:</h3>

          <div>
            {productSizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() =>
                  setSelectedSize(size)
                }
                style={{
                  margin: "5px",
                  padding: "8px 15px",
                  cursor: "pointer",
                  background:
                    selectedSize === size
                      ? "#315c3a"
                      : "#eee",
                  color:
                    selectedSize === size
                      ? "#fff"
                      : "#000",
                  border: "none",
                  borderRadius: "6px",
                }}
              >
                {size}
              </button>
            ))}
          </div>
        </>
      )}

      <button
        type="button"
        onClick={handleAddToCart}
        style={{
          marginTop: "20px",
          padding: "12px 25px",
          cursor: "pointer",
          backgroundColor: "#315c3a",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
        }}
      >
        افزودن به سبد خرید
      </button>

      <br />
      <br />

      <Link href="/cart">
        مشاهده سبد خرید
      </Link>
    </main>
  );
}