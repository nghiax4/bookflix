import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Markdown from "react-markdown"
import { Box, Button, Grid2, Rating, Typography } from "@mui/material"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"

import { Book } from "../../interfaces/Book"

import { get_books } from "../../utils/get_all_from_db"
import Header from "../../components/Header"

import { Notfound } from ".."

const BookView = () => {
  const [books, setBooks] = useState<Book[]>([])
  const { bookId } = useParams()

  useEffect(() => {
    const fetchBooks = async () => {
      const fetchedBooks = await get_books() // Fetch books
      setBooks(fetchedBooks) // Set the books state
    }

    fetchBooks() // Trigger the fetch function
  }, []) // Empty dependency array ensures this runs only once

  if (books.length > 0 && !books.some((book) => book.id === bookId)) {
    return <Notfound />
  }

  const [book, setBook] = useState<Book>({
    id: "#",
    title: "#",
    author: "#",
    genres: [],
    publishyear: 0,
    rating: 0,
    review: "#",
    coverUrl: "#",
    url: "#",
  })

  useEffect(() => {
    bookId && setBook(books.find((book) => book.id === bookId) || book)
  }, [bookId, books])

  console.log("Book cover url in BookView:", book.coverUrl)

  return (
    <Box bgcolor="var(--bookflix-background)" minHeight="100vh" height="100%" width="100%">
      <Header activePage="findbooks" />

      <Button
        onClick={() => window.history.back()}
        sx={{
          ml: 3,
          mt: 2,
          fontFamily: "var(--body-font-bookflix)",
          color: "var(--bookflix-logo-color)",
          fontSize: 30,
          "&:hover": {
            bgcolor: "transparent",
          },
        }}
      >
        <ArrowBackIosNewIcon sx={{ color: "black", fontSize: 20 }} />
        Trở lại
      </Button>

      <Box mx={{ xs: 1, sm: 3, md: 3, lg: 10, xl: 30 }} mt={10}>
        <Grid2 container direction="row" alignItems="center" justifyContent="center">
          {/* Book cover */}
          <Grid2 size={{ xs: 10, md: 4 }}>
            <Box width={{ xs: "100%", md: "80%" }}>
              <img src={book.coverUrl} style={{ width: "100%", objectFit: "contain" }} />
            </Box>
          </Grid2>

          <Grid2 container direction="column" size={{ xs: 12, md: 8 }} mt={{ xs: 5, md: 0 }} alignSelf="center" rowSpacing={{ xs: 2, sm: 1, md: 2, lg: 3 }}>
            {/* Book title */}
            <Grid2 alignSelf="center">
              <Typography
                variant="h3"
                fontSize={{ xs: 40, lg: 45, xl: 50 }}
                fontFamily="var(--body-font-bookflix)"
                fontWeight="bold"
                color="var(--bookflix-logo-color)"
                align="center"
              >
                {book.title.toUpperCase()}
              </Typography>
            </Grid2>

            {/* Book author */}
            <Grid2 alignSelf={{ xs: "center", sm: "center" }}>
              <Typography variant="h5" color="black" fontFamily="var(--body-font-bookflix)" fontSize={{ sm: 20, md: 25 }}>
                <span style={{ fontWeight: "bold" }}>Tác giả: </span>
                {book.author}
              </Typography>
            </Grid2>

            {/* Book publish date */}
            <Grid2 alignSelf={{ xs: "center", sm: "center" }}>
              <Typography variant="h5" color="black" fontFamily="var(--body-font-bookflix)" fontSize={{ sm: 20, md: 25 }}>
                <span style={{ fontWeight: "bold" }}>Năm phát hành: </span> {book.publishyear}
              </Typography>
            </Grid2>

            {/* Book genre */}
            <Grid2 mt={5} ml={{ xs: 1, md: 10 }}>
              <Box display="flex" flexWrap="wrap" alignItems="center" justifyContent="flex-start" gap={2}>
                <Typography variant="h5" sx={{ color: "rgb(184, 88, 91)", fontWeight: "bold" }} fontSize={{ md: 25, lg: 35 }}>
                  Thể loại:
                </Typography>

                {book.genres.map((genre) => (
                  <Typography
                    key={genre}
                    variant="h6"
                    sx={{
                      fontFamily: "var(--body-font-bookflix)",
                      border: "1px solid rgb(132, 163, 219)",
                      borderRadius: 20,
                      px: 2,
                      py: 1,
                      bgcolor: "rgb(132, 163, 219)",
                      color: "white",
                    }}
                    align="center"
                    fontSize={{ md: 20, lg: 20 }}
                  >
                    {genre}
                  </Typography>
                ))}
              </Box>
            </Grid2>

            {/* Book rating */}
            <Grid2 ml={{ xs: 1, md: 10 }}>
              <Box display="flex" alignItems="center" gap={2} mt={3}>
                <Typography variant="h5" fontFamily="var(--body-font-bookflix)" fontStyle="italic" color="black" fontSize={{ md: 25, lg: 30 }}>
                  Đánh giá:{" "}
                </Typography>
                <Rating value={book.rating} precision={0.25} readOnly sx={{ fontSize: { md: 30, lg: 40 } }} />
              </Box>
            </Grid2>
          </Grid2>
        </Grid2>

        {/* Book review */}
        <Box
          display="flex"
          justifyContent="flex-start"
          flexWrap={{ xs: "wrap", md: "nowrap" }}
          gap={5}
          mt={10}
          border="4px solid black"
          borderRadius={5}
          p={5}
          bgcolor="white"
        >
          <Box minWidth={{ xs: 100 }} maxWidth={{ xs: 200, md: 200 }}>
            <img style={{ width: "100%" }} src="/ui-pics/SummaryIcon.png" />
          </Box>

          <Box>
            <Markdown
              components={{
                p: (props) => {
                  const { children, ...rest } = props
                  return (
                    <Typography
                      variant="subtitle1"
                      paragraph
                      color="black"
                      fontFamily="var(--review-font-bookflix)"
                      fontSize={{ xs: 15, sm: 15, md: 18, lg: 22 }}
                    >
                      {children}
                    </Typography>
                  )
                },
              }}
            >
              {book.review}
            </Markdown>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default BookView
