# SeguroCompara 🛡️

Herramienta web completa para comparar y cotizar los principales seguros disponibles en México. Diseño premium con tema azul marino y acentos dorados.

🔗 **[Ver en vivo](https://chubsmex83.github.io/segurocompara/)**

---

## ¿Qué incluye?

### 📊 Seguros
Guía editorial completa con análisis de 8 categorías de seguros y 15 aseguradoras del mercado mexicano 2024-2025.

- **8 categorías:** Gastos Médicos Mayores, Vida, Auto, Casa, Retiro, Gastos Menores, Viaje y Negocio/PyME
- **15 aseguradoras:** GNP, AXA, MetLife, BBVA, Seguros Monterrey, Mapfre, HDI, Allianz, Zurich, Inbursa, Quálitas, Chubb, Seguros SURA, Banorte y Seguros Atlas
- Coberturas, costos de mercado, pros/contras por aseguradora, tabla de beneficios y score de conveniencia
- **Sistema de recomendación inteligente:** 5 preguntas que determinan qué seguro contratar primero y por qué

### 📋 Cotizador
Wizard profesional de 6 pasos que simula la experiencia de un agente de seguros certificado.

| Paso | Contenido |
|------|-----------|
| 1 | Selección visual del tipo de seguro |
| 2 | Datos personales con validación en tiempo real |
| 3 | Declaración de salud (GMM y Vida) |
| 4 | Preguntas específicas por tipo de seguro |
| 5 | Preferencias de cobertura y presupuesto |
| 6 | Top 3 opciones con tabla comparativa y justificación |

### ❓ FAQ
22 preguntas frecuentes sobre seguros en México en 5 categorías: conceptos básicos, GMM, auto, vida y costos/contratación.

### 📈 Secciones adicionales

| Sección | Descripción |
|---------|-------------|
| **¿Cuánto pierdes sin seguro?** | Comparativa con datos reales AMIS/CONDUSEF: hospitalización, robo de auto, sismo y fallecimiento |
| **El costo de esperar** | Gráfica interactiva de prima por edad (25–50 años) para GMM y Vida |
| **¿Qué pasaría si...?** | Simulador de 5 escenarios reales con impacto financiero con y sin seguro |
| **Seguros que no conoces** | RC Personal, Mascotas, Invalidez y Desempleo — los más desconocidos |
| **Casos reales** | 4 testimonios con montos reales de personas que usaron su seguro |
| **Regulación y confianza** | CNSF, CONDUSEF, AMIS y los 6 derechos del asegurado en México |

---

## Stack técnico

- **React 18** con hooks (`useState`, `useEffect`, `useReducer`)
- **Vite 5** como bundler
- **CSS puro** con variables CSS (sin frameworks externos)
- **100% client-side** — los datos nunca salen del dispositivo
- **GitHub Actions** para deploy automático en GitHub Pages

## SEO implementado

- Meta tags completos: title, description, keywords, Open Graph, Twitter Card
- Schema.org JSON-LD: `WebSite`, `Organization`, `FAQPage`, `HowTo`
- `sitemap.xml` y `robots.txt`
- `dns-prefetch` y `preconnect` para recursos externos

## Estructura del proyecto

```
src/
├── App.jsx
├── index.css
├── data/
│   └── segurosData.js              # 8 categorías y 15 aseguradoras
├── utils/
│   └── cotizador.js                # Lógica de cotización y recomendación
└── components/
    ├── Header.jsx
    ├── FAQ.jsx
    ├── CalculadoraPerdida.jsx
    ├── GraficaEdadCosto.jsx
    ├── SimuladorEscenarios.jsx
    ├── SegurosDesconocidos.jsx
    ├── Testimonios.jsx
    ├── SeccionConfianza.jsx
    ├── Comparador/
    │   ├── ComparadorPage.jsx
    │   └── RecomendadorInteligente.jsx
    └── Cotizador/
        ├── CotizadorWizard.jsx
        ├── ProgressBar.jsx
        └── steps/
            ├── Step1TipoSeguro.jsx
            ├── Step2DatosPersonales.jsx
            ├── Step3Salud.jsx
            ├── Step4Especificos.jsx
            ├── Step5Preferencias.jsx
            └── Step6Resultados.jsx
```

## Correr localmente

```bash
npm install
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173)

## Diseño

- **Fondo:** Azul marino `#0D2244`
- **Acentos:** Dorado `#C9A84C`
- **Texto:** Blanco roto `#F0EDE8`
- **Tipografía:** Playfair Display (títulos) + DM Sans (UI)
- Glassmorphism, animaciones suaves, diseño responsive mobile-first
- Botón flotante de WhatsApp

---

> Los precios mostrados son rangos estimados basados en datos del mercado mexicano 2024-2025. No constituyen una oferta de contratación.
