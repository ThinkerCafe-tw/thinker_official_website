export const runtime = "nodejs";
import { NextResponse } from "next/server"
import { getFeaturedProducts } from "@/lib/notion"

export async function GET() {
  try {
    const products = await getFeaturedProducts()

    return NextResponse.json({
      success: true,
      data: products,
    })
  } catch (error) {
    console.error("Error fetching featured products:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch featured products",
      },
      { status: 500 },
    )
  }
}
