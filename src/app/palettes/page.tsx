"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CopyIcon, CheckIcon, PaletteIcon, HeartIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export default function PalettesPage() {
  const [copied, setCopied] = useState<string | null>(null)
  const [favorites, setFavorites] = useState<string[]>([])

  // Palettes prédéfinies organisées par catégories
  const palettes = {
    trending: [
      {
        id: "modern-sunset",
        name: "Coucher de soleil moderne",
        description: "Palette chaleureuse inspirée des couchers de soleil urbains",
        colors: ["#FF6B6B", "#FFE66D", "#FF8E53", "#C7CEEA", "#6BCF7F"],
        tags: ["moderne", "chaleureux", "vibrant"]
      },
      {
        id: "ocean-breeze",
        name: "Brise océanique",
        description: "Fraîcheur et sérénité des profondeurs marines",
        colors: ["#006BA6", "#0496FF", "#FFBC42", "#D81159", "#8F2D56"],
        tags: ["frais", "océan", "professionnel"]
      },
      {
        id: "forest-harmony",
        name: "Harmonie forestière",
        description: "Tons naturels et apaisants de la forêt",
        colors: ["#2D5016", "#61892F", "#86C232", "#C5E1A5", "#F8FFE5"],
        tags: ["naturel", "apaisant", "bio"]
      }
    ],
    minimalist: [
      {
        id: "mono-elegance",
        name: "Élégance monochrome",
        description: "Sophistication en noir et blanc avec touches subtiles",
        colors: ["#000000", "#333333", "#666666", "#CCCCCC", "#FFFFFF"],
        tags: ["minimal", "élégant", "intemporel"]
      },
      {
        id: "soft-pastels",
        name: "Pastels doux",
        description: "Douceur et subtilité pour des designs délicats",
        colors: ["#F8F4F0", "#E8DDD4", "#D0B8A8", "#A8918B", "#8B7D77"],
        tags: ["pastel", "doux", "féminin"]
      },
      {
        id: "clean-corporate",
        name: "Corporate épuré",
        description: "Palette professionnelle pour entreprises modernes",
        colors: ["#1A237E", "#3949AB", "#5C6BC0", "#9FA8DA", "#E8EAF6"],
        tags: ["professionnel", "corporate", "fiable"]
      }
    ],
    vibrant: [
      {
        id: "neon-nights",
        name: "Nuits néon",
        description: "Énergie électrique des villes la nuit",
        colors: ["#FF0080", "#7928CA", "#0070F3", "#00DFD8", "#7FFF00"],
        tags: ["néon", "électrique", "moderne"]
      },
      {
        id: "tropical-paradise",
        name: "Paradis tropical",
        description: "Couleurs vives des îles tropicales",
        colors: ["#FF6B35", "#F7931E", "#FFD23F", "#06FFA5", "#4ECDC4"],
        tags: ["tropical", "vif", "exotique"]
      },
      {
        id: "retro-wave",
        name: "Vague rétro",
        description: "Nostalgie des années 80 en couleurs",
        colors: ["#FF006E", "#8338EC", "#3A86FF", "#06FFA5", "#FFBE0B"],
        tags: ["rétro", "80s", "synthwave"]
      }
    ],
    nature: [
      {
        id: "autumn-leaves",
        name: "Feuilles d'automne",
        description: "Chaleur et richesse des couleurs automnales",
        colors: ["#8B4513", "#CD853F", "#DAA520", "#B22222", "#228B22"],
        tags: ["automne", "naturel", "chaleureux"]
      },
      {
        id: "spring-bloom",
        name: "Floraison printanière",
        description: "Fraîcheur et renaissance du printemps",
        colors: ["#98FB98", "#90EE90", "#FFB6C1", "#F0E68C", "#DDA0DD"],
        tags: ["printemps", "floral", "frais"]
      },
      {
        id: "mountain-peak",
        name: "Sommet montagneux",
        description: "Majesté et pureté des hautes montagnes",
        colors: ["#2F4F4F", "#708090", "#B0C4DE", "#F5F5DC", "#FFFAFA"],
        tags: ["montagne", "majestueux", "pur"]
      }
    ]
  }

  const allPalettes = Object.values(palettes).flat()

  // Fonction pour copier une palette
  const copyPalette = (palette: { id: string; name: string; colors: string[]; tags: string[] }, format: 'hex' | 'css' | 'tailwind') => {
    let text = ""

    switch (format) {
      case 'hex':
        text = palette.colors.join(", ")
        break
      case 'css':
        text = `/* ${palette.name} */\n:root {\n${palette.colors.map((color, index) => `  --color-${index + 1}: ${color};`).join('\n')}\n}`
        break
      case 'tailwind':
        text = `// ${palette.name}\ncolors: {\n${palette.colors.map((color, index) => `  'palette-${index + 1}': '${color}',`).join('\n')}\n}`
        break
    }

    navigator.clipboard.writeText(text)
    setCopied(`${palette.id}-${format}`)
    setTimeout(() => setCopied(null), 2000)
  }

  // Fonction pour copier une couleur individuelle
  const copyColor = (color: string, paletteId: string, colorIndex: number) => {
    navigator.clipboard.writeText(color)
    setCopied(`${paletteId}-color-${colorIndex}`)
    setTimeout(() => setCopied(null), 2000)
  }

  // Gestion des favoris
  const toggleFavorite = (paletteId: string) => {
    setFavorites(prev =>
      prev.includes(paletteId)
        ? prev.filter(id => id !== paletteId)
        : [...prev, paletteId]
    )
  }

  const CategorySection = ({ title, description, palettes }: {
    title: string,
    description: string,
    palettes: Array<{
      id: string;
      name: string;
      description: string;
      colors: string[];
      tags: string[];
    }>
  }) => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {palettes.map((palette) => (
          <Card key={palette.id} className="group hover:shadow-lg transition-all duration-200">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{palette.name}</CardTitle>
                  <CardDescription className="mt-1">{palette.description}</CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleFavorite(palette.id)}
                  className="opacity-50 group-hover:opacity-100 transition-opacity"
                >
                  <HeartIcon
                    className={cn(
                      "h-4 w-4",
                      favorites.includes(palette.id) ? "fill-red-500 text-red-500" : ""
                    )}
                  />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Palette de couleurs */}
              <div className="flex h-16 rounded-lg overflow-hidden border">
                {palette.colors.map((color, index) => (
                  <button
                    key={index}
                    className="flex-1 relative group/color hover:scale-105 transition-transform duration-200"
                    style={{ backgroundColor: color }}
                    onClick={() => copyColor(color, palette.id, index)}
                    title={`Copier ${color}`}
                  >
                    <div className="absolute inset-0 bg-opacity-0 group-hover/color:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                      <div className="opacity-0 group-hover/color:opacity-100 transition-opacity duration-200">
                        {copied === `${palette.id}-color-${index}` ? (
                          <CheckIcon className="h-4 w-4 text-white" />
                        ) : (
                          <CopyIcon className="h-4 w-4 text-white" />
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {palette.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyPalette(palette, 'hex')}
                  className="flex-1"
                >
                  {copied === `${palette.id}-hex` ? (
                    <CheckIcon className="h-3 w-3 mr-1" />
                  ) : (
                    <CopyIcon className="h-3 w-3 mr-1" />
                  )}
                  HEX
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyPalette(palette, 'css')}
                  className="flex-1"
                >
                  {copied === `${palette.id}-css` ? (
                    <CheckIcon className="h-3 w-3 mr-1" />
                  ) : (
                    <CopyIcon className="h-3 w-3 mr-1" />
                  )}
                  CSS
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyPalette(palette, 'tailwind')}
                  className="flex-1"
                >
                  {copied === `${palette.id}-tailwind` ? (
                    <CheckIcon className="h-3 w-3 mr-1" />
                  ) : (
                    <PaletteIcon className="h-3 w-3 mr-1" />
                  )}
                  TW
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* En-tête */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Palettes prédéfinies</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Découvrez notre collection de palettes de couleurs soigneusement sélectionnées pour vos projets créatifs.
          </p>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{allPalettes.length}</div>
              <p className="text-xs text-muted-foreground">Palettes disponibles</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{allPalettes.reduce((acc, p) => acc + p.colors.length, 0)}</div>
              <p className="text-xs text-muted-foreground">Couleurs au total</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{Object.keys(palettes).length}</div>
              <p className="text-xs text-muted-foreground">Catégories</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{favorites.length}</div>
              <p className="text-xs text-muted-foreground">Favoris</p>
            </CardContent>
          </Card>
        </div>

        {/* Sections de palettes */}
        <CategorySection
          title="Tendances"
          description="Les palettes les plus populaires du moment"
          palettes={palettes.trending}
        />

        <CategorySection
          title="Minimaliste"
          description="Élégance et simplicité pour des designs épurés"
          palettes={palettes.minimalist}
        />

        <CategorySection
          title="Vibrant"
          description="Couleurs vives et énergiques pour des projets audacieux"
          palettes={palettes.vibrant}
        />

        <CategorySection
          title="Nature"
          description="Inspirées par les couleurs naturelles et organiques"
          palettes={palettes.nature}
        />

        {/* Guide d'utilisation */}
        <Card>
          <CardHeader>
            <CardTitle>Comment utiliser ces palettes</CardTitle>
            <CardDescription>Conseils pour intégrer ces couleurs dans vos projets</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium">1. Cliquez sur une couleur</h4>
                <p className="text-sm text-muted-foreground">
                  Cliquez sur n&apos;importe quelle couleur pour copier sa valeur HEX
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">2. Exportez la palette</h4>
                <p className="text-sm text-muted-foreground">
                  Utilisez les boutons HEX, CSS ou TW pour exporter toute la palette
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">3. Marquez vos favoris</h4>
                <p className="text-sm text-muted-foreground">
                  Cliquez sur le cœur pour sauvegarder vos palettes préférées
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
