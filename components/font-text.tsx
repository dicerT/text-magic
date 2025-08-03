"use client"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Copy, Check, Type, Zap } from "lucide-react"
import { useLanguage } from "./language-provider"

interface FontTextProps {
  onBack: () => void
}

interface FontStyle {
  name: string
  transform: (text: string) => string
}

// 智能字符转换函数，支持回退机制
const convertToFraktur = (text: string): string => {
  const frakturMap: { [key: string]: { primary: number, fallback: string } } = {
    'A': { primary: 0x1D504, fallback: '𝔄' }, 'B': { primary: 0x1D505, fallback: '𝔅' }, 
    'C': { primary: 0x212D, fallback: '𝔈' }, 'D': { primary: 0x1D507, fallback: '𝔇' }, 
    'E': { primary: 0x1D508, fallback: '𝔈' }, 'F': { primary: 0x1D509, fallback: '𝔉' },
    'G': { primary: 0x1D50A, fallback: '𝔊' }, 'H': { primary: 0x210C, fallback: '𝔥' }, 
    'I': { primary: 0x2111, fallback: '𝔩' }, 'J': { primary: 0x1D50D, fallback: '𝔍' },
    'K': { primary: 0x1D50E, fallback: '𝔎' }, 'L': { primary: 0x1D50F, fallback: '𝔏' }, 
    'M': { primary: 0x1D510, fallback: '𝔐' }, 'N': { primary: 0x1D511, fallback: '𝔑' }, 
    'O': { primary: 0x1D512, fallback: '𝔒' }, 'P': { primary: 0x1D513, fallback: '𝔓' },
    'Q': { primary: 0x1D514, fallback: '𝔔' }, 'R': { primary: 0x211C, fallback: '𝔯' }, 
    'S': { primary: 0x1D516, fallback: '𝔖' }, 'T': { primary: 0x1D517, fallback: '𝔗' },
    'U': { primary: 0x1D518, fallback: '𝔘' }, 'V': { primary: 0x1D519, fallback: '𝔙' }, 
    'W': { primary: 0x1D51A, fallback: '𝔚' }, 'X': { primary: 0x1D51B, fallback: '𝔛' },
    'Y': { primary: 0x1D51C, fallback: '𝔜' }, 'Z': { primary: 0x2128, fallback: '𝔷' },
    'a': { primary: 0x1D51E, fallback: '𝔞' }, 'b': { primary: 0x1D51F, fallback: '𝔟' }, 
    'c': { primary: 0x1D520, fallback: '𝔠' }, 'd': { primary: 0x1D521, fallback: '𝔡' }, 
    'e': { primary: 0x1D522, fallback: '𝔢' }, 'f': { primary: 0x1D523, fallback: '𝔣' },
    'g': { primary: 0x1D524, fallback: '𝔤' }, 'h': { primary: 0x1D525, fallback: '𝔥' }, 
    'i': { primary: 0x1D526, fallback: '𝔦' }, 'j': { primary: 0x1D527, fallback: '𝔧' },
    'k': { primary: 0x1D528, fallback: '𝔨' }, 'l': { primary: 0x1D529, fallback: '𝔩' }, 
    'm': { primary: 0x1D52A, fallback: '𝔪' }, 'n': { primary: 0x1D52B, fallback: '𝔫' }, 
    'o': { primary: 0x1D52C, fallback: '𝔬' }, 'p': { primary: 0x1D52D, fallback: '𝔭' },
    'q': { primary: 0x1D52E, fallback: '𝔮' }, 'r': { primary: 0x1D52F, fallback: '𝔯' }, 
    's': { primary: 0x1D530, fallback: '𝔰' }, 't': { primary: 0x1D531, fallback: '𝔱' },
    'u': { primary: 0x1D532, fallback: '𝔲' }, 'v': { primary: 0x1D533, fallback: '𝔳' }, 
    'w': { primary: 0x1D534, fallback: '𝔴' }, 'x': { primary: 0x1D535, fallback: '𝔵' },
    'y': { primary: 0x1D536, fallback: '𝔶' }, 'z': { primary: 0x1D537, fallback: '𝔷' }
  }

      return text
        .split("")
        .map((char) => {
      if (frakturMap[char]) {
        try {
          const converted = String.fromCodePoint(frakturMap[char].primary)
          // 测试字符是否能正确渲染
          if (typeof window !== 'undefined' && !testCharacterRendering(converted)) {
            return frakturMap[char].fallback
          }
          return converted
        } catch {
          return frakturMap[char].fallback
        }
      }
      return char
        })
        .join("")
}

// 增强的字符转换函数集合
const createFallbackTransform = (charMap: Record<string, string>, name: string) => {
  return (text: string): string => {
      return text
        .split("")
        .map((char) => {
        if (charMap[char]) {
          const converted = charMap[char]
          // 如果字符不能正确渲染，使用更安全的回退
          if (typeof window !== 'undefined' && !testCharacterRendering(converted)) {
            // 为不同样式提供不同的回退策略
            switch (name) {
              case 'Cryptic Italic':
                return `*${char}*` // 用星号包围
              case 'Math Sans':
                return `[${char}]` // 用方括号包围
              case 'Script Bold Italic':
                return `~${char}~` // 用波浪号包围
              case 'Fairytale':
                return `◆${char}◆` // 用菱形包围
              default:
                return char
            }
          }
          return converted
        }
        return char
        })
        .join("")
  }
}

const fontStyles: FontStyle[] = [
  {
    name: "Fraktur",
    transform: convertToFraktur,
  },
  {
    name: "Cryptic Italic",
    transform: createFallbackTransform({
      'A': '𝒜', 'B': 'ℬ', 'C': '𝒞', 'D': '𝒟', 'E': 'ℰ', 'F': 'ℱ', 'G': '𝒢', 'H': 'ℋ',
      'I': 'ℐ', 'J': '𝒥', 'K': '𝒦', 'L': 'ℒ', 'M': 'ℳ', 'N': '𝒩', 'O': '𝒪', 'P': '𝒫',
      'Q': '𝒬', 'R': 'ℛ', 'S': '𝒮', 'T': '𝒯', 'U': '𝒰', 'V': '𝒱', 'W': '𝒲', 'X': '𝒳',
      'Y': '𝒴', 'Z': '𝒵', 'a': '𝒶', 'b': '𝒷', 'c': '𝒸', 'd': '𝒹', 'e': '𝑒', 'f': '𝒻',
      'g': '𝑔', 'h': '𝒽', 'i': '𝒾', 'j': '𝒿', 'k': '𝓀', 'l': '𝓁', 'm': '𝓂', 'n': '𝓃',
      'o': '𝑜', 'p': '𝓅', 'q': '𝓆', 'r': '𝓇', 's': '𝓈', 't': '𝓉', 'u': '𝓊', 'v': '𝓋',
      'w': '𝓌', 'x': '𝓍', 'y': '𝓎', 'z': '𝓏'
    }, 'Cryptic Italic'),
  },
  {
    name: "Math Sans",
    transform: createFallbackTransform({
      'A': '𝖠', 'B': '𝖡', 'C': '𝖢', 'D': '𝖣', 'E': '𝖤', 'F': '𝖥', 'G': '𝖦', 'H': '𝖧',
      'I': '𝖨', 'J': '𝖩', 'K': '𝖪', 'L': '𝖫', 'M': '𝖬', 'N': '𝖭', 'O': '𝖮', 'P': '𝖯',
      'Q': '𝖰', 'R': '𝖱', 'S': '𝖲', 'T': '𝖳', 'U': '𝖴', 'V': '𝖵', 'W': '𝖶', 'X': '𝖷',
      'Y': '𝖸', 'Z': '𝖹', 'a': '𝖺', 'b': '𝖻', 'c': '𝖼', 'd': '𝖽', 'e': '𝖾', 'f': '𝖿',
      'g': '𝗀', 'h': '𝗁', 'i': '𝗂', 'j': '𝗃', 'k': '𝗄', 'l': '𝗅', 'm': '𝗆', 'n': '𝗇',
      'o': '𝗈', 'p': '𝗉', 'q': '𝗊', 'r': '𝗋', 's': '𝗌', 't': '𝗍', 'u': '𝗎', 'v': '𝗏',
      'w': '𝗐', 'x': '𝗑', 'y': '𝗒', 'z': '𝗓'
    }, 'Math Sans'),
  },
  {
    name: "Light Text Bubbles",
    transform: createFallbackTransform({
      'A': 'Ⓐ', 'B': 'Ⓑ', 'C': 'Ⓒ', 'D': 'Ⓓ', 'E': 'Ⓔ', 'F': 'Ⓕ', 'G': 'Ⓖ', 'H': 'Ⓗ',
      'I': 'Ⓘ', 'J': 'Ⓙ', 'K': 'Ⓚ', 'L': 'Ⓛ', 'M': 'Ⓜ', 'N': 'Ⓝ', 'O': 'Ⓞ', 'P': 'Ⓟ',
      'Q': 'Ⓠ', 'R': 'Ⓡ', 'S': 'Ⓢ', 'T': 'Ⓣ', 'U': 'Ⓤ', 'V': 'Ⓥ', 'W': 'Ⓦ', 'X': 'Ⓧ',
      'Y': 'Ⓨ', 'Z': 'Ⓩ', 'a': 'ⓐ', 'b': 'ⓑ', 'c': 'ⓒ', 'd': 'ⓓ', 'e': 'ⓔ', 'f': 'ⓕ',
      'g': 'ⓖ', 'h': 'ⓗ', 'i': 'ⓘ', 'j': 'ⓙ', 'k': 'ⓚ', 'l': 'ⓛ', 'm': 'ⓜ', 'n': 'ⓝ',
      'o': 'ⓞ', 'p': 'ⓟ', 'q': 'ⓠ', 'r': 'ⓡ', 's': 'ⓢ', 't': 'ⓣ', 'u': 'ⓤ', 'v': 'ⓥ',
      'w': 'ⓦ', 'x': 'ⓧ', 'y': 'ⓨ', 'z': 'ⓩ'
    }, 'Light Text Bubbles'),
  },
  {
    name: "Script Bold Italic",
    transform: createFallbackTransform({
      'A': '𝓐', 'B': '𝓑', 'C': '𝓒', 'D': '𝓓', 'E': '𝓔', 'F': '𝓕', 'G': '𝓖', 'H': '𝓗',
      'I': '𝓘', 'J': '𝓙', 'K': '𝓚', 'L': '𝓛', 'M': '𝓜', 'N': '𝓝', 'O': '𝓞', 'P': '𝓟',
      'Q': '𝓠', 'R': '𝓡', 'S': '𝓢', 'T': '𝓣', 'U': '𝓤', 'V': '𝓥', 'W': '𝓦', 'X': '𝓧',
      'Y': '𝓨', 'Z': '𝓩', 'a': '𝓪', 'b': '𝓫', 'c': '𝓬', 'd': '𝓭', 'e': '𝓮', 'f': '𝓯',
      'g': '𝓰', 'h': '𝓱', 'i': '𝓲', 'j': '𝓳', 'k': '𝓴', 'l': '𝓵', 'm': '𝓶', 'n': '𝓷',
      'o': '𝓸', 'p': '𝓹', 'q': '𝓺', 'r': '𝓻', 's': '𝓼', 't': '𝓽', 'u': '𝓾', 'v': '𝓿',
      'w': '𝔀', 'x': '𝔁', 'y': '𝔂', 'z': '𝔃'
    }, 'Script Bold Italic'),
  },
  {
    name: "Fairytale",
    transform: createFallbackTransform({
      'A': '𝕬', 'B': '𝕭', 'C': '𝕮', 'D': '𝕯', 'E': '𝕰', 'F': '𝕱', 'G': '𝕲', 'H': '𝕳',
      'I': '𝕴', 'J': '𝕵', 'K': '𝕶', 'L': '𝕷', 'M': '𝕸', 'N': '𝕹', 'O': '𝕺', 'P': '𝕻',
      'Q': '𝕼', 'R': '𝕽', 'S': '𝕾', 'T': '𝕿', 'U': '𝖀', 'V': '𝖁', 'W': '𝖂', 'X': '𝖃',
      'Y': '𝖄', 'Z': '𝖅', 'a': '𝖆', 'b': '𝖇', 'c': '𝖈', 'd': '𝖉', 'e': '𝖊', 'f': '𝖋',
      'g': '𝖌', 'h': '𝖍', 'i': '𝖎', 'j': '𝖏', 'k': '𝖐', 'l': '𝖑', 'm': '𝖒', 'n': '𝖓',
      'o': '𝖔', 'p': '𝖕', 'q': '𝖖', 'r': '𝖗', 's': '𝖘', 't': '𝖙', 'u': '𝖚', 'v': '𝖛',
      'w': '𝖜', 'x': '𝖝', 'y': '𝖞', 'z': '𝖟'
    }, 'Fairytale'),
  },
]

// 增强的Unicode字符检测函数
const detectUnicodeSupport = (text: string): boolean => {
  // 检测是否包含高位Unicode字符
  const unicodeRanges = [
    /[\u{1D400}-\u{1D7FF}]/u, // 数学字母符号
    /[\u{1D800}-\u{1D9FF}]/u, // 补充数学字母符号
    /[\u{1DA00}-\u{1DA7F}]/u, // 数学字母符号扩展
    /[\u{1F100}-\u{1F1FF}]/u, // 封闭字母数字补充
    /[\u{2460}-\u{24FF}]/u,   // 封闭字母数字
    /[\u{1F300}-\u{1F5FF}]/u, // 杂项符号和象形文字
    /[\u{1F600}-\u{1F64F}]/u, // 表情符号
    /[\u{1F680}-\u{1F6FF}]/u, // 传输和地图符号
    /[\u{2600}-\u{26FF}]/u,   // 杂项符号
    /[\u{2700}-\u{27BF}]/u,   // 装饰符号
  ]
  
  return unicodeRanges.some(range => range.test(text))
}

// 字符渲染测试函数
const testCharacterRendering = (char: string): boolean => {
  if (typeof window === 'undefined') return true
  
  try {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return false
    
    canvas.width = 50
    canvas.height = 50
    
    // 设置字体
    ctx.font = '20px "Noto Sans Math", "Code2000", "Symbola", serif'
    ctx.fillStyle = 'black'
    ctx.textBaseline = 'middle'
    
    // 绘制字符
    ctx.fillText(char, 10, 25)
    
    // 检查像素数据
    const imageData = ctx.getImageData(0, 0, 50, 50)
    const data = imageData.data
    
    // 如果有非透明像素，说明字符被渲染了
    for (let i = 3; i < data.length; i += 4) {
      if (data[i] > 0) return true
    }
    
    return false
  } catch (error) {
    console.warn('Character rendering test failed:', error)
    return true // 如果测试失败，假设支持
  }
}

// 检测字体可用性
const checkFontAvailability = (fontName: string): Promise<boolean> => {
  if (typeof window === 'undefined') return Promise.resolve(true)
  
  return new Promise((resolve) => {
    if ('fonts' in document && document.fonts.check) {
      try {
        const isAvailable = document.fonts.check(`16px "${fontName}"`)
        resolve(isAvailable)
      } catch {
        resolve(false)
      }
    } else {
      // 回退方法：使用Canvas测试
      try {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          resolve(false)
          return
        }
        
        const testText = 'abcdefghijklmnopqrstuvwxyz0123456789'
        
        ctx.font = `16px "${fontName}", monospace`
        const width1 = ctx.measureText(testText).width
        
        ctx.font = '16px monospace'
        const width2 = ctx.measureText(testText).width
        
        resolve(Math.abs(width1 - width2) > 1)
      } catch {
        resolve(false)
      }
    }
  })
}

// 智能字符兼容性检测
const analyzeCharacterCompatibility = (text: string): {
  hasUnicodeChars: boolean
  unsupportedChars: string[]
  supportedRatio: number
  recommendedFonts: string[]
} => {
  const chars = Array.from(text)
  const unsupportedChars: string[] = []
  let supportedCount = 0
  
  chars.forEach(char => {
    if (char.codePointAt(0)! > 127) { // 非ASCII字符
      if (!testCharacterRendering(char)) {
        unsupportedChars.push(char)
      } else {
        supportedCount++
      }
    } else {
      supportedCount++
    }
  })
  
  const supportedRatio = supportedCount / chars.length
  const hasUnicodeChars = detectUnicodeSupport(text)
  
  // 推荐字体
  const recommendedFonts: string[] = []
  if (hasUnicodeChars) {
    recommendedFonts.push('Noto Sans Math', 'Code2000', 'Symbola')
  }
  if (unsupportedChars.length > 0) {
    recommendedFonts.push('DejaVu Sans', 'Arial Unicode MS')
  }
  
  return {
    hasUnicodeChars,
    unsupportedChars,
    supportedRatio,
    recommendedFonts: [...new Set(recommendedFonts)]
  }
}

export default function FontText({ onBack }: FontTextProps) {
  const { t } = useLanguage()
  const [inputText, setInputText] = useState("I Love U ❤️")
  const [results, setResults] = useState<Array<{ style: FontStyle; text: string; compatibility: any }>>([])
  const [copySuccess, setCopySuccess] = useState<string | null>(null)
  const [isConverting, setIsConverting] = useState(false)
  const [unicodeWarnings, setUnicodeWarnings] = useState<Set<string>>(new Set())
  const [fontLoadingStatus, setFontLoadingStatus] = useState<Record<string, boolean>>({})

  const convertText = useCallback(async () => {
    if (!inputText.trim()) return

    setIsConverting(true)
    await new Promise((resolve) => setTimeout(resolve, 300))

    // 检测字体加载状态
    const fontStatus: Record<string, boolean> = {}
    const fontChecks = [
      'Noto Sans Math',
      'Code2000', 
      'Symbola',
      'DejaVu Sans',
      'STIX'
    ].map(async (fontName) => {
      const available = await checkFontAvailability(fontName)
      fontStatus[fontName] = available
      return { fontName, available }
    })
    
    await Promise.all(fontChecks)
    setFontLoadingStatus(fontStatus)

    const newResults = fontStyles.map((style) => {
      const transformedText = style.transform(inputText)
      const compatibility = analyzeCharacterCompatibility(transformedText)
      
      return {
      style,
        text: transformedText,
        compatibility
      }
    })
    
    // 棉新Unicode警告逻辑
    const warnings = new Set<string>()
    newResults.forEach((result) => {
      if (result.compatibility.hasUnicodeChars || result.compatibility.supportedRatio < 0.8) {
        warnings.add(result.style.name)
      }
    })
    setUnicodeWarnings(warnings)
    
    setResults(newResults)
    setIsConverting(false)
  }, [inputText])

  const copyToClipboard = useCallback(async (text: string, styleName: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopySuccess(styleName)
      setTimeout(() => setCopySuccess(null), 2000)
    } catch (err) {
      console.error("Copy failed:", err)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center mb-8 relative"
        >
          <Button variant="ghost" onClick={onBack} className="absolute left-0 rounded-full hover:bg-gray-100 text-gray-700 hover:text-gray-900">
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <div className="text-center">
            <h1 className="text-3xl font-bold text-blue-600 mb-1">{t("font-text.pageTitle")}</h1>
            <p className="text-gray-600 text-sm">{t("font-text.pageDescription")}</p>
          </div>
        </motion.div>

        <div className="space-y-6">
          {/* Input Section */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="border border-gray-200 shadow-sm bg-white">
              <CardContent className="p-6 space-y-4">
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700">{t("font-text.inputLabel")}</label>
                  <Input
                    placeholder={t("font-text.inputPlaceholder")}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="text-lg py-3 border-gray-300 rounded-xl bg-white text-gray-900 transition-shadow duration-200 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                  />
                </div>

                <Button
                  onClick={convertText}
                  disabled={!inputText.trim() || isConverting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  {isConverting ? t("font-text.convertingButton") : t("font-text.convertButton")}
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Results Section */}
          {results.length > 0 ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <div className="space-y-4">
                {results.map((result, index) => (
                  <motion.div
                    key={result.style.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Card className="border border-gray-200 shadow-sm bg-white hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="font-medium text-gray-900">{result.style.name}</h3>
                          </div>

                          <Button
                            size="sm"
                            onClick={() => copyToClipboard(result.text, result.style.name)}
                            className={`bg-blue-600 hover:bg-blue-700 text-white ${
                              copySuccess === result.style.name ? "bg-green-600 hover:bg-green-700" : ""
                            }`}
                          >
                            {copySuccess === result.style.name ? (
                              <Check className="w-4 h-4 mr-2" />
                            ) : (
                              <Copy className="w-4 h-4 mr-2" />
                            )}
                            {copySuccess === result.style.name ? t("font-text.copiedButton") : t("font-text.copyButton")}
                          </Button>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <p
                            className="text-gray-800 text-lg break-all leading-relaxed unicode-text math-font"
                            style={{
                              fontSize: "18px",
                              lineHeight: "1.6",
                            }}
                          >
                            {result.text}
                          </p>
                          
                          
                          
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card className="border border-gray-200 shadow-sm bg-white">
                <CardContent className="p-12">
                  <div className="text-center text-gray-400">
                    <Type className="w-16 h-16 mx-auto mb-6 text-gray-300" />
                    <p className="text-xl font-medium mb-3 text-gray-600">{t("font-text.placeholder.title")}</p>
                    <p className="text-sm">{t("font-text.placeholder.description")}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
