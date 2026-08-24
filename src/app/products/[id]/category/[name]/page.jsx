import products from "@/data/products";
import ProductCard from "@/components/common/ProductCard/ProductCard";


export default async function CategoryPage({ params }) {

  const { name } = await params;


  const categoryProducts = products.filter((product) =>
    product.category === name
  );


  return (
    <main>

      <h1>
        محصولات {name}
      </h1>


      <div>

        {categoryProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}

      </div>


    </main>
  );
}