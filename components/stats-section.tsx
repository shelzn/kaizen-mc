import { Server, Trophy, Users } from "lucide-react"
import { Card } from "./ui/card"

export default function StatsSection() {
  return (
    <section className="container mx-auto px-4 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-3">
      {[
        {
          icon: <Users className="h-8 w-8" />,
          color: "green",
          value: "90",
          label: "Pemain Online",
          delay: "100",
        },
        {
          icon: <Server className="h-8 w-8" />,
          color: "blue",
          value: "1.20 - 1.21.4",
          label: "Versi Server",
          delay: "200",
        },
        {
          icon: <Trophy className="h-8 w-8" />,
          color: "yellow",
          value: "76,000+",
          label: "Total Pemain",
          delay: "300",
        },
      ].map((stat, index) => (
        <Card
          key={index}
          className={`p-4 bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-xl border border-gray-700 opacity-0 animate-fade-in animation-delay-${stat.delay}`}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#f8cb08]/10 rounded-xl text-[#f8cb08]">{stat.icon}</div>
            <div>
              <div className="text-xl font-bold">{stat.value}</div>
              <div className="text-xs text-gray-400">{stat.label}</div>
            </div>
          </div>
        </Card>
      ))}
    </section>
  )
}
