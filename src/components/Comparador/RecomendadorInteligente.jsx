import { useState } from 'react'
import { PREGUNTAS_RECOMENDADOR } from '../../data/segurosData'
import { calcularRecomendacion } from '../../utils/cotizador'

const ICONOS = { gmm: '🏥', vida: '❤️', auto: '🚗', casa: '🏠', retiro: '🌅', viaje: '✈️', gmmenores: '💊', negocio: '🏢' }

const JUSTIFICACIONES = {
  gmm: 'Un evento médico grave sin seguro puede costar entre $200,000 y $2,000,000 MXN. El GMM es la prioridad número uno para proteger tu patrimonio ante emergencias de salud.',
  vida: 'Si alguien depende económicamente de ti, el seguro de vida es indispensable. La prima es extraordinariamente baja en relación con la protección que ofrece a tu familia.',
  auto: 'La responsabilidad civil por un accidente de tráfico puede resultar en demandas millonarias. Un seguro de RC básico cuesta menos de $350/mes y te protege de consecuencias devastadoras.',
  casa: 'México está en zona sísmica. Solo el 8% de los hogares tienen seguro y los que los perdieron en sismos recientes vivieron situaciones económicas muy difíciles.',
  retiro: 'El IMSS solo cubrirá el 25-40% de tu último salario. Iniciar un plan de retiro a los 30-40 años puede duplicar o triplicar el capital acumulado vs. empezar a los 50.',
  viaje: 'Una hospitalización en EUA puede costar $150,000 USD sin seguro. El costo del seguro de viaje es mínimo ($20-80 USD) comparado con el riesgo real.',
  gmmenores: 'Complementar tu IMSS con un seguro de gastos menores te da acceso a atención privada sin esperar. El costo es muy accesible (desde $200/mes) para el beneficio que ofrece.',
  negocio: 'El 80% de las PyMEs sin seguro que sufren un siniestro grave cierran en 18 meses. Proteger tus activos y responsabilidad civil es tan importante como el capital de trabajo.',
}

export default function RecomendadorInteligente({ onCotizar }) {
  const [preguntaActual, setPreguntaActual] = useState(0)
  const [respuestas, setRespuestas] = useState({})
  const [resultado, setResultado] = useState(null)
  const [iniciado, setIniciado] = useState(false)

  function seleccionarOpcion(preguntaId, valor) {
    const nuevasRespuestas = { ...respuestas, [preguntaId]: valor }
    setRespuestas(nuevasRespuestas)

    if (preguntaActual < PREGUNTAS_RECOMENDADOR.length - 1) {
      setTimeout(() => setPreguntaActual(p => p + 1), 300)
    } else {
      const rec = calcularRecomendacion(nuevasRespuestas)
      setResultado(rec)
    }
  }

  function reiniciar() {
    setPreguntaActual(0)
    setRespuestas({})
    setResultado(null)
  }

  const pregunta = PREGUNTAS_RECOMENDADOR[preguntaActual]

  if (!iniciado) {
    return (
      <div style={{
        padding: '40px 40px', borderRadius: 'var(--radius-lg)',
        background: 'linear-gradient(135deg, rgba(201,168,76,0.08) 0%, rgba(10,10,15,0) 100%)',
        border: '1px solid var(--gold-border)',
        textAlign: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: -40, right: -40,
          width: 200, height: 200, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <p className="section-eyebrow">Sistema Inteligente</p>
        <h2 style={{ fontSize: '1.6rem', marginBottom: 12 }}>
          ¿Qué seguro necesito primero?
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: 480, margin: '0 auto 28px', lineHeight: 1.7 }}>
          Responde 5 preguntas rápidas y te diremos exactamente qué seguro contratar primero y por qué, basado en tu perfil.
        </p>
        <button className="btn-primary" onClick={() => setIniciado(true)} style={{ margin: '0 auto' }}>
          Comenzar análisis →
        </button>
      </div>
    )
  }

  if (resultado) {
    return (
      <div style={{
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--gold-border)',
        overflow: 'hidden',
      }}>
        <div style={{ padding: '28px 32px', background: 'linear-gradient(135deg, rgba(201,168,76,0.1) 0%, transparent 100%)', borderBottom: '1px solid var(--border)' }}>
          <p className="section-eyebrow">Tu análisis personalizado</p>
          <h3 style={{ fontSize: '1.4rem' }}>Estos son tus seguros prioritarios</h3>
        </div>
        <div style={{ padding: '28px 32px' }}>
          {resultado.map((rec, idx) => (
            <div key={rec.id} style={{
              display: 'flex', gap: 20, padding: '20px',
              background: idx === 0 ? 'rgba(201,168,76,0.06)' : 'rgba(255,255,255,0.02)',
              borderRadius: 12,
              border: `1px solid ${idx === 0 ? 'var(--gold-border)' : 'var(--border)'}`,
              marginBottom: 12,
              alignItems: 'flex-start',
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: 12, flexShrink: 0,
                background: idx === 0 ? 'var(--gold-dim)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${idx === 0 ? 'var(--gold-border)' : 'var(--border)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.4rem',
              }}>
                {ICONOS[rec.id]}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
                  <span style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--text-primary)' }}>
                    {idx + 1}. {rec.nombre}
                  </span>
                  {idx === 0 && <span className="badge badge-gold">⭐ Prioridad #1</span>}
                  <span className={`badge ${rec.prioridad === 'Alta' ? 'badge-red' : rec.prioridad === 'Media' ? 'badge-gold' : 'badge-green'}`}>
                    {rec.prioridad === 'Alta' ? '🔴' : rec.prioridad === 'Media' ? '🟡' : '🟢'} {rec.prioridad}
                  </span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {JUSTIFICACIONES[rec.id]}
                </p>
              </div>
              <button className="btn-gold-outline" onClick={onCotizar} style={{ flexShrink: 0, fontSize: '0.82rem' }}>
                Cotizar →
              </button>
            </div>
          ))}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
            <button className="btn-secondary" onClick={reiniciar} style={{ fontSize: '0.85rem' }}>
              ← Reiniciar análisis
            </button>
            <button className="btn-primary" onClick={onCotizar}>
              Cotizar con mi perfil →
            </button>
          </div>
        </div>
      </div>
    )
  }

  const progreso = ((preguntaActual) / PREGUNTAS_RECOMENDADOR.length) * 100

  return (
    <div style={{
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--gold-border)',
      overflow: 'hidden',
    }}>
      {/* Progress */}
      <div style={{ padding: '20px 32px', background: 'rgba(201,168,76,0.05)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Pregunta {preguntaActual + 1} de {PREGUNTAS_RECOMENDADOR.length}
          </span>
          <span style={{ fontSize: '0.78rem', color: 'var(--gold)' }}>{Math.round(progreso)}%</span>
        </div>
        <div style={{ height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 2 }}>
          <div style={{ height: '100%', width: `${progreso}%`, background: 'var(--gold)', borderRadius: 2, transition: 'width 0.3s ease' }} />
        </div>
      </div>

      {/* Question */}
      <div style={{ padding: '32px 32px' }} className="animate-in">
        <h3 style={{ fontSize: '1.2rem', marginBottom: 24, color: 'var(--text-primary)' }}>
          {pregunta.pregunta}
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
          {pregunta.opciones.map(op => (
            <button
              key={op.valor}
              onClick={() => seleccionarOpcion(pregunta.id, op.valor)}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 10,
                padding: '16px 18px',
                cursor: 'pointer',
                transition: 'all 0.15s',
                display: 'flex', alignItems: 'center', gap: 12,
                color: 'var(--text-primary)',
                textAlign: 'left',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--gold-border)'
                e.currentTarget.style.background = 'var(--gold-dim)'
                e.currentTarget.style.color = 'var(--gold)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.background = 'var(--bg-card)'
                e.currentTarget.style.color = 'var(--text-primary)'
              }}
            >
              <span style={{ fontSize: '1.3rem' }}>{op.emoji}</span>
              <span style={{ fontSize: '0.88rem', fontWeight: 500 }}>{op.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
