"use client"

import CallToAction from "@/components/blocks/BlockCallToActions";
import FAQsFour from "@/components/blocks/BlockFaq";
import Features from "@/components/blocks/BlockFeatures";
import { HeroSection } from "@/components/ui/hero-section"
import { Grid2X2, Palette } from "lucide-react";

export default function HeroDemoPage() {
    return (
        <div className="relative container mx-auto">
            <HeroSection
                title="Colorizer"
                description="L'outil ultime pour convertir vos couleurs dans n'importe quel format et créer des motifs personnalisés. Simplifiez votre workflow de design avec nos outils intuitifs."
                badge={{
                    text: "Bientôt disponible",
                    action: {
                        text: "Rejoindre la liste d'attente",
                        href: "/waitlist"
                    }
                }}
                actions={[
                    {
                        text: "Convertir des couleurs",
                        href: "/converter",
                        icon: <Palette className="h-4 w-4" />
                    },
                    {
                        text: "Créer des motifs",
                        href: "/patterns",
                        variant: "link",
                        icon: <Grid2X2 className="h-4 w-4" />
                    }
                ]}
            />
            <Features/>
            <FAQsFour/>
            <CallToAction/>
        </div>
    )
}