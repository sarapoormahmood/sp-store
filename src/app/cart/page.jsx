"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import styles from "./cart.module.css";

function getColorCode(color) {
  const colors = {
    "سفید": "#ffffff",
    "مشکی": "#000000",
    "آبی": "#0000ff",
    "کرمی": "#f5f5dc",
    "سبز": "#2e8b57",
    "لیمویی": "#dfff00",
    "صورتی": "#ffc0cb",
    "قهوه‌ای": "#8b4513",
  };

  return colors[color] || "#ddd";
}

export default function CartPage() {

  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();


  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );


  if (cartItems.length === 0) {
    return (
      <main className={styles.cart}>

        <h1 className={styles.title}>
          سبد خرید
        </h1>

        <div className={styles.empty}>
          <h2>
            سبد خرید شما خالی است
          </h2>

          <p>
            هنوز محصولی به سبد خرید اضافه نکرده‌اید.
          </p>

          <br />

          <Link
            href="/"
            className={styles.continue}
          >
            ادامه خرید
          </Link>
        </div>

      </main>
    );
  }


  return (
    <main className={styles.cart}>

      <h1 className={styles.title}>
        سبد خرید
      </h1>


      {cartItems.map((item, index) => (

        <div
          key={`${item.id}-${item.selectedColor}-${item.selectedSize}-${index}`}
          className={styles.item}
        >

          <Image
            src={item.image}
            alt={item.name}
            width={150}
            height={150}
            className={styles.image}
          />


          <div className={styles.info}>

            <h2 className={styles.name}>
              {item.name}
            </h2>


            <p className={styles.price}>
              {item.price.toLocaleString()} تومان
            </p>


            <div className={styles.colorRow}>

              <span>
                رنگ:
              </span>

              <span
                className={styles.color}
                style={{
                  backgroundColor: getColorCode(
                    item.selectedColor
                  ),
                }}
              />

              <span>
                رنگ انتخاب‌شده: {String(item.selectedColor)}
              </span>

            </div>


            <p className={styles.size}>
              سایز: {item.selectedSize}
            </p>


            <div className={styles.quantity}>

              <button
                onClick={() =>
                  increaseQuantity(
                    item.id,
                    item.selectedColor,
                    item.selectedSize
                  )
                }
              >
                +
              </button>


              <span>
                {item.quantity}
              </span>


              <button
                onClick={() =>
                  decreaseQuantity(
                    item.id,
                    item.selectedColor,
                    item.selectedSize
                  )
                }
              >
                −
              </button>

            </div>


            <button
              className={styles.remove}
              onClick={() =>
                removeFromCart(
                  item.id,
                  item.selectedColor,
                  item.selectedSize
                )
              }
            >
              حذف محصول
            </button>

          </div>

        </div>

      ))}


      <div className={styles.summary}>

        <h2>
          جمع کل:
        </h2>

        <p className={styles.total}>
          {totalPrice.toLocaleString()} تومان
        </p>


        <div className={styles.buttons}>

          <Link
            href="/"
            className={styles.continue}
          >
            ادامه خرید
          </Link>


          <button className={styles.checkout}>
            تکمیل سفارش
          </button>

        </div>

      </div>

    </main>
  );
}