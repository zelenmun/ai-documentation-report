"use client"

import { motion, useAnimation } from "framer-motion"
import { TrendingUp, Code, Database, BarChart, AlertTriangle, CheckCircle, Users, Clock, Sparkles } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState, useRef } from "react"
import FloatingElements from "@/components/floating-elements"

export default function ImpactoPage() {
  const controls = useAnimation()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    controls.start("visible")
  }, [controls])

  const fields = [
    {
      title: "Desarrollo de Software",
      description: "Mejora en la mantenibilidad y comprensión del código",
      icon: Code,
      color: "from-black to-gray-800",
    },
    {
      title: "Ciencia de Datos",
      description: "Documentación automática de modelos y pipelines de datos",
      icon: BarChart,
      color: "from-black to-gray-800",
    },
    {
      title: "Sistemas de Información",
      description: "Documentación de arquitecturas y procesos de negocio",
      icon: Database,
      color: "from-black to-gray-800",
    },
  ]

  const problems = [
    {
      title: "Pérdida de Conocimiento",
      description: "Cuando un integrante se va, no se sabe cómo se desarrolló el proyecto",
      icon: Users,
      impact: "Alto",
      color: "text-red-600",
    },
    {
      title: "Aumento de Errores",
      description: "Incremento de bugs y errores por falta de documentación",
      icon: AlertTriangle,
      impact: "Alto",
      color: "text-red-600",
    },
    {
      title: "Pérdida de Tiempo",
      description: "Necesidad de entender el código nuevamente después de tiempo",
      icon: Clock,
      impact: "Medio",
      color: "text-orange-600",
    },
  ]

  const benefits = [
    {
      title: "Ahorro de Tiempo",
      description: "Tiempo fundamental por la limitación en proyectos",
      icon: Clock,
      impact: "Alto",
      color: "text-green-600",
    },
    {
      title: "Mejor Colaboración",
      description: "Favorece el trabajo en equipo desarrollando mejor trabajo",
      icon: Users,
      impact: "Alto",
      color: "text-green-600",
    },
    {
      title: "Reducción de Errores",
      description: "Evita errores repetidos por malentendidos o falta de contexto",
      icon: CheckCircle,
      impact: "Medio",
      color: "text-green-600",
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
              <TrendingUp className="w-10 h-10" />
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
              Impacto en Computación y Software
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              El impacto de la automatización con IA en la documentación trasciende diferentes campos de la computación,
              mejorando aspectos fundamentales del desarrollo.
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

          {/* Fields Impact */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {fields.map((field, index) => {
              const Icon = field.icon
              return (
                <motion.div
                  key={field.title}
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
                      <div className="flex items-center space-x-4">
                        <motion.div 
                          className={`p-3 bg-gradient-to-r ${field.color} text-white rounded-xl shadow-lg relative`}
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
                        <CardTitle className="text-xl text-black font-bold">
                          {field.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="relative z-10">
                      <p className="text-gray-600 leading-relaxed mb-4">{field.description}</p>
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

          {/* Problems vs Benefits */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Problems */}
            <motion.div
              variants={itemVariants}
              className="relative"
            >
              <Card className="border-2 border-red-200 bg-gradient-to-br from-red-50 to-white h-full shadow-lg hover:shadow-2xl transition-all duration-500 relative overflow-hidden group">
                
                <CardHeader className="relative z-10">
                  <CardTitle className="text-2xl text-red-800 flex items-center space-x-3">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <AlertTriangle className="w-8 h-8" />
                    </motion.div>
                    <span>Problemas Actuales</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="space-y-4">
                    {problems.map((problem, index) => {
                      const Icon = problem.icon
                      return (
                        <motion.div
                          key={problem.title}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                          whileHover={{ scale: 1.02, x: 5 }}
                          className="bg-white p-4 rounded-lg border border-red-200 hover:border-red-400 transition-all duration-300 shadow-sm hover:shadow-md relative overflow-hidden"
                        >
                          <motion.div
                            className="absolute top-0 right-0 w-16 h-16 bg-red-100 rounded-bl-full opacity-50"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                          />
                          
                          <div className="flex items-start space-x-3 relative z-10">
                            <motion.div
                              animate={{ rotate: [0, 360] }}
                              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                            >
                              <Icon className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                            </motion.div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-red-800 mb-1">{problem.title}</h3>
                              <p className="text-red-700 text-sm mb-2">{problem.description}</p>
                              <motion.span 
                                className={`text-xs font-semibold ${problem.color} px-2 py-1 bg-red-100 rounded-full`}
                                whileHover={{ scale: 1.1 }}
                              >
                                Impacto: {problem.impact}
                              </motion.span>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Benefits */}
            <motion.div
              variants={itemVariants}
              className="relative"
            >
              <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-white h-full shadow-lg hover:shadow-2xl transition-all duration-500 relative overflow-hidden group">
                
                <CardHeader className="relative z-10">
                  <CardTitle className="text-2xl text-green-800 flex items-center space-x-3">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <CheckCircle className="w-8 h-8" />
                    </motion.div>
                    <span>Beneficios con IA</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="space-y-4">
                    {benefits.map((benefit, index) => {
                      const Icon = benefit.icon
                      return (
                        <motion.div
                          key={benefit.title}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                          whileHover={{ scale: 1.02, x: 5 }}
                          className="bg-white p-4 rounded-lg border border-green-200 hover:border-green-400 transition-all duration-300 shadow-sm hover:shadow-md relative overflow-hidden"
                        >
                          <motion.div
                            className="absolute top-0 right-0 w-16 h-16 bg-green-100 rounded-bl-full opacity-50"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                          />
                          
                          <div className="flex items-start space-x-3 relative z-10">
                            <motion.div
                              animate={{ rotate: [0, 360] }}
                              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                            >
                              <Icon className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                            </motion.div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-green-800 mb-1">{benefit.title}</h3>
                              <p className="text-green-700 text-sm mb-2">{benefit.description}</p>
                              <motion.span 
                                className={`text-xs font-semibold ${benefit.color} px-2 py-1 bg-green-100 rounded-full`}
                                whileHover={{ scale: 1.1 }}
                              >
                                Impacto: {benefit.impact}
                              </motion.span>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Universal Impact */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-8 mb-12 shadow-lg border border-gray-200 relative overflow-hidden"
          >
            
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, delay: 1.2 }}
              className="h-1 bg-gradient-to-r from-black to-gray-600 rounded-full mb-6"
            />
            
            <h2 className="text-3xl font-bold text-black mb-6 relative z-10 flex items-center space-x-3">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-8 h-8" />
              </motion.div>
              <span>Impacto Universal</span>
            </h2>
            
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="text-gray-700 text-lg leading-relaxed mb-6 relative z-10"
            >
              Es importante destacar que las carreras de sistemas son muy diferentes una de otra, pero todas cuentan con
              la misma similitud: la documentación en muchas ocasiones queda en un plano no muy relevante por la
              desesperación de querer entregar un proyecto.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
              className="text-gray-700 text-lg leading-relaxed relative z-10"
            >
              Sin embargo, no se toma en cuenta la importancia que esto conlleva, ya que la falta de documentación
              provoca múltiples conflictos que afectan la calidad y continuidad de los proyectos.
            </motion.p>

            {/* Animated progress indicators */}
            <motion.div className="mt-8 relative z-10">
              <div className="grid grid-cols-3 gap-4">
                {["Desarrollo", "Ciencia de Datos", "Sistemas"].map((field, index) => (
                  <motion.div key={field} className="text-center">
                    <div className="text-sm text-gray-500 mb-2">{field}</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-black to-gray-600 h-2 rounded-full"
                        initial={{ width: "0%" }}
                        animate={{ width: `${85 + index * 5}%` }}
                        transition={{ duration: 2, delay: 1.8 + index * 0.2, ease: "easeOut" }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Conclusion */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-black via-gray-900 to-black text-white rounded-2xl p-8 shadow-2xl relative overflow-hidden"
          >
            
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
                <h2 className="text-3xl font-bold">Conclusión</h2>
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2.0 }}
                className="text-gray-300 text-lg leading-relaxed mb-4"
              >
                Sea cual sea la carrera, el desafío de la documentación al añadirle la automatización de la IA demostrará
                un gran proceso tecnológico que mejora varios aspectos fundamentales.
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2.2 }}
                className="text-gray-300 text-lg leading-relaxed"
              >
                La implementación de IA en la documentación representa una evolución natural que beneficia a todos los
                campos de la computación, desde el desarrollo de software hasta la ciencia de datos.
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
