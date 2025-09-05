"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"

const navItems = [
  { href: "#home", icon: "🏠" },
  { href: "#about", icon: "👤" },
  { href: "#skills", icon: "🛠️" },
  { href: "#projects", icon: "💼" },
  { href: "#education", icon: "🎓" },
  { href: "#certifications", icon: "🏆" },
]

export default function FloatingNav() {
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "education", "certifications"]
      const scrollPosition = window.scrollY

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop - 100 && scrollPosition < offsetTop + offsetHeight - 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.nav
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 bg-white/10 backdrop-blur-md rounded-full p-2 shadow-lg"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <ul className="flex space-x-2">
        {navItems.map(({ href, icon }) => (
          <li key={href}>
            <Link href={href}>
              <motion.span
                className={`inline-block p-3 rounded-full text-lg ${
                  activeSection === href.slice(1) ? "bg-white/20" : "hover:bg-white/10"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {icon}
              </motion.span>
            </Link>
          </li>
        ))}
      </ul>
    </motion.nav>
  )
}

