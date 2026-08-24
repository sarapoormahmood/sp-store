"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./ProductCard.module.css";

import { useFavorites } from "@/context/FavoritesContext";

export default function ProductCard({ product }) {

  const {
    toggleFavorite,
    isFavorite,
  } = useFavorites();


  const favorite = isFavorite(product.id);


  function handleFavorite(e) {

    e.preventDefault();
    e.stopPropagation();

    toggleFavorite(product);
  }


  return (

    <Link
      href={`/products/${product.id}`}
      className={styles.link}
    >

      <div className={styles.card}>


        <button
          className={`${styles.favorite} ${favorite ? styles.favoriteActive : ""
            }`}
          onClick={handleFavorite}
          aria-label="افزودن به مورد علاقه"
        >
          {favorite ? "♥" : "♡"}
        </button>


        <div className={styles.imageBox}>

          <Image
            src={product.image}
            alt={product.name}
            width={250}
            height={250}
          />

        </div>


        <h3>
          {product.name}
        </h3>


        <p className={styles.price}>
          {product.price.toLocaleString()} تومان
        </p>


      </div>

    </Link>
  );
}