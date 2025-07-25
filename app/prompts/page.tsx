"use client"

import { motion, useAnimation } from "framer-motion"
import { MessageSquare, User, FileText, Lightbulb, Target, Volume2, CheckCircle, XCircle, Sparkles } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState, useRef } from "react"
import FloatingElements from "@/components/floating-elements"

export default function PromptsPage() {
  const controls = useAnimation()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    controls.start("visible")
  }, [controls])

  const promptElements = [
    {
      icon: User,
      title: "Persona",
      description: "Se indica a quién va dirigido el prompt para establecer el contexto y rol específico.",
      example: "Eres un ingeniero de software con experiencia en IA",
      color: "from-black to-gray-800"
    },
    {
      icon: Target,
      title: "Instrucción",
      description: "Proporciona una indicación específica y clara de lo que se espera obtener como resultado.",
      example: "Analiza este código y genera documentación",
      color: "from-black to-gray-800"
    },
    {
      icon: FileText,
      title: "Contexto",
      description: "Proporciona información necesaria y relevante para la correcta realización de la tarea.",
      example: "Este código debería filtrar una lista de diccionarios",
      color: "from-black to-gray-800"
    },
    {
      icon: Lightbulb,
      title: "Ejemplos",
      description: "Se ofrecen ejemplos concretos que guíen a la IA hacia mejores respuestas y resultados.",
      example: "Como este ejemplo de función similar...",
      color: "from-black to-gray-800"
    },
    {
      icon: FileText,
      title: "Formato",
      description: "Especifica claramente cómo quieres que se estructure y presente la respuesta final.",
      example: "Responde en formato markdown con secciones",
      color: "from-black to-gray-800"
    },
    {
      icon: Volume2,
      title: "Tono",
      description: "Define el estilo y tono que se espera que tenga el contenido generado por la IA.",
      example: "Escribe con un tono informativo y formal",
      color: "from-black to-gray-800"
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
              <MessageSquare className="w-10 h-10" />
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
              Cómo Construir un Buen Prompt
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              Para crear un prompt efectivo se deben incluir seis elementos clave que guíen a la IA hacia respuestas más
              precisas y útiles.
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

          {/* Elements Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {promptElements.map((element, index) => {
              const Icon = element.icon
              return (
                <motion.div
                  key={element.title}
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
                    
                    {/* Number badge */}
                    <div className="absolute top-4 right-4 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold z-10">
                      {index + 1}
                    </div>
                    
                    <CardHeader className="relative z-10">
                      <div className="flex items-center space-x-4">
                        <motion.div 
                          className={`p-3 bg-gradient-to-r ${element.color} text-white rounded-xl shadow-lg relative`}
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
                          {element.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="relative z-10">
                      <p className="text-gray-600 leading-relaxed mb-4">
                        {element.description}
                      </p>
                      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-lg border-l-4 border-purple-400">
                        <p className="text-sm text-gray-700 italic">"{element.example}"</p>
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

          {/* Example Section */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-8 mb-12 shadow-lg border border-gray-200 relative overflow-hidden"
          >
            
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-1 bg-gradient-to-r from-black to-gray-600 rounded-full mb-6"
            />
            
            <h2 className="text-3xl font-bold text-black mb-6 relative z-10">
              Ejemplo de Prompt Efectivo
            </h2>
            
            <motion.div 
              className="bg-white p-6 rounded-xl border-l-4 border-green-500 shadow-inner relative z-10"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-gray-700 leading-relaxed">
                "Eres un programador experto en Python. Analiza el siguiente código que debería filtrar una lista de 
                diccionarios por valor específico, pero está devolviendo None. Identifica el error, proporciona la 
                solución corregida y crea documentación completa en formato markdown que incluya: descripción de la 
                función, parámetros de entrada, valor de retorno y ejemplos de uso. Usa un tono técnico pero accesible."
              </p>
            </motion.div>
          </motion.div>

          {/* Do's and Don'ts */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <motion.div
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              className="perspective-1000"
            >
              <Card className="border-2 border-green-200 hover:border-green-500 transition-all duration-500 h-full bg-gradient-to-br from-green-50 to-white shadow-lg hover:shadow-2xl relative overflow-hidden group">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-green-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                
                <CardHeader className="relative z-10">
                  <div className="flex items-center space-x-4">
                    <motion.div 
                      className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl shadow-lg relative"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <CheckCircle className="w-6 h-6" />
                      <motion.div
                        className="absolute inset-0 rounded-xl"
                        animate={{
                          boxShadow: [
                            "0 0 0px rgba(34,197,94,0)",
                            "0 0 20px rgba(34,197,94,0.3)",
                            "0 0 0px rgba(34,197,94,0)"
                          ]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                    </motion.div>
                    <CardTitle className="text-xl text-green-800 font-bold">
                      Qué Hacer
                    </CardTitle>
                  </div>
                </CardHeader>
                
                <CardContent className="relative z-10">
                  <ul className="space-y-4 text-green-700">
                    {[
                      "Ser específico y claro en las instrucciones",
                      "Proporcionar contexto suficiente", 
                      "Incluir ejemplos cuando sea posible",
                      "Especificar el formato de respuesta deseado"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <span className="w-3 h-3 bg-green-600 rounded-full mt-1 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <motion.div
                  className="absolute top-0 right-0 w-20 h-20 bg-green-500 opacity-5 rounded-bl-full"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ 
                    duration: 2.5, 
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
              </Card>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              className="perspective-1000"
            >
              <Card className="border-2 border-red-200 hover:border-red-500 transition-all duration-500 h-full bg-gradient-to-br from-red-50 to-white shadow-lg hover:shadow-2xl relative overflow-hidden group">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                
                <CardHeader className="relative z-10">
                  <div className="flex items-center space-x-4">
                    <motion.div 
                      className="p-3 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-xl shadow-lg relative"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <XCircle className="w-6 h-6" />
                      <motion.div
                        className="absolute inset-0 rounded-xl"
                        animate={{
                          boxShadow: [
                            "0 0 0px rgba(239,68,68,0)",
                            "0 0 20px rgba(239,68,68,0.3)",
                            "0 0 0px rgba(239,68,68,0)"
                          ]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                    </motion.div>
                    <CardTitle className="text-xl text-red-800 font-bold">
                      Qué Evitar
                    </CardTitle>
                  </div>
                </CardHeader>
                
                <CardContent className="relative z-10">
                  <ul className="space-y-4 text-red-700">
                    {[
                      "Preguntas muy abiertas o vagas",
                      "Falta de contexto o información necesaria",
                      "Instrucciones ambiguas o contradictorias", 
                      "No revisar el prompt antes de enviarlo"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <span className="w-3 h-3 bg-red-600 rounded-full mt-1 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <motion.div
                  className="absolute top-0 right-0 w-20 h-20 bg-red-500 opacity-5 rounded-bl-full"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ 
                    duration: 2.5, 
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
              </Card>
            </motion.div>
          </div>

          {/* Impact Section */}
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
                <h2 className="text-3xl font-bold">¡Practica estos elementos y mejora tus resultados!</h2>
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="text-gray-300 text-lg leading-relaxed mb-4"
              >
                Cada elemento que agregues a tu prompt aumentará la precisión y utilidad de las respuestas de la IA.
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                className="text-gray-300 text-lg leading-relaxed"
              >
                Un prompt bien estructurado es la clave para obtener documentación de calidad y resultados consistentes
                en cualquier proyecto de desarrollo de software.
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
