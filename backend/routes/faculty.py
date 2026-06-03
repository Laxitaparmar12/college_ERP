from flask import Blueprint, jsonify
from database.db import get_db_connection
from flask_jwt_extended import jwt_required, get_jwt_identity

faculty_bp = Blueprint('faculty', __name__)

@faculty_bp.route('/api/faculty', methods=['GET'])
@jwt_required()
def get_faculty():
    current_faculty_id = get_jwt_identity()
    
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    
    # Aapke naye column 'faculty_id' ke hisab se fetch karega
    query = "SELECT * FROM faculty WHERE faculty_id = %s"
    cursor.execute(query, (current_faculty_id,))
    data = cursor.fetchone()
    
    cursor.close()
    conn.close()
    
    if not data:
        return jsonify({"error": "Faculty not found"}), 404
        
    return jsonify(data), 200