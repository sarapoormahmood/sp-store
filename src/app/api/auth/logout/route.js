import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = await cookies();

    cookieStore.set("session", "", {
      httpOnly: true,
      expires: new Date(0),
      path: "/",
    });

    return Response.json({
      message: "خروج با موفقیت انجام شد",
    });
  } catch (error) {
    console.error("Logout error:", error);

    return Response.json(
      {
        error: "خطا در خروج",
      },
      {
        status: 500,
      }
    );
  }
}