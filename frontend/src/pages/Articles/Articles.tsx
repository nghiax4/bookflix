import { useEffect, useState } from "react"
import { Typography, Box } from "@mui/material"

import ArticlePreviewCard from "./components/ArticlePreviewCard/ArticlePreviewCard"
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome"
import Header from "../../components/Header"
import { Article } from "../../interfaces/Article"
import { get_articles } from "../../utils/get_all_from_db"

function Articles() {
  const [articles, setArticles] = useState<Article[]>([])

  useEffect(() => {
    const fetchArticles = async () => {
      const fetchedArticles = await get_articles()
      setArticles(fetchedArticles)
    }

    fetchArticles()
  }, [])

  return (
    <Box bgcolor="var(--bookflix-background)" minHeight="100vh" height="100%" width="100%">
      <Header activePage="articles" />

      <Typography
        variant="h1"
        align="center"
        fontFamily="var(--body-font-bookflix)"
        color="rgb(232, 129, 119)"
        fontWeight="bold"
        mt={5}
        fontSize={{ xs: 30, sm: 50 }}
      >
        <AutoAwesomeIcon sx={{ color: "yellow", fontSize: { xs: 25, sm: 45 } }} />
        {" GÓC NHÌN MỚI"}
      </Typography>

      <Box display="flex" gap={10} justifyContent="center" mx={2}>
        <Box flexBasis={{ xs: "100%", md: "60%" }}>
          {articles.map((article) => (
            <ArticlePreviewCard article={article} key={article.id} />
          ))}
        </Box>

        <Box flexBasis="30%" alignSelf="flex-start" justifyContent="flex-end" display={{ xs: "none", md: "flex" }}>
          <img style={{width: "100%"}} src="/ui-pics/FillerPic_GocNhinMoi.png" />
        </Box>
      </Box>
    </Box>
  )
}

export default Articles
