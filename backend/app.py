from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)

# ✅ CORS FIX (IMPORTANT)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
    return response

# -------------------------------
# 📁 CSV LOAD
# -------------------------------
students = pd.read_csv("dataset/student.csv")
faculty = pd.read_csv("dataset/faculty.csv")
admins = pd.read_csv("dataset/admin.csv")

# -------------------------------
# ✅ HOME
# -------------------------------
@app.route("/")
def home():
    return "SmartERP Backend Running ✅"

# -------------------------------
# ✅ LOGIN API
# -------------------------------
@app.route("/api/login", methods=["POST"])
def login():
    data = request.json
    username = str(data.get("email")).strip()
    password = str(data.get("password")).strip()

    # 🔥 STUDENT LOGIN (ID)
    student = students[students["id"].astype(str) == username]
    if not student.empty:
        return jsonify({
            "role": "student",
            "user": student.iloc[0].to_dict()
        })

    # 🔥 FACULTY LOGIN
    fac = faculty[faculty["email"] == username]
    if not fac.empty:
        return jsonify({
            "role": "faculty",
            "user": fac.iloc[0].to_dict()
        })

    # 🔥 ADMIN LOGIN
    adm = admins[admins["email"] == username]
    if not adm.empty:
        return jsonify({
            "role": "admin",
            "user": adm.iloc[0].to_dict()
        })

    return jsonify({"error": "Invalid credentials"}), 401

# -------------------------------
# ✅ USER DATA API
# -------------------------------
@app.route("/api/user-data", methods=["POST"])
def user_data():
    data = request.json
    role = data.get("role")
    user_id = str(data.get("id"))

    if role == "student":
        user = students[students["id"].astype(str) == user_id]
        if not user.empty:
            return jsonify(user.iloc[0].to_dict())

    if role == "faculty":
        user = faculty[faculty["email"] == user_id]
        if not user.empty:
            return jsonify(user.iloc[0].to_dict())

    if role == "admin":
        user = admins[admins["email"] == user_id]
        if not user.empty:
            return jsonify(user.iloc[0].to_dict())

    return jsonify({"error": "User not found"}), 404

# -------------------------------
# ✅ DASHBOARD STATS
# -------------------------------
@app.route("/api/dashboard-stats", methods=["GET"])
def dashboard():
    return jsonify({
        "students": len(students),
        "faculty": len(faculty),
        "courses": 12
    })

# -------------------------------
# ✅ CSV UPLOAD
# -------------------------------
@app.route("/upload-csv", methods=["POST"])
def upload_csv():
    file = request.files.get("file")

    if not file:
        return jsonify({"error": "No file uploaded"}), 400

    return jsonify({"message": "File uploaded successfully"})

# -------------------------------
# 🚀 RUN
# -------------------------------
if __name__ == "__main__":
    app.run(debug=True)