"use client";

import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);


  function addToCart(product) {
    setCartItems((prev) => {

      const existingItem = prev.find(
        (item) =>
          item.id === product.id &&
          item.selectedColor === product.selectedColor &&
          item.selectedSize === product.selectedSize
      );


      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id &&
            item.selectedColor === product.selectedColor &&
            item.selectedSize === product.selectedSize
            ? {
              ...item,
              quantity: item.quantity + 1,
            }
            : item
        );
      }


      return [
        ...prev,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  }


  function removeFromCart(id, selectedColor, selectedSize) {
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !(
            item.id === id &&
            item.selectedColor === selectedColor &&
            item.selectedSize === selectedSize
          )
      )
    );
  }


  function increaseQuantity(id, selectedColor, selectedSize) {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id &&
          item.selectedColor === selectedColor &&
          item.selectedSize === selectedSize
          ? {
            ...item,
            quantity: item.quantity + 1,
          }
          : item
      )
    );
  }


  function decreaseQuantity(id, selectedColor, selectedSize) {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id &&
            item.selectedColor === selectedColor &&
            item.selectedSize === selectedSize
            ? {
              ...item,
              quantity: item.quantity - 1,
            }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }


  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}


export function useCart() {
  return useContext(CartContext);
}