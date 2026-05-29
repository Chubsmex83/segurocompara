import { useState } from 'react'
import Header from './components/Header'
import ComparadorPage from './components/Comparador/ComparadorPage'
import CotizadorWizard from './components/Cotizador/CotizadorWizard'
import FAQ from './components/FAQ'

export default function App() {
  const [seccion, setSeccion] = useState('comparador')

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', overflowX: 'hidden' }}>
      <Header seccion={seccion} setSeccion={setSeccion} />
      <main>
        {seccion === 'comparador' && <ComparadorPage onCotizar={() => setSeccion('cotizador')} />}
        {seccion === 'cotizador' && <CotizadorWizard />}
        {seccion === 'faq' && <FAQ />}
      </main>
      <footer style={{
        borderTop: '1px solid var(--border)',
        padding: '32px 0',
        marginTop: '80px',
        textAlign: 'center',
        color: 'var(--text-muted)',
        fontSize: '0.82rem',
      }}>
        <div className="container">
          <p style={{ marginBottom: 8 }}>
            <span style={{ color: 'var(--gold)', fontFamily: 'var(--font-serif)', fontSize: '1rem' }}>SeguroCompara</span>
            {' '}— Herramienta educativa de comparación de seguros en México
          </p>
          <p>Los precios mostrados son rangos estimados basados en datos de mercado 2024-2025. No constituyen una oferta de contratación.</p>
          <p style={{ marginTop: 8 }}>Los datos ingresados nunca salen de tu dispositivo · 100% client-side</p>
        </div>
      </footer>
    </div>
  )
}
