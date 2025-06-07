from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
import json

app = Flask(__name__)
CORS(app)

SONG_FILE = 'now_playing.txt'
META_FILE = 'now_playing_meta.json'

@app.route('/update', methods=['POST'])
def update_song():
    data = request.get_json()
    print("Přijatá data:", data)

    # Uložení názvu skladby
    with open(SONG_FILE, 'w', encoding='utf-8') as f:
        f.write(data.get('song', ''))

    # Uložení aktuálního času a délky
    meta = {
        'current': data.get('current', 0),
        'duration': data.get('duration', 0)
    }
    with open(META_FILE, 'w', encoding='utf-8') as f:
        json.dump(meta, f)

    return 'OK'

@app.route('/now_playing.json', methods=['GET'])
def get_song():
    song = ''
    meta = {'current': 0, 'duration': 0}

    if os.path.exists(SONG_FILE):
        with open(SONG_FILE, 'r', encoding='utf-8') as f:
            song = f.read().strip()

    if os.path.exists(META_FILE):
        with open(META_FILE, 'r', encoding='utf-8') as f:
            meta = json.load(f)

    return jsonify({
        'song': song,
        'current': meta.get('current', 0),
        'duration': meta.get('duration', 0)
    })

@app.route('/now_playing.html')
def serve_html():
    return send_from_directory('.', 'now_playing.html')

if __name__ == '__main__':
    app.run()
