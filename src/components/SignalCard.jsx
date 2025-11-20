function SignalCard({ signal }) {
  const { match, league, prediction, confidence, risk } = signal
  const riskColor = risk === 'Low' ? 'bg-emerald-500/15 text-emerald-300 border-emerald-400/30' : risk === 'Medium' ? 'bg-amber-500/15 text-amber-300 border-amber-400/30' : 'bg-rose-500/15 text-rose-300 border-rose-400/30'

  return (
    <div className="group rounded-xl border border-slate-700/60 bg-slate-800/60 hover:bg-slate-800/80 transition-colors p-4 md:p-5 shadow-inner">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-white font-semibold truncate">{match}</h3>
          <p className="text-xs text-blue-300/70 mt-0.5 truncate">{league}</p>
        </div>
        <div className={`px-2 py-1 rounded-md text-xs font-medium border ${riskColor}`}>{risk} risk</div>
      </div>
      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="text-sm text-slate-300/90">Prediction</p>
          <p className="text-xl font-bold text-blue-300">{prediction}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-slate-300/90">Confidence</p>
          <p className="text-2xl font-extrabold text-white">{confidence}%</p>
        </div>
      </div>
    </div>
  )
}

export default SignalCard
