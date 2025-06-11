# SongFromYTBMusic
IMPORTANT NOTE: This project was created using ChatGPT. I am not affiliated with Google or Youtube and i do not profit from it. 

This tool does not use Youtube API. It only takes name of song and artist from visible interface of Youtube Music.
This project is intended solely for personal, non-commercial use.

Setup:
1. Add web source into OBS (or other streaming software), select "local file" and choose now_playing.html
2. RUN app.py (you need to have installed flask and flask_cors) 
3. then use Tampermonky (or other extension) to run script.js in music.youtube.com (script.js can also be pasted into console manualy)

Troubleshooting:
1. AdBlock can block fetch, try disabling it
2. Make sure you have python installed, and have flask and flask_cors in virtual environment or downloaded to computer
