"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  PaletteIcon,
  UsersIcon,
  RocketIcon,
  HeartIcon,
  LightbulbIcon,
  TargetIcon,
  GlobeIcon,
  CodeIcon,
  BrushIcon
} from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  const stats = [
    { label: "Utilisateurs actifs", value: "50K+", icon: UsersIcon, color: "text-emerald-500" },
    { label: "Couleurs converties", value: "2M+", icon: PaletteIcon, color: "text-emerald-500" },
    { label: "Palettes créées", value: "100K+", icon: BrushIcon, color: "text-emerald-500" },
    { label: "Pays utilisateurs", value: "120+", icon: GlobeIcon, color: "text-emerald-500" }
  ]

  const values = [
    {
      icon: LightbulbIcon,
      title: "Innovation",
      description: "Nous repoussons constamment les limites de ce qui est possible avec les couleurs sur le web."
    },
    {
      icon: UsersIcon,
      title: "Accessibilité",
      description: "Nos outils sont conçus pour être utilisables par tous, débutants comme experts."
    },
    {
      icon: HeartIcon,
      title: "Passion",
      description: "Nous sommes passionnés par le design et la beauté des couleurs dans le monde digital."
    },
    {
      icon: RocketIcon,
      title: "Performance",
      description: "Des outils rapides, fiables et précis pour une expérience utilisateur optimale."
    }
  ]

  const milestones = [
    {
      date: "2025",
      title: "Lancement de Colorizer",
      description: "Premier lancement avec le convertisseur de couleurs de base"
    },
    {
      date: "2025",
      title: "Outils avancés",
      description: "Ajout des harmonies, dégradés et palettes prédéfinies"
    },
    {
      date: "2025",
      title: "Version 2.0",
      description: "Refonte complète avec de nouveaux outils et une meilleure UX"
    }
  ]

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4">
            <PaletteIcon className="h-8 w-8 text-emerald-500" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Notre Mission</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Démocratiser l&apos;accès aux outils de couleur professionnels et inspirer la créativité
            de tous les designers, développeurs et créateurs du monde entier.
          </p>
        </div>

        {/* Vision */}
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Notre Vision</CardTitle>
            <CardDescription>Ce que nous imaginons pour l&apos;avenir</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <TargetIcon className="h-12 w-12 text-primary mx-auto" />
              <p className="text-lg leading-relaxed">
                Nous rêvons d&apos;un monde où chaque créateur, qu&apos;il soit débutant ou expert,
                a accès aux meilleurs outils pour exprimer sa vision créative à travers les couleurs.
                Colorizer est notre contribution à cette vision : des outils puissants, intuitifs et gratuits.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center space-y-2">
                <GlobeIcon className="h-8 w-8 text-emerald-500 mx-auto" />
                <h3 className="font-medium">Accessibilité Globale</h3>
                <p className="text-sm text-muted-foreground">
                  Des outils accessibles partout dans le monde, dans toutes les langues
                </p>
              </div>
              <div className="text-center space-y-2">
                <LightbulbIcon className="h-8 w-8 text-emerald-500 mx-auto" />
                <h3 className="font-medium">Innovation Continue</h3>
                <p className="text-sm text-muted-foreground">
                  Toujours à la pointe de la technologie et des besoins créatifs
                </p>
              </div>
              <div className="text-center space-y-2">
                <HeartIcon className="h-8 w-8 text-emerald-500 mx-auto" />
                <h3 className="font-medium">Communauté Créative</h3>
                <p className="text-sm text-muted-foreground">
                  Construire une communauté de créateurs qui s&apos;entraident et s&apos;inspirent
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistiques */}
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Notre Impact</CardTitle>
            <CardDescription>Les chiffres qui nous motivent chaque jour</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div key={index} className="text-center space-y-2">
                    <Icon className={`h-8 w-8 mx-auto ${stat.color}`} />
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Valeurs */}
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Nos Valeurs</CardTitle>
            <CardDescription>Les principes qui guident notre travail</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon
                return (
                  <div key={index} className="flex space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{value.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Histoire */}
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Notre Histoire</CardTitle>
            <CardDescription>Comment Colorizer a vu le jour</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="prose prose-neutral max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                Tout a commencé par une frustration simple : pourquoi était-il si compliqué de travailler
                avec les couleurs sur le web ? Entre les conversions fastidieuses, les palettes difficiles
                à créer et les codes couleur incompatibles, l&apos;équipe fondatrice a réalisé qu&apos;il fallait
                une solution moderne et accessible.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Colorizer est né de cette vision : créer la boîte à outils de couleur ultime, gratuite
                et accessible à tous. Chaque fonctionnalité a été pensée pour répondre à un besoin réel
                de notre communauté de designers et développeurs.
              </p>
            </div>

            {/* Timeline */}
            <div className="space-y-4">
              <h3 className="font-semibold text-center mb-6">Étapes Clés</h3>
              <div className="space-y-4">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-16 text-right">
                      <Badge variant="outline">{milestone.date}</Badge>
                    </div>
                    <div className="flex-grow border-l-2 border-muted pl-4 pb-4">
                      <h4 className="font-medium">{milestone.title}</h4>
                      <p className="text-sm text-muted-foreground">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Remerciements */}
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <HeartIcon className="h-12 w-12 text-primary mx-auto" />
              <h3 className="text-xl font-semibold">Merci à notre communauté</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Colorizer n&apos;existerait pas sans vous. Chaque retour, chaque suggestion,
                chaque partage nous aide à améliorer et à grandir. Ensemble, nous rendons
                le design accessible à tous.
              </p>
              <div className="flex justify-center space-x-4 pt-4">
                <Button asChild>
                  <Link href="/support">
                    Nous contacter
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/">
                    Découvrir Colorizer
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contribuer */}
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Contribuer au Projet</CardTitle>
            <CardDescription>Rejoignez-nous dans cette aventure</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center space-y-4">
                <BrushIcon className="h-8 w-8 text-purple-500 mx-auto" />
                <h3 className="font-medium">Design</h3>
                <p className="text-sm text-muted-foreground">
                  Proposez de nouvelles fonctionnalités ou améliorations UX
                </p>
                <Button variant="outline" size="sm">
                  Suggérer
                </Button>
              </div>

              <div className="text-center space-y-4">
                <CodeIcon className="h-8 w-8 text-blue-500 mx-auto" />
                <h3 className="font-medium">Développement</h3>
                <p className="text-sm text-muted-foreground">
                  Contribuez au code open-source de Colorizer
                </p>
                <Button variant="outline" size="sm">
                  GitHub
                </Button>
              </div>

              <div className="text-center space-y-4">
                <HeartIcon className="h-8 w-8 text-red-500 mx-auto" />
                <h3 className="font-medium">Partage</h3>
                <p className="text-sm text-muted-foreground">
                  Partagez Colorizer avec vos amis créateurs
                </p>
                <Button variant="outline" size="sm">
                  Partager
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
