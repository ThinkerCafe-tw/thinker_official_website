import { NextResponse } from "next/server";
import { getProducts } from "@/lib/notion";
import { supabase } from '@/lib/supabase.js';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('courses')
      .select()
      .order('course_id', { ascending: false });

    if (error) {
      const { code, message } = error;
      throw new Error(`[${code}] ${message}`);
    }

    const products = await getProducts();
    const result = data
      .map(({ course_id }) => products.find(product => product.course_id === course_id))
      .filter(object => object !== undefined);

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch products",
      },
      { status: 500 }
    );
  }
}
