'use client'

import { motion } from 'framer-motion'
import { PageTransition } from '@/components/shared/PageTransition'
import { AnimatedCounter } from '@/components/animations'
import { TrendingUp, Users, ShoppingBag, DollarSign, BarChart3, PieChart, Download, Calendar } from 'lucide-react'

const stats = [
  { label: 'Receita Total', value: 284750, prefix: 'R$ ', icon: DollarSign, color: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400', change: '+23%' },
  { label: 'Pedidos', value: 12847, icon: ShoppingBag, color: 'bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400', change: '+15%' },
  { label: 'Usuários Ativos', value: 89432, icon: Users, color: 'bg-purple-50 text-purple-600 dark:bg-purple-950/50 dark:text-purple-400', change: '+31%' },
  { label: 'Taxa Conversão', value: 4.8, suffix: '%', icon: TrendingUp, color: 'bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400', change: '+2.1%' },
]

const topProducts = [
  { name: 'Windows 11 Pro', sales: 1247, revenue: 62350 },
  { name: 'Curso Full Stack', sales: 892, revenue: 31220 },
  { name: 'Steam Key Pack', sales: 756, revenue: 22680 },
  { name: 'Templates Canva Pro', sales: 634, revenue: 12680 },
  { name: 'Netflix Gift Card', sales: 521, revenue: 15630 },
]

const topCategories = [
  { name: 'Jogos & Contas', percentage: 32, color: 'bg-brand-600' },
  { name: 'Software & Licenças', percentage: 24, color: 'bg-emerald-500' },
  { name: 'Cursos Online', percentage: 18, color: 'bg-amber-500' },
  { name: 'Gift Cards', percentage: 12, color: 'bg-purple-500' },
  { name: 'Design & Templates', percentage: 8, color: 'bg-pink-500' },
  { name: 'Outros', percentage: 6, color: 'bg-surface-400' },
]

export default function AdminRelatoriosPage() {
  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display font-extrabold text-2xl lg:text-3xl text-surface-900 dark:text-white flex items-center gap-2"><BarChart3 size={28} className="text-brand-600 dark:text-brand-400" /> Relatórios</h1>
            <p className="text-surface-500 dark:text-surface-400 text-sm mt-1">Analytics detalhado da plataforma</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl text-sm font-medium text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700">
              <Calendar size={16} /> Últimos 30 dias
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl text-sm font-medium text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700">
              <Download size={16} /> Exportar
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="card-base p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-surface-500 dark:text-surface-400 font-medium">{stat.label}</span>
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${stat.color}`}><stat.icon size={18} /></div>
              </div>
              <p className="font-display font-extrabold text-2xl text-surface-900 dark:text-white">
                {stat.prefix || ''}<AnimatedCounter target={stat.value} suffix={stat.suffix || ''} />
              </p>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-1">{stat.change} vs mês anterior</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Products */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card-base overflow-hidden">
            <div className="p-5 border-b border-surface-100 dark:border-surface-800 flex items-center gap-2">
              <ShoppingBag size={18} className="text-brand-600 dark:text-brand-400" />
              <h2 className="font-display font-bold text-lg text-surface-900 dark:text-white">Top Produtos</h2>
            </div>
            <div className="divide-y divide-surface-100 dark:divide-surface-800">
              {topProducts.map((p, i) => (
                <div key={p.name} className="p-4 flex items-center gap-4 hover:bg-surface-50/50 dark:hover:bg-surface-800/50 transition-colors">
                  <span className="w-8 h-8 rounded-lg bg-surface-100 dark:bg-surface-800 flex items-center justify-center font-display font-bold text-sm text-surface-500">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-surface-900 dark:text-white truncate">{p.name}</p>
                    <p className="text-xs text-surface-400">{p.sales} vendas</p>
                  </div>
                  <p className="text-sm font-bold text-surface-900 dark:text-white">R$ {p.revenue.toLocaleString('pt-BR')}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Categories */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="card-base overflow-hidden">
            <div className="p-5 border-b border-surface-100 dark:border-surface-800 flex items-center gap-2">
              <PieChart size={18} className="text-brand-600 dark:text-brand-400" />
              <h2 className="font-display font-bold text-lg text-surface-900 dark:text-white">Vendas por Categoria</h2>
            </div>
            <div className="p-5 space-y-4">
              {topCategories.map(cat => (
                <div key={cat.name}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-surface-700 dark:text-surface-300">{cat.name}</span>
                    <span className="text-sm font-bold text-surface-900 dark:text-white">{cat.percentage}%</span>
                  </div>
                  <div className="w-full h-2 bg-surface-100 dark:bg-surface-800 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${cat.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${cat.percentage}%` }}
                      transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}
