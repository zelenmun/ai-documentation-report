"use client"

import { motion, useAnimation } from "framer-motion"
import { BarChart3, Star, Zap, DollarSign, Brain, Image, Sparkles } from "lucide-react"
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

export default function HerramientasPage() {
  const controls = useAnimation()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    controls.start("visible")
  }, [controls])

  const tools = [
    {
      name: "Claude 4",
      description: "Uno de los mejores en codificación, maneja gran cantidad de tokens con razonamiento híbrido",
      strengths: ["Codificación: 72.7%", "Razonamiento: 90% AIME", "Generación de imágenes competente"],
      pricing: "Versión Premium",
      color: "from-black to-gray-800",
      icon: Brain,
    },
    {
      name: "Grok 3",
      description: "Construido con más de 200,000 GPUs NVIDIA, excelente razonamiento matemático",
      strengths: ["Razonamiento: 93.3% AIME", "GPQA: 84.6%", "Acceso a datos de X en tiempo real"],
      pricing: "$3 a $15",
      color: "from-black to-gray-800",
      icon: Zap,
    },
    {
      name: "ChatGPT",
      description: "Líder con GPT4.5, buen razonamiento y entendimiento contextual natural",
      strengths: ["Razonamiento general excelente", "Conversación natural", "Soporte multimodal sólido"],
      pricing: "$0.30 - $15",
      color: "from-black to-gray-800",
      icon: Star,
    },
    {
      name: "DeepSeek",
      description: "Destaca en eficiencia de costo y acceso libre, preciso en Python",
      strengths: ["Preciso en Python", "87.5% AIME", "Eficiente en costo"],
      pricing: "Gratuito limitado",
      color: "from-black to-gray-800",
      icon: DollarSign,
    },
  ]

  const comparisonData = [
    {
      area: "Codificación",
      claude: "72.7% - Lidera",
      grok: "Muy alto",
      chatgpt: "Competente",
      deepseek: "Preciso en Python",
    },
    {
      area: "Razonamiento Matemático",
      claude: "90% AIME",
      grok: "93.3% AIME, 84.6% GPQA",
      chatgpt: "Excelente general",
      deepseek: "87.5% AIME",
    },
    {
      area: "Multimodalidad",
      claude: "Generación competente",
      grok: "Decente en imagen",
      chatgpt: "Soporte sólido",
      deepseek: "Limitado",
    },
    {
      area: "Velocidad y Costo",
      claude: "Versión Premium",
      grok: "$3 a $15",
      chatgpt: "$0.30 - $15",
      deepseek: "Gratuito limitado",
    },
  ]

  const recommendations = [
    {
      use: "Programación de software complejo",
      tool: "Claude 4",
      icon: Brain,
      color: "from-gray-600 to-gray-800",
    },
    {
      use: "Resolución de matemáticas avanzadas",
      tool: "Grok 3",
      icon: Zap,
      color: "from-gray-600 to-gray-800",
    },
    {
      use: "Aplicaciones multimodales",
      tool: "GPT-4o/GPT-4.5",
      icon: Image,
      color: "from-gray-600 to-gray-800",
    },
    {
      use: "Uso general o presupuesto limitado",
      tool: "DeepSeek",
      icon: DollarSign,
      color: "from-gray-600 to-gray-800",
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
              <BarChart3 className="w-10 h-10" />
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
              Evaluación de Herramientas de IA
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              Comparativa detallada de las principales herramientas de IA gratuitas y de pago para documentación y
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

          {/* Tools Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {tools.map((tool, index) => {
              const Icon = tool.icon
              return (
                <motion.div
                  key={tool.name}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.05,
                    rotateY: 5,
                    transition: { duration: 0.3 }
                  }}
                  className="perspective-1000"
                >
                  <Card className="border-2 border-gray-200 hover:border-gray-400 transition-all duration-500 h-full bg-gradient-to-br from-white to-gray-50 shadow-lg hover:shadow-2xl relative overflow-hidden group">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                      style={{ background: `linear-gradient(135deg, transparent, rgba(0,0,0,0.1))` }}
                    />
                    
                    <CardHeader className="relative z-10">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <motion.div 
                            className={`p-3 bg-gradient-to-r ${tool.color} text-white rounded-xl shadow-lg relative`}
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
                          <CardTitle className="text-2xl text-black font-bold">
                            {tool.name}
                          </CardTitle>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Precio</p>
                          <p className="text-sm font-semibold text-black">{tool.pricing}</p>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="relative z-10">
                      <p className="text-gray-600 leading-relaxed mb-4">{tool.description}</p>
                      <div className="space-y-2">
                        <p className="font-semibold text-black">Fortalezas:</p>
                        <ul className="space-y-1">
                          {tool.strengths.map((strength, idx) => (
                            <motion.li 
                              key={idx} 
                              className="text-gray-700 text-sm flex items-center space-x-2"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 + idx * 0.1 }}
                            >
                              <motion.span 
                                className="w-2 h-2 bg-black rounded-full flex-shrink-0"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                              />
                              <span>{strength}</span>
                            </motion.li>
                          ))}
                        </ul>
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
              )
            })}
          </div>

          {/* Comparison Table */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-8 mb-12 shadow-lg border border-gray-200 relative overflow-hidden"
          >
            <ParticleSystem color="black" count={30} size={1} />
            
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-1 bg-gradient-to-r from-black to-gray-600 rounded-full mb-6"
            />
            
            <h2 className="text-3xl font-bold text-black mb-6 relative z-10">
              Comparativa de Desempeño
            </h2>
            
            <div className="overflow-x-auto relative z-10">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-black">
                    <th className="text-left py-3 px-4 font-bold text-black">Área</th>
                    <th className="text-left py-3 px-4 font-bold text-black">Claude 4</th>
                    <th className="text-left py-3 px-4 font-bold text-black">Grok 3</th>
                    <th className="text-left py-3 px-4 font-bold text-black">ChatGPT</th>
                    <th className="text-left py-3 px-4 font-bold text-black">DeepSeek</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <motion.tr
                      key={row.area}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                      className="border-b border-gray-200 hover:bg-white transition-colors duration-300"
                    >
                      <td className="py-3 px-4 font-semibold text-black">{row.area}</td>
                      <td className="py-3 px-4 text-gray-700">{row.claude}</td>
                      <td className="py-3 px-4 text-gray-700">{row.grok}</td>
                      <td className="py-3 px-4 text-gray-700">{row.chatgpt}</td>
                      <td className="py-3 px-4 text-gray-700">{row.deepseek}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Recommendations */}
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
                <h2 className="text-3xl font-bold">Recomendaciones de Uso</h2>
              </motion.div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {recommendations.map((rec, index) => {
                  const Icon = rec.icon
                  return (
                    <motion.div
                      key={rec.use}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 1.4 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      className="bg-gray-900 p-6 rounded-lg hover:bg-gray-800 transition-all duration-300 relative overflow-hidden group"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                        style={{ background: `linear-gradient(135deg, transparent, rgba(255,255,255,0.1))` }}
                      />
                      
                      <div className="flex items-center space-x-3 mb-3 relative z-10">
                        <motion.div 
                          className={`p-2 bg-gradient-to-r ${rec.color} text-white rounded-lg`}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <Icon className="w-5 h-5" />
                        </motion.div>
                        <h3 className="font-semibold text-white">{rec.use}</h3>
                      </div>
                      <p className="text-gray-300 relative z-10">
                        <span className="font-semibold text-white">Recomendado:</span> {rec.tool}
                      </p>
                    </motion.div>
                  )
                })}
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
