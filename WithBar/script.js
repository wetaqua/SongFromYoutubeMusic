(function() {
    'use strict';

    let lastPayload = '';

    setInterval(() => {
        const titleElem = document.querySelector('.ytmusic-player-bar .title');
        const artistElem = document.querySelector('.ytmusic-player-bar .subtitle');
        const timeElem = document.querySelector('.time-info');

        if (!titleElem || !artistElem || !timeElem) return;

        const rawArtist = artistElem.innerText;
        const artist = rawArtist.split('•')[0].trim();

        const song = `${titleElem.title} — ${artist}`;

        const [currentStr, durationStr] = timeElem.innerText.split(' / ');
        if (!currentStr || !durationStr) return;

        const toSeconds = str => {
            const parts = str.split(':').map(Number);
            return parts.reduce((acc, val) => acc * 60 + val, 0);
        };

        const current = toSeconds(currentStr);
        const duration = toSeconds(durationStr);

        const payload = JSON.stringify({ song, current, duration });

        if (payload === lastPayload) return;
        lastPayload = payload;

        console.log('Odesílám:', payload);

        fetch('http://localhost:5000/update', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: payload
        }).catch(err => console.error('Chyba při odesílání:', err));
    }, 1000);
})();