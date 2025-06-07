(function() {
    'use strict';

    let lastSong = '';

    setInterval(() => {
        const titleElem = document.querySelector('.title.ytmusic-player-bar');
        const artistElem = document.querySelector('.byline.ytmusic-player-bar');
        if (!titleElem || !artistElem) return;

        const rawArtist = artistElem.innerText;
        const artist = rawArtist.split('•')[0].trim();

        const song = `${titleElem.title} — ${artist}`;
        if (song !== lastSong) {
            lastSong = song;
            console.log('Odesílám skladbu:', song);

            fetch('http://localhost:5000/update', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({song})
            }).catch(err => console.error('Chyba při odesílání:', err));
        }
    }, 5000);
})();
