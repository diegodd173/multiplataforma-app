// Backend URL - cambiará después del despliegue
const BACKEND_URL = 'https://your-backend-url.railway.app';

// Usuarios almacenados localmente
let users = JSON.parse(localStorage.getItem('users')) || [];

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    renderUsers();
});

// Agregar usuario
function addUser() {
    const nameInput = document.getElementById('nameInput');
    const emailInput = document.getElementById('emailInput');
    
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    
    if (!name || !email) {
        alert('Por favor completa todos los campos');
        return;
    }
    
    const user = {
        id: Date.now(),
        name: name,
        email: email,
        createdAt: new Date().toISOString()
    };
    
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Limpiar formulario
    nameInput.value = '';
    emailInput.value = '';
    
    // Actualizar UI
    renderUsers();
    
    // Enviar al backend
    sendUserToBackend(user);
}

// Renderizar usuarios
function renderUsers() {
    const container = document.getElementById('usersContainer');
    
    if (users.length === 0) {
        container.innerHTML = '<p>No hay usuarios registrados</p>';
        return;
    }
    
    container.innerHTML = users.map(user => `
        <div class="user-item">
            <h4>${user.name}</h4>
            <p>${user.email}</p>
            <small>Creado: ${new Date(user.createdAt).toLocaleString()}</small>
        </div>
    `).join('');
}

// Enviar usuario al backend
async function sendUserToBackend(user) {
    try {
        const response = await fetch(`${BACKEND_URL}/api/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        });
        
        if (response.ok) {
            console.log('Usuario enviado al backend exitosamente');
        }
    } catch (error) {
        console.log('Error al enviar al backend (puede estar offline):', error);
    }
}

// Verificar conexión con backend
async function checkBackend() {
    const statusDiv = document.getElementById('backendStatus');
    
    statusDiv.className = 'status-loading';
    statusDiv.textContent = 'Verificando conexión...';
    
    try {
        const response = await fetch(`${BACKEND_URL}/api/health`);
        
        if (response.ok) {
            const data = await response.json();
            statusDiv.className = 'status-success';
            statusDiv.innerHTML = `
                ✅ Backend conectado<br>
                Estado: ${data.status}<br>
                Tiempo: ${data.timestamp}
            `;
        } else {
            throw new Error('Backend no responde correctamente');
        }
    } catch (error) {
        statusDiv.className = 'status-error';
        statusDiv.innerHTML = `
            ❌ Error de conexión<br>
            ${error.message}<br>
            Verifica que el backend esté desplegado
        `;
    }
}

// Obtener usuarios del backend
async function fetchBackendUsers() {
    try {
        const response = await fetch(`${BACKEND_URL}/api/users`);
        
        if (response.ok) {
            const backendUsers = await response.json();
            console.log('Usuarios del backend:', backendUsers);
            return backendUsers;
        }
    } catch (error) {
        console.log('Error al obtener usuarios del backend:', error);
        return [];
    }
}
