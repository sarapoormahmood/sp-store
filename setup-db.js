require("dotenv").config();

const { Client } = require("pg");

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function setupDatabase() {
  try {
    await client.connect();

    console.log("✅ Connected to Supabase");

    await client.query(`
      CREATE TABLE IF NOT EXISTS "Product" (
        "id" SERIAL PRIMARY KEY,
        "name" TEXT NOT NULL,
        "description" TEXT,
        "price" INTEGER NOT NULL,
        "image" TEXT NOT NULL,
        "category" TEXT NOT NULL,
        "stock" INTEGER NOT NULL DEFAULT 0,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS "ProductColor" (
        "id" SERIAL PRIMARY KEY,
        "name" TEXT NOT NULL,
        "productId" INTEGER NOT NULL,
        CONSTRAINT "ProductColor_productId_fkey"
          FOREIGN KEY ("productId")
          REFERENCES "Product"("id")
          ON DELETE CASCADE
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS "ProductSize" (
        "id" SERIAL PRIMARY KEY,
        "name" TEXT NOT NULL,
        "productId" INTEGER NOT NULL,
        CONSTRAINT "ProductSize_productId_fkey"
          FOREIGN KEY ("productId")
          REFERENCES "Product"("id")
          ON DELETE CASCADE
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS "User" (
        "id" SERIAL PRIMARY KEY,
        "name" TEXT NOT NULL,
        "email" TEXT NOT NULL UNIQUE,
        "password" TEXT NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL
      );
    `);

    console.log("✅ Product table created");
    console.log("✅ ProductColor table created");
    console.log("✅ ProductSize table created");
    console.log("✅ User table created");
    console.log("🎉 Database setup completed!");

  } catch (error) {
    console.error("❌ Database setup failed:");
    console.error(error);
  } finally {
    await client.end();
  }
}

setupDatabase();