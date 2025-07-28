"use client"

import { Suspense } from "react"
import PatternsContentWithParams from "./patterns-content"

export default function PatternsPage() {
  return (
    <Suspense fallback={<PatternsLoading />}>
      <PatternsContentWithParams />
    </Suspense>
  )
}

// Composant de fallback pour le loading
function PatternsLoading() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-4xl font-bold tracking-tight">Créateur de motifs</h1>
          <p className="text-muted-foreground">Chargement...</p>
        </div>
      </div>
    </div>
  )
}
