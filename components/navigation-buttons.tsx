"use client"

import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const navigationItems = [
  { href: "/", label: "Inicio" },
  { href: "/contexto", label: "Contexto" },
  { href: "/beneficios", label: "Beneficios" },
  { href: "/prompts", label: "Prompts" },
  { href: "/estructura", label: "Estructura" },
  { href: "/herramientas", label: "Herramientas" },
  { href: "/flujo", label: "Flujo de Uso" },
  { href: "/impacto", label: "Impacto" },
  { href: "/limitaciones", label: "Limitaciones" },
  { href: "/ejemplo", label: "Ejemplo" },
  { href: "/referencias", label: "Referencias" },
]

export function NavigationButtons() {
  const pathname = usePathname()
  const router = useRouter()

  const currentIndex = navigationItems.findIndex((item) => item.href === pathname)
  const prevPage = currentIndex > 0 ? navigationItems[currentIndex - 1] : null
  const nextPage = currentIndex < navigationItems.length - 1 ? navigationItems[currentIndex + 1] : null

  const handleNavigation = (href: string) => {
    router.push(href)
  }

  return (
    <>
      {/* Left Navigation Button */}
      <AnimatePresence>
        {prevPage && (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="fixed left-6 top-1/2 transform -translate-y-1/2 z-40"
          >
            <motion.div whileHover={{ scale: 1.1, x: -5 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => handleNavigation(prevPage.href)}
                className="bg-gradient-to-r from-black to-gray-800 hover:from-gray-800 hover:to-black text-white border-2 border-black hover:border-gray-600 shadow-2xl transition-all duration-300 p-4 rounded-full group relative overflow-hidden"
                size="lg"
              >
                <motion.div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="flex items-center space-x-2 relative z-10">
                  <motion.div
                    animate={{ x: [-2, 2, -2] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </motion.div>
                  <div className="hidden lg:block">
                    
                    <div className="text-sm font-semibold">{prevPage.label}</div>
                  </div>
                </div>

                {/* Animated border */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-white/20"
                  animate={{
                    borderColor: ["rgba(255,255,255,0.2)", "rgba(255,255,255,0.4)", "rgba(255,255,255,0.2)"],
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                />
              </Button>
            </motion.div>

            {/* Tooltip for mobile */}
            <motion.div
              className="lg:hidden absolute left-full ml-4 top-1/2 transform -translate-y-1/2 bg-black text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              initial={{ opacity: 0, scale: 0.8 }}
              whileHover={{ opacity: 1, scale: 1 }}
            >
              {prevPage.label}
              <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-black" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Right Navigation Button */}
      <AnimatePresence>
        {nextPage && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40"
          >
            <motion.div whileHover={{ scale: 1.1, x: 5 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => handleNavigation(nextPage.href)}
                className="bg-gradient-to-r from-black to-gray-800 hover:from-gray-800 hover:to-black text-white border-2 border-black hover:border-gray-600 shadow-2xl transition-all duration-300 p-4 rounded-full group relative overflow-hidden"
                size="lg"
              >
                <motion.div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="flex items-center space-x-2 relative z-10">
                  <div className="hidden lg:block text-right">
                    
                    <div className="text-sm font-semibold">{nextPage.label}</div>
                  </div>
                  <motion.div
                    animate={{ x: [-2, 2, -2] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </motion.div>
                </div>

                {/* Animated border */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-white/20"
                  animate={{
                    borderColor: ["rgba(255,255,255,0.2)", "rgba(255,255,255,0.4)", "rgba(255,255,255,0.2)"],
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                />
              </Button>
            </motion.div>

            {/* Tooltip for mobile */}
            <motion.div
              className="lg:hidden absolute right-full mr-4 top-1/2 transform -translate-y-1/2 bg-black text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              initial={{ opacity: 0, scale: 0.8 }}
              whileHover={{ opacity: 1, scale: 1 }}
            >
              {nextPage.label}
              <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-black" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
