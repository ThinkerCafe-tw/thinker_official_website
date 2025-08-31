import { NextResponse } from "next/server"
import { getAboutContent } from "@/lib/notion"

export async function GET() {
  try {
    const content = await getAboutContent()

    return NextResponse.json({
      success: true,
      data: content,
    })
  } catch (error) {
    console.error("Error fetching about content:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch about content",
      },
      { status: 500 },
    )
  }
}
