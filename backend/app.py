from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager  # Added for JWT

# 1. Import all route blueprints + the new auth blueprint
from routes.student import student_bp
from routes.faculty import faculty_bp
from routes.attendance import attendance_bp
from routes.results import results_bp
from routes.subjects import subjects_bp
from routes.events import events_bp
from routes.auth import auth_bp  # New auth route import

app = Flask(__name__)
CORS(app)

# 2. Configure JWT Settings
app.config["JWT_SECRET_KEY"] = "college-erp-secure-secret-key"  # Change this to a random string later
jwt = JWTManager(app)

# 3. Register all blueprints with Flask
app.register_blueprint(student_bp)
app.register_blueprint(faculty_bp)
app.register_blueprint(attendance_bp)
app.register_blueprint(results_bp)
app.register_blueprint(subjects_bp)
app.register_blueprint(events_bp)
app.register_blueprint(auth_bp)  # Registering the authentication route

# 4. Home route
@app.route('/')
def home():
    return "College ERP Backend is Running Successfully!"

if __name__ == '__main__':
    app.run(debug=True)