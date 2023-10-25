import { useEffect, useRef, useState } from 'react'

function useBodyScrollLock(initLocked = true) {
  const [isLocked, setIsLocked] = useState(initLocked)
  const originalStyle = useRef('')

  const lock = () => {
    document.body.style.overflow = 'hidden'
  }
  const unLock = () => {
    document.body.style.overflow = originalStyle.current
  }
  const toggleLocked = () => setIsLocked((locked) => !locked)

  useEffect(() => {
    originalStyle.current = window.getComputedStyle(document.body).overflow
    return () => {
      unLock()
    }
  }, [])

  useEffect(() => {
    if (isLocked) {
      lock()
    } else {
      unLock()
    }
  }, [isLocked])

  return { isLocked, toggleLocked, lock, unLock }
}

export default useBodyScrollLock
