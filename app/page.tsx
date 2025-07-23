"use client"

import { motion, useAnimation } from "framer-motion"
import { BookOpen, Users, Calendar, MapPin, Sparkles, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState, useRef } from "react"

// Particle system for animated backgrounds
const ParticleSystem = ({ color = "black", count = 50, size = 2 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [particles, setParticles] = useState<
    { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[]
  >([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width
    canvas.height = rect.height

    // Initialize particles
    const initialParticles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * size + 1,
      opacity: Math.random() * 0.8 + 0.2,
    }))
    setParticles(initialParticles)

    let animationId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      setParticles(prevParticles =>
        prevParticles.map(particle => {
          // Update position
          particle.x += particle.vx
          particle.y += particle.vy

          // Bounce off edges
          if (particle.x <= 0 || particle.x >= canvas.width) particle.vx *= -1
          if (particle.y <= 0 || particle.y >= canvas.height) particle.vy *= -1

          // Keep particles within bounds
          particle.x = Math.max(0, Math.min(canvas.width, particle.x))
          particle.y = Math.max(0, Math.min(canvas.height, particle.y))

          // Draw particle
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fillStyle = color === 'black'
            ? `rgba(0, 0, 0, ${particle.opacity * 0.3})`
            : `rgba(255, 255, 255, ${particle.opacity * 0.6})`
          ctx.fill()

          return particle
        })
      )

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationId) cancelAnimationFrame(animationId)
    }
  }, [color, count, size])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ width: '100%', height: '100%' }}
    />
  )
}

// Floating elements component
const FloatingElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-black rounded-full opacity-10"
          initial={{
            x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
            y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
          }}
          animate={{
            x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
            y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}

export default function HomePage() {
  const controls = useAnimation()

  useEffect(() => {
    controls.start("visible")
  }, [controls])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const
      },
    },
  }

  const cardHoverVariants = {
    hover: {
      scale: 1.05,
      rotateY: 5,
      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
      transition: { duration: 0.3 },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      <FloatingElements />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-6 py-12 relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-16 relative">
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-black to-gray-800 text-white rounded-full mb-6 shadow-2xl relative"
          >
            <BookOpen className="w-10 h-10" />
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                boxShadow: ["0 0 20px rgba(0,0,0,0.3)", "0 0 40px rgba(0,0,0,0.5)", "0 0 20px rgba(0,0,0,0.3)"],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl font-bold bg-gradient-to-r from-black via-gray-800 to-black bg-clip-text text-transparent mb-4"
          >
            USO DE IA PARA DOCUMENTACIÓN
          </motion.h1>

          <motion.h2
            variants={itemVariants}
            className="text-4xl font-light bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent mb-8"
          >
            EN DESARROLLO DE SOFTWARE
          </motion.h2>

          <motion.div
            variants={itemVariants}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
            }}
            className="bg-gradient-to-r from-black via-gray-900 to-black text-white px-8 py-6 rounded-2xl inline-block shadow-2xl relative overflow-hidden"
          >
            <ParticleSystem color="white" count={20} size={1} />

            <div className="relative z-10 flex items-center">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="mr-4"
              >
                <Sparkles className="w-6 h-6" />
              </motion.div>
              <p className="text-xl font-bold">UNIVERSIDAD ESPÍRITU SANTO</p>
            </div>

            {/* Animated border */}
            <motion.div
              className="absolute inset-0 rounded-2xl"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(255,255,255,0.2)",
                  "0 0 40px rgba(255,255,255,0.4)",
                  "0 0 20px rgba(255,255,255,0.2)",
                ],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            />
          </motion.div>

          {/* Decorative elements */}
          <motion.div
            className="absolute -top-10 -left-10 w-20 h-20 bg-black rounded-full opacity-5"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
          <motion.div
            className="absolute -bottom-5 -right-10 w-16 h-16 bg-black rounded-full opacity-5"
            animate={{
              scale: [1, 0.8, 1],
              rotate: [360, 180, 0],
            }}
            transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: BookOpen,
              title: "ASIGNATURA",
              content: "Tecnologías Disruptivas",
              color: "from-blue-500 to-purple-500",
            },
            {
              icon: Users,
              title: "DOCENTE",
              content: "Ing. Solange Matute Franco",
              color: "from-purple-500 to-pink-500",
            },
            { icon: Calendar, title: "PERÍODO", content: "3er Período Académico", color: "from-green-500 to-teal-500" },
          ].map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div key={item.title} variants={itemVariants} whileHover="hover">
                <motion.div variants={cardHoverVariants} className="perspective-1000">
                  <Card className="border-2 border-gray-200 hover:border-gray-400 transition-all duration-500 h-full bg-gradient-to-br from-white to-gray-50 shadow-lg hover:shadow-2xl relative overflow-hidden group">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                      style={{ background: `linear-gradient(135deg, transparent, rgba(0,0,0,0.1))` }}
                    />

                    <CardContent className="p-8 text-center relative z-10">
                      <motion.div
                        className="relative mb-6"
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="w-16 h-16 mx-auto bg-gradient-to-r from-black to-gray-800 rounded-2xl flex items-center justify-center shadow-lg">
                          <Icon className="w-8 h-8 text-white" />
                        </div>

                        <motion.div
                          className="absolute inset-0 rounded-2xl"
                          animate={{
                            boxShadow: ["0 0 0px rgba(0,0,0,0)", "0 0 30px rgba(0,0,0,0.1)", "0 0 0px rgba(0,0,0,0)"],
                          }}
                          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: index * 0.5 }}
                        />
                      </motion.div>

                      <h3 className="font-bold text-black mb-3 text-lg">{item.title}</h3>
                      <p className="text-gray-600 font-medium">{item.content}</p>
                    </CardContent>

                    {/* Animated corner decoration */}
                    <motion.div
                      className="absolute top-0 right-0 w-20 h-20 bg-black opacity-5 rounded-bl-full"
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 2 + index * 0.5,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                      }}
                    />
                  </Card>
                </motion.div>
              </motion.div>
            )
          })}
        </div>

        {/* Authors Section */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-8 mb-16 shadow-lg border border-gray-200 relative overflow-hidden"
        >
          <ParticleSystem color="black" count={25} size={1} />

          <div className="relative z-10">
            <motion.div className="text-center mb-8">
              <motion.h3
                className="text-3xl font-bold text-black mb-4"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                AUTORES
              </motion.h3>

              <motion.div
                className="w-24 h-1 bg-gradient-to-r from-black to-gray-600 rounded-full mx-auto"
                initial={{ width: 0 }}
                animate={{ width: 96 }}
                transition={{ duration: 1, delay: 1 }}
              />
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                "Oscar Morán Gómez",
                "Paula Andrade Orellana",
                "Ryan Consuegra Morán",
                "Bismarck Izquierdo Montero",
                "Kevin Osandón Valencia",
                "Kevin Martínez Gavilánez",
                "Kerly Hernández Carrera",
                "Darwin Orrala Onofre",
              ].map((author, index) => (
                <motion.div
                  key={author}
                  initial={{ opacity: 0, x: -30, rotateY: -15 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.9 + index * 0.1,
                    type: "spring",
                    stiffness: 100,
                  }}
                  whileHover={{
                    scale: 1.05,
                    rotateY: 5,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                  }}
                  className="bg-white p-6 rounded-xl border-2 border-gray-200 hover:border-gray-400 transition-all duration-300 shadow-md hover:shadow-xl relative group overflow-hidden"
                >

                  <p className="text-black font-bold text-center text-sm leading-relaxed">{author}</p>

                  {/* Author index badge */}
                  <motion.div
                    className="absolute top-2 right-2 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 1.2 + index * 0.1 }}
                  >
                    {index + 1}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Background decorative elements */}
          <div className="absolute inset-0 opacity-5">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-40 h-40 border-2 border-black rounded-full"
                style={{
                  left: `${10 + i * 25}%`,
                  top: `${20 + (i % 2) * 50}%`,
                }}
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 15 + i * 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Date */}
        
      </motion.div>
    </div>
  )
}
