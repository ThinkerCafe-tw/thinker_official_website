import { Client } from "@notionhq/client"

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})


const PRODUCTS_DATABASE_ID = process.env.NOTION_PRODUCTS_DATABASE_ID || ""
const CONTACTS_DATABASE_ID = process.env.NOTION_CONTACTS_DATABASE_ID || ""
const OURSTORY_DATABASE_ID = process.env.NOTION_OURSTORY_DATABASE_ID || ""
const OURVALUE_DATABASE_ID = process.env.NOTION_OURVALUE_DATABASE_ID || ""
const OURTEAM_DATABASE_ID = process.env.NOTION_OURTEAM_DATABASE_ID || ""

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

export interface NotionOurStory {
  id: string
  en_title: string
  zh_title: string
  en_description: string
  zh_description: string
  image?: string
}
export interface NotionOurValue {
  id: string
  en_title: string
  zh_title: string
  en_description: string
  zh_description: string
  en_value_title: string
  zh_value_title: string
  en_value_description: string
  zh_value_description: string
  image?: string
}
export interface NotionOurTeam {
  id: string
  en_title: string
  zh_title: string
  en_description: string
  zh_description: string
  en_name: string
  zh_name: string
  en_role: string
  zh_role: string
  en_role_description: string
  zh_role_description: string
  image?: string
}

export interface NotionContactSubmission {
  name: string
  email: string
  subject: string
  message: string
  language: string
  timestamp: string
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

export async function getOurStoryContent(): Promise<NotionOurStory[]> {
  try {
    const response = await notion.databases.query({
      database_id: OURSTORY_DATABASE_ID,
    })

    return response.results.map((page: any) => ({
      id: page.id,
      en_title: page.properties.Title?.title || [],
      zh_title: page.properties.zh_name?.rich_text[0]?.text?.content || "",
      en_description: page.properties.en_description?.rich_text[0]?.text?.content || "",
      zh_description: page.properties.zh_description?.rich_text[0]?.text?.content || "",
      image: page.properties.image?.files[0]?.file?.url || "",
    }))
  } catch (error) {
    console.error("Error fetching about content from Notion:", error)
    return []
  }
}
export async function getOurValueContent(): Promise<NotionOurValue[]> {
  try {
    const response = await notion.databases.query({
      database_id: OURVALUE_DATABASE_ID,
    })

    return response.results.map((page: any) => ({
      id: page.id,
      en_title: page.properties.Title?.title || [],
      zh_title: page.properties.zh_name?.rich_text[0]?.text?.content || "",
      en_description: page.properties.en_description?.rich_text[0]?.text?.content || "",
      zh_description: page.properties.zh_description?.rich_text[0]?.text?.content || "",
      en_value_title: page.properties.en_value_title?.rich_text[0]?.text?.content || "",
      zh_value_title: page.properties.zh_value_title?.rich_text[0]?.text?.content || "",
      en_value_description: page.properties.en_value_description?.rich_text[0]?.text?.content || "",
      zh_value_description: page.properties.zh_value_description?.rich_text[0]?.text?.content || "",
      image: page.properties.image?.files[0]?.file?.url || "",
    }))
  } catch (error) {
    console.error("Error fetching about content from Notion:", error)
    return []
  }
}
export async function getOurTeamContent(): Promise<NotionOurTeam[]> {
  try {
    const response = await notion.databases.query({
      database_id: OURTEAM_DATABASE_ID,
    })

    return response.results.map((page: any) => ({
      id: page.id,
      en_title: page.properties.Title?.title || [],
      zh_title: page.properties.zh_name?.rich_text[0]?.text?.content || "",
      en_description: page.properties.en_description?.rich_text[0]?.text?.content || "",
      zh_description: page.properties.zh_description?.rich_text[0]?.text?.content || "",
      en_name: page.properties.en_name?.rich_text[0]?.text?.content || "",
      zh_name: page.properties.zh_name?.rich_text[0]?.text?.content || "",
      en_role: page.properties.en_role?.rich_text[0]?.text?.content || "",
      zh_role: page.properties.zh_role?.rich_text[0]?.text?.content || "",
      en_role_description: page.properties.en_role_description?.rich_text[0]?.text?.content || "",
      zh_role_description: page.properties.zh_role_description?.rich_text[0]?.text?.content || "",
      image: page.properties.image?.files[0]?.file?.url || "",
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


