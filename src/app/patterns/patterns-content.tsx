"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { CopyIcon, CheckIcon, SearchIcon, PaletteIcon, FilterIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export default function PatternsContentWithParams() {
  const [copied, setCopied] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [filter, setFilter] = useState<string>("all")

  // Récupérer la couleur depuis l'URL si présente
  const searchParams = useSearchParams()
  useEffect(() => {
    const color = searchParams.get("color")
    if (color) {
      setSelectedColor(`#${color.replace(/^#/, '')}`)
    }
  }, [searchParams])

  // Base de données complète des couleurs Tailwind CSS
  const TAILWIND_COLORS = {
    slate: {
      50: '#f8fafc', 100: '#f1f5f9', 200: '#e2e8f0', 300: '#cbd5e1', 400: '#94a3b8',
      500: '#64748b', 600: '#475569', 700: '#334155', 800: '#1e293b', 900: '#0f172a',
      950: '#020617'
    },
    gray: {
      50: '#f9fafb', 100: '#f3f4f6', 200: '#e5e7eb', 300: '#d1d5db', 400: '#9ca3af',
      500: '#6b7280', 600: '#4b5563', 700: '#374151', 800: '#1f2937', 900: '#111827',
      950: '#030712'
    },
    zinc: {
      50: '#fafafa', 100: '#f4f4f5', 200: '#e4e4e7', 300: '#d4d4d8', 400: '#a1a1aa',
      500: '#71717a', 600: '#52525b', 700: '#3f3f46', 800: '#27272a', 900: '#18181b',
      950: '#09090b'
    },
    neutral: {
      50: '#fafafa', 100: '#f5f5f5', 200: '#e5e5e5', 300: '#d4d4d4', 400: '#a3a3a3',
      500: '#737373', 600: '#525252', 700: '#404040', 800: '#262626', 900: '#171717',
      950: '#0a0a0a'
    },
    stone: {
      50: '#fafaf9', 100: '#f5f5f4', 200: '#e7e5e4', 300: '#d6d3d1', 400: '#a8a29e',
      500: '#78716c', 600: '#57534e', 700: '#44403c', 800: '#292524', 900: '#1c1917',
      950: '#0c0a09'
    },
    red: {
      50: '#fef2f2', 100: '#fee2e2', 200: '#fecaca', 300: '#fca5a5', 400: '#f87171',
      500: '#ef4444', 600: '#dc2626', 700: '#b91c1c', 800: '#991b1b', 900: '#7f1d1d',
      950: '#450a0a'
    },
    orange: {
      50: '#fff7ed', 100: '#ffedd5', 200: '#fed7aa', 300: '#fdba74', 400: '#fb923c',
      500: '#f97316', 600: '#ea580c', 700: '#c2410c', 800: '#9a3412', 900: '#7c2d12',
      950: '#431407'
    },
    amber: {
      50: '#fffbeb', 100: '#fef3c7', 200: '#fde68a', 300: '#fcd34d', 400: '#fbbf24',
      500: '#f59e0b', 600: '#d97706', 700: '#b45309', 800: '#92400e', 900: '#78350f',
      950: '#451a03'
    },
    yellow: {
      50: '#fefce8', 100: '#fef9c3', 200: '#fef08a', 300: '#fde047', 400: '#facc15',
      500: '#eab308', 600: '#ca8a04', 700: '#a16207', 800: '#854d0e', 900: '#713f12',
      950: '#422006'
    },
    lime: {
      50: '#f7fee7', 100: '#ecfccb', 200: '#d9f99d', 300: '#bef264', 400: '#a3e635',
      500: '#84cc16', 600: '#65a30d', 700: '#4d7c0f', 800: '#3f6212', 900: '#365314',
      950: '#1a2e05'
    },
    green: {
      50: '#f0fdf4', 100: '#dcfce7', 200: '#bbf7d0', 300: '#86efac', 400: '#4ade80',
      500: '#22c55e', 600: '#16a34a', 700: '#15803d', 800: '#166534', 900: '#14532d',
      950: '#052e16'
    },
    emerald: {
      50: '#ecfdf5', 100: '#d1fae5', 200: '#a7f3d0', 300: '#6ee7b7', 400: '#34d399',
      500: '#10b981', 600: '#059669', 700: '#047857', 800: '#065f46', 900: '#064e3b',
      950: '#022c22'
    },
    teal: {
      50: '#f0fdfa', 100: '#ccfbf1', 200: '#99f6e4', 300: '#5eead4', 400: '#2dd4bf',
      500: '#14b8a6', 600: '#0d9488', 700: '#0f766e', 800: '#115e59', 900: '#134e4a',
      950: '#042f2e'
    },
    cyan: {
      50: '#ecfeff', 100: '#cffafe', 200: '#a5f3fc', 300: '#67e8f9', 400: '#22d3ee',
      500: '#06b6d4', 600: '#0891b2', 700: '#0e7490', 800: '#155e75', 900: '#164e63',
      950: '#083344'
    },
    sky: {
      50: '#f0f9ff', 100: '#e0f2fe', 200: '#bae6fd', 300: '#7dd3fc', 400: '#38bdf8',
      500: '#0ea5e9', 600: '#0284c7', 700: '#0369a1', 800: '#075985', 900: '#0c4a6e',
      950: '#082f49'
    },
    blue: {
      50: '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe', 300: '#93c5fd', 400: '#60a5fa',
      500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8', 800: '#1e40af', 900: '#1e3a8a',
      950: '#172554'
    },
    indigo: {
      50: '#eef2ff', 100: '#e0e7ff', 200: '#c7d2fe', 300: '#a5b4fc', 400: '#818cf8',
      500: '#6366f1', 600: '#4f46e5', 700: '#4338ca', 800: '#3730a3', 900: '#312e81',
      950: '#1e1b4b'
    },
    violet: {
      50: '#f5f3ff', 100: '#ede9fe', 200: '#ddd6fe', 300: '#c4b5fd', 400: '#a78bfa',
      500: '#8b5cf6', 600: '#7c3aed', 700: '#6d28d9', 800: '#5b21b6', 900: '#4c1d95',
      950: '#2e1065'
    },
    purple: {
      50: '#faf5ff', 100: '#f3e8ff', 200: '#e9d5ff', 300: '#d8b4fe', 400: '#c084fc',
      500: '#a855f7', 600: '#9333ea', 700: '#7e22ce', 800: '#6b21a8', 900: '#581c87',
      950: '#3b0764'
    },
    fuchsia: {
      50: '#fdf4ff', 100: '#fae8ff', 200: '#f5d0fe', 300: '#f0abfc', 400: '#e879f9',
      500: '#d946ef', 600: '#c026d3', 700: '#a21caf', 800: '#86198f', 900: '#701a75',
      950: '#4a044e'
    },
    pink: {
      50: '#fdf2f8', 100: '#fce7f3', 200: '#fbcfe8', 300: '#f9a8d4', 400: '#f472b6',
      500: '#ec4899', 600: '#db2777', 700: '#be185d', 800: '#9d174d', 900: '#831843',
      950: '#500724'
    },
    rose: {
      50: '#fff1f2', 100: '#ffe4e6', 200: '#fecdd3', 300: '#fda4af', 400: '#fb7185',
      500: '#f43f5e', 600: '#e11d48', 700: '#be123c', 800: '#9f1239', 900: '#881337',
      950: '#4c0519'
    }
  }

  // Filtrer les couleurs selon la recherche et le filtre
  const filteredColors = Object.entries(TAILWIND_COLORS).filter(([colorName]) => {
    const matchesSearch = colorName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filter === "all" ||
      (filter === "grayscale" && ["slate", "gray", "zinc", "neutral", "stone"].includes(colorName)) ||
      (filter === "colors" && !["slate", "gray", "zinc", "neutral", "stone"].includes(colorName))

    return matchesSearch && matchesFilter
  })

  // Fonction pour copier dans le presse-papiers
  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  // Fonction pour obtenir le contraste du texte
  const getTextColor = (hexColor: string) => {
    const hex = hexColor.replace('#', '')
    const r = parseInt(hex.substr(0, 2), 16)
    const g = parseInt(hex.substr(2, 2), 16)
    const b = parseInt(hex.substr(4, 2), 16)
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
    return luminance > 0.5 ? '#000000' : '#ffffff'
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* En-tête */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Palette Tailwind CSS</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explorez toute la palette de couleurs Tailwind CSS. Cliquez sur une couleur pour copier sa valeur ou sa classe.
          </p>
          {selectedColor && (
            <div className="flex items-center justify-center gap-2 mt-4">
              <div
                className="w-6 h-6 rounded border"
                style={{ backgroundColor: selectedColor }}
              />
              <span className="text-sm text-muted-foreground">
                Couleur sélectionnée : {selectedColor}
              </span>
            </div>
          )}
        </div>

        {/* Contrôles */}
        <Card>
          <CardHeader>
            <CardTitle>Filtres et recherche</CardTitle>
            <CardDescription>Trouvez rapidement les couleurs que vous cherchez</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Recherche */}
              <div>
                <Label htmlFor="search">Rechercher une couleur</Label>
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Ex: blue, red, emerald..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Filtres */}
              <div>
                <Label>Catégorie</Label>
                <div className="flex gap-2 mt-2">
                  <Button
                    variant={filter === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter("all")}
                  >
                    Toutes
                  </Button>
                  <Button
                    variant={filter === "grayscale" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter("grayscale")}
                  >
                    Nuances de gris
                  </Button>
                  <Button
                    variant={filter === "colors" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter("colors")}
                  >
                    Couleurs
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Grille de couleurs */}
        <div className="space-y-8">
          {filteredColors.map(([colorName, shades]) => (
            <Card key={colorName}>
              <CardHeader className="pb-4">
                <CardTitle className="capitalize text-xl">{colorName}</CardTitle>
                <CardDescription>
                  {Object.keys(shades).length} nuances disponibles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-2">
                  {Object.entries(shades).map(([shade, hexValue]) => {
                    const colorKey = `${colorName}-${shade}`
                    const isSelected = selectedColor === hexValue

                    return (
                      <div
                        key={shade}
                        className={cn(
                          "group relative aspect-square rounded-lg border-2 cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg",
                          isSelected ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-200 hover:border-gray-300"
                        )}
                        style={{ backgroundColor: hexValue }}
                        onClick={() => setSelectedColor(hexValue)}
                        title={`${colorName}-${shade}: ${hexValue}`}
                      >
                        {/* Overlay avec informations */}
                        <div className={cn(
                          "absolute inset-0 rounded-lg bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center"
                        )}>
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-center">
                            <div
                              className="text-xs font-medium mb-1"
                              style={{ color: getTextColor(hexValue) }}
                            >
                              {shade}
                            </div>
                          </div>
                        </div>

                        {/* Menu contextuel au survol */}
                        <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <div className="flex gap-1">
                            <Button
                              size="icon"
                              variant="secondary"
                              className="h-6 w-6 rounded-full shadow-md"
                              onClick={(e) => {
                                e.stopPropagation()
                                copyToClipboard(hexValue, `hex-${colorKey}`)
                              }}
                              title="Copier la valeur HEX"
                            >
                              {copied === `hex-${colorKey}` ? (
                                <CheckIcon className="h-3 w-3 text-green-600" />
                              ) : (
                                <CopyIcon className="h-3 w-3" />
                              )}
                            </Button>
                            <Button
                              size="icon"
                              variant="secondary"
                              className="h-6 w-6 rounded-full shadow-md"
                              onClick={(e) => {
                                e.stopPropagation()
                                copyToClipboard(`bg-${colorKey}`, `class-${colorKey}`)
                              }}
                              title="Copier la classe Tailwind"
                            >
                              {copied === `class-${colorKey}` ? (
                                <CheckIcon className="h-3 w-3 text-green-600" />
                              ) : (
                                <PaletteIcon className="h-3 w-3" />
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Informations sur la couleur sélectionnée */}
                {selectedColor && Object.values(shades).includes(selectedColor) && (
                  <div className="mt-4 p-4 bg-muted rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <strong>Couleur:</strong> {colorName}
                      </div>
                      <div>
                        <strong>Nuance:</strong> {Object.entries(shades).find(([, hex]) => hex === selectedColor)?.[0]}
                      </div>
                      <div>
                        <strong>HEX:</strong> {selectedColor}
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(selectedColor, 'selected-hex')}
                      >
                        {copied === 'selected-hex' ? <CheckIcon className="h-4 w-4 mr-2" /> : <CopyIcon className="h-4 w-4 mr-2" />}
                        Copier HEX
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const shade = Object.entries(shades).find(([, hex]) => hex === selectedColor)?.[0]
                          copyToClipboard(`bg-${colorName}-${shade}`, 'selected-class')
                        }}
                      >
                        {copied === 'selected-class' ? <CheckIcon className="h-4 w-4 mr-2" /> : <PaletteIcon className="h-4 w-4 mr-2" />}
                        Copier classe Tailwind
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.location.href = `/converter?color=${selectedColor.replace('#', '')}`}
                      >
                        Ouvrir dans le convertisseur
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Message si aucune couleur trouvée */}
        {filteredColors.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <FilterIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Aucune couleur trouvée</h3>
              <p className="text-muted-foreground">
                Essayez de modifier votre recherche ou vos filtres.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
