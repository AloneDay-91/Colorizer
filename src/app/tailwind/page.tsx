"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { CopyIcon, CheckIcon, SearchIcon, PaletteIcon } from "lucide-react"

export default function TailwindPage() {
  const [copied, setCopied] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedShade, setSelectedShade] = useState<'50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | '950'>("500")

  // Base de données complète des couleurs Tailwind CSS avec descriptions
  const TAILWIND_COLORS = {
    slate: {
      description: "Gris ardoise moderne et sophistiqué",
      usage: "Textes, arrière-plans neutres, interfaces professionnelles",
      shades: {
        50: '#f8fafc', 100: '#f1f5f9', 200: '#e2e8f0', 300: '#cbd5e1', 400: '#94a3b8',
        500: '#64748b', 600: '#475569', 700: '#334155', 800: '#1e293b', 900: '#0f172a', 950: '#020617'
      }
    },
    gray: {
      description: "Gris classique polyvalent",
      usage: "Éléments d'interface, textes secondaires, bordures",
      shades: {
        50: '#f9fafb', 100: '#f3f4f6', 200: '#e5e7eb', 300: '#d1d5db', 400: '#9ca3af',
        500: '#6b7280', 600: '#4b5563', 700: '#374151', 800: '#1f2937', 900: '#111827', 950: '#030712'
      }
    },
    zinc: {
      description: "Gris zinc avec une pointe de chaleur",
      usage: "Design systems modernes, interfaces épurées",
      shades: {
        50: '#fafafa', 100: '#f4f4f5', 200: '#e4e4e7', 300: '#d4d4d8', 400: '#a1a1aa',
        500: '#71717a', 600: '#52525b', 700: '#3f3f46', 800: '#27272a', 900: '#18181b', 950: '#09090b'
      }
    },
    neutral: {
      description: "Gris neutre équilibré",
      usage: "Arrière-plans neutres, textes subtils",
      shades: {
        50: '#fafafa', 100: '#f5f5f5', 200: '#e5e5e5', 300: '#d4d4d4', 400: '#a3a3a3',
        500: '#737373', 600: '#525252', 700: '#404040', 800: '#262626', 900: '#171717', 950: '#0a0a0a'
      }
    },
    stone: {
      description: "Gris pierre naturel et chaleureux",
      usage: "Designs organiques, interfaces naturelles",
      shades: {
        50: '#fafaf9', 100: '#f5f5f4', 200: '#e7e5e4', 300: '#d6d3d1', 400: '#a8a29e',
        500: '#78716c', 600: '#57534e', 700: '#44403c', 800: '#292524', 900: '#1c1917', 950: '#0c0a09'
      }
    },
    red: {
      description: "Rouge vif pour alertes et accents",
      usage: "Erreurs, alertes, boutons d'action critiques",
      shades: {
        50: '#fef2f2', 100: '#fee2e2', 200: '#fecaca', 300: '#fca5a5', 400: '#f87171',
        500: '#ef4444', 600: '#dc2626', 700: '#b91c1c', 800: '#991b1b', 900: '#7f1d1d', 950: '#450a0a'
      }
    },
    orange: {
      description: "Orange énergique et créatif",
      usage: "Avertissements, CTAs créatifs, éléments énergiques",
      shades: {
        50: '#fff7ed', 100: '#ffedd5', 200: '#fed7aa', 300: '#fdba74', 400: '#fb923c',
        500: '#f97316', 600: '#ea580c', 700: '#c2410c', 800: '#9a3412', 900: '#7c2d12', 950: '#431407'
      }
    },
    amber: {
      description: "Ambre chaleureux et lumineux",
      usage: "Notifications importantes, éléments d'attention",
      shades: {
        50: '#fffbeb', 100: '#fef3c7', 200: '#fde68a', 300: '#fcd34d', 400: '#fbbf24',
        500: '#f59e0b', 600: '#d97706', 700: '#b45309', 800: '#92400e', 900: '#78350f', 950: '#451a03'
      }
    },
    yellow: {
      description: "Jaune lumineux et optimiste",
      usage: "Mises en surbrillance, notifications, éléments joyeux",
      shades: {
        50: '#fefce8', 100: '#fef9c3', 200: '#fef08a', 300: '#fde047', 400: '#facc15',
        500: '#eab308', 600: '#ca8a04', 700: '#a16207', 800: '#854d0e', 900: '#713f12', 950: '#422006'
      }
    },
    lime: {
      description: "Vert lime vif et énergique",
      usage: "Éléments dynamiques, accents vifs, nature",
      shades: {
        50: '#f7fee7', 100: '#ecfccb', 200: '#d9f99d', 300: '#bef264', 400: '#a3e635',
        500: '#84cc16', 600: '#65a30d', 700: '#4d7c0f', 800: '#3f6212', 900: '#365314', 950: '#1a2e05'
      }
    },
    green: {
      description: "Vert naturel et rassurant",
      usage: "Succès, confirmations, éléments écologiques",
      shades: {
        50: '#f0fdf4', 100: '#dcfce7', 200: '#bbf7d0', 300: '#86efac', 400: '#4ade80',
        500: '#22c55e', 600: '#16a34a', 700: '#15803d', 800: '#166534', 900: '#14532d', 950: '#052e16'
      }
    },
    emerald: {
      description: "Émeraude élégant et premium",
      usage: "Éléments premium, succès, nature luxueuse",
      shades: {
        50: '#ecfdf5', 100: '#d1fae5', 200: '#a7f3d0', 300: '#6ee7b7', 400: '#34d399',
        500: '#10b981', 600: '#059669', 700: '#047857', 800: '#065f46', 900: '#064e3b', 950: '#022c22'
      }
    },
    teal: {
      description: "Bleu-vert équilibré et apaisant",
      usage: "Interfaces médicales, wellness, équilibre",
      shades: {
        50: '#f0fdfa', 100: '#ccfbf1', 200: '#99f6e4', 300: '#5eead4', 400: '#2dd4bf',
        500: '#14b8a6', 600: '#0d9488', 700: '#0f766e', 800: '#115e59', 900: '#134e4a', 950: '#042f2e'
      }
    },
    cyan: {
      description: "Cyan frais et technologique",
      usage: "Technologie, innovation, éléments digitaux",
      shades: {
        50: '#ecfeff', 100: '#cffafe', 200: '#a5f3fc', 300: '#67e8f9', 400: '#22d3ee',
        500: '#06b6d4', 600: '#0891b2', 700: '#0e7490', 800: '#155e75', 900: '#164e63', 950: '#083344'
      }
    },
    sky: {
      description: "Bleu ciel lumineux et ouvert",
      usage: "Espaces ouverts, liberté, air et espace",
      shades: {
        50: '#f0f9ff', 100: '#e0f2fe', 200: '#bae6fd', 300: '#7dd3fc', 400: '#38bdf8',
        500: '#0ea5e9', 600: '#0284c7', 700: '#0369a1', 800: '#075985', 900: '#0c4a6e', 950: '#082f49'
      }
    },
    blue: {
      description: "Bleu classique et fiable",
      usage: "Liens, boutons primaires, éléments de confiance",
      shades: {
        50: '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe', 300: '#93c5fd', 400: '#60a5fa',
        500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8', 800: '#1e40af', 900: '#1e3a8a', 950: '#172554'
      }
    },
    indigo: {
      description: "Indigo profond et mystique",
      usage: "Éléments premium, spiritualité, profondeur",
      shades: {
        50: '#eef2ff', 100: '#e0e7ff', 200: '#c7d2fe', 300: '#a5b4fc', 400: '#818cf8',
        500: '#6366f1', 600: '#4f46e5', 700: '#4338ca', 800: '#3730a3', 900: '#312e81', 950: '#1e1b4b'
      }
    },
    violet: {
      description: "Violet créatif et inspirant",
      usage: "Créativité, art, inspiration, innovation",
      shades: {
        50: '#f5f3ff', 100: '#ede9fe', 200: '#ddd6fe', 300: '#c4b5fd', 400: '#a78bfa',
        500: '#8b5cf6', 600: '#7c3aed', 700: '#6d28d9', 800: '#5b21b6', 900: '#4c1d95', 950: '#2e1065'
      }
    },
    purple: {
      description: "Violet créatif et mystérieux",
      usage: "Éléments créatifs, premium, innovation",
      shades: {
        50: '#faf5ff', 100: '#f3e8ff', 200: '#e9d5ff', 300: '#d8b4fe', 400: '#c084fc',
        500: '#a855f7', 600: '#9333ea', 700: '#7e22ce', 800: '#6b21a8', 900: '#581c87', 950: '#3b0764'
      }
    },
    fuchsia: {
      description: "Fuchsia vibrant et moderne",
      usage: "Éléments mode, créativité, modernité",
      shades: {
        50: '#fdf4ff', 100: '#fae8ff', 200: '#f5d0fe', 300: '#f0abfc', 400: '#e879f9',
        500: '#d946ef', 600: '#c026d3', 700: '#a21caf', 800: '#86198f', 900: '#701a75', 950: '#4a044e'
      }
    },
    pink: {
      description: "Rose doux et moderne",
      usage: "Éléments féminins, créatifs, accents doux",
      shades: {
        50: '#fdf2f8', 100: '#fce7f3', 200: '#fbcfe8', 300: '#f9a8d4', 400: '#f472b6',
        500: '#ec4899', 600: '#db2777', 700: '#be185d', 800: '#9d174d', 900: '#831843', 950: '#500724'
      }
    },
    rose: {
      description: "Rose naturel et élégant",
      usage: "Élégance, nature, douceur, romantisme",
      shades: {
        50: '#fff1f2', 100: '#ffe4e6', 200: '#fecdd3', 300: '#fda4af', 400: '#fb7185',
        500: '#f43f5e', 600: '#e11d48', 700: '#be123c', 800: '#9f1239', 900: '#881337', 950: '#4c0519'
      }
    }
  }

  // Filtrer les couleurs selon la recherche
  const filteredColors = Object.entries(TAILWIND_COLORS).filter(([colorName]) =>
    colorName.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
      <div className="max-w-6xl mx-auto space-y-8">
        {/* En-tête */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Couleurs Tailwind CSS</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Guide complet des couleurs Tailwind CSS avec exemples de code et conseils d&apos;utilisation.
          </p>
        </div>

        {/* Recherche */}
        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher une couleur (ex: blue, red, slate...)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Navigation par nuances */}
        <Card>
          <CardHeader>
            <CardTitle>Sélecteur de nuance</CardTitle>
            <CardDescription>Cliquez sur une nuance pour voir toutes les couleurs de cette intensité</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {(['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'] as const).map((shade: '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | '950') => (
                <Button
                  key={shade}
                  variant={selectedShade === shade ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedShade(shade)}
                >
                  {shade}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Aperçu de la nuance sélectionnée */}
        {selectedShade && (
          <Card>
            <CardHeader>
              <CardTitle>Nuance {selectedShade}</CardTitle>
              <CardDescription>Toutes les couleurs en nuance {selectedShade}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-3">
                {filteredColors.map(([colorName, colorData]) => {
                  const hexValue = colorData.shades[selectedShade]
                  if (!hexValue) return null

                  return (
                    <div
                      key={`${colorName}-${selectedShade}`}
                      className="group relative aspect-square rounded-lg border cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg"
                      style={{ backgroundColor: hexValue }}
                      onClick={() => copyToClipboard(hexValue, `${colorName}-${selectedShade}-hex`)}
                      title={`${colorName}-${selectedShade}: ${hexValue}`}
                    >
                      <div className="absolute inset-0 rounded-lg bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-center">
                          <div
                            className="text-xs font-medium"
                            style={{ color: getTextColor(hexValue) }}
                          >
                            {colorName}
                          </div>
                          {copied === `${colorName}-${selectedShade}-hex` ? (
                            <CheckIcon className="h-4 w-4 mx-auto mt-1" style={{ color: getTextColor(hexValue) }} />
                          ) : (
                            <CopyIcon className="h-4 w-4 mx-auto mt-1" style={{ color: getTextColor(hexValue) }} />
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Grille détaillée des couleurs */}
        <div className="space-y-8">
          {filteredColors.map(([colorName, colorData]) => (
            <Card key={colorName}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="capitalize text-xl">{colorName}</CardTitle>
                    <CardDescription className="mt-1">{colorData.description}</CardDescription>
                    <Badge variant="outline" className="mt-2">{colorData.usage}</Badge>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.location.href = `/converter?color=${colorData.shades['500'].replace('#', '')}`}
                  >
                    <PaletteIcon className="h-4 w-4 mr-2" />
                    Analyser
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Palette de couleurs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-2">
                  {Object.entries(colorData.shades).map(([shade, hexValue]) => (
                    <div key={shade} className="space-y-2">
                      <div
                        className="group relative aspect-square rounded-lg border cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg"
                        style={{ backgroundColor: hexValue }}
                        onClick={() => copyToClipboard(hexValue, `${colorName}-${shade}-detail`)}
                        title={`Copier ${hexValue}`}
                      >
                        <div className="absolute inset-0 rounded-lg bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                          {copied === `${colorName}-${shade}-detail` ? (
                            <CheckIcon className="h-4 w-4" style={{ color: getTextColor(hexValue) }} />
                          ) : (
                            <CopyIcon className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ color: getTextColor(hexValue) }} />
                          )}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs font-medium">{shade}</div>
                        <div className="text-xs text-muted-foreground font-mono">{hexValue}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Exemples de code */}
                <Tabs defaultValue="tailwind" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="tailwind">Tailwind</TabsTrigger>
                    <TabsTrigger value="css">CSS</TabsTrigger>
                    <TabsTrigger value="react">React</TabsTrigger>
                  </TabsList>

                  <TabsContent value="tailwind" className="space-y-2">
                    <Label>Classes Tailwind populaires</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {['500', '600', '700'].map((shade) => (
                        <div key={shade} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <code className="text-sm">bg-{colorName}-{shade}</code>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => copyToClipboard(`bg-${colorName}-${shade}`, `class-${colorName}-${shade}`)}
                          >
                            {copied === `class-${colorName}-${shade}` ? (
                              <CheckIcon className="h-3 w-3 text-green-600" />
                            ) : (
                              <CopyIcon className="h-3 w-3" />
                            )}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="css" className="space-y-2">
                    <Label>Variables CSS</Label>
                    <div className="relative">
                      <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                        <code>{`:root {
  --${colorName}-50: ${colorData.shades['50']};
  --${colorName}-500: ${colorData.shades['500']};
  --${colorName}-900: ${colorData.shades['900']};
}`}</code>
                      </pre>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 h-6 w-6"
                        onClick={() => copyToClipboard(`:root {\n  --${colorName}-50: ${colorData.shades['50']};\n  --${colorName}-500: ${colorData.shades['500']};\n  --${colorName}-900: ${colorData.shades['900']};\n}`, `css-vars-${colorName}`)}
                      >
                        {copied === `css-vars-${colorName}` ? (
                          <CheckIcon className="h-3 w-3 text-green-600" />
                        ) : (
                          <CopyIcon className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="react" className="space-y-2">
                    <Label>Composant React</Label>
                    <div className="relative">
                      <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                        <code>{`const ${colorName.charAt(0).toUpperCase() + colorName.slice(1)}Button = () => (
  <button className="bg-${colorName}-500 hover:bg-${colorName}-600 text-white px-4 py-2 rounded">
    Bouton ${colorName}
  </button>
)`}</code>
                      </pre>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 h-6 w-6"
                        onClick={() => copyToClipboard(`const ${colorName.charAt(0).toUpperCase() + colorName.slice(1)}Button = () => (\n  <button className="bg-${colorName}-500 hover:bg-${colorName}-600 text-white px-4 py-2 rounded">\n    Bouton ${colorName}\n  </button>\n)`, `react-${colorName}`)}
                      >
                        {copied === `react-${colorName}` ? (
                          <CheckIcon className="h-3 w-3 text-green-600" />
                        ) : (
                          <CopyIcon className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Guide d'utilisation */}
        <Card>
          <CardHeader>
            <CardTitle>Guide d&apos;utilisation</CardTitle>
            <CardDescription>Conseils pour bien utiliser les couleurs Tailwind</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-medium">Nuances recommandées</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li><strong>50-200:</strong> Arrière-plans très clairs</li>
                  <li><strong>300-400:</strong> Bordures et éléments subtils</li>
                  <li><strong>500-600:</strong> Couleurs principales et boutons</li>
                  <li><strong>700-900:</strong> Textes et éléments foncés</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium">Bonnes pratiques</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Utilisez 500 comme couleur de base</li>
                  <li>• 600 pour les états hover</li>
                  <li>• 700+ pour le texte sur fond clair</li>
                  <li>• 50-200 pour les arrière-plans subtils</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
