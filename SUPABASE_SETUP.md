# Configuración de Supabase - Backend Gratuito

## Pasos para Configurar Supabase

### 1. Crear Proyecto Supabase
1. Ve a [supabase.com](https://supabase.com)
2. Click "Start your project" → "Sign up with GitHub"
3. Crea nuevo proyecto:
   - **Organization**: Tu nombre
   - **Project Name**: `multiplataforma-app`
   - **Database Password**: Crea una contraseña segura
   - **Region**: Elige la más cercana
4. Click "Create new project"

### 2. Obtener Credenciales
Una vez creado el proyecto:
1. Ve a **Project Settings** → **API**
2. Copia estos dos valores:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGciOi...`

### 3. Configurar la Base de Datos
1. Ve a **SQL Editor**
2. Copia y pega el contenido de `backend/supabase.sql`
3. Click "Run" para ejecutar el script

### 4. Actualizar el Frontend
1. Abre `frontend/supabase-script.js`
2. Reemplaza las credenciales:
   ```javascript
   const SUPABASE_URL = 'https://TU-PROYECTO-ID.supabase.co';
   const SUPABASE_ANON_KEY = 'TU-ANON-KEY';
   ```
3. Actualiza `frontend/index.html` para usar `supabase-script.js`

### 5. Probar la Aplicación
1. Sube los cambios a GitHub
2. Despliega el frontend en Vercel
3. Prueba la conexión con Supabase

## Ventajas de Supabase
✅ Totalmente gratuito  
✅ Base de datos PostgreSQL incluida  
✅ API REST automática  
✅ No requiere configuración de servidor  
✅ Escalable y robusto  

## URLs Finales
- **Frontend**: Vercel (tu-usuario.vercel.app)
- **Backend**: Supabase (tu-proyecto.supabase.co/rest/v1/)
- **Repositorio**: GitHub (diegodd173/multiplataforma-app)
