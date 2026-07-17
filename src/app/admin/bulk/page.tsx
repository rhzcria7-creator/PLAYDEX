'use client'

import { motion } from 'framer-motion'
import { PageTransition } from '@/components/shared/PageTransition'
import { Upload, Download, FileSpreadsheet, AlertTriangle, CheckCircle, Loader2 } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function AdminBulkPage() {
  const [importing, setImporting] = useState(false)

  const handleImport = () => {
    setImporting(true)
    setTimeout(() => {
      setImporting(false)
      toast.success('Importação simulada concluída!')
    }, 2000)
  }

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display font-extrabold text-2xl lg:text-3xl text-surface-900 dark:text-white flex items-center gap-2">
            <FileSpreadsheet size={28} className="text-brand-600 dark:text-brand-400" /> Operações em Massa
          </h1>
          <p className="text-surface-500 dark:text-surface-400 text-sm mt-1">Importe e exporte dados em lote</p>
        </motion.div>

        <div className="mt-8 space-y-6">
          {/* Export */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card-base p-6">
            <h2 className="font-display font-bold text-lg text-surface-900 dark:text-white mb-4">📤 Exportar Dados</h2>
            <p className="text-sm text-surface-500 dark:text-surface-400 mb-4">Baixe planilhas com dados da plataforma.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { label: 'Produtos', count: '1.247 itens' },
                { label: 'Usuários', count: '89.432 registros' },
                { label: 'Pedidos', count: '12.847 transações' },
              ].map(item => (
                <button key={item.label} className="flex items-center justify-between p-4 bg-surface-50 dark:bg-surface-800 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors group">
                  <div>
                    <p className="text-sm font-medium text-surface-900 dark:text-white">{item.label}</p>
                    <p className="text-xs text-surface-400">{item.count}</p>
                  </div>
                  <Download size={18} className="text-surface-400 group-hover:text-brand-600 dark:group-hover:text-brand-400" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Import */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card-base p-6">
            <h2 className="font-display font-bold text-lg text-surface-900 dark:text-white mb-4">📥 Importar Dados</h2>
            <div className="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded-2xl p-8 text-center hover:border-brand-400 dark:hover:border-brand-600 transition-colors">
              <Upload size={40} className="mx-auto text-surface-300 dark:text-surface-600 mb-3" />
              <p className="text-sm font-medium text-surface-700 dark:text-surface-300">Arraste um arquivo CSV ou XLSX aqui</p>
              <p className="text-xs text-surface-400 mt-1">Máximo 10MB — formato: CSV, XLSX</p>
              <button
                onClick={handleImport}
                disabled={importing}
                className="mt-4 btn-primary text-sm disabled:opacity-50"
              >
                {importing ? <Loader2 size={16} className="animate-spin" /> : 'Selecionar arquivo'}
              </button>
            </div>
          </motion.div>

          {/* Templates */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card-base p-6">
            <h2 className="font-display font-bold text-lg text-surface-900 dark:text-white mb-4">📋 Templates de Importação</h2>
            <div className="space-y-2">
              {[
                { name: 'template_produtos.csv', desc: 'Formato para importar produtos em massa' },
                { name: 'template_categorias.csv', desc: 'Formato para importar categorias' },
                { name: 'template_cupons.csv', desc: 'Formato para importar cupons de desconto' },
              ].map(t => (
                <div key={t.name} className="flex items-center justify-between p-3 bg-surface-50 dark:bg-surface-800 rounded-xl">
                  <div className="flex items-center gap-3">
                    <FileSpreadsheet size={18} className="text-emerald-500" />
                    <div>
                      <p className="text-sm font-mono font-medium text-surface-900 dark:text-white">{t.name}</p>
                      <p className="text-xs text-surface-400">{t.desc}</p>
                    </div>
                  </div>
                  <button className="text-sm text-brand-600 dark:text-brand-400 font-medium hover:underline">Baixar</button>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 rounded-xl flex items-start gap-3">
              <AlertTriangle size={18} className="text-amber-500 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-700 dark:text-amber-400">Importações em massa substituem dados existentes. Faça backup antes de importar.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}
