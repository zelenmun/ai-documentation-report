'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const FloatingElements = () => {
  const [isClient, setIsClient] = useState(false)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    })
    setIsClient(true)
  }, [])

  if (!isClient) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-black rounded-full opacity-10"
          initial={{
            x: Math.random() * windowSize.width,  // Usar el estado
            y: Math.random() * windowSize.height, // Usar el estado
          }}
          animate={{
            x: Math.random() * windowSize.width,
            y: Math.random() * windowSize.height,
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}

export default FloatingElements