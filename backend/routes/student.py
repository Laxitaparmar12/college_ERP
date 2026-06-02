from flask import Blueprint, jsonify
from database.db import get_db_connection
from flask_jwt_extended import jwt_required  # Added to protect the route

student_bp = Blueprint('student', __name__)

@student_bp.route('/student', methods=['GET'])
@jwt_required()  # Locked! Requires a valid JWT token now
def get_student():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    
    cursor.execute("SELECT * FROM student")
    data = cursor.fetchall()
    
    cursor.close()
    conn.close()
    
    return jsonify(data)