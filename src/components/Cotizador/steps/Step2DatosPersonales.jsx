import { useState } from 'react'

function calcularEdad(fecha) {
  if (!fecha) return null
  const hoy = new Date()
  const nac = new Date(fecha)
  let edad = hoy.getFullYear() - nac.getFullYear()
  if (hoy.getMonth() < nac.getMonth() || (hoy.getMonth() === nac.getMonth() && hoy.getDate() < nac.getDate())) edad--
  return edad
}

const OCUPACIONES = [
  'Empleado sector privado', 'Empleado sector público', 'Autoempleado / Freelance',
  'Empresario / Dueño de negocio', 'Médico / Profesional de salud', 'Abogado / Contador',
  'Ingeniero / Arquitecto', 'Docente / Académico', 'Estudiante',
  'Jubilado / Pensionado', 'Ama / Amo de casa', 'Otro',
]

export default function Step2DatosPersonales({ datos, onChange, onNext, onPrev }) {
  const [errors, setErrors] = useState({})

  function handleChange(field, value) {
    onChange({ [field]: value })
    if (errors[field]) setErrors(e => ({ ...e, [field]: null }))
  }

  function validate() {
    const e = {}
    if (!datos.nombre?.trim()) e.nombre = 'El nombre es requerido'
    if (!datos.fechaNacimiento) e.fechaNacimiento = 'La fecha de nacimiento es requerida'
    else {
      const edad = calcularEdad(datos.fechaNacimiento)
      if (edad < 18) e.fechaNacimiento = 'Debes ser mayor de 18 años'
      if (edad > 90) e.fechaNacimiento = 'Fecha de nacimiento inválida'
    }
    if (!datos.sexo) e.sexo = 'Selecciona una opción'
    if (!datos.estadoCivil) e.estadoCivil = 'Selecciona una opción'
    if (!datos.codigoPostal || datos.codigoPostal.length !== 5) e.codigoPostal = 'Ingresa un CP de 5 dígitos'
    if (!datos.ocupacion) e.ocupacion = 'Selecciona una ocupación'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const edad = calcularEdad(datos.fechaNacimiento)

  return (
    <div>
      <h2 style={{ fontSize: '1.4rem', marginBottom: 6 }}>Datos personales</h2>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: 28 }}>
        Esta información es necesaria para calcular tu cotización. Todos los datos se procesan localmente.
      </p>

      <div className="grid-2" style={{ gap: 20 }}>
        {/* Nombre */}
        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
          <label className="form-label">Nombre completo *</label>
          <input
            type="text" placeholder="Ej. María López García"
            value={datos.nombre || ''}
            onChange={e => handleChange('nombre', e.target.value)}
            style={{ borderColor: errors.nombre ? 'var(--danger)' : undefined }}
          />
          {errors.nombre && <div style={{ color: 'var(--danger)', fontSize: '0.78rem', marginTop: 4 }}>{errors.nombre}</div>}
        </div>

        {/* Fecha nacimiento */}
        <div className="form-group">
          <label className="form-label">Fecha de nacimiento *</label>
          <input
            type="date" value={datos.fechaNacimiento || ''}
            onChange={e => handleChange('fechaNacimiento', e.target.value)}
            max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]}
            style={{ borderColor: errors.fechaNacimiento ? 'var(--danger)' : undefined }}
          />
          {edad && !errors.fechaNacimiento && (
            <div style={{ fontSize: '0.78rem', color: 'var(--gold)', marginTop: 4 }}>✓ {edad} años</div>
          )}
          {errors.fechaNacimiento && <div style={{ color: 'var(--danger)', fontSize: '0.78rem', marginTop: 4 }}>{errors.fechaNacimiento}</div>}
        </div>

        {/* Sexo */}
        <div className="form-group">
          <label className="form-label">Sexo *</label>
          <div style={{ display: 'flex', gap: 10 }}>
            {['Masculino', 'Femenino'].map(s => (
              <button
                key={s} type="button"
                onClick={() => handleChange('sexo', s)}
                style={{
                  flex: 1, padding: '12px', borderRadius: 8,
                  border: `1px solid ${datos.sexo === s ? 'var(--gold)' : 'var(--border)'}`,
                  background: datos.sexo === s ? 'var(--gold-dim)' : 'rgba(255,255,255,0.03)',
                  color: datos.sexo === s ? 'var(--gold)' : 'var(--text-secondary)',
                  fontWeight: datos.sexo === s ? 600 : 400,
                  cursor: 'pointer', fontSize: '0.88rem',
                  transition: 'all 0.15s',
                }}
              >
                {s === 'Masculino' ? '♂ ' : '♀ '}{s}
              </button>
            ))}
          </div>
          {errors.sexo && <div style={{ color: 'var(--danger)', fontSize: '0.78rem', marginTop: 4 }}>{errors.sexo}</div>}
        </div>

        {/* Estado civil */}
        <div className="form-group">
          <label className="form-label">Estado civil *</label>
          <select value={datos.estadoCivil || ''} onChange={e => handleChange('estadoCivil', e.target.value)}
            style={{ borderColor: errors.estadoCivil ? 'var(--danger)' : undefined }}>
            <option value="">Seleccionar...</option>
            {['Soltero(a)', 'Casado(a)', 'Unión libre', 'Divorciado(a)', 'Viudo(a)'].map(e => (
              <option key={e} value={e}>{e}</option>
            ))}
          </select>
          {errors.estadoCivil && <div style={{ color: 'var(--danger)', fontSize: '0.78rem', marginTop: 4 }}>{errors.estadoCivil}</div>}
        </div>

        {/* Código postal */}
        <div className="form-group">
          <label className="form-label">Código postal *</label>
          <input
            type="text" placeholder="Ej. 06600" maxLength={5}
            value={datos.codigoPostal || ''}
            onChange={e => handleChange('codigoPostal', e.target.value.replace(/\D/g, ''))}
            style={{ borderColor: errors.codigoPostal ? 'var(--danger)' : undefined }}
          />
          {errors.codigoPostal && <div style={{ color: 'var(--danger)', fontSize: '0.78rem', marginTop: 4 }}>{errors.codigoPostal}</div>}
        </div>

        {/* RFC */}
        <div className="form-group">
          <label className="form-label">RFC <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(opcional)</span></label>
          <input
            type="text" placeholder="Ej. LOPM850512HDF"
            value={datos.rfc || ''}
            onChange={e => handleChange('rfc', e.target.value.toUpperCase())}
            maxLength={13}
          />
        </div>

        {/* Ocupación */}
        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
          <label className="form-label">Ocupación / Actividad principal *</label>
          <select value={datos.ocupacion || ''} onChange={e => handleChange('ocupacion', e.target.value)}
            style={{ borderColor: errors.ocupacion ? 'var(--danger)' : undefined }}>
            <option value="">Seleccionar...</option>
            {OCUPACIONES.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
          {errors.ocupacion && <div style={{ color: 'var(--danger)', fontSize: '0.78rem', marginTop: 4 }}>{errors.ocupacion}</div>}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
        <button className="btn-secondary" onClick={onPrev}>← Atrás</button>
        <button className="btn-primary" onClick={() => validate() && onNext()}>Continuar →</button>
      </div>
    </div>
  )
}
