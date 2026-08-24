import styles from "./CategoryMenu.module.css";

export default function CategoryMenu() {
  const categories = [
    "تی‌شرت",
    "شلوار",
    "کفش",
    "شومیز",
    "کلاه",
    "تاپ",
  ];

  return (
    <div className={styles.categoryMenu}>
      {categories.map((category) => (
        <span key={category}>
          {category}
        </span>
      ))}
    </div>
  );
}