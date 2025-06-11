// ==UserScript==
// @name         YouTube Music Now Playing Sender
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Sends song into local directory
// @match        https://music.youtube.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let lastSent = '';

    setInterval(() => {
        const titleElem = document.querySelector('.ytmusic-player-bar .title');
        const artistElem = document.querySelector('.ytmusic-player-bar .subtitle');
        const timeElem = document.querySelector('.time-info');

        if (!titleElem || !artistElem || !timeElem) return;

        const artistClean = artistElem.innerText.split('\n')[0];
        const song = `${titleElem.title} — ${artistClean}`;

        const [currentStr, durationStr] = timeElem.innerText.split(' / ');
        const toSeconds = str => str.split(':').reduce((a, b) => 60 * a + +b);

        const current = toSeconds(currentStr);
        const duration = toSeconds(durationStr);

        const payload = JSON.stringify({ song, current, duration });

        if (payload !== lastSent) {
            lastSent = payload;
            fetch('http://localhost:5000/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: payload
            }).catch(console.error);
        }
    }, 1000);
})();
