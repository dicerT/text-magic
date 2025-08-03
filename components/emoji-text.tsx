"use client"

import { useState, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Copy, Check, Heart, Smile } from "lucide-react"
import { useLanguage } from "./language-provider"

interface EmojiTextProps {
  onBack: () => void
}

// 字符像素图案定义 (7x5 像素)
const letterPatterns: Record<string, number[][]> = {
  A: [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
  ],
  B: [
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
  ],
  C: [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  D: [
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
  ],
  E: [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1],
  ],
  F: [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
  ],
  G: [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 0],
    [1, 0, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  H: [
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
  ],
  I: [
    [1, 1, 1, 1, 1],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [1, 1, 1, 1, 1],
  ],
  J: [
    [1, 1, 1, 1, 1],
    [0, 0, 0, 1, 0],
    [0, 0, 0, 1, 0],
    [0, 0, 0, 1, 0],
    [0, 0, 0, 1, 0],
    [1, 0, 0, 1, 0],
    [0, 1, 1, 0, 0],
  ],
  K: [
    [1, 0, 0, 0, 1],
    [1, 0, 0, 1, 0],
    [1, 0, 1, 0, 0],
    [1, 1, 0, 0, 0],
    [1, 0, 1, 0, 0],
    [1, 0, 0, 1, 0],
    [1, 0, 0, 0, 1],
  ],
  L: [
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1],
  ],
  M: [
    [1, 0, 0, 0, 1],
    [1, 1, 0, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
  ],
  N: [
    [1, 0, 0, 0, 1],
    [1, 1, 0, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 0, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
  ],
  O: [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  P: [
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
  ],
  Q: [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 0, 1, 0],
    [0, 1, 1, 0, 1],
  ],
  R: [
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
    [1, 0, 1, 0, 0],
    [1, 0, 0, 1, 0],
    [1, 0, 0, 0, 1],
  ],
  S: [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  T: [
    [1, 1, 1, 1, 1],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
  ],
  U: [
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  V: [
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0],
  ],
  W: [
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 1, 0, 1, 1],
    [1, 0, 0, 0, 1],
  ],
  X: [
    [1, 0, 0, 0, 1],
    [0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 1, 0, 1, 0],
    [1, 0, 0, 0, 1],
  ],
  Y: [
    [1, 0, 0, 0, 1],
    [0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
  ],
  Z: [
    [1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 1, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1],
  ],
  " ": [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ],
  // 数字 0-9
  "0": [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 1, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  "1": [
    [0, 0, 1, 0, 0],
    [0, 1, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [1, 1, 1, 1, 1],
  ],
  "2": [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 1, 0, 0, 0],
    [1, 1, 1, 1, 1],
  ],
  "3": [
    [1, 1, 1, 1, 1],
    [0, 0, 0, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 1, 0],
    [0, 0, 0, 1, 0],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  "4": [
    [0, 0, 0, 1, 0],
    [0, 0, 1, 1, 0],
    [0, 1, 0, 1, 0],
    [1, 0, 0, 1, 0],
    [1, 1, 1, 1, 1],
    [0, 0, 0, 1, 0],
    [0, 0, 0, 1, 0],
  ],
  "5": [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 0],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  "6": [
    [0, 0, 1, 1, 0],
    [0, 1, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  "7": [
    [1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 1, 0, 0, 0],
  ],
  "8": [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  "9": [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 1, 0],
    [0, 1, 1, 0, 0],
  ],
  // 常用中文汉字
  "你": [
    [0, 1, 0, 0, 1],
    [0, 1, 0, 1, 0],
    [1, 1, 1, 1, 1],
    [0, 1, 0, 1, 0],
    [0, 1, 1, 1, 0],
    [1, 0, 1, 0, 1],
    [0, 0, 1, 0, 0],
  ],
  "我": [
    [0, 0, 1, 0, 0],
    [0, 1, 1, 1, 0],
    [1, 0, 1, 0, 1],
    [0, 1, 1, 1, 0],
    [0, 0, 1, 0, 0],
    [1, 1, 1, 1, 1],
    [1, 0, 1, 0, 1],
  ],
  "爱": [
    [0, 1, 0, 1, 0],
    [1, 1, 1, 1, 1],
    [0, 1, 0, 1, 0],
    [1, 1, 1, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
  ],
  "心": [
    [0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 1, 1, 1, 0],
    [1, 0, 1, 0, 1],
    [0, 0, 1, 0, 0],
  ],
  "好": [
    [1, 1, 0, 0, 1],
    [0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0],
    [1, 1, 1, 1, 1],
    [0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0],
    [1, 1, 0, 1, 1],
  ],
}

type DirectionType = "vertical" | "horizontal"

// 完整的表情符号列表
const allEmojis = [
  // 笑脸和表情
  "😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "😘", "😗", "😙", "😚", "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐",
  "😎", "🤓", "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "😣", "😖", "😫", "😩", "🥺", "😢", "😭", "😤", "😠", "😡", "🤬", "🤯", "😳", "🥵", "🥶", "😱", "😨",
  "😰", "😥", "😓", "🤗", "🤔", "🤭", "🤫", "🤥", "😶", "😐", "😑", "😯", "😦", "😧", "😮", "😲", "🥱", "😴", "🤤", "😪", "😵", "🤐", "🥴", "🤢", "🤮", "🤧",
  "😷", "🤒", "🤕", "🤑", "🤠", "🤡", "🥳", "🥸", "😈", "👿", "👹", "👺", "🤡", "💀", "☠️", "👻", "👽", "👾", "🤖", "😺", "😸", "😹", "😻", "😼", "😽", "🙀",
  "😿", "😾", "🙈", "🙉", "🙊", "💌", "💘", "💝", "💖", "💗", "💓", "💞", "💕", "💟", "❣️", "💔", "❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎", "💯",
  
  // 几何形状和符号
  "⬜", "⬛", "🔴", "🟠", "🟡", "🟢", "🔵", "🟣", "🟤", "🔶", "🔷", "🔸", "🔹", "🔺", "🔻", "💠", "🔘", "⚪", "⚫", "🟥", "🟧", "🟨", "🟩", "🟦", "🟪", "🟫",
  "⭐", "🌟", "✨", "💫", "⚡", "🔥", "💥", "💦", "💨", "🌈", "☀️", "🌙", "⭐", "⚡", "❄️", "🔥", "💎", "✨", "🎉", "🎊", "🎈", "🎁", "🏆", "🥇", "🏅", "🎯",
  "🎪", "🎭", "🎨", "🎬", "🎤", "🎧", "🎼", "🎹", "🥁", "🎷", "🎺", "🎸", "🪕", "🎻", "🎲", "♟️", "🎯", "🎳", "🎮", "🎰", "🧩", "🎨", "📱", "📲", "💻", "⌨️",
  
  // 自然和物体
  "🌱", "🌲", "🌳", "🌴", "🌵", "🌾", "🌿", "☘️", "🍀", "🍁", "🍂", "🍃", "🌺", "🌸", "🌼", "🌻", "🌞", "🌝", "🌛", "🌜", "🌚", "🌕", "🌖", "🌗", "🌘", "🌑",
  "🌒", "🌓", "🌔", "🌙", "🌎", "🌍", "🌏", "💫", "⭐", "🌟", "✨", "⚡", "☄️", "💥", "🔥", "🌪️", "🌈", "☀️", "🌤️", "⛅", "🌥️", "☁️", "🌦️", "🌧️", "⛈️", "🌩️",
  "🌨️", "☃️", "⛄", "❄️", "🌬️", "💨", "💧", "💦", "☔", "☂️", "🌊", "🌫️", "🍏", "🍎", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓", "🍈", "🍒", "🍑", "🥭", "🍍",
  
  // 更多符号和装饰
  "💎", "🔮", "🎁", "🎀", "🎈", "🎉", "🎊", "🎋", "🎍", "🎎", "🎏", "🎐", "🎃", "👻", "🎅", "🎄", "🎆", "🎇", "🧨", "✨", "🎈", "🎉", "🎊", "🎋", "🎍", "🎎",
  "🏆", "🥇", "🥈", "🥉", "🏅", "🎖️", "🏵️", "🎗️", "🎟️", "🎫", "🎪", "🎭", "🎨", "🎬", "🎤", "🎧", "🎼", "🎹", "🥁", "🎷", "🎺", "🎸", "🪕", "🎻", "🎲", "♟️",
  "🎯", "🎳", "🎮", "🎰", "🧩", "🎨", "📱", "📲", "💻", "⌨️", "🖥️", "🖨️", "🖱️", "🖲️", "🕹️", "🎮", "🎰", "🎲", "🧩", "🎨", "🎭", "🎪", "🎟️", "🎫", "🎖️", "🏆"
]

// 表情符号选择器组件
interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void
  isOpen: boolean
  onClose: () => void
}

const EmojiPicker = ({ onEmojiSelect, isOpen, onClose }: EmojiPickerProps) => {
  if (!isOpen) return null
  
  return (
    <>
      {/* 背景遮罩，点击关闭弹窗 */}
      <div 
        className="fixed inset-0 z-40 bg-black bg-opacity-20"
        onClick={onClose}
      />
      
      {/* 弹窗内容 */}
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 z-50 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden min-w-[400px]">
        {/* Emoji网格区域 - 可滚动 */}
        <div className="h-64 overflow-y-auto p-4">
          <div className="grid grid-cols-8 gap-3">
            {allEmojis.map((emoji, index) => (
              <button
                key={`${emoji}-${index}`}
                onClick={() => {
                  onEmojiSelect(emoji)
                  onClose()
                }}
                className="w-10 h-10 flex items-center justify-center text-xl hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-110"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default function EmojiText({ onBack }: EmojiTextProps) {
  const { t } = useLanguage()
  const [inputText, setInputText] = useState("I Love U ❤️")
  const [foregroundEmoji, setForegroundEmoji] = useState("❤️")
  const [backgroundEmoji, setBackgroundEmoji] = useState("⬜")
  const [direction, setDirection] = useState<DirectionType>("vertical")
  const [result, setResult] = useState("")
  const [copySuccess, setCopySuccess] = useState(false)
  const [foregroundPickerOpen, setForegroundPickerOpen] = useState(false)
  const [backgroundPickerOpen, setBackgroundPickerOpen] = useState(false)

  // 使用ref直接操作DOM
  const foregroundInputRef = useRef<HTMLInputElement>(null)
  const backgroundInputRef = useRef<HTMLInputElement>(null)

  // 简化的emoji输入处理
  const handleEmojiInputChange = (value: string, setter: (value: string) => void) => {
    setter(value)
  }

  const generateEmojiText = useCallback(() => {
    if (!inputText.trim() || !foregroundEmoji.trim() || !backgroundEmoji.trim()) return

    const chars = Array.from(inputText.trim())
    if (chars.length === 0) return

    if (direction === "vertical") {
      // 垂直堆叠：每个字符转换为独立的表情符号艺术字块，然后垂直排列
      const characterBlocks: string[] = []
      
      chars.forEach((char) => {
        const upperChar = char.toUpperCase()
        const pattern = letterPatterns[upperChar] || letterPatterns[char]
        
        if (pattern) {
          const charMatrix: string[] = []
          for (let row = 0; row < 7; row++) {
            let rowStr = ""
            for (let col = 0; col < 5; col++) {
              rowStr += pattern[row][col] === 1 ? foregroundEmoji : backgroundEmoji
            }
            charMatrix.push(rowStr)
          }
          characterBlocks.push(charMatrix.join("\n"))
        } else {
          // 如果没有对应的图案，创建一个空白块
          const emptyBlock = Array(7).fill("").map(() => backgroundEmoji.repeat(5)).join("\n")
          characterBlocks.push(emptyBlock)
        }
      })
      
      // 用空行分隔字符块
      setResult(characterBlocks.join("\n\n"))
    } else {
      // 横向生成：原有逻辑，所有字符水平排列
      const resultMatrix: string[][] = []
      
      // 初始化7行
      for (let row = 0; row < 7; row++) {
        resultMatrix[row] = []
      }
      
      chars.forEach((char, charIndex) => {
        const upperChar = char.toUpperCase()
        const pattern = letterPatterns[upperChar] || letterPatterns[char]
        
        if (pattern) {
          for (let row = 0; row < 7; row++) {
            for (let col = 0; col < 5; col++) {
              const emoji = pattern[row][col] === 1 ? foregroundEmoji : backgroundEmoji
              resultMatrix[row].push(emoji)
            }
            // 在字符之间添加一列背景表情符号作为间距
            if (charIndex < chars.length - 1) {
              resultMatrix[row].push(backgroundEmoji)
            }
          }
        }
      })
      
      setResult(resultMatrix.map((row) => row.join("")).join("\n"))
    }
  }, [inputText, foregroundEmoji, backgroundEmoji, direction])

  const copyToClipboard = useCallback(async () => {
    if (!result) return

    try {
      await navigator.clipboard.writeText(result)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (err) {
      console.error("Copy failed:", err)
    }
  }, [result])
  
  // 表情符号选择处理
  const handleEmojiSelect = useCallback((emoji: string) => {
    if (foregroundPickerOpen) {
      if (!foregroundEmoji.trim()) {
        setForegroundEmoji(emoji)
      } else if (!backgroundEmoji.trim()) {
        setBackgroundEmoji(emoji)
      } else {
        setForegroundEmoji(emoji)
      }
    } else if (backgroundPickerOpen) {
      if (!backgroundEmoji.trim()) {
        setBackgroundEmoji(emoji)
      } else if (!foregroundEmoji.trim()) {
        setForegroundEmoji(emoji)
      } else {
        setBackgroundEmoji(emoji)
      }
    }
  }, [foregroundPickerOpen, backgroundPickerOpen, foregroundEmoji, backgroundEmoji])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8 max-w-7xl">
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
            <h1 className="text-3xl font-bold text-blue-600 mb-1">{t("emoji-text.pageTitle")}</h1>
            <p className="text-gray-600 text-sm">{t("emoji-text.pageDescription")}</p>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Input */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <Card className="border border-gray-200 shadow-sm bg-white">
              <CardContent className="p-6 space-y-6">
                {/* Input Text */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700">{t("emoji-text.inputLabel")}</label>
                  <Input
                    placeholder={t("emoji-text.inputPlaceholder")}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="text-lg py-3 bg-white border-gray-300 rounded-xl text-gray-900 transition-shadow duration-200 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                  />
                  <p className="text-xs text-gray-500">{t("emoji-text.inputHelp")}</p>
                </div>

                {/* Emoji Inputs */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3 relative">
                    <label className="text-sm font-medium text-gray-700">{t("emoji-text.foregroundLabel")}</label>
                    <div className="relative">
                      <Input
                        placeholder="❤️"
                        value={foregroundEmoji}
                        onChange={(e) => handleEmojiInputChange(e.target.value, setForegroundEmoji)}
                        ref={foregroundInputRef}
                        className="text-center text-2xl py-3 pr-10 bg-white border-gray-300 rounded-xl text-gray-900 transition-shadow duration-200 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                      />
                      <button
                        onClick={() => {
                          setForegroundPickerOpen(!foregroundPickerOpen)
                          setBackgroundPickerOpen(false)
                        }}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded"
                      >
                        <Smile className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 text-center">{t("emoji-text.foregroundHelp")}</p>
                    <EmojiPicker
                      onEmojiSelect={handleEmojiSelect}
                      isOpen={foregroundPickerOpen}
                      onClose={() => setForegroundPickerOpen(false)}
                    />
                  </div>

                  <div className="space-y-3 relative">
                    <label className="text-sm font-medium text-gray-700">{t("emoji-text.backgroundLabel")}</label>
                    <div className="relative">
                      <Input
                        placeholder="⬜"
                        value={backgroundEmoji}
                        onChange={(e) => handleEmojiInputChange(e.target.value, setBackgroundEmoji)}
                        ref={backgroundInputRef}
                        className="text-center text-2xl py-3 pr-10 bg-white border-gray-300 rounded-xl text-gray-900 transition-shadow duration-200 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                      />
                      <button
                        onClick={() => {
                          setBackgroundPickerOpen(!backgroundPickerOpen)
                          setForegroundPickerOpen(false)
                        }}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded"
                      >
                        <Smile className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 text-center">{t("emoji-text.backgroundHelp")}</p>
                    <EmojiPicker
                      onEmojiSelect={handleEmojiSelect}
                      isOpen={backgroundPickerOpen}
                      onClose={() => setBackgroundPickerOpen(false)}
                    />
                  </div>
                </div>

                {/* Direction Selection */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700">{t("emoji-text.directionLabel")}</label>
                  <Select value={direction} onValueChange={(value: DirectionType) => setDirection(value)}>
                    <SelectTrigger className="bg-white border-gray-300 rounded-xl text-gray-900 transition-shadow duration-200 focus:ring-2 focus:ring-blue-300 focus:outline-none">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vertical">{t("emoji-text.direction.vertical")}</SelectItem>
                      <SelectItem value="horizontal">{t("emoji-text.direction.horizontal")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Generate Button */}
                <Button
                  onClick={generateEmojiText}
                  disabled={!inputText.trim() || !foregroundEmoji.trim() || !backgroundEmoji.trim()}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  {t("emoji-text.generateButton")}
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Panel - Result */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <Card className="border border-gray-200 shadow-sm bg-white h-full">
              <CardContent className="p-6 h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <label className="text-sm font-medium text-gray-700">{t("emoji-text.resultLabel")}</label>
                  {result && (
                    <Button
                      size="sm"
                      onClick={copyToClipboard}
                      className={`bg-blue-600 hover:bg-blue-700 text-white ${
                        copySuccess ? "bg-green-600 hover:bg-green-700" : ""
                      }`}
                    >
                      {copySuccess ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                      {copySuccess ? t("emoji-text.copiedButton") : t("emoji-text.copyButton")}
                    </Button>
                  )}
                </div>

                <div className="flex-1 min-h-[400px]">
                  <AnimatePresence mode="wait">
                    {result ? (
                      <motion.div
                        key="result"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="h-full bg-gray-50 rounded-lg p-4 border border-gray-200 overflow-auto"
                      >
                        <pre className="text-gray-800 whitespace-pre font-mono leading-tight text-sm">{result}</pre>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="placeholder"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="h-full flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg bg-gray-50"
                      >
                        <div className="text-center text-gray-400">
                          <Heart className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                          <p className="text-lg font-medium mb-2">{t("emoji-text.placeholder.result")}</p>
                          <p className="text-sm">{t("emoji-text.placeholder.waiting")}</p>
                          <div className="mt-4 text-xs text-gray-500">
                            <p>{t("emoji-text.placeholder.example")}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
