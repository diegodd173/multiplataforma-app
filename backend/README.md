# Backend API - Demo Multiplataforma

Backend en Python/Flask desplegado en Railway.

## Endpoints

- `GET /` - Información del servicio
- `GET /api/health` - Health check
- `GET /api/users` - Obtener todos los usuarios
- `POST /api/users` - Crear nuevo usuario
- `GET /api/users/<id>` - Obtener usuario específico
- `GET /api/stats` - Estadísticas del servicio

## Despliegue en Railway

1. Conectar este repositorio a Railway
2. Railway detectará automáticamente el `Procfile` y `requirements.txt`
3. El despliegue será automático

## Variables de Entorno

- `PORT` - Puerto de escucha (configurado por Railway)
- `RAILWAY_ENVIRONMENT` - Entorno de ejecución
