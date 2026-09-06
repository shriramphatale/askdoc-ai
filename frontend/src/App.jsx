import {Routes, Route, Navigate} from 'react-router'
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Chat from "./pages/Chat"

const App = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0A0A0A]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App