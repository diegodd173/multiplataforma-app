// Backend URL - URL de Render
const BACKEND_URL = 'https://multiplataforma-app.onrender.com';

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

// Enviar usuario al backend (Render)
async function sendUserToBackend(user) {
    try {
        const response = await fetch(`${BACKEND_URL}/api/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: user.name,
                email: user.email
            })
        });
        
        if (response.ok) {
            console.log('Usuario enviado a Render exitosamente');
        }
    } catch (error) {
        console.log('Error al enviar al backend (puede estar iniciando):', error);
    }
}

// Verificar conexión con backend (Render)
async function checkBackend() {
    const statusDiv = document.getElementById('backendStatus');
    
    statusDiv.className = 'status-loading';
    statusDiv.textContent = 'Verificando conexión con Render...';
    
    try {
        const response = await fetch(`${BACKEND_URL}/api/health`);
        
        if (response.ok) {
            const data = await response.json();
            statusDiv.className = 'status-success';
            statusDiv.innerHTML = `
                ✅ Render conectado<br>
                Estado: ${data.status}<br>
                Plataforma: ${data.platform}<br>
                Usuarios: ${data.users_count}<br>
                Tiempo: ${new Date(data.timestamp).toLocaleString()}
            `;
        } else {
            throw new Error('Render no responde correctamente');
        }
    } catch (error) {
        statusDiv.className = 'status-error';
        statusDiv.innerHTML = `
            ❌ Error de conexión<br>
            ${error.message}<br>
            Render puede estar iniciando (tarda 1-2 minutos)<br>
            Intenta de nuevo en unos momentos
        `;
    }
}

// Obtener usuarios del backend (Render)
async function fetchBackendUsers() {
    try {
        const response = await fetch(`${BACKEND_URL}/api/users`);
        
        if (response.ok) {
            const backendUsers = await response.json();
            console.log('Usuarios del backend:', backendUsers);
            return backendUsers.users;
        }
    } catch (error) {
        console.log('Error al obtener usuarios del backend:', error);
        return [];
    }
}
