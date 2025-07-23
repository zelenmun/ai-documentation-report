'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const FloatingElements = () => {
  const [elements, setElements] = useState<Array<{x: number, y: number, targetX: number, targetY: number}>>([])

  useEffect(() => {
    const generateElements = () => {
      return [...Array(8)].map(() => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        targetX: Math.random() * window.innerWidth,
        targetY: Math.random() * window.innerHeight,
      }))
    }

    setElements(generateElements())
  }, [])

  if (elements.length === 0) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map((element, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-black rounded-full opacity-10"
          initial={{
            x: element.x,
            y: element.y,
          }}
          animate={{
            x: element.targetX,
            y: element.targetY,
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