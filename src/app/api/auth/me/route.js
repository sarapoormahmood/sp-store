import { cookies } from "next/headers";
import { verifySession } from "@/lib/auth";

export async function GET() {
  try {
    const cookieStore = await cookies();

    const token = cookieStore.get("session")?.value;

    if (!token) {
      return Response.json(
        { user: null },
        { status: 200 }
      );
    }

    const user = await verifySession(token);

    if (!user) {
      return Response.json(
        { user: null },
        { status: 200 }
      );
    }

    return Response.json({
      user: {
        id: user.userId,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Me error:", error);

    return Response.json(
      { user: null },
      { status: 200 }
    );
  }
}