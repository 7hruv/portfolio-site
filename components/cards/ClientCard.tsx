"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

export interface ClientCardProps {
  title: string
  clientType: string
  location: string
  description: string
  tags: string[]
  metric: string
  status: string
  testimonial: string | null
  link: string
}

export default function ClientCard({
  title,
  clientType,
  location,
  description,
  tags,
  metric,
  status,
  testimonial,
  link
}: ClientCardProps) {
  const isLive = link !== "#"
  // Empty-state guards — ensure card renders gracefully even if data is missing
  const safeTitle = title?.trim() || "Project Details Coming Soon"
  const safeDescription = description?.trim() || "More details will be added shortly."
  const safeMetric = metric?.trim() || ""

  return (
    <article className="group h-full flex flex-col rounded-xl border border-border/50 bg-card hover:border-accent/60 transition-colors duration-200 relative overflow-hidden client-card">
      {/* Breathing glow — opacity-only, no layout cost */}
      <div className="absolute inset-x-0 top-0 h-28 client-card-glow pointer-events-none" aria-hidden="true" />
      {/* Top accent hairline */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" aria-hidden="true" />

      {/* Header row */}
      <div className="relative p-5 pb-0 flex items-start justify-between gap-3">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">{clientType}</span>
        <span className={`shrink-0 text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
          status === 'Delivered'
            ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
            : 'text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20'
        }`}>
          {status === 'Delivered' ? '● Delivered' : '◐ Ongoing'}
        </span>
      </div>

      {/* Title + location */}
      <div className="relative px-5 pt-3">
        <h3 className="text-xl font-bold text-foreground leading-tight">{safeTitle}</h3>
        <p className="text-xs text-muted-foreground mt-0.5">{location}</p>
        <div className="h-px w-10 bg-accent mt-2" aria-hidden="true" />
      </div>

      {/* Tags */}
      <div className="relative px-5 pt-3 flex flex-wrap gap-1.5" aria-label="Project tags">
        {tags.map(tag => (
          <span key={tag} className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-secondary text-muted-foreground border border-border/50">{tag}</span>
        ))}
      </div>

      {/* Description */}
      <div className="relative px-5 pt-3 flex-1">
        <p className="text-sm text-muted-foreground leading-relaxed">{safeDescription}</p>
      </div>

      {/* Key metric */}
      {safeMetric ? (
        <div className="relative px-5 pt-4">
          <div className="flex items-center gap-2">
            <span className="text-accent font-bold" aria-hidden="true">✦</span>
            <span className="text-sm font-semibold text-foreground">{safeMetric}</span>
          </div>
        </div>
      ) : null}

      {/* Testimonial */}
      <div className="relative px-5 pt-2 pb-1">
        <p className="text-xs text-muted-foreground/70 italic leading-relaxed">
          {testimonial ?? `Trusted by ${clientType}s`}
        </p>
      </div>

      {/* CTA footer */}
      <div className="relative p-5 pt-3 flex items-center justify-end">
        {isLive ? (
          <Link
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${safeTitle} live project`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full bg-accent text-white min-h-[36px] group/btn"
          >
            Live Demo
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" aria-hidden="true" />
          </Link>
        ) : (
          <span className="text-xs text-muted-foreground/50 font-medium">In development</span>
        )}
      </div>
    </article>
  )
}
