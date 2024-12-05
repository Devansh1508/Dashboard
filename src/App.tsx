import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Navbar from './Components/navbar/Navbar.tsx'
import './App.css'

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App