// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"
import { Scrollbar } from 'swiper';

// Import Swiper styles
import "swiper/css"
import "swiper/css/scrollbar"

import { useEffect, useState } from "react"

import CustomLink from "../CustomLink/CustomLink"
import { Book } from "../../../../interfaces/Book";
import { Article } from "../../../../interfaces/Article";

const ItemSlider = ({ data, cardColor }: { data: (Book | Article)[]; cardColor: string; }) => {
  const [info, setInfo] = useState<(Book | Article)[]>([])

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

  useEffect(() => {
    data.forEach((item) => {
      setInfo((oldInfo) => oldInfo.some((itemIn) => itemIn.id == item.id) ? oldInfo : [...oldInfo, item])
    })

    console.log('Data in ItemSlider ', data)
  }, [data]) // I cannot explain why I need to put "data" here, it just happen to work...

  return (
    <Swiper breakpoints={swiperBreakpoint} grabCursor={true} modules={[Scrollbar]} scrollbar={true} spaceBetween={10}>
      {info.map((item) => (
        <SwiperSlide key={item.id} style={{paddingBottom: 30, paddingTop: 30}}>
          <CustomLink item={item} cardColor={cardColor} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default ItemSlider
