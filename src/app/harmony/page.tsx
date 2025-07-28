"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { CopyIcon, CheckIcon, RefreshCwIcon, PaletteIcon } from "lucide-react"

export default function HarmonyPage() {
  const [baseColor, setBaseColor] = useState("#3b82f6")
  const [harmonyType, setHarmonyType] = useState("complementary")
  const [saturation, setSaturation] = useState([70])
  const [lightness, setLightness] = useState([50])
  const [copied, setCopied] = useState<string | null>(null)

  // Types d'harmonies disponibles
  const harmonyTypes = {
    complementary: {
      name: "Complémentaire",
      description: "Couleurs opposées sur le cercle chromatique",
      angles: [0, 180],
      icon: "🎯"
    },
    triadic: {
      name: "Triadique",
      description: "Trois couleurs équidistantes sur le cercle",
      angles: [0, 120, 240],
      icon: "△"
    },
    analogous: {
      name: "Analogue",
      description: "Couleurs adjacentes sur le cercle chromatique",
      angles: [0, 30, 60],
      icon: "🌈"
    },
    splitComplementary: {
      name: "Complémentaire divisée",
      description: "Couleur de base + deux couleurs adjacentes à sa complémentaire",
      angles: [0, 150, 210],
      icon: "⚡"
    },
    tetradic: {
      name: "Tétradique",
      description: "Quatre couleurs formant un rectangle sur le cercle",
      angles: [0, 60, 180, 240],
      icon: "⬜"
    },
    monochromatic: {
      name: "Monochromatique",
      description: "Variations de la même teinte",
      angles: [0, 0, 0, 0],
      icon: "🎨"
    }
  }

  // Fonction pour convertir HEX en HSL
  const hexToHsl = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255
    const g = parseInt(hex.slice(3, 5), 16) / 255
    const b = parseInt(hex.slice(5, 7), 16) / 255

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

  // Fonction pour convertir HSL en HEX
  const hslToHex = (h: number, s: number, l: number) => {
    h /= 360
    s /= 100
    l /= 100

    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1/6) return p + (q - p) * 6 * t
      if (t < 1/2) return q
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
      return p
    }

    let r, g, b

    if (s === 0) {
      r = g = b = l
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s
      const p = 2 * l - q
      r = hue2rgb(p, q, h + 1/3)
      g = hue2rgb(p, q, h)
      b = hue2rgb(p, q, h - 1/3)
    }

    const toHex = (c: number) => {
      const hex = Math.round(c * 255).toString(16)
      return hex.length === 1 ? '0' + hex : hex
    }

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`
  }

  // Générer les couleurs d'harmonie
  const generateHarmony = useCallback(() => {
    const baseHsl = hexToHsl(baseColor)
    const harmony = harmonyTypes[harmonyType as keyof typeof harmonyTypes]

    if (harmonyType === "monochromatic") {
      // Pour monochromatique, on varie la luminosité et légèrement la saturation
      return [
        hslToHex(baseHsl.h, saturation[0] * 0.3, lightness[0] * 0.4),
        hslToHex(baseHsl.h, saturation[0] * 0.7, lightness[0] * 0.7),
        baseColor,
        hslToHex(baseHsl.h, saturation[0] * 1.2, lightness[0] * 1.3),
        hslToHex(baseHsl.h, saturation[0] * 0.9, lightness[0] * 1.6)
      ].slice(0, harmony.angles.length || 5)
    }

    return harmony.angles.map((angle, index) => {
      if (index === 0) return baseColor

      const newHue = (baseHsl.h + angle) % 360
      const newSaturation = Math.min(100, saturation[0] + (Math.random() - 0.5) * 20)
      const newLightness = Math.min(100, lightness[0] + (Math.random() - 0.5) * 20)

      return hslToHex(newHue, newSaturation, newLightness)
    })
  }, [baseColor, harmonyType, saturation, lightness, harmonyTypes, hexToHsl, hslToHex])

  const [harmonyColors, setHarmonyColors] = useState<string[]>([])

  useEffect(() => {
    setHarmonyColors(generateHarmony())
  }, [baseColor, harmonyType, saturation, lightness, generateHarmony])

  // Fonction pour copier dans le presse-papiers
  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  // Générer une couleur aléatoire
  const generateRandomColor = () => {
    const randomHex = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')
    setBaseColor(randomHex)
  }

  // Obtenir des suggestions d'utilisation
  const getUsageSuggestions = (type: string) => {
    const suggestions = {
      complementary: [
        "Bouton principal + arrière-plan",
        "Titre + texte de support",
        "Icônes + badges"
      ],
      triadic: [
        "Navigation + contenu + accents",
        "Header + sidebar + footer",
        "Boutons primaires, secondaires, tertiaires"
      ],
      analogous: [
        "Dégradés naturels",
        "Thèmes saisonniers",
        "Interfaces douces et harmonieuses"
      ],
      splitComplementary: [
        "Design équilibré avec contraste",
        "Système de couleurs riche",
        "Interfaces créatives"
      ],
      tetradic: [
        "Dashboards complexes",
        "Systèmes de catégorisation",
        "Interfaces riches en couleurs"
      ],
      monochromatic: [
        "Designs minimalistes",
        "Hiérarchie visuelle subtile",
        "Interfaces élégantes"
      ]
    }
    return suggestions[type as keyof typeof suggestions] || []
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* En-tête */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Harmonies de couleurs</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Créez des palettes harmonieuses basées sur la théorie des couleurs. Parfait pour vos designs web et projets créatifs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contrôles */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configuration</CardTitle>
                <CardDescription>Ajustez votre couleur de base et les paramètres</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Couleur de base */}
                <div className="space-y-3">
                  <Label>Couleur de base</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={baseColor}
                      onChange={(e) => setBaseColor(e.target.value)}
                      className="w-16 h-10 p-1 rounded"
                    />
                    <Input
                      value={baseColor}
                      onChange={(e) => setBaseColor(e.target.value)}
                      className="font-mono"
                      placeholder="#3b82f6"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={generateRandomColor}
                    >
                      <RefreshCwIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Type d'harmonie */}
                <div className="space-y-3">
                  <Label>Type d&apos;harmonie</Label>
                  <div className="grid grid-cols-1 gap-2">
                    {Object.entries(harmonyTypes).map(([key, harmony]) => (
                      <Button
                        key={key}
                        variant={harmonyType === key ? "default" : "outline"}
                        className="justify-start"
                        onClick={() => setHarmonyType(key)}
                      >
                        <span className="mr-2">{harmony.icon}</span>
                        {harmony.name}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Saturation */}
                <div className="space-y-3">
                  <Label>Saturation ({saturation[0]}%)</Label>
                  <Slider
                    value={saturation}
                    onValueChange={setSaturation}
                    max={100}
                    min={0}
                    step={1}
                    className="w-full"
                  />
                </div>

                {/* Luminosité */}
                <div className="space-y-3">
                  <Label>Luminosité ({lightness[0]}%)</Label>
                  <Slider
                    value={lightness}
                    onValueChange={setLightness}
                    max={100}
                    min={10}
                    step={1}
                    className="w-full"
                  />
                </div>

                <Button
                  onClick={() => setHarmonyColors(generateHarmony())}
                  className="w-full"
                >
                  <RefreshCwIcon className="h-4 w-4 mr-2" />
                  Régénérer l&apos;harmonie
                </Button>
              </CardContent>
            </Card>

            {/* Informations sur l'harmonie */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {harmonyTypes[harmonyType as keyof typeof harmonyTypes].icon}{" "}
                  {harmonyTypes[harmonyType as keyof typeof harmonyTypes].name}
                </CardTitle>
                <CardDescription>
                  {harmonyTypes[harmonyType as keyof typeof harmonyTypes].description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Utilisations recommandées</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {getUsageSuggestions(harmonyType).map((suggestion, index) => (
                        <li key={index}>• {suggestion}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Résultat */}
          <div className="lg:col-span-2 space-y-6">
            {/* Palette générée */}
            <Card>
              <CardHeader>
                <CardTitle>Palette générée</CardTitle>
                <CardDescription>{harmonyColors.length} couleurs harmonieuses</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Grande prévisualisation */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                  {harmonyColors.map((color, index) => (
                    <div key={index} className="space-y-3">
                      <div
                        className="aspect-square rounded-lg border cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg group"
                        style={{ backgroundColor: color }}
                        onClick={() => copyToClipboard(color, `color-${index}`)}
                        title={`Copier ${color}`}
                      >
                        <div className="w-full h-full rounded-lg  bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                          {copied === `color-${index}` ? (
                            <CheckIcon className="h-6 w-6 text-white" />
                          ) : (
                            <CopyIcon className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                          )}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="font-mono text-sm">{color}</div>
                        <Badge variant="outline" className="text-xs mt-1">
                          {index === 0 ? "Base" : `Harmonie ${index}`}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bande de couleurs */}
                <div className="h-20 rounded-lg overflow-hidden border flex">
                  {harmonyColors.map((color, index) => (
                    <div
                      key={index}
                      className="flex-1 cursor-pointer transition-all duration-200 hover:scale-y-110"
                      style={{ backgroundColor: color }}
                      onClick={() => copyToClipboard(color, `band-${index}`)}
                      title={`Copier ${color}`}
                    />
                  ))}
                </div>

                {/* Actions d'export */}
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    onClick={() => copyToClipboard(harmonyColors.join(", "), "hex-list")}
                  >
                    {copied === "hex-list" ? <CheckIcon className="h-4 w-4 mr-2" /> : <CopyIcon className="h-4 w-4 mr-2" />}
                    Copier HEX
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => copyToClipboard(
                      `:root {\n${harmonyColors.map((color, i) => `  --harmony-${i + 1}: ${color};`).join('\n')}\n}`,
                      "css-vars"
                    )}
                  >
                    {copied === "css-vars" ? <CheckIcon className="h-4 w-4 mr-2" /> : <CopyIcon className="h-4 w-4 mr-2" />}
                    Variables CSS
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => copyToClipboard(
                      `const harmonyColors = [\n${harmonyColors.map(color => `  '${color}'`).join(',\n')}\n]`,
                      "js-array"
                    )}
                  >
                    {copied === "js-array" ? <CheckIcon className="h-4 w-4 mr-2" /> : <CopyIcon className="h-4 w-4 mr-2" />}
                    Array JS
                  </Button>
                  <Button
                    onClick={() => window.location.href = `/converter?color=${baseColor.replace('#', '')}`}
                  >
                    <PaletteIcon className="h-4 w-4 mr-2" />
                    Analyser la base
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Exemples d'application */}
            <Card>
              <CardHeader>
                <CardTitle>Aperçu en contexte</CardTitle>
                <CardDescription>Voyez comment votre harmonie fonctionne dans différents contextes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Exemple de carte */}
                <div className="space-y-2">
                  <Label>Exemple de carte</Label>
                  <div
                    className="p-6 rounded-lg border"
                    style={{ backgroundColor: harmonyColors[0] }}
                  >
                    <div
                      className="text-lg font-semibold mb-2"
                      style={{ color: harmonyColors[4] || harmonyColors[harmonyColors.length - 1] }}
                    >
                      Titre de la carte
                    </div>
                    <div
                      className="text-sm mb-4"
                      style={{ color: harmonyColors[3] || harmonyColors[harmonyColors.length - 2] }}
                    >
                      Description du contenu avec votre palette d&apos;harmonie appliquée.
                    </div>
                    <div className="flex gap-2">
                      <div
                        className="px-3 py-1 rounded text-white text-sm"
                        style={{ backgroundColor: harmonyColors[1] }}
                      >
                        Bouton 1
                      </div>
                      <div
                        className="px-3 py-1 rounded text-white text-sm"
                        style={{ backgroundColor: harmonyColors[2] }}
                      >
                        Bouton 2
                      </div>
                    </div>
                  </div>
                </div>

                {/* Exemple de navigation */}
                <div className="space-y-2">
                  <Label>Exemple de navigation</Label>
                  <div className="border rounded-lg overflow-hidden">
                    <div
                      className="p-4 flex justify-between items-center"
                      style={{ backgroundColor: harmonyColors[1] }}
                    >
                      <div className="text-white font-semibold">Logo</div>
                      <div className="flex gap-4">
                        {["Accueil", "À propos", "Contact"].map((item, index) => (
                          <div
                            key={item}
                            className="px-3 py-1 rounded text-sm cursor-pointer"
                            style={{
                              backgroundColor: index === 0 ? harmonyColors[2] : 'transparent',
                              color: 'white'
                            }}
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div
                      className="p-8 text-center"
                      style={{ backgroundColor: harmonyColors[0] }}
                    >
                      <h2
                        className="text-2xl font-bold mb-4"
                        style={{ color: harmonyColors[3] || harmonyColors[harmonyColors.length - 1] }}
                      >
                        Contenu principal
                      </h2>
                      <p style={{ color: harmonyColors[2] }}>
                        Votre contenu ici avec une belle harmonie de couleurs.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Guide théorique */}
        <Card>
          <CardHeader>
            <CardTitle>Théorie des couleurs</CardTitle>
            <CardDescription>Comprendre les harmonies pour de meilleurs designs</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(harmonyTypes).map(([key, harmony]) => (
                <div key={key} className="space-y-2">
                  <h4 className="font-medium flex items-center gap-2">
                    <span>{harmony.icon}</span>
                    {harmony.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">{harmony.description}</p>
                  <div className="text-xs text-muted-foreground">
                    <strong>Angles:</strong> {harmony.angles.join("°, ")}°
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
