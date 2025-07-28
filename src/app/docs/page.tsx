"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { CodeIcon, BookOpenIcon, PlayIcon, ExternalLinkIcon, CopyIcon, CheckIcon } from "lucide-react"
import { useState } from "react"
import Link from "next/link";

export default function DocsPage() {
  const [copied, setCopied] = useState<string | null>(null)

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* En-tête */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Documentation</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Guide complet pour utiliser Colorizer et maîtriser tous ses outils de couleurs.
          </p>
        </div>

        {/* Navigation rapide */}
        <Card>
          <CardHeader>
            <CardTitle>Navigation rapide</CardTitle>
            <CardDescription>Accédez directement à ce qui vous intéresse</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="justify-start h-auto p-4" asChild>
                <a href="#getting-started">
                  <PlayIcon className="h-4 w-4 mr-2" />
                  <div className="text-left">
                    <div className="font-medium">Démarrage rapide</div>
                    <div className="text-xs text-muted-foreground">Premiers pas</div>
                  </div>
                </a>
              </Button>
              <Button variant="outline" className="justify-start h-auto p-4" asChild>
                <a href="#tools">
                  <CodeIcon className="h-4 w-4 mr-2" />
                  <div className="text-left">
                    <div className="font-medium">Outils</div>
                    <div className="text-xs text-muted-foreground">Guide des fonctionnalités</div>
                  </div>
                </a>
              </Button>
              <Button variant="outline" className="justify-start h-auto p-4" asChild>
                <a href="#api">
                  <BookOpenIcon className="h-4 w-4 mr-2" />
                  <div className="text-left">
                    <div className="font-medium">API & Intégration</div>
                    <div className="text-xs text-muted-foreground">Pour les développeurs</div>
                  </div>
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Démarrage rapide */}
        <section id="getting-started">
          <Card>
            <CardHeader>
              <CardTitle>🚀 Démarrage rapide</CardTitle>
              <CardDescription>Découvrez Colorizer en 3 étapes simples</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto">
                    <span className="text-blue-600 font-bold">1</span>
                  </div>
                  <h3 className="font-medium">Choisissez votre outil</h3>
                  <p className="text-sm text-muted-foreground">
                    Convertisseur, sélecteur, générateur d&apos;harmonies... Chaque outil a son usage.
                  </p>
                </div>
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                    <span className="text-green-600 font-bold">2</span>
                  </div>
                  <h3 className="font-medium">Explorez et créez</h3>
                  <p className="text-sm text-muted-foreground">
                    Ajustez les paramètres, testez différentes combinaisons, laissez libre cours à votre créativité.
                  </p>
                </div>
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto">
                    <span className="text-purple-600 font-bold">3</span>
                  </div>
                  <h3 className="font-medium">Exportez et utilisez</h3>
                  <p className="text-sm text-muted-foreground">
                    Copiez le code CSS, Tailwind ou les valeurs HEX directement dans vos projets.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Guide des outils */}
        <section id="tools">
          <Card>
            <CardHeader>
              <CardTitle>🛠️ Guide des outils</CardTitle>
              <CardDescription>Maîtrisez chaque fonctionnalité de Colorizer</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="converter" className="w-full">
                <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
                  <TabsTrigger value="converter">Convertisseur</TabsTrigger>
                  <TabsTrigger value="picker">Sélecteur</TabsTrigger>
                  <TabsTrigger value="patterns">Motifs</TabsTrigger>
                  <TabsTrigger value="harmony">Harmonies</TabsTrigger>
                  <TabsTrigger value="gradients">Dégradés</TabsTrigger>
                  <TabsTrigger value="palettes">Palettes</TabsTrigger>
                </TabsList>

                <TabsContent value="converter" className="space-y-4">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Convertisseur de couleurs</h3>
                    <p className="text-muted-foreground">
                      Convertissez instantanément entre HEX, RGB, HSL, CMYK et trouvez les équivalents Tailwind CSS.
                    </p>

                    <div className="space-y-3">
                      <h4 className="font-medium">Fonctionnalités principales :</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Conversion temps réel entre tous les formats</li>
                        <li>• Détection automatique de la couleur Tailwind la plus proche</li>
                        <li>• Export en CSS, variables, JavaScript</li>
                        <li>• Historique des couleurs utilisées</li>
                        <li>• Partage via URL avec paramètre ?color=</li>
                      </ul>
                    </div>

                    <div className="bg-muted p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Exemple d&apos;URL de partage :</h4>
                      <code className="text-sm">https://colorizer.com/converter?color=3b82f6</code>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="picker" className="space-y-4">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Sélecteur de couleur</h3>
                    <p className="text-muted-foreground">
                      Interface avancée pour sélectionner et ajuster des couleurs avec précision.
                    </p>

                    <div className="space-y-3">
                      <h4 className="font-medium">Fonctionnalités :</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Roue chromatique interactive</li>
                        <li>• Ajustement de saturation et luminosité</li>
                        <li>• Prévisualisation en temps réel</li>
                        <li>• Pipette pour échantillonner des couleurs</li>
                        <li>• Sauvegarde de favoris</li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="patterns" className="space-y-4">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Motifs Tailwind</h3>
                    <p className="text-muted-foreground">
                      Explorez toute la palette Tailwind CSS avec plus de 240 couleurs organisées.
                    </p>

                    <div className="space-y-3">
                      <h4 className="font-medium">Fonctionnalités :</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• 22 familles de couleurs complètes</li>
                        <li>• Recherche et filtres avancés</li>
                        <li>• Copie rapide des valeurs et classes</li>
                        <li>• Intégration avec le convertisseur</li>
                        <li>• Support des nuances 50 à 950</li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="harmony" className="space-y-4">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Harmonies de couleurs</h3>
                    <p className="text-muted-foreground">
                      Créez des palettes harmonieuses basées sur la théorie des couleurs.
                    </p>

                    <div className="space-y-3">
                      <h4 className="font-medium">Types d&apos;harmonies :</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• <strong>Complémentaire :</strong> Couleurs opposées (contraste fort)</li>
                        <li>• <strong>Triadique :</strong> Trois couleurs équidistantes</li>
                        <li>• <strong>Analogue :</strong> Couleurs adjacentes (harmonie douce)</li>
                        <li>• <strong>Tétradique :</strong> Quatre couleurs en rectangle</li>
                        <li>• <strong>Monochromatique :</strong> Variations d&apos;une seule teinte</li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="gradients" className="space-y-4">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Générateur de dégradés</h3>
                    <p className="text-muted-foreground">
                      Créez des dégradés CSS personnalisés avec contrôle total.
                    </p>

                    <div className="space-y-3">
                      <h4 className="font-medium">Options disponibles :</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• <strong>Types :</strong> Linéaire, Radial, Conique</li>
                        <li>• <strong>Directions :</strong> 8 directions prédéfinies + personnalisé</li>
                        <li>• <strong>Presets :</strong> 8 dégradés populaires</li>
                        <li>• <strong>Export :</strong> CSS, Tailwind, React, SCSS</li>
                        <li>• <strong>Aperçu :</strong> Exemples sur boutons, cartes, textes</li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="palettes" className="space-y-4">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Palettes prédéfinies</h3>
                    <p className="text-muted-foreground">
                      Collection de palettes soigneusement sélectionnées pour vos projets.
                    </p>

                    <div className="space-y-3">
                      <h4 className="font-medium">Catégories :</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• <strong>Tendances :</strong> Palettes modernes et populaires</li>
                        <li>• <strong>Minimaliste :</strong> Designs épurés et élégants</li>
                        <li>• <strong>Vibrant :</strong> Couleurs vives et énergiques</li>
                        <li>• <strong>Nature :</strong> Inspirées par l&apos;environnement naturel</li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </section>

        {/* API et intégration */}
        <section id="api">
          <Card>
            <CardHeader>
              <CardTitle>💻 API & Intégration</CardTitle>
              <CardDescription>Intégrez Colorizer dans vos projets et workflows</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Partage d'URL */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Partage d&apos;URL</h3>
                <p className="text-muted-foreground">
                  Toutes les pages supportent le partage via URL avec paramètres.
                </p>

                <div className="space-y-3">
                  <div className="bg-muted p-3 rounded-lg">
                    <div className="font-medium text-sm mb-1">Convertisseur :</div>
                    <code className="text-xs">/converter?color=3b82f6</code>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 ml-2"
                      onClick={() => copyToClipboard("/converter?color=3b82f6", "converter-url")}
                    >
                      {copied === "converter-url" ? (
                        <CheckIcon className="h-3 w-3 text-green-600" />
                      ) : (
                        <CopyIcon className="h-3 w-3" />
                      )}
                    </Button>
                  </div>

                  <div className="bg-muted p-3 rounded-lg">
                    <div className="font-medium text-sm mb-1">Sélecteur :</div>
                    <code className="text-xs">/color-picker?color=ff6b35</code>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 ml-2"
                      onClick={() => copyToClipboard("/color-picker?color=ff6b35", "picker-url")}
                    >
                      {copied === "picker-url" ? (
                        <CheckIcon className="h-3 w-3 text-green-600" />
                      ) : (
                        <CopyIcon className="h-3 w-3" />
                      )}
                    </Button>
                  </div>

                  <div className="bg-muted p-3 rounded-lg">
                    <div className="font-medium text-sm mb-1">Motifs :</div>
                    <code className="text-xs">/patterns?color=10b981</code>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 ml-2"
                      onClick={() => copyToClipboard("/patterns?color=10b981", "patterns-url")}
                    >
                      {copied === "patterns-url" ? (
                        <CheckIcon className="h-3 w-3 text-green-600" />
                      ) : (
                        <CopyIcon className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Formats de sortie */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Formats de sortie supportés</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Formats de couleur :</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• HEX (#3b82f6)</li>
                      <li>• RGB (rgb(59, 130, 246))</li>
                      <li>• HSL (hsl(217, 91%, 60%))</li>
                      <li>• CMYK (cmyk(76%, 47%, 0%, 4%))</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Code prêt à l&apos;emploi :</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• CSS (background-color: #3b82f6)</li>
                      <li>• Variables CSS (--primary: #3b82f6)</li>
                      <li>• Classes Tailwind (bg-blue-500)</li>
                      <li>• Objects JavaScript</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Raccourcis clavier */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Raccourcis clavier</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Copier la couleur</span>
                      <Badge variant="outline">Ctrl + C</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Couleur aléatoire</span>
                      <Badge variant="outline">Ctrl + R</Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Recherche rapide</span>
                      <Badge variant="outline">Ctrl + K</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Partager l&apos;URL</span>
                      <Badge variant="outline">Ctrl + S</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* FAQ Technique */}
        <Card>
          <CardHeader>
            <CardTitle>❓ Questions fréquentes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Comment partager une couleur spécifique ?</h4>
                <p className="text-sm text-muted-foreground">
                  Ajoutez le paramètre <code>?color=</code> suivi du code hexadécimal (sans le #) à l&apos;URL.
                  Exemple : <code>/converter?color=3b82f6</code>
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-2">Quels navigateurs sont supportés ?</h4>
                <p className="text-sm text-muted-foreground">
                  Colorizer fonctionne sur tous les navigateurs modernes : Chrome, Firefox, Safari, Edge.
                  Certaines fonctionnalités avancées nécessitent un navigateur récent.
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-2">Les couleurs sont-elles sauvegardées ?</h4>
                <p className="text-sm text-muted-foreground">
                  L&apos;historique des couleurs est sauvegardé localement dans votre navigateur.
                  Pour partager ou sauvegarder définitivement, utilisez les URLs de partage.
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-2">Comment contribuer ou signaler un bug ?</h4>
                <p className="text-sm text-muted-foreground">
                  Visitez notre page de support ou contactez-nous directement.
                  Nous apprécions tous les retours pour améliorer Colorizer.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Liens utiles */}
        <Card>
          <CardHeader>
            <CardTitle>🔗 Liens utiles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" asChild>
                <a href="/support" className="justify-start">
                  <ExternalLinkIcon className="h-4 w-4 mr-2" />
                  Support technique
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="/about" className="justify-start">
                  <ExternalLinkIcon className="h-4 w-4 mr-2" />
                  À propos de Colorizer
                </a>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/" className="justify-start">
                  <ExternalLinkIcon className="h-4 w-4 mr-2" />
                  Retour à l&apos;accueil
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
