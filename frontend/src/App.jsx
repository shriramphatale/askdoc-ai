import {Routes, Route, Navigate} from 'react-router'
import {useAuthStore} from "./store/useAuthStore"
import {useDocumentStore} from "./store/useDocumentStore"
import {useEffect} from "react"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Chat from "./pages/Chat"

const App = () => {
  const {checkAuth, isCheckingAuth, authUser} = useAuthStore()
  const {isUploading} = useDocumentStore()

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
      {/* Document uploading overlay */}
      {isUploading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div className="w-64">
                <p className="mb-3 text-center font-mono text-sm text-zinc-300">
                    Uploading document...
                </p>

                <div className="h-[2px] w-full overflow-hidden bg-zinc-800">
                    <div className="h-full w-1/3 bg-zinc-200 animate-[upload_1.2s_ease-in-out_infinite]" />
                </div>
            </div>
        </div>
      )}

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