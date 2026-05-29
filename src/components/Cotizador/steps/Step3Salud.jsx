const PREGUNTAS_SALUD = [
  { id: 'enfermedadesCronicas', label: '¿Padece o ha padecido enfermedades crónicas?', sublabel: 'Diabetes, hipertensión, cáncer, cardiopatías, etc.', icon: '🩺' },
  { id: 'fuma', label: '¿Fuma o consume tabaco actualmente?', sublabel: 'Incluyendo cigarrillos electrónicos', icon: '🚬' },
  { id: 'hospitalizado', label: '¿Ha sido hospitalizado en los últimos 5 años?', sublabel: 'Por cualquier causa que no sea maternidad o cirugía electiva menor', icon: '🏥' },
  { id: 'medicamentos', label: '¿Toma medicamentos de forma permanente?', sublabel: 'Recetados por médico de manera continua', icon: '💊' },
  { id: 'deportesRiesgo', label: '¿Practica deportes o actividades de alto riesgo?', sublabel: 'Alpinismo, motociclismo de carrera, skydiving, etc.', icon: '⛷️' },
]

function ToggleSwitch({ value, onChange }) {
  return (
    <button
      onClick={() => onChange(!value)}
      style={{
        width: 52, height: 28, borderRadius: 14,
        background: value ? 'var(--gold)' : 'rgba(255,255,255,0.1)',
        border: `1px solid ${value ? 'var(--gold)' : 'var(--border)'}`,
        cursor: 'pointer', position: 'relative',
        transition: 'all 0.2s ease', flexShrink: 0,
      }}
    >
      <div style={{
        position: 'absolute', top: 3, left: value ? 26 : 3,
        width: 20, height: 20, borderRadius: '50%',
        background: value ? '#0A0A0F' : 'var(--text-muted)',
        transition: 'left 0.2s ease',
      }} />
    </button>
  )
}

function calcularIMC(peso, talla) {
  const p = parseFloat(peso)
  const t = parseFloat(talla) / 100
  if (!p || !t || t === 0) return null
  const imc = p / (t * t)
  return imc.toFixed(1)
}

function clasificarIMC(imc) {
  if (!imc) return null
  const v = parseFloat(imc)
  if (v < 18.5) return { label: 'Bajo peso', color: 'var(--warning)' }
  if (v < 25) return { label: 'Normal', color: 'var(--success)' }
  if (v < 30) return { label: 'Sobrepeso', color: 'var(--warning)' }
  return { label: 'Obesidad', color: 'var(--danger)' }
}

export default function Step3Salud({ datos, onChange, onNext, onPrev }) {
  const imc = calcularIMC(datos.peso, datos.talla)
  const imcInfo = clasificarIMC(imc)

  return (
    <div>
      <h2 style={{ fontSize: '1.4rem', marginBottom: 6 }}>Declaración de salud</h2>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: 8 }}>
        Esta información es confidencial y determina las coberturas y precio de tu cotización.
      </p>
      <div style={{
        padding: '10px 14px', borderRadius: 8, marginBottom: 24,
        background: 'rgba(201,168,76,0.07)', border: '1px solid var(--gold-border)',
        fontSize: '0.8rem', color: 'var(--text-secondary)',
      }}>
        ⚠️ Responde con honestidad. Ocultar condiciones preexistentes puede resultar en rechazo de reclamaciones.
      </div>

      <div style={{ marginBottom: 28 }}>
        {PREGUNTAS_SALUD.map(p => (
          <div key={p.id} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            gap: 16, padding: '16px 0',
            borderBottom: '1px solid var(--border)',
          }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span style={{ fontSize: '1.3rem', flexShrink: 0, marginTop: 2 }}>{p.icon}</span>
              <div>
                <div style={{ fontWeight: 500, fontSize: '0.92rem', color: 'var(--text-primary)', marginBottom: 2 }}>{p.label}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{p.sublabel}</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
              <span style={{ fontSize: '0.8rem', color: datos[p.id] ? 'var(--gold)' : 'var(--text-muted)', fontWeight: 600 }}>
                {datos[p.id] ? 'Sí' : 'No'}
              </span>
              <ToggleSwitch value={!!datos[p.id]} onChange={(v) => onChange({ [p.id]: v })} />
            </div>
          </div>
        ))}
      </div>

      {/* IMC */}
      <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 12, padding: '20px', border: '1px solid var(--border)', marginBottom: 28 }}>
        <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-secondary)', marginBottom: 14 }}>
          Índice de Masa Corporal (IMC)
        </div>
        <div className="grid-2" style={{ gap: 16 }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Peso (kg)</label>
            <input
              type="number" placeholder="70" min="30" max="200"
              value={datos.peso || ''}
              onChange={e => onChange({ peso: e.target.value })}
            />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Talla (cm)</label>
            <input
              type="number" placeholder="170" min="100" max="220"
              value={datos.talla || ''}
              onChange={e => onChange({ talla: e.target.value })}
            />
          </div>
        </div>
        {imc && imcInfo && (
          <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: imcInfo.color, fontWeight: 700 }}>{imc}</span>
            <span style={{ fontSize: '0.82rem', color: imcInfo.color, fontWeight: 600 }}>— {imcInfo.label}</span>
          </div>
        )}
      </div>

      {/* Resumen de carga */}
      {(datos.enfermedadesCronicas || datos.fuma || datos.hospitalizado || datos.medicamentos) && (
        <div style={{ padding: '14px 16px', borderRadius: 8, background: 'rgba(224,82,82,0.07)', border: '1px solid rgba(224,82,82,0.25)', marginBottom: 24 }}>
          <div style={{ fontSize: '0.82rem', color: 'var(--danger)', fontWeight: 600, marginBottom: 4 }}>
            Factores de carga detectados
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Las condiciones declaradas generan una carga en la prima del seguro. La cotización reflejará esto con precisión.
          </p>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button className="btn-secondary" onClick={onPrev}>← Atrás</button>
        <button className="btn-primary" onClick={onNext}>Continuar →</button>
      </div>
    </div>
  )
}
