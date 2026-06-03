import mysql.connector

def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="12345678", # Apna DB password yahan likhein
        database="college_erp"
    )