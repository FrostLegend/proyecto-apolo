# ☀️ Proyecto Apolo

Aplicación web para el **monitoreo en tiempo real** de plantas solares, desarrollada como una **Single Page Application (SPA)** con Angular, como proyecto para asimilar las bases de Angular.

El objetivo es gestionar y visualizar el estado de tu red de instalaciones solares desde un único panel de control.

---

## 🌐 Descripción

El usuario puede consultar todas sus plantas solares, ver su producción y consumo histórico, y administrar los datos de cada instalación.

### Funcionalidades
- **Lista de plantas** → visualización en tarjetas con ubicación y estado
- **Detalle de planta** → información completa y registro histórico de producción/consumo
- **Administración** → crear, editar y eliminar plantas
- **Autenticación** → login y registro de usuarios

---

## 🛠️ Tecnologías empleadas

- **Angular 19**
- **TypeScript**
- **Bootstrap 5**
- **Bootstrap Icons**
- **Supabase** (base de datos y autenticación)
- **Vercel** (despliegue)

---

## 🚀 Instalación y ejecución en local

### 📌 Requisitos previos

- **Node.js** (versión 18 o superior)
- **npm**
```bash
node -v
npm -v
```

### Instalación
```bash
git clone https://github.com/FrostLegend/proyecto-apolo
cd proyecto-apolo
npm install
ng serve
```

La aplicación estará disponible en `http://localhost:4200`

---

## 🔑 Variables de entorno

Crea un archivo `environment.ts` con tus credenciales de Supabase:
```typescript
export const environment = {
  supabaseUrl: 'TU_SUPABASE_URL',
  supabaseKey: 'TU_SUPABASE_KEY'
};
```