'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ArrowRight, Command, Loader2, TrendingUp, X } from 'lucide-react'

const quickActions = [
  { label: 'Explorar categorias', path: '/categorias', icon: '📦' },
  { label: 'Anunciar produto', path: '/anunciar', icon: '🏷️' },
  { label: 'Meu dashboard', path: '/dashboard', icon: '📊' },
  { label: 'Meus favoritos', path: '/favoritos', icon: '❤️' },
  { label: 'Chat', path: '/chat', icon: '💬' },
  { label: 'Configurações', path: '/configuracoes', icon: '⚙️' },
  { label: 'Planos', path: '/planos', icon: '💎' },
  { label: 'Suporte', path: '/suporte', icon: '🆘' },
]

const trendingSearches = [
  'Windows 11', 'Curso Full Stack', 'Steam Keys', 'Templates Canva', 'Netflix Gift Card',
]

export function CommandK() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<Array<{ title: string; path: string; type: string }>>([])
  const router = useRouter()

  // Atalho Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(prev => !prev)
        setQuery('')
        setResults([])
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Busca com debounce
  useEffect(() => {
    if (!query.trim()) { setResults([]); return }
    const timer = setTimeout(async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        const data = await res.json()
        if (data.products) {
          setResults(data.products.slice(0, 6).map((p: { title: string; id: string }) => ({
            title: p.title,
            path: `/produto/${p.id}`,
            type: 'Produto',
          })))
        }
      } catch {
        // Fallback: buscar nas quick actions
        const filtered = quickActions.filter(a => a.label.toLowerCase().includes(query.toLowerCase()))
        setResults(filtered.map(a => ({ title: a.label, path: a.path, type: 'Ação' })))
      }
      setLoading(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [query])

  const navigate = useCallback((path: string) => {
    setOpen(false)
    router.push(path)
  }, [router])

  const filteredActions = query
    ? quickActions.filter(a => a.label.toLowerCase().includes(query.toLowerCase()))
    : quickActions

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[15%] z-50 mx-auto w-full max-w-lg px-4"
          >
            <div className="bg-white dark:bg-surface-900 rounded-2xl border border-surface-200 dark:border-surface-700 shadow-elevated overflow-hidden">
              {/* Input */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-surface-100 dark:border-surface-800">
                <Search size={18} className="text-surface-400 shrink-0" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar produtos, categorias, ações..."
                  className="flex-1 bg-transparent text-surface-900 dark:text-white text-sm outline-none placeholder:text-surface-400"
                />
                {loading && <Loader2 size={16} className="animate-spin text-brand-500" />}
                <kbd className="hidden sm:flex items-center gap-1 px-2 py-0.5 bg-surface-100 dark:bg-surface-800 text-surface-400 text-xs rounded font-mono">
                  <X size={10} /> ESC
                </kbd>
              </div>

              {/* Results */}
              <div className="max-h-80 overflow-y-auto py-2">
                {results.length > 0 && (
                  <div className="px-2">
                    <p className="px-2 py-1 text-xs font-semibold text-surface-400 uppercase">Resultados</p>
                    {results.map((r, i) => (
                      <button
                        key={i}
                        onClick={() => navigate(r.path)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors group"
                      >
                        <Search size={14} className="text-surface-400 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-surface-900 dark:text-white truncate">{r.title}</p>
                          <p className="text-xs text-surface-400">{r.type}</p>
                        </div>
                        <ArrowRight size={14} className="text-surface-300 group-hover:text-brand-500 shrink-0" />
                      </button>
                    ))}
                  </div>
                )}

                {!query && (
                  <>
                    {/* Trending */}
                    <div className="px-2">
                      <p className="px-2 py-1 text-xs font-semibold text-surface-400 uppercase flex items-center gap-1"><TrendingUp size={12} /> Em alta</p>
                      <div className="flex flex-wrap gap-2 px-2 py-2">
                        {trendingSearches.map(t => (
                          <button
                            key={t}
                            onClick={() => setQuery(t)}
                            className="px-3 py-1.5 bg-surface-50 dark:bg-surface-800 hover:bg-brand-50 dark:hover:bg-brand-950/50 text-xs font-medium text-surface-600 dark:text-surface-400 hover:text-brand-600 dark:hover:text-brand-400 rounded-lg transition-colors"
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="px-2 mt-2">
                      <p className="px-2 py-1 text-xs font-semibold text-surface-400 uppercase">Ações rápidas</p>
                      {filteredActions.map(a => (
                        <button
                          key={a.path}
                          onClick={() => navigate(a.path)}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors group"
                        >
                          <span className="text-base">{a.icon}</span>
                          <span className="text-sm text-surface-700 dark:text-surface-300">{a.label}</span>
                          <ArrowRight size={14} className="ml-auto text-surface-300 group-hover:text-brand-500" />
                        </button>
                      ))}
                    </div>
                  </>
                )}

                {query && results.length === 0 && !loading && (
                  <div className="py-8 text-center">
                    <p className="text-sm text-surface-400">Nenhum resultado para "{query}"</p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center gap-4 px-4 py-2.5 border-t border-surface-100 dark:border-surface-800 text-xs text-surface-400">
                <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 bg-surface-100 dark:bg-surface-800 rounded font-mono">↑↓</kbd> Navegar</span>
                <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 bg-surface-100 dark:bg-surface-800 rounded font-mono">↵</kbd> Abrir</span>
                <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 bg-surface-100 dark:bg-surface-800 rounded font-mono">esc</kbd> Fechar</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Botão flutuante de atalho (aparece no canto)
export function CommandKButton() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  if (!mounted) return null

  return (
    <button
      onClick={() => {
        const event = new KeyboardEvent('keydown', { key: 'k', metaKey: true, ctrlKey: true })
        window.dispatchEvent(event)
      }}
      className="fixed bottom-6 right-6 z-40 w-12 h-12 bg-brand-600 hover:bg-brand-700 text-white rounded-xl shadow-glow flex items-center justify-center transition-colors lg:hidden"
      aria-label="Buscar (Cmd+K)"
    >
      <Command size={20} />
    </button>
  )
}
