let nowPlaying = document.querySelector('.now-playing');
let trackArt = document.querySelector('.track-art');
let trackName = document.querySelector('.track-name');
let trackArtist = document.querySelector('.track-artist');

let playPauseBtn = document.querySelector('.playpause-track');
let nextBtn = document.querySelector('.next-track');
let prevBtn = document.querySelector('.prev-track');

let seekSlider = document.querySelector('.seek-slider');
let volumeSlider = document.querySelector('.volume-slider');
let currTime = document.querySelector('.current-time');
let totalDuration = document.querySelector('.total-duration');
let randomIcon = document.querySelector('.fa-random');
let currTrack = document.createElement('audio');

let trackIndex = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const musicList = [
    {
        img: 'images/dilawara.jpg',
        name: 'Dilawara',
        artist: 'The Prophec',
        music: 'music/Dilawara.mp3'
    },
    {
        img: 'images/945.jpg',
        name: '9:45',
        artist: 'Prabh',
        music: 'music/945.mp3'
    },
    {
        img: 'images/players.jpg',
        name: 'Players',
        artist: 'Karan Aujla',
        music: 'music/players.mp3'
    }
];

loadTrack(trackIndex);

function loadTrack(trackIndex) {
    clearInterval(updateTimer);
    reset();

    currTrack.src = musicList[trackIndex].music;
    currTrack.load();

    trackArt.style.backgroundImage = "url(" + musicList[trackIndex].img + ")";
    trackName.textContent = musicList[trackIndex].name;
    trackArtist.textContent = musicList[trackIndex].artist;
    nowPlaying.textContent = "Playing music " + (trackIndex + 1) + " of " + musicList.length;

    updateTimer = setInterval(setUpdate, 1000);

    currTrack.addEventListener('ended', nextTrack);
    randomBgColor();
}

function randomBgColor() {
    let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];
    let color = '';

    function populate(color) {
        for (let i = 0; i < 6; i++) {
            let x = Math.round(Math.random() * 14);
            let y = hex[x];
            color += y;
        }
        return color;
    }
    let color1 = populate('#');
    let color2 = populate('#');
    var angle = 'to right';

    let gradient = 'linear-gradient(' + angle + ',' + color1 + ', ' + color2 + ")";
    document.body.style.background = gradient;
}

function reset() {
    currTime.textContent = "00:00";
    totalDuration.textContent = "00:00";
    seekSlider.value = 0;
}

function randomTrack() {
    isRandom ? pauseRandom() : playRandom();
}

function playRandom() {
    isRandom = true;
    randomIcon.classList.add('randomActive');
}

function pauseRandom() {
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}

function repeatTrack() {
    let currentIndex = trackIndex;
    loadTrack(currentIndex);
    playTrack();
}

function playpauseTrack() {
    isPlaying ? pauseTrack() : playTrack();
}

function playTrack() {
    currTrack.play();
    isPlaying = true;
    trackArt.classList.add('rotate');
    playPauseBtn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
    currTrack.pause();
    isPlaying = false;
    trackArt.classList.remove('rotate');
    playPauseBtn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function nextTrack() {
    if (trackIndex < musicList.length - 1 && !isRandom) {
        trackIndex += 1;
    } else if (trackIndex < musicList.length - 1 && isRandom) {
        let randomIndex = parseInt(Math.random() * musicList.length);
        trackIndex = randomIndex;
    } else {
        trackIndex = 0;
    }
    loadTrack(trackIndex);
    playTrack();
}

function prevTrack() {
    if (trackIndex > 0) {
        trackIndex -= 1;
    } else {
        trackIndex = musicList.length - 1;
    }
    loadTrack(trackIndex);
    playTrack();
}

function seekTo() {
    let seekTo = currTrack.duration * (seekSlider.value / 100);
    currTrack.currentTime = seekTo;
}

function setVolume() {
    currTrack.volume = volumeSlider.value / 100;
}

function setUpdate() {
    let seekPosition = 0;
    if (!isNaN(currTrack.duration)) {
        seekPosition = currTrack.currentTime * (100 / currTrack.duration);
        seekSlider.value = seekPosition;

        let currentMinutes = Math.floor(currTrack.currentTime / 60);
        let currentSeconds = Math.floor(currTrack.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(currTrack.duration / 60);
        let durationSeconds = Math.floor(currTrack.duration - durationMinutes * 60);

        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        currTime.textContent = currentMinutes + ":" + currentSeconds;
        totalDuration.textContent = durationMinutes + ":" + durationSeconds;
    }
}
