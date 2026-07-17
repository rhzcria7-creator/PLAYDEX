'use client'

import { motion } from 'framer-motion'
import { PageTransition } from '@/components/shared/PageTransition'
import { AnimatedCounter } from '@/components/animations'
import { BarChart3, TrendingUp, TrendingDown, Users, ShoppingBag, DollarSign, Eye, Clock } from 'lucide-react'

const kpis = [
  { label: 'Receita Mensal', value: 284750, prefix: 'R$ ', icon: DollarSign, change: '+23.4%', up: true, color: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400' },
  { label: 'Pedidos no Mês', value: 1284, icon: ShoppingBag, change: '+15.2%', up: true, color: 'bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400' },
  { label: 'Novos Usuários', value: 3421, icon: Users, change: '+31.7%', up: true, color: 'bg-purple-50 text-purple-600 dark:bg-purple-950/50 dark:text-purple-400' },
  { label: 'Taxa de Rejeição', value: 2.3, suffix: '%', icon: Eye, change: '-0.8%', up: false, color: 'bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400' },
]

const revenueData = [
  { month: 'Jan', value: 156000 },
  { month: 'Fev', value: 178000 },
  { month: 'Mar', value: 195000 },
  { month: 'Abr', value: 210000 },
  { month: 'Mai', value: 248000 },
  { month: 'Jun', value: 284750 },
]

const conversionFunnel = [
  { step: 'Visitantes', value: 89432, pct: 100 },
  { step: 'Visualizaram produto', value: 45210, pct: 50.5 },
  { step: 'Adicionaram ao carrinho', value: 12847, pct: 14.4 },
  { step: 'Iniciaram checkout', value: 8421, pct: 9.4 },
  { step: 'Compraram', value: 4298, pct: 4.8 },
]

const recentActivity = [
  { time: '2 min', desc: 'Nova venda: Windows 11 Pro — R$ 49,90', type: 'sale' },
  { time: '5 min', desc: 'Novo cadastro: maria@email.com', type: 'signup' },
  { time: '12 min', desc: 'Saque solicitado: R$ 500,00 via PIX', type: 'withdrawal' },
  { time: '18 min', desc: 'Disputa aberta: Pedido #PD-2607-042', type: 'dispute' },
  { time: '25 min', desc: 'KYC aprovado: João Silva', type: 'kyc' },
  { time: '32 min', desc: 'Nova venda: Curso Full Stack — R$ 34,90', type: 'sale' },
]

const maxRevenue = Math.max(...revenueData.map(d => d.value))

export default function AdminAnalyticsPage() {
  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 mb-8">
          <BarChart3 size={28} className="text-brand-600 dark:text-brand-400" />
          <div>
            <h1 className="font-display font-extrabold text-2xl lg:text-3xl text-surface-900 dark:text-white">Analytics</h1>
            <p className="text-surface-500 dark:text-surface-400 text-sm">Métricas em tempo real da plataforma</p>
          </div>
        </motion.div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {kpis.map((kpi, i) => (
            <motion.div key={kpi.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="card-base p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-surface-500 dark:text-surface-400">{kpi.label}</span>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${kpi.color}`}><kpi.icon size={16} /></div>
              </div>
              <p className="font-display font-extrabold text-2xl text-surface-900 dark:text-white">
                {kpi.prefix || ''}<AnimatedCounter target={kpi.value} suffix={kpi.suffix || ''} />
              </p>
              <div className="flex items-center gap-1 mt-1">
                {kpi.up ? <TrendingUp size={12} className="text-emerald-500" /> : <TrendingDown size={12} className="text-emerald-500" />}
                <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">{kpi.change}</span>
                <span className="text-xs text-surface-400">vs mês anterior</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Chart */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-2 card-base p-6">
            <h2 className="font-display font-bold text-lg text-surface-900 dark:text-white mb-6">Receita Mensal</h2>
            <div className="space-y-3">
              {revenueData.map((d, i) => (
                <div key={d.month} className="flex items-center gap-4">
                  <span className="text-sm font-medium text-surface-500 dark:text-surface-400 w-8">{d.month}</span>
                  <div className="flex-1 h-8 bg-surface-100 dark:bg-surface-800 rounded-lg overflow-hidden relative">
                    <motion.div
                      className="h-full bg-gradient-to-r from-brand-500 to-brand-600 rounded-lg"
                      initial={{ width: 0 }}
                      animate={{ width: `${(d.value / maxRevenue) * 100}%` }}
                      transition={{ duration: 1, ease: 'easeOut', delay: 0.5 + i * 0.1 }}
                    />
                  </div>
                  <span className="text-sm font-bold text-surface-900 dark:text-white w-24 text-right">R$ {(d.value / 1000).toFixed(0)}K</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Conversion Funnel */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="card-base p-6">
            <h2 className="font-display font-bold text-lg text-surface-900 dark:text-white mb-6">Funil de Conversão</h2>
            <div className="space-y-3">
              {conversionFunnel.map((f, i) => (
                <div key={f.step}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-surface-700 dark:text-surface-300">{f.step}</span>
                    <span className="text-xs font-bold text-surface-900 dark:text-white">{f.pct}%</span>
                  </div>
                  <div className="w-full h-2 bg-surface-100 dark:bg-surface-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-brand-400 to-brand-600"
                      initial={{ width: 0 }}
                      animate={{ width: `${f.pct}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.6 + i * 0.1 }}
                    />
                  </div>
                  <p className="text-xs text-surface-400 mt-0.5">{f.value.toLocaleString('pt-BR')} usuários</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="card-base overflow-hidden mt-6">
          <div className="p-5 border-b border-surface-100 dark:border-surface-800 flex items-center gap-2">
            <Clock size={18} className="text-brand-600 dark:text-brand-400" />
            <h2 className="font-display font-bold text-lg text-surface-900 dark:text-white">Atividade em Tempo Real</h2>
          </div>
          <div className="divide-y divide-surface-100 dark:divide-surface-800">
            {recentActivity.map((a, i) => (
              <div key={i} className="p-4 flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${
                  a.type === 'sale' ? 'bg-emerald-500' :
                  a.type === 'signup' ? 'bg-blue-500' :
                  a.type === 'withdrawal' ? 'bg-amber-500' :
                  a.type === 'dispute' ? 'bg-red-500' : 'bg-purple-500'
                }`} />
                <p className="text-sm text-surface-700 dark:text-surface-300 flex-1">{a.desc}</p>
                <span className="text-xs text-surface-400">{a.time}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </PageTransition>
  )
}
