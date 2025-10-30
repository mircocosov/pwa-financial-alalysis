type QuickLinkProps = {
  links: Array<{ id: string; label: string; icon: string }>
  currentPage: string
  onNavigate: (id: string) => void
}

export function QuickLinks({ links, currentPage, onNavigate }: QuickLinkProps) {
  return (
    <div className="fixed top-6 right-10 z-30 hidden max-w-[640px] flex-wrap gap-3 rounded-3xl border border-white/10 bg-white/[0.05] px-3 py-3 shadow-[0_30px_80px_rgba(4,6,13,0.45)] backdrop-blur-xl xl:flex">
      {links.map((link) => {
        const isActive = currentPage === link.id
        return (
          <button
            key={link.id}
            type="button"
            onClick={() => onNavigate(link.id)}
            className={`group relative flex items-center gap-2 rounded-xl border px-4 py-2 text-sm transition-all duration-200 ${
              isActive
                ? 'border-yellow-200/70 bg-gradient-to-r from-yellow-300/20 via-yellow-200/15 to-transparent text-yellow-50 shadow-[0_16px_50px_rgba(253,224,71,0.35)]'
                : 'border-white/10 bg-white/5 text-white/75 hover:border-yellow-200/40 hover:bg-yellow-200/10 hover:text-white'
            }`}
          >
            <span className="text-lg leading-none drop-shadow-[0_6px_20px_rgba(255,215,0,0.35)]">
              {link.icon}
            </span>
            <span className="relative z-10 font-medium tracking-wide">{link.label}</span>
            <span className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.15),_transparent_65%)]" />
            </span>
          </button>
        )
      })}
    </div>
  )
}
