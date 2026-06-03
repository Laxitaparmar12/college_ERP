from flask import Blueprint, request, jsonify
from database.db import get_db_connection
from flask_jwt_extended import create_access_token

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = str(data.get('password'))
    role = data.get('role')

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    table = "student" if role == "student" else "faculty" if role == "faculty" else "admin"
    id_col = "enrollment_no" if role == "student" else "faculty_id" if role == "faculty" else "admin_id"

    cursor.execute(f"SELECT * FROM {table} WHERE {id_col} = %s", (username,))
    user = cursor.fetchone()

    cursor.close()
    conn.close()

    if user and str(user['password']) == password:
        token = create_access_token(identity=username)

        return jsonify({
            "message": "Login successful",
            "token": token,
            "role": role
        }), 200

    return jsonify({"error": "Invalid credentials"}), 401