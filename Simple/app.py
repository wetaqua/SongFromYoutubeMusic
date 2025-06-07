from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

NOW_PLAYING_FILE = 'now_playing.txt'

@app.route('/update', methods=['POST'])
def update_song():
    data = request.get_json()
    print("Přijatá data:", data)
    with open(NOW_PLAYING_FILE, 'w', encoding='utf-8') as f:
        f.write(data.get('song', ''))
    return 'OK'

@app.route('/now_playing.json', methods=['GET'])
def get_song():
    song = ''
    if os.path.exists(NOW_PLAYING_FILE):
        with open(NOW_PLAYING_FILE, 'r', encoding='utf-8') as f:
            song = f.read().strip()
    return jsonify({'song': song})

@app.route('/now_playing.html')
def serve_html():
    return send_from_directory('.', 'now_playing.html')

if __name__ == '__main__':
    app.run()
