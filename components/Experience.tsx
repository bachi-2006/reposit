import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Camera } from "lucide-react"
import Link from "next/link"

export default function Experience() {
  return (
    <section id="experience" className="py-24">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-12"
        >
          Experience
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <Link href="https://shorturl.at/4V8Ls" target="_blank" rel="noopener noreferrer">
            <Card className="bg-white/5 hover:bg-white/10 transition-colors border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-3 rounded-full">
                    <Camera className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Photographer</h3>
                    <p className="text-white/60 mt-1">Chitrika VBIT</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

