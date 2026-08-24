"use client";

import Image from "next/image";
import Link from "next/link";

import { useFavorites } from "@/context/FavoritesContext";


export default function FavoritesPage() {

  const {
    favorites,
    removeFavorite,
  } = useFavorites();


  return (
    <main
      style={{
        maxWidth: "1100px",
        margin: "50px auto",
        padding: "20px",
      }}
    >

      <h1>
        مورد علاقه‌ها ❤️
      </h1>


      {favorites.length === 0 ? (

        <p>
          هنوز محصولی به مورد علاقه‌ها اضافه نکرده‌اید.
        </p>

      ) : (


        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(4,1fr)",
            gap: "25px",
            marginTop: "30px",
          }}
        >

          {favorites.map((product) => (

            <div
              key={product.id}
              style={{
                background: "#fff",
                padding: "15px",
                borderRadius: "20px",
                boxShadow:
                  "0 5px 20px rgba(0,0,0,.08)",
              }}
            >

              <Link
                href={`/products/${product.id}`}
              >

                <Image
                  src={product.image}
                  alt={product.name}
                  width={250}
                  height={250}
                />

              </Link>


              <h3
                style={{
                  color: "#315c3a",
                  marginTop: "15px",
                }}
              >
                {product.name}
              </h3>


              <p
                style={{
                  color: "#315c3a",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                {product.price.toLocaleString()}
                تومان
              </p>


              <button
                onClick={() =>
                  removeFavorite(product.id)
                }
                style={{
                  marginTop: "15px",
                  padding: "8px 15px",
                  borderRadius: "10px",
                  border: "none",
                  backgroundColor: "#f5efe3",
                  color: "#8b3a3a",
                  cursor: "pointer",
                }}
              >
                حذف از علاقه‌مندی
              </button>


            </div>

          ))}


        </div>

      )}

    </main>
  );
}