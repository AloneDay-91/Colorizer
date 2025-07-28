"use client"

import {AnimatePresence, motion} from "framer-motion";
import {useCallback, useEffect, useRef, useState} from "react";

interface Particle {
    id: string;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
    blur: number;
    scale: number;
    color: string;
    rotate?: number;
    type: 'sparkle' | 'dot';
}

const COLORS = [
    "rgb(16, 185, 129)", // émeraude
    "rgb(52, 211, 153)", // émeraude clair
    "rgb(110, 231, 183)", // émeraude très clair
    "rgb(167, 243, 208)", // émeraude pastel
];

export default function ParticlesEffect({ className = "" }: { className?: string }) {
    const [particles, setParticles] = useState<Particle[]>([]);
    const animationFrameRef = useRef<number | null>(null);
    const lastParticleTime = useRef<number>(0);
    const particleCount = useRef<number>(0);
    const maxParticles = 1500; // Même valeur que dans waitlist

    const createParticle = useCallback(() => {
        const now = Date.now();
        if (now - lastParticleTime.current < 100) return; // Limiter à 10 particules/seconde

        lastParticleTime.current = now;

        if (particleCount.current >= maxParticles) return;

        // Détermine si c'est un sparkle ou un point (20% sparkles, 80% points)
        const isSparkle = Math.random() > 0.8;

        if (isSparkle) {
            // Création d'un sparkle
            const newParticle: Particle = {
                id: Math.random().toString(36).substr(2, 9),
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 6 + 3, // 3-9px
                duration: Math.random() * 1.5 + 0.8, // 0.8-2.3s
                delay: 0,
                blur: 0,
                scale: Math.random() * 0.6 + 0.6,
                color: COLORS[Math.floor(Math.random() * COLORS.length)],
                rotate: Math.random() * 360,
                type: 'sparkle'
            };

            setParticles((prev) => {
                const newParticles = [...prev, newParticle];
                if (newParticles.length > maxParticles) {
                    return newParticles.slice(-maxParticles);
                }
                return newParticles;
            });
        } else {
            // Création d'une particule (exactement comme dans waitlist)
            const newParticle: Particle = {
                id: Math.random().toString(36).substr(2, 9),
                x: Math.random() * 100,
                y: 100,
                size: Math.random() * 3 + 1, // 1-4px (comme dans waitlist)
                duration: Math.random() * 8 + 8, // 8-16s (comme dans waitlist)
                delay: 0,
                blur: Math.random() * 1.5 + 0.5, // Même valeur que waitlist
                scale: Math.random() * 0.2 + 0.2, // Même valeur que waitlist
                color: COLORS[Math.floor(Math.random() * COLORS.length)],
                type: 'dot'
            };

            setParticles((prev) => {
                const newParticles = [...prev, newParticle];
                if (newParticles.length > maxParticles) {
                    return newParticles.slice(-maxParticles);
                }
                return newParticles;
            });
        }

        particleCount.current += 1;
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            createParticle();
        }, 100);

        return () => {
            clearInterval(interval);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [createParticle]);

    const removeParticle = useCallback((id: string) => {
        setParticles((prev) => prev.filter((p) => p.id !== id));
        particleCount.current -= 1;
    }, []);

    // SVG pour la forme d'étoile
    const sparkle = (
        <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" fill="currentColor" />
        </svg>
    );

    return (
        <div className={"absolute w-full h-full left-0 top-0 pointer-events-none overflow-hidden " + className}>
            <AnimatePresence>
                {particles.map((particle) => (
                    particle.type === 'sparkle' ? (
                        <motion.div
                            key={particle.id}
                            className="absolute"
                            style={{
                                width: `${particle.size}px`,
                                height: `${particle.size}px`,
                                left: `${particle.x}%`,
                                top: `${particle.y}%`,
                                color: particle.color,
                            }}
                            initial={{
                                opacity: 0,
                                scale: 0,
                                rotate: particle.rotate ? particle.rotate - 90 : 0
                            }}
                            animate={{
                                opacity: [0, 1, 1, 0],
                                scale: [0, particle.scale, particle.scale, 0],
                                rotate: particle.rotate ? particle.rotate + 90 : 0
                            }}
                            transition={{
                                duration: particle.duration,
                                delay: particle.delay,
                                ease: [0.4, 0, 0.2, 1],
                            }}
                            onAnimationComplete={() => removeParticle(particle.id)}
                        >
                            {sparkle}
                        </motion.div>
                    ) : (
                        // Exactement comme dans waitlist
                        <motion.div
                            key={particle.id}
                            className="absolute rounded-full"
                            style={{
                                width: `${particle.size}px`,
                                height: `${particle.size}px`,
                                left: `${particle.x}%`,
                                top: `${particle.y}%`,
                                filter: `blur(${particle.blur}px)`,
                                backgroundColor: particle.color,
                                scale: particle.scale,
                            }}
                            initial={{ opacity: 0, y: 0 }}
                            animate={{
                                opacity: [0, 0.8, 0.8, 0],
                                y: "-100vh",
                            }}
                            transition={{
                                duration: particle.duration,
                                delay: particle.delay,
                                ease: "linear",
                            }}
                            onAnimationComplete={() => removeParticle(particle.id)}
                        />
                    )
                ))}
            </AnimatePresence>
        </div>
    )
}