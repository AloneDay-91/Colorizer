"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Palette, Zap } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

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
}

const COLORS = [
  "rgb(16, 185, 129)", // émeraude
  "rgb(52, 211, 153)", // émeraude clair
  "rgb(110, 231, 183)", // émeraude très clair
  "rgb(167, 243, 208)", // émeraude pastel
];

export default function WaitlistPage() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const lastParticleTime = useRef<number>(0);
  const particleCount = useRef<number>(0);
  const maxParticles = 500;

  const createParticle = useCallback(() => {
    const now = Date.now();
    if (now - lastParticleTime.current < 100) return; // Limiter à 10 particules/seconde

    lastParticleTime.current = now;

    if (particleCount.current >= maxParticles) return;

    const newParticle: Particle = {
      id: Math.random().toString(36).substr(2, 9),
      x: Math.random() * 100,
      y: 100,
      size: Math.random() * 3 + 1, // 1-4px
      duration: Math.random() * 8 + 8, // 8-16s
      delay: 0,
      blur: Math.random() * 1.5 + 0.5, // Plus fin
      scale: Math.random() * 0.3 + 0.3,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    };

    setParticles((prev) => {
      const newParticles = [...prev, newParticle];
      if (newParticles.length > maxParticles) {
        return newParticles.slice(-maxParticles);
      }
      return newParticles;
    });

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

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-black via-slate-950 to-emerald-950">
      {/* Particules de fond */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <AnimatePresence>
          {particles.map((particle) => (
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
          ))}
        </AnimatePresence>
      </div>

      {/* Overlay de dégradé */}
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/30 via-emerald-900/10 to-transparent" />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-4xl mx-auto glass p-8 sm:p-10 rounded-2xl"
        >
          {/* En-tête */}
          <div className="flex flex-col space-y-6 mb-10">
            <div className="flex items-center">
              <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium text-emerald-400 border border-emerald-500/30 bg-emerald-500/10">
                <Zap className="mr-1.5 h-3 w-3 text-emerald-400" />
                Bientôt disponible
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <Palette className="h-6 w-6 text-emerald-400" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
                Colorizer Pro
              </h1>
            </div>
          </div>

          {/* Contenu principal */}
          <div className="space-y-8">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-white"
            >
              Donnez vie à vos créations avec des{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
                  couleurs parfaites
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-emerald-500/5 blur-xl rounded-full -z-10" />
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-slate-300 max-w-2xl leading-relaxed"
            >
              L&apos;outil ultime pour les designers et développeurs qui veulent
              maîtriser la couleur. Soyez parmi les premiers à l&apos;essayer.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-sm text-slate-400">
                Rejoignez les{" "}
                <span className="font-medium text-emerald-400">1,234+</span>{" "}
                personnes déjà inscrites
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
