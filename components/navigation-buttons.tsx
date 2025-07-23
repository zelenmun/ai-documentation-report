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
      {/* Desktop Navigation - Fixed positioned buttons */}
      <div className="hidden lg:block">
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
                    <div>
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
                    <div className="text-right">
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Navigation - Bottom positioned buttons */}
      <div className="lg:hidden bg-gray-100">
        <div className="flex justify-between items-center px-4 pb-6">
          {/* Left Navigation Button for Mobile */}
          <AnimatePresence>
            {prevPage ? (
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={() => handleNavigation(prevPage.href)}
                    className="bg-gradient-to-r from-black to-gray-800 hover:from-gray-800 hover:to-black text-white border-2 border-black hover:border-gray-600 shadow-xl transition-all duration-300 p-3 rounded-full group relative overflow-hidden"
                    size="sm"
                  >
                    <motion.div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="flex items-center space-x-2 relative z-10">
                      <motion.div
                        animate={{ x: [-1, 1, -1] }}
                        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </motion.div>
                      <div className="text-xs font-semibold max-w-[80px] truncate">
                        {prevPage.label}
                      </div>
                    </div>

                    {/* Animated border */}
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-white/20"
                      animate={{
                        borderColor: ["rgba(255,255,255,0.2)", "rgba(255,255,255,0.4)", "rgba(255,255,255,0.2)"],
                      }}
                      transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY }}
                    />
                  </Button>
                </motion.div>
              </motion.div>
            ) : (
              <div className="w-[100px]"></div> // Placeholder to maintain spacing
            )}
          </AnimatePresence>

          {/* Right Navigation Button for Mobile */}
          <AnimatePresence>
            {nextPage ? (
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={() => handleNavigation(nextPage.href)}
                    className="bg-gradient-to-r from-black to-gray-800 hover:from-gray-800 hover:to-black text-white border-2 border-black hover:border-gray-600 shadow-xl transition-all duration-300 p-3 rounded-full group relative overflow-hidden"
                    size="sm"
                  >
                    <motion.div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="flex items-center space-x-2 relative z-10">
                      <div className="text-xs font-semibold max-w-[80px] truncate text-right">
                        {nextPage.label}
                      </div>
                      <motion.div
                        animate={{ x: [-1, 1, -1] }}
                        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                      >
                        <ChevronRight className="w-5 h-5" />
                      </motion.div>
                    </div>

                    {/* Animated border */}
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-white/20"
                      animate={{
                        borderColor: ["rgba(255,255,255,0.2)", "rgba(255,255,255,0.4)", "rgba(255,255,255,0.2)"],
                      }}
                      transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY }}
                    />
                  </Button>
                </motion.div>
              </motion.div>
            ) : (
              <div className="w-[100px]"></div> // Placeholder to maintain spacing
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  )
}