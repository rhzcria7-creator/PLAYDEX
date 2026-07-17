'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { PageTransition } from '@/components/shared/PageTransition'
import { Download, FileSpreadsheet, FileText, File, Loader2, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'

const exportOptions = [
  { id: 'products', label: 'Produtos', desc: 'Lista completa de produtos com preços e status', format: 'CSV', icon: FileSpreadsheet, count: '1.247 itens' },
  { id: 'orders', label: 'Pedidos', desc: 'Histórico de pedidos com valores e status', format: 'CSV', icon: FileSpreadsheet, count: '12.847 registros' },
  { id: 'users', label: 'Usuários', desc: 'Base de usuários com dados de cadastro', format: 'CSV', icon: FileSpreadsheet, count: '89.432 registros' },
  { id: 'revenue', label: 'Relatório Financeiro', desc: 'Receita, taxas e lucro por período', format: 'PDF', icon: FileText, count: 'Últimos 12 meses' },
  { id: 'reviews', label: 'Avaliações', desc: 'Todas as avaliações com notas e comentários', format: 'CSV', icon: File, count: '3.456 avaliações' },
  { id: 'coupons', label: 'Cupons', desc: 'Cupons ativos com uso e descontos', format: 'CSV', icon: FileSpreadsheet, count: '8 cupons' },
]

export default function ExportarPage() {
  const [exporting, setExporting] = useState<string | null>(null)
  const [exported, setExported] = useState<string[]>([])

  const handleExport = (id: string) => {
    setExporting(id)
    setTimeout(() => {
      setExporting(null)
      setExported(prev => [...prev, id])
      toast.success('Arquivo gerado com sucesso!')
    }, 1500)
  }

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display font-extrabold text-2xl lg:text-3xl text-surface-900 dark:text-white flex items-center gap-2">
            <Download size={28} className="text-brand-600 dark:text-brand-400" /> Exportar Dados
          </h1>
          <p className="text-surface-500 dark:text-surface-400 text-sm mt-1">Baixe relatórios e planilhas da plataforma</p>
        </motion.div>

        <div className="mt-8 space-y-3">
          {exportOptions.map((opt, i) => (
            <motion.div
              key={opt.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="card-base p-5 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-50 dark:bg-brand-950/50 flex items-center justify-center shrink-0">
                <opt.icon size={24} className="text-brand-600 dark:text-brand-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-bold text-surface-900 dark:text-white">{opt.label}</h3>
                  <span className="px-2 py-0.5 bg-surface-100 dark:bg-surface-800 text-surface-500 dark:text-surface-400 text-xs font-mono rounded">{opt.format}</span>
                </div>
                <p className="text-sm text-surface-500 dark:text-surface-400 mt-0.5">{opt.desc}</p>
                <p className="text-xs text-surface-400 mt-0.5">{opt.count}</p>
              </div>
              <div className="shrink-0">
                {exported.includes(opt.id) ? (
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                    <CheckCircle size={20} />
                    <span className="text-sm font-medium">Pronto</span>
                  </div>
                ) : (
                  <button
                    onClick={() => handleExport(opt.id)}
                    disabled={exporting === opt.id}
                    className="btn-secondary text-sm flex items-center gap-2 disabled:opacity-50"
                  >
                    {exporting === opt.id ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                    {exporting === opt.id ? 'Gerando...' : 'Exportar'}
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-8 p-4 bg-surface-50 dark:bg-surface-800/50 rounded-xl">
          <p className="text-sm text-surface-500 dark:text-surface-400">
            💡 <strong className="text-surface-700 dark:text-surface-300">Dica:</strong> Use a API de exportação para automatizar relatórios. Consulte a <a href="/api-docs" className="text-brand-600 dark:text-brand-400 hover:underline">documentação da API</a>.
          </p>
        </motion.div>
      </div>
    </PageTransition>
  )
}
