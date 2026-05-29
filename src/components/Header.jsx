import { useState } from 'react'

export default function Header({ seccion, setSeccion }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'rgba(10, 10, 15, 0.92)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border)',
    }}>
      <div className="container" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 64, gap: 24,
      }}>
        {/* Logo */}
        <button
          onClick={() => setSeccion('comparador')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}
        >
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: 'linear-gradient(135deg, var(--gold) 0%, #8A5C1A 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1rem',
          }}>🛡️</div>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--text-primary)', fontWeight: 700 }}>
            Seguro<span style={{ color: 'var(--gold)' }}>Compara</span>
          </span>
        </button>

        {/* Nav tabs - desktop */}
        <nav style={{ display: 'flex', gap: 4, background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: 4, border: '1px solid var(--border)' }}>
          {[
            { id: 'comparador', label: 'Comparador', icon: '📊' },
            { id: 'cotizador', label: 'Cotizador', icon: '📋' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSeccion(tab.id)}
              style={{
                background: seccion === tab.id ? 'linear-gradient(135deg, var(--gold) 0%, #A8832E 100%)' : 'transparent',
                color: seccion === tab.id ? '#0A0A0F' : 'var(--text-secondary)',
                border: 'none',
                borderRadius: 7,
                padding: '8px 18px',
                fontWeight: 600,
                fontSize: '0.88rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex', alignItems: 'center', gap: 6,
              }}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        {/* Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="badge badge-gold" style={{ fontSize: '0.68rem' }}>
            🇲🇽 México 2025
          </span>
        </div>
      </div>
    </header>
  )
}
