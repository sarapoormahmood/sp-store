import styles from "./CategoryPage.module.css";
import ProductCard from "@/components/common/ProductCard/ProductCard";
import { prisma } from "@/lib/prisma";

const categories = {
  tshirt: "تی‌شرت",
  pants: "شلوار",
  shoes: "کفش",
  shirt: "شومیز",
  hat: "کلاه",
  top: "تاپ",
};

export default async function CategoryPage({ params }) {
  const { slug } = await params;

  const categoryName = categories[slug];

  if (!categoryName) {
    return (
      <main className={styles.page}>
        <h1>دسته‌بندی پیدا نشد</h1>
      </main>
    );
  }

  const products = await prisma.product.findMany({
    where: {
      category: categoryName,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      colors: true,
      sizes: true,
    },
  });

  return (
    <main className={styles.page}>
      <h1>{categoryName}</h1>

      {products.length === 0 ? (
        <p className={styles.empty}>
          هنوز محصولی در این دسته‌بندی وجود ندارد.
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