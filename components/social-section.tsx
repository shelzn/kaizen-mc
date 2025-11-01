import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export default function SocialSection() {
  const items = [
    {
      icon: "/discord.svg",
      title: "Discord",
      description: "Bergabung ke komunitas Discord kami untuk dukungan, chat real-time, dan event lainnya.",
      buttonText: "Buka Tautan",
      link: "/discord",
    },
    {
      icon: "/tiktok.svg",
      title: "TikTok",
      description: "Ikuti TikTok kami untuk klip menarik, tutorial, dan live server.",
      buttonText: "Buka Tautan",
      link: "/tiktok",
    },
    {
      icon: "/whatsapp.svg",
      title: "WhatsApp",
      description: "Subscribe to our WhatsApp channel for instant notifications and important announcements.",
      buttonText: "Buka Tautan",
      link: "/whatsapp",
    },
  ]

  return (
    <section className="relative w-full bg-gray-900 py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-white mb-3">Gabung dengan Komunitas Kami</h2>
          <p className="text-gray-400 text-base max-w-3xl mx-auto">
            Tetap terhubung dengan kami di media sosial untuk pembaruan terbaru, acara, dan lainnya.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {items.map((item, idx) => (
            <Card
              key={idx}
              className="bg-gray-800/80 backdrop-blur-sm border border-gray-600/50 rounded-2xl p-6 flex flex-col hover:bg-gray-800/90 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#BA8FEE]/10"
            >
              <CardHeader className="p-0 mb-4">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-[#BA8FEE]/10 rounded-xl">
                    <Image
                      src={item.icon || "/placeholder.svg"}
                      width={40}
                      height={40}
                      alt={item.title}
                      className="w-10 h-10"
                      draggable={false}
                      loading="lazy"
                    />
                  </div>
                  <CardTitle className="text-white text-xl font-bold">{item.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-0 flex flex-col flex-grow">
                <p className="text-gray-300 mb-6 text-sm leading-relaxed flex-grow">{item.description}</p>
                <Button
                  asChild
                  className="bg-yellow-400 text-black hover:bg-yellow-500 font-semibold py-2 px-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/20 w-full text-sm"
                >
                  <a href={item.link} className="text-center" target="_blank" rel="noreferrer">
                    {item.buttonText}
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
