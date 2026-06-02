from flask import Blueprint, jsonify
from database.db import get_db_connection

subjects_bp = Blueprint('subjects', __name__)

@subjects_bp.route('/subjects', methods=['GET'])
def get_subjects():

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM subjects")

    data = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify(data)