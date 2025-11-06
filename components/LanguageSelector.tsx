"use client"

import { useState, useRef, useEffect } from "react"
import { Globe } from "lucide-react"

interface LanguageSelectorProps {
  language: string
  onChange: (lang: string) => void
}

export default function LanguageSelector({ language, onChange }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const langRef = useRef<HTMLDivElement>(null)

  const languages = [
    { code: "en", label: "🇺🇸 English" },
    { code: "fr", label: "🇫🇷 Français" },
    { code: "es", label: "🇪🇸 Español" },
  ]

  const handleLanguageChange = (lang: string) => {
    onChange(lang)
    setIsOpen(false)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={langRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-gray-700 hover:text-pink-500 transition"
      >
        <Globe size={18} />
        <span className="font-medium">
          {languages.find((l) => l.code === language)?.label}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-36 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden animate-fade-in">
          {languages.map((l) => (
            <button
              key={l.code}
              onClick={() => handleLanguageChange(l.code)}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gradient-to-r hover:from-yellow-50 hover:to-pink-50 transition ${
                language === l.code ? "bg-gray-50 font-semibold" : ""
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
