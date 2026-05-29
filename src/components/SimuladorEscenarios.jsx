import { useState } from 'react'

const ESCENARIOS = [
  {
    id: 'accidente',
    icono: '🚑',
    titulo: 'Accidente grave',
    perfil: 'Carlos, 38 años, ingeniero, sin GMM privado',
    sinSeguro: [
      { concepto: 'Cirugía de urgencia', costo: 380000 },
      { concepto: '12 días en UCI', costo: 420000 },
      { concepto: 'Medicamentos y estudios', costo: 85000 },
      { concepto: 'Rehabilitación 6 meses', costo: 120000 },
    ],
    conSeguro: [
      { concepto: 'Deducible', costo: 10000 },
      { concepto: 'Coaseguro (10%) tope', costo: 30000 },
      { concepto: 'Todo lo demás', costo: 0, label: 'Lo cubre el seguro' },
    ],
    impacto: 'Carlos tuvo que vender su carro y usar sus ahorros de 8 años para pagar. Con GMM ($7,500/año), su costo hubiera sido $40,000 máximo.',
    seguroRecomendado: 'gmm',
  },
  {
    id: 'robo_auto',
    icono: '🔑',
    titulo: 'Robo del auto',
    perfil: 'Ana, 31 años, contadora, seguro solo de RC',
    sinSeguro: [
      { concepto: 'Valor del auto robado (Aveo 2021)', costo: 195000 },
      { concepto: 'Transporte alternativo 4 meses', costo: 18000 },
      { concepto: 'Crédito para auto nuevo', costo: 42000, label: 'Intereses 36 meses' },
    ],
    conSeguro: [
      { concepto: 'Deducible robo total (10%)', costo: 19500 },
      { concepto: 'Todo lo demás', costo: 0, label: 'Lo cubre el seguro' },
    ],
    impacto: 'Ana pagó $255,000 en total y tardó 3 años en recuperar su nivel financiero. Con cobertura amplia ($8,000/año), solo hubiera pagado el deducible de $19,500.',
    seguroRecomendado: 'auto',
  },
  {
    id: 'sismo',
    icono: '🏚️',
    titulo: 'Sismo: daños en casa',
    perfil: 'Roberto y María, 45 años, propietarios en CDMX, sin seguro de hogar',
    sinSeguro: [
      { concepto: 'Reparación estructural', costo: 520000 },
      { concepto: 'Renta temporal (8 meses)', costo: 64000 },
      { concepto: 'Reposición de contenidos', costo: 85000 },
      { concepto: 'Gastos legales e ingeniería', costo: 35000 },
    ],
    conSeguro: [
      { concepto: 'Deducible', costo: 8000 },
      { concepto: 'Coaseguro (10%)', costo: 52000 },
      { concepto: 'Todo lo demás', costo: 0, label: 'Lo cubre el seguro' },
    ],
    impacto: 'La pareja tuvo que pedir un préstamo hipotecario adicional de $500,000. Su seguro de hogar costaba $4,200/año — menos que una quincena de renta.',
    seguroRecomendado: 'casa',
  },
  {
    id: 'fallecimiento',
    icono: '👨‍👩‍👧',
    titulo: 'Fallecimiento del sostén familiar',
    perfil: 'Familia López: Jorge (40 años, sostén), esposa e hijos de 8 y 12 años',
    sinSeguro: [
      { concepto: 'Hipoteca restante', costo: 950000 },
      { concepto: 'Manutención familiar 10 años', costo: 2400000 },
      { concepto: 'Educación universitaria 2 hijos', costo: 1200000 },
      { concepto: 'Gastos funerarios', costo: 85000 },
    ],
    conSeguro: [
      { concepto: 'Prima anual seguro de vida', costo: 9800 },
      { concepto: 'Suma asegurada disponible', costo: 0, label: '$3,000,000 para la familia' },
    ],
    impacto: 'Sin seguro, la familia enfrentó la pérdida del hogar y los hijos tuvieron que dejar la escuela privada. Un seguro de vida por $9,800/año hubiera protegido el futuro de toda la familia.',
    seguroRecomendado: 'vida',
  },
  {
    id: 'viaje',
    icono: '✈️',
    titulo: 'Emergencia médica en EUA',
    perfil: 'Sofía, 27 años, viajó a Nueva York sin seguro de viaje',
    sinSeguro: [
      { concepto: 'Hospitalización 3 días en NYC', costo: 480000 },
      { concepto: 'Cirugía de apéndice', costo: 350000 },
      { concepto: 'Medicamentos', costo: 45000 },
      { concepto: 'Vuelo de regreso médico', costo: 120000 },
    ],
    conSeguro: [
      { concepto: 'Seguro de viaje 10 días a EUA', costo: 1200 },
      { concepto: 'Todo lo demás', costo: 0, label: 'Lo cubre el seguro' },
    ],
    impacto: 'Sofía regresó con una deuda de casi un millón de pesos. Su seguro de viaje hubiera costado $1,200 — el 0.12% de lo que terminó pagando.',
    seguroRecomendado: 'viaje',
  },
]

function fmt(n) {
  if (n === 0) return null
  return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(n)
}

export default function SimuladorEscenarios({ onCotizar }) {
  const [activo, setActivo] = useState(0)
  const esc = ESCENARIOS[activo]
  const totalSin = esc.sinSeguro.reduce((s, i) => s + i.costo, 0)
  const totalCon = esc.conSeguro.reduce((s, i) => s + i.costo, 0)
  const ahorro = totalSin - totalCon

  return (
    <section style={{ padding: '70px 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <p className="section-eyebrow" style={{ textAlign: 'center' }}>Simulador de escenarios</p>
          <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', marginBottom: 14 }}>
            ¿Qué pasaría <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>si...?</em>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: 520, margin: '0 auto' }}>
            Casos reales de personas que enfrentaron estos eventos con y sin seguro.
          </p>
        </div>

        {/* Tabs escenarios */}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 36 }}>
          {ESCENARIOS.map((e, i) => (
            <button key={e.id} onClick={() => setActivo(i)} style={{
              padding: '10px 16px', borderRadius: 8, cursor: 'pointer',
              background: activo === i ? 'var(--gold-dim)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${activo === i ? 'var(--gold)' : 'var(--border)'}`,
              color: activo === i ? 'var(--gold)' : 'var(--text-secondary)',
              fontFamily: 'var(--font-sans)', fontSize: '0.85rem', fontWeight: 500,
              transition: 'all 0.15s',
            }}>
              {e.icono} {e.titulo}
            </button>
          ))}
        </div>

        <div className="animate-in" style={{ maxWidth: 860, margin: '0 auto' }}>
          {/* Perfil */}
          <div style={{
            padding: '14px 18px', borderRadius: 10, marginBottom: 24,
            background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)',
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <span style={{ fontSize: '1.5rem' }}>👤</span>
            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--gold)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Perfil</div>
              <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>{esc.perfil}</div>
            </div>
          </div>

          {/* Tabla comparativa */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
            {/* Sin seguro */}
            <div style={{ padding: 20, borderRadius: 14, background: 'rgba(224,82,82,0.06)', border: '1px solid rgba(224,82,82,0.2)' }}>
              <div style={{ fontWeight: 700, color: 'var(--danger)', fontSize: '0.9rem', marginBottom: 16 }}>❌ Sin seguro</div>
              {esc.sinSeguro.map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '0.82rem', gap: 8 }}>
                  <span style={{ color: 'var(--text-secondary)' }}>{item.concepto}</span>
                  <span style={{ color: 'var(--danger)', fontWeight: 600, whiteSpace: 'nowrap' }}>{fmt(item.costo)}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 12, marginTop: 4 }}>
                <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.88rem' }}>Total a pagar</span>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--danger)', fontWeight: 700 }}>{fmt(totalSin)}</span>
              </div>
            </div>

            {/* Con seguro */}
            <div style={{ padding: 20, borderRadius: 14, background: 'rgba(76,175,124,0.06)', border: '1px solid rgba(76,175,124,0.2)' }}>
              <div style={{ fontWeight: 700, color: 'var(--success)', fontSize: '0.9rem', marginBottom: 16 }}>✅ Con seguro</div>
              {esc.conSeguro.map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '0.82rem', gap: 8 }}>
                  <span style={{ color: 'var(--text-secondary)' }}>{item.concepto}</span>
                  <span style={{ color: item.costo === 0 ? 'var(--success)' : 'var(--text-primary)', fontWeight: 600, whiteSpace: 'nowrap' }}>
                    {item.costo === 0 ? item.label : fmt(item.costo)}
                  </span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 12, marginTop: 4 }}>
                <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.88rem' }}>Total a pagar</span>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--success)', fontWeight: 700 }}>{fmt(totalCon)}</span>
              </div>
            </div>
          </div>

          {/* Ahorro */}
          <div style={{
            padding: '16px 20px', borderRadius: 10, marginBottom: 20,
            background: 'rgba(201,168,76,0.08)', border: '1px solid var(--gold-border)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12,
          }}>
            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--gold)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Ahorro con seguro</div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--gold)', fontWeight: 700 }}>{fmt(ahorro)}</div>
            </div>
            <button className="btn-primary" onClick={onCotizar} style={{ fontSize: '0.85rem' }}>
              Cotizar {esc.icono} →
            </button>
          </div>

          {/* Historia real */}
          <div style={{ padding: '16px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Lo que pasó realmente</div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, fontStyle: 'italic' }}>"{esc.impacto}"</p>
          </div>
        </div>
      </div>
    </section>
  )
}
