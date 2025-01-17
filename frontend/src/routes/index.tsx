import {
    Landing,
    FindBooks,
    BookView,
    Articles,
    ArticleView,
    Notfound,
} from "../pages"

const publicRoutes = [
    { path: "/", component: Landing },
    { path: "/findbooks", component: FindBooks },
    { path: "/bookview/:bookId", component: BookView },
    { path: "/articles", component: Articles },
    { path: "/articleview/:articleId", component: ArticleView },
    { path: "*", component: Notfound },
]

export { publicRoutes }