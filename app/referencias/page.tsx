"use client"

import { motion, useAnimation } from "framer-motion"
import { BookOpen, ExternalLink, Calendar, User, Sparkles } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
          }}
          animate={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear"
          }}
        />
      ))}
    </div>
  )
}

export default function ReferenciasPage() {
  const controls = useAnimation()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    controls.start("visible")
  }, [controls])

  const references = [
    {
      id: 1,
      title: "Gestión de la calidad en el desarrollo de software: planificación, gestión y control",
      author: "3digits",
      date: "2024, septiembre 27",
      url: "https://www.3digits.es/blog/gestion-de-la-calidad-en-el-desarrollo-de-software.html",
      type: "Blog",
    },
    {
      id: 2,
      title: "La gestión documental con IA",
      author: "Ayerdi, A.",
      date: "2025, febrero 14",
      url: "https://start.docuware.com/es/blog/gestion-documental-ia",
      type: "Blog",
    },
    {
      id: 3,
      title: "Prompts para ChatGPT: ¿Qué son y cómo hacerlos efectivos?",
      author: "Cursos Femxa",
      date: "2023, 6 de junio",
      url: "https://www.cursosfemxa.es/blog/prompts-chatgpt",
      type: "Blog",
    },
    {
      id: 4,
      title: "¿Cómo escribir un prompt para la inteligencia artificial?",
      author: "Duoc UC",
      date: "s.f.",
      url: "https://bibliotecas.duoc.cl/introduccion-ia/como-escribir-un-prompt",
      type: "Guía",
    },
    {
      id: 5,
      title: "Documentación de Software: Su Guía para una Gran Documentación",
      author: "Guru",
      date: "s.f.",
      url: "https://www.getguru.com/es/reference/software-documentation",
      type: "Referencia",
    },
    {
      id: 6,
      title: "La documentación: El secreto para optimizar procesos y evitar errores costosos",
      author: "Itequia",
      date: "2024, abril 29",
      url: "https://itequia.com/es/la-documentacion-el-secreto-para-optimizar-procesos-y-evitar-errores-costosos/",
      type: "Blog",
    },
    {
      id: 7,
      title: "Soluciones de documentación con IA para desarrollo moderno",
      author: "Kingsley, O.",
      date: "2025, julio 4",
      url: "https://apidog.com/es/blog/ai-powered-documentation-solutions/",
      type: "Blog",
    },
    {
      id: 8,
      title: "Mantenimiento de software",
      author: "Mantenimiento.win",
      date: "2019, enero 20",
      url: "https://mantenimiento.win/mantenimiento-de-software/",
      type: "Web",
    },
    {
      id: 9,
      title: "El flujo de trabajo de la IA",
      author: "O'Brien, K., & Downie, A.",
      date: "2024, noviembre 11",
      url: "https://www.ibm.com/es-es/think/topics/ai-workflow",
      type: "IBM Think",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      <FloatingElements />
      
      <div className="container mx-auto px-6 py-12 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative"
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
                  boxShadow: [
                    "0 0 20px rgba(0,0,0,0.3)",
                    "0 0 40px rgba(0,0,0,0.5)",
                    "0 0 20px rgba(0,0,0,0.3)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl font-bold bg-gradient-to-r from-black via-gray-800 to-black bg-clip-text text-transparent mb-4"
            >
              Referencias Bibliográficas
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              Fuentes consultadas para la elaboración de este informe sobre el uso de IA en documentación de 
              desarrollo de software.
            </motion.p>

            {/* Decorative elements */}
            <motion.div
              className="absolute -top-10 -left-10 w-20 h-20 bg-black rounded-full opacity-5"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute -bottom-5 -right-10 w-16 h-16 bg-black rounded-full opacity-5"
              animate={{
                scale: [1, 0.8, 1],
                rotate: [360, 180, 0]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            />
          </div>

          {/* References List */}
          <div className="space-y-6 mb-12">
            {references.map((reference, index) => (
              <motion.div
                key={reference.id}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.02,
                  rotateY: 2,
                  transition: { duration: 0.3 }
                }}
                className="perspective-1000 group"
              >
                <Card className="border-2 border-gray-200 hover:border-gray-400 transition-all duration-500 h-full bg-gradient-to-br from-white to-gray-50 shadow-lg hover:shadow-2xl relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                    style={{ background: `linear-gradient(135deg, transparent, rgba(0,0,0,0.1))` }}
                  />
                  
                  <ParticleSystem color="black" count={15} size={1} />
                  
                  <CardHeader className="relative z-10">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <motion.span 
                            className="text-2xl font-bold text-black"
                            whileHover={{ scale: 1.1 }}
                          >
                            [{reference.id}]
                          </motion.span>
                          <motion.div
                            className={`px-3 py-1 bg-gradient-to-r from-black to-gray-800 text-white text-xs font-semibold rounded-full shadow-lg`}
                            whileHover={{ scale: 1.05 }}
                          >
                            {reference.type}
                          </motion.div>
                        </div>
                        <CardTitle className="text-lg text-black leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                          {reference.title}
                        </CardTitle>
                      </div>
                      <motion.a
                        href={reference.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-3 bg-gradient-to-r from-black to-gray-700 text-white rounded-xl shadow-lg transition-all duration-300 flex-shrink-0 relative"
                      >
                        <ExternalLink className="w-5 h-5" />
                        <motion.div
                          className="absolute inset-0 rounded-xl"
                          animate={{
                            boxShadow: [
                              "0 0 0px rgba(0,0,0,0)",
                              "0 0 20px rgba(0,0,0,0.3)",
                              "0 0 0px rgba(0,0,0,0)"
                            ]
                          }}
                          transition={{ duration: 3, repeat: Infinity }}
                        />
                      </motion.a>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="relative z-10">
                    <div className="flex items-center space-x-6 text-gray-600 mb-3">
                      <motion.div 
                        className="flex items-center space-x-2"
                        whileHover={{ scale: 1.05 }}
                      >
                        <User className="w-4 h-4" />
                        <span className="text-sm">{reference.author}</span>
                      </motion.div>
                      <motion.div 
                        className="flex items-center space-x-2"
                        whileHover={{ scale: 1.05 }}
                      >
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{reference.date}</span>
                      </motion.div>
                    </div>
                    <div className="mt-3">
                      <a
                        href={reference.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm break-all transition-colors duration-300"
                      >
                        {reference.url}
                      </a>
                    </div>
                  </CardContent>

                  {/* Animated corner decoration */}
                  <motion.div
                    className="absolute top-0 right-0 w-20 h-20 bg-black opacity-5 rounded-bl-full"
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ 
                      duration: 2 + index * 0.5, 
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Citation Format Section */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-8 mb-12 shadow-lg border border-gray-200 relative overflow-hidden"
          >
            <ParticleSystem color="black" count={20} size={1} />
            
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-1 bg-gradient-to-r from-black to-gray-600 rounded-full mb-6"
            />
            
            <h2 className="text-3xl font-bold text-black mb-6 relative z-10">
              Formato de Citación
            </h2>
            
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-gray-700 text-lg leading-relaxed mb-6 relative z-10"
            >
              Las referencias han sido organizadas siguiendo un formato académico estándar, incluyendo:
            </motion.p>
            
            <div className="space-y-3 relative z-10">
              {[
                "Autor(es) o entidad responsable",
                "Fecha de publicación",
                "Título del documento o artículo",
                "URL de acceso"
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <motion.span 
                    className="w-3 h-3 bg-black rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                  />
                  <span className="text-gray-700">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Academic Note */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-black via-gray-900 to-black text-white rounded-2xl p-8 shadow-2xl relative overflow-hidden"
          >
            <ParticleSystem color="white" count={40} size={2} />
            
            {/* Animated background pattern */}
            <div className="absolute inset-0">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-32 h-32 border border-white rounded-full opacity-5"
                  style={{
                    left: `${20 + (i * 15)}%`,
                    top: `${10 + (i % 2) * 60}%`,
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 360]
                  }}
                  transition={{
                    duration: 10 + i * 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              ))}
            </div>

            <div className="relative z-10">
              <motion.div className="flex items-center mb-6">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="mr-4"
                >
                  <Sparkles className="w-8 h-8 text-white" />
                </motion.div>
                <h2 className="text-3xl font-bold">Nota Académica</h2>
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="text-gray-300 text-lg leading-relaxed mb-4"
              >
                Todas las fuentes consultadas han sido verificadas y son de acceso público. Las referencias incluyen una
                combinación de recursos académicos, blogs especializados y documentación técnica oficial.
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                className="text-gray-300 text-lg leading-relaxed"
              >
                Este trabajo de investigación se ha desarrollado siguiendo los estándares académicos de la Universidad de
                Especialidades Espíritu Santo para la asignatura de Tecnologías Disruptivas.
              </motion.p>

              {/* Final animated element */}
              <motion.div className="mt-8 flex justify-center">
                <motion.div
                  className="w-16 h-1 bg-gradient-to-r from-white via-gray-400 to-white rounded-full"
                  animate={{
                    scaleX: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </motion.div>
              
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
