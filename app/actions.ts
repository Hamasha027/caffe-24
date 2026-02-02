"use server";

import { db } from "@/lib";
import { menuItems } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function addMenuItem(formData: FormData) {
  const title = formData.get("title") as string;
  const price = parseInt(formData.get("price") as string);
  const image_url = formData.get("image_url") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;

  if (!title || !price || !image_url) {
    throw new Error("Missing required fields");
  }

  try {
    await db.insert(menuItems).values({
      title,
      price,
      imageUrl: image_url,
      description: description || "",
      category: category || "drinks",
    });
  } catch (error) {
    console.error("Error adding menu item:", error);
    throw error;
  }
}

export async function deleteMenuItem(id: number) {
  try {
    await db.delete(menuItems).where(eq(menuItems.id, id));
  } catch (error) {
    console.error("Error deleting menu item:", error);
    throw error;
  }
}

export async function updateMenuItem(
  id: number,
  data: {
    title?: string;
    price?: number;
    imageUrl?: string;
    description?: string;
    category?: string;
  }
) {
  try {
    await db.update(menuItems).set(data).where(eq(menuItems.id, id));
  } catch (error) {
    console.error("Error updating menu item:", error);
    throw error;
  }
}
