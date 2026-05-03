-- Schema para la aplicación multiplataforma
-- Ejecutar en Supabase SQL Editor

-- Crear tabla de usuarios
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de logs (para health check)
CREATE TABLE system_logs (
  id SERIAL PRIMARY KEY,
  message TEXT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar log inicial
INSERT INTO system_logs (message) VALUES ('Backend initialized');

-- Crear función para health check
CREATE OR REPLACE FUNCTION health_check()
RETURNS JSON AS $$
BEGIN
  RETURN json_build_object(
    'status', 'healthy',
    'timestamp', CURRENT_TIMESTAMP,
    'users_count', (SELECT COUNT(*) FROM users),
    'service', 'supabase-backend'
  );
END;
$$ LANGUAGE plpgsql;

-- Crear API endpoint para health check
CREATE OR REPLACE FUNCTION api_health()
RETURNS JSON AS $$
BEGIN
  RETURN health_check();
END;
$$ LANGUAGE plpgsql;

-- Políticas de acceso (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Permitir lecturas públicas
CREATE POLICY "Enable read access for all users" ON users
  FOR SELECT USING (true);

-- Permitir inserciones públicas
CREATE POLICY "Enable insert for all users" ON users
  FOR INSERT WITH CHECK (true);

-- Crear vista para API
CREATE VIEW api_users AS
  SELECT id, name, email, created_at FROM users;

-- Crear vista para API stats
CREATE VIEW api_stats AS
  SELECT 
    COUNT(*) as total_users,
    MAX(created_at) as last_user_time,
    CURRENT_TIMESTAMP as server_time;
