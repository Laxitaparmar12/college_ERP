from flask import Blueprint, jsonify
from database.db import get_db_connection
from flask_jwt_extended import jwt_required, get_jwt_identity

student_bp = Blueprint('student', __name__)

@student_bp.route('/api/student/dashboard', methods=['GET'])
@jwt_required()
def student_dashboard():
    enrollment_no = get_jwt_identity()

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    query = """
    SELECT s.*, r.marks, r.grade 
    FROM student s 
    LEFT JOIN results r ON s.enrollment_no = r.enrollment_no 
    WHERE s.enrollment_no = %s
    """

    cursor.execute(query, (enrollment_no,))
    data = cursor.fetchone()

    cursor.close()
    conn.close()

    return jsonify(data)