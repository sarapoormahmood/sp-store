import Link from "next/link";
import Image from "next/image";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <section className={styles.hero}>

      <div className={styles.content}>
        <h1>
          استایل خودت را پیدا کن
        </h1>

        <p>
          جدیدترین لباس‌ها با طراحی ساده و خاص برای انتخابی متفاوت
        </p>

        <Link
          href="/products"
          className={styles.productsButton}
        >
          مشاهده محصولات
        </Link>
      </div>


      <div className={styles.imageBox}>
        <Image
          src="/images/categories/cat.jpg"
          alt="S&P fashion"
          width={400}
          height={400}
        />
      </div>

    </section>
  );
}