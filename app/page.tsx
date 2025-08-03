"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import HomePage from "@/components/home-page"
import TextRepeater from "@/components/text-repeater"
import EmojiText from "@/components/emoji-text"
import FontText from "@/components/font-text"
import { LanguageProvider } from "@/components/language-provider"

export type PageType = "home" | "text-repeater" | "emoji-text" | "font-text"

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>("home")

  const pageVariants = {
    initial: { opacity: 0, y: 10 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -10 },
  }

  const pageTransition = {
    type: "tween" as const,
    ease: "easeInOut" as const,
    duration: 0.3,
  }

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={setCurrentPage} />
      case "text-repeater":
        return <TextRepeater onBack={() => setCurrentPage("home")} />
      case "emoji-text":
        return <EmojiText onBack={() => setCurrentPage("home")} />
      case "font-text":
        return <FontText onBack={() => setCurrentPage("home")} />
      default:
        return <HomePage onNavigate={setCurrentPage} />
    }
  }

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </div>
    </LanguageProvider>
  )
}
