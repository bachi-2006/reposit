import Link from "next/link"
import { Mail, Facebook, Linkedin, Instagram } from "lucide-react"

export default function Footer() {
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
    <footer className="bg-black/20 backdrop-blur-md py-6 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-white/80 text-sm">©2025 Rohith Dachepally</div>
          <div className="flex items-center gap-4">
            <a
              href="mailto:dachepallyrohith@gmail.com"
              className="text-white/80 hover:text-white transition-colors flex items-center gap-2"
            >
              <Mail className="h-5 w-5" />
              <span className="hidden md:inline">dachepallyrohith@gmail.com</span>
            </a>
            {socialLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="text-white/80 hover:text-white transition-colors"
              >
                <link.icon className="h-5 w-5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

