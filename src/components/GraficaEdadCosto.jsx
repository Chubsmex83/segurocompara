import { useState } from 'react'

const DATOS_GMM = [
  { edad: 25, prima: 4200, label: '25 años' },
  { edad: 30, prima: 6500, label: '30 años' },
  { edad: 35, prima: 10000, label: '35 años' },
  { edad: 40, prima: 16500, label: '40 años' },
  { edad: 45, prima: 26000, label: '45 años' },
  { edad: 50, prima: 40000, label: '50 años' },
]

const DATOS_VIDA = [
  { edad: 25, prima: 3200, label: '25 años' },
  { edad: 30, prima: 4800, label: '30 años' },
  { edad: 35, prima: 7500, label: '35 años' },
  { edad: 40, prima: 13000, label: '40 años' },
  { edad: 45, prima: 21000, label: '45 años' },
  { edad: 50, prima: 34000, label: '50 años' },
]

function fmt(n) {
  return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(n)
}

export default function GraficaEdadCosto({ onCotizar }) {
  const [tipo, setTipo] = useState('gmm')
  const datos = tipo === 'gmm' ? DATOS_GMM : DATOS_VIDA
  const maxPrima = Math.max(...datos.map(d => d.prima))
  const base = datos[0].prima

  return (
    <section style={{ padding: '70px 0', background: 'rgba(255,255,255,0.015)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>

          {/* Texto */}
          <div>
            <p className="section-eyebrow">El costo de esperar</p>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2rem)', marginBottom: 16 }}>
              Contratar joven es<br />
              <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>exponencialmente más barato</em>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: 20 }}>
              La prima de un seguro médico o de vida aumenta entre <strong style={{ color: 'var(--text-primary)' }}>8-15% anual</strong> con la edad. Esperar 10 años puede costarte hasta <strong style={{ color: 'var(--danger)' }}>4 veces más</strong> en prima mensual de por vida.
            </p>
            <div style={{ padding: '16px', background: 'rgba(201,168,76,0.07)', borderRadius: 10, border: '1px solid var(--gold-border)', marginBottom: 24 }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--gold)', fontWeight: 600, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Ejemplo real
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Si contratas GMM a los <strong style={{ color: 'var(--gold)' }}>25 años</strong> a {fmt(datos[0].prima)}/año y lo mantienes hasta los 65, pagas <strong style={{ color: 'var(--gold)' }}>menos de la mitad</strong> que si contratas a los 40 años durante el mismo período.
              </p>
            </div>
            <button className="btn-primary" onClick={onCotizar} style={{ fontSize: '0.88rem' }}>
              Cotizar ahora →
            </button>
          </div>

          {/* Gráfica */}
          <div>
            {/* Toggle */}
            <div style={{ display: 'flex', gap: 6, marginBottom: 24, background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: 4, border: '1px solid var(--border)' }}>
              {[{ v: 'gmm', l: '🏥 GMM' }, { v: 'vida', l: '❤️ Vida' }].map(t => (
                <button key={t.v} onClick={() => setTipo(t.v)} style={{
                  flex: 1, padding: '8px', borderRadius: 6,
                  background: tipo === t.v ? 'linear-gradient(135deg, var(--gold), #A8832E)' : 'transparent',
                  border: 'none', color: tipo === t.v ? '#07111F' : 'var(--text-secondary)',
                  fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer',
                  fontFamily: 'var(--font-sans)', transition: 'all 0.15s',
                }}>
                  {t.l}
                </button>
              ))}
            </div>

            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16 }}>
              Prima anual estimada · Plan básico individual
            </div>

            {/* Barras */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {datos.map((d, i) => {
                const pct = (d.prima / maxPrima) * 100
                const mult = (d.prima / base).toFixed(1)
                return (
                  <div key={d.edad} className="animate-in">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                      <span style={{ fontSize: '0.82rem', color: i === 0 ? 'var(--success)' : i >= 4 ? 'var(--danger)' : 'var(--text-secondary)', fontWeight: 600 }}>
                        {d.label}
                      </span>
                      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                        <span style={{ fontSize: '0.82rem', fontWeight: 700, color: i === 0 ? 'var(--success)' : i >= 4 ? 'var(--danger)' : 'var(--text-primary)' }}>
                          {fmt(d.prima)}
                        </span>
                        {i > 0 && (
                          <span style={{ fontSize: '0.72rem', color: 'var(--danger)', fontWeight: 600 }}>
                            {mult}x
                          </span>
                        )}
                        {i === 0 && (
                          <span className="badge badge-green" style={{ fontSize: '0.65rem' }}>Mejor</span>
                        )}
                      </div>
                    </div>
                    <div style={{ height: 10, background: 'rgba(255,255,255,0.06)', borderRadius: 5, overflow: 'hidden' }}>
                      <div style={{
                        height: '100%', borderRadius: 5,
                        width: `${pct}%`,
                        background: i === 0
                          ? 'var(--success)'
                          : i >= 4
                            ? 'var(--danger)'
                            : `linear-gradient(90deg, var(--gold), var(--gold-light))`,
                        transition: 'width 0.6s ease',
                      }} />
                    </div>
                  </div>
                )
              })}
            </div>

            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 14, textAlign: 'center' }}>
              * Primas estimadas de referencia · Plan básico individual sin preexistencias
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
