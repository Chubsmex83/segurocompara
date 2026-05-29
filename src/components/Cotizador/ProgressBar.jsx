const STEPS = [
  { num: 1, label: 'Tipo' },
  { num: 2, label: 'Datos' },
  { num: 3, label: 'Salud' },
  { num: 4, label: 'Detalles' },
  { num: 5, label: 'Preferencias' },
  { num: 6, label: 'Cotización' },
]

export default function ProgressBar({ currentStep, tipoSeguro }) {
  const stepsToShow = tipoSeguro === 'viaje' || tipoSeguro === 'gmmenores' || tipoSeguro === 'negocio' || tipoSeguro === 'retiro'
    ? STEPS.filter(s => s.num !== 3)
    : STEPS

  return (
    <div style={{ padding: '0 0 32px' }}>
      <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
        {/* Line */}
        <div style={{
          position: 'absolute', top: '50%', left: 0, right: 0,
          height: 2,
          background: 'var(--border)',
          transform: 'translateY(-50%)',
          zIndex: 0,
        }} />
        <div style={{
          position: 'absolute', top: '50%', left: 0,
          height: 2,
          background: 'linear-gradient(90deg, var(--gold), var(--gold-light))',
          transform: 'translateY(-50%)',
          width: `${Math.min(100, ((currentStep - 1) / (STEPS.length - 1)) * 100)}%`,
          transition: 'width 0.4s ease',
          zIndex: 1,
        }} />

        {STEPS.map((step) => {
          const isActive = step.num === currentStep
          const isCompleted = step.num < currentStep
          const isSkipped = !stepsToShow.find(s => s.num === step.num)

          return (
            <div key={step.num} style={{
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
              zIndex: 2,
              opacity: isSkipped ? 0.3 : 1,
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: isCompleted ? 'var(--gold)' : isActive ? 'linear-gradient(135deg, var(--gold), #A8832E)' : 'var(--bg-secondary)',
                border: `2px solid ${isCompleted || isActive ? 'var(--gold)' : 'var(--border)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.8rem', fontWeight: 700,
                color: isCompleted || isActive ? '#0A0A0F' : 'var(--text-muted)',
                transition: 'all 0.3s ease',
                boxShadow: isActive ? 'var(--shadow-gold)' : 'none',
              }}>
                {isCompleted ? '✓' : step.num}
              </div>
              <span style={{
                fontSize: '0.7rem',
                color: isActive ? 'var(--gold)' : isCompleted ? 'var(--text-secondary)' : 'var(--text-muted)',
                fontWeight: isActive ? 600 : 400,
                textAlign: 'center',
                transition: 'color 0.3s ease',
              }}>
                {step.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
