# Despliegue Manual en Railway (si GitLab falla)

## Opción 1: Subir directamente a Railway

1. Ve a railway.app
2. Click "New Project" → "Provision Demo"
3. Selecciona "Python" como template
4. Reemplaza los archivos con los del backend

## Opción 2: Usar GitHub como intermediario

1. Crea un repositorio en GitHub
2. Sube el mismo código
3. Conecta Railway con GitHub

## Opción 3: Despliegue con Docker

1. Crea Dockerfile en el backend
2. Sube a Railway con Docker

## Comandos si necesitas sincronizar con GitHub:

git remote add github https://github.com/tu-usuario/multiplataforma-app.git
git push github master
