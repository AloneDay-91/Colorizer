import Link from "next/link";
import {Palette} from "lucide-react";
import MainNav from "@/components/main-nav";
import {ModeToggle} from "@/components/mode-toggle";
import {Button} from "@/components/ui/button";

export default function HeaderSection()  {
    return (
        <header className="sticky top-0 z-50 w-full px-2 bg-background border-b">
            <div className="container mx-auto flex items-center justify-between py-4">
                <div className="flex items-center gap-4">
                    <Link href="/" className="text-lg font-bold flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                            <Palette className="h-4 w-4 text-emerald-400 "/>
                        </div>
                        <h1 className="font-bold text-foreground">
                            Colorizer
                        </h1>
                    </Link>
                    <span>/</span>
                    <MainNav/>
                </div>
                <div className="flex items-center gap-4">
                    <ModeToggle />
                    <Button asChild>
                        <Link href="/waitlist" className="flex items-center gap-2">
                            Rejoindre la liste d&apos;attente
                        </Link>
                    </Button>
                </div>
            </div>
        </header>
    );
}