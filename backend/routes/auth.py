from flask import Blueprint, request, jsonify
from database.db import get_db_connection
from flask_jwt_extended import create_access_token

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    if not email or not password:
        return jsonify({"error": "Please provide both email and password"}), 400
        
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    
    # 1. Search in student table first
    cursor.execute("SELECT * FROM student WHERE email = %s", (email,))
    user = cursor.fetchone()
    role = "student"
    
    # 2. If not found in student, search in faculty table
    if not user:
        cursor.execute("SELECT * FROM faculty WHERE email = %s", (email,))
        user = cursor.fetchone()
        role = "faculty"
        
    cursor.close()
    conn.close()
    
    # 3. Verify user exists and check plaintext password matching
    if user and str(user['password']) == str(password):
        # Generate temporary access token containing user identity parameters
        access_token = create_access_token(identity={"id": user.get('id') or user.get('faculty_id'), "role": role})
        return jsonify({
            "message": "Login successful",
            "token": access_token,
            "role": role
        }), 200
        
    return jsonify({"error": "Invalid email or password"}), 401