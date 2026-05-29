import { useMemo, useState } from 'react'
import { calcularCotizacion } from '../../../utils/cotizador'

const NOMBRES_TIPO = {
  gmm: 'Gastos Médicos Mayores', vida: 'Seguro de Vida', auto: 'Seguro de Auto',
  casa: 'Seguro de Casa', retiro: 'Plan de Retiro', gmmenores: 'Gastos Médicos Menores',
  viaje: 'Seguro de Viaje', negocio: 'Seguro de Negocio',
}

const ICONOS = { gmm: '🏥', vida: '❤️', auto: '🚗', casa: '🏠', retiro: '🌅', gmmenores: '💊', viaje: '✈️', negocio: '🏢' }

function formatMXN(n) {
  return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(n)
}

function aplicarFormaPago(primaAnual, formaPago) {
  const factores = { mensual: 1.05, trimestral: 1.02, semestral: 1.01, anual: 1.0 }
  const total = primaAnual * (factores[formaPago] || 1.0)
  if (formaPago === 'mensual') return { label: 'mensual', monto: total / 12 }
  if (formaPago === 'trimestral') return { label: 'trimestral', monto: total / 4 }
  if (formaPago === 'semestral') return { label: 'semestral', monto: total / 2 }
  return { label: 'anual', monto: total }
}

function ScoreDial({ score }) {
  const pct = (score / 10) * 100
  return (
    <div style={{
      width: 56, height: 56, borderRadius: '50%',
      background: `conic-gradient(var(--gold) 0%, var(--gold) ${pct}%, rgba(255,255,255,0.06) ${pct}%, rgba(255,255,255,0.06) 100%)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: 'inset 0 0 0 6px var(--bg-secondary)',
    }}>
      <span style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1rem', color: 'var(--gold)' }}>{score}</span>
    </div>
  )
}

export default function Step6Resultados({ state, onReset, onPrev }) {
  const [expandedIdx, setExpandedIdx] = useState(0)

  const resultados = useMemo(() => calcularCotizacion(state), [state])
  const formaPago = state.preferencias.formaPago || 'anual'
  const nombre = state.datosPersonales.nombre || 'tu perfil'

  function downloadText() {
    const lines = [
      `COTIZACIÓN DE SEGURO — SeguroCompara`,
      `Fecha: ${new Date().toLocaleDateString('es-MX')}`,
      `Titular: ${nombre}`,
      `Tipo de seguro: ${NOMBRES_TIPO[state.tipoSeguro]}`,
      ``,
      `TOP 3 OPCIONES:`,
      ...resultados.map((r, i) => [
        ``,
        `${i + 1}. ${r.aseguradora} — ${r.plan}${r.esMejorOpcion ? ' ★ MEJOR OPCIÓN' : ''}`,
        `   Prima anual: ${formatMXN(r.primaAnual)}`,
        `   Prima mensual: ${formatMXN(r.primaAnual / 12)}`,
        `   Deducible: ${r.deducible ? formatMXN(r.deducible) : 'N/A'}`,
        `   Suma asegurada: ${formatMXN(r.sumaAsegurada)}`,
        `   Score: ${r.score}/10`,
        `   Justificación: ${r.justificacion}`,
      ].flat()),
      ``,
      `Nota: Los precios son estimados basados en datos del mercado mexicano 2024-2025.`,
      `Los datos de esta cotización se procesaron localmente y no fueron compartidos con terceros.`,
    ]
    const blob = new Blob([lines.join('\n')], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `cotizacion-${state.tipoSeguro}-segurocompara.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const mejorOpcion = resultados.find(r => r.esMejorOpcion) || resultados[0]

  return (
    <div>
      {/* Header resultado */}
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <div style={{ fontSize: '2rem', marginBottom: 8 }}>{ICONOS[state.tipoSeguro]}</div>
        <p className="section-eyebrow">Cotización completada</p>
        <h2 style={{ fontSize: '1.5rem', marginBottom: 8 }}>
          {NOMBRES_TIPO[state.tipoSeguro]}
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
          {resultados.length} opciones encontradas para {nombre.split(' ')[0] || 'ti'}
        </p>
      </div>

      {/* Mejor opción destacada */}
      <div style={{
        padding: '24px', borderRadius: 16, marginBottom: 24,
        background: 'linear-gradient(135deg, rgba(201,168,76,0.12) 0%, rgba(10,10,15,0) 100%)',
        border: '2px solid var(--gold)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: 0, right: 0 }}>
          <div style={{
            background: 'var(--gold)', color: '#0A0A0F',
            fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.08em',
            padding: '5px 12px', borderBottomLeftRadius: 10,
            textTransform: 'uppercase',
          }}>
            ⭐ Mejor opción para tu perfil
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--text-primary)', marginBottom: 4 }}>
              {mejorOpcion.aseguradora}
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 12 }}>{mejorOpcion.plan}</div>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Prima anual</div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--gold)', fontWeight: 700, lineHeight: 1.1 }}>
                  {formatMXN(mejorOpcion.primaAnual)}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Prima mensual</div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--text-secondary)', fontWeight: 700, lineHeight: 1.1 }}>
                  {formatMXN(mejorOpcion.primaAnual / 12)}
                </div>
              </div>
            </div>
          </div>
          <div>
            <ScoreDial score={mejorOpcion.score} />
          </div>
        </div>
        <div style={{ marginTop: 16, padding: '12px 14px', background: 'rgba(0,0,0,0.2)', borderRadius: 8 }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--gold)', fontWeight: 600, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Por qué es la mejor opción para ti
          </div>
          <p style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {mejorOpcion.justificacion}
          </p>
        </div>
      </div>

      {/* Tabla comparativa */}
      <div style={{ marginBottom: 24, overflowX: 'auto', width: '100%', WebkitOverflowScrolling: 'touch' }}>
        <h3 style={{ fontSize: '1rem', marginBottom: 14, color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
          Comparativa de las 3 opciones
        </h3>
        <table className="data-table" style={{ minWidth: 600 }}>
          <thead>
            <tr>
              <th>Aseguradora</th>
              <th>Prima anual</th>
              <th>Prima mensual</th>
              {mejorOpcion.deducible > 0 && <th>Deducible</th>}
              {mejorOpcion.coaseguro > 0 && <th>Coaseguro</th>}
              <th>Suma asegurada</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {resultados.map((r, i) => {
              const pago = aplicarFormaPago(r.primaAnual, formaPago)
              return (
                <tr key={i} onClick={() => setExpandedIdx(i === expandedIdx ? -1 : i)} style={{ cursor: 'pointer' }}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      {r.esMejorOpcion && <span style={{ color: 'var(--gold)', fontSize: '0.8rem' }}>⭐</span>}
                      <div>
                        <div style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.88rem' }}>{r.aseguradora}</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.74rem' }}>{r.plan}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ color: r.esMejorOpcion ? 'var(--gold)' : 'var(--text-secondary)', fontWeight: r.esMejorOpcion ? 700 : 400, fontFamily: 'var(--font-serif)' }}>
                    {formatMXN(r.primaAnual)}
                  </td>
                  <td style={{ fontSize: '0.88rem' }}>{formatMXN(r.primaAnual / 12)}</td>
                  {mejorOpcion.deducible > 0 && <td>{r.deducible ? formatMXN(r.deducible) : '—'}</td>}
                  {mejorOpcion.coaseguro > 0 && <td>{r.coaseguro ? `${r.coaseguro}%` : '—'}</td>}
                  <td>{r.sumaAsegurada > 0 ? formatMXN(r.sumaAsegurada) : 'N/A'}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ flex: 1, height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 2, minWidth: 40 }}>
                        <div style={{ height: '100%', width: `${r.score * 10}%`, background: 'var(--gold)', borderRadius: 2 }} />
                      </div>
                      <span style={{ color: 'var(--gold)', fontSize: '0.82rem', fontWeight: 600, minWidth: 28 }}>{r.score}</span>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Detalle expandible */}
      {expandedIdx >= 0 && resultados[expandedIdx] && (
        <div className="animate-in" style={{
          padding: '20px', borderRadius: 12, marginBottom: 24,
          background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)',
        }}>
          <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--gold)', marginBottom: 12 }}>
            Detalle: {resultados[expandedIdx].aseguradora}
          </div>
          <div className="grid-2" style={{ gap: 20 }}>
            <div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 8 }}>VENTAJAS</div>
              {(resultados[expandedIdx].pros || []).map((p, i) => (
                <div key={i} className="pro-item" style={{ fontSize: '0.82rem' }}>{p}</div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 8 }}>EXCLUSIONES IMPORTANTES</div>
              {(resultados[expandedIdx].exclusiones || []).map((e, i) => (
                <div key={i} className="con-item" style={{ fontSize: '0.82rem' }}>{e}</div>
              ))}
            </div>
          </div>
          <div style={{ marginTop: 14, padding: '10px 12px', background: 'rgba(201,168,76,0.06)', borderRadius: 8, border: '1px solid var(--gold-border)' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>Red de servicio</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{resultados[expandedIdx].red}</div>
          </div>
        </div>
      )}

      {/* CTAs */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24,
      }}>
        <button
          onClick={downloadText}
          style={{
            padding: '14px', borderRadius: 8, cursor: 'pointer',
            background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)',
            color: 'var(--text-secondary)', fontSize: '0.88rem', fontWeight: 500,
            fontFamily: 'var(--font-sans)', transition: 'all 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold-border)'; e.currentTarget.style.color = 'var(--gold)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
        >
          📄 Descargar cotización
        </button>
        <button
          style={{
            padding: '14px', borderRadius: 8, cursor: 'pointer',
            background: 'var(--gold-dim)', border: '1px solid var(--gold-border)',
            color: 'var(--gold)', fontSize: '0.88rem', fontWeight: 600,
            fontFamily: 'var(--font-sans)', transition: 'all 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.2)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'var(--gold-dim)' }}
        >
          📞 Contactar agente
        </button>
      </div>

      {/* Nota legal */}
      <div style={{ padding: '14px', background: 'rgba(255,255,255,0.02)', borderRadius: 8, border: '1px solid var(--border)', marginBottom: 24 }}>
        <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
          ⚠️ Los precios mostrados son estimaciones con base en tarifas referenciales del mercado mexicano 2024-2025.
          La prima final puede variar según evaluación médica, inspección del riesgo y condiciones específicas de la póliza.
          Esta cotización no constituye una oferta vinculante de contratación.
        </p>
      </div>

      {/* Nav */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button className="btn-secondary" onClick={onPrev} style={{ fontSize: '0.85rem' }}>← Modificar preferencias</button>
        <button className="btn-primary" onClick={onReset}>+ Nueva cotización</button>
      </div>
    </div>
  )
}
