import { useState } from 'react'

const EVENTOS = [
  {
    id: 'hospitalizacion',
    icono: '🏥',
    titulo: 'Hospitalización grave',
    desc: 'Cirugía de corazón, accidente, cáncer u otra urgencia médica mayor',
    sinSeguro: { min: 200000, max: 1500000, promedio: 650000 },
    costoSeguro: { anual: 7500, tipo: 'GMM básico · 30 años' },
    fuente: 'AMIS 2024 / IMSS',
    detalle: 'Una noche de UCI en hospital privado: $25,000–$60,000 MXN. Una cirugía de corazón abierto: $500,000–$1,200,000 MXN. Quimioterapia completa: $400,000–$900,000 MXN.',
  },
  {
    id: 'auto',
    icono: '🚗',
    titulo: 'Accidente de auto o robo',
    desc: 'Choque con daños a terceros, robo total o volcadura',
    sinSeguro: { min: 50000, max: 400000, promedio: 180000 },
    costoSeguro: { anual: 8500, tipo: 'Cobertura amplia · Compacto 2020' },
    fuente: 'CONDUSEF 2024',
    detalle: 'Daños a terceros en accidente grave: $80,000–$300,000 MXN. Robo de un auto compacto 2020: $120,000–$200,000 MXN. Reparación por volcadura: $40,000–$120,000 MXN.',
  },
  {
    id: 'casa',
    icono: '🏠',
    titulo: 'Sismo o incendio en casa',
    desc: 'Daños estructurales por temblor, incendio o inundación',
    sinSeguro: { min: 200000, max: 3000000, promedio: 900000 },
    costoSeguro: { anual: 4000, tipo: 'Cobertura básica · Casa $2M' },
    fuente: 'CENAPRED / AMIS 2024',
    detalle: 'Reparación estructural por sismo severo: $300,000–$1,500,000 MXN. Reconstrucción total por incendio: $800,000–$3,000,000 MXN. Solo el 8% de los hogares mexicanos tiene seguro.',
  },
  {
    id: 'vida',
    icono: '❤️',
    titulo: 'Fallecimiento del sostén familiar',
    desc: 'Impacto financiero en la familia ante una muerte prematura',
    sinSeguro: { min: 500000, max: 5000000, promedio: 2000000 },
    costoSeguro: { anual: 4500, tipo: 'Vida temporal 20 años · $1M · 35 años' },
    fuente: 'AMIS / CONDUSEF 2024',
    detalle: 'Manutención familiar por 10 años (ingreso $30K/mes): $3,600,000 MXN. Saldo hipoteca promedio: $800,000–$2,500,000 MXN. Educación universitaria por hijo: $500,000–$1,200,000 MXN.',
  },
]

function fmt(n) {
  return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(n)
}

export default function CalculadoraPerdida({ onCotizar }) {
  const [activo, setActivo] = useState(0)
  const ev = EVENTOS[activo]
  const ahorro = ev.sinSeguro.promedio - (ev.costoSeguro.anual * 20)
  const ratio = Math.round(ev.sinSeguro.promedio / ev.costoSeguro.anual)

  return (
    <section style={{ padding: '70px 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <p className="section-eyebrow" style={{ textAlign: 'center' }}>Datos reales · AMIS / CONDUSEF 2024</p>
          <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', marginBottom: 14 }}>
            ¿Cuánto pierdes <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>sin seguro</em>?
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: 520, margin: '0 auto' }}>
            Un evento inesperado puede destruir el patrimonio de toda una vida. Aquí los números reales del mercado mexicano.
          </p>
        </div>

        {/* Selector */}
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 36 }}>
          {EVENTOS.map((e, i) => (
            <button key={e.id} onClick={() => setActivo(i)} style={{
              padding: '10px 18px', borderRadius: 8, cursor: 'pointer',
              background: activo === i ? 'var(--gold-dim)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${activo === i ? 'var(--gold)' : 'var(--border)'}`,
              color: activo === i ? 'var(--gold)' : 'var(--text-secondary)',
              fontFamily: 'var(--font-sans)', fontSize: '0.88rem', fontWeight: 500,
              transition: 'all 0.15s',
            }}>
              {e.icono} {e.titulo}
            </button>
          ))}
        </div>

        {/* Comparativa */}
        <div className="animate-in" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, maxWidth: 860, margin: '0 auto' }}>
          {/* Sin seguro */}
          <div style={{
            padding: '28px', borderRadius: 16,
            background: 'rgba(224,82,82,0.06)', border: '1px solid rgba(224,82,82,0.25)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(224,82,82,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>❌</div>
              <span style={{ fontWeight: 700, color: 'var(--danger)', fontSize: '0.95rem' }}>Sin seguro</span>
            </div>
            <div style={{ marginBottom: 6 }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 4 }}>Costo promedio del evento</div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: 'var(--danger)', fontWeight: 700, lineHeight: 1 }}>
                {fmt(ev.sinSeguro.promedio)}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 6 }}>
                Rango: {fmt(ev.sinSeguro.min)} – {fmt(ev.sinSeguro.max)}
              </div>
            </div>
            <div style={{ height: 1, background: 'rgba(224,82,82,0.2)', margin: '16px 0' }} />
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{ev.detalle}</p>
            <div style={{ marginTop: 14, padding: '8px 12px', background: 'rgba(224,82,82,0.08)', borderRadius: 6, fontSize: '0.74rem', color: 'var(--danger)' }}>
              Fuente: {ev.fuente}
            </div>
          </div>

          {/* Con seguro */}
          <div style={{
            padding: '28px', borderRadius: 16,
            background: 'rgba(76,175,124,0.06)', border: '1px solid rgba(76,175,124,0.25)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(76,175,124,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>✅</div>
              <span style={{ fontWeight: 700, color: 'var(--success)', fontSize: '0.95rem' }}>Con seguro</span>
            </div>
            <div style={{ marginBottom: 6 }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 4 }}>Costo anual del seguro</div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: 'var(--success)', fontWeight: 700, lineHeight: 1 }}>
                {fmt(ev.costoSeguro.anual)}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 6 }}>{ev.costoSeguro.tipo}</div>
            </div>
            <div style={{ height: 1, background: 'rgba(76,175,124,0.2)', margin: '16px 0' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>El seguro protege hasta:</span>
                <span style={{ fontWeight: 700, color: 'var(--success)', fontSize: '0.9rem' }}>{fmt(ev.sinSeguro.max)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Ratio protección/costo:</span>
                <span style={{ fontWeight: 700, color: 'var(--gold)', fontSize: '0.9rem' }}>{ratio}x</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Deducible típico:</span>
                <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.9rem' }}>$5,000–$15,000</span>
              </div>
            </div>

            <button className="btn-primary" onClick={onCotizar} style={{ width: '100%', marginTop: 20, fontSize: '0.88rem' }}>
              Cotizar este seguro →
            </button>
          </div>
        </div>

        {/* Bottom stat */}
        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 12, padding: '14px 24px',
            borderRadius: 10, background: 'rgba(201,168,76,0.07)', border: '1px solid var(--gold-border)',
          }}>
            <span style={{ fontSize: '1.4rem' }}>💡</span>
            <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              Por <strong style={{ color: 'var(--gold)' }}>{fmt(ev.costoSeguro.anual / 12)}/mes</strong> proteges un patrimonio de hasta <strong style={{ color: 'var(--gold)' }}>{fmt(ev.sinSeguro.max)}</strong>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
