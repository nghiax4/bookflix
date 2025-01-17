import { useEffect, useState } from "react"
import Header from "../../components/Header"
import { Book } from "../../interfaces/Book"
import { Combobox } from "./Combobox"
import { get_books } from "@/src/utils/get_all_from_db"
import { Slider } from "@/components/ui/slider"
import BookCard from "./BookCard"
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/extension/multi-select"

const FindBooks = () => {
  // State to store all genres, authors, books, and search results
  const [genres, setGenres] = useState<string[]>([])
  const [authors, setAuthors] = useState<string[]>([])
  const [books, setBooks] = useState<Book[]>([])
  const [searchResults, setSearchResults] = useState<Book[]>([])

  // State to track search and filter inputs
  const [searchValue, setSearchValue] = useState("")
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [selectedAuthor, setSelectedAuthor] = useState<string>("")
  const [ratingRange, setRatingRange] = useState<number[]>([0, 5])

  // Fetch all books when the component mounts
  useEffect(() => {
    const fetchBooks = async () => {
      const fetchedBooks = await get_books() // Fetch books from the database
      setBooks(fetchedBooks) // Store fetched books in state
    }

    fetchBooks()
  }, []) // Dependency array ensures this runs only once

  // Extract unique genres and authors whenever the books list changes
  useEffect(() => {
    const uniqueGenres = Array.from(
      new Set(books.flatMap((book) => book.genres)) // Flatten and deduplicate genres
    )

    const uniqueAuthors = Array.from(
      new Set(books.map((book) => book.author)) // Deduplicate authors
    )

    setGenres(uniqueGenres) // Update genres state
    setAuthors(uniqueAuthors) // Update authors state

    console.log("Available Genres:", uniqueGenres)
    console.log("Available Authors:", uniqueAuthors)
  }, [books])

  // Filter books based on user inputs
  const filterBooks = () => {
    setSearchResults([]) // Clear previous results

    books.forEach((book) => {
      const matchesTitle = book.title.toLowerCase().includes(searchValue.toLowerCase()) // Check title match
      const matchesGenres = selectedGenres.every((genre) => book.genres.includes(genre)) // Check genre match
      const matchesAuthor = !selectedAuthor || selectedAuthor === book.author // Check author match
      const matchesRating = ratingRange[0] <= book.rating && book.rating <= ratingRange[1] // Check rating match

      if (matchesTitle && matchesGenres && matchesAuthor && matchesRating) {
        setSearchResults(
          (prevResults) => (prevResults.some((existingBook) => existingBook.id === book.id) ? prevResults : [...prevResults, book]) // Add book if not already included
        )
      }
    })
  }

  return (
    <div className="bg-rose-100 min-h-screen h-full">
      {/* Header for navigation */}
      <Header activePage="findbooks" />

      <div className="flex justify-between">
        {/* Section to display books */}
        <div className="bg-red-200 py-4 w-5/12">
          <h3>Available Books</h3>
          <button onClick={filterBooks}>Search</button>

          <div>
            {searchResults.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>

        {/* Section for filters */}
        <div className="bg-purple-200 py-4 w-5/12">
          <h3>Filters</h3>

          {/* Author filter */}
          <Combobox
            options={authors}
            placeholderText="Tác giả"
            onChange={(value) => {
              console.log(`Author selected: ${value}`)
              setSelectedAuthor(value)
            }}
          />

          {/* Genres filter */}
          <MultiSelector values={selectedGenres} onValuesChange={setSelectedGenres} loop className="">
            <MultiSelectorTrigger>
              <MultiSelectorInput placeholder="Thể loại" />
            </MultiSelectorTrigger>
            <MultiSelectorContent>
              <MultiSelectorList>
                {genres.map((genre) => (
                  <MultiSelectorItem key={genre} value={genre}>
                    {genre}
                  </MultiSelectorItem>
                ))}
              </MultiSelectorList>
            </MultiSelectorContent>
          </MultiSelector>

          {/* Rating filter */}
          <Slider
            defaultValue={[0, 5]}
            min={0}
            max={5}
            minStepsBetweenThumbs={0.25}
            onValueChange={(value) => {
              console.log(`Rating range: ${ratingRange}`)
              setRatingRange(value)
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default FindBooks
