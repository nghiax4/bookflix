import { useEffect, useState } from "react"
import { Typography, Button, Box, Grid2 } from "@mui/material"

import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper"

import "swiper/css"
import "swiper/css/autoplay"

import Header from "../../components/Header"
import ItemSliderBox from "./components/ItemSliderBox/ItemSliderBox"
import ItemSlider from "./components/ItemSlider/ItemSlider"

import { Book } from "../../interfaces/Book"
import { get_articles, get_books, get_quotes } from "../../utils/get_all_from_db"
import { Article } from "../../interfaces/Article"

const getDaysSinceDate = (targetDate: Date) => {
  const currentDate = new Date()
  const timeDifference = currentDate.getTime() - targetDate.getTime()
  return Math.round(timeDifference / (1000 * 60 * 60 * 24))
}

function BookflixLanding() {
  const [books, setBooks] = useState<Book[]>([]) // State for storing books
  const [articles, setArticles] = useState<Article[]>([])

  function getBookIds() {
    return books.map((book) => book.id)
  }

  const [quotes, setQuotes] = useState<string[][]>([])

  useEffect(() => {
    const fetchBooks = async () => {
      const fetchedBooks = await get_books() // Fetch books
      setBooks(fetchedBooks) // Set the books state
    }

    const fetchArticles = async () => {
      const fetchedArticles = await get_articles()
      setArticles(fetchedArticles)
    }

    fetchArticles()
    fetchBooks() // Trigger the fetch function
  }, []) // Empty dependency array ensures this runs only once

  useEffect(() => {
    const fetchQuotes = async () => {
      const fetchedQuotes = await get_quotes()
      setQuotes(fetchedQuotes)
    }

    fetchQuotes()
  }, [])

  const quoteIdx = getDaysSinceDate(new Date(2023, 6, 13)) % 100
  console.log('Books: ', books)

  return (
    <Box bgcolor="var(--bookflix-background)" minHeight="100vh" height="100%" width="100%">
      <Header activePage="landing" />

      <Grid2 container columns={24} justifyContent="center" spacing={10}>
        <Grid2 size={{ xs: 22, sm: 22, md: 14, lg: 10 }} alignSelf="center">
          <Typography
            position="relative"
            variant="h4"
            align="center"
            fontFamily="var(--review-font-bookflix)"
            color="black"
            bgcolor="white"
            borderRadius="30px"
            p={5}
            mt={5}
            fontSize={{ xs: 35, md: "3vw", lg: "2.41vw" }}
          >
            Yêu sách từ đầu sao thật khó
            <br />
            Đừng từ bỏ, có Bookflix lo!
            <img src="/ui-pics/Flower1_BookflixLanding.png" width={50} style={{ position: "absolute", top: "-15px", right: "-15px" }} />
            <img
              src="/ui-pics/Pencil_BookflixLanding.png"
              width={50}
              style={{ position: "absolute", bottom: "-10px", left: "-10px", transform: "rotateX(180deg)" }}
            />
          </Typography>
        </Grid2>

        <Grid2 size={{ xs: 15, sm: 15, md: 8, lg: 6 }} mt={10}>
          <Swiper slidesPerView={1} loop autoplay={{ delay: 2500 }} modules={[Autoplay]} noSwiping={true}>
            {books.map((book) => (
              <SwiperSlide key={book.id}>
                <img
                  src={book.coverUrl}
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                ></img>
              </SwiperSlide>
            ))}
          </Swiper>

          <Button
            fullWidth
            onClick={() => {
              const randomId = getBookIds()[Math.floor(Math.random() * books.length)]
              window.open(`/bookview/${randomId}`, "_blank")
            }}
            sx={{
              mt: 1,
              bgcolor: "rgb(250, 222, 220)",
              color: "rgb(184, 88, 91)",
              borderRadius: 20,
              fontFamily: "var(--body-font-bookflix)",
              fontWeight: "bold",
              fontSize: "1rem",
              "&:hover": {
                bgcolor: "rgb(250, 222, 220)",
              },
            }}
          >
            Surprise me!
          </Button>
        </Grid2>
      </Grid2>

      <ItemSliderBox title="Top rated" ItemSliderComponent={<ItemSlider data={books} cardColor="rgb(204, 223, 230)" />} />

      <ItemSliderBox title="Recommended for you" ItemSliderComponent={<ItemSlider data={articles} cardColor="rgb(210, 239, 173)" />} />

      <Typography
        variant="h3"
        align="center"
        mt={10}
        color="var(--bookflix-logo-color)"
        fontFamily="var(--body-font-bookflix)"
        fontWeight="bold"
        fontSize={{ xs: 30, sm: 35, md: 50 }}
      >
        QUOTE OF THE DAY
      </Typography>

      <Box mt={15} position="relative" px={2}>
        <Typography
          position="relative"
          variant="h5"
          align="center"
          fontFamily="var(--body-font-bookflix)"
          fontStyle="italic"
          border="3px solid rgb(48, 48, 48)"
          bgcolor="white"
          color="black"
          borderRadius="30px"
          p={5}
          mx="auto"
          width="fit-content"
          max-width="100%"
          fontSize={{ xs: 20, lg: 25 }}
          zIndex={100}
        >
          {quotes.length > 0 && quotes[quoteIdx][0]} {/* quote content */}
          <br />
          {`- ${quotes.length > 0 && quotes[quoteIdx][1]}`} {/* quote author */}
        </Typography>
        <img
          src="/ui-pics/Flower2_BookflixLanding.png"
          width={300}
          style={{ position: "absolute", margin: "0 auto", left: "0", right: "0", zIndex: "9", top: "-100px" }}
        />
      </Box>

      <Box bgcolor="var(--bookflix-background)" height="20px"></Box>
    </Box>
  )
}

export default BookflixLanding
