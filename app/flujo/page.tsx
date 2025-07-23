"use client"

import { motion, useAnimation } from "framer-motion"
import { Workflow, Search, Settings, FileText, Zap, RefreshCw, Eye, Share2, Users, ArrowRight, Sparkles, TrendingUp } from "lucide-react"
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

const useIsClient = () => {
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])
  return isClient
}


// Floating elements component
const FloatingElements = () => {
  const isClient = useIsClient()
  if (!isClient) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(12)].map((_, i) => (
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

export default function FlujoPage() {
  const controls = useAnimation()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    controls.start("visible")
  }, [controls])

  const steps = [
    {
      title: "Detectar la Necesidad",
      description: "El desarrollador identifica la necesidad de documentación durante el trabajo",
      details: "Principalmente para APIs, funciones y triggers claros del código",
      icon: Search,
      color: "from-black to-cyan-800",
      number: 1,
    },
    {
      title: "Abrir Herramienta",
      description: "Usar programas integrados al entorno de desarrollo",
      details: "Como Apidog, GitHub Copilot o Mintlify unidos al lugar donde se crea código",
      icon: Settings,
      color: "from-black to-cyan-800",
      number: 2,
    },
    {
      title: "Proporcionar Información",
      description: "Introducir descripción clara o análisis automático del código",
      details: "La IA recibe el contexto necesario para generar documentación precisa",
      icon: FileText,
      color: "from-black to-cyan-800",
      number: 3,
    },
    {
      title: "Análisis y Generación",
      description: "La IA examina la sintaxis, contexto e identifica funcionalidades",
      details: "Determina qué hace, qué necesita, cómo usarlo y si hay problemas",
      icon: Zap,
      color: "from-black to-cyan-800",
      number: 4,
    },
    {
      title: "Actualización Automática",
      description: "Monitoreo y cambios instantáneos en la documentación",
      details: "Vigila y actualiza solo el documento cuando el código evoluciona",
      icon: RefreshCw,
      color: "from-black to-cyan-800",
      number: 5,
    },
    {
      title: "Revisión y Ajuste",
      description: "El desarrollador revisa y modifica lo generado",
      details: "Mejora la documentación según la audiencia objetivo",
      icon: Eye,
      color: "from-black to-cyan-800",
      number: 6,
    },
    {
      title: "Publicación",
      description: "Publicación en portales de documentación",
      details: "Wikis de equipo o plataformas de conocimiento compartido",
      icon: Share2,
      color: "from-black to-cyan-800",
      number: 7,
    },
    {
      title: "Colaboración",
      description: "Revisión y retroalimentación del equipo",
      details: "Sobre claridad, precisión y completitud de la documentación generada",
      icon: Users,
      color: "from-black to-cyan-800",
      number: 8,
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
              <Workflow className="w-10 h-10" />
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
              Flujo de Uso: Documentación con IA
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              Flujo de trabajo optimizado para implementar documentación impulsada por inteligencia artificial en el
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

          {/* Workflow Steps */}
          <div className="space-y-8 mb-16">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isEven = index % 2 === 0

              return (
                <motion.div
                  key={step.number}
                  variants={itemVariants}
                  className={`flex items-center gap-8 ${isEven ? "flex-row" : "flex-row-reverse"}`}
                >
                  {/* Step Card */}
                  <motion.div 
                    className="flex-1"
                    whileHover={{ 
                      scale: 1.02,
                      rotateY: isEven ? 2 : -2,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <Card className="border-2 border-gray-200 hover:border-gray-400 transition-all duration-500 h-full bg-gradient-to-br from-white to-gray-50 shadow-lg hover:shadow-2xl relative overflow-hidden group">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                        style={{ background: `linear-gradient(135deg, transparent, rgba(0,0,0,0.1))` }}
                      />
                      
                      <ParticleSystem color="black" count={15} size={1} />
                      
                      <CardHeader className="relative z-10">
                        <div className="flex items-center space-x-4">
                          <motion.div 
                            className={`p-4 bg-gradient-to-r ${step.color} text-white rounded-xl shadow-lg relative`}
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                          >
                            <Icon className="w-7 h-7" />
                            <motion.div
                              className="absolute inset-0 rounded-xl"
                              animate={{
                                boxShadow: [
                                  "0 0 0px rgba(0,0,0,0)",
                                  "0 0 25px rgba(0,0,0,0.3)",
                                  "0 0 0px rgba(0,0,0,0)"
                                ]
                              }}
                              transition={{ duration: 3, repeat: Infinity }}
                            />
                          </motion.div>
                          <div>
                            <CardTitle className="text-xl text-black font-bold">
                              Paso {step.number}: {step.title}
                            </CardTitle>
                            <p className="text-gray-600 mt-1">{step.description}</p>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="relative z-10">
                        <p className="text-gray-700 leading-relaxed">{step.details}</p>
                      </CardContent>

                      {/* Animated corner decoration */}
                      <motion.div
                        className="absolute top-0 right-0 w-24 h-24 bg-black opacity-5 rounded-bl-full"
                        animate={{
                          scale: [1, 1.1, 1],
                        }}
                        transition={{ 
                          duration: 2 + index * 0.3, 
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                      />
                    </Card>
                  </motion.div>

                  {/* Arrow */}
                  {index < steps.length - 1 && (
                    <div className="flex-shrink-0">
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        className="w-14 h-14 bg-gradient-to-r from-black to-gray-700 text-white rounded-full flex items-center justify-center shadow-lg"
                      >
                        <ArrowRight className="w-7 h-7" />
                      </motion.div>
                    </div>
                  )}

                  {/* Spacer for alignment */}
                  <div className="flex-1"></div>
                </motion.div>
              )
            })}
          </div>

          {/* Benefits Section */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-8 mb-12 shadow-lg border border-gray-200 relative overflow-hidden"
          >
            <ParticleSystem color="black" count={25} size={1} />
            
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, delay: 1.2 }}
              className="h-1 bg-gradient-to-r from-black to-gray-600 rounded-full mb-6"
            />
            
            <h2 className="text-3xl font-bold text-black mb-8 relative z-10 flex items-center">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="mr-4"
              >
                <Sparkles className="w-8 h-8 text-black" />
              </motion.div>
              Beneficios del Flujo Optimizado
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 relative z-10">
              {[
                { icon: Zap, title: "Eficiencia", desc: "Reduce significativamente el tiempo dedicado a documentar manualmente", color: "from-black to-gray-800" },
                { icon: RefreshCw, title: "Actualización", desc: "Mantiene la documentación sincronizada con los cambios del código", color: "from-black to-gray-800" },
                { icon: Users, title: "Colaboración", desc: "Facilita el trabajo en equipo y la integración de nuevos miembros", color: "from-black to-gray-800" }
              ].map((benefit, index) => {
                const BenefitIcon = benefit.icon
                return (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.4 + index * 0.2 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="text-center group"
                  >
                    <motion.div 
                      className={`w-20 h-20 bg-gradient-to-r ${benefit.color} text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg relative`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.8 }}
                    >
                      <BenefitIcon className="w-10 h-10" />
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        animate={{
                          boxShadow: [
                            "0 0 0px rgba(0,0,0,0)",
                            "0 0 30px rgba(0,0,0,0.3)",
                            "0 0 0px rgba(0,0,0,0)"
                          ]
                        }}
                        transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                      />
                    </motion.div>
                    <h3 className="text-xl font-bold text-black mb-3 group-hover:text-gray-700 transition-colors">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{benefit.desc}</p>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Implementation Tips */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-black via-gray-900 to-black text-white rounded-2xl p-8 shadow-2xl relative overflow-hidden"
          >
            <ParticleSystem color="white" count={35} size={2} />
            
            {/* Animated background pattern */}
            <div className="absolute inset-0">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-32 h-32 border border-white rounded-full opacity-5"
                  style={{
                    left: `${15 + (i * 12)}%`,
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
              <motion.div className="flex items-center mb-8">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="mr-4"
                >
                  <TrendingUp className="w-8 h-8 text-white" />
                </motion.div>
                <h2 className="text-3xl font-bold">Consejos para la Implementación</h2>
              </motion.div>
              
              <div className="grid md:grid-cols-2 gap-12">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 1.6 }}
                >
                  <h3 className="text-xl font-bold mb-6 flex items-center">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-3 h-3 bg-white rounded-full mr-3"
                    />
                    Preparación
                  </h3>
                  <ul className="space-y-4 text-gray-300">
                    <motion.li
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 1.8 }}
                      className="flex items-start"
                    >
                      <span className="text-white mr-3">•</span>
                      Identifica las herramientas más adecuadas para tu stack tecnológico
                    </motion.li>
                    <motion.li
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 2.0 }}
                      className="flex items-start"
                    >
                      <span className="text-white mr-3">•</span>
                      Establece estándares de documentación para el equipo
                    </motion.li>
                    <motion.li
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 2.2 }}
                      className="flex items-start"
                    >
                      <span className="text-white mr-3">•</span>
                      Define los tipos de documentación que se generarán automáticamente
                    </motion.li>
                  </ul>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 1.8 }}
                >
                  <h3 className="text-xl font-bold mb-6 flex items-center">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                      className="w-3 h-3 bg-white rounded-full mr-3"
                    />
                    Mejores Prácticas
                  </h3>
                  <ul className="space-y-4 text-gray-300">
                    <motion.li
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 2.0 }}
                      className="flex items-start"
                    >
                      <span className="text-white mr-3">•</span>
                      Revisa siempre la documentación generada antes de publicar
                    </motion.li>
                    <motion.li
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 2.2 }}
                      className="flex items-start"
                    >
                      <span className="text-white mr-3">•</span>
                      Mantén un proceso de retroalimentación continua
                    </motion.li>
                    <motion.li
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 2.4 }}
                      className="flex items-start"
                    >
                      <span className="text-white mr-3">•</span>
                      Integra la documentación en tu pipeline de CI/CD
                    </motion.li>
                  </ul>
                </motion.div>
              </div>

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
