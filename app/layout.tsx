import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { TopNavigation } from "@/components/top-navigation"
import { NavigationButtons } from "@/components/navigation-buttons"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "IA para Documentación en Desarrollo de Software",
  description:
    "Informe académico sobre el uso de inteligencia artificial para automatizar la documentación en desarrollo de software",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <TopNavigation />
        
        <main className="pt-16">{children}</main>
        <NavigationButtons />
      </body>
    </html>
  )
}
