"use client"

import { motion, useAnimation } from "framer-motion"
import { Code, FileText, Target, CheckCircle, XCircle, Lightbulb, Sparkles, Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState, useRef } from "react"
import FloatingElements from "@/components/floating-elements"

export default function EstructuraPage() {
  const controls = useAnimation()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    controls.start("visible")
  }, [controls])

  const templateElements = [
    {
      icon: Target,
      title: "Rol/Contexto",
      description: "Especifica el entorno del código o del problema",
      example: "Soy desarrollador de software especializado en Python",
      color: "from-black to-gray-800",
    },
    {
      icon: FileText,
      title: "Descripción del Problema",
      description: "Qué hace el código o qué debería hacer",
      example: "Este código debería filtrar una lista de diccionarios por valor",
      color: "from-black to-gray-800",
    },
    {
      icon: Code,
      title: "Instrucciones Claras",
      description: "Qué debe hacer la IA (debuggear, optimizar, documentar)",
      example: "Identifica la causa del error y proporciona el código corregido",
      color: "from-black to-gray-800",
    },
    {
      icon: CheckCircle,
      title: "Formato de Respuesta",
      description: "Especifica cómo quieres recibir la respuesta",
      example: "Código + documentación en formato markdown",
      color: "from-black to-gray-800",
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
              <Code className="w-10 h-10" />
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
              Estructura para Prompts Técnicos
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              Para que la IA pueda trabajar de mejor forma con problemas de código, es importante crear prompts bien
              organizados con instrucciones claras.
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

          {/* Template Elements */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {templateElements.map((element, index) => {
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
                      <p className="text-gray-600 leading-relaxed mb-4">{element.description}</p>
                      <div className="bg-gray-50 p-3 rounded-lg border-l-4 border-black">
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

          {/* Comparison Section */}
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
            
            <h2 className="text-3xl font-bold text-black mb-8 relative z-10 text-center">
              Comparación de Enfoques
            </h2>

            <div className="grid md:grid-cols-2 gap-8 relative z-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="border-2 border-red-200 bg-gradient-to-br from-red-50 to-red-100 h-full shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <motion.div
                        animate={{ rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                      >
                        <XCircle className="w-8 h-8 text-red-600" />
                      </motion.div>
                      <CardTitle className="text-xl text-red-800">Prompt Básico (Ineficiente)</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-white p-4 rounded-lg border-l-4 border-red-500 mb-4 shadow-inner">
                      <p className="text-gray-700 font-mono">"Arregla este código: [código]"</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-red-700 font-semibold flex items-center">
                        <Star className="w-4 h-4 mr-2" />
                        Problemas:
                      </p>
                      <ul className="text-red-600 space-y-1">
                        <li>• Falta contexto</li>
                        <li>• Lenguaje ambiguo</li>
                        <li>• No especifica formato de respuesta</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-green-100 h-full shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      </motion.div>
                      <CardTitle className="text-xl text-green-800">Prompt Mejorado (Eficiente)</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-white p-4 rounded-lg border-l-4 border-green-500 mb-4 shadow-inner">
                      <p className="text-gray-700 text-sm leading-relaxed">
                        "Soy desarrollador de software y trabajo principalmente con Python. Este código debería filtrar
                        una lista de diccionarios por valor, sin embargo devuelve None..."
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-green-700 font-semibold flex items-center">
                        <Sparkles className="w-4 h-4 mr-2" />
                        Ventajas:
                      </p>
                      <ul className="text-green-600 space-y-1">
                        <li>• Incluye lenguaje específico</li>
                        <li>• Proporciona contexto</li>
                        <li>• Error específico</li>
                        <li>• Formato esperado</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>

          {/* Final Template */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-black via-gray-900 to-black text-white rounded-2xl p-8 shadow-2xl relative overflow-hidden mb-12"
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
                  <Lightbulb className="w-8 h-8 text-yellow-400" />
                </motion.div>
                <h2 className="text-3xl font-bold">Plantilla de Prompt Estructurado</h2>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="bg-gray-900 p-6 rounded-lg font-mono text-sm leading-relaxed shadow-inner"
              >
                <motion.p 
                  className="text-gray-300 mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.4 }}
                >
                  "Soy desarrollador de software especializado en [lenguaje/tecnología]. Este código [breve descripción
                  del código] presenta el siguiente problema: [breve descripción del error].
                </motion.p>
                <motion.p 
                  className="text-gray-300 mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.6 }}
                >
                  Realiza lo siguiente:
                </motion.p>
                <motion.ul 
                  className="text-gray-300 space-y-2 ml-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.8 }}
                >
                  <li>• Identifica la causa o raíz del error</li>
                  <li>• Proporciona el código corregido con comentarios</li>
                  <li>• Genera documentación técnica en formato Markdown que incluya:</li>
                  <li className="ml-4">- Propósito de la función/clase</li>
                  <li className="ml-4">- Parámetros (tipo y descripción)</li>
                  <li className="ml-4">- Valores de retorno</li>
                  <li className="ml-4">- Ejemplo de uso con salida esperada</li>
                </motion.ul>
                <motion.p 
                  className="text-gray-300 mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 2.0 }}
                >
                  Asegúrate de que la documentación sea clara, precisa y legible para equipos multidisciplinarios."
                </motion.p>
              </motion.div>

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

          {/* Recommendations */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-8 shadow-lg border border-gray-200 relative overflow-hidden"
          >
            
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-1 bg-gradient-to-r from-black to-gray-800 rounded-full mb-6"
            />

            <h2 className="text-3xl font-bold text-black mb-8 relative z-10 flex items-center">
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="mr-3"
              >
                <Sparkles className="w-8 h-8 text-black" />
              </motion.div>
              Recomendaciones Adicionales
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 relative z-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                  <h3 className="text-lg font-semibold text-black mb-4 flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    Mejores Prácticas
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                      Evita el lenguaje vago o ambiguo
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                      No sobrecargues con múltiples tareas no relacionadas
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                      Incluye ejemplos como fragmentos de código
                    </li>
                  </ul>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                  <h3 className="text-lg font-semibold text-black mb-4 flex items-center">
                    <Lightbulb className="w-5 h-5 text-yellow-500 mr-2" />
                    Palabras Clave Útiles
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-center">
                      <Code className="w-4 h-4 text-blue-500 mr-3" />
                      "Documentar"
                    </li>
                    <li className="flex items-center">
                      <FileText className="w-4 h-4 text-purple-500 mr-3" />
                      "Explica paso a paso"
                    </li>
                    <li className="flex items-center">
                      <Target className="w-4 h-4 text-orange-500 mr-3" />
                      "Formato markdown"
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
