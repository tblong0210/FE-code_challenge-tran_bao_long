import { useEffect, useState } from 'react'

// Custom debounce hook
const useDebounce = <T>(value: T, delay: number): [T, boolean] => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)

    // Set a timeout to update the debounced value after the delay
    const handler = setTimeout(() => {
      setDebouncedValue(value)
      setIsLoading(false)
    }, delay)

    // Cleanup the timeout if the value or delay changes
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return [debouncedValue, isLoading]
}

export default useDebounce
