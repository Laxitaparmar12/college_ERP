from flask import Blueprint, jsonify
from database.db import get_db_connection

events_bp = Blueprint('events', __name__)

@events_bp.route('/events', methods=['GET'])
def get_events():

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM events")

    data = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify(data)