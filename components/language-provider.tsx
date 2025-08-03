"use client"

import React, { createContext, useContext, useState } from "react"

export type Language = "zh" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  zh: {
    "app.title": "文字魔法师",
    "app.subtitle": "简洁、高效、专业的文字处理工具",
    "app.description": "让文字创作变得更加有趣和高效",
    "text-repeater.title": "文本重复器",
    "text-repeater.description": "快速生成重复文本，支持多种格式输出，满足各种使用场景",
    "text-repeater.pageTitle": "文本复读机",
    "text-repeater.pageDescription": "简洁、高效、专业的文本重复工具",
    "text-repeater.inputLabel": "输入文本",
    "text-repeater.inputPlaceholder": "请输入要重复的文本...",
    "text-repeater.countLabel": "重复次数",
    "text-repeater.customPlaceholder": "自定义次数 (1-100000)",
    "text-repeater.formatLabel": "输出格式",
    "text-repeater.generateButton": "生成",
    "text-repeater.generatingButton": "生成中...",
    "text-repeater.resultLabel": "生成结果",
    "text-repeater.copyButton": "复制",
    "text-repeater.copiedButton": "已复制",
    "text-repeater.footerText": "高性能文本复读机 • 支持最高100000次重复 • 响应式设计",
    "text-repeater.format.newline": "每行一个",
    "text-repeater.format.comma": "逗号分隔",
    "text-repeater.format.space": "空格分隔", 
    "text-repeater.format.none": "无分隔符",
    "text-repeater.error.range": "请输入1到100000之间的整数",
    "text-repeater.placeholder.result": "生成结果将显示在这里",
    "text-repeater.placeholder.waiting": "等待您的文本...",
    "emoji-text.title": "表情符号文字",
    "emoji-text.description": "将文字转换为表情符号艺术图案，创造有趣的视觉效果",
    "emoji-text.pageTitle": "表情符号文字",
    "emoji-text.pageDescription": "将文字转换为表情符号像素艺术",
    "emoji-text.inputLabel": "输入文本",
    "emoji-text.inputPlaceholder": "请输入英文字母...",
    "emoji-text.inputHelp": "支持中文、英文字母、数字和空格",
    "emoji-text.foregroundLabel": "前景表情符号",
    "emoji-text.foregroundHelp": "字符形状",
    "emoji-text.backgroundLabel": "背景表情符号",
    "emoji-text.backgroundHelp": "填充背景",
    "emoji-text.directionLabel": "生成方向",
    "emoji-text.direction.vertical": "纵向排列",
    "emoji-text.direction.horizontal": "横向排列",
    "emoji-text.generateButton": "生成像素艺术",
    "emoji-text.resultLabel": "表情符号像素艺术",
    "emoji-text.copyButton": "复制",
    "emoji-text.copiedButton": "已复制",
    "emoji-text.placeholder.result": "表情符号像素艺术将显示在这里",
    "emoji-text.placeholder.waiting": "输入文字并设置表情符号开始创作",
    "emoji-text.placeholder.example": "示例: 输入 \"LOVE\" 前景 ❤️ 背景 ⬜️",
    "font-text.title": "字体转换器",
    "font-text.description": "多种字体样式转换",
    "font-text.pageTitle": "字体转换器",
    "font-text.pageDescription": "多种字体样式转换",
    "font-text.inputLabel": "输入文本",
    "font-text.inputPlaceholder": "请输入要转换的文字...",
    "font-text.convertButton": "转换",
    "font-text.convertingButton": "转换中...",
    "font-text.copyButton": "复制",
    "font-text.copiedButton": "已复制",
    "font-text.placeholder.title": "开始字体转换",
    "font-text.placeholder.description": "输入文字后点击转换按钮显示多种字体样式",
    "footer.text": "高性能文字魔法师 • 支持最高10000次重复 • 响应式设计",
    "common.characters": "字符",
  },
  en: {
    "app.title": "Text Wizard",
    "app.subtitle": "Simple, efficient, professional text processing tool",
    "app.description": "Make text creation more interesting and efficient",
    "text-repeater.title": "Text Repeater",
    "text-repeater.description": "Quickly generate repeated text with various output formats for different use cases",
    "text-repeater.pageTitle": "Text Repeater",
    "text-repeater.pageDescription": "Simple, efficient, professional text repetition tool",
    "text-repeater.inputLabel": "Input Text",
    "text-repeater.inputPlaceholder": "Enter text to repeat...",
    "text-repeater.countLabel": "Repeat Count",
    "text-repeater.customPlaceholder": "Custom count (1-100000)",
    "text-repeater.formatLabel": "Output Format",
    "text-repeater.generateButton": "Generate",
    "text-repeater.generatingButton": "Generating...",
    "text-repeater.resultLabel": "Result",
    "text-repeater.copyButton": "Copy",
    "text-repeater.copiedButton": "Copied",
    "text-repeater.footerText": "High-performance text repeater • Supports up to 100000 repetitions • Responsive design",
    "text-repeater.format.newline": "One per line",
    "text-repeater.format.comma": "Comma separated",
    "text-repeater.format.space": "Space separated",
    "text-repeater.format.none": "No separator",
    "text-repeater.error.range": "Please enter an integer between 1 and 100000",
    "text-repeater.placeholder.result": "Generated result will be displayed here",
    "text-repeater.placeholder.waiting": "Waiting for your text...",
    "emoji-text.title": "Emoji Text",
    "emoji-text.description": "Convert text into emoji art patterns, creating interesting visual effects",
    "emoji-text.pageTitle": "Emoji Text",
    "emoji-text.pageDescription": "Convert text to emoji pixel art",
    "emoji-text.inputLabel": "Input Text",
    "emoji-text.inputPlaceholder": "Enter letters...",
    "emoji-text.inputHelp": "Supports Chinese, English letters, numbers and spaces",
    "emoji-text.foregroundLabel": "Foreground Emoji",
    "emoji-text.foregroundHelp": "Character shape",
    "emoji-text.backgroundLabel": "Background Emoji",
    "emoji-text.backgroundHelp": "Fill background",
    "emoji-text.directionLabel": "Generation Direction",
    "emoji-text.direction.vertical": "Vertical layout",
    "emoji-text.direction.horizontal": "Horizontal layout",
    "emoji-text.generateButton": "Generate Pixel Art",
    "emoji-text.resultLabel": "Emoji Pixel Art",
    "emoji-text.copyButton": "Copy",
    "emoji-text.copiedButton": "Copied",
    "emoji-text.placeholder.result": "Emoji pixel art will be displayed here",
    "emoji-text.placeholder.waiting": "Enter text and set emojis to start creating",
    "emoji-text.placeholder.example": "Example: Enter \"LOVE\" foreground ❤️ background ⬜️",
    "font-text.title": "Font Converter",
    "font-text.description": "Convert to various font styles",
    "font-text.pageTitle": "Font Converter",
    "font-text.pageDescription": "Convert to various font styles",
    "font-text.inputLabel": "Input Text",
    "font-text.inputPlaceholder": "Enter text to convert...",
    "font-text.convertButton": "Convert",
    "font-text.convertingButton": "Converting...",
    "font-text.copyButton": "Copy",
    "font-text.copiedButton": "Copied",
    "font-text.placeholder.title": "Start Font Conversion",
    "font-text.placeholder.description": "Enter text and click convert to show multiple font styles",
    "footer.text": "High-performance text wizard • Supports up to 10000 repetitions • Responsive design",
    "common.characters": "characters",
  },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("zh")

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
} 