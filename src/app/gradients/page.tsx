"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { CopyIcon, CheckIcon, RefreshCwIcon, PaletteIcon, RotateCwIcon } from "lucide-react"

export default function GradientsPage() {
  const [startColor, setStartColor] = useState("#3b82f6")
  const [endColor, setEndColor] = useState("#8b5cf6")
  const [gradientType, setGradientType] = useState("linear")
  const [direction, setDirection] = useState(45)
  const [stops, setStops] = useState([0, 100])
  const [copied, setCopied] = useState<string | null>(null)

  // Types de dégradés
  const gradientTypes = {
    linear: { name: "Linéaire", icon: "→" },
    radial: { name: "Radial", icon: "◉" },
    conic: { name: "Conique", icon: "⭕" }
  }

  // Directions prédéfinies pour les dégradés linéaires
  const directions = {
    0: "Vers le haut",
    45: "Vers le haut-droite",
    90: "Vers la droite",
    135: "Vers le bas-droite",
    180: "Vers le bas",
    225: "Vers le bas-gauche",
    270: "Vers la gauche",
    315: "Vers le haut-gauche"
  }

  // Dégradés prédéfinis populaires
  const presetGradients = [
    { name: "Sunset", start: "#ff7e5f", end: "#feb47b", direction: 45 },
    { name: "Ocean", start: "#2E3192", end: "#1BFFFF", direction: 45 },
    { name: "Forest", start: "#134E5E", end: "#71B280", direction: 135 },
    { name: "Purple Rain", start: "#8B2AC0", end: "#F15BB5", direction: 90 },
    { name: "Sunrise", start: "#FFB75E", end: "#ED8F03", direction: 0 },
    { name: "Midnight", start: "#232526", end: "#414345", direction: 180 },
    { name: "Cherry", start: "#EB3349", end: "#F45C43", direction: 45 },
    { name: "Emerald", start: "#348F50", end: "#56B4D3", direction: 135 }
  ]

  // Générer le CSS du dégradé
  const generateGradientCSS = () => {
    switch (gradientType) {
      case "linear":
        return `linear-gradient(${direction}deg, ${startColor} ${stops[0]}%, ${endColor} ${stops[1]}%)`
      case "radial":
        return `radial-gradient(circle, ${startColor} ${stops[0]}%, ${endColor} ${stops[1]}%)`
      case "conic":
        return `conic-gradient(from ${direction}deg, ${startColor} ${stops[0]}%, ${endColor} ${stops[1]}%)`
      default:
        return `linear-gradient(${direction}deg, ${startColor}, ${endColor})`
    }
  }

  // Générer du code Tailwind (approximatif)
  const generateTailwindClasses = () => {
    const directionClass = {
      0: "bg-gradient-to-t",
      45: "bg-gradient-to-tr",
      90: "bg-gradient-to-r",
      135: "bg-gradient-to-br",
      180: "bg-gradient-to-b",
      225: "bg-gradient-to-bl",
      270: "bg-gradient-to-l",
      315: "bg-gradient-to-tl"
    }[direction] || "bg-gradient-to-r"

    return `${directionClass} from-blue-500 to-purple-600`
  }

  // Copier dans le presse-papiers
  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  // Générer des couleurs aléatoires
  const generateRandomGradient = () => {
    const randomColor1 = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')
    const randomColor2 = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')
    const randomDirection = Object.keys(directions)[Math.floor(Math.random() * Object.keys(directions).length)]

    setStartColor(randomColor1)
    setEndColor(randomColor2)
    setDirection(parseInt(randomDirection))
  }

  // Appliquer un preset
  const applyPreset = (preset: typeof presetGradients[0]) => {
    setStartColor(preset.start)
    setEndColor(preset.end)
    setDirection(preset.direction)
    setGradientType("linear")
  }

  // Inverser les couleurs
  const swapColors = () => {
    const temp = startColor
    setStartColor(endColor)
    setEndColor(temp)
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* En-tête */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Générateur de dégradés</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Créez des dégradés CSS magnifiques en quelques clics. Explorez différents types, directions et effets.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contrôles */}
          <div className="lg:col-span-1 space-y-6">
            {/* Couleurs */}
            <Card>
              <CardHeader>
                <CardTitle>Couleurs</CardTitle>
                <CardDescription>Définissez les couleurs de votre dégradé</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Label>Couleur de début</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={startColor}
                      onChange={(e) => setStartColor(e.target.value)}
                      className="w-16 h-10 p-1 rounded"
                    />
                    <Input
                      value={startColor}
                      onChange={(e) => setStartColor(e.target.value)}
                      className="font-mono"
                    />
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={swapColors}
                    title="Inverser les couleurs"
                  >
                    <RotateCwIcon className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-3">
                  <Label>Couleur de fin</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={endColor}
                      onChange={(e) => setEndColor(e.target.value)}
                      className="w-16 h-10 p-1 rounded"
                    />
                    <Input
                      value={endColor}
                      onChange={(e) => setEndColor(e.target.value)}
                      className="font-mono"
                    />
                  </div>
                </div>

                <Button
                  variant="outline"
                  onClick={generateRandomGradient}
                  className="w-full"
                >
                  <RefreshCwIcon className="h-4 w-4 mr-2" />
                  Couleurs aléatoires
                </Button>
              </CardContent>
            </Card>

            {/* Type et direction */}
            <Card>
              <CardHeader>
                <CardTitle>Configuration</CardTitle>
                <CardDescription>Type et direction du dégradé</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Type de dégradé */}
                <div className="space-y-3">
                  <Label>Type de dégradé</Label>
                  <div className="grid grid-cols-1 gap-2">
                    {Object.entries(gradientTypes).map(([key, type]) => (
                      <Button
                        key={key}
                        variant={gradientType === key ? "default" : "outline"}
                        className="justify-start"
                        onClick={() => setGradientType(key)}
                      >
                        <span className="mr-2">{type.icon}</span>
                        {type.name}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Direction */}
                {gradientType === "linear" && (
                  <div className="space-y-3">
                    <Label>Direction ({direction}°)</Label>
                    <Slider
                      value={[direction]}
                      onValueChange={(value) => setDirection(value[0])}
                      max={360}
                      min={0}
                      step={15}
                      className="w-full"
                    />
                    <div className="grid grid-cols-2 gap-1 text-xs">
                      {Object.entries(directions).map(([deg, label]) => (
                        <Button
                          key={deg}
                          variant={direction === parseInt(deg) ? "default" : "ghost"}
                          size="sm"
                          className="text-xs h-8"
                          onClick={() => setDirection(parseInt(deg))}
                        >
                          {label}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Position des arrêts */}
                <div className="space-y-3">
                  <Label>Position des arrêts</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-xs">Début (%)</Label>
                      <Input
                        type="number"
                        value={stops[0]}
                        onChange={(e) => setStops([parseInt(e.target.value) || 0, stops[1]])}
                        min={0}
                        max={100}
                        className="text-xs"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Fin (%)</Label>
                      <Input
                        type="number"
                        value={stops[1]}
                        onChange={(e) => setStops([stops[0], parseInt(e.target.value) || 100])}
                        min={0}
                        max={100}
                        className="text-xs"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Presets */}
            <Card>
              <CardHeader>
                <CardTitle>Dégradés populaires</CardTitle>
                <CardDescription>Sélectionnez un dégradé prédéfini</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {presetGradients.map((preset) => (
                    <Button
                      key={preset.name}
                      variant="outline"
                      className="h-16 p-2 flex flex-col items-center justify-center relative overflow-hidden"
                      onClick={() => applyPreset(preset)}
                    >
                      <div
                        className="absolute inset-0 opacity-30"
                        style={{
                          background: `linear-gradient(${preset.direction}deg, ${preset.start}, ${preset.end})`
                        }}
                      />
                      <span className="relative text-xs font-medium">{preset.name}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Prévisualisation et résultats */}
          <div className="lg:col-span-2 space-y-6">
            {/* Grande prévisualisation */}
            <Card>
              <CardHeader>
                <CardTitle>Prévisualisation</CardTitle>
                <CardDescription>Votre dégradé en temps réel</CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className="w-full h-64 rounded-lg border-2 shadow-inner"
                  style={{ background: generateGradientCSS() }}
                />
              </CardContent>
            </Card>

            {/* Code généré */}
            <Card>
              <CardHeader>
                <CardTitle>Code généré</CardTitle>
                <CardDescription>Copiez le code dans vos projets</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="css" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="css">CSS</TabsTrigger>
                    <TabsTrigger value="tailwind">Tailwind</TabsTrigger>
                    <TabsTrigger value="react">React</TabsTrigger>
                    <TabsTrigger value="scss">SCSS</TabsTrigger>
                  </TabsList>

                  <TabsContent value="css" className="space-y-3">
                    <Label>CSS pur</Label>
                    <div className="relative">
                      <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                        <code>{`.gradient {
  background: ${generateGradientCSS()};
}`}</code>
                      </pre>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 h-6 w-6"
                        onClick={() => copyToClipboard(`background: ${generateGradientCSS()};`, "css")}
                      >
                        {copied === "css" ? (
                          <CheckIcon className="h-3 w-3 text-green-600" />
                        ) : (
                          <CopyIcon className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="tailwind" className="space-y-3">
                    <Label>Classes Tailwind (approximatif)</Label>
                    <div className="relative">
                      <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                        <code>{`<div class="${generateTailwindClasses()}">
  Contenu
</div>`}</code>
                      </pre>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 h-6 w-6"
                        onClick={() => copyToClipboard(generateTailwindClasses(), "tailwind")}
                      >
                        {copied === "tailwind" ? (
                          <CheckIcon className="h-3 w-3 text-green-600" />
                        ) : (
                          <CopyIcon className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="react" className="space-y-3">
                    <Label>Style React</Label>
                    <div className="relative">
                      <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                        <code>{`const gradientStyle = {
  background: '${generateGradientCSS()}'
}

<div style={gradientStyle}>
  Contenu
</div>`}</code>
                      </pre>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 h-6 w-6"
                        onClick={() => copyToClipboard(`background: '${generateGradientCSS()}'`, "react")}
                      >
                        {copied === "react" ? (
                          <CheckIcon className="h-3 w-3 text-green-600" />
                        ) : (
                          <CopyIcon className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="scss" className="space-y-3">
                    <Label>SCSS avec mixins</Label>
                    <div className="relative">
                      <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                        <code>{`$gradient-start: ${startColor};
$gradient-end: ${endColor};

@mixin gradient-bg {
  background: ${generateGradientCSS()};
}

.element {
  @include gradient-bg;
}`}</code>
                      </pre>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 h-6 w-6"
                        onClick={() => copyToClipboard(`$gradient-start: ${startColor};\n$gradient-end: ${endColor};\n\n@mixin gradient-bg {\n  background: ${generateGradientCSS()};\n}`, "scss")}
                      >
                        {copied === "scss" ? (
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

            {/* Exemples d'utilisation */}
            <Card>
              <CardHeader>
                <CardTitle>Exemples d&apos;utilisation</CardTitle>
                <CardDescription>Voyez votre dégradé appliqué à différents éléments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Boutons */}
                <div className="space-y-2">
                  <Label>Boutons</Label>
                  <div className="flex gap-3">
                    <button
                      className="px-6 py-3 rounded-lg text-white font-medium transition-transform hover:scale-105"
                      style={{ background: generateGradientCSS() }}
                    >
                      Bouton principal
                    </button>
                    <button
                      className="px-6 py-3 rounded-full text-white font-medium transition-transform hover:scale-105"
                      style={{ background: generateGradientCSS() }}
                    >
                      Bouton rond
                    </button>
                  </div>
                </div>

                {/* Cartes */}
                <div className="space-y-2">
                  <Label>Carte</Label>
                  <div
                    className="p-6 rounded-lg text-white"
                    style={{ background: generateGradientCSS() }}
                  >
                    <h3 className="text-xl font-bold mb-2">Titre de la carte</h3>
                    <p className="opacity-90">
                      Contenu de la carte avec votre dégradé personnalisé en arrière-plan.
                    </p>
                    <button className="mt-4 bg-white bg-opacity-20 px-4 py-2 rounded text-white">
                      Action
                    </button>
                  </div>
                </div>

                {/* Texte avec dégradé */}
                <div className="space-y-2">
                  <Label>Texte avec dégradé</Label>
                  <h2
                    className="text-4xl font-bold bg-clip-text text-transparent"
                    style={{
                      backgroundImage: generateGradientCSS(),
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}
                  >
                    Texte dégradé
                  </h2>
                </div>

                {/* Bordure avec dégradé */}
                <div className="space-y-2">
                  <Label>Bordure dégradée</Label>
                  <div className="p-1 rounded-lg" style={{ background: generateGradientCSS() }}>
                    <div className="bg-background p-4 rounded-md">
                      <p>Contenu avec bordure dégradée</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions rapides */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-wrap gap-2">
                  <Button
                    onClick={() => copyToClipboard(generateGradientCSS(), "quick-css")}
                  >
                    {copied === "quick-css" ? <CheckIcon className="h-4 w-4 mr-2" /> : <CopyIcon className="h-4 w-4 mr-2" />}
                    Copier CSS rapide
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => window.location.href = `/converter?color=${startColor.replace('#', '')}`}
                  >
                    <PaletteIcon className="h-4 w-4 mr-2" />
                    Analyser couleur début
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => window.location.href = `/converter?color=${endColor.replace('#', '')}`}
                  >
                    <PaletteIcon className="h-4 w-4 mr-2" />
                    Analyser couleur fin
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Guide d'utilisation */}
        <Card>
          <CardHeader>
            <CardTitle>Guide des dégradés</CardTitle>
            <CardDescription>Conseils pour créer de beaux dégradés</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <h4 className="font-medium">Types de dégradés</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li><strong>Linéaire:</strong> Transition en ligne droite</li>
                  <li><strong>Radial:</strong> Transition circulaire du centre</li>
                  <li><strong>Conique:</strong> Transition en rotation</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Bonnes pratiques</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Utilisez des couleurs harmonieuses</li>
                  <li>• Évitez les contrastes trop forts</li>
                  <li>• Testez la lisibilité du texte</li>
                  <li>• Considérez l&apos;accessibilité</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Cas d&apos;usage</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Arrière-plans de hero sections</li>
                  <li>• Boutons et éléments d&apos;action</li>
                  <li>• Cartes et composants</li>
                  <li>• Effets de texte créatifs</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
