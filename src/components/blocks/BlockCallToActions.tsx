import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function CallToAction() {
    return (
        <section className="py-16">
            <div className="mx-auto max-w-5xl rounded-3xl border px-6 py-12 md:py-20 lg:py-32">
                <div className="text-center">
                    <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
                        Prêt à transformer votre expérience de gestion des couleurs ?
                    </h2>
                    <p className="mt-4">
                        Colorizer Pro arrive bientôt ! Rejoignez notre liste d&apos;attente pour être parmi les premiers à découvrir nos fonctionnalités avancées et révolutionnaires.
                    </p>

                    <div className="mt-12 flex flex-wrap justify-center gap-4">
                        <Button
                            asChild
                            size="lg">
                            <Link href="/waitlist">
                                <span>
                                    Rejoindre la liste d&apos;attente
                                </span>
                            </Link>
                        </Button>

                        <Button
                            asChild
                            size="lg"
                            variant="outline">
                            <Link href="/converter">
                                <span>
                                    Essayer le convertisseur
                                </span>
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}