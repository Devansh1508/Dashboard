import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import User from './pages/User'
import Navbar from './Components/navbar/Navbar.tsx'
import './App.css'

function App() {
  return (
    <div className='bg-primary'>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </div>
  )
}

export default App