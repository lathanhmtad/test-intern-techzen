import { useState } from "react"

const useFetch = () => {
  const [loading, setLoading] = useState(false)

  const handleFetch = async (url) => {
    setLoading(true)

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })

      const data = await response.json()
      if (response.ok) {
        return {
          success: true,
          data,
        }
      }
      else {
        return {
          success: false,
          data
        }
      }
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  return {
    handleFetch,
    loading
  }
}

export default useFetch