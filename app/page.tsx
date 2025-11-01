"use client"

import {GamemodeSection} from "@/components/gamemode-section";
import React from "react";
import StatsSection from "@/components/stats-section";
import { AboutSection } from "@/components/about-section";
import SocialSection from "@/components/social-section";
import HeroSection from "@/components/hero-section";

export default function Home() {

    return (
        <div className="container mx-auto px-4 py-8 space-y-12">
            {/* Hero Section */}
            <HeroSection />

            {/* Stats Section */}
            <StatsSection />

            {/* About Section */}
            <AboutSection />
            
            {/* Gamemode Section */}
            <GamemodeSection />

            {/* Social Section */}
            <SocialSection />
        </div>
    )
}

