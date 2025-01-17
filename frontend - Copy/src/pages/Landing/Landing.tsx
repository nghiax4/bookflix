import { useEffect, useState } from "react"

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/swiper-bundle.css"

import { Book } from "../../interfaces/Book"
import { Article } from "../../interfaces/Article"
import { get_articles, get_books } from "../../utils/get_all_from_db"
import Header from "../../components/Header"
import { Link } from "react-router-dom"

const Card = ({ item, cardColor }: { item: Book | Article; cardColor: string }) => {
  return (
    <div className={`px-4 py-2 flex flex-col items-center ${cardColor}`}>
      <img src={item.coverUrl}></img>
      <h3>{item.title}</h3>
      <h5>{item.author}</h5>
    </div>
  )
}

const ItemSwiper = ({ items, cardColor }: { items: (Book | Article)[]; cardColor: string }) => {
  const swiperBreakpoint = {
    0: {
      slidesPerView: 1,
    },
    600: {
      slidesPerView: 2,
    },
    900: {
      slidesPerView: 4,
    },
    1200: {
      slidesPerView: 6,
    },
    1536: {
      slidesPerView: 7,
    },
  }

  return (
    <div className="w-11/12 mx-auto">
      <Swiper breakpoints={swiperBreakpoint} spaceBetween={40} onSlideChange={() => console.log("slide change")} onSwiper={(swiper) => console.log(swiper)}>
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            <Link to={item.url}>
              <Card item={item} cardColor={cardColor} />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

const Landing = () => {
  const [books, setBooks] = useState<Book[]>([]) // State for storing books
  const [articles, setArticles] = useState<Article[]>([])

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

  return (
    <div className="bg-rose-100 min-h-screen h-full">
      <Header activePage="landing" />
      {/*Welcome block or something, I'll let chatgpt decide a better name*/}
      <div className="bg-white text-center px-6 py-4 rounded-lg shadow-md text-black w-fit mx-auto">
        <h5 className="text-lg font-medium inline-block">Yêu sách từ đầu sao thật khó</h5>
        <br></br>
        <h5 className="text-lg font-medium inline-block">Đừng từ bỏ, có Bookflix lo!</h5>
      </div>

      <ItemSwiper items={books} cardColor="bg-blue-100" />
      <ItemSwiper items={articles} cardColor="bg-emerald-100" />
    </div>
  )
}

export default Landing
