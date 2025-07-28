"use client"

import { useState } from "react"
import { ColorPicker } from "@/components/ui/color-picker"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { CopyIcon, CheckIcon, ExternalLinkIcon, Share2Icon } from "lucide-react"

export default function ColorPickerPage() {
  const [selectedColor, setSelectedColor] = useState("#10b981") // Couleur Emerald par défaut
  const [copied, setCopied] = useState(false)

  // Fonction pour convertir en différents formats
  const hexToRgb = (hex: string) => {
    // Remove # if present
    hex = hex.replace('#', '')

    // Parse the hex value
    const r = parseInt(hex.substring(0, 2), 16)
    const g = parseInt(hex.substring(2, 4), 16)
    const b = parseInt(hex.substring(4, 6), 16)

    return { r, g, b }
  }

  const rgbToHsl = (r: number, g: number, b: number) => {
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

  const rgbToCmyk = (r: number, g: number, b: number) => {
    r = r / 255
    g = g / 255
    b = b / 255

    const k = 1 - Math.max(r, g, b)
    const c = (1 - r - k) / (1 - k) || 0
    const m = (1 - g - k) / (1 - k) || 0
    const y = (1 - b - k) / (1 - k) || 0

    return {
      c: Math.round(c * 100),
      m: Math.round(m * 100),
      y: Math.round(y * 100),
      k: Math.round(k * 100)
    }
  }

  // Formatage pour l'affichage
  const rgb = hexToRgb(selectedColor)
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
  const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b)
  const rgbString = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
  const hslString = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`
  const cmykString = `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Sélecteur & Convertisseur de couleurs</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Choisissez, ajustez et convertissez vos couleurs dans différents formats.
            Trouvez les équivalents TailwindCSS et générez des variables CSS personnalisées.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sélecteur de couleur */}
          <div className="lg:col-span-2">
            <ColorPicker
              defaultColor={selectedColor}
              onChange={setSelectedColor}
              className="w-full"
            />
          </div>

          {/* Panneau de conversion */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Formats de couleur</CardTitle>
                <CardDescription>
                  Conversion instantanée en différents formats
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Tabs defaultValue="formats" className="w-full">
                  <TabsList className="grid grid-cols-2 mb-4">
                    <TabsTrigger value="formats">Formats</TabsTrigger>
                    <TabsTrigger value="export">Export</TabsTrigger>
                  </TabsList>

                  <TabsContent value="formats" className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">HEX</span>
                        <div className="flex items-center gap-2">
                          <code className="bg-muted text-sm px-2 py-1 rounded-md">
                            {selectedColor}
                          </code>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => copyToClipboard(selectedColor)}
                          >
                            {copied ? <CheckIcon className="h-4 w-4 text-green-500" /> : <CopyIcon className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">RGB</span>
                        <div className="flex items-center gap-2">
                          <code className="bg-muted text-sm px-2 py-1 rounded-md">
                            {rgbString}
                          </code>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => copyToClipboard(rgbString)}
                          >
                            <CopyIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">HSL</span>
                        <div className="flex items-center gap-2">
                          <code className="bg-muted text-sm px-2 py-1 rounded-md">
                            {hslString}
                          </code>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => copyToClipboard(hslString)}
                          >
                            <CopyIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">CMYK</span>
                        <div className="flex items-center gap-2">
                          <code className="bg-muted text-sm px-2 py-1 rounded-md">
                            {cmykString}
                          </code>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => copyToClipboard(cmykString)}
                          >
                            <CopyIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="export" className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">CSS</span>
                        <div className="flex items-center gap-2">
                          <code className="bg-muted text-sm px-2 py-1 rounded-md whitespace-nowrap overflow-x-auto max-w-[180px]">
                            background-color: {selectedColor};
                          </code>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => copyToClipboard(`background-color: ${selectedColor};`)}
                          >
                            <CopyIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Var CSS</span>
                        <div className="flex items-center gap-2">
                          <code className="bg-muted text-sm px-2 py-1 rounded-md whitespace-nowrap overflow-x-auto max-w-[180px]">
                            --color: {selectedColor};
                          </code>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => copyToClipboard(`--color: ${selectedColor};`)}
                          >
                            <CopyIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">React</span>
                        <div className="flex items-center gap-2">
                          <code className="bg-muted text-sm px-2 py-1 rounded-md whitespace-nowrap overflow-x-auto max-w-[180px]">
                            style=&#123;&#123; backgroundColor: &quot;{selectedColor}&quot; &#125;&#125;
                          </code>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => copyToClipboard(`style={{ backgroundColor: "${selectedColor}" }}`)}
                          >
                            <CopyIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <div className="flex justify-between gap-4">
              <Button className="flex-1" variant="outline" onClick={() => window.history.back()}>
                Retour
              </Button>
              <Button className="flex-1" onClick={() => window.location.href = "/patterns"}>
                Créer un motif <ExternalLinkIcon className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <Button variant="ghost" className="w-full" onClick={() => copyToClipboard(window.location.href)}>
              <Share2Icon className="mr-2 h-4 w-4" /> Partager
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
