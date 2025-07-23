"use client"

import { motion, useAnimation } from "framer-motion"
import { Code, Terminal, Sparkles, Play, ArrowRight, FileText, PenBox } from "lucide-react"
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

export default function ProgramaExplicacion() {
  const controls = useAnimation()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    controls.start("visible")
  }, [controls])

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
        ease: "easeOut" as const,
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
              <PenBox className="w-10 h-10" />
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(0,0,0,0.3)",
                    "0 0 40px rgba(0,0,0,0.5)",
                    "0 0 20px rgba(0,0,0,0.3)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl font-bold bg-gradient-to-r from-black via-gray-800 to-black bg-clip-text text-transparent mb-4"
            >
              Ejemplo de Generación de Documentación Mediante IA
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              Análisis de un DataSet de muertes por COVID-19 en Ecuador.
            </motion.p>

            {/* Decorative elements */}
            <motion.div
              className="absolute -top-10 -left-10 w-20 h-20 bg-black rounded-full opacity-5"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute -bottom-5 -right-10 w-16 h-16 bg-black rounded-full opacity-5"
              animate={{
                scale: [1, 0.8, 1],
                rotate: [360, 180, 0],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            />
          </div>

          {/* Card Principal - Explicación del Programa */}
          <motion.div variants={itemVariants} className="mb-12">
            <Card className="border-2 border-gray-200 hover:border-gray-400 transition-all duration-500 bg-gradient-to-br from-white to-gray-50 shadow-lg hover:shadow-2xl relative overflow-hidden group">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(135deg, transparent, rgba(0,0,0,0.1))`,
                }}
              />

              <ParticleSystem color="black" count={25} size={1} />

              <CardHeader className="relative z-10 pb-4">
                <div className="flex items-center space-x-4 mb-4">
                  <motion.div
                    className="p-4 bg-gradient-to-r from-black to-gray-700 text-white rounded-xl shadow-lg relative"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <FileText className="w-8 h-8" />
                    <motion.div
                      className="absolute inset-0 rounded-xl"
                      animate={{
                        boxShadow: [
                          "0 0 0px rgba(0,0,0,0)",
                          "0 0 20px rgba(0,0,0,0.3)",
                          "0 0 0px rgba(0,0,0,0)",
                        ],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                  </motion.div>
                  <div>
                    <CardTitle className="text-3xl text-black font-bold mb-2">
                      Descripción del Programa
                    </CardTitle>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-1 bg-gradient-to-r from-black to-gray-600 rounded-full"
                    />
                  </div>
                </div>
              </CardHeader>

              <CardContent className="relative z-10 pt-0">
                <div className="space-y-6">
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-gray-700 text-lg leading-relaxed"
                  >
                    Este programa es una herramienta de análisis estadístico
                    diseñada para <strong>procesar y analizar datos</strong>{" "}
                    epidemiológicos de COVID-19 específicamente para Ecuador.
                    Proporciona un análisis exhaustivo de tendencias, picos,
                    tasas de crecimiento y mortalidad durante la pandemia.
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-gray-700 text-lg leading-relaxed"
                  >
                    Este sistema strong emplea{" "}
                    <strong>tres funciones principales</strong>:
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="grid md:grid-cols-3 gap-4 mt-8"
                  >
                    <div className="bg-gradient-to-r from-gray-100 to-gray-50 p-4 rounded-lg border border-gray-200">
                      <h4 className="font-bold text-black mb-2">
                        1. Analizar tendencias y picos
                      </h4>
                      <p className="text-gray-600 text-sm">
                        def analizar_tendencias_picos
                      </p>
                    </div>
                    <div className="bg-gradient-to-r from-gray-100 to-gray-50 p-4 rounded-lg border border-gray-200">
                      <h4 className="font-bold text-black mb-2">
                        2. Analizar crecimiento porcentual
                      </h4>
                      <p className="text-gray-600 text-sm">
                        def analizar_crecimiento_porcentual
                      </p>
                    </div>
                    <div className="bg-gradient-to-r from-gray-100 to-gray-50 p-4 rounded-lg border border-gray-200">
                      <h4 className="font-bold text-black mb-2">
                        3. Analizar tasas de mortalidad
                      </h4>
                      <p className="text-gray-600 text-sm">
                        def analizar_tasas_mortalidad
                      </p>
                    </div>
                  </motion.div>
                </div>
              </CardContent>

              {/* Animated corner decoration */}
              <motion.div
                className="absolute top-0 right-0 w-32 h-32 bg-black opacity-5 rounded-bl-full"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            </Card>
          </motion.div>

          {/* Cards de Prompt y Resultado */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Card de Prompt */}
            <motion.div
              variants={itemVariants}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
              className="perspective-1000"
            >
              <Card className="border-2 border-gray-200 hover:border-gray-400 transition-all duration-500 h-full bg-gradient-to-br from-white to-gray-50 shadow-lg hover:shadow-2xl relative overflow-hidden group">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, transparent, rgba(0,0,0,0.1))`,
                  }}
                />

                <CardHeader className="relative z-10">
                  <div className="flex items-center space-x-4">
                    <motion.div
                      className="p-3 bg-gradient-to-r from-black to-gray-800 text-white rounded-xl shadow-lg relative"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Terminal className="w-6 h-6" />
                      <motion.div
                        className="absolute inset-0 rounded-xl"
                        animate={{
                          boxShadow: [
                            "0 0 0px rgba(34, 197, 94, 0)",
                            "0 0 20px rgba(34, 197, 94, 0.3)",
                            "0 0 0px rgba(34, 197, 94, 0)",
                          ],
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                    </motion.div>
                    <CardTitle className="text-xl text-black font-bold">
                      Prompt de Entrada
                    </CardTitle>
                  </div>
                </CardHeader>

                <CardContent className="relative z-10">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="bg-black text-gray-300 p-6 rounded-lg mt-4 border-2 border-gray-700"
                  >
                    <div className="mb-4">
                      <h3 className="text-lg font-bold mb-3">
                        💡 Plantilla de Prompt Estructurado
                      </h3>

                      <div className="mb-4 font-mono text-sm">
                        "Soy desarrollador de software especializado en python.
                        Estoy desarrollando una aplicación para analizar los
                        datos de un archivo Excel sobre los casos de muertes por
                        Covid-19 desde el inicio de la pandemia hasta la
                        actualidad en el Ecuador.
                      </div>

                      <div className="mb-4">
                        <p className="font-semibold mb-2">
                          El excel posee las siguientes columnas:
                        </p>
                        <div className="text-gray-400 text-xs font-mono bg-gradient-to-r from-black via-gray-900 to-black p-2 rounded">
                          ['country', 'date', 'new_cases', 'total_cases',
                          'new_deaths', 'total_deaths', 'weekly_cases',
                          'weekly_deaths', 'weekly_pct_growth_cases',
                          'weekly_pct_growth_deaths', 'biweekly_cases',
                          'biweekly_deaths', 'biweekly_pct_growth_cases',
                          'biweekly_pct_growth_deaths', 'new_cases_per_million',
                          'new_deaths_per_million', 'total_cases_per_million',
                          'total_deaths_per_million',
                          'weekly_cases_per_million',
                          'weekly_deaths_per_million',
                          'biweekly_cases_per_million',
                          'biweekly_deaths_per_million',
                          'total_deaths_per_100k', 'new_deaths_per_100k',
                          'new_cases_7_day_avg_right',
                          'new_deaths_7_day_avg_right',
                          'new_cases_per_million_7_day_avg_right',
                          'new_deaths_per_million_7_day_avg_right',
                          'new_deaths_per_100k_7_day_avg_right', 'cfr',
                          'cfr_100_cases', 'cfr_short_term',
                          'days_since_100_total_cases',
                          'days_since_5_total_deaths',
                          'days_since_1_total_cases_per_million',
                          'days_since_0_1_total_deaths_per_million',
                          'days_since_100_total_cases_and_5m_pop',
                          'total_deaths_last12m',
                          'total_deaths_per_100k_last12m',
                          'total_deaths_per_million_last12m']
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="font-semibold mb-2">
                          Actualmente la aplicación cuenta con 3 funciones:
                        </p>
                        <ul className="text-gray-300 space-y-1 ml-4">
                          <li>
                            • Analizar tendencias y picos
                            (analizar_tendencias_picos)
                          </li>
                          <li>
                            • Analizar crecimiento porcentual
                            (analizar_crecimiento_porcentual)
                          </li>
                          <li>
                            • Analizar tasas de mortalidad
                            (analizar_tasas_mortalidad)
                          </li>
                        </ul>
                        <p className="text-gray-400 text-sm mt-2">
                          Las cuales analizan datos y generan un informe de los
                          datos obtenidos
                        </p>
                      </div>

                      <div className="mb-4">
                        <p className="font-semibold mb-2">
                          Realiza lo siguiente:
                        </p>
                        <ul className="text-gray-300 space-y-2 ml-4">
                          <li>
                            • Genera una nueva función: La nueva función será
                            para obtener la Tasa de letalidad (CFR) - qué
                            porcentaje de casos confirmados resultó en muerte.
                          </li>
                          <li>
                            • La nueva función se llamará "analizar_tasa_letalidad"
                          </li>
                          <li>
                            • Genera documentación técnica en formato Markdown
                            que incluya:
                            <ul className="ml-6 mt-1 space-y-1 text-sm">
                              <li>- Propósito de la función</li>
                              <li>- Parámetros (tipo y descripción)</li>
                              <li>- Valores de retorno</li>
                              <li>- Ejemplo de uso con salida esperada</li>
                            </ul>
                          </li>
                        </ul>
                      </div>

                      <div className="text-cyan-400 text-sm font-mono border-l-4 border-cyan-400 pl-4">
                        Asegúrate de que la documentación sea clara, precisa y
                        legible para equipos multidisciplinarios."
                      </div>
                    </div>
                  </motion.div>
                </CardContent>

                {/* Animated corner decoration */}
                <motion.div
                  className="absolute top-0 right-0 w-20 h-20 bg-black opacity-5 rounded-bl-full"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
              </Card>
            </motion.div>

            {/* Card de Resultado */}
            <motion.div
              variants={itemVariants}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
              className="perspective-1000"
            >
              <Card className="border-2 border-gray-200 hover:border-gray-400 transition-all duration-500 h-full bg-gradient-to-br from-white to-gray-50 shadow-lg hover:shadow-2xl relative overflow-hidden group">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, transparent, rgba(0,0,0,0.1))`,
                  }}
                />

                <CardHeader className="relative z-10">
                  <div className="flex items-center space-x-4">
                    <motion.div
                      className="p-3 bg-gradient-to-r from-black to-gray-800 text-white rounded-xl shadow-lg relative"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Sparkles className="w-6 h-6" />
                      <motion.div
                        className="absolute inset-0 rounded-xl"
                        animate={{
                          boxShadow: [
                            "0 0 0px rgba(59, 130, 246, 0)",
                            "0 0 20px rgba(59, 130, 246, 0.3)",
                            "0 0 0px rgba(59, 130, 246, 0)",
                          ],
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                    </motion.div>
                    <CardTitle className="text-xl text-black font-bold">
                      Resultado Generado
                    </CardTitle>
                  </div>
                </CardHeader>

                <CardContent className="relative z-10 overflow-y-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="bg-white p-4 rounded-lg border-2 border-gray-200 shadow-inner space-y-4 text-xs"
                  >
                    {/* Título */}
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                      <h4 className="font-bold text-black text-sm">analizar_tasa_letalidad</h4>
                      <p className="mt-1">
                        Analiza la <strong>tasa de letalidad</strong> (CFR) de COVID-19 en Ecuador, incluyendo estadísticas, evolución temporal y contexto interpretativo.
                      </p>
                      <p className="italic mt-1">
                        Definición: (Total de muertes / Total de casos confirmados) × 100
                      </p>
                    </motion.div>

                    {/* Parámetros */}
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                      <p className="font-semibold text-gray-800">📥 Parámetros:</p>
                      <p className="ml-2">
                        • <code>df</code>: pandas.DataFrame con columnas:<br />
                        &nbsp;&nbsp;- <code>cfr</code>, <code>total_cases</code>, <code>total_deaths</code>, <code>date</code><br />
                        &nbsp;&nbsp;- (opcionales) <code>cfr_short_term</code>, <code>cfr_100_cases</code>
                      </p>
                    </motion.div>

                    {/* Retorno */}
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
                      <p className="font-semibold">📤 Retorno:</p>
                      <p className="ml-2 text-gray-600">
                        Diccionario con:<br />
                        • <code>cfr_actual</code>, <code>cfr_promedio</code>, <code>cfr_maximo</code>, <code>cfr_minimo</code><br />
                        • <code>fecha_cfr_maximo</code>, <code>fecha_cfr_minimo</code>
                      </p>
                    </motion.div>

                    {/* Análisis Generado */}
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
                      <p className="font-semibold">📊 Análisis Generado:</p>
                      <ul className="ml-4 list-disc">
                        <li><strong>Estadísticas Generales</strong>: CFR actual, promedio, máximo, mínimo</li>
                        <li><strong>Análisis Temporal</strong>: corto plazo, +100 casos, comparación entre períodos</li>
                        <li><strong>Fechas Críticas</strong>: fechas de CFR máximo y mínimo</li>
                        <li><strong>Verificación Manual</strong>: cálculo directo con datos recientes</li>
                        <li><strong>Interpretación Contextual</strong>: nivel de riesgo, recomendaciones</li>
                      </ul>
                    </motion.div>

                    {/* Ejemplo de uso */}
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }}>
                      <p className="font-semibold">💻 Ejemplo de uso:</p>
                      <pre className="bg-gray-100 p-2 rounded text-[10px] overflow-auto mt-1">
                        {`import pandas as pd

                        df = pd.read_excel('datos_covid_ecuador.xlsx')
                        df['date'] = pd.to_datetime(df['date'])
                        df_ecuador = df[df['country'] == 'Ecuador'].copy()

                        resultado = analizar_tasa_letalidad(df_ecuador)
                        print(f"CFR actual: {resultado['cfr_actual']:.2f}%")`}
                      </pre>
                    </motion.div>

                    {/* Salida esperada */}
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}>
                      <p className="font-semibold">📈 Salida Esperada:</p>
                      <pre className="bg-gray-50 p-2 rounded text-[10px] overflow-auto">
                        {`============================================================
                        ANÁLISIS DE TASA DE LETALIDAD (CFR)
                        ============================================================

                        📊 ESTADÍSTICAS GENERALES DE CFR:
                        • CFR Actual: 2.45%
                        • CFR Promedio: 3.12%
                        • CFR Máximo: 8.75%
                        • CFR Mínimo: 1.23%

                        📈 CFR A CORTO PLAZO:
                        • Promedio: 2.87%
                        • Último valor: 2.34%

                        🎯 CFR BASADO EN 100+ CASOS:
                        • Promedio: 3.45%
                        • Último valor: 2.56%

                        📅 FECHAS CRÍTICAS:
                        • CFR Máximo: 8.75% el 15/04/2020
                        • CFR Mínimo: 1.23% el 22/11/2023

                        🔄 EVOLUCIÓN TEMPORAL:
                        • Primeros 30 días: 6.78%
                        • Últimos 30 días: 2.34%
                        • Mejoró 4.44 puntos

                        🔍 VERIFICACIÓN:
                        • Casos: 1,234,567
                        • Muertes: 30,234
                        • CFR: 2.45%

                        💡 INTERPRETACIÓN:
                        Por cada 100 casos, ~2 resultaron fatales.

                        ⚠️ PRECAUCIÓN: CFR moderado, monitoreo recomendado.`}
                      </pre>
                    </motion.div>

                    {/* Consideraciones Técnicas */}
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9 }}>
                      <p className="font-semibold">⚠️ Consideraciones Técnicas:</p>
                      <ul className="ml-4 list-disc">
                        <li>Filtra nulos y casos sin datos</li>
                        <li>Requiere al menos 30 días para análisis temporal</li>
                        <li>Columnas opcionales manejadas automáticamente</li>
                        <li><strong>Umbrales:</strong><br />
                          &nbsp;&nbsp;- CFR &gt; 3%: Alta mortalidad<br />
                          &nbsp;&nbsp;- 1–3%: Mortalidad moderada<br />
                          &nbsp;&nbsp;- &lt; 1%: Mortalidad baja
                        </li>
                        <li>Limitaciones: testeo, demografía, sistema de salud</li>
                      </ul>
                    </motion.div>

                    {/* Integración */}
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.0 }}>
                      <p className="font-semibold">🔧 Integración:</p>
                      <p className="ml-2">
                        Compatible con:<br />
                        • <code>analizar_tendencias_picos()</code><br />
                        • <code>analizar_crecimiento_porcentual()</code><br />
                        • <code>analizar_tasas_mortalidad()</code>
                      </p>
                    </motion.div>
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.1 }}
                    className="text-gray-500 leading-relaxed mt-4 text-[11px]"
                  >
                    Documentación generada para equipos multidisciplinarios - Versión 1.0
                  </motion.p>
                </CardContent>



                {/* Animated corner decoration */}
                <motion.div
                  className="absolute top-0 right-0 w-20 h-20 bg-black opacity-5 rounded-bl-full"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

