"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./Navbar.module.css";

import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";

export default function Navbar() {
  const router = useRouter();

  const { cartItems } = useCart();
  const { favorites } = useFavorites();

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const favoriteCount = favorites.length;

  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    async function getUser() {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();

        setUser(data.user);
      } catch (error) {
        console.error("Error getting user:", error);
        setUser(null);
      } finally {
        setLoadingUser(false);
      }
    }

    getUser();
  }, []);

  async function handleLogout() {
    try {
      setLoggingOut(true);

      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (!res.ok) {
        throw new Error("خروج ناموفق بود");
      }

      setUser(null);
      setShowMenu(false);

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
      alert("خروج از حساب با خطا مواجه شد");
    } finally {
      setLoggingOut(false);
    }
  }

  return (
    <nav className={styles.navbar}>
      {/* لوگو */}
      <div className={styles.logo}>
        S&P
      </div>

      {/* جستجو */}
      <div className={styles.search}>
        <input
          type="text"
          placeholder="جستجو در محصولات..."
        />
      </div>

      {/* دکمه‌ها */}
      <div className={styles.actions}>
        {/* علاقه‌مندی‌ها */}
        <Link
          href="/favorites"
          className={styles.favorite}
        >
          <span>
            {favoriteCount > 0 ? "♥" : "♡"}
          </span>

          {favoriteCount > 0 && (
            <span className={styles.favoriteCount}>
              {favoriteCount}
            </span>
          )}
        </Link>

        {/* سبد خرید */}
        <Link
          href="/cart"
          className={styles.cart}
        >
          <span>🛒</span>

          {cartCount > 0 && (
            <span className={styles.cartCount}>
              {cartCount}
            </span>
          )}
        </Link>

        {/* کاربر */}
        {!loadingUser && (
          user ? (
            <div
              style={{
                position: "relative",
              }}
            >
              <button
                type="button"
                onClick={() => setShowMenu(!showMenu)}
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  fontSize: "15px",
                  color: "#315c3a",
                  fontWeight: "bold",
                }}
              >
                {user.name} ▾
              </button>

              {showMenu && (
                <div
                  style={{
                    position: "absolute",
                    top: "40px",
                    right: "0",
                    width: "170px",
                    background: "white",
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    padding: "8px",
                    boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
                    zIndex: 1000,
                  }}
                >


                  <button
                    type="button"
                    onClick={handleLogout}
                    disabled={loggingOut}
                    style={{
                      width: "100%",
                      border: "none",
                      background: "transparent",
                      padding: "10px",
                      textAlign: "right",
                      cursor: loggingOut
                        ? "not-allowed"
                        : "pointer",
                      color: "#b42318",
                    }}
                  >
                    {loggingOut
                      ? "در حال خروج..."
                      : "خروج از حساب"}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className={styles.authLinks}>
              <Link href="/login">
                ورود
              </Link>

              <span>|</span>

              <Link href="/register">
                ثبت‌نام
              </Link>
            </div>
          )
        )}
      </div>
    </nav>
  );
}