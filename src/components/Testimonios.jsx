const TESTIMONIOS = [
  {
    nombre: 'María G.',
    edad: 44,
    ciudad: 'Ciudad de México',
    tipo: 'GMM Familiar',
    aseguradora: 'GNP Seguros',
    primaMensual: 2100,
    ahorro: 890000,
    historia: 'Mi esposo tuvo un infarto fulminante en 2023. La cirugía de corazón abierto y 18 días de hospitalización costaron $1,240,000 MXN. Pagamos solo el deducible de $12,000 y el coaseguro tope de $35,000. Sin el seguro, habríamos perdido nuestra casa.',
    estrellas: 5,
    emoji: '👩',
  },
  {
    nombre: 'Roberto M.',
    edad: 31,
    ciudad: 'Guadalajara',
    tipo: 'Seguro de Auto Amplio',
    aseguradora: 'Quálitas',
    primaMensual: 680,
    ahorro: 185000,
    historia: 'Me robaron la camioneta en un estacionamiento del centro. Era un Aveo 2022 que había comprado hacía 8 meses con crédito. Quálitas me pagó $185,000 en 12 días hábiles. Solo pagué el deducible del 10%. Me salvaron de una deuda impagable.',
    estrellas: 5,
    emoji: '👨',
  },
  {
    nombre: 'Patricia L.',
    edad: 39,
    ciudad: 'Monterrey',
    tipo: 'Seguro de Vida',
    aseguradora: 'MetLife',
    primaMensual: 820,
    ahorro: 2000000,
    historia: 'Perdí a mi esposo en un accidente hace 2 años. Teníamos un seguro de vida de $2 millones que él contrató cuando nacieron nuestros hijos. Esos $2 millones nos han permitido mantener la hipoteca, que los niños sigan en su escuela y darme tiempo para reorganizarme. Sin ese seguro, no sé qué hubiera pasado.',
    estrellas: 5,
    emoji: '👩',
  },
  {
    nombre: 'Alejandro T.',
    edad: 52,
    ciudad: 'Ciudad de México',
    tipo: 'Seguro de Hogar',
    aseguradora: 'Zurich',
    primaMensual: 380,
    ahorro: 640000,
    historia: 'En el sismo del 2023 mi departamento en la Narvarte tuvo daños severos en columnas y muros. La reparación total fue $760,000 MXN. Zurich me pagó $640,000 en 30 días. Solo tuve que poner el deducible. Mi vecino del piso de arriba, sin seguro, sigue sin poder reparar su departamento dos años después.',
    estrellas: 5,
    emoji: '👨',
  },
]

export default function Testimonios() {
  return (
    <section style={{ padding: '70px 0', background: 'rgba(255,255,255,0.015)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <p className="section-eyebrow" style={{ textAlign: 'center' }}>Casos reales · México</p>
          <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', marginBottom: 14 }}>
            Cuando el seguro <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>hace la diferencia</em>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: 520, margin: '0 auto' }}>
            Historias de personas reales que enfrentaron eventos catastróficos y cómo su seguro las protegió.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
          {TESTIMONIOS.map((t, i) => (
            <div key={i} className="glass-card" style={{ padding: 24 }}>
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: '50%', fontSize: '1.5rem',
                  background: 'rgba(201,168,76,0.1)', border: '1px solid var(--gold-border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {t.emoji}
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.92rem' }}>{t.nombre}</div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>{t.edad} años · {t.ciudad}</div>
                </div>
                <div style={{ marginLeft: 'auto', fontSize: '0.9rem' }}>
                  {'⭐'.repeat(t.estrellas)}
                </div>
              </div>

              {/* Tipo y aseguradora */}
              <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
                <span className="badge badge-gold" style={{ fontSize: '0.68rem' }}>{t.tipo}</span>
                <span className="tag" style={{ fontSize: '0.7rem' }}>{t.aseguradora}</span>
              </div>

              {/* Historia */}
              <p style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: 16, fontStyle: 'italic' }}>
                "{t.historia}"
              </p>

              {/* Stats */}
              <div style={{
                padding: '12px', borderRadius: 8,
                background: 'rgba(76,175,124,0.07)', border: '1px solid rgba(76,175,124,0.2)',
                display: 'flex', justifyContent: 'space-between',
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Pagaba al mes</div>
                  <div style={{ fontWeight: 700, color: 'var(--gold)', fontSize: '0.95rem' }}>
                    ${t.primaMensual.toLocaleString('es-MX')}
                  </div>
                </div>
                <div style={{ width: 1, background: 'rgba(255,255,255,0.08)' }} />
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>El seguro cubrió</div>
                  <div style={{ fontWeight: 700, color: 'var(--success)', fontSize: '0.95rem' }}>
                    ${t.ahorro.toLocaleString('es-MX')}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
