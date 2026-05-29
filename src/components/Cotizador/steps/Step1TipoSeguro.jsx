const TIPOS = [
  { id: 'gmm', icono: '🏥', nombre: 'Gastos Médicos Mayores', desc: 'Hospitalización y cirugías' },
  { id: 'vida', icono: '❤️', nombre: 'Seguro de Vida', desc: 'Protección para tu familia' },
  { id: 'auto', icono: '🚗', nombre: 'Seguro de Auto', desc: 'Vehículo y responsabilidad civil' },
  { id: 'casa', icono: '🏠', nombre: 'Seguro de Casa', desc: 'Patrimonio e inmueble' },
  { id: 'retiro', icono: '🌅', nombre: 'Plan de Retiro', desc: 'Ahorro para el futuro' },
  { id: 'gmmenores', icono: '💊', nombre: 'Gastos Médicos Menores', desc: 'Consultas y medicamentos' },
  { id: 'viaje', icono: '✈️', nombre: 'Seguro de Viaje', desc: 'Emergencias en el extranjero' },
  { id: 'negocio', icono: '🏢', nombre: 'Seguro de Negocio', desc: 'PyME y empresa' },
]

export default function Step1TipoSeguro({ tipoSeleccionado, onSelect }) {
  return (
    <div>
      <h2 style={{ fontSize: '1.4rem', marginBottom: 6 }}>¿Qué tipo de seguro deseas cotizar?</h2>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: 28 }}>
        Selecciona una categoría para comenzar tu cotización personalizada.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 14 }}>
        {TIPOS.map(tipo => (
          <button
            key={tipo.id}
            onClick={() => onSelect(tipo.id)}
            style={{
              background: tipoSeleccionado === tipo.id ? 'var(--gold-dim)' : 'rgba(255,255,255,0.03)',
              border: `1px solid ${tipoSeleccionado === tipo.id ? 'var(--gold)' : 'var(--border)'}`,
              borderRadius: 12, padding: '20px 16px',
              cursor: 'pointer', textAlign: 'left',
              transition: 'all 0.2s ease',
              boxShadow: tipoSeleccionado === tipo.id ? 'var(--shadow-gold)' : 'none',
            }}
            onMouseEnter={e => {
              if (tipoSeleccionado !== tipo.id) {
                e.currentTarget.style.borderColor = 'var(--gold-border)'
                e.currentTarget.style.background = 'rgba(201,168,76,0.04)'
              }
            }}
            onMouseLeave={e => {
              if (tipoSeleccionado !== tipo.id) {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
              }
            }}
          >
            <div style={{ fontSize: '1.8rem', marginBottom: 10 }}>{tipo.icono}</div>
            <div style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--text-primary)', marginBottom: 4 }}>{tipo.nombre}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{tipo.desc}</div>
            {tipoSeleccionado === tipo.id && (
              <div style={{
                marginTop: 10, fontSize: '0.72rem', color: 'var(--gold)',
                fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
              }}>
                ✓ Seleccionado
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
