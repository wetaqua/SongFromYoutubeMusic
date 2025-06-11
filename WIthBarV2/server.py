from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

song_data = {"song": "", "current": 0, "duration": 0}

@app.route('/update', methods=['POST'])
def update():
    global song_data
    song_data = request.get_json()
    return 'OK'

@app.route('/now_playing_meta.json')
def get_meta():
    return jsonify({
        "current": song_data.get("current", 0),
        "duration": song_data.get("duration", 0)
    })

@app.route('/now_playing.txt')
def get_song():
    return song_data.get("song", "")

@app.route('/now_playing.html')
def html():
    return send_from_directory('.', 'now_playing.html')

if __name__ == '__main__':
    app.run()
