import { useEffect, useState } from 'react'

export const useExternalScript = (
  url: string,
  { onLoad }: { onLoad?: () => void } = {}
) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (isLoaded) return
    const script = document.createElement('script')
    script.src = url
    script.async = true
    document.head.appendChild(script)

    script.onload = () => {
      setIsLoaded(true)
      onLoad?.()
    }
    script.onerror = () => setError(true)

    return () => {
      document.head.removeChild(script)
    }
  }, [url, onLoad, isLoaded])

  return {
    isLoaded,
    error,
  }
}
