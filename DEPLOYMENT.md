# Guía de Despliegue Multiplataforma

## Pasos para Despliegue Completo

### 1. Crear Repositorio GitHub

```bash
# Si ya tienes un repositorio en GitHub, añádelo como remoto:
git remote add origin https://github.com/tu-usuario/multiplataforma-app.git

# Sube el código
git push -u origin master
```

### 2. Desplegar Backend en Railway

1. **Crear cuenta en Railway**: [railway.app](https://railway.app)
2. **Conectar GitHub**:
   - Inicia sesión con GitHub
   - Click "New Project" → "Deploy from GitHub repo"
   - Selecciona este repositorio

3. **Configurar el servicio**:
   - Railway detectará automáticamente el `Procfile`
   - Asignará un puerto automáticamente
   - La URL será algo como: `https://tu-app-name.up.railway.app`

4. **Variables de entorno** (opcional):
   - `PORT`: Railway lo configura automáticamente
   - `RAILWAY_ENVIRONMENT`: `production`

### 3. Desplegar Frontend en Vercel

1. **Crear cuenta en Vercel**: [vercel.com](https://vercel.com)
2. **Conectar GitHub**:
   - Inicia sesión con GitHub
   - Click "New Project"
   - Selecciona este repositorio GitHub

3. **Configurar el despliegue**:
   - **Framework Preset**: Other
   - **Root Directory**: `frontend`
   - **Build Command**: (dejar en blanco para static site)
   - **Output Directory**: (dejar en blanco)

4. **Actualizar URL del Backend**:
   - Una vez que Railway te dé la URL, edita `frontend/script.js`
   - Cambia: `const BACKEND_URL = 'https://tu-backend-url.railway.app';`

### 4. Configurar CI/CD Automático

Ambas plataformas están configuradas para despliegue automático:

- **Vercel**: Se despliega automáticamente en cada push a `master`/`main`
- **Railway**: Se despliega automáticamente en cada push a `master`/`main`
- **GitHub Actions**: Pipeline configurado para despliegue automático

### 5. Verificar Despliegue

1. **Backend**: Visita `https://tu-backend-url.railway.app/api/health`
2. **Frontend**: Visita `https://tu-frontend-url.vercel.app`
3. **Prueba la aplicación**:
   - Agrega usuarios desde el frontend
   - Verifica la conexión con el backend
   - Revisa el estado del backend

## URLs de Ejemplo (reemplazar con las tuyas)

```
Frontend: https://multiplataforma-app.vercel.app
Backend:  https://multiplataforma-backend.up.railway.app
```

## Troubleshooting

### Problemas Comunes

1. **CORS errors**: El backend ya tiene Flask-CORS configurado
2. **Backend no responde**: Verifica que Railway esté ejecutando el servicio
3. **Frontend no conecta**: Confirma la URL del backend en `script.js`
4. **Despliegue fallido**: Revisa los logs en Vercel/Railway

### Logs y Monitoreo

- **Vercel**: Dashboard → View Logs
- **Railway**: Dashboard → Service → Logs

## Requisitos Verificados

✅ **Aplicación funcional**: Frontend y backend operativos  
✅ **URLs públicas**: Ambas aplicaciones accesibles online  
✅ **Múltiples plataformas**: Vercel + Railway  
✅ **Repositorio GitHub**: Código versionado  
✅ **CI/CD automático**: Despliegue en cada push  

## Arquitectura Final

```
GitHub Repo
    ↓ (CI/CD)
┌─────────────────┬─────────────────┐
│   Vercel        │    Railway      │
│   (Frontend)    │   (Backend)     │
│                 │                 │
│  Static Site    │   Python API    │
│  HTML/CSS/JS    │   Flask         │
└─────────────────┴─────────────────┘
```
