import Image from "next/image";
import Link from "next/link";
import styles from "./CategorySection.module.css";

export default function CategorySection() {
  const categories = [
    {
      slug: "tshirt",
      name: "تی‌شرت",
      image: "/images/categories/tshirt.jpg",
    },
    {
      slug: "pants",
      name: "شلوار",
      image: "/images/categories/pants.jpg",
    },
    {
      slug: "shoes",
      name: "کفش",
      image: "/images/categories/shoes.jpg",
    },
    {
      slug: "shirt",
      name: "شومیز",
      image: "/images/categories/shirt.jpg",
    },
    {
      slug: "hat",
      name: "کلاه",
      image: "/images/categories/hat.jpg",
    },
    {
      slug: "top",
      name: "تاپ",
      image: "/images/categories/top.jpg",
    },
  ];

  return (
    <section className={styles.categorySection}>
      <h2>دسته‌بندی محصولات</h2>

      <div className={styles.categoryGrid}>
        {categories.map((category) => (
          <Link
            href={`/category/${category.slug}`}
            key={category.slug}
            className={styles.link}
          >

            <div className={styles.card}>

              <Image
                src={category.image}
                alt={category.name}
                width={500}
                height={500}
              />

              <h3>
                {category.name}
              </h3>

            </div>

          </Link>
        ))}
      </div>
    </section>
  );
}