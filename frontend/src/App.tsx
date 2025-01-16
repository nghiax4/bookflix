import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { publicRoutes } from "./routes"

// IDK What this is, but it is required
import { Buffer } from "buffer"
if (!window.Buffer) {
  window.Buffer = Buffer
}

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component
            return <Route key={index} path={route.path} element={<Page />} />
          })}
        </Routes>
      </div>
    </Router>
  )
}

export default App
