document.addEventListener('DOMContentLoaded', function() {
    const albumItems = document.querySelectorAll('.album-item');
    const playerContainer = document.getElementById('player-container');
    const soundcloudPlayer = document.getElementById('soundcloud-player');
    const closePlayerBtn = document.getElementById('close-player');
    let currentlyPlaying = null;
    let currentWidget = null;

    function loadAndPlayTrack(trackId) {
        const trackUrl = `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${trackId}&auto_play=true`;
        soundcloudPlayer.src = trackUrl;
        playerContainer.classList.add('active');

        if (currentWidget) {
            currentWidget.unbind(SC.Widget.Events.READY);
        }

        currentWidget = SC.Widget(soundcloudPlayer);
        currentWidget.bind(SC.Widget.Events.READY, function() {
            currentWidget.play();
        });
    }

    albumItems.forEach(item => {
        item.addEventListener('click', function() {
            const trackId = this.dataset.trackId;

            if (currentlyPlaying === this && playerContainer.classList.contains('active')) {
                currentWidget.toggle();
            } else {
                loadAndPlayTrack(trackId);

                if (currentlyPlaying) {
                    currentlyPlaying.classList.remove('active');
                }
                this.classList.add('active');
                currentlyPlaying = this;
            }
        });
    });

    closePlayerBtn.addEventListener('click', function() {
        playerContainer.classList.remove('active');
        if (currentWidget) {
            currentWidget.pause();
            // Reset the iframe src to stop the audio completely
            soundcloudPlayer.src = '';
        }
        if (currentlyPlaying) {
            currentlyPlaying.classList.remove('active');
        }
        currentlyPlaying = null;
    });
});