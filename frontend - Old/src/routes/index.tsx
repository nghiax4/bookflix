import {
    Landing,
    FindBooks
} from "../pages"

const publicRoutes = [
    { path: "/", component: Landing },
    { path: "/findbooks", component: FindBooks },
]

export { publicRoutes }