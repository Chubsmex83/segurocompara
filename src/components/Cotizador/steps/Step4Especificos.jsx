function FormGMM({ datos, onChange }) {
  return (
    <div>
      <div className="form-group">
        <label className="form-label">Tipo de cobertura</label>
        <div style={{ display: 'flex', gap: 10 }}>
          {[{ v: 'individual', l: '👤 Individual' }, { v: 'familiar', l: '👨‍👩‍👧‍👦 Familiar' }].map(op => (
            <button key={op.v} type="button" onClick={() => onChange({ tipoCobertura: op.v })}
              style={{
                flex: 1, padding: 12, borderRadius: 8,
                border: `1px solid ${datos.tipoCobertura === op.v ? 'var(--gold)' : 'var(--border)'}`,
                background: datos.tipoCobertura === op.v ? 'var(--gold-dim)' : 'rgba(255,255,255,0.03)',
                color: datos.tipoCobertura === op.v ? 'var(--gold)' : 'var(--text-secondary)',
                fontWeight: datos.tipoCobertura === op.v ? 600 : 400, cursor: 'pointer',
                fontSize: '0.88rem', transition: 'all 0.15s',
              }}>
              {op.l}
            </button>
          ))}
        </div>
      </div>
      {datos.tipoCobertura === 'familiar' && (
        <div className="form-group">
          <label className="form-label">Número de integrantes</label>
          <select value={datos.numIntegrantes || ''} onChange={e => onChange({ numIntegrantes: e.target.value })}>
            <option value="">Seleccionar...</option>
            {['2', '3', '4', '5', '6+'].map(n => <option key={n} value={n}>{n} personas</option>)}
          </select>
        </div>
      )}
      <div className="form-group">
        <label className="form-label">Nivel hospitalario deseado</label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {[
            { v: 'basico', l: 'Básico', d: 'Hospitales de 1ra y 2da categoría', precio: '$$' },
            { v: 'intermedio', l: 'Intermedio', d: 'Hospitales de 2da y 3ra categoría', precio: '$$$' },
            { v: 'premium', l: 'Premium', d: 'Hospitales de 3ra categoría y privados de élite', precio: '$$$$' },
          ].map(op => (
            <button key={op.v} type="button" onClick={() => onChange({ nivelHospitalario: op.v })}
              style={{
                padding: '14px 10px', borderRadius: 10,
                border: `1px solid ${datos.nivelHospitalario === op.v ? 'var(--gold)' : 'var(--border)'}`,
                background: datos.nivelHospitalario === op.v ? 'var(--gold-dim)' : 'rgba(255,255,255,0.03)',
                cursor: 'pointer', textAlign: 'center', transition: 'all 0.15s',
              }}>
              <div style={{ fontWeight: 600, color: datos.nivelHospitalario === op.v ? 'var(--gold)' : 'var(--text-primary)', fontSize: '0.9rem' }}>{op.l}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', margin: '4px 0' }}>{op.d}</div>
              <div style={{ color: 'var(--gold)', fontSize: '0.8rem' }}>{op.precio}</div>
            </button>
          ))}
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">Deducible preferido</label>
        <select value={datos.deduciblePreferido || ''} onChange={e => onChange({ deduciblePreferido: e.target.value })}>
          <option value="">Seleccionar...</option>
          <option value="bajo">Bajo ($3,000 – $6,000) — prima más alta</option>
          <option value="medio">Medio ($8,000 – $15,000) — equilibrado</option>
          <option value="alto">Alto ($20,000 – $40,000) — prima más baja</option>
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">¿Tienes seguro actual? (portabilidad)</label>
        <div style={{ display: 'flex', gap: 10 }}>
          {['Sí, deseo portabilidad', 'No, es contratación nueva'].map(op => (
            <button key={op} type="button" onClick={() => onChange({ tieneSeguroActual: op })}
              style={{
                flex: 1, padding: '10px 8px', borderRadius: 8,
                border: `1px solid ${datos.tieneSeguroActual === op ? 'var(--gold)' : 'var(--border)'}`,
                background: datos.tieneSeguroActual === op ? 'var(--gold-dim)' : 'rgba(255,255,255,0.03)',
                color: datos.tieneSeguroActual === op ? 'var(--gold)' : 'var(--text-secondary)',
                fontWeight: datos.tieneSeguroActual === op ? 600 : 400, cursor: 'pointer',
                fontSize: '0.8rem', transition: 'all 0.15s',
              }}>
              {op}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function FormVida({ datos, onChange }) {
  return (
    <div>
      <div className="form-group">
        <label className="form-label">Suma asegurada deseada (MXN)</label>
        <select value={datos.sumaAsegurada || ''} onChange={e => onChange({ sumaAsegurada: e.target.value })}>
          <option value="">Seleccionar...</option>
          {['500000', '750000', '1000000', '1500000', '2000000', '3000000', '5000000', '10000000'].map(s => (
            <option key={s} value={s}>${parseInt(s).toLocaleString('es-MX')} MXN</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">Tipo de seguro de vida</label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {[
            { v: 'temporal20', l: 'Temporal 20 años', d: 'Prima más baja, cobertura por 20 años' },
            { v: 'temporal10', l: 'Temporal 10 años', d: 'La opción más económica disponible' },
            { v: 'entera', l: 'Vida entera', d: 'Cobertura de por vida + ahorro' },
            { v: 'dotatal', l: 'Dotal / Mixto', d: 'Seguro de vida con ahorro garantizado' },
          ].map(op => (
            <button key={op.v} type="button" onClick={() => onChange({ tipoVida: op.v })}
              style={{
                padding: '14px 12px', borderRadius: 10, textAlign: 'left',
                border: `1px solid ${datos.tipoVida === op.v ? 'var(--gold)' : 'var(--border)'}`,
                background: datos.tipoVida === op.v ? 'var(--gold-dim)' : 'rgba(255,255,255,0.03)',
                cursor: 'pointer', transition: 'all 0.15s',
              }}>
              <div style={{ fontWeight: 600, color: datos.tipoVida === op.v ? 'var(--gold)' : 'var(--text-primary)', fontSize: '0.88rem', marginBottom: 4 }}>{op.l}</div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>{op.d}</div>
            </button>
          ))}
        </div>
      </div>
      <div className="grid-2">
        <div className="form-group">
          <label className="form-label">Dependientes económicos</label>
          <select value={datos.dependientes || ''} onChange={e => onChange({ dependientes: e.target.value })}>
            <option value="">Seleccionar...</option>
            {['0', '1', '2', '3', '4', '5+'].map(d => <option key={d} value={d}>{d === '0' ? 'Sin dependientes' : `${d} dependiente${d !== '1' ? 's' : ''}`}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Ingresos mensuales (aprox.)</label>
          <select value={datos.ingresos || ''} onChange={e => onChange({ ingresos: e.target.value })}>
            <option value="">Seleccionar...</option>
            <option value="menos20k">Menos de $20,000</option>
            <option value="20-40k">$20,000 – $40,000</option>
            <option value="40-80k">$40,000 – $80,000</option>
            <option value="80-150k">$80,000 – $150,000</option>
            <option value="mas150k">Más de $150,000</option>
          </select>
        </div>
      </div>
    </div>
  )
}

function FormAuto({ datos, onChange }) {
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 25 }, (_, i) => currentYear - i)
  return (
    <div>
      <div className="grid-2">
        <div className="form-group">
          <label className="form-label">Marca del vehículo</label>
          <select value={datos.marca || ''} onChange={e => onChange({ marca: e.target.value })}>
            <option value="">Seleccionar...</option>
            {['Nissan', 'Chevrolet', 'Toyota', 'Volkswagen', 'Honda', 'Ford', 'Kia', 'Hyundai', 'Mazda', 'Dodge', 'Jeep', 'BMW', 'Mercedes-Benz', 'Audi', 'Tesla', 'Otro'].map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Modelo</label>
          <input type="text" placeholder="Ej. Versa, Aveo, Corolla..." value={datos.modelo || ''} onChange={e => onChange({ modelo: e.target.value })} />
        </div>
        <div className="form-group">
          <label className="form-label">Año del vehículo</label>
          <select value={datos.anio || ''} onChange={e => onChange({ anio: e.target.value })}>
            <option value="">Seleccionar...</option>
            {years.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Uso principal</label>
          <select value={datos.uso || ''} onChange={e => onChange({ uso: e.target.value })}>
            <option value="">Seleccionar...</option>
            <option value="particular">Particular / Familiar</option>
            <option value="uber">Uber / DiDi / Plataformas</option>
            <option value="comercial">Comercial / Empresa</option>
          </select>
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">Tipo de cobertura deseada</label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {[
            { v: 'rc', l: 'Solo RC', d: 'Responsabilidad Civil básica' },
            { v: 'limitada', l: 'Limitada', d: 'RC + Robo total + Daños por accidente de tercero' },
            { v: 'amplia', l: 'Amplia', d: 'Cobertura completa: daños propios, robo, RC' },
          ].map(op => (
            <button key={op.v} type="button" onClick={() => onChange({ tipoCobertura: op.v })}
              style={{
                padding: '14px 10px', borderRadius: 10, textAlign: 'left',
                border: `1px solid ${datos.tipoCobertura === op.v ? 'var(--gold)' : 'var(--border)'}`,
                background: datos.tipoCobertura === op.v ? 'var(--gold-dim)' : 'rgba(255,255,255,0.03)',
                cursor: 'pointer', transition: 'all 0.15s',
              }}>
              <div style={{ fontWeight: 600, color: datos.tipoCobertura === op.v ? 'var(--gold)' : 'var(--text-primary)', fontSize: '0.88rem', marginBottom: 4 }}>{op.l}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>{op.d}</div>
            </button>
          ))}
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">Siniestros en los últimos 3 años</label>
        <select value={datos.siniestros || ''} onChange={e => onChange({ siniestros: e.target.value })}>
          <option value="">Seleccionar...</option>
          <option value="0">Sin siniestros</option>
          <option value="1">1 siniestro</option>
          <option value="2">2 siniestros</option>
          <option value="3+">3 o más siniestros</option>
        </select>
      </div>
    </div>
  )
}

function FormCasa({ datos, onChange }) {
  return (
    <div>
      <div className="form-group">
        <label className="form-label">Valor aproximado de la propiedad (MXN)</label>
        <select value={datos.valorPropiedad || ''} onChange={e => onChange({ valorPropiedad: e.target.value })}>
          <option value="">Seleccionar...</option>
          {[500000, 1000000, 1500000, 2000000, 3000000, 4000000, 5000000, 7000000, 10000000].map(v => (
            <option key={v} value={v}>${v.toLocaleString('es-MX')} MXN</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">Tipo de propiedad</label>
        <div style={{ display: 'flex', gap: 10 }}>
          {[{ v: 'propia', l: '🏠 Casa propia' }, { v: 'rentada', l: '🏢 Rentada (solo contenidos)' }].map(op => (
            <button key={op.v} type="button" onClick={() => onChange({ tipoPropiedad: op.v })}
              style={{
                flex: 1, padding: 12, borderRadius: 8,
                border: `1px solid ${datos.tipoPropiedad === op.v ? 'var(--gold)' : 'var(--border)'}`,
                background: datos.tipoPropiedad === op.v ? 'var(--gold-dim)' : 'rgba(255,255,255,0.03)',
                color: datos.tipoPropiedad === op.v ? 'var(--gold)' : 'var(--text-secondary)',
                cursor: 'pointer', fontSize: '0.88rem', fontWeight: datos.tipoPropiedad === op.v ? 600 : 400, transition: 'all 0.15s',
              }}>
              {op.l}
            </button>
          ))}
        </div>
      </div>
      <div className="grid-2">
        <div className="form-group">
          <label className="form-label">Tipo de construcción</label>
          <select value={datos.tipoConstruccion || ''} onChange={e => onChange({ tipoConstruccion: e.target.value })}>
            <option value="">Seleccionar...</option>
            <option value="solida">Sólida (concreto/tabique)</option>
            <option value="mixta">Mixta</option>
            <option value="madera">Madera o ligera</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">¿Tiene hipoteca activa?</label>
          <div style={{ display: 'flex', gap: 10 }}>
            {['Sí', 'No'].map(op => (
              <button key={op} type="button" onClick={() => onChange({ hipoteca: op })}
                style={{
                  flex: 1, padding: 12, borderRadius: 8,
                  border: `1px solid ${datos.hipoteca === op ? 'var(--gold)' : 'var(--border)'}`,
                  background: datos.hipoteca === op ? 'var(--gold-dim)' : 'rgba(255,255,255,0.03)',
                  color: datos.hipoteca === op ? 'var(--gold)' : 'var(--text-secondary)',
                  cursor: 'pointer', fontSize: '0.88rem', fontWeight: datos.hipoteca === op ? 600 : 400, transition: 'all 0.15s',
                }}>
                {op}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function FormViaje({ datos, onChange }) {
  return (
    <div>
      <div className="form-group">
        <label className="form-label">Destino del viaje</label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
          {[
            { v: 'nacional', l: '🇲🇽 Nacional', d: 'Dentro de México' },
            { v: 'usa_canada', l: '🇺🇸 EUA / Canadá', d: 'Mayor riesgo económico' },
            { v: 'europa', l: '🇪🇺 Europa', d: 'Obligatorio para visa Schengen' },
            { v: 'otro', l: '🌍 Otro Internacional', d: 'Asia, Latinoamérica, etc.' },
          ].map(op => (
            <button key={op.v} type="button" onClick={() => onChange({ destino: op.v })}
              style={{
                padding: '12px', borderRadius: 10, textAlign: 'left',
                border: `1px solid ${datos.destino === op.v ? 'var(--gold)' : 'var(--border)'}`,
                background: datos.destino === op.v ? 'var(--gold-dim)' : 'rgba(255,255,255,0.03)',
                cursor: 'pointer', transition: 'all 0.15s',
              }}>
              <div style={{ fontWeight: 600, color: datos.destino === op.v ? 'var(--gold)' : 'var(--text-primary)', fontSize: '0.88rem' }}>{op.l}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: 2 }}>{op.d}</div>
            </button>
          ))}
        </div>
      </div>
      <div className="grid-2">
        <div className="form-group">
          <label className="form-label">Número de viajeros</label>
          <select value={datos.numViajeros || ''} onChange={e => onChange({ numViajeros: e.target.value })}>
            <option value="">Seleccionar...</option>
            {['1', '2', '3', '4', '5', '6+'].map(n => <option key={n} value={n}>{n} {n === '1' ? 'persona' : 'personas'}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Duración aproximada (días)</label>
          <select value={datos.duracion || ''} onChange={e => onChange({ duracion: e.target.value })}>
            <option value="">Seleccionar...</option>
            {['3', '5', '7', '10', '14', '21', '30', '60', '90+'].map(d => <option key={d} value={d}>{d} días</option>)}
          </select>
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">Actividades a realizar</label>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {['Turismo general', 'Negocios', 'Deportes de invierno', 'Actividades acuáticas', 'Deportes extremos', 'Crucero'].map(a => (
            <button key={a} type="button"
              onClick={() => {
                const acts = datos.actividades || []
                onChange({ actividades: acts.includes(a) ? acts.filter(x => x !== a) : [...acts, a] })
              }}
              style={{
                padding: '8px 14px', borderRadius: 6,
                border: `1px solid ${(datos.actividades || []).includes(a) ? 'var(--gold)' : 'var(--border)'}`,
                background: (datos.actividades || []).includes(a) ? 'var(--gold-dim)' : 'rgba(255,255,255,0.03)',
                color: (datos.actividades || []).includes(a) ? 'var(--gold)' : 'var(--text-secondary)',
                cursor: 'pointer', fontSize: '0.82rem', transition: 'all 0.15s',
              }}>
              {(datos.actividades || []).includes(a) ? '✓ ' : ''}{a}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function FormGenerico({ tipo }) {
  const mensajes = {
    retiro: '🌅 Para el plan de retiro, utilizaremos tu edad y datos personales para proyectar el capital acumulado al retiro. Continúa para ver las opciones disponibles.',
    gmmenores: '💊 Para gastos médicos menores, la cotización se basa principalmente en tu edad y si es cobertura individual o familiar.',
    negocio: '🏢 Para el seguro de negocio, el cotizador generará opciones basadas en el tamaño general de tu empresa. Un agente especializado te contactará para afinar detalles.',
  }
  return (
    <div style={{ padding: '20px', background: 'rgba(201,168,76,0.06)', borderRadius: 12, border: '1px solid var(--gold-border)' }}>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.7 }}>
        {mensajes[tipo] || 'Continúa para ver las opciones de cotización disponibles para este tipo de seguro.'}
      </p>
    </div>
  )
}

export default function Step4Especificos({ tipoSeguro, datos, onChange, onNext, onPrev }) {
  const TITULOS = {
    gmm: 'Detalles de tu cobertura médica',
    vida: 'Detalles del seguro de vida',
    auto: 'Información de tu vehículo',
    casa: 'Información de tu propiedad',
    viaje: 'Detalles del viaje',
    retiro: 'Plan de retiro',
    gmmenores: 'Cobertura médica menor',
    negocio: 'Datos de tu negocio',
  }

  return (
    <div>
      <h2 style={{ fontSize: '1.4rem', marginBottom: 6 }}>{TITULOS[tipoSeguro]}</h2>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: 24 }}>
        Información específica para calcular tu cotización con precisión.
      </p>

      {tipoSeguro === 'gmm' && <FormGMM datos={datos} onChange={onChange} />}
      {tipoSeguro === 'vida' && <FormVida datos={datos} onChange={onChange} />}
      {tipoSeguro === 'auto' && <FormAuto datos={datos} onChange={onChange} />}
      {tipoSeguro === 'casa' && <FormCasa datos={datos} onChange={onChange} />}
      {tipoSeguro === 'viaje' && <FormViaje datos={datos} onChange={onChange} />}
      {['retiro', 'gmmenores', 'negocio'].includes(tipoSeguro) && <FormGenerico tipo={tipoSeguro} />}

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24 }}>
        <button className="btn-secondary" onClick={onPrev}>← Atrás</button>
        <button className="btn-primary" onClick={onNext}>Continuar →</button>
      </div>
    </div>
  )
}
