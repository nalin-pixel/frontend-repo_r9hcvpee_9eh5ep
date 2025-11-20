import { useMemo } from 'react'

function Header() {
  const subtitle = useMemo(() => {
    const phrases = [
      'Professional football betting signals',
      'Balanced picks with confidence scoring',
      '10–15 curated predictions for today',
    ]
    return phrases[new Date().getDate() % phrases.length]
  }, [])

  return (
    <header className="text-center mb-8">
      <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
        Flamez Signals
      </h1>
      <p className="mt-3 text-blue-200/90">{subtitle}</p>
    </header>
  )
}

export default Header
