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
      {/* WhatsApp floating button */}
      <a
        href="https://wa.me/"
        target="_blank"
        rel="noopener noreferrer"
        title="Contáctanos por WhatsApp"
        style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 999,
          width: 56, height: 56, borderRadius: '50%',
          background: '#25D366',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(37, 211, 102, 0.45)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          textDecoration: 'none',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'scale(1.1)'
          e.currentTarget.style.boxShadow = '0 6px 28px rgba(37, 211, 102, 0.6)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'scale(1)'
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(37, 211, 102, 0.45)'
        }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.557 4.118 1.529 5.847L.057 23.428a.75.75 0 00.921.921l5.581-1.472A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.7-.505-5.253-1.388l-.376-.214-3.892 1.026 1.026-3.892-.214-.376A9.952 9.952 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
        </svg>
      </a>

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
