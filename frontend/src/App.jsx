import { useEffect } from "react"
import { Toaster as Sonner } from "sonner"
import { Loader } from "lucide-react"
import { Toaster } from "@/components/ui/toaster"

import Navbar from "@/components/client/Navbar"
import Sidebar from "@/components/client/Sidebar"
import { env } from "@/env/environments"
import useFetch from "@/hooks/useFetch"
import useAuthStore from "@/stores/useAuthStore"
import ManageBooks from "@/pages/ManageBooks"

function App() {

  const isAuthenticated = useAuthStore(state => state.isAuthenticated)
  const setIsAuthenticated = useAuthStore(state => state.setIsAuthenticated)
  const setParticipant = useAuthStore(state => state.setParticipant)

  const { handleFetch, loading } = useFetch()

  // const getCurrentUser = async () => {
  //   const { data, success } = await handleFetch(`${env.BACKEND_URL}/auth/me`)
  //   if (success) {
  //     setIsAuthenticated(true)
  //     setParticipant(data)
  //   }
  //   else {
  //     setIsAuthenticated(false)
  //     setParticipant(null)
  //   }
  // }

  // useEffect(() => {
  //   getCurrentUser()
  // }, [isAuthenticated])

  return (
    <div className="h-[1500px]">
      {loading ? <div className="flex flex-col items-center justify-center h-screen gap-2 text-xl">
        Loading site...
        <Loader className="animate-spin mr-2" />
      </div>
        :
        <>
          <Navbar />
          <Sidebar />
          <div className="ml-sidebar">
            <div className="mt-10 mx-12">
              <ManageBooks />
            </div>
          </div>
        </>
      }

      <Sonner position="top-center" richColors />
      <Toaster />
    </div>
  )
}

export default App
