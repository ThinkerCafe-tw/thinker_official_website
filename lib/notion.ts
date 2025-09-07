import { Client } from "@notionhq/client"

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})


const PRODUCTS_DATABASE_ID = process.env.NOTION_PRODUCTS_DATABASE_ID || ""
const ABOUT_DATABASE_ID = process.env.NOTION_ABOUT_DATABASE_ID || ""
const CONTACTS_DATABASE_ID = process.env.NOTION_CONTACTS_DATABASE_ID || ""

export interface NotionProduct {
  id: string
  en_name: string
  zh_name: string
  en_description: string
  zh_description: string
  image: string
  en_category: string
  zh_category: string
  featured: boolean
}

export interface NotionAboutContent {
  id: string
  section: string
  title: string
  titleZh: string
  content: string
  contentZh: string
  image?: string
  order: number
}

export interface NotionContactSubmission {
  name: string
  email: string
  subject: string
  message: string
  language: string
  timestamp: string
}

// Helper function to extract text from Notion rich text
function extractText(richText: any[]): string {
  return richText?.map((text: any) => text.plain_text).join("") || ""
}

// Helper function to extract URL from Notion files
function extractFileUrl(files: any[]): string {
  return files?.[0]?.file?.url || files?.[0]?.external?.url || ""
}

export async function getProducts(): Promise<NotionProduct[]> {
  if (!PRODUCTS_DATABASE_ID) {
    throw new Error("Missing Notion Products Database ID")
  }
  try {
    const response = await notion.databases.query({
      database_id: PRODUCTS_DATABASE_ID,
      sorts: [
        {
          property: "en_category",
          direction: "descending",
        },
        {
          property: "created_time",
          direction: "ascending",
        },
      ],
    })
    // console.log("Fetched products from Notion:", JSON.stringify(response.results[0], null, 2))
    return response.results.map((page: any) => ({
      id: page.id,
      en_name: page.properties.en_name?.title[0]?.text?.content || "",
      zh_name: page.properties.zh_name?.rich_text[0]?.text?.content || "",
      en_description: page.properties.en_description?.rich_text[0]?.text?.content || "",
      zh_description: page.properties.zh_description?.rich_text[0]?.text?.content || "",
      image: page.properties.image?.files[0]?.file?.url || "",
      en_category: page.properties.en_category?.multi_select[0]?.name || "",
      zh_category: page.properties.zh_category?.multi_select[0]?.name || "",
      featured: page.properties.featured?.checkbox || false,
    }))
  } catch (error) {
    console.error("Error fetching products from Notion:", error)
    return []
  }
}

export async function getFeaturedProducts(): Promise<NotionProduct[]> {
  try {
    const response = await notion.databases.query({
      database_id: PRODUCTS_DATABASE_ID,
      filter: {
        property: "featured",
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: "en_category",
          direction: "descending",
        },
        {
          property: "created_time",
          direction: "ascending",
        },
      ],
    })
//  console.log("Fetched Featured products from Notion:", JSON.stringify(response.results[0], null, 2))
 return response.results.map((page: any) => ({
      id: page.id,
      en_name: page.properties.en_name?.title[0]?.text?.content || "",
      zh_name: page.properties.zh_name?.rich_text[0]?.text?.content || "",
      en_description: page.properties.en_description?.rich_text[0]?.text?.content || "",
      zh_description: page.properties.zh_description?.rich_text[0]?.text?.content || "",
      image: page.properties.image?.files[0]?.file?.url || "",
      en_category: page.properties.en_category?.multi_select[0]?.name || "",
      zh_category: page.properties.zh_category?.multi_select[0]?.name || "",
      featured: page.properties.featured?.checkbox || false,
    }))
  } catch (error) {
    console.error("Error fetching featured products from Notion:", error)
    return []
  }
}

// Get about content from Notion database
export async function getAboutContent(): Promise<NotionAboutContent[]> {
  try {
    const response = await notion.databases.query({
      database_id: ABOUT_DATABASE_ID,
      sorts: [
        {
          property: "Order",
          direction: "ascending",
        },
      ],
    })

    return response.results.map((page: any) => ({
      id: page.id,
      section: page.properties.Section?.select?.name || "",
      title: extractText(page.properties.Title?.title || []),
      titleZh: extractText(page.properties.TitleZh?.rich_text || []),
      content: extractText(page.properties.Content?.rich_text || []),
      contentZh: extractText(page.properties.ContentZh?.rich_text || []),
      image: extractFileUrl(page.properties.Image?.files || []),
      order: page.properties.Order?.number || 0,
    }))
  } catch (error) {
    console.error("Error fetching about content from Notion:", error)
    return []
  }
}


export async function submitContactForm(data: NotionContactSubmission): Promise<boolean> {
  try {
    await notion.pages.create({
      parent: {
        database_id: CONTACTS_DATABASE_ID,
      },
      properties: {
        name: {
          title: [
            {
              text: {
                content: data.name,
              },
            },
          ],
        },
        email: {
          rich_text: [
            {
              text: {
                content: data.email,
              },
            },
          ],
        },
        subject: {
          select: {
            name: data.subject,
          },
        },
        message: {
          rich_text: [
            {
              text: {
                content: data.message,
              },
            },
          ],
        },
        language: {
          select: {
            name: data.language,
          },
        },
         submitted_at: {
          date: {
            start: data.timestamp,
          },
        },
        status: {
          select: {
            name: "New",
          },
        },
      },
    })

    return true
  } catch (error) {
    console.error("Error submitting contact form to Notion:", error)
    return false
  }
}

// // Get single product by ID
// export async function getProductById(id: string): Promise<NotionProduct | null> {
//   try {
//     const response = await notion.pages.retrieve({ page_id: id })
//     const page = response as any

//     return {
//       id: page.id,
//       name: extractText(page.properties.Name?.title || []),
//       nameZh: extractText(page.properties.NameZh?.rich_text || []),
//       description: extractText(page.properties.Description?.rich_text || []),
//       descriptionZh: extractText(page.properties.DescriptionZh?.rich_text || []),
//       price: extractText(page.properties.Price?.rich_text || []),
//       image: extractFileUrl(page.properties.Image?.files || []),
//       rating: page.properties.Rating?.number || 0,
//       category: page.properties.Category?.select?.name || "",
//       categoryZh: extractText(page.properties.CategoryZh?.rich_text || []),
//       featured: page.properties.Featured?.checkbox || false,
//     }
//   } catch (error) {
//     console.error("Error fetching product by ID from Notion:", error)
//     return null
//   }
// }
