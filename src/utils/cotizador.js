const FACTORES_EDAD_GMM = {
  '18-25': 1.0, '26-30': 1.3, '31-35': 1.7, '36-40': 2.3,
  '41-45': 3.2, '46-50': 4.5, '51-55': 6.2, '56-60': 8.5, '60+': 12.0,
}

const BASE_GMM = { basico: 3200, intermedio: 7500, premium: 15000 }
const BASE_VIDA_POR_100K = { '18-30': 180, '31-40': 320, '41-50': 580, '51-60': 980, '60+': 1600 }

function getEdadFactor(edad) {
  if (edad <= 25) return FACTORES_EDAD_GMM['18-25']
  if (edad <= 30) return FACTORES_EDAD_GMM['26-30']
  if (edad <= 35) return FACTORES_EDAD_GMM['31-35']
  if (edad <= 40) return FACTORES_EDAD_GMM['36-40']
  if (edad <= 45) return FACTORES_EDAD_GMM['41-45']
  if (edad <= 50) return FACTORES_EDAD_GMM['46-50']
  if (edad <= 55) return FACTORES_EDAD_GMM['51-55']
  if (edad <= 60) return FACTORES_EDAD_GMM['56-60']
  return FACTORES_EDAD_GMM['60+']
}

function getEdadVidaFactor(edad) {
  if (edad <= 30) return BASE_VIDA_POR_100K['18-30']
  if (edad <= 40) return BASE_VIDA_POR_100K['31-40']
  if (edad <= 50) return BASE_VIDA_POR_100K['41-50']
  if (edad <= 60) return BASE_VIDA_POR_100K['51-60']
  return BASE_VIDA_POR_100K['60+']
}

function calcularEdad(fechaNacimiento) {
  if (!fechaNacimiento) return 30
  const hoy = new Date()
  const nac = new Date(fechaNacimiento)
  let edad = hoy.getFullYear() - nac.getFullYear()
  if (hoy.getMonth() < nac.getMonth() || (hoy.getMonth() === nac.getMonth() && hoy.getDate() < nac.getDate())) edad--
  return edad
}

function fmt(n) { return Math.round(n / 100) * 100 }

function cotizarGMM(state) {
  const edad = calcularEdad(state.datosPersonales.fechaNacimiento)
  const edadFactor = getEdadFactor(edad)
  const nivelMap = { basico: 'basico', intermedio: 'intermedio', premium: 'premium' }
  const nivel = nivelMap[state.datosEspecificos.nivelHospitalario] || 'intermedio'
  const base = BASE_GMM[nivel] * edadFactor

  let cargaSalud = 1.0
  if (state.salud.enfermedadesCronicas) cargaSalud += 0.35
  if (state.salud.fuma) cargaSalud += 0.25
  if (state.salud.hospitalizado) cargaSalud += 0.15
  if (state.salud.medicamentos) cargaSalud += 0.2

  const esFamiliar = state.datosEspecificos.tipoCobertura === 'familiar'
  const numIntegrantes = parseInt(state.datosEspecificos.numIntegrantes) || 1
  const familiarMult = esFamiliar ? (numIntegrantes >= 4 ? 2.8 : numIntegrantes >= 3 ? 2.2 : 1.75) : 1.0

  const primaBase = base * cargaSalud * familiarMult

  return [
    {
      aseguradora: 'GNP Seguros',
      plan: nivel === 'basico' ? 'Salud Total Básico' : nivel === 'intermedio' ? 'Salud Total Plus' : 'Salud Total Elite',
      primaAnual: fmt(primaBase * 1.15),
      deducible: nivel === 'basico' ? 10000 : nivel === 'intermedio' ? 6000 : 4000,
      coaseguro: nivel === 'basico' ? 20 : nivel === 'intermedio' ? 15 : 10,
      sumaAsegurada: nivel === 'basico' ? 3000000 : nivel === 'intermedio' ? 7000000 : 15000000,
      red: 'Nacional +550 hospitales',
      score: 9.2,
      esMejorOpcion: true,
      pros: ['Red hospitalaria más amplia de México', 'App y atención digital 24/7'],
      exclusiones: ['Enfermedades preexistentes primeros 2 años', 'Tratamientos estéticos', 'Odontología general'],
      justificacion: 'GNP es la mejor opción para tu perfil por su extensa red hospitalaria y plan que se ajusta a las condiciones de salud declaradas. La prima más alta se justifica con la cobertura más completa disponible.',
    },
    {
      aseguradora: 'AXA Seguros',
      plan: nivel === 'basico' ? 'AXA keralty Básico' : nivel === 'intermedio' ? 'AXA keralty Plus' : 'AXA Premium Global',
      primaAnual: fmt(primaBase * 0.9),
      deducible: nivel === 'basico' ? 12000 : nivel === 'intermedio' ? 8000 : 5000,
      coaseguro: nivel === 'basico' ? 20 : nivel === 'intermedio' ? 15 : 10,
      sumaAsegurada: nivel === 'basico' ? 2500000 : nivel === 'intermedio' ? 6000000 : 12000000,
      red: 'Nacional + cobertura internacional',
      score: 8.7,
      esMejorOpcion: false,
      pros: ['Precio más competitivo', 'Telemedicina y segunda opinión médica incluida'],
      exclusiones: ['Red hospitalaria más limitada en ciudades pequeñas', 'Preexistencias'],
      justificacion: 'AXA ofrece un precio más accesible manteniendo buena cobertura. La telemedicina incluida es un diferenciador importante para consultas de seguimiento.',
    },
    {
      aseguradora: 'Seguros Monterrey',
      plan: nivel === 'basico' ? 'Médico Familiar Básico' : nivel === 'intermedio' ? 'Médico Familiar Plus' : 'Médico Integral',
      primaAnual: fmt(primaBase * 0.82),
      deducible: nivel === 'basico' ? 15000 : nivel === 'intermedio' ? 10000 : 7000,
      coaseguro: nivel === 'basico' ? 25 : nivel === 'intermedio' ? 20 : 15,
      sumaAsegurada: nivel === 'basico' ? 2000000 : nivel === 'intermedio' ? 5000000 : 10000000,
      red: 'Nacional (fuerte en norte del país)',
      score: 8.1,
      esMejorOpcion: false,
      pros: ['La opción más económica', 'Líder histórico en GMM familiar'],
      exclusiones: ['Cobertura internacional limitada', 'Red menor en CDMX y sur del país'],
      justificacion: 'Seguros Monterrey es la opción más accesible con una trayectoria sólida en GMM. Ideal si el presupuesto es un factor determinante y principalmente se atienden en el norte del país.',
    },
  ]
}

function cotizarVida(state) {
  const edad = calcularEdad(state.datosPersonales.fechaNacimiento)
  const sumaRaw = parseFloat(state.datosEspecificos.sumaAsegurada) || 1000000
  const sumaK = sumaRaw / 100000
  const esTemporal = state.datosEspecificos.tipoVida !== 'entera'
  const factorBase = getEdadVidaFactor(edad)

  let carga = 1.0
  if (state.salud.fuma) carga += 0.5
  if (state.salud.enfermedadesCronicas) carga += 0.3
  if (state.salud.deportesRiesgo) carga += 0.2
  const permanenteMult = esTemporal ? 1 : 4.2

  const base = factorBase * sumaK * carga * permanenteMult

  return [
    {
      aseguradora: 'MetLife',
      plan: esTemporal ? 'Vida Segura Temporal' : 'Vida Entera MetLife',
      primaAnual: fmt(base * 1.05),
      deducible: 0,
      coaseguro: 0,
      sumaAsegurada: sumaRaw,
      red: 'N/A',
      score: 9.1,
      esMejorOpcion: true,
      pros: ['Líder mundial en seguros de vida', 'Pago garantizado en 30 días tras siniestro'],
      exclusiones: ['Suicidio en primeros 2 años', 'Actividades de guerra', 'Preexistencias no declaradas'],
      justificacion: 'MetLife es el referente mundial en seguros de vida con la mayor solidez financiera. La prima ligeramente más alta se justifica con la velocidad de pago y la reputación en reclamaciones.',
    },
    {
      aseguradora: 'GNP Seguros',
      plan: esTemporal ? 'Vida GNP Temporal' : 'Vida Entera GNP',
      primaAnual: fmt(base * 0.95),
      deducible: 0,
      coaseguro: 0,
      sumaAsegurada: sumaRaw,
      red: 'N/A',
      score: 8.8,
      esMejorOpcion: false,
      pros: ['Excelente servicio post-venta en México', 'Paquetes combinados con GMM disponibles'],
      exclusiones: ['Suicidio en primeros 2 años', 'Actividades de alto riesgo no declaradas'],
      justificacion: 'GNP ofrece una combinación conveniente especialmente si ya tienes GMM con ellos (descuentos por paquete). Buen servicio local en todo el país.',
    },
    {
      aseguradora: 'Allianz',
      plan: esTemporal ? 'Allianz Vida Temporal' : 'Allianz Vida Entera',
      primaAnual: fmt(base * 1.18),
      deducible: 0,
      coaseguro: 0,
      sumaAsegurada: sumaRaw * 1.1,
      red: 'N/A',
      score: 8.5,
      esMejorOpcion: false,
      pros: ['Suma asegurada 10% superior', 'Coberturas adicionales incluidas (invalidez)', 'Respaldo internacional Allianz Group'],
      exclusiones: ['Prima más elevada del mercado', 'Proceso de suscripción más riguroso'],
      justificacion: 'Allianz es la opción premium con suma asegurada aumentada. Recomendado si el patrimonio familiar a proteger justifica la prima adicional.',
    },
  ]
}

function cotizarAuto(state) {
  const { marca, modelo, anio, tipoCobertura } = state.datosEspecificos
  const currentYear = new Date().getFullYear()
  const antiguedad = currentYear - (parseInt(anio) || currentYear - 3)

  const valorEstimado = antiguedad <= 1 ? 350000 : antiguedad <= 3 ? 260000 : antiguedad <= 6 ? 180000 : antiguedad <= 10 ? 120000 : 80000
  const tasaCobertura = tipoCobertura === 'rc' ? 0.025 : tipoCobertura === 'limitada' ? 0.05 : 0.085
  const base = valorEstimado * tasaCobertura

  let cityFactor = 1.0
  const cp = state.datosPersonales.codigoPostal || ''
  if (cp.startsWith('0') || cp.startsWith('1') || cp.startsWith('5') || cp.startsWith('6')) cityFactor = 1.35
  else if (cp.startsWith('4') || cp.startsWith('6')) cityFactor = 1.2

  return [
    {
      aseguradora: 'HDI Seguros',
      plan: tipoCobertura === 'rc' ? 'RC Plus' : tipoCobertura === 'limitada' ? 'Cobertura Limitada' : 'Cobertura Amplia HDI',
      primaAnual: fmt(base * cityFactor * 0.9),
      deducible: tipoCobertura === 'amplia' ? Math.round(valorEstimado * 0.10) : 0,
      coaseguro: 0,
      sumaAsegurada: tipoCobertura === 'amplia' ? valorEstimado : 0,
      red: '+1,200 talleres afiliados',
      score: 9.0,
      esMejorOpcion: true,
      pros: ['Especialista líder en autos en México', 'Asistencia vial ilimitada incluida'],
      exclusiones: ['Uso comercial si contratado como particular', 'Robo parcial de accesorios no originales'],
      justificacion: 'HDI es el especialista en autos con la mejor relación precio-cobertura. Su red de talleres y asistencia vial 24/7 son los más completos del mercado.',
    },
    {
      aseguradora: 'AXA Seguros',
      plan: tipoCobertura === 'rc' ? 'RC Total' : tipoCobertura === 'limitada' ? 'AXA Limitada' : 'AXA Auto Amplia',
      primaAnual: fmt(base * cityFactor * 1.0),
      deducible: tipoCobertura === 'amplia' ? Math.round(valorEstimado * 0.10) : 0,
      coaseguro: 0,
      sumaAsegurada: tipoCobertura === 'amplia' ? valorEstimado : 0,
      red: '+1,000 talleres afiliados',
      score: 8.5,
      esMejorOpcion: false,
      pros: ['App excelente para reportar siniestros', 'Proceso digital de reclamación rápido'],
      exclusiones: ['Deducible estándar por daños propios', 'Robo en zonas de alta incidencia puede tener sobrecargo'],
      justificacion: 'AXA destaca por su proceso digital de reclamación. La app para reportar siniestros es la mejor evaluada del mercado según encuestas de satisfacción.',
    },
    {
      aseguradora: 'GNP Seguros',
      plan: tipoCobertura === 'rc' ? 'RC GNP' : tipoCobertura === 'limitada' ? 'Auto Limitada GNP' : 'Auto Amplia GNP',
      primaAnual: fmt(base * cityFactor * 1.08),
      deducible: tipoCobertura === 'amplia' ? Math.round(valorEstimado * 0.10) : 0,
      coaseguro: 0,
      sumaAsegurada: tipoCobertura === 'amplia' ? valorEstimado * 1.05 : 0,
      red: '+900 talleres afiliados',
      score: 8.2,
      esMejorOpcion: false,
      pros: ['Suma asegurada 5% superior al mercado', 'Paquetes con GMM dan descuento hasta 12%'],
      exclusiones: ['Prima más elevada', 'Auto sustituto solo disponible en planes premium'],
      justificacion: 'GNP ofrece una suma asegurada superior al valor comercial estándar. Muy conveniente si ya tienes otros seguros con GNP (descuentos acumulables).',
    },
  ]
}

function cotizarCasa(state) {
  const valorProp = parseFloat(state.datosEspecificos.valorPropiedad) || 2000000
  const tipo = state.datosEspecificos.tipoPropiedad || 'propia'
  const base = valorProp * 0.0035

  return [
    {
      aseguradora: 'GNP Seguros',
      plan: 'Hogar GNP Plus',
      primaAnual: fmt(base * 1.0),
      deducible: Math.max(5000, valorProp * 0.01),
      coaseguro: 10,
      sumaAsegurada: valorProp,
      red: 'Nacional',
      score: 9.0,
      esMejorOpcion: true,
      pros: ['Cobertura de sismos incluida', 'Proceso de reclamación en 72 hrs', 'Asistencia del hogar 24/7'],
      exclusiones: ['Daño por humedad o goteras preexistentes', 'Bienes de alto valor (arte, joyas) requieren cobertura adicional'],
      justificacion: 'GNP Hogar incluye sísmos en la cobertura base, lo cual es fundamental en México. La asistencia 24/7 es una ventaja diferencial valorada por los asegurados.',
    },
    {
      aseguradora: 'Zurich Seguros',
      plan: 'Hogar Zurich Integral',
      primaAnual: fmt(base * 0.92),
      deducible: Math.max(6000, valorProp * 0.012),
      coaseguro: 10,
      sumaAsegurada: valorProp,
      red: 'Nacional',
      score: 8.6,
      esMejorOpcion: false,
      pros: ['Precio competitivo', 'Excelente cobertura de RC del hogar', 'Pérdida de rentas incluida'],
      exclusiones: ['Sismos como mejora (no incluido en básico)', 'Límite en contenidos más bajo'],
      justificacion: 'Zurich ofrece el mejor precio del segmento con una cobertura sólida. La responsabilidad civil del hogar es de las más altas del mercado.',
    },
    {
      aseguradora: 'AXA Seguros',
      plan: 'AXA Hogar Digital',
      primaAnual: fmt(base * 0.88),
      deducible: Math.max(7000, valorProp * 0.015),
      coaseguro: 15,
      sumaAsegurada: valorProp * 0.95,
      red: 'Nacional',
      score: 8.2,
      esMejorOpcion: false,
      pros: ['La opción más económica', 'Contratación 100% digital en 5 minutos', 'App para gestión de siniestros'],
      exclusiones: ['Coaseguro mayor (15%)', 'Suma asegurada ligeramente menor', 'Sismos requieren mejora adicional'],
      justificacion: 'AXA es la opción más accesible con contratación digital inmediata. Ideal si el presupuesto es la principal consideración y la zona tiene bajo riesgo sísmico.',
    },
  ]
}

function cotizarViaje(state) {
  const { destino, numViajeros, duracion } = state.datosEspecificos
  const viajeros = parseInt(numViajeros) || 1
  const dias = parseInt(duracion) || 7

  const tarifaDiaria = destino === 'nacional' ? 55 : destino === 'usa_canada' ? 150 : destino === 'europa' ? 130 : 120
  const base = tarifaDiaria * dias

  return [
    {
      aseguradora: 'AXA Seguros',
      plan: `AXA Travel ${destino === 'nacional' ? 'Nacional' : destino === 'usa_canada' ? 'América Plus' : 'Internacional Elite'}`,
      primaAnual: fmt(base * viajeros * 0.95),
      deducible: destino === 'nacional' ? 0 : 500,
      coaseguro: 0,
      sumaAsegurada: destino === 'nacional' ? 500000 : destino === 'usa_canada' ? 5000000 : 4000000,
      red: 'Worldwide',
      score: 9.2,
      esMejorOpcion: true,
      pros: ['Asistencia 24/7 en español', 'Cobertura COVID-19 incluida', 'App para emergencias en el extranjero'],
      exclusiones: ['Deportes extremos requieren mejora', 'Preexistencias no crónicas pueden tener límite'],
      justificacion: 'AXA Travel es la opción líder en seguros de viaje con la mejor atención en español para viajeros mexicanos. La app de asistencia es la mejor calificada del mercado.',
    },
    {
      aseguradora: 'Allianz',
      plan: `Allianz Travel ${destino === 'nacional' ? 'México' : 'International'}`,
      primaAnual: fmt(base * viajeros * 1.15),
      deducible: 0,
      coaseguro: 0,
      sumaAsegurada: destino === 'nacional' ? 600000 : 8000000,
      red: 'Worldwide Premium',
      score: 9.0,
      esMejorOpcion: false,
      pros: ['Suma asegurada más alta del mercado', 'Evacuación médica ilimitada', 'Cancelación de viaje generosa'],
      exclusiones: ['Prima más elevada', 'Deducible en algunos destinos de alto riesgo'],
      justificacion: 'Allianz ofrece la cobertura médica más alta disponible. Recomendado para viajes a EUA, Canadá o Japón donde los costos médicos son extraordinariamente altos.',
    },
    {
      aseguradora: 'Mapfre Seguros',
      plan: `Mapfre Viaje ${destino === 'nacional' ? 'Nacional' : 'Internacional'}`,
      primaAnual: fmt(base * viajeros * 0.82),
      deducible: destino === 'nacional' ? 0 : 1000,
      coaseguro: 0,
      sumaAsegurada: destino === 'nacional' ? 400000 : 3500000,
      red: 'Internacional (red española)',
      score: 8.4,
      esMejorOpcion: false,
      pros: ['Precio más competitivo del segmento', 'Buena cobertura para viajes a España/Europa'],
      exclusiones: ['Suma asegurada menor para EUA', 'Atención en inglés principalmente'],
      justificacion: 'Mapfre es la opción más económica con cobertura aceptable. Especialmente competitivo para viajes a España y países hispanohablantes por su red propia.',
    },
  ]
}

function cotizarGenerico(tipo, state) {
  const basesByType = {
    retiro: [
      { aseguradora: 'MetLife', plan: 'Plan Pensión Retiro MetLife', primaAnual: 72000, score: 9.0, esMejorOpcion: true },
      { aseguradora: 'GNP Seguros', plan: 'Plan de Retiro GNP', primaAnual: 68000, score: 8.7, esMejorOpcion: false },
      { aseguradora: 'Allianz', plan: 'Plan Retiro Allianz', primaAnual: 78000, score: 8.5, esMejorOpcion: false },
    ],
    gmmenores: [
      { aseguradora: 'GNP Seguros', plan: 'Salud GNP Express', primaAnual: 7200, score: 9.1, esMejorOpcion: true },
      { aseguradora: 'AXA Seguros', plan: 'AXA Médico en Línea Plus', primaAnual: 6500, score: 8.8, esMejorOpcion: false },
      { aseguradora: 'Seguros Monterrey', plan: 'Monterrey Salud Express', primaAnual: 6000, score: 8.3, esMejorOpcion: false },
    ],
    negocio: [
      { aseguradora: 'Zurich Seguros', plan: 'PyME Protección Integral', primaAnual: 18000, score: 9.2, esMejorOpcion: true },
      { aseguradora: 'AXA Seguros', plan: 'AXA Negocio Plus', primaAnual: 16500, score: 8.8, esMejorOpcion: false },
      { aseguradora: 'Allianz', plan: 'Allianz Business Shield', primaAnual: 22000, score: 8.6, esMejorOpcion: false },
    ],
  }

  const base = basesByType[tipo] || basesByType.negocio
  return base.map(item => ({
    ...item,
    deducible: 5000,
    coaseguro: 10,
    sumaAsegurada: 2000000,
    red: 'Nacional',
    pros: ['Cobertura integral para tu perfil', 'Buen servicio post-venta'],
    exclusiones: ['Consultar condiciones específicas en póliza', 'Preexistencias y exclusiones de ley'],
    justificacion: item.esMejorOpcion ? `${item.aseguradora} es la mejor opción para tu tipo de seguro por su especialización, servicio y relación costo-beneficio comprobada en el mercado mexicano 2024-2025.` : `Alternativa competitiva con buenas coberturas. Evalúa si los beneficios adicionales justifican la diferencia de precio.`,
  }))
}

export function calcularCotizacion(state) {
  switch (state.tipoSeguro) {
    case 'gmm': return cotizarGMM(state)
    case 'vida': return cotizarVida(state)
    case 'auto': return cotizarAuto(state)
    case 'casa': return cotizarCasa(state)
    case 'viaje': return cotizarViaje(state)
    default: return cotizarGenerico(state.tipoSeguro, state)
  }
}

export function calcularRecomendacion(respuestas) {
  const scores = {
    gmm: 0, vida: 0, auto: 0, casa: 0, retiro: 0, viaje: 0, gmmenores: 0, negocio: 0
  }

  const { edad, situacionFamiliar, presupuesto, prioridad, seguroSocial } = respuestas

  if (prioridad === 'salud') { scores.gmm += 40; scores.gmmenores += 20 }
  if (prioridad === 'familia') { scores.vida += 40; scores.gmm += 15 }
  if (prioridad === 'patrimonio') { scores.auto += 25; scores.casa += 25 }
  if (prioridad === 'retiro') { scores.retiro += 40 }

  if (seguroSocial === 'ninguno' || seguroSocial === 'insuficiente') { scores.gmm += 35; scores.gmmenores += 15 }
  if (seguroSocial === 'imss' || seguroSocial === 'issste') { scores.gmm += 10; scores.gmmenores += 20 }

  if (situacionFamiliar === 'familia' || situacionFamiliar === 'soltero_dep') { scores.vida += 25; scores.gmm += 20 }
  if (situacionFamiliar === 'pareja') { scores.vida += 15; scores.casa += 15 }

  if (edad === '18-25') { scores.gmm += 10; scores.viaje += 15 }
  if (edad === '26-35') { scores.gmm += 20; scores.vida += 15; scores.retiro += 15 }
  if (edad === '36-45') { scores.gmm += 25; scores.vida += 20; scores.retiro += 20 }
  if (edad === '46-55') { scores.gmm += 30; scores.retiro += 30; scores.vida += 10 }
  if (edad === '55+') { scores.gmm += 35; scores.retiro += 25 }

  if (presupuesto === 'bajo') { scores.gmmenores += 15; scores.vida -= 5 }
  if (presupuesto === 'medio') { scores.gmm += 10; scores.vida += 10 }
  if (presupuesto === 'alto' || presupuesto === 'premium') { scores.retiro += 15; scores.vida += 20 }

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1])

  const labels = {
    gmm: 'Gastos Médicos Mayores', vida: 'Seguro de Vida', auto: 'Seguro de Auto',
    casa: 'Seguro de Casa', retiro: 'Plan de Retiro', viaje: 'Seguro de Viaje',
    gmmenores: 'Gastos Médicos Menores', negocio: 'Seguro de Negocio',
  }

  return sorted.slice(0, 3).map(([id, score]) => ({ id, nombre: labels[id], score, prioridad: score >= 50 ? 'Alta' : score >= 25 ? 'Media' : 'Baja' }))
}
