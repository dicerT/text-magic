"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Repeat, Heart, Type, ArrowRight, Sparkles } from "lucide-react"
import { useLanguage } from "./language-provider"
import LanguageSwitcher from "./language-switcher"
import type { PageType } from "@/app/page"

interface HomePageProps {
  onNavigate: (page: PageType) => void
}

const FeatureCard = ({
  title,
  description,
  icon: Icon,
  preview,
  onClick,
  delay = 0,
}: {
  title: string
  description: string
  icon: React.ElementType
  preview: React.ReactNode
  onClick: () => void
  delay?: number
}) => (
  <motion.div
    initial={{ opacity: 0, y: 40, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ 
      delay, 
      duration: 0.8, 
      ease: [0.23, 1, 0.32, 1] // Apple's easing curve
    }}
    whileHover={{ 
      y: -12, 
      scale: 1.03,
      transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] }
    }}
    whileTap={{ scale: 0.97 }}
    className="group h-full"
  >
    <Card
      className="cursor-pointer h-full border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-xl border border-white/20 overflow-hidden relative rounded-2xl group-hover:bg-white/90"
      onClick={onClick}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-blue-600/5 to-indigo-600/5 group-hover:from-blue-500/10 group-hover:via-blue-600/10 group-hover:to-indigo-600/10 transition-all duration-500" />
      
      <CardContent className="p-6 h-full flex flex-col">
        {/* Icon and arrow */}
        <div className="flex items-start justify-between mb-6">
          <motion.div 
            className="w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          >
            <Icon className="w-8 h-8 text-white" />
          </motion.div>
          <motion.div
            whileHover={{ x: 4 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          >
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-all duration-300" />
          </motion.div>
        </div>

        {/* Title and description */}
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-700 transition-colors duration-300">{title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">{description}</p>
        </div>

        {/* Preview section */}
        <div className="bg-gray-50/80 backdrop-blur-sm rounded-xl p-4 border-0 group-hover:bg-blue-50/80 transition-all duration-500">
          {preview}
        </div>
      </CardContent>
    </Card>
  </motion.div>
)

export default function HomePage({ onNavigate }: HomePageProps) {
  const { t } = useLanguage()

  // 统一的蓝色渐变主题
  const blueTheme = {
    gradient: "bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600",
    text: "text-gray-900",
    iconBg: "bg-white/20 backdrop-blur-sm",
    iconColor: "text-blue-600",
    hoverIconBg: "bg-white/30",
    cardBg: "bg-white/80 backdrop-blur-xl border border-white/20",
    hoverCardBg: "bg-white/90"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-20 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-4000"></div>
      </div>
      <div className="container mx-auto px-6 py-16 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20 relative"
        >
          <div className="flex items-center justify-center mb-6">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {t("app.title")}
            </h1>
          </div>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto leading-relaxed font-medium mb-3">
            {t("app.subtitle")}
          </p>
          <p className="text-gray-500 text-base max-w-2xl mx-auto leading-relaxed">
            {t("app.description")}
          </p>
          
          {/* Language switcher positioned absolutely */}
          <div className="absolute top-0 right-0">
            <LanguageSwitcher />
          </div>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <FeatureCard
            title={t("text-repeater.title")}
            description={t("text-repeater.description")}
            icon={Repeat}
            delay={0.1}
            onClick={() => onNavigate("text-repeater")}
            preview={
              <div className="text-gray-700 text-sm space-y-2 text-center">
                <div className="font-medium">I Love U ❤️</div>
                <div className="text-gray-500">I Love U ❤️</div>
                <div className="text-gray-400">I Love U ❤️</div>
              </div>
            }
          />

          <FeatureCard
            title={t("emoji-text.title")}
            description={t("emoji-text.description")}
            icon={Heart}
            delay={0.3}
            onClick={() => onNavigate("emoji-text")}
            preview={
              <div className="text-center">
                <img 
                  src="/images/love-emoji-preview.svg" 
                  alt="LOVE emoji art preview" 
                  className="mx-auto h-16 object-contain"
                  onLoad={() => console.log('SVG image loaded successfully')}
                  onError={(e) => {
                    console.log('SVG image failed to load, showing fallback');
                    const target = e.currentTarget as HTMLImageElement;
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) {
                      target.style.display = 'none';
                      fallback.style.display = 'block';
                    }
                  }}
                />
                <div className="text-xs font-mono leading-tight hidden" style={{display: 'none'}}>
                  <div>❤️⬜️⬜️⬜️⬜️⬜️⬜️❤️❤️❤️❤️❤️⬜️⬜️❤️⬜️⬜️⬜️❤️⬜️⬜️❤️❤️❤️❤️❤️</div>
                  <div>❤️⬜️⬜️⬜️⬜️⬜️⬜️❤️⬜️⬜️⬜️❤️⬜️⬜️❤️⬜️⬜️⬜️❤️⬜️⬜️❤️⬜️⬜️⬜️⬜️</div>
                  <div>❤️⬜️⬜️⬜️⬜️⬜️⬜️❤️⬜️⬜️⬜️❤️⬜️⬜️❤️⬜️⬜️⬜️❤️⬜️⬜️❤️⬜️⬜️⬜️⬜️</div>
                  <div>❤️⬜️⬜️⬜️⬜️⬜️⬜️❤️⬜️⬜️⬜️❤️⬜️⬜️❤️⬜️⬜️⬜️❤️⬜️⬜️❤️❤️❤️❤️⬜️</div>
                  <div>❤️⬜️⬜️⬜️⬜️⬜️⬜️❤️⬜️⬜️⬜️❤️⬜️⬜️⬜️❤️⬜️❤️⬜️⬜️⬜️❤️⬜️⬜️⬜️⬜️</div>
                  <div>❤️⬜️⬜️⬜️⬜️⬜️⬜️❤️⬜️⬜️⬜️❤️⬜️⬜️⬜️❤️⬜️❤️⬜️⬜️⬜️❤️⬜️⬜️⬜️⬜️</div>
                  <div>❤️❤️❤️❤️❤️⬜️⬜️❤️❤️❤️❤️❤️⬜️⬜️⬜️⬜️❤️⬜️⬜️⬜️⬜️❤️❤️❤️❤️❤️</div>
                </div>
                <div className="text-xs text-gray-600 mt-2 font-semibold">LOVE</div>
              </div>
            }
          />

          <FeatureCard
            title={t("font-text.title")}
            description={t("font-text.description")}
            icon={Type}
            delay={0.5}
            onClick={() => onNavigate("font-text")}
            preview={
              <div className="text-gray-700 text-center space-y-2">
                <div className="text-sm font-medium">I Love U ❤️</div>
                <div className="text-sm font-bold">𝐈 𝐋𝐨𝐯𝐞 𝐔 ❤️</div>
                <div className="text-xs">Ⓘ Ⓛⓞⓥⓔ Ⓤ ❤️</div>
              </div>
            }
          />
        </div>

      </div>
    </div>
  )
}
