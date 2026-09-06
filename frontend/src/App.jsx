import {Routes, Route, Navigate} from 'react-router'
import {useAuthStore} from "./store/useAuthStore"
import {useEffect} from "react"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Chat from "./pages/Chat"

const App = () => {
  const {checkAuth, isCheckingAuth, authUser} = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[#0A0A0A]">
        <p className="text-white text-2xl">Checking authentication...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0A0A0A]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={authUser ? <Chat/> : <Navigate to={"/login"} replace />} />
        <Route path="/signup" element={!authUser ? <Signup /> : <Navigate to={"/chat"} replace />} />
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to={"/chat"} replace />} />
      </Routes>
    </div>
  )
}

export default App