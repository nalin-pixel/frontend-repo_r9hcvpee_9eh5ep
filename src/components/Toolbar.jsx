function Toolbar({
  freeCount,
  vipCount,
  onFreeCountChange,
  onVipCountChange,
  onRefresh,
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-4 text-blue-200/80 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-sm">Free tips:</span>
            <input
              type="range"
              min="10"
              max="15"
              value={freeCount}
              onChange={(e) => onFreeCountChange(parseInt(e.target.value))}
              className="accent-blue-500"
            />
            <span className="text-sm font-semibold text-white w-6 text-right">
              {freeCount}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">VIP tips:</span>
            <input
              type="range"
              min="3"
              max="10"
              value={vipCount}
              onChange={(e) => onVipCountChange(parseInt(e.target.value))}
              className="accent-violet-500"
            />
            <span className="text-sm font-semibold text-white w-6 text-right">
              {vipCount}
            </span>
          </div>
        </div>
        <button
          onClick={onRefresh}
          className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          Refresh Predictions
        </button>
      </div>
    </div>
  )
}

export default Toolbar
