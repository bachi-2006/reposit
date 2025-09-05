import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"
import Link from "next/link"

export default function Certifications() {
  const certificates = [
    {
      title: "Introduction to PowerBI",
      issuer: "SimpliLearn",
      link: "https://shorturl.at/vb7lV",
    },
    {
      title: "Python Programming For Beginners",
      issuer: "Udemy",
      link: "https://shorturl.at/NHg1y",
    },
  ]

  return (
    <section id="certifications" className="py-24 bg-purple-900/30 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-12"
        >
          Certifications
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {certificates.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={cert.link} target="_blank" rel="noopener noreferrer">
                <Card className="bg-white/5 hover:bg-white/10 transition-colors border-white/10 backdrop-blur-sm h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{cert.title}</h3>
                        <p className="text-white/60">{cert.issuer}</p>
                      </div>
                      <ExternalLink className="h-5 w-5 text-white/60" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

