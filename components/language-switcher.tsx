"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Globe, ChevronDown } from "lucide-react"
import { useLanguage, type Language } from "./language-provider"

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const languages = [
    { code: "zh", name: "中文", flag: "🇨🇳" },
    { code: "en", name: "English", flag: "🇺🇸" },
  ]

  const currentLanguage = languages.find(lang => lang.code === language)

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full hover:bg-white/80 backdrop-blur-sm transition-all duration-200 flex items-center gap-2 px-4 py-2 border border-gray-200/50 shadow-sm hover:shadow-md"
      >
        <Globe className="w-4 h-4 text-gray-600" />
        <span className="text-sm font-medium text-gray-700">{currentLanguage?.flag}</span>
        <ChevronDown className={`w-3 h-3 text-gray-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute right-0 top-full mt-2 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden z-50 min-w-[140px]"
          >
            <div className="py-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code as Language)
                    setIsOpen(false)
                  }}
                  className={`w-full px-4 py-3 text-sm flex items-center gap-3 hover:bg-gray-50/80 transition-all duration-150 ${
                    language === lang.code ? "bg-teal-50/80 text-teal-700 font-medium" : "text-gray-700"
                  }`}
                >
                  <span className="text-base">{lang.flag}</span>
                  <span className="font-medium">{lang.name}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 