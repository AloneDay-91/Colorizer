import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Palette, Grid3X3, CodeXml } from 'lucide-react'
import { ReactNode } from 'react'

export default function Features() {
    return (
        <section className="bg-zinc-50 py-16 md:py-32 dark:bg-transparent">
            <div className="@container mx-auto max-w-5xl px-6">
                <div className="text-center">
                    <h2 className="text-balance text-4xl font-semibold lg:text-5xl">Tout pour gérer vos couleurs</h2>
                    <p className="mt-4">Colorizer Pro offre des outils complets pour convertir, explorer et créer avec des couleurs.</p>
                </div>
                <div className="@min-4xl:max-w-full @min-4xl:grid-cols-3 mx-auto mt-8 grid max-w-sm gap-6 *:text-center md:mt-16">
                    <Card className="group bg-transparent shadow-zinc-950/5">
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <Palette
                                    className="size-6"
                                    aria-hidden
                                />
                            </CardDecorator>

                            <h3 className="mt-6 font-medium">Convertisseur de couleurs</h3>
                        </CardHeader>

                        <CardContent>
                            <p className="text-sm">Convertissez instantanément n&apos;importe quelle couleur entre HEX, RGB, HSL, CMYK et trouvez l&apos;équivalent TailwindCSS le plus proche.</p>
                        </CardContent>
                    </Card>

                    <Card className="group bg-transparent shadow-zinc-950/5">
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <Grid3X3
                                    className="size-6"
                                    aria-hidden
                                />
                            </CardDecorator>

                            <h3 className="mt-6 font-medium">Créateur de motifs</h3>
                        </CardHeader>

                        <CardContent>
                            <p className="mt-3 text-sm">Générez des motifs personnalisés pour vos designs web avec notre outil intuitif, et exportez-les directement dans le format de votre choix.</p>
                        </CardContent>
                    </Card>

                    <Card className="group bg-transparent shadow-zinc-950/5">
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <CodeXml
                                    className="size-6"
                                    aria-hidden
                                />
                            </CardDecorator>

                            <h3 className="mt-6 font-medium">Variables CSS & Tailwind</h3>
                        </CardHeader>

                        <CardContent>
                            <p className="mt-3 text-sm">Générez facilement des variables CSS ou trouvez les couleurs Tailwind équivalentes pour maintenir la cohérence dans vos projets.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}

const CardDecorator = ({ children }: { children: ReactNode }) => (
    <div className="relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:bg-white/5 dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)30%,transparent)]">
        <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px]"
        />
        <div
            aria-hidden
            className="bg-radial to-background absolute inset-0 from-transparent to-75%"
        />
        <div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t">{children}</div>
    </div>
)