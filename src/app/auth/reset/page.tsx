'use client'

import { useState, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock, Eye, EyeOff, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { checkPasswordStrength } from '@/lib/security'
import toast from 'react-hot-toast'

function ResetForm() {
  const searchParams = useSearchParams()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const supabase = createClient()

  const strength = checkPasswordStrength(password)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('As senhas não coincidem')
      return
    }

    if (strength.score <= 2) {
      setError('A senha é muito fraca. Use pelo menos 8 caracteres com letras, números e símbolos.')
      return
    }

    setLoading(true)
    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
      setError(error.message)
      toast.error('Erro ao redefinir senha')
    } else {
      setSuccess(true)
      toast.success('Senha redefinida com sucesso!')
    }
    setLoading(false)
  }

  if (success) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md text-center">
          <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-950/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} className="text-emerald-500" />
          </div>
          <h1 className="font-display font-extrabold text-2xl text-surface-900 dark:text-white">Senha redefinida!</h1>
          <p className="text-surface-500 dark:text-surface-400 mt-2">Sua senha foi atualizada com sucesso.</p>
          <Link href="/login" className="btn-primary mt-6 inline-flex">Fazer login</Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-display font-extrabold text-2xl text-surface-900 dark:text-white">Nova senha</h1>
          <p className="text-surface-500 dark:text-surface-400 text-sm mt-1">Crie uma senha forte e segura</p>
        </div>

        <div className="card-base p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence>
              {error && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                  className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/40 text-red-700 dark:text-red-400 text-sm rounded-xl p-3 flex items-center gap-2">
                  <AlertCircle size={16} className="shrink-0" /> {error}
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label className="text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5 block">Nova senha</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-400" />
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required className="input-base pl-10 pr-10" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-surface-400">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {/* Indicador de força */}
              {password && (
                <div className="mt-2">
                  <div className="flex gap-1">
                    {[1,2,3,4,5,6].map(i => (
                      <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= strength.score ? strength.color : 'bg-surface-200 dark:bg-surface-700'}`} />
                    ))}
                  </div>
                  <p className="text-xs text-surface-500 mt-1">{strength.label} — {strength.suggestions[0] || 'Senha aceitável'}</p>
                </div>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5 block">Confirmar senha</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-400" />
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="input-base pl-10" />
              </div>
              {confirmPassword && password !== confirmPassword && (
                <p className="text-xs text-red-500 mt-1">As senhas não coincidem</p>
              )}
            </div>

            <motion.button type="submit" disabled={loading || password !== confirmPassword} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
              className="w-full btn-primary py-3.5 disabled:opacity-50">
              {loading ? <Loader2 size={20} className="animate-spin mx-auto" /> : 'Redefinir senha'}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-[80vh] flex items-center justify-center"><div className="skeleton w-96 h-96 rounded-2xl" /></div>}>
      <ResetForm />
    </Suspense>
  )
}
