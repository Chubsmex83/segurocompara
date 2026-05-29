const ORGANISMOS = [
  {
    siglas: 'CNSF',
    nombre: 'Comisión Nacional de Seguros y Fianzas',
    emoji: '🏛️',
    descripcion: 'Autoridad regulatoria que supervisa y autoriza a todas las aseguradoras en México. Antes de contratar, verifica que tu aseguradora esté registrada en cnsf.gob.mx.',
    accion: 'Consulta el registro',
    url: 'https://www.cnsf.gob.mx',
  },
  {
    siglas: 'CONDUSEF',
    nombre: 'Comisión Nacional para la Protección y Defensa de los Usuarios de Servicios Financieros',
    emoji: '⚖️',
    descripcion: 'Defiende tus derechos como asegurado. Si tu aseguradora rechaza injustificadamente una reclamación o tarda en pagar, acude a CONDUSEF de forma gratuita.',
    accion: 'Presentar queja',
    url: 'https://www.condusef.gob.mx',
  },
  {
    siglas: 'AMIS',
    nombre: 'Asociación Mexicana de Instituciones de Seguros',
    emoji: '🤝',
    descripcion: 'Organismo que agrupa a las aseguradoras más importantes del país. Publica estadísticas anuales del mercado asegurador mexicano y datos sobre siniestros.',
    accion: 'Ver estadísticas',
    url: 'https://www.amis.com.mx',
  },
]

const DERECHOS = [
  { icono: '📄', titulo: 'Derecho a la información', desc: 'Tienes derecho a recibir tu póliza en tiempo y forma, con todas las coberturas y exclusiones claramente explicadas.' },
  { icono: '⏱️', titulo: 'Plazos de pago obligatorios', desc: 'La aseguradora tiene 5 días hábiles para pronunciarse sobre una reclamación y 15 días hábiles para pagar una vez aprobada.' },
  { icono: '🔄', titulo: 'Portabilidad de seguros', desc: 'Puedes cambiar de aseguradora sin perder antigüedad ni adquirir nuevas exclusiones por preexistencias declaradas.' },
  { icono: '🚫', titulo: 'Protección contra cancelaciones', desc: 'La aseguradora solo puede cancelar tu póliza por causas específicas establecidas en la Ley sobre el Contrato de Seguro.' },
  { icono: '💬', titulo: 'Derecho a reclamar', desc: 'Ante cualquier conflicto, puedes acudir a CONDUSEF gratuitamente. En 2024, el 68% de las quejas se resolvieron a favor del asegurado.' },
  { icono: '🔍', titulo: 'Transparencia en exclusiones', desc: 'Las exclusiones deben estar en letra visible y explicadas en lenguaje claro. Las letras pequeñas "sorpresa" no son válidas legalmente.' },
]

export default function SeccionConfianza() {
  return (
    <section style={{ padding: '70px 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <p className="section-eyebrow" style={{ textAlign: 'center' }}>Regulación y transparencia</p>
          <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', marginBottom: 14 }}>
            Tu seguro está <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>protegido por ley</em>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: 540, margin: '0 auto' }}>
            En México, el mercado asegurador está regulado por tres organismos que garantizan tus derechos como asegurado.
          </p>
        </div>

        {/* Organismos reguladores */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20, marginBottom: 56 }}>
          {ORGANISMOS.map((org, i) => (
            <div key={i} className="glass-card" style={{ padding: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12, fontSize: '1.6rem',
                  background: 'rgba(201,168,76,0.1)', border: '1px solid var(--gold-border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {org.emoji}
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--gold)', fontWeight: 700 }}>{org.siglas}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', lineHeight: 1.3 }}>{org.nombre}</div>
                </div>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: 14 }}>
                {org.descripcion}
              </p>
              <a
                href={org.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  fontSize: '0.8rem', color: 'var(--gold)', fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                {org.accion} →
              </a>
            </div>
          ))}
        </div>

        {/* Derechos */}
        <div style={{
          borderRadius: 20, border: '1px solid var(--gold-border)',
          background: 'rgba(201,168,76,0.04)', padding: '36px',
        }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: 8, textAlign: 'center' }}>
            Tus derechos como asegurado en México
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textAlign: 'center', marginBottom: 32 }}>
            Establecidos en la Ley sobre el Contrato de Seguro (LSCS) y la Ley de Instituciones de Seguros y Fianzas (LISF)
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
            {DERECHOS.map((d, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10, fontSize: '1.2rem', flexShrink: 0,
                  background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {d.icono}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--text-primary)', marginBottom: 4 }}>{d.titulo}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>{d.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
