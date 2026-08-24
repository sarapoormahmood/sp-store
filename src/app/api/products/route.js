import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        colors: true,
        sizes: true,
      },
    });

    return Response.json(products);
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "خطا در دریافت محصولات" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    const colors = Array.isArray(body.colors)
      ? body.colors
      : [];

    const sizes = Array.isArray(body.sizes)
      ? body.sizes
      : [];

    const product = await prisma.product.create({
      data: {
        name: body.name,
        description: body.description || null,
        price: Number(body.price),
        image: body.image,
        category: body.category,
        stock: Number(body.stock) || 0,

        colors: {
          create: colors.map((color) => ({
            name: color,
          })),
        },

        sizes: {
          create: sizes.map((size) => ({
            name: size,
          })),
        },
      },

      include: {
        colors: true,
        sizes: true,
      },
    });

    return Response.json(product, {
      status: 201,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "خطا در ایجاد محصول" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();

    const id = Number(body.id);

    if (!id) {
      return Response.json(
        { error: "شناسه محصول نامعتبر است" },
        { status: 400 }
      );
    }

    const colors = Array.isArray(body.colors)
      ? body.colors
      : [];

    const sizes = Array.isArray(body.sizes)
      ? body.sizes
      : [];

    const product = await prisma.product.update({
      where: {
        id: id,
      },

      data: {
        name: body.name,
        description: body.description || null,
        price: Number(body.price),
        image: body.image,
        category: body.category,
        stock: Number(body.stock) || 0,

        colors: {
          deleteMany: {},

          create: colors.map((color) => ({
            name: color,
          })),
        },

        sizes: {
          deleteMany: {},

          create: sizes.map((size) => ({
            name: size,
          })),
        },
      },

      include: {
        colors: true,
        sizes: true,
      },
    });

    return Response.json(product);
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "خطا در ویرایش محصول" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const body = await request.json();

    const id = Number(body.id);

    if (!id) {
      return Response.json(
        { error: "شناسه محصول نامعتبر است" },
        { status: 400 }
      );
    }

    await prisma.product.delete({
      where: {
        id: id,
      },
    });

    return Response.json({
      message: "محصول با موفقیت حذف شد",
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "خطا در حذف محصول" },
      { status: 500 }
    );
  }
}