from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import os

app = Flask(__name__)

# ✅ CORS FIX (Frontend connect ho sake)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
    return response


# -------------------------------
# 📁 CSV PATH FIX (IMPORTANT)
# -------------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

students = pd.read_csv(os.path.join(BASE_DIR, "../dataset/student.csv"))
faculty = pd.read_csv(os.path.join(BASE_DIR, "../dataset/faculty.csv"))
admins = pd.read_csv(os.path.join(BASE_DIR, "../dataset/admin.csv"))
attendance = pd.read_csv(os.path.join(BASE_DIR, "../dataset/attendance.csv"))
results = pd.read_csv(os.path.join(BASE_DIR, "../dataset/results.csv"))
subjects = pd.read_csv(os.path.join(BASE_DIR, "../dataset/subjects.csv"))
events = pd.read_csv(os.path.join(BASE_DIR, "../dataset/events.csv"))
event_participation = pd.read_csv(os.path.join(BASE_DIR, "../dataset/event_participation.csv"))

csv_tables = {
    "admin": admins,
    "attendance": attendance,
    "events": events,
    "event_participation": event_participation,
    "faculty": faculty,
    "results": results,
    "student": students,
    "subjects": subjects,
}


def records(df):
    return df.where(pd.notnull(df), None).to_dict(orient="records")


# -------------------------------
# ✅ HOME
# -------------------------------
@app.route("/")
def home():
    return "SmartERP Backend Running ✅"


# -------------------------------
# ✅ LOGIN API (FIXED)
# -------------------------------
@app.route("/api/login", methods=["POST"])
def login():
    data = request.json
    username = str(data.get("username", "")).strip()
    password = str(data.get("password")).strip()
    role = str(data.get("role", "")).strip().lower()

    if not username or not password or role not in {"student", "faculty", "admin"}:
        return jsonify({"error": "Username, password, and valid role are required"}), 400

    if role == "student":
        matched_user = students[
            (students["enrollment_no"].astype(str).str.strip() == username) &
            (students["password"].astype(str).str.strip() == password)
        ]
    elif role == "faculty":
        matched_user = faculty[
            (
                (faculty["faculty_id"].astype(str).str.strip() == username) |
                (faculty["email"].astype(str).str.strip() == username)
            ) &
            (faculty["password"].astype(str).str.strip() == password)
        ]
    else:
        matched_user = admins[
            (
                (admins["admin_id"].astype(str).str.strip() == username) |
                (admins["email"].astype(str).str.strip() == username)
            ) &
            (admins["password"].astype(str).str.strip() == password)
        ]

    if not matched_user.empty:
        return jsonify({
            "message": "Login successful",
            "token": f"{role}:{username}",
            "role": role,
            "user": matched_user.iloc[0].to_dict()
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
        user = students[students["enrollment_no"].astype(str).str.strip() == user_id]

    elif role == "faculty":
        user = faculty[
            (faculty["faculty_id"].astype(str).str.strip() == user_id) |
            (faculty["email"].astype(str).str.strip() == user_id)
        ]

    elif role == "admin":
        user = admins[
            (admins["admin_id"].astype(str).str.strip() == user_id) |
            (admins["email"].astype(str).str.strip() == user_id)
        ]

    else:
        return jsonify({"error": "Invalid role"}), 400

    if not user.empty:
        return jsonify(user.iloc[0].to_dict())

    return jsonify({"error": "User not found"}), 404


# -------------------------------
# ✅ DASHBOARD STATS
# -------------------------------
@app.route("/api/dashboard-stats", methods=["GET"])
def dashboard():
    avg_attendance = round(float(attendance["attendance_percentage"].mean()), 1) if not attendance.empty else 0
    at_risk_students = int(attendance[attendance["attendance_percentage"] < 75]["enrollment_no"].nunique()) if not attendance.empty else 0

    return jsonify({
        "students": len(students),
        "faculty": len(faculty),
        "courses": int(subjects["subject_id"].nunique()),
        "student_count": len(students),
        "faculty_count": len(faculty),
        "avg_attendance": f"{avg_attendance}%",
        "at_risk_students": at_risk_students
    })


@app.route("/api/students", methods=["GET"])
def get_students():
    return jsonify(records(students))


@app.route("/api/faculty-list", methods=["GET"])
def get_faculty_list():
    return jsonify(records(faculty))


@app.route("/api/subjects", methods=["GET"])
def get_subjects():
    return jsonify(records(subjects))


@app.route("/api/events", methods=["GET"])
def get_events():
    return jsonify(records(events))


@app.route("/api/csv-data", methods=["GET"])
def get_csv_data():
    return jsonify({
        name: {
            "columns": list(table.columns),
            "rows": records(table),
            "total": len(table),
        }
        for name, table in csv_tables.items()
    })


@app.route("/api/ai-prediction/<enrollment_no>", methods=["GET"])
def get_ai_prediction(enrollment_no):
    enrollment_no = str(enrollment_no).strip()
    student_attendance = attendance[
        attendance["enrollment_no"].astype(str).str.strip() == enrollment_no
    ]
    participation = event_participation[
        event_participation["enrollment_no"].astype(str).str.strip() == enrollment_no
    ]

    avg_attendance = float(student_attendance["attendance_percentage"].mean()) if not student_attendance.empty else 0
    event_points = int(participation["points"].fillna(0).sum()) if not participation.empty else 0
    attended_events = int((participation["attendance_status"].astype(str).str.lower() == "present").sum()) if not participation.empty else 0
    registered_events = int((participation["registration_status"].astype(str).str.lower() == "registered").sum()) if not participation.empty else 0

    event_score = min(event_points, 100)
    prediction_score = round((avg_attendance * 0.7) + (event_score * 0.3), 1)

    if prediction_score >= 80:
        prediction = "Excellent growth"
        risk = "Low"
    elif prediction_score >= 65:
        prediction = "Stable performance"
        risk = "Medium"
    else:
        prediction = "Needs attention"
        risk = "High"

    recommendations = []
    if avg_attendance < 75:
        recommendations.append("Improve attendance above 75% to reduce academic risk.")
    else:
        recommendations.append("Attendance is healthy; keep it consistent.")

    if attended_events < 2:
        recommendations.append("Participate in more events to improve engagement score.")
    else:
        recommendations.append("Event participation is adding positively to the prediction.")

    if event_points < 30:
        recommendations.append("Aim for higher event points through technical, cultural, or sports activities.")
    else:
        recommendations.append("Event points show strong co-curricular involvement.")

    return jsonify({
        "enrollment_no": enrollment_no,
        "avg_attendance": round(avg_attendance, 1),
        "attendance_records": len(student_attendance),
        "registered_events": registered_events,
        "attended_events": attended_events,
        "event_points": event_points,
        "event_score": event_score,
        "prediction_score": prediction_score,
        "prediction": prediction,
        "risk": risk,
        "recommendations": recommendations,
        "attendance": records(student_attendance),
        "event_participation": records(participation),
    })


@app.route("/api/attendance/<enrollment_no>", methods=["GET"])
def get_student_attendance(enrollment_no):
    student_attendance = attendance[
        attendance["enrollment_no"].astype(str).str.strip() == str(enrollment_no).strip()
    ].merge(subjects, on="subject_id", how="left")

    return jsonify(records(student_attendance))


@app.route("/api/results/<enrollment_no>", methods=["GET"])
def get_student_results(enrollment_no):
    student_results = results[
        results["enrollment_no"].astype(str).str.strip() == str(enrollment_no).strip()
    ].merge(subjects, on="subject_id", how="left")

    return jsonify(records(student_results))


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
