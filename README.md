# Store Test – NestJS & ReactJS

Proyecto fullstack de tienda en línea, compuesto por un backend en NestJS y un frontend en React + Vite + TypeScript.

## Tabla de Contenidos

- [Descripción](#descripción)
- [Tecnologías](#tecnologías)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación](#instalación)
- [Uso](#uso)
- [Testing](#testing)
- [Despliegue](#despliegue)
- [Licencia](#licencia)

---

## Descripción

Este proyecto es una tienda online de ejemplo, con backend desacoplado y frontend moderno. Permite comprar productos, por medio de tarjetas de crédito, y está preparado para despliegue serverless.

## Tecnologías

### Backend

- **NestJS** (TypeScript)
- **TypeORM** (PostgreSQL)
- **Arquitectura Hexagonal + DDD (Domain-Driven Design)**
  - El backend está construido siguiendo la arquitectura hexagonal (puertos y adaptadores), separando claramente los dominios, la lógica de aplicación y la infraestructura, bajo principios de DDD para mantener un código desacoplado y escalable.
- **Serverless Framework**
- **Jest** (testing)

### Frontend

- **React 19** + **Vite**
- **Redux Toolkit**
- **TailwindCSS**
- **React Hook Form**
- **Axios**

## Estructura del Proyecto

A continuación se muestra la estructura principal del proyecto, destacando la separación hexagonal y las capas de DDD en el backend:

store-test-nestjs-reactjs/
│
├── back-nestjs-store/                  # Backend (NestJS, Arquitectura Hexagonal + DDD)
│   ├── src/
│   │   ├── modules/
│   │   │   ├── product/                # Dominio de productos
│   │   │   │   ├── application/        # Casos de uso, servicios de aplicación
│   │   │   │   ├── domain/             # Entidades, repositorios, lógica de dominio
│   │   │   │   └── infra/              # Adaptadores: persistencia, API, etc.
│   │   │   └── payment/                # Dominio de pagos
│   │   │       ├── application/
│   │   │       ├── domain/
│   │   │       └── infra/
│   │   └── main.ts                     # Punto de entrada principal
│   ├── test/                           # Pruebas unitarias y de integración (e2e)
│   ├── package.json                    # Dependencias y scripts del backend
│   └── ...
│
└── front-reactjs-store/               # Frontend (React + Vite)
    ├── src/
    │   ├── features/
    │   │   ├── products/               # Componentes, redux y servicios de productos
    │   │   └── payments/               # Componentes, redux y servicios de pagos
    │   └── main.tsx                    # Punto de entrada principal
    ├── public/                         # Archivos estáticos públicos
    ├── package.json                    # Dependencias y scripts del frontend
    └── ...


> **Nota:** La estructura sigue los principios de arquitectura limpia, donde cada dominio tiene separadas sus capas de aplicación, dominio e infraestructura para facilitar el mantenimiento y escalabilidad.

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/store-test-nestjs-reactjs.git
cd store-test-nestjs-reactjs
```

### 2. Backend

```bash
cd back-nestjs-store
npm install
```
Configura tus variables de entorno en `.env.local` o `.env.dev` según corresponda.

### 3. Frontend

```bash
cd ../front-reactjs-store
npm install
```

## Uso

### Backend

```bash
# Desarrollo
npm run start:dev

# Producción
npm run start:prod
```

### Frontend

```bash
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

## Testing

### Backend

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Cobertura
npm run test:cov
```

### Frontend

```bash
npm run test
```

## Despliegue

### Backend

Usa Serverless Framework para desplegar en AWS Lambda u otro proveedor compatible:

```bash
npm run deploy
```

### Frontend

El frontend fue desplegado en AWS S3 como sitio estático.

---

> _Desarrollado por Alfredo. Proyecto de ejemplo para pruebas técnicas._
