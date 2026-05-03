from flask import Flask, jsonify, request
from flask_cors import CORS
import datetime
import os

app = Flask(__name__)
CORS(app)

# Base de datos en memoria (para demostración)
users = []

@app.route('/')
def home():
    return jsonify({
        'message': 'Backend para App Demo Multiplataforma',
        'version': '1.0.0',
        'platform': 'Render',
        'status': 'running'
    })

@app.route('/api/health')
def health_check():
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.datetime.now().isoformat(),
        'service': 'backend-api',
        'users_count': len(users),
        'platform': 'Render'
    })

@app.route('/api/users', methods=['GET'])
def get_users():
    return jsonify({
        'users': users,
        'count': len(users)
    })

@app.route('/api/users', methods=['POST'])
def create_user():
    data = request.get_json()
    
    if not data or 'name' not in data or 'email' not in data:
        return jsonify({'error': 'Nombre y email son requeridos'}), 400
    
    user = {
        'id': len(users) + 1,
        'name': data['name'],
        'email': data['email'],
        'created_at': datetime.datetime.now().isoformat()
    }
    
    users.append(user)
    
    return jsonify({
        'message': 'Usuario creado exitosamente',
        'user': user
    }), 201

@app.route('/api/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = next((u for u in users if u['id'] == user_id), None)
    
    if not user:
        return jsonify({'error': 'Usuario no encontrado'}), 404
    
    return jsonify(user)

@app.route('/api/stats')
def get_stats():
    return jsonify({
        'total_users': len(users),
        'last_user': users[-1] if users else None,
        'server_time': datetime.datetime.now().isoformat(),
        'environment': os.getenv('ENVIRONMENT', 'production'),
        'platform': 'Render'
    })

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
