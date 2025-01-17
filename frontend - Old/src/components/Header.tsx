import React from "react"
import { Link } from "react-router-dom"

const Header = ({ activePage }: { activePage: string }) => {
  return (
    <div className="flex justify-between px-4">
      <h1>Bookflix</h1>
      <div className="flex">
        <Link to="/">
          <h3 className={`px-2 ${activePage === "landing" && `font-bold`}`}>Trang chủ</h3>
        </Link>
        <Link to="findbooks">
          <h3 className={`px-2 ${activePage === "findbooks" && `font-bold`}`}>Tìm sách</h3>
        </Link>
        <Link to="/gocnhinmoi">
          <h3 className={`px-2 ${activePage === "gocnhinmoi" && `font-bold`}`}>Góc nhìn mới</h3>
        </Link>
      </div>
    </div>
  )
}

export default Header
