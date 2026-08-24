"use client";

import { useEffect, useState } from "react";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const colors = [
    "سفید",
    "مشکی",
    "آبی",
    "کرمی",
    "سبز",
    "لیمویی",
    "صورتی",
    "قهوه ای",
  ];

  const sizes = [
    "XS",
    "S",
    "M",
    "L",
    "XL",
    "XXL",
    "فری سایز",
  ];

  const emptyForm = {
    name: "",
    description: "",
    price: "",
    image: "",
    category: "تی‌شرت",
    colors: [],
    sizes: [],
    stock: "",
  };

  const [form, setForm] = useState(emptyForm);

  async function loadProducts() {
    try {
      const res = await fetch("/api/products");

      if (!res.ok) {
        throw new Error("خطا در دریافت محصولات");
      }

      const data = await res.json();

      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  function handleChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleImageUpload(e) {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("لطفاً یک فایل تصویری انتخاب کن.");
      return;
    }

    try {
      setUploadingImage(true);

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload/image", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "آپلود عکس ناموفق بود");
      }

      setForm((prev) => ({
        ...prev,
        image: data.image,
      }));
    } catch (error) {
      console.error(error);
      alert("آپلود عکس با خطا مواجه شد");
    } finally {
      setUploadingImage(false);
    }
  }

  function toggleColor(color) {
    setForm((prev) => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors.filter((item) => item !== color)
        : [...prev.colors, color],
    }));
  }

  function toggleSize(size) {
    setForm((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((item) => item !== size)
        : [...prev.sizes, size],
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const method = editingId ? "PUT" : "POST";

      const body = {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        image: form.image,
        category: form.category,
        colors: form.colors,
        sizes: form.sizes,
        stock: Number(form.stock) || 0,
      };

      if (editingId) {
        body.id = editingId;
      }

      const res = await fetch("/api/products", {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        throw new Error("خطا در ذخیره محصول");
      }

      setForm(emptyForm);
      setEditingId(null);

      await loadProducts();
    } catch (error) {
      console.error(error);
      alert("ذخیره محصول با خطا مواجه شد");
    }
  }

  function handleEdit(product) {
    setEditingId(product.id);

    setForm({
      name: product.name,
      description: product.description || "",
      price: product.price,
      image: product.image,
      category: product.category,

      colors: product.colors
        ? product.colors.map((color) => color.name)
        : [],

      sizes: product.sizes
        ? product.sizes.map((size) => size.name)
        : [],

      stock: product.stock,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
  }

  async function handleDelete(id, name) {
    const confirmed = window.confirm(
      `آیا از حذف «${name}» مطمئنی؟`
    );

    if (!confirmed) {
      return;
    }

    try {
      const res = await fetch("/api/products", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      });

      if (!res.ok) {
        throw new Error("خطا در حذف محصول");
      }

      if (editingId === id) {
        cancelEdit();
      }

      await loadProducts();
    } catch (error) {
      console.error(error);
      alert("حذف محصول با خطا مواجه شد");
    }
  }

  return (
    <main
      style={{
        padding: "40px",
        maxWidth: "1000px",
        margin: "0 auto",
        direction: "rtl",
      }}
    >
      <h1>مدیریت محصولات S&P</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gap: "12px",
          marginTop: "30px",
          marginBottom: "50px",
        }}
      >
        <h2>
          {editingId ? "ویرایش محصول" : "افزودن محصول"}
        </h2>

        <input
          name="name"
          placeholder="نام محصول"
          value={form.name}
          onChange={handleChange}
          required
        />

        <div>
          <h3>عکس محصول</h3>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />

          {uploadingImage && (
            <p>در حال آپلود عکس...</p>
          )}

          {form.image && (
            <div style={{ marginTop: "15px" }}>
              <img
                src={form.image}
                alt="پیش‌نمایش محصول"
                style={{
                  width: "180px",
                  height: "180px",
                  objectFit: "cover",
                  borderRadius: "12px",
                }}
              />
            </div>
          )}
        </div>

        <textarea
          name="description"
          placeholder="توضیحات محصول"
          value={form.description}
          onChange={handleChange}
        />

        <input
          name="price"
          type="number"
          placeholder="قیمت"
          value={form.price}
          onChange={handleChange}
          required
        />

        <input
          name="image"
          placeholder="/images/products/example.jpg"
          value={form.image}
          onChange={handleChange}
          required
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
        >
          <option value="تی‌شرت">تی‌شرت</option>
          <option value="شلوار">شلوار</option>
          <option value="شومیز">شومیز</option>
          <option value="کفش">کفش</option>
          <option value="کلاه">کلاه</option>
          <option value="تاپ">تاپ</option>
        </select>

        <div>
          <h3>رنگ‌های محصول</h3>

          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            {colors.map((color) => {
              const selected = form.colors.includes(color);

              return (
                <button
                  key={color}
                  type="button"
                  onClick={() => toggleColor(color)}
                  style={{
                    padding: "10px 15px",
                    borderRadius: "8px",
                    border: selected
                      ? "2px solid #315c3a"
                      : "1px solid #ccc",
                    backgroundColor: selected
                      ? "#315c3a"
                      : "#f8f5ed",
                    color: selected ? "white" : "#333",
                    cursor: "pointer",
                  }}
                >
                  {selected ? "✓ " : ""}
                  {color}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <h3>سایزهای محصول</h3>

          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            {sizes.map((size) => {
              const selected = form.sizes.includes(size);

              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => toggleSize(size)}
                  style={{
                    minWidth: "55px",
                    padding: "10px 15px",
                    borderRadius: "8px",
                    border: selected
                      ? "2px solid #315c3a"
                      : "1px solid #ccc",
                    backgroundColor: selected
                      ? "#315c3a"
                      : "#f8f5ed",
                    color: selected ? "white" : "#333",
                    cursor: "pointer",
                  }}
                >
                  {selected ? "✓ " : ""}
                  {size}
                </button>
              );
            })}
          </div>
        </div>

        <input
          name="stock"
          type="number"
          placeholder="موجودی"
          value={form.stock}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {editingId
            ? "ذخیره تغییرات"
            : "افزودن محصول"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={cancelEdit}
          >
            لغو ویرایش
          </button>
        )}
      </form>

      <h2>محصولات موجود</h2>

      {loading ? (
        <p>در حال بارگذاری...</p>
      ) : products.length === 0 ? (
        <p>هنوز محصولی وجود ندارد.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gap: "15px",
            marginTop: "20px",
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              style={{
                border: "1px solid #ddd",
                padding: "15px",
                borderRadius: "10px",
              }}
            >
              <strong>{product.name}</strong>

              <p>
                {product.price.toLocaleString()} تومان
              </p>

              <p>
                دسته‌بندی: {product.category}
              </p>

              <p>
                رنگ‌ها:{" "}
                {product.colors?.length > 0
                  ? product.colors
                    .map((color) => color.name)
                    .join("، ")
                  : "ثبت نشده"}
              </p>

              <p>
                سایزها:{" "}
                {product.sizes?.length > 0
                  ? product.sizes
                    .map((size) => size.name)
                    .join("، ")
                  : "ثبت نشده"}
              </p>

              <p>
                موجودی: {product.stock}
              </p>

              <button
                type="button"
                onClick={() => handleEdit(product)}
                style={{
                  marginLeft: "10px",
                  padding: "8px 15px",
                  cursor: "pointer",
                }}
              >
                ویرایش
              </button>

              <button
                type="button"
                onClick={() =>
                  handleDelete(
                    product.id,
                    product.name
                  )
                }
                style={{
                  padding: "8px 15px",
                  cursor: "pointer",
                }}
              >
                حذف محصول
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}