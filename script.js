document.addEventListener('DOMContentLoaded', function() {
    const videoPlayer = document.getElementById('videoPlayer');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const volumeSlider = document.getElementById('volumeSlider');
    const playbackSpeed = document.getElementById('playbackSpeed');
    const seekBar = document.getElementById('seekBar');
    const currentTime = document.getElementById('currentTime');
    const duration = document.getElementById('duration');

    function togglePlayPause() {
        if (videoPlayer.paused) {
            videoPlayer.play();
            playPauseBtn.textContent = 'Pause';
        } else {
            videoPlayer.pause();
            playPauseBtn.textContent = 'Play';
        }
    }

    function formatTime(timeInSeconds) {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    function updateTimeAndSeek() {
        currentTime.textContent = formatTime(videoPlayer.currentTime);
        seekBar.value = (videoPlayer.currentTime / videoPlayer.duration) * 100;
    }

    playPauseBtn.addEventListener('click', togglePlayPause);

    volumeSlider.addEventListener('input', function() {
        videoPlayer.volume = this.value;
    });

    playbackSpeed.addEventListener('change', function() {
        videoPlayer.playbackRate = this.value;
    });

    seekBar.addEventListener('input', function() {
        const time = videoPlayer.duration * (parseInt(this.value) / 100);
        videoPlayer.currentTime = time;
    });

    videoPlayer.addEventListener('loadedmetadata', function() {
        duration.textContent = formatTime(videoPlayer.duration);
        seekBar.max = 100;
    });

    videoPlayer.addEventListener('timeupdate', updateTimeAndSeek);

    document.addEventListener('keydown', function(e) {
        if (e.code === 'Space') {
            e.preventDefault();
            togglePlayPause();
        }
    });
});