import { SignJWT, jwtVerify } from "jose";

const secretKey = process.env.AUTH_SECRET;

if (!secretKey) {
  throw new Error("AUTH_SECRET is not defined");
}

const encodedKey = new TextEncoder().encode(secretKey);

export async function createSession(user) {
  const token = await new SignJWT({
    userId: user.id,
    name: user.name,
    email: user.email,
  })
    .setProtectedHeader({
      alg: "HS256",
    })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);

  return token;
}

export async function verifySession(token) {
  try {
    const { payload } = await jwtVerify(
      token,
      encodedKey
    );

    return payload;
  } catch {
    return null;
  }
}