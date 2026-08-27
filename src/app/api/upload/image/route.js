
import { put } from "@vercel/blob";

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

    if (!file.type || !file.type.startsWith("image/")) {
      return Response.json(
        { error: "فایل باید تصویر باشد" },
        { status: 400 }
      );
    }

    if (file.size > 10 * 1024 * 1024) {
      return Response.json(
        { error: "حجم عکس نباید بیشتر از ۱۰ مگابایت باشد" },
        { status: 400 }
      );
    }

    const extension =
      file.name?.split(".").pop()?.toLowerCase() || "jpg";

    // اسم فایل بدون فاصله
    const fileName = `products/${crypto.randomUUID()}.${extension}`;

    const blob = await put(fileName, file, {
      access: "public",
    });

    return Response.json({
      success: true,
      image: blob.url,
    });
  } catch (error) {
    console.error("Upload error:", error);

    return Response.json(
      { error: "آپلود عکس با خطا مواجه شد" },
      { status: 500 }
    );
  }
}

