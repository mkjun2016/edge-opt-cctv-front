import { Routes, Route, Link } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import About from "./pages/About"
import Home from "./pages/Home"

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="p-4 bg-white shadow flex gap-4">
        <Link to="/" className="text-blue-600 hover:underline">Home</Link>
        <Link to="/dashboard" className="text-blue-600 hover:underline">Dashboard</Link>
        <Link to="/about" className="text-blue-600 hover:underline">About</Link>
      </nav>

      <div className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </div>
  )
}

export default App