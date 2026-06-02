from flask import Blueprint, jsonify
from database.db import get_db_connection

attendance_bp = Blueprint('attendance', __name__)

@attendance_bp.route('/attendance', methods=['GET'])
def get_attendance():

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM attendance")

    data = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify(data)