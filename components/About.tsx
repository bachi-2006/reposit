import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

export default function About() {
  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-12"
        >
          About Me
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-6 text-white/90">
              <p className="text-lg leading-relaxed">
                I am a Data Science undergraduate at Vignana Bharathi Institute of Technology, passionate about
                technology, data analytics, and programming. Skilled in C, Java, and Python, I aim to solve real-world
                challenges through data-driven solutions. Currently, I also work as a photographer at Chitrika VBIT,
                fostering creativity and teamwork. Let's connect to collaborate and innovate!
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

