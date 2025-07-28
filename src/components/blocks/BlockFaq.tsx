'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export default function FAQsFour() {
    const faqItems = [
        {
            id: 'item-1',
            question: 'Quels formats de couleur sont supportés par Colorizer Pro ?',
            answer: 'Colorizer Pro supporte tous les formats de couleur courants : HEX, RGB, RGBA, HSL, HSLA, CMYK et les couleurs nommées CSS. Vous pouvez convertir instantanément entre ces formats avec notre outil intuitif.',
        },
        {
            id: 'item-2',
            question: 'Comment exporter les motifs créés avec Colorizer Pro ?',
            answer: 'Les motifs peuvent être exportés en SVG, PNG ou en code CSS/SCSS directement. Pour les développeurs, nous proposons également la génération automatique de code React ou Vue pour une intégration facile dans vos projets.',
        },
        {
            id: 'item-3',
            question: 'Est-ce que Colorizer Pro fonctionne avec Tailwind CSS ?',
            answer: 'Absolument ! Colorizer Pro identifie automatiquement l\'équivalent Tailwind CSS le plus proche de votre couleur et génère le code approprié. Vous pouvez également créer des palettes de couleurs personnalisées pour votre configuration Tailwind.',
        },
        {
            id: 'item-4',
            question: 'Colorizer Pro est-il gratuit ?',
            answer: 'Colorizer Pro est entièrement gratuit. Nous croyons que les outils de design et de développement de qualité doivent être accessibles à tous. Vous pouvez utiliser toutes les fonctionnalités sans aucune limitation.',
        }
    ]

    return (
        <section className="py-16 md:py-24">
            <div className="mx-auto max-w-5xl px-4 md:px-6">
                <div className="mx-auto max-w-xl text-center">
                    <h2 className="text-balance text-3xl font-bold md:text-4xl lg:text-5xl">Questions fréquentes</h2>
                    <p className="text-muted-foreground mt-4 text-balance">Découvrez des réponses rapides et complètes aux questions courantes sur Colorizer Pro, ses fonctionnalités et ses services.</p>
                </div>

                <div className="mx-auto mt-12 max-w-xl">
                    <Accordion
                        type="single"
                        collapsible
                        className="bg-muted dark:bg-muted/50 w-full rounded-2xl p-1">
                        {faqItems.map((item) => (
                            <AccordionItem
                                key={item.id}
                                value={item.id}
                                className="border-none">
                                <AccordionTrigger className="rounded-lg px-4 py-4 hover:bg-muted/50 hover:no-underline">
                                    <h3 className="text-left text-base font-medium">{item.question}</h3>
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground px-4 pb-4 pt-1 text-sm">
                                    <p>{item.answer}</p>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>

                <div className="mt-12 text-center">
                </div>
            </div>
        </section>
    )
}