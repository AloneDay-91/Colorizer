"use client"

import { Suspense } from "react"
import { useState, useEffect, useCallback, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { CopyIcon, CheckIcon, ArrowRightIcon, PaletteIcon, RefreshCwIcon, LinkIcon } from "lucide-react"
import { cn } from "@/lib/utils"

type ColorValue = string | { r: number; g: number; b: number } | { h: number; s: number; l: number } | { c: number; m: number; y: number; k: number }

export default function ConverterPage() {
  return (
    <Suspense fallback={<ConverterLoading />}>
      <ConverterContent />
    </Suspense>
  )
}

// Composant de fallback pour le loading
function ConverterLoading() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-4xl font-bold tracking-tight">Convertisseur de couleurs</h1>
          <p className="text-muted-foreground">Chargement...</p>
        </div>
      </div>
    </div>
  )
}

// Composant principal qui utilise useSearchParams
function ConverterContent() {
  // États pour les différents formats de couleur
  const [hex, setHex] = useState("#10b981") // Emerald par défaut
  const [rgb, setRgb] = useState({ r: 16, g: 185, b: 129 })
  const [hsl, setHsl] = useState({ h: 152, s: 84, l: 39 })
  const [cmyk, setCmyk] = useState({ c: 91, m: 0, y: 30, k: 27 })
  const [copied, setCopied] = useState<string | null>(null)
  const [history, setHistory] = useState<string[]>([])
  const [activeInput, setActiveInput] = useState("hex")
  const [error, setError] = useState<string | null>(null)

  // Trouver la couleur Tailwind la plus proche
  const [closestTailwind, setClosestTailwind] = useState<{name: string, value: string}>({ name: "emerald-500", value: "#10b981" })

  // Fonctions de conversion entre formats
  function hexToRgb(hex: string) {
    hex = hex.replace('#', '')
    const r = parseInt(hex.substring(0, 2), 16)
    const g = parseInt(hex.substring(2, 4), 16)
    const b = parseInt(hex.substring(4, 6), 16)
    return { r, g, b }
  }

  function rgbToHex(r: number, g: number, b: number) {
    return '#' + [r, g, b]
      .map(x => {
        const hex = Math.round(x).toString(16)
        return hex.length === 1 ? '0' + hex : hex
      })
      .join('')
  }

  function rgbToHsl(r: number, g: number, b: number) {
    r /= 255
    g /= 255
    b /= 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0, s = 0
    const l = (max + min) / 2

    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break
        case g: h = (b - r) / d + 2; break
        case b: h = (r - g) / d + 4; break
      }

      h /= 6
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    }
  }

  function hslToRgb(h: number, s: number, l: number) {
    h /= 360
    s /= 100
    l /= 100

    let r, g, b

    if (s === 0) {
      r = g = b = l
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1
        if (t > 1) t -= 1
        if (t < 1/6) return p + (q - p) * 6 * t
        if (t < 1/2) return q
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
        return p
      }

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s
      const p = 2 * l - q
      r = hue2rgb(p, q, h + 1/3)
      g = hue2rgb(p, q, h)
      b = hue2rgb(p, q, h - 1/3)
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255)
    }
  }

  function rgbToCmyk(r: number, g: number, b: number) {
    r = r / 255
    g = g / 255
    b = b / 255

    const k = 1 - Math.max(r, g, b)
    const c = k === 1 ? 0 : (1 - r - k) / (1 - k)
    const m = k === 1 ? 0 : (1 - g - k) / (1 - k)
    const y = k === 1 ? 0 : (1 - b - k) / (1 - k)

    return {
      c: Math.round(c * 100),
      m: Math.round(m * 100),
      y: Math.round(y * 100),
      k: Math.round(k * 100)
    }
  }

  function cmykToRgb(c: number, m: number, y: number, k: number) {
    c = c / 100
    m = m / 100
    y = y / 100
    k = k / 100

    const r = 255 * (1 - c) * (1 - k)
    const g = 255 * (1 - m) * (1 - k)
    const b = 255 * (1 - y) * (1 - k)

    return {
      r: Math.round(r),
      g: Math.round(g),
      b: Math.round(b)
    }
  }

  // Tailwind colors database
  const TAILWIND_COLORS = useMemo(() => ({
    slate: {
      50: '#f8fafc', 100: '#f1f5f9', 200: '#e2e8f0', 300: '#cbd5e1', 400: '#94a3b8',
      500: '#64748b', 600: '#475569', 700: '#334155', 800: '#1e293b', 900: '#0f172a', 950: '#020617'
    },
    gray: {
      50: '#f9fafb', 100: '#f3f4f6', 200: '#e5e7eb', 300: '#d1d5db', 400: '#9ca3af',
      500: '#6b7280', 600: '#4b5563', 700: '#374151', 800: '#1f2937', 900: '#111827', 950: '#030712'
    },
    zinc: {
      50: '#fafafa', 100: '#f4f4f5', 200: '#e4e4e7', 300: '#d4d4d8', 400: '#a1a1aa',
      500: '#71717a', 600: '#52525b', 700: '#3f3f46', 800: '#27272a', 900: '#18181b'
    },
    red: {
      50: '#fef2f2', 100: '#fee2e2', 200: '#fecaca', 300: '#fca5a5', 400: '#f87171',
      500: '#ef4444', 600: '#dc2626', 700: '#b91c1c', 800: '#991b1b', 900: '#7f1d1d'
    },
    orange: {
      50: '#fff7ed', 100: '#ffedd5', 200: '#fed7aa', 300: '#fdba74', 400: '#fb923c',
      500: '#f97316', 600: '#ea580c', 700: '#c2410c', 800: '#9a3412', 900: '#7c2d12'
    },
    amber: {
      50: '#fffbeb', 100: '#fef3c7', 200: '#fde68a', 300: '#fcd34d', 400: '#fbbf24',
      500: '#f59e0b', 600: '#d97706', 700: '#b45309', 800: '#92400e', 900: '#78350f'
    },
    yellow: {
      50: '#fefce8', 100: '#fef9c3', 200: '#fef08a', 300: '#fde047', 400: '#facc15',
      500: '#eab308', 600: '#ca8a04', 700: '#a16207', 800: '#854d0e', 900: '#713f12'
    },
    lime: {
      50: '#f7fee7', 100: '#ecfccb', 200: '#d9f99d', 300: '#bef264', 400: '#a3e635',
      500: '#84cc16', 600: '#65a30d', 700: '#4d7c0f', 800: '#3f6212', 900: '#365314'
    },
    green: {
      50: '#f0fdf4', 100: '#dcfce7', 200: '#bbf7d0', 300: '#86efac', 400: '#4ade80',
      500: '#22c55e', 600: '#16a34a', 700: '#15803d', 800: '#166534', 900: '#14532d'
    },
    emerald: {
      50: '#ecfdf5', 100: '#d1fae5', 200: '#a7f3d0', 300: '#6ee7b7', 400: '#34d399',
      500: '#10b981', 600: '#059669', 700: '#047857', 800: '#065f46', 900: '#064e3b'
    },
    teal: {
      50: '#f0fdfa', 100: '#ccfbf1', 200: '#99f6e4', 300: '#5eead4', 400: '#2dd4bf',
      500: '#14b8a6', 600: '#0d9488', 700: '#0f766e', 800: '#115e59', 900: '#134e4a'
    },
    cyan: {
      50: '#ecfeff', 100: '#cffafe', 200: '#a5f3fc', 300: '#67e8f9', 400: '#22d3ee',
      500: '#06b6d4', 600: '#0891b2', 700: '#0e7490', 800: '#155e75', 900: '#164e63'
    },
    blue: {
      50: '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe', 300: '#93c5fd', 400: '#60a5fa',
      500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8', 800: '#1e40af', 900: '#1e3a8a'
    },
    indigo: {
      50: '#eef2ff', 100: '#e0e7ff', 200: '#c7d2fe', 300: '#a5b4fc', 400: '#818cf8',
      500: '#6366f1', 600: '#4f46e5', 700: '#4338ca', 800: '#3730a3', 900: '#312e81'
    },
    violet: {
      50: '#f5f3ff', 100: '#ede9fe', 200: '#ddd6fe', 300: '#c4b5fd', 400: '#a78bfa',
      500: '#8b5cf6', 600: '#7c3aed', 700: '#6d28d9', 800: '#5b21b6', 900: '#4c1d95'
    },
    purple: {
      50: '#faf5ff', 100: '#f3e8ff', 200: '#e9d5ff', 300: '#d8b4fe', 400: '#c084fc',
      500: '#a855f7', 600: '#9333ea', 700: '#7e22ce', 800: '#6b21a8', 900: '#581c87'
    },
    fuchsia: {
      50: '#fdf4ff', 100: '#fae8ff', 200: '#f5d0fe', 300: '#f0abfc', 400: '#e879f9',
      500: '#d946ef', 600: '#c026d3', 700: '#a21caf', 800: '#86198f', 900: '#701a75'
    },
    pink: {
      50: '#fdf2f8', 100: '#fce7f3', 200: '#fbcfe8', 300: '#f9a8d4', 400: '#f472b6',
      500: '#ec4899', 600: '#db2777', 700: '#be185d', 800: '#9d174d', 900: '#831843'
    },
    rose: {
      50: '#fff1f2', 100: '#ffe4e6', 200: '#fecdd3', 300: '#fda4af', 400: '#fb7185',
      500: '#f43f5e', 600: '#e11d48', 700: '#be123c', 800: '#9f1239', 900: '#881337', 950: '#4c0519'
    }
  }), [])

  const findClosestTailwindColor = useCallback((hexColor: string) => {
    let minDistance = Infinity;
    let closestColorName = '';
    let closestColorValue = '';

    const targetRgb = hexToRgb(hexColor);

    Object.entries(TAILWIND_COLORS).forEach(([colorName, shades]) => {
      Object.entries(shades).forEach(([shade, value]) => {
        const shadeRgb = hexToRgb(value);

        // Calcul de la distance euclidienne dans l'espace RGB
        const distance = Math.sqrt(
          Math.pow(targetRgb.r - shadeRgb.r, 2) +
          Math.pow(targetRgb.g - shadeRgb.g, 2) +
          Math.pow(targetRgb.b - shadeRgb.b, 2)
        );

        if (distance < minDistance) {
          minDistance = distance;
          closestColorName = `${colorName}-${shade}`;
          closestColorValue = value;
        }
      });
    });

    setClosestTailwind({
      name: closestColorName,
      value: closestColorValue
    });
  }, [TAILWIND_COLORS]);

  // Historique des couleurs
  const updateColorHistory = useCallback((color: string) => {
    setHistory(prev => {
      // Ne pas ajouter de doublons consécutifs
      if (prev.length > 0 && prev[0] === color) return prev

      // Limiter l'historique à 10 couleurs
      const newHistory = [color, ...prev.filter(c => c !== color)]
      return newHistory.slice(0, 10)
    })
  }, [])

  // Convertir et mettre à jour tous les formats quand la couleur change
  const updateAllFormats = useCallback((type: string, value: ColorValue) => {
    setError(null)
    try {
      if (type === "hex" && typeof value === "string") {
        // Permettre la saisie en cours, valider seulement si complet
        setHex(value)
        if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
          const rgbValues = hexToRgb(value)
          setRgb(rgbValues)
          const hslValues = rgbToHsl(rgbValues.r, rgbValues.g, rgbValues.b)
          setHsl(hslValues)
          const cmykValues = rgbToCmyk(rgbValues.r, rgbValues.g, rgbValues.b)
          setCmyk(cmykValues)
          updateColorHistory(value)
          findClosestTailwindColor(value)
        }
      } else if (type === "rgb" && typeof value === "object" && "r" in value) {
        const { r, g, b } = value
        // Valider les limites mais permettre la saisie
        const validR = Math.max(0, Math.min(255, r || 0))
        const validG = Math.max(0, Math.min(255, g || 0))
        const validB = Math.max(0, Math.min(255, b || 0))

        const validatedRgb = { r: validR, g: validG, b: validB }
        setRgb(validatedRgb)

        const hexValue = rgbToHex(validR, validG, validB)
        setHex(hexValue)
        const hslValues = rgbToHsl(validR, validG, validB)
        setHsl(hslValues)
        const cmykValues = rgbToCmyk(validR, validG, validB)
        setCmyk(cmykValues)
        updateColorHistory(hexValue)
        findClosestTailwindColor(hexValue)
      } else if (type === "hsl" && typeof value === "object" && "h" in value) {
        const { h, s, l } = value
        // Valider les limites mais permettre la saisie
        const validH = Math.max(0, Math.min(360, h || 0))
        const validS = Math.max(0, Math.min(100, s || 0))
        const validL = Math.max(0, Math.min(100, l || 0))

        const validatedHsl = { h: validH, s: validS, l: validL }
        setHsl(validatedHsl)

        const rgbValues = hslToRgb(validH, validS, validL)
        setRgb(rgbValues)
        const hexValue = rgbToHex(rgbValues.r, rgbValues.g, rgbValues.b)
        setHex(hexValue)
        const cmykValues = rgbToCmyk(rgbValues.r, rgbValues.g, rgbValues.b)
        setCmyk(cmykValues)
        updateColorHistory(hexValue)
        findClosestTailwindColor(hexValue)
      } else if (type === "cmyk" && typeof value === "object" && "c" in value) {
        const { c, m, y, k } = value
        // Valider les limites mais permettre la saisie
        const validC = Math.max(0, Math.min(100, c || 0))
        const validM = Math.max(0, Math.min(100, m || 0))
        const validY = Math.max(0, Math.min(100, y || 0))
        const validK = Math.max(0, Math.min(100, k || 0))

        const validatedCmyk = { c: validC, m: validM, y: validY, k: validK }
        setCmyk(validatedCmyk)

        const rgbValues = cmykToRgb(validC, validM, validY, validK)
        setRgb(rgbValues)
        const hexValue = rgbToHex(rgbValues.r, rgbValues.g, rgbValues.b)
        setHex(hexValue)
        const hslValues = rgbToHsl(rgbValues.r, rgbValues.g, rgbValues.b)
        setHsl(hslValues)
        updateColorHistory(hexValue)
        findClosestTailwindColor(hexValue)
      }
    } catch (err) {
      // Ne pas afficher d'erreur pour la saisie en cours
      console.log("Erreur de conversion:", err)
    }
  }, [updateColorHistory, findClosestTailwindColor])

  // Récupérer la couleur depuis l'URL au chargement
  const searchParams = useSearchParams()
  useEffect(() => {
    const color = searchParams.get("color")
    if (color) {
      const normalizedColor = `#${color.replace(/^#/, '')}`
      setHex(normalizedColor)
      updateAllFormats("hex", normalizedColor)
    }
  }, [searchParams, updateAllFormats])

  // Mettre à jour la recherche Tailwind au chargement
  useEffect(() => {
    findClosestTailwindColor(hex)
  }, [hex, findClosestTailwindColor])

  // Créer des couleurs aléatoires
  const generateRandomColor = () => {
    const randomHex = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')
    updateAllFormats("hex", randomHex)
  }

  // Fonction pour copier dans le presse-papiers
  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Convertisseur de couleurs</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Convertissez instantanément entre HEX, RGB, HSL, CMYK et découvrez les équivalents Tailwind CSS.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne de gauche */}
          <div className="lg:col-span-2 space-y-6">
            {/* Prévisualisation de la couleur */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle>Aperçu de la couleur</CardTitle>
                <CardDescription>Visualisez et ajustez votre couleur</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Grand carré de prévisualisation */}
                  <div
                    className="w-full md:w-1/2 aspect-square rounded-xl border shadow-sm"
                    style={{ backgroundColor: hex }}
                  />

                  {/* Inputs pour modifier la couleur */}
                  <div className="w-full md:w-1/2 space-y-4">
                    {/* Input HEX */}
                    <div>
                      <Label htmlFor="hex-quick">Valeur HEX</Label>
                      <Input
                        id="hex-quick"
                        value={hex}
                        onChange={(e) => updateAllFormats("hex", e.target.value)}
                        className="font-mono"
                        placeholder="#123ABC"
                      />
                    </div>

                    {/* Inputs RGB */}
                    <div>
                      <Label className="text-sm font-medium mb-2 block">RGB</Label>
                      <div className="grid grid-cols-3 gap-2">
                        <Input
                          type="number"
                          value={rgb.r}
                          onChange={(e) => updateAllFormats("rgb", { ...rgb, r: parseInt(e.target.value) || 0 })}
                          className="font-mono text-sm"
                          placeholder="R"
                          min="0"
                          max="255"
                        />
                        <Input
                          type="number"
                          value={rgb.g}
                          onChange={(e) => updateAllFormats("rgb", { ...rgb, g: parseInt(e.target.value) || 0 })}
                          className="font-mono text-sm"
                          placeholder="G"
                          min="0"
                          max="255"
                        />
                        <Input
                          type="number"
                          value={rgb.b}
                          onChange={(e) => updateAllFormats("rgb", { ...rgb, b: parseInt(e.target.value) || 0 })}
                          className="font-mono text-sm"
                          placeholder="B"
                          min="0"
                          max="255"
                        />
                      </div>
                    </div>

                    {/* Inputs HSL */}
                    <div>
                      <Label className="text-sm font-medium mb-2 block">HSL</Label>
                      <div className="grid grid-cols-3 gap-2">
                        <Input
                          type="number"
                          value={hsl.h}
                          onChange={(e) => updateAllFormats("hsl", { ...hsl, h: parseInt(e.target.value) || 0 })}
                          className="font-mono text-sm"
                          placeholder="H"
                          min="0"
                          max="360"
                        />
                        <Input
                          type="number"
                          value={hsl.s}
                          onChange={(e) => updateAllFormats("hsl", { ...hsl, s: parseInt(e.target.value) || 0 })}
                          className="font-mono text-sm"
                          placeholder="S%"
                          min="0"
                          max="100"
                        />
                        <Input
                          type="number"
                          value={hsl.l}
                          onChange={(e) => updateAllFormats("hsl", { ...hsl, l: parseInt(e.target.value) || 0 })}
                          className="font-mono text-sm"
                          placeholder="L%"
                          min="0"
                          max="100"
                        />
                      </div>
                    </div>

                    {/* Inputs CMYK */}
                    <div>
                      <Label className="text-sm font-medium mb-2 block">CMYK</Label>
                      <div className="grid grid-cols-4 gap-1">
                        <Input
                          type="number"
                          value={cmyk.c}
                          onChange={(e) => updateAllFormats("cmyk", { ...cmyk, c: parseInt(e.target.value) || 0 })}
                          className="font-mono text-xs"
                          placeholder="C"
                          min="0"
                          max="100"
                        />
                        <Input
                          type="number"
                          value={cmyk.m}
                          onChange={(e) => updateAllFormats("cmyk", { ...cmyk, m: parseInt(e.target.value) || 0 })}
                          className="font-mono text-xs"
                          placeholder="M"
                          min="0"
                          max="100"
                        />
                        <Input
                          type="number"
                          value={cmyk.y}
                          onChange={(e) => updateAllFormats("cmyk", { ...cmyk, y: parseInt(e.target.value) || 0 })}
                          className="font-mono text-xs"
                          placeholder="Y"
                          min="0"
                          max="100"
                        />
                        <Input
                          type="number"
                          value={cmyk.k}
                          onChange={(e) => updateAllFormats("cmyk", { ...cmyk, k: parseInt(e.target.value) || 0 })}
                          className="font-mono text-xs"
                          placeholder="K"
                          min="0"
                          max="100"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-md p-3">
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                )}

                {/* Actions rapides */}
                <div className="flex flex-wrap gap-2 mt-4">
                  <Button variant="outline" size="sm" onClick={generateRandomColor}>
                    <RefreshCwIcon className="w-4 h-4 mr-2" />
                    Couleur aléatoire
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.location.href = `/color-picker?color=${hex.replace('#', '')}`}
                  >
                    <PaletteIcon className="w-4 h-4 mr-2" />
                    Sélecteur avancé
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Convertisseur */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle>Convertir entre formats</CardTitle>
                <CardDescription>Modifiez n&apos;importe quel format pour mettre à jour tous les autres</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="hex" onValueChange={setActiveInput} value={activeInput}>
                  <TabsList className="grid grid-cols-4 mb-6">
                    <TabsTrigger value="hex">HEX</TabsTrigger>
                    <TabsTrigger value="rgb">RGB</TabsTrigger>
                    <TabsTrigger value="hsl">HSL</TabsTrigger>
                    <TabsTrigger value="cmyk">CMYK</TabsTrigger>
                  </TabsList>

                  <TabsContent value="hex" className="space-y-4">
                    <div>
                      <Label htmlFor="hex-input">Valeur Hexadécimale</Label>
                      <div className="flex mt-2">
                        <Input
                          id="hex-input"
                          value={hex}
                          onChange={(e) => updateAllFormats("hex", e.target.value)}
                          className="font-mono"
                          placeholder="#123ABC"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="ml-2"
                          onClick={() => copyToClipboard(hex, 'hex')}
                        >
                          {copied === 'hex' ? <CheckIcon className="h-4 w-4 text-green-500" /> : <CopyIcon className="h-4 w-4" />}
                        </Button>
                      </div>
                      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                    </div>
                  </TabsContent>

                  <TabsContent value="rgb" className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="r-input">R (Rouge)</Label>
                        <Input
                          id="r-input"
                          type="number"
                          value={rgb.r}
                          onChange={(e) => updateAllFormats("rgb", { ...rgb, r: parseInt(e.target.value) || 0 })}
                          className="font-mono"
                          min="0"
                          max="255"
                        />
                      </div>
                      <div>
                        <Label htmlFor="g-input">G (Vert)</Label>
                        <Input
                          id="g-input"
                          type="number"
                          value={rgb.g}
                          onChange={(e) => updateAllFormats("rgb", { ...rgb, g: parseInt(e.target.value) || 0 })}
                          className="font-mono"
                          min="0"
                          max="255"
                        />
                      </div>
                      <div>
                        <Label htmlFor="b-input">B (Bleu)</Label>
                        <Input
                          id="b-input"
                          type="number"
                          value={rgb.b}
                          onChange={(e) => updateAllFormats("rgb", { ...rgb, b: parseInt(e.target.value) || 0 })}
                          className="font-mono"
                          min="0"
                          max="255"
                        />
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full"
                      onClick={() => copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, 'rgb')}
                    >
                      {copied === 'rgb' ? <CheckIcon className="h-4 w-4 text-green-500 mr-2" /> : <CopyIcon className="h-4 w-4 mr-2" />}
                      Copier rgb({rgb.r}, {rgb.g}, {rgb.b})
                    </Button>
                  </TabsContent>

                  <TabsContent value="hsl" className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="h-input">H (Teinte)</Label>
                        <Input
                          id="h-input"
                          type="number"
                          value={hsl.h}
                          onChange={(e) => updateAllFormats("hsl", { ...hsl, h: parseInt(e.target.value) || 0 })}
                          className="font-mono"
                          min="0"
                          max="360"
                        />
                      </div>
                      <div>
                        <Label htmlFor="s-input">S (Saturation)</Label>
                        <Input
                          id="s-input"
                          type="number"
                          value={hsl.s}
                          onChange={(e) => updateAllFormats("hsl", { ...hsl, s: parseInt(e.target.value) || 0 })}
                          className="font-mono"
                          min="0"
                          max="100"
                        />
                      </div>
                      <div>
                        <Label htmlFor="l-input">L (Luminosité)</Label>
                        <Input
                          id="l-input"
                          type="number"
                          value={hsl.l}
                          onChange={(e) => updateAllFormats("hsl", { ...hsl, l: parseInt(e.target.value) || 0 })}
                          className="font-mono"
                          min="0"
                          max="100"
                        />
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full"
                      onClick={() => copyToClipboard(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`, 'hsl')}
                    >
                      {copied === 'hsl' ? <CheckIcon className="h-4 w-4 text-green-500 mr-2" /> : <CopyIcon className="h-4 w-4 mr-2" />}
                      Copier hsl({hsl.h}, {hsl.s}%, {hsl.l}%)
                    </Button>
                  </TabsContent>

                  <TabsContent value="cmyk" className="space-y-4">
                    <div className="grid grid-cols-4 gap-3">
                      <div>
                        <Label htmlFor="c-input">C (Cyan)</Label>
                        <Input
                          id="c-input"
                          type="number"
                          value={cmyk.c}
                          onChange={(e) => updateAllFormats("cmyk", { ...cmyk, c: parseInt(e.target.value) || 0 })}
                          className="font-mono"
                          min="0"
                          max="100"
                        />
                      </div>
                      <div>
                        <Label htmlFor="m-input">M (Magenta)</Label>
                        <Input
                          id="m-input"
                          type="number"
                          value={cmyk.m}
                          onChange={(e) => updateAllFormats("cmyk", { ...cmyk, m: parseInt(e.target.value) || 0 })}
                          className="font-mono"
                          min="0"
                          max="100"
                        />
                      </div>
                      <div>
                        <Label htmlFor="y-input">Y (Jaune)</Label>
                        <Input
                          id="y-input"
                          type="number"
                          value={cmyk.y}
                          onChange={(e) => updateAllFormats("cmyk", { ...cmyk, y: parseInt(e.target.value) || 0 })}
                          className="font-mono"
                          min="0"
                          max="100"
                        />
                      </div>
                      <div>
                        <Label htmlFor="k-input">K (Noir)</Label>
                        <Input
                          id="k-input"
                          type="number"
                          value={cmyk.k}
                          onChange={(e) => updateAllFormats("cmyk", { ...cmyk, k: parseInt(e.target.value) || 0 })}
                          className="font-mono"
                          min="0"
                          max="100"
                        />
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full"
                      onClick={() => copyToClipboard(`cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`, 'cmyk')}
                    >
                      {copied === 'cmyk' ? <CheckIcon className="h-4 w-4 text-green-500 mr-2" /> : <CopyIcon className="h-4 w-4 mr-2" />}
                      Copier cmyk({cmyk.c}%, {cmyk.m}%, {cmyk.y}%, {cmyk.k}%)
                    </Button>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Colonne de droite */}
          <div className="space-y-6">
            {/* Équivalent Tailwind */}
            <Card>
              <CardHeader>
                <CardTitle>Équivalent Tailwind CSS</CardTitle>
                <CardDescription>Couleur Tailwind la plus proche</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3 items-center">
                  <div
                    className="w-10 h-10 rounded-md border"
                    style={{ backgroundColor: closestTailwind.value }}
                  />
                  <div>
                    <p className="text-sm font-medium">{closestTailwind.name}</p>
                    <p className="text-xs text-muted-foreground">{closestTailwind.value}</p>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => copyToClipboard(`text-${closestTailwind.name} bg-${closestTailwind.name}`, 'tailwind')}
                >
                  {copied === 'tailwind' ? <CheckIcon className="h-4 w-4 text-green-500 mr-2" /> : <CopyIcon className="h-4 w-4 mr-2" />}
                  Copier la classe Tailwind
                </Button>
              </CardContent>
            </Card>

            {/* Formats d'exportation */}
            <Card>
              <CardHeader>
                <CardTitle>Formats d&apos;exportation</CardTitle>
                <CardDescription>Code prêt à l&apos;emploi</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Tabs defaultValue="css" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="css">CSS</TabsTrigger>
                    <TabsTrigger value="variables">Variables</TabsTrigger>
                    <TabsTrigger value="js">JS/React</TabsTrigger>
                  </TabsList>

                  <TabsContent value="css" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs">background-color</span>
                        <div className="flex items-center gap-2">
                          <code className="bg-muted text-xs px-2 py-1 rounded-md">
                            background-color: {hex};
                          </code>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => copyToClipboard(`background-color: ${hex};`, 'css-bg')}
                          >
                            {copied === 'css-bg' ? <CheckIcon className="h-3 w-3 text-green-500" /> : <CopyIcon className="h-3 w-3" />}
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-xs">color</span>
                        <div className="flex items-center gap-2">
                          <code className="bg-muted text-xs px-2 py-1 rounded-md">
                            color: {hex};
                          </code>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => copyToClipboard(`color: ${hex};`, 'css-color')}
                          >
                            {copied === 'css-color' ? <CheckIcon className="h-3 w-3 text-green-500" /> : <CopyIcon className="h-3 w-3" />}
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-xs">border-color</span>
                        <div className="flex items-center gap-2">
                          <code className="bg-muted text-xs px-2 py-1 rounded-md">
                            border-color: {hex};
                          </code>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => copyToClipboard(`border-color: ${hex};`, 'css-border')}
                          >
                            {copied === 'css-border' ? <CheckIcon className="h-3 w-3 text-green-500" /> : <CopyIcon className="h-3 w-3" />}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="variables" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs">Variable CSS</span>
                        <div className="flex items-center gap-2">
                          <code className="bg-muted text-xs px-2 py-1 rounded-md">
                            --color-primary: {hex};
                          </code>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => copyToClipboard(`--color-primary: ${hex};`, 'var-css')}
                          >
                            {copied === 'var-css' ? <CheckIcon className="h-3 w-3 text-green-500" /> : <CopyIcon className="h-3 w-3" />}
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-xs">Utilisation</span>
                        <div className="flex items-center gap-2">
                          <code className="bg-muted text-xs px-2 py-1 rounded-md">
                            var(--color-primary)
                          </code>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => copyToClipboard(`var(--color-primary)`, 'var-use')}
                          >
                            {copied === 'var-use' ? <CheckIcon className="h-3 w-3 text-green-500" /> : <CopyIcon className="h-3 w-3" />}
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-xs">SCSS</span>
                        <div className="flex items-center gap-2">
                          <code className="bg-muted text-xs px-2 py-1 rounded-md">
                            $color-primary: {hex};
                          </code>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => copyToClipboard(`$color-primary: ${hex};`, 'var-scss')}
                          >
                            {copied === 'var-scss' ? <CheckIcon className="h-3 w-3 text-green-500" /> : <CopyIcon className="h-3 w-3" />}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="js" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs">JavaScript</span>
                        <div className="flex items-center gap-2">
                          <code className="bg-muted text-xs px-2 py-1 rounded-md">
                            const color = &apos;{hex}&apos;;
                          </code>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => copyToClipboard(`const color = '${hex}';`, 'js-var')}
                          >
                            {copied === 'js-var' ? <CheckIcon className="h-3 w-3 text-green-500" /> : <CopyIcon className="h-3 w-3" />}
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-xs">React inline</span>
                        <div className="flex items-center gap-2">
                          <code className="bg-muted text-xs px-2 py-1 rounded-md whitespace-nowrap overflow-x-auto max-w-[200px]">
                            style=&#123;&#123; backgroundColor: &apos;{hex}&apos; &#125;&#125;
                          </code>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => copyToClipboard(`style={{ backgroundColor: '${hex}' }}`, 'react-style')}
                          >
                            {copied === 'react-style' ? <CheckIcon className="h-3 w-3 text-green-500" /> : <CopyIcon className="h-3 w-3" />}
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-xs">RGB Object</span>
                        <div className="flex items-center gap-2">
                          <code className="bg-muted text-xs px-2 py-1 rounded-md whitespace-nowrap overflow-x-auto max-w-[200px]">
                            &#123; r: {rgb.r}, g: {rgb.g}, b: {rgb.b} &#125;
                          </code>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => copyToClipboard(`{ r: ${rgb.r}, g: ${rgb.g}, b: ${rgb.b} }`, 'rgb-obj')}
                          >
                            {copied === 'rgb-obj' ? <CheckIcon className="h-3 w-3 text-green-500" /> : <CopyIcon className="h-3 w-3" />}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Historique */}
            {history.length > 0 && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Historique</CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="grid grid-cols-5 gap-2">
                    {history.map((color, index) => (
                      <button
                        key={index}
                        className={cn(
                          "h-8 w-full rounded-md border",
                          color.toLowerCase() === hex.toLowerCase() && "ring-2 ring-brand"
                        )}
                        style={{ backgroundColor: color }}
                        onClick={() => updateAllFormats("hex", color)}
                        title={color}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Actions */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <Button
                    className="w-full"
                    onClick={() => window.location.href = `/color-picker?color=${hex.replace('#', '')}`}
                  >
                    <PaletteIcon className="mr-2 h-4 w-4" />
                    Sélecteur avancé
                  </Button>

                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={() => window.location.href = `/patterns?color=${hex.replace('#', '')}`}
                  >
                    <ArrowRightIcon className="mr-2 h-4 w-4" />
                    Créer un motif avec cette couleur
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Lien de partage */}
            <Button
              variant="ghost"
              className="w-full"
              onClick={() => {
                const shareUrl = `${window.location.origin}/converter?color=${hex.replace('#', '')}`;
                copyToClipboard(shareUrl, 'share');
              }}
            >
              <LinkIcon className="mr-2 h-4 w-4" />
              {copied === 'share' ? 'URL copiée' : 'Copier le lien de partage'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
