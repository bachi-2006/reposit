"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Projects() {
  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-12"
        >
          My Projects
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-6">
              <h3 className="text-2xl font-semibold mb-4">IR based Smart Home Design</h3>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-0RgAD92XRJoCpcWyIC5nO0nSj5PJ2o.png"
                    alt="Arduino setup with LED indicators"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-1IqlmnbvHRKVyiob8bwXkGCZVcnl0p.png"
                    alt="Artistic shot of Arduino project with LED lights"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <p className="text-white/80 mb-6">
                An innovative smart home automation system utilizing IR sensors and Arduino technology. The project
                features LED indicators for status monitoring and demonstrates practical implementation of IoT concepts
                in home automation.
              </p>
              <div className="flex justify-end">
                <Link
                  href="https://www.linkedin.com/posts/rohith-dachepally_proud-to-share-our-award-winning-project-activity-7266166695298252801-fhbw"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    className="bg-white text-purple-900 hover:bg-purple-100 transition-colors gap-2"
                  >
                    View Project <ExternalLink className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

