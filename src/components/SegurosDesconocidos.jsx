import { useState } from 'react'

const SEGUROS = [
  {
    icono: '⚖️',
    nombre: 'Seguro de Responsabilidad Civil Personal',
    descripcion: 'Cubre daños que tú o tu familia causen a terceros en la vida cotidiana. Si tu hijo rompe una ventana del vecino, si tropiezas a alguien en la calle, o si tu perro muerde a alguien.',
    ejemplos: ['Daños causados por tus hijos en casa ajena', 'Accidentes en actividades deportivas', 'Daños causados por mascotas', 'Accidentes en instalaciones de terceros'],
    costoAprox: '$800 – $2,500 / año',
    conocimiento: 12,
    urgencia: 'Media',
    por_que: 'El 70% de los mexicanos no sabe que puede ser demandado por daños cotidianos que no estaban cubiertos por ningún seguro.',
  },
  {
    icono: '🐾',
    nombre: 'Seguro de Mascotas',
    descripcion: 'Cubre gastos veterinarios de emergencia, cirugías, hospitalizaciones y enfermedades graves de tu perro o gato. Las emergencias veterinarias pueden costar $15,000–$80,000 MXN.',
    ejemplos: ['Cirugías de emergencia', 'Hospitalización veterinaria', 'Tratamientos de enfermedades crónicas', 'Responsabilidad civil por mordedura'],
    costoAprox: '$500 – $1,800 / año',
    conocimiento: 8,
    urgencia: 'Media',
    por_que: 'México tiene más de 32 millones de mascotas, pero menos del 5% tiene seguro. Una cirugía veterinaria puede costar más que el seguro durante 10 años.',
  },
  {
    icono: '🦽',
    nombre: 'Seguro de Invalidez o Incapacidad',
    descripcion: 'Reemplaza tus ingresos si una enfermedad o accidente te impide trabajar temporal o permanentemente. El IMSS solo cubre el 60% del salario registrado, con topes.',
    ejemplos: ['Sustitución de ingresos por incapacidad', 'Pago de renta o hipoteca durante la incapacidad', 'Gastos de adaptación para discapacidad', 'Suma única por invalidez total permanente'],
    costoAprox: '$2,000 – $8,000 / año',
    conocimiento: 9,
    urgencia: 'Alta',
    por_que: '1 de cada 4 trabajadores sufrirá algún período de incapacidad durante su vida laboral. El IMSS solo cubre parcialmente y con muchos trámites.',
  },
  {
    icono: '💼',
    nombre: 'Seguro de Desempleo / Protección de Pagos',
    descripcion: 'Cubre el pago de tu hipoteca, crédito de auto o tarjetas de crédito durante un período definido si pierdes tu empleo involuntariamente.',
    ejemplos: ['Cubre hipoteca hasta 6-12 meses', 'Protege pagos de crédito de auto', 'Incluye enfermedades graves que impidan trabajar', 'Accidentes que resulten en desempleo'],
    costoAprox: '$300 – $1,200 / año',
    conocimiento: 11,
    urgencia: 'Media',
    por_que: 'Con el AFORE bloqueado y el IMSS limitado, perder el empleo puede significar perder también la casa o el auto. Este seguro es un colchón financiero clave.',
  },
]

export default function SegurosDesconocidos({ onCotizar }) {
  const [activo, setActivo] = useState(null)

  return (
    <section style={{ padding: '70px 0', background: 'rgba(255,255,255,0.015)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <p className="section-eyebrow" style={{ textAlign: 'center' }}>Lo que nadie te contó</p>
          <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', marginBottom: 14 }}>
            Seguros que los mexicanos<br />
            <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>no saben que necesitan</em>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: 520, margin: '0 auto' }}>
            Más allá del GMM y el auto, existen coberturas que la mayoría desconoce y que pueden marcar una diferencia enorme.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
          {SEGUROS.map((seg, i) => (
            <div key={i} className="glass-card" style={{ padding: 24, cursor: 'pointer' }}
              onClick={() => setActivo(activo === i ? null : i)}>
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12, fontSize: '1.5rem',
                    background: 'rgba(201,168,76,0.1)', border: '1px solid var(--gold-border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    {seg.icono}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: 1.3 }}>{seg.nombre}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--gold)', marginTop: 2 }}>{seg.costoAprox}</div>
                  </div>
                </div>
                <span style={{
                  fontSize: '0.72rem', marginTop: 2, flexShrink: 0,
                  background: seg.urgencia === 'Alta' ? 'rgba(224,82,82,0.12)' : 'rgba(224,160,82,0.12)',
                  color: seg.urgencia === 'Alta' ? 'var(--danger)' : 'var(--warning)',
                  border: `1px solid ${seg.urgencia === 'Alta' ? 'rgba(224,82,82,0.3)' : 'rgba(224,160,82,0.3)'}`,
                  padding: '3px 8px', borderRadius: 4, fontWeight: 600,
                }}>
                  {seg.urgencia === 'Alta' ? '🔴' : '🟡'} {seg.urgencia}
                </span>
              </div>

              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 12 }}>
                {seg.descripcion}
              </p>

              {/* % conocimiento */}
              <div style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>% mexicanos que lo conocen</span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--danger)', fontWeight: 600 }}>{seg.conocimiento}%</span>
                </div>
                <div style={{ height: 5, background: 'rgba(255,255,255,0.06)', borderRadius: 3 }}>
                  <div style={{ height: '100%', width: `${seg.conocimiento}%`, background: 'var(--danger)', borderRadius: 3 }} />
                </div>
              </div>

              {/* Expandible */}
              {activo === i && (
                <div className="animate-in">
                  <div style={{ height: 1, background: 'var(--border)', margin: '14px 0' }} />
                  <div style={{ fontSize: '0.75rem', color: 'var(--gold)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
                    ¿Qué cubre?
                  </div>
                  {seg.ejemplos.map((e, j) => (
                    <div key={j} className="pro-item" style={{ fontSize: '0.8rem', marginBottom: 4 }}>{e}</div>
                  ))}
                  <div style={{ marginTop: 14, padding: '10px 12px', background: 'rgba(201,168,76,0.07)', borderRadius: 8, border: '1px solid var(--gold-border)' }}>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>💡 {seg.por_que}</p>
                  </div>
                </div>
              )}

              <div style={{ marginTop: 12, fontSize: '0.76rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                {activo === i ? '▲ Cerrar' : '▼ Ver más'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
