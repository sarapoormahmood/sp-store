import { prisma } from "@/lib/prisma";

export async function GET() {
  const product = await prisma.product.create({
    data: {
      name: "تی‌شرت ساده",
      description: "تی‌شرت ساده و مینیمال",
      price: 850000,
      image: "/images/products/tshirt2.jpg",
      category: "تی‌شرت",
      color: "مشکی",
      size: "M",
      stock: 10,
    },
  });

  return Response.json(product);
}