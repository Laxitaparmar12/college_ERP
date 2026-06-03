from flask import Blueprint, jsonify
from database.db import get_db_connection
from flask_jwt_extended import jwt_required

admin_bp = Blueprint('admin', __name__)

@admin_bp.route('/api/admin/dashboard-stats', methods=['GET'])
@jwt_required()
def get_admin_stats():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    
    try:
        # Aapke naye table aur data count queries
        cursor.execute("SELECT COUNT(*) as total FROM student")
        s_count = cursor.fetchone()
        
        cursor.execute("SELECT COUNT(*) as total FROM faculty")
        f_count = cursor.fetchone()
        
        return jsonify({
            "active_users": f"{s_count['total']}+" if s_count else "0+",
            "faculty_count": str(f_count['total']) if f_count else "0",
            "avg_attendance": "94.2%",  
            "avg_cgpa": "8.4",
            "fee_collection": "91%",
            "at_risk_students": "8"
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        conn.close()