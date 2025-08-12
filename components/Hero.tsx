"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div className="container mx-auto px-6 py-24 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex flex-col items-center gap-4"
          >
            <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-white/20">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/20220522191627_IMG_8090%20(1).jpg-J8t2IVIXVYLCJZRLUpJ6fjN1swMkyM.jpeg"
                alt="Rohith Dachepally"
                fill
                className="object-cover"
              />
            </div>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "auto" }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="overflow-hidden"
            >
              <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text px-6 py-2 text-lg font-medium">
                Hi! I am Rohith
              </div>
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-4"
          >
            Rohith Dachepally
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-3xl md:text-5xl font-bold tracking-tight"
          >
            <span className="text-white">Data Science</span>{" "}
            <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Student</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-xl text-white/90 max-w-2xl mx-auto"
          >
            Based in Uppal, Hyderabad, Telangana
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex justify-center gap-4"
          >
            <Link href="https://linktr.ee/rohith_dachepally" target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 transition-all duration-300"
              >
                Let&apos;s connect! <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

