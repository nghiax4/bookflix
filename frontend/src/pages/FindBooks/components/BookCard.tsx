import { Card, CardMedia, CardContent, Typography, Rating, Button } from "@mui/material"
import { Link } from "react-router-dom"
import { Book } from "../../../interfaces/Book"

const BookCard = ({ book }: { book: Book }) => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: {xs: "flex-start", sm: "center"},
        boxShadow: "none",
        borderRadius: 0,
        marginTop: 5,
      }}
    >
      <CardMedia component="img" sx={{ width: { xs: "100%", sm: 150 }, objectFit: "cover" }} image={book.coverUrl} alt="Image" />
      <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <Typography variant="h6" fontSize={{ xs: 30, lg: 30 }} fontWeight="bold" fontFamily="var(--body-font-bookflix)">
          {book.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" fontSize={{ xs: 20, lg: 20 }} fontFamily="var(--body-font-bookflix)">
          bởi {book.author}
        </Typography>

        <Rating
          defaultValue={book.rating}
          precision={0.5}
          readOnly
          sx={{
            fontSize: { xs: 15, sm: 15 },
          }}
        />

        <Button
          component={Link}
          to={book.url}
          variant="contained"
          color="primary"
          sx={{
            backgroundColor: "rgb(224, 143, 120)",
            borderRadius: "20px 0 0 20px",
            boxShadow: "none",
            maxWidth: 200,
            fontSize: { xs: 15, sm: 15 },
            fontFamily: "var(--body-font-bookflix)",
            mt: 3,
            "&:hover": {
              backgroundColor: "rgb(224, 143, 120)",
              boxShadow: "none",
            },
          }}
        >
          Tìm hiểu thêm
        </Button>
      </CardContent>
    </Card>
  )
}

export default BookCard
