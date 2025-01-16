# TODO: ask chatgpt for better comments

import os
from flask import Flask, render_template, jsonify, request
from dotenv import load_dotenv
from sqlalchemy import create_engine, text

load_dotenv()

app = Flask(__name__)

engine = create_engine(os.getenv('DB_CONNECTION_STR'), echo=True)

@app.route('/')
def hello_world():
  return 'Hi bruh'

@app.route('/api/get-all-from-db', methods=['POST'])
def get_all_from_db():
  data = request.get_json()

  table_name = data.get('database')

  try:
      query = text(f"SELECT * FROM {table_name}")
      
      with engine.connect() as connection:
          result = connection.execute(query)
          result = [row._asdict() for row in result.all()]
          print('RESULT: ', result)
      
      return jsonify({'message': 'Successfully retrieved from db', 'result': result}), 200
  except Exception as e:
      return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
  app.run(host='0.0.0.0', debug=True)