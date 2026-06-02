from flask import Blueprint, jsonify
from database.db import get_db_connection
from flask_jwt_extended import jwt_required  # Added to protect the route

faculty_bp = Blueprint('faculty', __name__)

@faculty_bp.route('/faculty', methods=['GET'])
@jwt_required()  # Locked! Requires a valid JWT token now
def get_faculty():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM faculty")
    data = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify(data)