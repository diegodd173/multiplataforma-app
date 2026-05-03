// Configuración de Supabase (reemplazar con tus credenciales)
const SUPABASE_URL = 'https://YOUR-PROJECT-ID.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR-ANON-KEY';

// Backend URL - ahora usando Supabase
const BACKEND_URL = SUPABASE_URL;

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
    
    // Enviar a Supabase
    sendUserToSupabase(user);
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

// Enviar usuario a Supabase
async function sendUserToSupabase(user) {
    try {
        const response = await fetch(`${BACKEND_URL}/rest/v1/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
            },
            body: JSON.stringify({
                name: user.name,
                email: user.email
            })
        });
        
        if (response.ok) {
            console.log('Usuario enviado a Supabase exitosamente');
        }
    } catch (error) {
        console.log('Error al enviar a Supabase:', error);
    }
}

// Verificar conexión con Supabase
async function checkBackend() {
    const statusDiv = document.getElementById('backendStatus');
    
    statusDiv.className = 'status-loading';
    statusDiv.textContent = 'Verificando conexión con Supabase...';
    
    try {
        // Health check con Supabase
        const response = await fetch(`${BACKEND_URL}/rest/v1/users?select=count()`, {
            method: 'GET',
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
            }
        });
        
        if (response.ok) {
            const data = await response.json();
            statusDiv.className = 'status-success';
            statusDiv.innerHTML = `
                ✅ Supabase conectado<br>
                Estado: Activo<br>
                Usuarios en BD: ${data.length || 0}<br>
                Tiempo: ${new Date().toLocaleString()}
            `;
        } else {
            throw new Error('Supabase no responde correctamente');
        }
    } catch (error) {
        statusDiv.className = 'status-error';
        statusDiv.innerHTML = `
            ❌ Error de conexión<br>
            ${error.message}<br>
            Verifica las credenciales de Supabase
        `;
    }
}

// Obtener usuarios de Supabase
async function fetchSupabaseUsers() {
    try {
        const response = await fetch(`${BACKEND_URL}/rest/v1/users?select=*`, {
            method: 'GET',
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
            }
        });
        
        if (response.ok) {
            const supabaseUsers = await response.json();
            console.log('Usuarios de Supabase:', supabaseUsers);
            return supabaseUsers;
        }
    } catch (error) {
        console.log('Error al obtener usuarios de Supabase:', error);
        return [];
    }
}
