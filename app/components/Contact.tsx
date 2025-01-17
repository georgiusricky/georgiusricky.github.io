import { Linkedin, Mail, MessageSquare } from 'lucide-react'
import data from '@/data/data.json'

export default function Contact() {
  const socials = data.socials

  return (
    <section className="w-full py-12 md:py-24 bg-background">
      <div className="container px-4 md:px-6">
        <div className="space-y-8 text-center">
          <h3 className="text-sm uppercase tracking-wider text-muted-foreground">
            {`LET'S GET IN TOUCH`}
          </h3>
          <h2 className="text-3xl font-bold tracking-tighter md:text-5xl">
            {`Contact me and let's work together`}
          </h2>
        </div>
        <div className="mx-auto grid max-w-5xl gap-8 mt-12 md:grid-cols-3">
          <div className="bg-card text-card-foreground rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold flex items-center justify-center space-x-2 mb-4">
                <MessageSquare className="h-6 w-6 text-primary" />
                <span>Text or WhatsApp Me</span>
              </h3>
              <div className="text-center">
                <p className="text-muted-foreground">+{socials.wa}</p>
                <a 
                  href={`https://wa.me/${socials.wa}`} 
                  className="text-primary hover:underline mt-2 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open WhatsApp
                </a>
              </div>
            </div>
          </div>
          <div className="bg-card text-card-foreground rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold flex items-center justify-center space-x-2 mb-4">
                <Mail className="h-6 w-6 text-primary" />
                <span>Send Me An Email</span>
              </h3>
              <div className="text-center">
                <p className="text-muted-foreground">{socials.email}</p>
                <a 
                  href={`mailto:${socials.email}`} 
                  className="text-primary hover:underline mt-2 inline-block"
                >
                  Send Email
                </a>
              </div>
            </div>
          </div>
          <div className="bg-card text-card-foreground rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold flex items-center justify-center space-x-2 mb-4">
                <Linkedin className="h-6 w-6 text-primary" />
                <span>Visit My LinkedIn</span>
              </h3>
              <div className="text-center">
                <p className="text-muted-foreground">Connect with me</p>
                <a 
                  href={socials.linkedin}
                  className="text-primary hover:underline mt-2 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Profile
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}