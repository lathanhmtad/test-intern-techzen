import { useState } from "react";
import { Loader } from "lucide-react";
import { toast } from "sonner"

const usePost = () => {
  const [loading, setLoading] = useState(false)

  const handlePost = async (url, postData) => {
    const toastId = toast.loading(<div className="flex items-center">
      <Loader className="animate-spin mr-2" />
      Please wait...
    </div>)
    setLoading(true)

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(postData)
      })

      const data = await response.json()
      if (response.ok) {
        toast.dismiss(toastId)
        toast.success(data.message || 'Successfully')
        return {
          success: true,
          data,
        }
      }
      else {
        toast.dismiss(toastId)
        toast.error(data.message || 'An error occurred')
        return {
          success: false,
          data
        }
      }
    } catch (e) {
      toast.dismiss(toastId)
      console.log(e)
      toast.error('Internal server error')
    } finally {
      setLoading(false)
    }
  }

  return {
    handlePost,
    loading
  }
}

export default usePost