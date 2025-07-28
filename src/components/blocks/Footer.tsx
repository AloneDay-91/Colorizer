import Link from 'next/link'
import {Palette} from "lucide-react";
import {ModeToggle} from "@/components/mode-toggle";

const footerSections = [
    {
        title: 'Outils',
        links: [
            { title: 'Convertisseur', href: '/converter' },
            { title: 'Sélecteur de couleur', href: '/color-picker' },
            { title: 'Motifs Tailwind', href: '/patterns' },
            { title: 'Harmonies', href: '/harmony' },
            { title: 'Dégradés', href: '/gradients' }
        ]
    },
    {
        title: 'Ressources',
        links: [
            { title: 'Palettes prédéfinies', href: '/palettes' },
            { title: 'Couleurs Tailwind', href: '/tailwind' },
            { title: 'Documentation', href: '/docs' }
        ]
    },
    {
        title: 'À propos',
        links: [
            { title: 'Notre mission', href: '/about' },
            { title: 'Support', href: '/support' }
        ]
    }
]

export default function FooterSection() {
    return (
        <footer className="border-t bg-background">
            <div className="mx-auto max-w-7xl px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Logo et description */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                                <Palette className="h-4 w-4 text-emerald-400 "/>
                            </div>
                            <span className="font-bold text-xl">Colorizer</span>
                        </Link>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Votre boîte à outils ultime pour travailler avec les couleurs.
                            Convertissez, créez et explorez des palettes harmonieuses.
                        </p>
                    </div>

                    {/* Sections de liens */}
                    {footerSections.map((section, sectionIndex) => (
                        <div key={sectionIndex} className="space-y-4">
                            <h3 className="font-semibold text-foreground">{section.title}</h3>
                            <ul className="space-y-2">
                                {section.links.map((link, linkIndex) => (
                                    <li key={linkIndex}>
                                        <Link
                                            href={link.href}
                                            className="text-muted-foreground hover:text-emerald-500 text-sm transition-colors duration-150"
                                        >
                                            {link.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Ligne de séparation */}
                <div className="border-t mt-12 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="flex items-center space-x-6">
                            <p className="text-muted-foreground text-sm">
                                © {new Date().getFullYear()} Colorizer.
                            </p>
                        </div>

                        <div className="flex items-center space-x-4">
                            <ModeToggle/>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}