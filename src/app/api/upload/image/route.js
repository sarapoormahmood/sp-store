import { writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

export async function POST(request) {
  try {
    const formData = await request.formData();

    const file = formData.get("file");

    if (!file) {
      return Response.json(
        { error: "فایلی انتخاب نشده است" },
        { status: 400 }
      );
    }

    if (!file.type.startsWith("image/")) {
      return Response.json(
        { error: "فایل باید تصویر باشد" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const extension = path.extname(file.name);

    const fileName = `${randomUUID()}${extension}`;

    const uploadDir = path.join(
      process.cwd(),
      "public",
      "uploads",
      "products"
    );

    const filePath = path.join(uploadDir, fileName);

    await writeFile(filePath, buffer);

    return Response.json({
      success: true,
      image: `/uploads/products/${fileName}`,
    });
  } catch (error) {
    console.error("Upload error:", error);

    return Response.json(
      { error: "آپلود عکس با خطا مواجه شد" },
      { status: 500 }
    );
  }
}