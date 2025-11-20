import { useEffect } from 'react'

function Backdrop({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-40"
    />
  )
}

export default function PricingModal({ open, onClose, onActivate }) {
  useEffect(() => {
    const onEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (open) document.addEventListener('keydown', onEsc)
    return () => document.removeEventListener('keydown', onEsc)
  }, [open, onClose])

  if (!open) return null

  const plans = [
    {
      name: 'Weekly',
      price: '$9.99',
      subtext: '7 days access',
      highlight: false,
    },
    {
      name: 'Monthly',
      price: '$24.99',
      subtext: 'Best value for most',
      highlight: true,
    },
    {
      name: 'Yearly',
      price: '$199',
      subtext: 'Serious bettors only',
      highlight: false,
    },
  ]

  return (
    <>
      <Backdrop onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-3xl bg-slate-900 border border-violet-500/30 rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="flex items-center justify-between">
              <h3 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-violet-600/20 text-violet-300">🔒</span>
                Unlock VIP Tips
              </h3>
              <button onClick={onClose} className="text-slate-300/70 hover:text-white text-sm">Close</button>
            </div>

            <p className="mt-3 text-slate-300/80">
              Get access to premium picks with higher confidence, curated daily. Cancel anytime.
            </p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              {plans.map((p) => (
                <div
                  key={p.name}
                  className={`${p.highlight ? 'border-violet-500/60 bg-violet-500/5' : 'border-slate-700/60 bg-slate-800/40'} border rounded-xl p-5 flex flex-col`}
                >
                  <div className="text-slate-200/90 text-sm">{p.name}</div>
                  <div className="mt-1 text-3xl font-extrabold text-white">{p.price}</div>
                  <div className="text-xs text-slate-400">{p.subtext}</div>
                  <ul className="mt-4 space-y-2 text-sm text-slate-300/90">
                    <li>• Daily VIP tips</li>
                    <li>• Higher confidence picks</li>
                    <li>• Low-risk filters</li>
                    <li>• Early access</li>
                  </ul>
                  <button
                    onClick={() => onActivate(p.name)}
                    className={`mt-5 w-full px-4 py-2 rounded-lg font-semibold text-sm ${p.highlight ? 'bg-violet-600 hover:bg-violet-700 text-white' : 'bg-slate-700 hover:bg-slate-600 text-white'} transition-colors`}
                  >
                    Choose {p.name}
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-5 text-xs text-slate-400">
              By activating VIP you agree to our terms. No financial advice. Betting involves risk.
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
