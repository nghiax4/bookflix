import React, { useState } from "react"
import Header from "../../components/Header"
import { Book } from "../../interfaces/Book"

const FindBooks = () => {
    const [allGenres, setAllGenres] = useState<string[]>([])
  const [allAuthors, setAllAuthors] = useState<string[]>([])
  const [allBooks, setAllBooks] = useState<Book[]>([])

    const [bookSearchValue, setBookSearchValue] = useState("")
    const [filteredGenres, setFilteredGenres] = useState<string[]>([])
    const [filteredAuthor, setFilteredAuthor] = useState<string>("")
    // const [filteredStartYear, setFilteredStartYear] = useState<number>(1900)
    // const [filteredEndYear, setFilteredEndYear] = useState<number>(2030)
    const [filteredRating, setFilteredRating] = useState<number[]>([0, 5])
    
    const [bookSearchResult, setBookSearchResult] = useState<Book[]>([])

    const updateBookSearchedInfo = async () => {
      setBookSearchResult([])
      for (const book of allBooks) {
        const goodTitle = book.title.toLowerCase().includes(bookSearchValue.toLowerCase())
        const goodGenres = filteredGenres.every((value) => book.genres.includes(value))
        const goodAuthor = !filteredAuthor || filteredAuthor === book.author
        const goodRating = (filteredRating as number[])[0] <= book.rating && book.rating <= (filteredRating as number[])[1]
        const goodDate = true /*filteredStartYear <= book.publishyear && book.publishyear <= filteredEndYear*/
  
        if (goodTitle && goodGenres && goodAuthor && goodRating && goodDate) {
          setBookSearchResult((oldResult) => oldResult.some((bookIn) => bookIn.id == id) ? oldResult : [...oldResult, book])
        }
      }
    }

  return (
    <div className="bg-rose-100 min-h-screen h-full">
      <Header activePage="findbooks" />
      <div className="flex justify-between">
        <div>Book show here</div>
        <div>Filter stuff</div>
      </div>
    </div>
  )
}

export default FindBooks
