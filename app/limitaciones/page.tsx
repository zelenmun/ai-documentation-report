"use client"

import { motion, useAnimation } from "framer-motion"
import { AlertTriangle, Brain, XCircle, Scale, CheckCircle, Lightbulb, Shield, Target, Sparkles } from "lucide-react"
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
      {[...Array(10)].map((_, i) => (
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

export default function LimitacionesPage() {
  const controls = useAnimation()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    controls.start("visible")
  }, [controls])

  const limitations = [
    {
      title: "Dependencia Excesiva",
      description:
        "Usar frecuentemente inteligencias artificiales puede causar una dependencia que genere pérdida de habilidades",
      details:
        "Genera gran incertidumbre sobre las habilidades basadas en el uso de IA y reduce la capacidad de pensamiento crítico independiente",
      icon: Brain,
      severity: "Alta",
      color: "from-red-500 to-orange-500",
      bgColor: "bg-red-500",
    },
    {
      title: "Respuestas Incorrectas",
      description:
        "La IA puede generar respuestas incorrectas o incoherentes si no se proporciona suficiente información",
      details:
        "Los prompts mal estructurados o con información insuficiente pueden llevar a documentación errónea o confusa",
      icon: XCircle,
      severity: "Media",
      color: "from-orange-500 to-yellow-500",
      bgColor: "bg-orange-500",
    },
    {
      title: "Asuntos Éticos",
      description: "Problemas relacionados con derechos de autor al ser entrenada con datos de diferentes fuentes",
      details:
        "Podría generar problemas legales si toma fragmentos muy grandes de otros documentos sin atribución adecuada",
      icon: Scale,
      severity: "Media",
      color: "from-yellow-500 to-amber-500",
      bgColor: "bg-yellow-500",
    },
  ]

  const recommendations = [
    {
      title: "Validar Información",
      description: "Siempre verificar y validar la información generada por la IA",
      details: "Revisar la precisión técnica, coherencia y relevancia del contenido generado antes de su uso",
      icon: CheckCircle,
      priority: "Crítica",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500",
    },
    {
      title: "Personalización",
      description: "Realizar ajustes personalizados tanto en documentación como en código",
      details: "Adaptar el contenido generado al contexto específico del proyecto y las necesidades del equipo",
      icon: Target,
      priority: "Alta",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500",
    },
    {
      title: "Uso Equilibrado",
      description: "Evitar usar la IA de forma automática para cada problema",
      details: "Mantener un balance entre automatización y pensamiento crítico independiente",
      icon: Shield,
      priority: "Alta",
      color: "from-purple-500 to-violet-500",
      bgColor: "bg-purple-500",
    },
    {
      title: "Aprendizaje Continuo",
      description: "Aprovechar las soluciones que brinda para aprender de ellas",
      details: "Usar la IA como herramienta de aprendizaje, no como sustituto del conocimiento técnico",
      icon: Lightbulb,
      priority: "Media",
      color: "from-indigo-500 to-purple-500",
      bgColor: "bg-indigo-500",
    },
  ]

  const bestPractices = [
    "Establecer procesos de revisión humana para toda documentación generada",
    "Mantener un equilibrio entre automatización y supervisión manual",
    "Capacitar al equipo en el uso efectivo de herramientas de IA",
    "Implementar controles de calidad específicos para contenido generado por IA",
    "Documentar las limitaciones conocidas de las herramientas utilizadas",
    "Establecer políticas claras sobre el uso ético de IA en documentación",
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
              <AlertTriangle className="w-10 h-10" />
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
              Limitaciones y Recomendaciones
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              Es fundamental comprender las limitaciones de la IA en documentación y seguir las mejores prácticas para
              un uso responsable y efectivo.
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

          {/* Limitations Section */}
          <motion.div
            variants={itemVariants}
            className="mb-16"
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-black via-gray-800 to-black bg-clip-text text-transparent mb-8 text-center">
              Limitaciones Principales
            </h2>

            <div className="space-y-6">
              {limitations.map((limitation, index) => {
                const Icon = limitation.icon
                return (
                  <motion.div
                    key={limitation.title}
                    variants={itemVariants}
                    whileHover={{ 
                      scale: 1.02,
                      rotateY: 2,
                      transition: { duration: 0.3 }
                    }}
                    className="perspective-1000"
                  >
                    <Card className="border-2 border-gray-200 hover:border-red-300 transition-all duration-500 bg-gradient-to-br from-white to-gray-50 shadow-lg hover:shadow-2xl relative overflow-hidden group">
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-r ${limitation.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                      />
                      
                      <ParticleSystem color="black" count={15} size={1} />
                      
                      <CardHeader className="relative z-10">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <motion.div 
                              className={`p-3 ${limitation.bgColor} text-white rounded-xl shadow-lg relative`}
                              whileHover={{ rotate: 360 }}
                              transition={{ duration: 0.6 }}
                            >
                              <Icon className="w-6 h-6" />
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
                            </motion.div>
                            <div>
                              <CardTitle className="text-xl text-black font-bold">{limitation.title}</CardTitle>
                              <p className="text-gray-600 mt-1">{limitation.description}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-sm text-gray-500">Severidad</span>
                            <p className={`font-semibold ${limitation.severity === "Alta" ? "text-red-600" : "text-orange-600"}`}>
                              {limitation.severity}
                            </p>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="relative z-10">
                        <p className="text-gray-700 leading-relaxed">{limitation.details}</p>
                      </CardContent>

                      {/* Animated corner decoration */}
                      <motion.div
                        className="absolute top-0 right-0 w-20 h-20 bg-red-500 opacity-5 rounded-bl-full"
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
                )
              })}
            </div>
          </motion.div>

          {/* Recommendations Section */}
          <motion.div
            variants={itemVariants}
            className="mb-16"
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-black via-gray-800 to-black bg-clip-text text-transparent mb-8 text-center">
              Recomendaciones para Uso Correcto
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {recommendations.map((recommendation, index) => {
                const Icon = recommendation.icon
                return (
                  <motion.div
                    key={recommendation.title}
                    variants={itemVariants}
                    whileHover={{ 
                      scale: 1.05,
                      rotateY: 5,
                      transition: { duration: 0.3 }
                    }}
                    className="perspective-1000"
                  >
                    <Card className="border-2 border-gray-200 hover:border-green-300 transition-all duration-500 h-full bg-gradient-to-br from-white to-gray-50 shadow-lg hover:shadow-2xl relative overflow-hidden group">
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-r ${recommendation.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                      />
                      
                      <CardHeader className="relative z-10">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <motion.div
                              className={`p-3 ${recommendation.bgColor} text-white rounded-xl shadow-lg relative`}
                              whileHover={{ rotate: 360 }}
                              transition={{ duration: 0.6 }}
                            >
                              <Icon className="w-6 h-6" />
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
                            </motion.div>
                            <CardTitle className="text-lg text-black font-bold">{recommendation.title}</CardTitle>
                          </div>
                          <div className="text-right">
                            <span className="text-sm text-gray-500">Prioridad</span>
                            <p className={`font-semibold ${
                              recommendation.priority === "Crítica"
                                ? "text-red-600"
                                : recommendation.priority === "Alta"
                                  ? "text-orange-600"
                                  : "text-yellow-600"
                            }`}>
                              {recommendation.priority}
                            </p>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="relative z-10">
                        <p className="text-gray-600 leading-relaxed mb-3">{recommendation.description}</p>
                        <p className="text-gray-700 text-sm leading-relaxed">{recommendation.details}</p>
                      </CardContent>

                      {/* Animated corner decoration */}
                      <motion.div
                        className="absolute top-0 right-0 w-20 h-20 bg-green-500 opacity-5 rounded-bl-full"
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
                )
              })}
            </div>
          </motion.div>

          {/* Best Practices Section */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-8 mb-12 shadow-lg border border-gray-200 relative overflow-hidden"
          >
            <ParticleSystem color="black" count={25} size={1} />
            
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-1 bg-gradient-to-r from-black to-gray-600 rounded-full mb-6"
            />
            
            <h2 className="text-3xl font-bold text-black mb-6 relative z-10">Mejores Prácticas</h2>
            <div className="grid md:grid-cols-2 gap-4 relative z-10">
              {bestPractices.map((practice, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 1.4 + index * 0.05 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="flex items-start space-x-3 bg-white p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  >
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  </motion.div>
                  <p className="text-gray-700 text-sm leading-relaxed">{practice}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Final Message Section */}
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
                <h2 className="text-3xl font-bold">Mensaje Final</h2>
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="text-gray-300 text-lg leading-relaxed mb-4"
              >
                La inteligencia artificial es una herramienta poderosa que puede transformar significativamente la forma
                en que documentamos el software, pero debe usarse con responsabilidad y criterio.
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                className="text-gray-300 text-lg leading-relaxed"
              >
                El éxito en la implementación de IA para documentación depende de encontrar el equilibrio perfecto entre
                automatización y supervisión humana, siempre manteniendo la calidad y precisión como prioridades
                fundamentales.
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
