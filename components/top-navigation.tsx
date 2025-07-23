"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  Menu,
  X,
  Home,
  AlertCircle,
  Lightbulb,
  MessageSquare,
  Code,
  BarChart3,
  Workflow,
  TrendingUp,
  AlertTriangle,
  BookOpen,
  PenBox
} from "lucide-react"
import { Button } from "@/components/ui/button"

const navigationItems = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/contexto", label: "Contexto", icon: AlertCircle },
  { href: "/beneficios", label: "Beneficios", icon: Lightbulb },
  { href: "/prompts", label: "Prompts", icon: MessageSquare },
  { href: "/estructura", label: "Estructura", icon: Code },
  { href: "/herramientas", label: "Herramientas", icon: BarChart3 },
  { href: "/flujo", label: "Flujo de Uso", icon: Workflow },
  { href: "/impacto", label: "Impacto", icon: TrendingUp },
  { href: "/limitaciones", label: "Limitaciones", icon: AlertTriangle },
  { href: "/ejemplo", label: "Ejemplo", icon: PenBox },
  { href: "/referencias", label: "Referencias", icon: BookOpen },
]

export function TopNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b-2 border-black z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-black hover:text-gray-600 transition-colors duration-300">
            IA Documentation
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1 size-full justify-center">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link key={item.href} href={item.href}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-300 ${
                      isActive ? "bg-gradient-to-r from-black to-gray-800 text-white" : "text-black hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="w-8 h-6"/>
                  </motion.div>
                </Link>
              )
            })}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-black hover:bg-gray-100"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden border-t border-gray-200 py-4"
            >
              <div className="grid grid-cols-2 gap-2">
                {navigationItems.map((item, index) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href

                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <Link href={item.href} onClick={() => setIsOpen(false)}>
                        <div
                          className={`flex items-center space-x-2 p-3 rounded-lg transition-colors duration-300 ${
                            isActive ? "bg-black text-white" : "text-black hover:bg-gray-100"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span className="text-sm font-medium">{item.label}</span>
                        </div>
                      </Link>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}
