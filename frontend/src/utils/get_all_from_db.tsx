import axios from "axios"
import { Book } from "../interfaces/Book"
import matter from "gray-matter"
import { Article } from "../interfaces/Article"

const get_all_from_db = async ({ table_name }: { table_name: string }) => {
  try {
    // Validate the table name
    const allowedTables = ["book_info", "gocnhinmoi_articles", "quotes"]
    if (!allowedTables.includes(table_name)) {
      throw new Error(`Invalid table name: ${table_name}`)
    }

    // Make the API request using Axios
    const response = await axios.post("/api/get-all-from-db", {
      database: table_name,
    })

    // Handle response
    if (response.data.error) {
      throw new Error(response.data.error)
    }

    console.log("Data retrieved successfully:", response.data.result)
    return response.data.result
  } catch (error) {
    // Handle Axios errors and backend errors
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message)
    } else {
      console.error("Unexpected error:", (error as Error).message)
    }
    throw error
  }
}

const get_books = async (): Promise<Book[]> => {
  try {
    // Fetch all rows from the "book_info" table
    const books = await get_all_from_db({ table_name: "book_info" })

    // Map the database results into the Book interface
    return books.map((book: any) => {
      const { id, content } = book

      // Parse the Markdown content using gray-matter
      const matterResult = matter(content)

      // Return the transformed Book object
      return {
        id: String(id),
        title: matterResult.data.title,
        author: matterResult.data.author,
        genres: matterResult.data.genres,
        publishyear: matterResult.data.publishyear,
        rating: parseFloat(matterResult.data.rating),
        review: matterResult.content, // The Markdown content itself (without front matter)
        coverUrl: `/book-covers/${id}.png`,
        url: `/bookview/${id}`,
      }
    })
  } catch (error) {
    console.error("Error fetching books:", error)
    throw error
  }
}

const get_articles = async (): Promise<Article[]> => {
  try {
    // Fetch all rows from the "gocnhinmoi_articles" table
    const articles = await get_all_from_db({ table_name: "gocnhinmoi_articles" })

    // Map the database results into structured article objects
    return articles.map((article: any) => {
      const { id, content } = article

      // Parse the Markdown content using gray-matter
      const matterResult = matter(content)

      // Return the transformed article object
      return {
        id: String(id),
        title: matterResult.data.title,
        author: matterResult.data.author,
        publishdate: matterResult.data.publishdate,
        description: matterResult.data.description,
        content: matterResult.content, // The actual article content without front matter
        coverUrl: `/gocnhinmoi-images/${id}/articleCover.jpg`,
        url: `/articleview/${id}`
      }
    })
  } catch (error) {
    console.error("Error fetching articles:", error)
    throw error
  }
}

const get_quotes = async (): Promise<string[][]> => {
  try {
    // Fetch all rows from the "quotes" table
    const quotes = await get_all_from_db({ table_name: "quotes" })

    // Map the database results into string arrays
    return quotes.map((quote: any) => [
      quote.quote, // 0th index: the quote itself
      quote.author, // 1st index: the author
    ])
  } catch (error) {
    console.error("Error fetching quotes:", error)
    throw error
  }
}

export { get_all_from_db, get_books, get_articles, get_quotes }
