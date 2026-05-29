import { useReducer, useEffect } from 'react'
import ProgressBar from './ProgressBar'
import Step1TipoSeguro from './steps/Step1TipoSeguro'
import Step2DatosPersonales from './steps/Step2DatosPersonales'
import Step3Salud from './steps/Step3Salud'
import Step4Especificos from './steps/Step4Especificos'
import Step5Preferencias from './steps/Step5Preferencias'
import Step6Resultados from './steps/Step6Resultados'

const TIPOS_SIN_SALUD = ['auto', 'casa', 'viaje', 'gmmenores', 'negocio', 'retiro']

const initialState = {
  currentStep: 1,
  tipoSeguro: null,
  datosPersonales: {
    nombre: '', fechaNacimiento: '', sexo: '', estadoCivil: '',
    codigoPostal: '', rfc: '', ocupacion: '',
  },
  salud: {
    enfermedadesCronicas: false, fuma: false, hospitalizado: false,
    medicamentos: false, deportesRiesgo: false, peso: '', talla: '',
  },
  datosEspecificos: {},
  preferencias: {
    presupuesto: '', prioridad: 'cobertura', formaPago: 'anual', soloAAA: false,
  },
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_TIPO': return { ...state, tipoSeguro: action.payload }
    case 'SET_DATOS_PERSONALES': return { ...state, datosPersonales: { ...state.datosPersonales, ...action.payload } }
    case 'SET_SALUD': return { ...state, salud: { ...state.salud, ...action.payload } }
    case 'SET_DATOS_ESPECIFICOS': return { ...state, datosEspecificos: { ...state.datosEspecificos, ...action.payload } }
    case 'SET_PREFERENCIAS': return { ...state, preferencias: { ...state.preferencias, ...action.payload } }
    case 'NEXT': {
      const skipSalud = TIPOS_SIN_SALUD.includes(state.tipoSeguro) && state.currentStep === 2
      return { ...state, currentStep: state.currentStep + (skipSalud ? 2 : 1) }
    }
    case 'PREV': {
      const skipSalud = TIPOS_SIN_SALUD.includes(state.tipoSeguro) && state.currentStep === 4
      return { ...state, currentStep: state.currentStep - (skipSalud ? 2 : 1) }
    }
    case 'GO_TO': return { ...state, currentStep: action.payload }
    case 'RESET': return { ...initialState }
    default: return state
  }
}

export default function CotizadorWizard() {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [state.currentStep])

  const next = () => dispatch({ type: 'NEXT' })
  const prev = () => dispatch({ type: 'PREV' })
  const reset = () => dispatch({ type: 'RESET' })

  const showSalud = !TIPOS_SIN_SALUD.includes(state.tipoSeguro)

  return (
    <div style={{ padding: '50px 0 60px', minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: 760 }}>

        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <p className="section-eyebrow">Herramienta profesional</p>
          <h1 style={{ fontSize: '2rem', marginBottom: 8 }}>
            Cotizador de Seguros
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Simula la experiencia de un agente certificado · Todos los datos se procesan localmente
          </p>
        </div>

        {/* Progress bar */}
        {state.currentStep > 1 && (
          <ProgressBar currentStep={state.currentStep} tipoSeguro={state.tipoSeguro} />
        )}

        {/* Step card */}
        <div className="glass-card animate-in" style={{ padding: 36 }}>
          {state.currentStep === 1 && (
            <Step1TipoSeguro
              tipoSeleccionado={state.tipoSeguro}
              onSelect={(tipo) => { dispatch({ type: 'SET_TIPO', payload: tipo }); next() }}
            />
          )}
          {state.currentStep === 2 && (
            <Step2DatosPersonales
              datos={state.datosPersonales}
              onChange={(d) => dispatch({ type: 'SET_DATOS_PERSONALES', payload: d })}
              onNext={next} onPrev={prev}
            />
          )}
          {state.currentStep === 3 && showSalud && (
            <Step3Salud
              datos={state.salud}
              onChange={(d) => dispatch({ type: 'SET_SALUD', payload: d })}
              onNext={next} onPrev={prev}
            />
          )}
          {state.currentStep === 4 && (
            <Step4Especificos
              tipoSeguro={state.tipoSeguro}
              datos={state.datosEspecificos}
              onChange={(d) => dispatch({ type: 'SET_DATOS_ESPECIFICOS', payload: d })}
              onNext={next} onPrev={prev}
            />
          )}
          {state.currentStep === 5 && (
            <Step5Preferencias
              datos={state.preferencias}
              onChange={(d) => dispatch({ type: 'SET_PREFERENCIAS', payload: d })}
              onNext={next} onPrev={prev}
            />
          )}
          {state.currentStep === 6 && (
            <Step6Resultados
              state={state}
              onReset={reset}
              onPrev={prev}
            />
          )}
        </div>

      </div>
    </div>
  )
}
