import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import SignalCard from './components/SignalCard'
import Toolbar from './components/Toolbar'
import PricingModal from './components/PricingModal'

function App() {
  const [freeSignals, setFreeSignals] = useState([])
  const [vipSignals, setVipSignals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [freeCount, setFreeCount] = useState(6)
  const [vipCount, setVipCount] = useState(6)
  const [pricingOpen, setPricingOpen] = useState(false)
  const [vipActive, setVipActive] = useState(() => {
    return localStorage.getItem('vipActive') === 'true'
  })

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const fetchSignals = async () => {
    try {
      setLoading(true)
      setError('')
      const res = await fetch(`${baseUrl}/api/predictions/segmented?free_count=${freeCount}&vip_count=${vipCount}`)
      if (!res.ok) throw new Error(`Request failed: ${res.status}`)
      const data = await res.json()
      setFreeSignals(data.free || [])
      setVipSignals(data.vip || [])
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSignals()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [freeCount, vipCount])

  const handleActivatePlan = (planName) => {
    // In a real app, redirect to checkout. Here we just unlock locally.
    localStorage.setItem('vipActive', 'true')
    setVipActive(true)
    setPricingOpen(false)
  }

  const vipStatusPill = useMemo(() => (
    <span className={`text-[10px] uppercase tracking-wide px-2 py-1 rounded-md border ${vipActive ? 'bg-emerald-500/15 text-emerald-300 border-emerald-400/30' : 'bg-violet-500/10 text-violet-300 border-violet-400/30'}`}>
      {vipActive ? 'Active' : 'Locked'}
    </span>
  ), [vipActive])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(56,189,248,0.08),transparent_40%),radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.07),transparent_40%),radial-gradient(circle_at_50%_80%,rgba(99,102,241,0.07),transparent_40%)]" />
      <div className="relative max-w-6xl mx-auto px-6 py-10">
        <Header />

        <div className="bg-slate-900/50 border border-blue-500/20 rounded-2xl p-5 md:p-6 shadow-xl">
          <Toolbar
            freeCount={freeCount}
            vipCount={vipCount}
            onFreeCountChange={setFreeCount}
            onVipCountChange={setVipCount}
            onRefresh={fetchSignals}
          />

          <div className="mt-6">
            {loading && (
              <div className="text-center text-blue-200/80 py-14">Fetching today's predictions...</div>
            )}
            {error && (
              <div className="text-center text-rose-300 bg-rose-500/10 border border-rose-400/30 rounded-lg p-4">
                Failed to load predictions: {error}
              </div>
            )}
            {!loading && !error && (
              <div className="space-y-8">
                <section>
                  <div className="flex items-end justify-between gap-3">
                    <h2 className="text-xl font-bold text-white">Free Tips</h2>
                    <span className="text-xs text-blue-200/70">{freeSignals.length} tips</span>
                  </div>
                  <div className="mt-3 grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {freeSignals.map((s, idx) => (
                      <SignalCard key={`free-${idx}`} signal={s} />
                    ))}
                  </div>
                </section>

                <section>
                  <div className="flex items-end justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-bold text-white">VIP Tips</h2>
                      {vipStatusPill}
                    </div>
                    <span className="text-xs text-violet-200/80">{vipSignals.length} tips</span>
                  </div>

                  {vipActive ? (
                    <div className="mt-3 grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                      {vipSignals.map((s, idx) => (
                        <div key={`vip-${idx}`} className="relative">
                          <div className="absolute -top-1 -left-1 text-[10px] px-2 py-0.5 rounded-md bg-violet-600/20 text-violet-300 border border-violet-500/30">VIP</div>
                          <SignalCard signal={s} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="mt-3 relative">
                      <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                        {vipSignals.slice(0, Math.min(3, vipSignals.length)).map((s, idx) => (
                          <div key={`vip-locked-${idx}`} className="relative overflow-hidden rounded-xl border border-slate-700/60 bg-slate-800/60">
                            <div className="p-4 md:p-5 blur-[2px] select-none pointer-events-none opacity-70">
                              <SignalCard signal={s} />
                            </div>
                            <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-[2px] flex items-center justify-center">
                              <div className="text-center p-4">
                                <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-violet-600/20 text-violet-300 border border-violet-500/30">🔒</div>
                                <div className="mt-2 text-white font-semibold">VIP locked</div>
                                <div className="text-xs text-slate-300/80">Unlock to view all premium picks</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 flex items-center justify-center">
                        <button
                          onClick={() => setPricingOpen(true)}
                          className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg shadow transition-colors"
                        >
                          Unlock VIP Access
                        </button>
                      </div>
                    </div>
                  )}
                </section>
              </div>
            )}
          </div>

          <div className="mt-8 text-center text-xs text-blue-200/60">
            Predictions are generated for demonstration and should be used responsibly.
          </div>
        </div>
      </div>

      <PricingModal open={pricingOpen} onClose={() => setPricingOpen(false)} onActivate={handleActivatePlan} />
    </div>
  )
}

export default App
