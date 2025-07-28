"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCallback, useEffect, useRef, useState } from "react"
import { CopyIcon, CheckIcon, Code2Icon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {BlendingModeIcon} from "@radix-ui/react-icons";
import { Card, CardContent } from "@/components/ui/card"

interface ColorPickerProps {
  defaultColor?: string
  onChange?: (color: string) => void
  className?: string
  format?: "hex" | "rgb" | "hsl"
}

// Tableau des couleurs Tailwind avec leurs valeurs hexadécimales
const TAILWIND_COLORS = {
  slate: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617',
  },
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
    950: '#030712',
  },
  zinc: {
    50: '#fafafa',
    100: '#f4f4f5',
    200: '#e4e4e7',
    300: '#d4d4d8',
    400: '#a1a1aa',
    500: '#71717a',
    600: '#52525b',
    700: '#3f3f46',
    800: '#27272a',
    900: '#18181b',
    950: '#09090b',
  },
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0a0a0a',
  },
  stone: {
    50: '#fafaf9',
    100: '#f5f5f4',
    200: '#e7e5e4',
    300: '#d6d3d1',
    400: '#a8a29e',
    500: '#78716c',
    600: '#57534e',
    700: '#44403c',
    800: '#292524',
    900: '#1c1917',
    950: '#0c0a09',
  },
  red: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
    950: '#450a0a',
  },
  orange: {
    50: '#fff7ed',
    100: '#ffedd5',
    200: '#fed7aa',
    300: '#fdba74',
    400: '#fb923c',
    500: '#f97316',
    600: '#ea580c',
    700: '#c2410c',
    800: '#9a3412',
    900: '#7c2d12',
    950: '#431407',
  },
  amber: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
    950: '#451a03',
  },
  yellow: {
    50: '#fefce8',
    100: '#fef9c3',
    200: '#fef08a',
    300: '#fde047',
    400: '#facc15',
    500: '#eab308',
    600: '#ca8a04',
    700: '#a16207',
    800: '#854d0e',
    900: '#713f12',
    950: '#422006',
  },
  lime: {
    50: '#f7fee7',
    100: '#ecfccb',
    200: '#d9f99d',
    300: '#bef264',
    400: '#a3e635',
    500: '#84cc16',
    600: '#65a30d',
    700: '#4d7c0f',
    800: '#3f6212',
    900: '#365314',
    950: '#1a2e05',
  },
  green: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
    950: '#052e16',
  },
  emerald: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981',
    600: '#059669',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b',
    950: '#022c22',
  },
  teal: {
    50: '#f0fdfa',
    100: '#ccfbf1',
    200: '#99f6e4',
    300: '#5eead4',
    400: '#2dd4bf',
    500: '#14b8a6',
    600: '#0d9488',
    700: '#0f766e',
    800: '#115e59',
    900: '#134e4a',
    950: '#042f2e',
  },
  cyan: {
    50: '#ecfeff',
    100: '#cffafe',
    200: '#a5f3fc',
    300: '#67e8f9',
    400: '#22d3ee',
    500: '#06b6d4',
    600: '#0891b2',
    700: '#0e7490',
    800: '#155e75',
    900: '#164e63',
    950: '#083344',
  },
  sky: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
    950: '#082f49',
  },
  blue: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    950: '#172554',
  },
  indigo: {
    50: '#eef2ff',
    100: '#e0e7ff',
    200: '#c7d2fe',
    300: '#a5b4fc',
    400: '#818cf8',
    500: '#6366f1',
    600: '#4f46e5',
    700: '#4338ca',
    800: '#3730a3',
    900: '#312e81',
    950: '#1e1b4b',
  },
  violet: {
    50: '#f5f3ff',
    100: '#ede9fe',
    200: '#ddd6fe',
    300: '#c4b5fd',
    400: '#a78bfa',
    500: '#8b5cf6',
    600: '#7c3aed',
    700: '#6d28d9',
    800: '#5b21b6',
    900: '#4c1d95',
    950: '#2e1065',
  },
  purple: {
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#a855f7',
    600: '#9333ea',
    700: '#7e22ce',
    800: '#6b21a8',
    900: '#581c87',
    950: '#3b0764',
  },
  fuchsia: {
    50: '#fdf4ff',
    100: '#fae8ff',
    200: '#f5d0fe',
    300: '#f0abfc',
    400: '#e879f9',
    500: '#d946ef',
    600: '#c026d3',
    700: '#a21caf',
    800: '#86198f',
    900: '#701a75',
    950: '#4a044e',
  },
  pink: {
    50: '#fdf2f8',
    100: '#fce7f3',
    200: '#fbcfe8',
    300: '#f9a8d4',
    400: '#f472b6',
    500: '#ec4899',
    600: '#db2777',
    700: '#be185d',
    800: '#9d174d',
    900: '#831843',
    950: '#500724',
  },
  rose: {
    50: '#fff1f2',
    100: '#ffe4e6',
    200: '#fecdd3',
    300: '#fda4af',
    400: '#fb7185',
    500: '#f43f5e',
    600: '#e11d48',
    700: '#be123c',
    800: '#9f1239',
    900: '#881337',
    950: '#4c0519',
  },
};

// Fonction pour trouver la couleur Tailwind la plus proche
function findClosestTailwindColor(hexColor: string): { color: string; shade: string; value: string } {
  let minDistance = Infinity;
  let closestColor = '';
  let closestShade = '';
  let closestValue = '';

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
        closestColor = colorName;
        closestShade = shade;
        closestValue = value;
      }
    });
  });

  return {
    color: closestColor,
    shade: closestShade,
    value: closestValue
  };
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  // Remove # if present
  hex = hex.replace('#', '')

  // Parse the hex value
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)

  return { r, g, b }
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
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

function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  h /= 360
  s /= 100
  l /= 100

  let r, g, b

  if (s === 0) {
    r = g = b = l // achromatic
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

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b]
    .map(x => {
      const hex = x.toString(16)
      return hex.length === 1 ? '0' + hex : hex
    })
    .join('')
}

export function ColorPicker({
  defaultColor = "#10b981",
  onChange,
  className,
  format = "hex"
}: ColorPickerProps) {
  const [color, setColor] = useState(defaultColor)
  const [rgb, setRgb] = useState({ r: 0, g: 0, b: 0 })
  const [hsl, setHsl] = useState({ h: 0, s: 0, l: 0 })
  const [isCopied, setIsCopied] = useState(false)
  const [showGradient, setShowGradient] = useState(false)
  const [closestTailwind, setClosestTailwind] = useState<{ color: string; shade: string; value: string }>()

  // Refs pour les sélecteurs interactifs
  const hueSliderRef = useRef<HTMLDivElement>(null)
  const colorAreaRef = useRef<HTMLDivElement>(null)
  const [isDraggingHue, setIsDraggingHue] = useState(false)
  const [isDraggingColor, setIsDraggingColor] = useState(false)

  // Position du curseur dans le carré de couleur
  const [colorPosition, setColorPosition] = useState({ x: 0, y: 0 })
  const [huePosition, setHuePosition] = useState(0)

  // Initialiser les valeurs RGB et HSL
  useEffect(() => {
    const rgbValues = hexToRgb(defaultColor)
    setRgb(rgbValues)
    const hslValues = rgbToHsl(rgbValues.r, rgbValues.g, rgbValues.b)
    setHsl(hslValues)
    setClosestTailwind(findClosestTailwindColor(defaultColor))

    // Calculer les positions initiales
    if (colorAreaRef.current) {
      setColorPosition({
        x: (hslValues.s / 100) * colorAreaRef.current.offsetWidth,
        y: ((100 - hslValues.l) / 100) * colorAreaRef.current.offsetHeight
      })
    }

    if (hueSliderRef.current) {
      setHuePosition((hslValues.h / 360) * hueSliderRef.current.offsetWidth)
    }
  }, [defaultColor])

  // Gestionnaires d'événements pour le carré de couleur
  const handleMouseDownOnColorArea = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDraggingColor(true)
    handleColorAreaInteraction(e)
  }

  const handleMouseMoveOnColorArea = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDraggingColor) {
      handleColorAreaInteraction(e)
    }
  }

  const handleColorAreaInteraction = (e: React.MouseEvent<HTMLDivElement>) => {
    if (colorAreaRef.current) {
      const rect = colorAreaRef.current.getBoundingClientRect()
      let x = e.clientX - rect.left
      let y = e.clientY - rect.top

      // Limiter aux bordures
      x = Math.max(0, Math.min(x, rect.width))
      y = Math.max(0, Math.min(y, rect.height))

      // Mettre à jour la position
      setColorPosition({ x, y })

      // Calculer les nouvelles valeurs S et L
      const s = (x / rect.width) * 100
      const l = 100 - (y / rect.height) * 100

      // Mettre à jour la couleur
      updateColorFromHsl(hsl.h, s, l)
    }
  }

  // Gestionnaires d'événements pour le slider de teinte
  const handleMouseDownOnHueSlider = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDraggingHue(true)
    handleHueSliderInteraction(e)
  }

  const handleMouseMoveOnHueSlider = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDraggingHue) {
      handleHueSliderInteraction(e)
    }
  }

  const handleHueSliderInteraction = (e: React.MouseEvent<HTMLDivElement>) => {
    if (hueSliderRef.current) {
      const rect = hueSliderRef.current.getBoundingClientRect()
      let x = e.clientX - rect.left

      // Limiter aux bordures
      x = Math.max(0, Math.min(x, rect.width))

      // Mettre à jour la position
      setHuePosition(x)

      // Calculer la nouvelle valeur H
      const h = (x / rect.width) * 360

      // Mettre à jour la couleur
      updateColorFromHsl(h, hsl.s, hsl.l)
    }
  }

  // Relâcher la souris
  useEffect(() => {
    const handleMouseUp = () => {
      setIsDraggingHue(false)
      setIsDraggingColor(false)
    }

    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  // Gestionnaire pour les inputs
  const handleRgbInputChange = (channel: 'r' | 'g' | 'b', value: string) => {
    const numValue = parseInt(value, 10)
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 255) {
      const newRgb = { ...rgb, [channel]: numValue }
      updateColorFromRgb(newRgb.r, newRgb.g, newRgb.b)
    }
  }

  const handleHslInputChange = (channel: 'h' | 's' | 'l', value: string) => {
    const numValue = parseInt(value, 10)
    if (!isNaN(numValue)) {
      if ((channel === 'h' && numValue >= 0 && numValue <= 360) ||
          ((channel === 's' || channel === 'l') && numValue >= 0 && numValue <= 100)) {
        const newHsl = { ...hsl, [channel]: numValue }
        updateColorFromHsl(newHsl.h, newHsl.s, newHsl.l)
      }
    }
  }

  // Mettre à jour la couleur à partir de la valeur hexadécimale
  const updateColorFromHex = useCallback((hexColor: string) => {
    setColor(hexColor)
    const rgbValues = hexToRgb(hexColor)
    setRgb(rgbValues)
    setHsl(rgbToHsl(rgbValues.r, rgbValues.g, rgbValues.b))
    setClosestTailwind(findClosestTailwindColor(hexColor)) // Mettre à jour la couleur Tailwind
    onChange?.(hexColor)
  }, [onChange])

  // Mettre à jour la couleur à partir des valeurs RGB
  const updateColorFromRgb = useCallback((r: number, g: number, b: number) => {
    const newRgb = { r, g, b }
    setRgb(newRgb)
    const hexColor = rgbToHex(r, g, b)
    setColor(hexColor)
    setHsl(rgbToHsl(r, g, b))
    setClosestTailwind(findClosestTailwindColor(hexColor)) // Mettre à jour la couleur Tailwind
    onChange?.(hexColor)
  }, [onChange])

  // Mettre à jour la couleur à partir des valeurs HSL
  const updateColorFromHsl = useCallback((h: number, s: number, l: number) => {
    const newHsl = { h, s, l }
    setHsl(newHsl)
    const rgbValues = hslToRgb(h, s, l)
    setRgb(rgbValues)
    const hexColor = rgbToHex(rgbValues.r, rgbValues.g, rgbValues.b)
    setColor(hexColor)
    setClosestTailwind(findClosestTailwindColor(hexColor)) // Mettre à jour la couleur Tailwind
    onChange?.(hexColor)
  }, [onChange])

  // Gérer l'entrée manuelle de la valeur hex
  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    if (!value.startsWith('#')) {
      value = '#' + value
    }
    // Valider que c'est un hex valide
    if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
      updateColorFromHex(value)
    } else {
      setColor(value)
    }
  }

  // Utiliser l'eye dropper API si disponible
  const handleEyeDropper = () => {
    if ('EyeDropper' in window) {
      // @ts-expect-error - EyeDropper n'est pas encore dans les types TS
      const eyeDropper = new window.EyeDropper()
      eyeDropper
        .open()
        .then((result: { sRGBHex: string }) => {
          updateColorFromHex(result.sRGBHex)
        })
        .catch(() => {
          // L'utilisateur a annulé la sélection
        })
    }
  }

  const copyToClipboard = () => {
    let valueToCopy = color // Format par défaut: hex

    if (format === "rgb") {
      valueToCopy = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
    } else if (format === "hsl") {
      valueToCopy = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`
    }

    navigator.clipboard.writeText(valueToCopy).then(() => {
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    })
  }

  return (
    <Card className={cn("w-full overflow-hidden", className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        {/* Colonne gauche: Sélecteur de couleur */}
        <CardContent className="p-4 border-r border-border">
          {/* Prévisualisation et valeur hexadécimale */}
          <div className="flex items-center gap-2 mb-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    className="h-12 w-12 rounded-md border shadow-sm transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
                    style={{ backgroundColor: color }}
                    onClick={() => setShowGradient(!showGradient)}
                    type="button"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Cliquez pour {showGradient ? "masquer" : "afficher"} le dégradé</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Input
                  value={color}
                  onChange={handleHexChange}
                  className="font-mono text-sm"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleEyeDropper}
                  className="shrink-0"
                  title="Pipette de couleur"
                  type="button"
                >
                  <BlendingModeIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={copyToClipboard}
                  className="shrink-0"
                  title="Copier la valeur"
                  type="button"
                >
                  {isCopied ? <CheckIcon className="h-4 w-4 text-green-500" /> : <CopyIcon className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>

          {/* Carré de sélection saturation/luminosité */}
          <div className="space-y-4 mb-4 select-none">
            <div
              ref={colorAreaRef}
              className="relative w-full aspect-square rounded-md cursor-crosshair"
              style={{
                backgroundColor: `hsl(${hsl.h}, 100%, 50%)`,
                backgroundImage: `
                  linear-gradient(to right, #fff, transparent),
                  linear-gradient(to bottom, transparent, #000)
                `
              }}
              onMouseDown={handleMouseDownOnColorArea}
              onMouseMove={handleMouseMoveOnColorArea}
            >
              {/* Curseur */}
              <div
                className="absolute w-4 h-4 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-full shadow-sm"
                style={{
                  left: colorPosition.x,
                  top: colorPosition.y,
                  backgroundColor: color
                }}
              />
            </div>

            {/* Slider de teinte (hue) */}
            <div
              ref={hueSliderRef}
              className="relative w-full h-6 rounded-md cursor-pointer"
              style={{
                background: `linear-gradient(to right, 
                  #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000
                )`
              }}
              onMouseDown={handleMouseDownOnHueSlider}
              onMouseMove={handleMouseMoveOnHueSlider}
            >
              {/* Curseur de teinte */}
              <div
                className="absolute top-0 w-2 h-full -translate-x-1/2 border-2 border-white shadow-sm"
                style={{
                  left: huePosition,
                  backgroundColor: `hsl(${hsl.h}, 100%, 50%)`
                }}
              />
            </div>
          </div>

          {/* Afficher le dégradé si activé */}
          {showGradient && (
            <div className="grid grid-cols-5 gap-1 py-2 mb-4">
              <div className="h-8 rounded-l-md" style={{ backgroundColor: `hsl(${hsl.h}, ${hsl.s}%, 10%)` }}></div>
              <div className="h-8" style={{ backgroundColor: `hsl(${hsl.h}, ${hsl.s}%, 30%)` }}></div>
              <div className="h-8" style={{ backgroundColor: `hsl(${hsl.h}, ${hsl.s}%, 50%)` }}></div>
              <div className="h-8" style={{ backgroundColor: `hsl(${hsl.h}, ${hsl.s}%, 70%)` }}></div>
              <div className="h-8 rounded-r-md" style={{ backgroundColor: `hsl(${hsl.h}, ${hsl.s}%, 90%)` }}></div>
            </div>
          )}

          {/* Valeurs RGB avec inputs */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="space-y-1">
              <Label htmlFor="red-input" className="text-xs">R</Label>
              <Input
                id="red-input"
                value={rgb.r}
                onChange={(e) => handleRgbInputChange('r', e.target.value)}
                className="font-mono text-sm h-8"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="green-input" className="text-xs">G</Label>
              <Input
                id="green-input"
                value={rgb.g}
                onChange={(e) => handleRgbInputChange('g', e.target.value)}
                className="font-mono text-sm h-8"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="blue-input" className="text-xs">B</Label>
              <Input
                id="blue-input"
                value={rgb.b}
                onChange={(e) => handleRgbInputChange('b', e.target.value)}
                className="font-mono text-sm h-8"
              />
            </div>
          </div>

          {/* Valeurs HSL avec inputs */}
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1">
              <Label htmlFor="hue-input" className="text-xs">H</Label>
              <Input
                id="hue-input"
                value={Math.round(hsl.h)}
                onChange={(e) => handleHslInputChange('h', e.target.value)}
                className="font-mono text-sm h-8"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="sat-input" className="text-xs">S</Label>
              <Input
                id="sat-input"
                value={Math.round(hsl.s)}
                onChange={(e) => handleHslInputChange('s', e.target.value)}
                className="font-mono text-sm h-8"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="light-input" className="text-xs">L</Label>
              <Input
                id="light-input"
                value={Math.round(hsl.l)}
                onChange={(e) => handleHslInputChange('l', e.target.value)}
                className="font-mono text-sm h-8"
              />
            </div>
          </div>
        </CardContent>

        {/* Colonne droite: Options, palettes, code */}
        <CardContent className="p-4">
          <Tabs defaultValue="palette" className="w-full">
            <TabsList className="w-full grid grid-cols-3 mb-4">
              <TabsTrigger value="palette">Palette</TabsTrigger>
              <TabsTrigger value="options">Options</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>

            <TabsContent value="palette" className="mt-0">
              <div className="grid grid-cols-10 gap-1 mb-4">
                {Object.entries(TAILWIND_COLORS).flatMap(([colorName, shades]) =>
                  Object.entries(shades).filter(([shade]) =>
                    ['500', '600'].includes(shade)
                  ).map(([shade, hexValue]) => (
                    <button
                      key={`${colorName}-${shade}`}
                      className={cn(
                        "h-8 w-full rounded-md border",
                        color.toLowerCase() === hexValue.toLowerCase() && "ring-2 ring-brand"
                      )}
                      style={{ backgroundColor: hexValue }}
                      onClick={() => updateColorFromHex(hexValue)}
                      title={`${colorName}-${shade}`}
                      type="button"
                    />
                  ))
                )}
              </div>
              <div className="grid grid-cols-5 gap-2">
                {[
                  "#000000", "#ffffff", "#f44336", "#e91e63", "#9c27b0",
                  "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4",
                  "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b",
                  "#ffc107", "#ff9800", "#ff5722", "#795548", "#9e9e9e"
                ].map((paletteColor) => (
                  <button
                    key={paletteColor}
                    className={cn(
                      "h-8 w-full rounded-md border",
                      color.toLowerCase() === paletteColor.toLowerCase() && "ring-2 ring-brand"
                    )}
                    style={{ backgroundColor: paletteColor }}
                    onClick={() => updateColorFromHex(paletteColor)}
                    title={paletteColor}
                    type="button"
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="options" className="mt-0">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Format d&apos;export</Label>
                  <select
                    className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background text-sm"
                    value={format}
                    onChange={(e) => format = e.target.value as "hex" | "rgb" | "hsl"}
                  >
                    <option value="hex">HEX</option>
                    <option value="rgb">RGB</option>
                    <option value="hsl">HSL</option>
                  </select>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Couleur Tailwind la plus proche</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <div
                      className="h-6 w-6 rounded-md border"
                      style={{ backgroundColor: closestTailwind?.value }}
                    />
                    <code className="flex-1 bg-muted px-2 py-1 rounded-md font-mono text-sm">
                      {closestTailwind && `${closestTailwind.color}-${closestTailwind.shade}`}
                    </code>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        if (closestTailwind) {
                          navigator.clipboard.writeText(`${closestTailwind.color}-${closestTailwind.shade}`)
                          setIsCopied(true)
                          setTimeout(() => setIsCopied(false), 2000)
                        }
                      }}
                      className="shrink-0"
                      title="Copier la valeur"
                      type="button"
                    >
                      <CopyIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="code" className="mt-0">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>CSS Variable</Label>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 bg-muted px-2 py-1 rounded-md font-mono text-sm break-all">
                      {`--color-${closestTailwind?.color || 'custom'}: ${color};`}
                    </code>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        const varName = closestTailwind?.color || 'custom';
                        navigator.clipboard.writeText(`--color-${varName}: ${color};`)
                        setIsCopied(true)
                        setTimeout(() => setIsCopied(false), 2000)
                      }}
                      className="shrink-0"
                      title="Copier la variable CSS"
                      type="button"
                    >
                      <CopyIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Utilisation</Label>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 bg-muted px-2 py-1 rounded-md font-mono text-sm break-all">
                      {`var(--color-${closestTailwind?.color || 'custom'})`}
                    </code>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        const varName = closestTailwind?.color || 'custom';
                        navigator.clipboard.writeText(`var(--color-${varName})`)
                        setIsCopied(true)
                        setTimeout(() => setIsCopied(false), 2000)
                      }}
                      className="shrink-0"
                      title="Copier l'utilisation de la variable"
                      type="button"
                    >
                      <CopyIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Button
                  onClick={() => {
                    const cssToAdd = `--color-${closestTailwind?.color || 'custom'}: ${color};`;
                    navigator.clipboard.writeText(cssToAdd);
                    alert('Variable CSS copiée dans le presse-papiers. Vous pouvez maintenant l\'ajouter à votre fichier global.css.');
                  }}
                  className="w-full"
                >
                  <Code2Icon className="mr-2 h-4 w-4" />
                  Copier pour global.css
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </div>
    </Card>
  );
}
