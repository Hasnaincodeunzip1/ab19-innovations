import type { TeamMember } from '../../data/site'
import { cn } from '../../lib/cn'

/** A team photograph, framed to the site's 4:5 portrait ratio. */
export function Portrait({ member, className }: { member: TeamMember; className?: string }) {
  return (
    <div
      className={cn(
        'relative aspect-[4/5] w-full overflow-hidden border border-line bg-ink-raised',
        className,
      )}
    >
      <img
        src={member.photo}
        alt={member.photoAlt}
        width={720}
        height={720}
        loading="lazy"
        decoding="async"
        // A 4:5 frame from a square source crops the sides, not the top.
        className="size-full object-cover object-center"
      />
      {/* Ties the photograph into the dark palette rather than letting it sit on top. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent"
      />
      <span aria-hidden="true" className="absolute bottom-0 left-0 h-px w-1/3 bg-accent" />
    </div>
  )
}
