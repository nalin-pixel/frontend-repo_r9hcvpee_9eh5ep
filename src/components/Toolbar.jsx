function Toolbar({ count, onCountChange, onRefresh }) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
      <div className="flex items-center gap-2 text-blue-200/80">
        <span className="text-sm">Signals:</span>
        <input
          type="range"
          min="10"
          max="15"
          value={count}
          onChange={(e) => onCountChange(parseInt(e.target.value))}
          className="accent-blue-500"
        />
        <span className="text-sm font-semibold text-white">{count}</span>
      </div>
      <button
        onClick={onRefresh}
        className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
      >
        Refresh Predictions
      </button>
    </div>
  )
}

export default Toolbar
