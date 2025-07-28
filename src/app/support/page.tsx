"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  LifeBuoyIcon,
  MailIcon,
  BugIcon,
  LightbulbIcon,
  HelpCircleIcon,
  ExternalLinkIcon
} from "lucide-react"

export default function SupportPage() {

  const faqs = [
    {
      category: "Utilisation générale",
      questions: [
        {
          q: "Comment convertir une couleur HEX en RGB ?",
          a: "Utilisez notre convertisseur de couleurs. Entrez votre code HEX dans le champ approprié et la conversion RGB s'affichera automatiquement en temps réel."
        },
        {
          q: "Puis-je partager une couleur spécifique avec quelqu'un ?",
          a: "Oui ! Utilisez le bouton 'Copier le lien de partage' dans le convertisseur, ou ajoutez ?color=XXXXXX à l'URL (remplacez XXXXXX par votre code couleur sans le #)."
        },
        {
          q: "Comment sauvegarder mes couleurs favorites ?",
          a: "L'historique des couleurs est automatiquement sauvegardé localement. Pour une sauvegarde permanente, utilisez les liens de partage ou marquez vos favoris dans les palettes."
        }
      ]
    },
    {
      category: "Outils spécifiques",
      questions: [
        {
          q: "Comment créer une harmonie de couleurs ?",
          a: "Allez dans l'outil Harmonies, choisissez votre couleur de base, sélectionnez un type d'harmonie (complémentaire, triadique, etc.) et ajustez les paramètres selon vos besoins."
        },
        {
          q: "Que signifient les différents types de dégradés ?",
          a: "Linéaire : transition en ligne droite, Radial : transition circulaire du centre vers l'extérieur, Conique : transition en rotation autour d'un point central."
        },
        {
          q: "Comment trouver l'équivalent Tailwind d'une couleur ?",
          a: "Notre convertisseur trouve automatiquement la couleur Tailwind la plus proche. Vous pouvez aussi explorer toute la palette dans la section Motifs."
        }
      ]
    },
    {
      category: "Problèmes techniques",
      questions: [
        {
          q: "Le site ne fonctionne pas correctement",
          a: "Essayez de vider le cache de votre navigateur (Ctrl+F5) ou utilisez un mode de navigation privée. Si le problème persiste, contactez-nous avec les détails de votre navigateur."
        },
        {
          q: "La copie dans le presse-papiers ne fonctionne pas",
          a: "Cette fonctionnalité nécessite un navigateur moderne et une connexion HTTPS. Vérifiez que vous autorisez l'accès au presse-papiers dans les paramètres de votre navigateur."
        },
        {
          q: "Les couleurs ne s'affichent pas correctement",
          a: "Cela peut être lié aux paramètres de votre écran ou navigateur. Vérifiez le profil colorimétrique de votre écran et les paramètres d'affichage de votre navigateur."
        }
      ]
    }
  ]

  const resources = [
    {
      title: "Guide de démarrage",
      description: "Apprenez les bases de Colorizer en 5 minutes",
      link: "/docs#getting-started",
      icon: LifeBuoyIcon,
      badge: "Populaire"
    },
    {
      title: "Documentation complète",
      description: "Guide détaillé de tous les outils et fonctionnalités",
      link: "/docs",
      icon: HelpCircleIcon,
      badge: null
    },
    {
      title: "Théorie des couleurs",
      description: "Comprendre les harmonies et combinaisons de couleurs",
      link: "/harmony",
      icon: LightbulbIcon,
      badge: "Éducatif"
    }
  ]

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* En-tête */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Support & Aide</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Besoin d&apos;aide ? Nous sommes là pour vous accompagner dans l&apos;utilisation de Colorizer.
          </p>
        </div>

        <Tabs defaultValue="faq" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="resources">Ressources</TabsTrigger>
          </TabsList>

          {/* FAQ */}
          <TabsContent value="faq" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Questions fréquemment posées</CardTitle>
                <CardDescription>
                  Trouvez rapidement des réponses aux questions les plus courantes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {faqs.map((category, categoryIndex) => (
                  <div key={categoryIndex} className="space-y-4">
                    <h3 className="text-lg font-semibold text-primary">
                      {category.category}
                    </h3>
                    <div className="space-y-4">
                      {category.questions.map((faq, faqIndex) => (
                        <div key={faqIndex} className="border rounded-lg p-4">
                          <h4 className="font-medium mb-2">{faq.q}</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {faq.a}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact */}
          <TabsContent value="contact" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Autres moyens de contact */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Autres moyens de contact</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <MailIcon className="h-5 w-5 text-blue-500 mt-0.5" />
                      <div>
                        <div className="font-medium">Email direct</div>
                        <div className="text-sm text-muted-foreground">
                          xxxxx@mail.com
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <BugIcon className="h-5 w-5 text-red-500 mt-0.5" />
                      <div>
                        <div className="font-medium">Signaler un bug</div>
                        <div className="text-sm text-muted-foreground">
                          Aidez-nous à améliorer Colorizer
                        </div>
                        <Button variant="outline" size="sm" className="mt-2">
                          <ExternalLinkIcon className="h-3 w-3 mr-1" />
                          Rapport de bug
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Informations système</CardTitle>
                  <CardDescription>
                    Ces informations nous aident à mieux vous assister
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Navigateur :</span>
                    <span className="font-mono">{typeof window !== 'undefined' ? navigator.userAgent.split(' ')[navigator.userAgent.split(' ').length - 1] : 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Plateforme :</span>
                    <span className="font-mono">{typeof window !== 'undefined' ? navigator.platform : 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Résolution :</span>
                    <span className="font-mono">{typeof window !== 'undefined' ? `${window.screen.width}x${window.screen.height}` : 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Version Colorizer :</span>
                    <span className="font-mono">v2.1.0</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Ressources */}
          <TabsContent value="resources" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Ressources utiles</CardTitle>
                <CardDescription>
                  Guides, tutoriels et liens pour maîtriser Colorizer
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {resources.map((resource, index) => {
                    const Icon = resource.icon
                    return (
                      <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                          <Icon className="h-6 w-6 text-primary" />
                          {resource.badge && (
                            <Badge variant="secondary" className="text-xs">
                              {resource.badge}
                            </Badge>
                          )}
                        </div>
                        <h3 className="font-medium mb-2">{resource.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          {resource.description}
                        </p>
                        <Button variant="outline" size="sm" asChild>
                          <a href={resource.link}>
                            <ExternalLinkIcon className="h-3 w-3 mr-1" />
                            Accéder
                          </a>
                        </Button>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Status du service */}
            <Card>
              <CardHeader>
                <CardTitle>État du service</CardTitle>
                <CardDescription>
                  Vérifiez si tous les services fonctionnent correctement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { service: "Site principal", status: "operational" },
                    { service: "Convertisseur de couleurs", status: "operational" },
                    { service: "Générateur de dégradés", status: "operational" },
                    { service: "Base de données Tailwind", status: "operational" },
                    { service: "API de partage", status: "operational" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm">{item.service}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="text-xs text-muted-foreground">Opérationnel</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
