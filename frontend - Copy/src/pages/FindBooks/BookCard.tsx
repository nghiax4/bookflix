import { Book } from '@/src/interfaces/Book'
import React from 'react'
import DisabledRating from './DisabledRating'
import { Link } from 'react-router-dom'

const BookCard = ({book} : {book: Book}) => {
  return (
    <div>
        <div className="flex">
        <img className="max-h-80" src={book.coverUrl}></img>
        <div className="flex flex-col">
            <h3>{book.title}</h3>
            <h3>bởi {book.author}</h3>
            <DisabledRating value={book.rating}/>
            <Link to={book.url}>
                <div className="px-4 py-2 bg-red-400 w-fit">Tìm hiểu thêm</div>
            </Link>
        </div>
        </div>

    </div>
  )
}

export default BookCard