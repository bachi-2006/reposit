import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Facebook, Linkedin, Instagram } from "lucide-react"
import Link from "next/link"

export default function Contact() {
  const socialLinks = [
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/rohith-dachepally",
      label: "LinkedIn",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/_mr_decent_06",
      label: "Instagram",
    },
    {
      icon: Facebook,
      href: "https://www.facebook.com/dachepally.rohith.9",
      label: "Facebook",
    },
  ]

  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-12"
        >
          Contact Me
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-white/10 border-white/10 h-full">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-6">Get in Touch</h3>
                <div className="flex items-center gap-3 mb-6">
                  <Mail className="h-5 w-5 text-pink-400" />
                  <a
                    href="mailto:dachepallyrohith@gmail.com"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    dachepallyrohith@gmail.com
                  </a>
                </div>
                <div className="flex gap-4">
                  {socialLinks.map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                    >
                      <Button variant="outline" size="icon" className="bg-white/10 hover:bg-white/20 border-white/20">
                        <link.icon className="h-5 w-5" />
                      </Button>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Card className="bg-white/10 border-white/10">
              <CardContent className="p-6">
                <form className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Name"
                      className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:border-pink-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:border-pink-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Message"
                      rows={4}
                      className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:border-pink-500 focus:outline-none"
                    ></textarea>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

