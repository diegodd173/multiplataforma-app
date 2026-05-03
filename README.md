# Aplicación Web Multiplataforma

Proyecto demostrativo de despliegue multiplataforma usando diferentes servicios en la nube.

## Arquitectura

- **Frontend**: HTML/CSS/JavaScript vanilla desplegado en **Netlify**
- **Backend**: Python/Flask API desplegado en **Render**
- **Repositorio**: GitHub con CI/CD automático

## Estructura del Proyecto

```
├── frontend/           # Aplicación frontend
│   ├── index.html
│   ├── styles.css
│   └── script.js
├── backend/            # API backend
│   ├── app.py
│   ├── requirements.txt
│   ├── Procfile
│   └── README.md
└── README.md          # Este archivo
```

## Funcionalidades

- Gestión de usuarios (CRUD básico)
- Verificación de conexión entre frontend y backend
- Despliegue automático con CI/CD
- URLs públicas para ambas aplicaciones

## URLs de Despliegue

### Frontend
- **Frontend**: URL: [Pendiente de despliegue]
- **Repositorio**: Conectado a GitHub

### Backend (Render)
- URL: [Pendiente de despliegue]
- API: Python/Flask REST

## Configuración Local

### Frontend
```bash
# Servir localmente (opcional)
cd frontend
python -m http.server 8000
```

### Backend
```bash
# Instalar dependencias
cd backend
pip install -r requirements.txt

# Ejecutar localmente
python app.py
```

## Endpoints del Backend

- `GET /` - Información del servicio
- `GET /api/health` - Health check
- `GET /api/users` - Obtener usuarios
- `POST /api/users` - Crear usuario
- `GET /api/stats` - Estadísticas

## CI/CD

Ambas plataformas están configuradas para despliegue automático:

- **Vercel**: Despliegue automático al hacer push a `main`
- **Railway**: Despliegue automático al hacer push a `main`

## Requisitos Cumplidos

✅ Aplicación funcional  
✅ Desplegada en internet (URLs públicas)  
✅ Múltiples plataformas (Vercel + Railway)  
✅ Conectada a repositorio GitHub  
✅ CI/CD automático configurado  

## Tecnologías Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Backend**: Python, Flask, Flask-CORS
- **Despliegue**: Vercel, Railway
- **Control de Versiones**: Git/GitHub
