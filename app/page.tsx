"use client"

import { GamemodeSection } from "@/components/gamemode-section"
import StatsSection from "@/components/stats-section"
import { AboutSection } from "@/components/about-section"
import SocialSection from "@/components/social-section"
import HeroSection from "@/components/hero-section"

export default function Home() {
  return (
    <div className="w-full space-y-0 mt-10 lg:mt-20">
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <div className="py-6">
        <StatsSection />
      </div>

      {/* About Section */}
      <AboutSection />

      {/* Gamemode Section */}
      <GamemodeSection />

      {/* Social Section */}
      <SocialSection />
    </div>
  )
}
