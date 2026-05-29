# SeguroCompara 🛡️

Herramienta web para comparar y cotizar los principales seguros disponibles en México. Diseño premium con tema oscuro azul marino y acentos dorados.

🔗 **[Ver en vivo](https://chubsmex83.github.io/segurocompara/)**

---

## ¿Qué incluye?

### 📊 Seguros
Guía editorial con análisis de 8 categorías de seguros y 15 aseguradoras del mercado mexicano 2024-2025.

- **8 categorías:** Gastos Médicos Mayores, Vida, Auto, Casa, Retiro, Gastos Menores, Viaje y Negocio/PyME
- **15 aseguradoras:** GNP, AXA, MetLife, BBVA, Seguros Monterrey, Mapfre, HDI, Allianz, Zurich, Inbursa, Quálitas, Chubb, Seguros SURA, Banorte y Seguros Atlas
- Cada categoría incluye: coberturas, costos de mercado, pros/contras por aseguradora, tabla de beneficios y score de conveniencia
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
22 preguntas frecuentes sobre seguros en México organizadas en 5 categorías: conceptos básicos, GMM, auto, vida y costos/contratación.

---

## Stack técnico

- **React 18** con hooks (`useState`, `useEffect`, `useReducer`)
- **Vite 5** como bundler
- **CSS puro** con variables CSS (sin frameworks externos)
- **100% client-side** — los datos nunca salen del dispositivo
- **GitHub Actions** para deploy automático en GitHub Pages

## Estructura del proyecto

```
src/
├── App.jsx
├── index.css
├── data/
│   └── segurosData.js        # Datos de categorías y aseguradoras
├── utils/
│   └── cotizador.js          # Lógica de cotización y recomendación
└── components/
    ├── Header.jsx
    ├── FAQ.jsx
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

---

> Los precios mostrados son rangos estimados basados en datos del mercado mexicano 2024-2025. No constituyen una oferta de contratación.
