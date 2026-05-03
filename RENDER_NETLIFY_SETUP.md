# Configuración Final: Render + Netlify

## Plan Gratuito y Funcional

### Backend en Render (Gratis)
- **Plataforma**: Render
- **Tecnología**: Python/Flask
- **URL**: https://tu-app.onrender.com
- **Ventajas**: 750 horas/mes gratis, sin límite de proyectos

### Frontend en Netlify (Gratis)
- **Plataforma**: Netlify
- **Tecnología**: HTML/CSS/JS
- **URL**: https://tu-app.netlify.app
- **Ventajas**: 100GB/mes gratis, despliegue automático

## Pasos de Configuración

### 1. Configurar Backend en Render

1. **Ve a [render.com](https://render.com)**
2. **Sign up with GitHub**
3. **Click "New +" → "Web Service"**
4. **Conecta tu repositorio**: `diegodd173/multiplataforma-app`
5. **Configura**:
   - **Name**: `multiplataforma-backend`
   - **Root Directory**: `backend`
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `python render-app.py`
6. **Click "Create Web Service"**

### 2. Configurar Frontend en Netlify

1. **Ve a [netlify.com](https://netlify.com)**
2. **Sign up with GitHub**
3. **Click "Add new site" → "Import existing project"**
4. **Conecta tu repositorio**: `diegodd173/multiplataforma-app`
5. **Configura**:
   - **Directory to deploy**: `frontend`
   - **Build command**: (dejar en blanco)
   - **Publish directory**: `frontend`
6. **Click "Deploy site"**

### 3. Conectar Frontend con Backend

1. **Obtén la URL de Render**: `https://multiplataforma-backend.onrender.com`
2. **Edita `frontend/render-script.js`**:
   ```javascript
   const BACKEND_URL = 'https://multiplataforma-backend.onrender.com';
   ```
3. **Actualiza `frontend/index.html`**:
   ```html
   <script src="render-script.js"></script>
   ```
4. **Sube los cambios a GitHub**

### 4. Verificar Funcionamiento

1. **Backend**: Visita `https://multiplataforma-backend.onrender.com/api/health`
2. **Frontend**: Visita `https://tu-app.netlify.app`
3. **Prueba la aplicación**:
   - Agrega usuarios
   - Verifica conexión con backend
   - Revisa que los datos se guarden

## URLs Finales del Proyecto

- **Frontend (Netlify)**: `https://multiplataforma-app.netlify.app`
- **Backend (Render)**: `https://multiplataforma-backend.onrender.com`
- **Repositorio (GitHub)**: `https://github.com/diegodd173/multiplataforma-app`

## Requisitos Cumplidos

✅ **Aplicación funcional**: Frontend + backend operativos  
✅ **URLs públicas**: Ambas accesibles online  
✅ **Múltiples plataformas**: Netlify + Render  
✅ **Repositorio GitHub**: Código versionado  
✅ **CI/CD automático**: Despliegue en cada push  

## Ventajas de esta Solución

✅ **100% gratuito** sin límites de proyectos  
✅ **Render**: 750 horas/mes, siempre activo  
✅ **Netlify**: Despliegue instantáneo  
✅ **GitHub Actions**: CI/CD automático  
✅ **Escalable y robusto**
