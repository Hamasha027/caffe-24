import { db } from "@/lib";
import { menuItems } from "@/lib/schema";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const items = await db.select().from(menuItems);
    return NextResponse.json(items);
  } catch (error) {
    console.error("Error fetching items:", error);
    return NextResponse.json({ error: "Failed to fetch items" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      title, 
      titleKurdish = "",
      price, 
      description = "", 
      descriptionKurdish = "",
      category = "drinks", 
      imageUrl 
    } = body;
    
    console.log("Adding item with payload:", { title, titleKurdish, price, imageUrl, category });
    
    if (!title || title.toString().trim() === "") {
      return NextResponse.json({ error: "Item name (English) is required" }, { status: 400 });
    }
    if (!price || Number(price) <= 0) {
      return NextResponse.json({ error: "Valid price is required" }, { status: 400 });
    }
    if (!imageUrl || imageUrl.toString().trim() === "") {
      return NextResponse.json({ error: "Image URL is required" }, { status: 400 });
    }
    
    await db.insert(menuItems).values({ 
      title: title.toString(), 
      titleKurdish: titleKurdish ? titleKurdish.toString() : title.toString(),
      price: Number(price), 
      description: description ? description.toString() : "", 
      descriptionKurdish: descriptionKurdish ? descriptionKurdish.toString() : "",
      category: category.toString(), 
      imageUrl: imageUrl.toString()
    });
    console.log("Item added successfully");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error adding item:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to add item";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      id, 
      title, 
      titleKurdish,
      price, 
      description = "", 
      descriptionKurdish = "",
      category = "drinks", 
      imageUrl 
    } = body;
    
    const numericId = Number(id);
    if (!Number.isFinite(numericId)) return NextResponse.json({ error: "Missing id" }, { status: 400 });
    
    console.log("Updating item:", numericId, { title, titleKurdish, price, imageUrl });
    
    const numericPrice = price === undefined ? undefined : Number(price);
    
    await db
      .update(menuItems)
      .set({
        ...(title !== undefined && title.toString().trim() !== "" ? { title: title.toString() } : {}),
        ...(titleKurdish !== undefined && titleKurdish.toString().trim() !== "" ? { titleKurdish: titleKurdish.toString() } : {}),
        ...(numericPrice !== undefined && !Number.isNaN(numericPrice) && numericPrice > 0 ? { price: numericPrice } : {}),
        ...(description !== undefined ? { description: description.toString() } : {}),
        ...(descriptionKurdish !== undefined ? { descriptionKurdish: descriptionKurdish.toString() } : {}),
        ...(category !== undefined ? { category: category.toString() } : {}),
        ...(imageUrl !== undefined && imageUrl.toString().trim() !== "" ? { imageUrl: imageUrl.toString() } : {}),
      })
      .where(eq(menuItems.id, numericId));
    console.log("Item updated successfully");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating item:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to update item";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    let idValue: number | null = null;

    const queryId = searchParams.get("id");
    if (queryId !== null) {
      const parsed = Number(queryId);
      if (Number.isFinite(parsed)) idValue = parsed;
    }

    if (idValue === null) {
      try {
        const body = await request.json();
        const parsed = Number(body?.id);
        if (Number.isFinite(parsed)) idValue = parsed;
      } catch (err) {
        // ignore body parse errors; will fall through to missing id response
      }
    }

    if (idValue === null) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    await db.delete(menuItems).where(eq(menuItems.id, idValue));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting item:", error);
    return NextResponse.json({ error: "Failed to delete item" }, { status: 500 });
  }
}
