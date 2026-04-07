# EcoCloset — Frontend

Aplicación web para calcular la huella ambiental del consumo de moda.

## Descripción

Aplicación desarrollada con React que guía al usuario a través de un cuestionario interactivo sobre sus hábitos de consumo.

Al finalizar, muestra:

- Huella de carbono estimada
- Consumo de agua asociado
- Comparativa con la media global
- Equivalencias visuales para contextualizar el impacto

El test puede realizarse sin registro. Los usuarios autenticados pueden guardar, consultar, editar y eliminar sus resultados.

## Demo

Frontend desplegado en Vercel:
https://ecocloset-frontend.vercel.app

## Tecnologías

- React 19
- Vite
- React Router DOM
- Fetch API
- CSS

## Instalación y ejecución en local

1. Clonar repositorio:

```bash
git clone https://github.com/carlabs3/ecocloset-frontend.git
cd ecocloset-frontend
```

2. Instalar dependencias:

```bash
npm install
```

3. Crear archivo `.env`:

```env
VITE_API_URL=http://localhost:4000
```

4. Ejecutar aplicación:

```bash
npm run dev
```

Disponible en:
http://localhost:5173

> El backend debe estar en ejecución para el correcto funcionamiento.

## Scripts

| Script            | Descripción            |
| ----------------- | ---------------------- |
| `npm run dev`     | Servidor de desarrollo |
| `npm run build`   | Build de producción    |
| `npm run preview` | Preview del build      |

## Rutas

| Ruta           | Descripción                   | Auth |
| -------------- | ----------------------------- | ---- |
| `/`            | Landing page con estadísticas | No   |
| `/register`    | Registro de usuario           | No   |
| `/login`       | Inicio de sesión              | No   |
| `/test`        | Cuestionario                  | No   |
| `/test/:id`    | Edición de test existente     | Sí   |
| `/results/:id` | Resultado guardado            | Sí   |
| `/history`     | Historial de resultados       | Sí   |

## Funcionalidades

- Test interactivo de 11 preguntas
- Cálculo de huella ambiental en backend
- Acceso sin registro (modo preview)
- Autenticación con JWT
- Historial de resultados
- Eliminación de resultados
- Edición de resultados
- Comparativa con media global
- Visualización de impacto mediante equivalencias
- Diseño responsive y moderno

## Estructura del proyecto

```
ecocloset-frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx → Navegación dinámica según auth
│   │   ├── PrivateRoute.jsx → Protección de rutas privadas
│   │   ├── QuestionCard.jsx → Tarjeta de pregunta reutilizable
│   │   └── ResultCard.jsx → Tarjeta de resultado reutilizable
│   ├── context/
│   │   └── AuthContext.jsx → Estado global de autenticación
│   ├── pages/
│   │   ├── Home.jsx → Landing page
│   │   ├── Login.jsx → Formulario de login
│   │   ├── Register.jsx → Formulario de registro
│   │   ├── Test.jsx → Cuestionario paso a paso
│   │   ├── Results.jsx → Resultados con comparativa
│   │   └── History.jsx  → Historial de tests
│   ├── App.jsx → Configuración de rutas
│   ├── main.jsx → Punto de entrada de React
│   └── index.css → Estilos globales y variables CSS
├── .env
└── package.json
```

## Variables de entorno

| Variable       | Descripción     |
| -------------- | --------------- |
| `VITE_API_URL` | URL del backend |

## Flujo de la aplicación

1. Usuario responde el cuestionario
2. Se calculan los resultados en el backend
3. Se muestran los resultados:
4. Posibilidad de:
   - Consultar historial
   - Eliminar resultados
   - Editar respuestas
   - Registrar resultado a la base de datos, mediante la creación de una cuenta de usuario

## Autor

Carla Barceló
https://github.com/carlabs3
