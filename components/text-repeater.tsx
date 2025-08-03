"use client"

import { useState, useCallback, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Zap, Copy, Check } from "lucide-react"
import { useLanguage } from "./language-provider"

interface TextRepeaterProps {
  onBack: () => void
}

type FormatType = "newline" | "comma" | "space" | "none"

export default function TextRepeater({ onBack }: TextRepeaterProps) {
  const { t } = useLanguage()
  
  const formatOptions = [
    { value: "newline", label: t("text-repeater.format.newline") },
    { value: "comma", label: t("text-repeater.format.comma") },
    { value: "space", label: t("text-repeater.format.space") },
    { value: "none", label: t("text-repeater.format.none") },
  ]
  const [inputText, setInputText] = useState("I Love U ❤️")
  const [repeatCount, setRepeatCount] = useState<number>(10)
  const [customCount, setCustomCount] = useState("")
  const [format, setFormat] = useState<FormatType>("newline")
  const [result, setResult] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)
  const [error, setError] = useState("")

  const charCount = inputText.length
  const presetCounts = [10, 100, 1000, 10000]

  const validateCount = useCallback((count: number) => {
    if (count < 1 || count > 100000 || !Number.isInteger(count)) {
      setError(t("text-repeater.error.range"))
      return false
    }
    setError("")
    return true
  }, [t])

  const handlePresetCount = useCallback(
    (count: number) => {
      setRepeatCount(count)
      setCustomCount("")
      validateCount(count)
    },
    [validateCount],
  )

  const handleCustomCountChange = useCallback(
    (value: string) => {
      setCustomCount(value)
      const num = Number.parseInt(value)
      if (value && !isNaN(num)) {
        if (validateCount(num)) {
          setRepeatCount(num)
        }
      }
    },
    [validateCount],
  )

  const generateText = useCallback(async () => {
    if (!inputText.trim()) return
    if (!validateCount(repeatCount)) return

    setIsGenerating(true)
    await new Promise((resolve) => setTimeout(resolve, 200))

    try {
      const repeated = Array(repeatCount).fill(inputText.trim())
      let output = ""

      switch (format) {
        case "comma":
          output = repeated.join(", ")
          break
        case "space":
          output = repeated.join(" ")
          break
        case "none":
          output = repeated.join("")
          break
        default:
          output = repeated.join("\n")
      }

      setResult(output)
    } catch (err) {
      console.error("Generation failed:", err)
    } finally {
      setIsGenerating(false)
    }
  }, [inputText, repeatCount, format, validateCount])

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


  const canGenerate = useMemo(
    () => inputText.trim() && repeatCount >= 1 && repeatCount <= 100000 && !error,
    [inputText, repeatCount, error],
  )

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
            <h1 className="text-3xl font-bold text-blue-600 mb-1">{t("text-repeater.pageTitle")}</h1>
            <p className="text-gray-600 text-sm">{t("text-repeater.pageDescription")}</p>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Input */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <Card className="border border-gray-200 shadow-sm bg-white">
              <CardContent className="p-6 space-y-6">
                {/* Input Text */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700">{t("text-repeater.inputLabel")}</label>
                  <div className="relative">
                    <Textarea
                      placeholder={t("text-repeater.inputPlaceholder")}
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      className="min-h-[120px] resize-none border-gray-300 rounded-xl bg-white text-gray-900 transition-shadow duration-200 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                    />
                    <div className="absolute bottom-3 right-3 text-xs text-gray-400">{charCount} {t("common.characters")}</div>
                  </div>
                </div>

                {/* Repeat Count */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700">{t("text-repeater.countLabel")}</label>
                  <div className="grid grid-cols-4 gap-2">
                    {presetCounts.map((count) => (
                      <Button
                        key={count}
                        variant={repeatCount === count ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePresetCount(count)}
                        className={
                          repeatCount === count
                            ? "bg-blue-600 hover:bg-blue-700 text-white"
                            : "border-gray-200 hover:bg-gray-50 bg-white text-gray-700"
                        }
                      >
                        ×{count}
                      </Button>
                    ))}
                  </div>
                  <Input
                    type="number"
                    placeholder={t("text-repeater.customPlaceholder")}
                    value={customCount}
                    onChange={(e) => handleCustomCountChange(e.target.value)}
                    min={1}
                    max={100000}
                    className={`border-gray-300 rounded-xl bg-white text-gray-900 transition-shadow duration-200 focus:ring-2 focus:ring-blue-300 focus:outline-none ${
                      error ? "border-red-300 focus:ring-red-300" : ""
                    }`}
                  />
                  <AnimatePresence>
                    {error && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-sm text-red-600"
                      >
                        {error}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Output Format */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700">{t("text-repeater.formatLabel")}</label>
                  <Select value={format} onValueChange={(value: FormatType) => setFormat(value)}>
                    <SelectTrigger className="border-gray-300 rounded-xl bg-white text-gray-900 transition-shadow duration-200 focus:ring-2 focus:ring-blue-300 focus:outline-none">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {formatOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Action Button */}
                <div className="pt-2">
                  <Button
                    onClick={generateText}
                    disabled={!canGenerate || isGenerating}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    {isGenerating ? t("text-repeater.generatingButton") : t("text-repeater.generateButton")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Panel - Result */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <Card className="border border-gray-200 shadow-sm bg-white h-full">
              <CardContent className="p-6 h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <label className="text-sm font-medium text-gray-700">{t("text-repeater.resultLabel")}</label>
                  {result && (
                    <Button
                      size="sm"
                      onClick={copyToClipboard}
                      className={`bg-blue-600 hover:bg-blue-700 text-white ${
                        copySuccess ? "bg-green-600 hover:bg-green-700" : ""
                      }`}
                    >
                      {copySuccess ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                      {copySuccess ? t("text-repeater.copiedButton") : t("text-repeater.copyButton")}
                    </Button>
                  )}
                </div>

                <div className="flex-1 min-h-[400px]">
                  <AnimatePresence mode="wait">
                    {result ? (
                      <motion.div
                        key="result"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="h-full"
                      >
                        <Textarea
                          value={result}
                          readOnly
                          className="h-full resize-none border-gray-200 bg-gray-50 font-mono text-sm text-gray-900"
                        />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="placeholder"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="h-full flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg bg-gray-50"
                      >
                        <div className="text-center text-gray-400">
                          <Zap className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                          <p className="text-lg font-medium mb-2">{t("text-repeater.placeholder.result")}</p>
                          <p className="text-sm">{t("text-repeater.placeholder.waiting")}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12 text-gray-500 text-sm"
        >
          {t("text-repeater.footerText")}
        </motion.div>
      </div>
    </div>
  )
}
