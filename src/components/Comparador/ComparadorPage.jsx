import { useState } from 'react'
import { CATEGORIAS, ASEGURADORAS, GLOSARIO } from '../../data/segurosData'
import RecomendadorInteligente from './RecomendadorInteligente'

function Tooltip({ term }) {
  const [show, setShow] = useState(false)
  const def = GLOSARIO[term]
  if (!def) return null
  return (
    <span className="tooltip-wrapper"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <span className="tooltip-icon">i</span>
      {show && <div className="tooltip-box">{def}</div>}
    </span>
  )
}

function ScoreBar({ label, value }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{label}</span>
        <span style={{ fontSize: '0.78rem', color: 'var(--gold)', fontWeight: 600 }}>{value}/10</span>
      </div>
      <div className="score-bar-track">
        <div className="score-bar-fill" style={{ width: `${value * 10}%` }} />
      </div>
    </div>
  )
}

function CategoriaCard({ cat, onCotizar }) {
  const [expanded, setExpanded] = useState(false)
  const [tabActiva, setTabActiva] = useState('cobertura')

  return (
    <div className="glass-card animate-in" style={{ padding: 0, overflow: 'hidden', marginBottom: 24 }}>
      {/* Header */}
      <div style={{ padding: '20px 16px', borderBottom: '1px solid var(--border)', cursor: 'pointer' }}
        onClick={() => setExpanded(!expanded)}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{
              width: 52, height: 52, borderRadius: 14, fontSize: '1.6rem',
              background: 'rgba(201,168,76,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '1px solid var(--gold-border)',
            }}>{cat.icono}</div>
            <div>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: 4 }}>{cat.nombre}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{cat.descripcionCorta}</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.6rem', fontFamily: 'var(--font-serif)', color: 'var(--gold)', fontWeight: 700, lineHeight: 1 }}>
                {cat.scoreGeneral}
              </div>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                conveniencia
              </div>
              <div style={{ fontSize: '0.64rem', color: 'var(--text-muted)', marginTop: 2 }}>
                ver ⭐ Ratings
              </div>
            </div>
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.8rem', color: 'var(--text-secondary)',
              transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease',
            }}>▼</div>
          </div>
        </div>
      </div>

      {/* Expanded content */}
      {expanded && (
        <div style={{ padding: '0 16px 24px' }}>
          {/* Tabs */}
          <div style={{ display: 'flex', gap: 4, padding: '16px 0', borderBottom: '1px solid var(--border)', marginBottom: 24, overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
            {['cobertura', 'aseguradoras', 'costos', 'ratings'].map(tab => (
              <button key={tab} onClick={() => setTabActiva(tab)} style={{
                background: tabActiva === tab ? 'var(--gold-dim)' : 'transparent',
                border: tabActiva === tab ? '1px solid var(--gold-border)' : '1px solid transparent',
                color: tabActiva === tab ? 'var(--gold)' : 'var(--text-secondary)',
                borderRadius: 6, padding: '7px 14px', fontSize: '0.8rem', fontWeight: 500,
                cursor: 'pointer', transition: 'all 0.15s',
                textTransform: 'capitalize',
              }}>
                {{ cobertura: '📋 ¿Qué cubre?', aseguradoras: '🏦 Aseguradoras', costos: '💰 Costos', ratings: '⭐ Ratings' }[tab]}
              </button>
            ))}
          </div>

          {/* Tab: Cobertura */}
          {tabActiva === 'cobertura' && (
            <div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>
                {cat.descripcion}
              </p>
              <div className="grid-2" style={{ gap: 24 }}>
                <div>
                  <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gold)', marginBottom: 14 }}>¿Qué cubre?</h4>
                  {cat.queCubre.map((item, i) => (
                    <div key={i} className="pro-item" style={{ color: 'var(--text-secondary)' }}>{item}</div>
                  ))}
                </div>
                <div>
                  <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gold)', marginBottom: 14 }}>Beneficios clave</h4>
                  <table className="data-table">
                    <tbody>
                      {cat.beneficios.map((b, i) => (
                        <tr key={i}>
                          <td style={{ fontWeight: 500, color: 'var(--text-primary)', fontSize: '0.82rem' }}>
                            {b.concepto}
                            {['deducible', 'coaseguro', 'sumaAsegurada'].some(t => b.concepto.toLowerCase().includes(t.toLowerCase())) && (
                              <Tooltip term={b.concepto.toLowerCase().includes('deducible') ? 'deducible' : b.concepto.toLowerCase().includes('coaseguro') ? 'coaseguro' : 'sumaAsegurada'} />
                            )}
                          </td>
                          <td style={{ fontSize: '0.82rem' }}>{b.detalle}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div style={{ marginTop: 20, padding: '14px 16px', background: 'rgba(201,168,76,0.06)', borderRadius: 8, border: '1px solid var(--gold-border)' }}>
                    <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gold)', marginBottom: 6 }}>¿A quién le conviene?</div>
                    <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{cat.perfilIdeal}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab: Aseguradoras */}
          {tabActiva === 'aseguradoras' && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
                {cat.aseguradoras.map(aId => {
                  const a = ASEGURADORAS[aId]
                  if (!a) return null
                  return (
                    <div key={aId} style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: 10, border: '1px solid var(--border)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <span style={{ fontSize: '1.4rem' }}>{a.emoji}</span>
                          <div>
                            <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{a.nombre}</div>
                          </div>
                        </div>
                        <span className="badge badge-gold">{a.calificacion}</span>
                      </div>
                      <div style={{ marginBottom: 8 }}>
                        {a.pros.slice(0, 2).map((p, i) => <div key={i} className="pro-item" style={{ fontSize: '0.8rem' }}>{p}</div>)}
                      </div>
                      <div>
                        {a.contras.slice(0, 1).map((c, i) => <div key={i} className="con-item" style={{ fontSize: '0.8rem' }}>{c}</div>)}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Tab: Costos */}
          {tabActiva === 'costos' && (
            <div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 16 }}>
                Rangos de primas estimados basados en tarifas del mercado mexicano 2024-2025.
              </p>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Perfil</th>
                    <th>Prima mínima</th>
                    <th>Prima máxima</th>
                    <th>Período</th>
                  </tr>
                </thead>
                <tbody>
                  {cat.costos.map((c, i) => (
                    <tr key={i}>
                      <td>{c.perfil}</td>
                      <td style={{ color: 'var(--success)', fontWeight: 600 }}>
                        ${c.min.toLocaleString('es-MX')}
                      </td>
                      <td style={{ color: 'var(--gold)', fontWeight: 600 }}>
                        ${c.max.toLocaleString('es-MX')}
                      </td>
                      <td><span className="tag">{c.periodo}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ marginTop: 16, fontSize: '0.78rem', color: 'var(--text-muted) ' }}>
                * Los precios varían según edad, historial de salud, zona geográfica y plan específico contratado.
              </div>
            </div>
          )}

          {/* Tab: Ratings */}
          {tabActiva === 'ratings' && (
            <div>
              {/* Explicación metodología */}
              <div style={{
                padding: '14px 16px', borderRadius: 10, marginBottom: 24,
                background: 'rgba(201,168,76,0.06)', border: '1px solid var(--gold-border)',
              }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}>
                  ¿Cómo se calcula el score?
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: 10 }}>
                  El <strong style={{ color: 'var(--text-primary)' }}>score de conveniencia (1–10)</strong> refleja qué tan recomendable es este tipo de seguro para el mexicano promedio. Se calcula con 4 criterios:
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 8 }}>
                  {[
                    { icon: '💰', label: 'Costo-Beneficio', desc: 'Qué tan buena es la relación entre prima y protección real que recibes.' },
                    { icon: '🛡️', label: 'Amplitud de Cobertura', desc: 'Qué tan completa y amplia es la protección que ofrece el seguro.' },
                    { icon: '⭐', label: 'Calidad de Servicio', desc: 'Tiempos de respuesta y facilidad para hacer reclamaciones.' },
                    { icon: '🏥', label: 'Red de Servicio', desc: 'Tamaño y calidad de hospitales, talleres o prestadores afiliados.' },
                  ].map((c, i) => (
                    <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                      <span style={{ fontSize: '1rem', flexShrink: 0, marginTop: 1 }}>{c.icon}</span>
                      <div>
                        <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>{c.label}</div>
                        <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{c.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: 10 }}>
                  * El score es independiente de la aseguradora y evalúa el <em>tipo de seguro</em>, no un producto específico.
                </p>
              </div>

              <div className="grid-2" style={{ gap: 32 }}>
                <div>
                  <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-secondary)', marginBottom: 20 }}>
                    Desglose por criterio
                  </h4>
                  <ScoreBar label="Costo-Beneficio" value={cat.ratings.costoBeneficio} />
                  <ScoreBar label="Amplitud de Cobertura" value={cat.ratings.cobertura} />
                  <ScoreBar label="Calidad de Servicio" value={cat.ratings.servicio} />
                  <ScoreBar label="Red de Hospitales/Talleres" value={cat.ratings.red} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{
                    width: 120, height: 120, borderRadius: '50%',
                    border: '4px solid var(--gold)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    background: 'var(--gold-dim)',
                    boxShadow: 'var(--shadow-gold)',
                  }}>
                    <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.8rem', color: 'var(--gold)', fontWeight: 700, lineHeight: 1 }}>
                      {cat.scoreGeneral}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: 2 }}>/ 10</div>
                  </div>
                  <p style={{ marginTop: 16, fontSize: '0.82rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
                    Score general de conveniencia
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* CTA */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
            <button className="btn-primary" onClick={onCotizar} style={{ fontSize: '0.88rem', padding: '12px 22px' }}>
              Cotizar {cat.nombre} →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function ComparadorPage({ onCotizar }) {
  const [categoriaActiva, setCategoriaActiva] = useState('todas')

  return (
    <div style={{ padding: '60px 0 40px' }}>
      {/* Hero */}
      <div className="container" style={{ marginBottom: 60 }}>
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
          <p className="section-eyebrow" style={{ textAlign: 'center' }}>Guía Editorial · Mercado Mexicano 2025</p>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', marginBottom: 20, lineHeight: 1.15 }}>
            Compara los mejores seguros<br />
            <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>disponibles en México</em>
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 32 }}>
            Análisis independiente de 8 categorías de seguros con datos reales del mercado 2024-2025.
            Costos, coberturas y comparativa de las 10 principales aseguradoras.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn-primary" onClick={onCotizar}>
              Cotizar mi seguro →
            </button>
            <button className="btn-secondary" onClick={() => document.getElementById('recomendador')?.scrollIntoView({ behavior: 'smooth' })}>
              ¿Qué seguro necesito?
            </button>
          </div>
        </div>
      </div>

      {/* Stats banner */}
      <div style={{ background: 'rgba(201,168,76,0.05)', borderTop: '1px solid var(--gold-border)', borderBottom: '1px solid var(--gold-border)', marginBottom: 60 }}>
        <div className="container" style={{ padding: '24px 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 32, textAlign: 'center' }}>
            {[
              { valor: '15', label: 'Aseguradoras analizadas', icon: '🏦' },
              { valor: '8', label: 'Categorías de seguros', icon: '📊' },
              { valor: '$0', label: 'Sin comisión ni parcialidad', icon: '✅' },
              { valor: '100%', label: 'Datos México 2025', icon: '🇲🇽' },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontSize: '1.4rem', marginBottom: 4 }}>{s.icon}</div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--gold)', fontWeight: 700 }}>{s.valor}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recomendador inteligente */}
      <div id="recomendador" className="container" style={{ marginBottom: 70 }}>
        <RecomendadorInteligente onCotizar={onCotizar} />
      </div>

      <div className="divider-gold" style={{ margin: '0 0 60px' }} />

      {/* Categorías */}
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <p className="section-eyebrow">Análisis completo</p>
            <h2 style={{ fontSize: '1.8rem' }}>Categorías de Seguros</h2>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button
              onClick={() => setCategoriaActiva('todas')}
              className={`btn-gold-outline`}
              style={{ background: categoriaActiva === 'todas' ? 'var(--gold-dim)' : 'transparent', fontSize: '0.82rem', padding: '8px 14px' }}
            >
              Todas
            </button>
            {CATEGORIAS.map(c => (
              <button
                key={c.id}
                onClick={() => setCategoriaActiva(c.id)}
                style={{
                  background: categoriaActiva === c.id ? 'var(--gold-dim)' : 'transparent',
                  color: categoriaActiva === c.id ? 'var(--gold)' : 'var(--text-muted)',
                  border: `1px solid ${categoriaActiva === c.id ? 'var(--gold-border)' : 'var(--border)'}`,
                  borderRadius: 6, padding: '8px 12px', fontSize: '0.78rem',
                  cursor: 'pointer', transition: 'all 0.15s',
                }}
              >
                {c.icono} {c.nombre.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {CATEGORIAS
          .filter(c => categoriaActiva === 'todas' || c.id === categoriaActiva)
          .map(cat => (
            <CategoriaCard key={cat.id} cat={cat} onCotizar={onCotizar} />
          ))
        }
      </div>
    </div>
  )
}
