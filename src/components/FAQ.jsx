import { useState } from 'react'

const FAQS = [
  {
    categoria: 'Conceptos básicos',
    emoji: '📚',
    preguntas: [
      {
        q: '¿Qué es un deducible y cómo funciona?',
        a: 'El deducible es la cantidad fija que tú pagas antes de que el seguro entre en acción. Por ejemplo, si tienes un deducible de $10,000 MXN y tu cirugía cuesta $200,000, tú pagas los primeros $10,000 y el seguro cubre el resto (sujeto al coaseguro). A mayor deducible, menor es tu prima anual.',
      },
      {
        q: '¿Qué es el coaseguro?',
        a: 'El coaseguro es el porcentaje del costo que compartes con la aseguradora después de pagar el deducible. Si tu coaseguro es del 10%, significa que el seguro paga el 90% y tú el 10% restante hasta un tope (llamado "tope de coaseguro"). En gastos médicos mayores, el tope suele ser $30,000–$60,000 MXN por evento.',
      },
      {
        q: '¿Qué es la suma asegurada?',
        a: 'Es el límite máximo que la aseguradora pagará por evento o durante la vigencia de la póliza. En GMM puede ser de $3 millones a ilimitada. En vida, es el monto que recibirá tu familia. Siempre elige una suma asegurada suficiente para cubrir un evento catastrófico real en los hospitales que quieres atenderte.',
      },
      {
        q: '¿Qué es una preexistencia y cómo me afecta?',
        a: 'Una preexistencia es cualquier enfermedad, lesión o condición que tenías antes de contratar el seguro. La mayoría de las aseguradoras las excluyen de cobertura, las cubren con un período de espera (1-2 años), o las incluyen con un sobreprecio (carga). Es obligatorio declararlas honestamente; ocultarlas puede resultar en rechazo de reclamaciones.',
      },
      {
        q: '¿Qué diferencia hay entre prima, póliza y siniestro?',
        a: 'La prima es el pago que haces a la aseguradora (mensual o anual). La póliza es el contrato que describe todas las coberturas, exclusiones y condiciones de tu seguro. El siniestro es el evento cubierto que da origen a una reclamación (accidente, hospitalización, robo del auto, etc.).',
      },
    ],
  },
  {
    categoria: 'Gastos Médicos Mayores (GMM)',
    emoji: '🏥',
    preguntas: [
      {
        q: '¿Tengo IMSS, ¿para qué necesito un GMM privado?',
        a: 'El IMSS ofrece cobertura básica con tiempos de espera, hospitales asignados y limitaciones en medicamentos y procedimientos. Un GMM privado te da acceso a hospitales de mayor nivel, médicos de tu elección, sin listas de espera, y cubre procedimientos que el IMSS puede negar o demorar. Muchos médicos privados no tienen convenio con el IMSS.',
      },
      {
        q: '¿Qué es la portabilidad del seguro médico?',
        a: 'La portabilidad es tu derecho a cambiarte de aseguradora sin que te apliquen nuevas exclusiones por preexistencias adquiridas durante tu póliza anterior. Para ejercerla debes haber estado asegurado sin interrupción y solicitarla al cambiar de compañía. Es fundamental no dejar pasar más de 30 días sin cobertura si quieres mantener este derecho.',
      },
      {
        q: '¿Qué no cubre un seguro de gastos médicos mayores?',
        a: 'Las exclusiones más comunes son: enfermedades preexistentes (durante los primeros años), tratamientos estéticos o cosméticos, odontología general, lentes y audífonos, consultas ambulatorias sin hospitalización, tratamientos experimentales, y enfermedades derivadas del consumo de alcohol o drogas. Siempre lee las exclusiones de tu póliza.',
      },
      {
        q: '¿A qué edad conviene contratar el GMM?',
        a: 'Cuanto antes, mejor. A los 25-30 años las primas son muy bajas ($3,500–$7,000/año en básico) y es más fácil que no tengas preexistencias. Con cada año que pasa, la prima aumenta significativamente. A los 45+ años puede ser 3-4 veces más cara que a los 30. Además, si desarrollas una enfermedad antes de asegurarte, puede quedar excluida para siempre.',
      },
      {
        q: '¿Puedo deducir de impuestos el seguro médico?',
        a: 'Sí. Las primas de GMM son deducibles de ISR como deducción personal, junto con los gastos médicos y dentales. El límite es 5 UMAs anuales o el 15% de tus ingresos, lo que sea menor (~$175,000 MXN en 2025). Guarda siempre las facturas de tus primas para tu declaración anual.',
      },
    ],
  },
  {
    categoria: 'Seguro de Auto',
    emoji: '🚗',
    preguntas: [
      {
        q: '¿Es obligatorio el seguro de auto en México?',
        a: 'La responsabilidad civil (RC) es obligatoria en la Ciudad de México, Estado de México, Jalisco, Nuevo León y varios estados más. A nivel federal, la Ley de Caminos y Puentes también lo exige en carreteras federales. Aunque no sea obligatorio en tu estado, circular sin RC te expone a pagar de tu bolsillo daños a terceros que pueden ser millonarios.',
      },
      {
        q: '¿Cuál es la diferencia entre cobertura amplia, limitada y solo RC?',
        a: 'RC básica: solo cubre daños que causes a terceros (autos y personas). No cubre tu vehículo. Cobertura limitada: agrega robo total y daños causados por terceros a tu auto. Cobertura amplia: cubre además los daños a tu propio vehículo por cualquier causa (choques, volcaduras, granizo, etc.). La amplia es la recomendada si tu auto vale más de $150,000 MXN.',
      },
      {
        q: '¿Qué es el valor comercial y cómo afecta mi indemnización por robo?',
        a: 'El valor comercial es el precio al que se vendería tu auto usado en el mercado en la fecha del siniestro, no el precio que pagaste. Si tu auto fue robado, recibirás el valor comercial menos el deducible (generalmente 10-20% del valor). Por eso, autos muy depreciados pueden no justificar el costo de la cobertura amplia.',
      },
      {
        q: '¿Qué hacer inmediatamente después de un accidente de tráfico?',
        a: '1) Mantén la calma y no muevas los vehículos. 2) Llama al número de emergencias de tu seguro (24/7). 3) No firmes ningún documento ni hagas acuerdos verbales con terceros. 4) Toma fotos de los daños, placas y situación. 5) Espera al ajustador de la aseguradora. 6) Si hay lesionados, llama al 911. Tu aseguradora se encarga del resto.',
      },
    ],
  },
  {
    categoria: 'Seguro de Vida',
    emoji: '❤️',
    preguntas: [
      {
        q: '¿Cuánto seguro de vida necesito?',
        a: 'La regla general es 10-15 veces tu ingreso anual. Considera también: el saldo de tu hipoteca, el costo de educación de tus hijos hasta la universidad, y los gastos de manutención de tu familia por 5-10 años. Si ganas $50,000/mes, tu suma asegurada ideal sería entre $6M y $9M MXN.',
      },
      {
        q: '¿Cuál es la diferencia entre seguro de vida temporal y vida entera?',
        a: 'El temporal cubre solo por un período definido (10, 20 o 30 años) y su prima es mucho más baja. Es ideal para cubrir la etapa productiva de vida cuando tienes dependientes e hipoteca. La vida entera te cubre hasta la muerte, acumula valor en efectivo (ahorro) y su prima es 4-5 veces mayor. La mayoría de los expertos recomiendan temporal + inversión por separado.',
      },
      {
        q: '¿El seguro de vida paga en caso de suicidio?',
        a: 'La mayoría de las pólizas tienen un período de exclusión de 2 años desde la contratación. Si el fallecimiento ocurre después de esos 2 años, generalmente sí se paga la suma asegurada. Las condiciones varían por aseguradora, por lo que es importante leer las exclusiones específicas de tu póliza.',
      },
      {
        q: '¿Qué documentos necesito para que mi familia cobre el seguro de vida?',
        a: 'Generalmente se requiere: acta de defunción original, identificación oficial del beneficiario, póliza original o número de póliza, CURP del beneficiario, y en algunos casos certificado médico de causa de muerte. El proceso suele tardar entre 15 y 30 días hábiles desde que se entrega la documentación completa.',
      },
    ],
  },
  {
    categoria: 'Costos y contratación',
    emoji: '💰',
    preguntas: [
      {
        q: '¿Conviene pagar el seguro mensual o anual?',
        a: 'Anual siempre es más económico. El pago mensual suele tener un recargo del 5-8% anual por financiamiento. Si puedes pagar anualmente, ahorras ese porcentaje. Si tu presupuesto no lo permite, el pago semestral es un buen punto medio con recargo de solo 1-2%.',
      },
      {
        q: '¿Puedo tener más de un seguro de gastos médicos?',
        a: 'Sí, es legal y posible. Sin embargo, en México aplica el principio de indemnización: no puedes cobrar más de lo que costó el evento. Si tienes dos seguros, uno actúa como primario y el otro como coordinador de beneficios, cubriendo lo que el primero no pagó (deducible y coaseguro). Debes declararle a cada aseguradora que tienes otro seguro.',
      },
      {
        q: '¿Qué factores aumentan el precio de mi seguro?',
        a: 'En GMM: edad, condiciones de salud preexistentes, tabaquismo, IMC elevado, historial de hospitalizaciones. En auto: zona geográfica de alto robo (CDMX, GDL), historial de siniestros, uso comercial (Uber). En vida: edad, tabaquismo, deportes de riesgo. En casa: zona sísmica o de inundación, tipo de construcción.',
      },
      {
        q: '¿Cómo sé si una aseguradora es confiable y está regulada?',
        a: 'Todas las aseguradoras en México deben estar autorizadas por la CNSF (Comisión Nacional de Seguros y Fianzas). Puedes verificar el registro en cnsf.gob.mx. También revisa la calificación crediticia (Fitch, Moody\'s, S&P): AAA o AA es el nivel más seguro. Evita contratar con personas que no puedan mostrarte la póliza oficial de la aseguradora.',
      },
      {
        q: '¿Qué es la CONDUSEF y cuándo debo acudir?',
        a: 'La CONDUSEF (Comisión Nacional para la Protección y Defensa de los Usuarios de Servicios Financieros) es el organismo que defiende tus derechos como asegurado. Acude si tu aseguradora rechaza injustificadamente una reclamación, si tarda más de lo estipulado en pagar, o si tienes una disputa sobre coberturas. Su servicio es gratuito y muchas veces basta con una queja formal para resolver el problema.',
      },
    ],
  },
]

export default function FAQ() {
  const [categoriaActiva, setCategoriaActiva] = useState(0)
  const [abiertos, setAbiertos] = useState({})

  function togglePregunta(key) {
    setAbiertos(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const cat = FAQS[categoriaActiva]

  return (
    <section style={{ padding: '70px 0 60px' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <p className="section-eyebrow" style={{ textAlign: 'center' }}>Centro de ayuda</p>
          <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', marginBottom: 14 }}>
            Preguntas frecuentes sobre<br />
            <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>seguros en México</em>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: 520, margin: '0 auto' }}>
            Respuestas claras y sin tecnicismos a las dudas más comunes al contratar un seguro.
          </p>
        </div>

        {/* Categorías */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 36 }}>
          {FAQS.map((f, i) => (
            <button
              key={i}
              onClick={() => { setCategoriaActiva(i); setAbiertos({}) }}
              style={{
                padding: '10px 18px', borderRadius: 8, cursor: 'pointer',
                fontSize: '0.85rem', fontWeight: 500,
                background: categoriaActiva === i ? 'var(--gold-dim)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${categoriaActiva === i ? 'var(--gold)' : 'var(--border)'}`,
                color: categoriaActiva === i ? 'var(--gold)' : 'var(--text-secondary)',
                transition: 'all 0.15s',
                fontFamily: 'var(--font-sans)',
              }}
            >
              {f.emoji} {f.categoria}
            </button>
          ))}
        </div>

        {/* Preguntas */}
        <div style={{ maxWidth: 780, margin: '0 auto' }}>
          {cat.preguntas.map((item, i) => {
            const key = `${categoriaActiva}-${i}`
            const open = !!abiertos[key]
            return (
              <div
                key={key}
                className="animate-in"
                style={{
                  borderRadius: 12, marginBottom: 10, overflow: 'hidden',
                  border: `1px solid ${open ? 'var(--gold-border)' : 'var(--border)'}`,
                  background: open ? 'rgba(201,168,76,0.04)' : 'rgba(255,255,255,0.03)',
                  transition: 'border-color 0.2s, background 0.2s',
                }}
              >
                {/* Question row */}
                <button
                  onClick={() => togglePregunta(key)}
                  style={{
                    width: '100%', textAlign: 'left', padding: '18px 20px',
                    background: 'transparent', border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
                  }}
                >
                  <span style={{
                    fontSize: '0.95rem', fontWeight: 600,
                    color: open ? 'var(--gold)' : 'var(--text-primary)',
                    lineHeight: 1.4, fontFamily: 'var(--font-sans)',
                    transition: 'color 0.2s',
                  }}>
                    {item.q}
                  </span>
                  <span style={{
                    width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: open ? 'var(--gold-dim)' : 'rgba(255,255,255,0.06)',
                    border: `1px solid ${open ? 'var(--gold-border)' : 'var(--border)'}`,
                    color: open ? 'var(--gold)' : 'var(--text-muted)',
                    fontSize: '0.75rem', fontWeight: 700,
                    transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
                    transition: 'transform 0.25s ease, background 0.2s, color 0.2s',
                  }}>
                    ✕
                  </span>
                </button>

                {/* Answer */}
                {open && (
                  <div className="animate-in" style={{ padding: '0 20px 20px' }}>
                    <div style={{
                      height: 1,
                      background: 'var(--gold-border)',
                      marginBottom: 16,
                      opacity: 0.5,
                    }} />
                    <p style={{
                      fontSize: '0.9rem', color: 'var(--text-secondary)',
                      lineHeight: 1.75,
                    }}>
                      {item.a}
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div style={{
          textAlign: 'center', marginTop: 48, padding: '28px 24px',
          borderRadius: 16, border: '1px solid var(--gold-border)',
          background: 'rgba(201,168,76,0.05)',
          maxWidth: 540, margin: '48px auto 0',
        }}>
          <div style={{ fontSize: '1.5rem', marginBottom: 10 }}>🤔</div>
          <h3 style={{ fontSize: '1.1rem', marginBottom: 8, fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
            ¿Tienes más dudas?
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 18, lineHeight: 1.6 }}>
            Usa el cotizador para obtener una estimación personalizada basada en tu perfil específico.
          </p>
        </div>
      </div>
    </section>
  )
}
