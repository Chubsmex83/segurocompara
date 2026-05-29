export default function Step5Preferencias({ datos, onChange, onNext, onPrev }) {
  return (
    <div>
      <h2 style={{ fontSize: '1.4rem', marginBottom: 6 }}>Preferencias de cobertura</h2>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: 28 }}>
        Personaliza los resultados según tus prioridades y presupuesto.
      </p>

      {/* Presupuesto */}
      <div className="form-group">
        <label className="form-label">Presupuesto disponible (mensual)</label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
          {[
            { v: 'menos500', l: 'Menos de $500/mes', d: 'Coberturas esenciales' },
            { v: '500-1500', l: '$500 – $1,500/mes', d: 'Cobertura equilibrada' },
            { v: '1500-4000', l: '$1,500 – $4,000/mes', d: 'Cobertura amplia' },
            { v: 'mas4000', l: 'Más de $4,000/mes', d: 'Cobertura premium' },
          ].map(op => (
            <button key={op.v} type="button"
              onClick={() => onChange({ presupuesto: op.v })}
              style={{
                padding: '14px 12px', borderRadius: 10, textAlign: 'left',
                border: `1px solid ${datos.presupuesto === op.v ? 'var(--gold)' : 'var(--border)'}`,
                background: datos.presupuesto === op.v ? 'var(--gold-dim)' : 'rgba(255,255,255,0.03)',
                cursor: 'pointer', transition: 'all 0.15s',
              }}>
              <div style={{ fontWeight: 600, fontSize: '0.88rem', color: datos.presupuesto === op.v ? 'var(--gold)' : 'var(--text-primary)', marginBottom: 3 }}>{op.l}</div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>{op.d}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Prioridad */}
      <div className="form-group">
        <label className="form-label">Tu prioridad principal</label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {[
            { v: 'precio', l: '💰 Precio', d: 'El costo más bajo posible' },
            { v: 'cobertura', l: '🛡️ Cobertura', d: 'La protección más amplia' },
            { v: 'red', l: '🏥 Red de servicio', d: 'Mejor red de hospitales o talleres' },
          ].map(op => (
            <button key={op.v} type="button"
              onClick={() => onChange({ prioridad: op.v })}
              style={{
                padding: '14px 10px', borderRadius: 10, textAlign: 'center',
                border: `1px solid ${datos.prioridad === op.v ? 'var(--gold)' : 'var(--border)'}`,
                background: datos.prioridad === op.v ? 'var(--gold-dim)' : 'rgba(255,255,255,0.03)',
                cursor: 'pointer', transition: 'all 0.15s',
              }}>
              <div style={{ fontSize: '1.4rem', marginBottom: 6 }}>{op.l.split(' ')[0]}</div>
              <div style={{ fontWeight: 600, fontSize: '0.85rem', color: datos.prioridad === op.v ? 'var(--gold)' : 'var(--text-primary)' }}>
                {op.l.split(' ').slice(1).join(' ')}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: 3 }}>{op.d}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Forma de pago */}
      <div className="form-group">
        <label className="form-label">Forma de pago preferida</label>
        <div style={{ display: 'flex', gap: 10 }}>
          {[
            { v: 'mensual', l: '📅 Mensual', extra: '+5% aprox.' },
            { v: 'trimestral', l: '📅 Trimestral', extra: '+2% aprox.' },
            { v: 'semestral', l: '📅 Semestral', extra: '+1% aprox.' },
            { v: 'anual', l: '📅 Anual', extra: 'Sin recargo' },
          ].map(op => (
            <button key={op.v} type="button"
              onClick={() => onChange({ formaPago: op.v })}
              style={{
                flex: 1, padding: '12px 6px', borderRadius: 8, textAlign: 'center',
                border: `1px solid ${datos.formaPago === op.v ? 'var(--gold)' : 'var(--border)'}`,
                background: datos.formaPago === op.v ? 'var(--gold-dim)' : 'rgba(255,255,255,0.03)',
                cursor: 'pointer', transition: 'all 0.15s',
              }}>
              <div style={{ fontWeight: 600, fontSize: '0.82rem', color: datos.formaPago === op.v ? 'var(--gold)' : 'var(--text-primary)' }}>
                {op.l.split(' ')[1]}
              </div>
              <div style={{ fontSize: '0.68rem', color: datos.formaPago === op.v ? 'var(--gold)' : 'var(--text-muted)', marginTop: 3 }}>{op.extra}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Filtro AAA */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px', borderRadius: 10, border: '1px solid var(--border)',
        background: 'rgba(255,255,255,0.03)', marginBottom: 24,
      }}>
        <div>
          <div style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--text-primary)', marginBottom: 2 }}>
            Solo aseguradoras con calificación AAA
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
            GNP, AXA, MetLife y Allianz. Mayor solidez financiera garantizada.
          </div>
        </div>
        <button
          onClick={() => onChange({ soloAAA: !datos.soloAAA })}
          style={{
            width: 52, height: 28, borderRadius: 14, flexShrink: 0,
            background: datos.soloAAA ? 'var(--gold)' : 'rgba(255,255,255,0.1)',
            border: `1px solid ${datos.soloAAA ? 'var(--gold)' : 'var(--border)'}`,
            cursor: 'pointer', position: 'relative', transition: 'all 0.2s',
          }}
        >
          <div style={{
            position: 'absolute', top: 3, left: datos.soloAAA ? 26 : 3,
            width: 20, height: 20, borderRadius: '50%',
            background: datos.soloAAA ? '#0A0A0F' : 'var(--text-muted)',
            transition: 'left 0.2s',
          }} />
        </button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button className="btn-secondary" onClick={onPrev}>← Atrás</button>
        <button className="btn-primary" onClick={onNext}>
          Ver cotización →
        </button>
      </div>
    </div>
  )
}
