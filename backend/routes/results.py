from flask import Blueprint, jsonify
from database.db import get_db_connection

results_bp = Blueprint('results', __name__)

@results_bp.route('/results', methods=['GET'])
def get_results():

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM results")

    data = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify(data)