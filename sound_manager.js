var SoundManager = class {
    constructor() {
        this.LASER_FIRE = "audio/laser.mp3";
        this.EXPLOSION = "audio/explosion.mp3";
        this.MUSIC_INTRO = "audio/music/FIS_intro1.mp3";
        this.MUSIC_0 = "audio/music/FIS_loop1.mp3";
        this.MUSIC_1 = "audio/music/FIS_loop2.mp3";
        this.MUSIC_2 = "audio/music/FIS_loop3.mp3";
        this.MUSIC_3 = "audio/music/FIS_loop4.mp3";

        this.createAudioPlayers();
    }

    createAudioPlayers() {
        // Audio
        for (var index = 0; index < 10; index++) {
            var audioHolder = document.getElementById("audio");
            var audio = document.createElement("audio");
            audioHolder.appendChild(audio);
        }
        // Music
        var musicHolder = document.getElementById("music");
        var music = document.createElement("audio");
        var that = this;
        music.addEventListener("ended", function () {
            that.playNextTrack();
        });
        musicHolder.appendChild(music);
    }

    play(audioPath) {
        var audioHolder = document.getElementById("audio");
        for (var index = 0; index < audioHolder.children.length; index++) {
            var audio = audioHolder.children[index];
            if (audio.ended || isNaN(audio.duration) | audio.duration === 0) {
                audio.src = audioPath;
                audio.play();
                break;
            }
        }
    }

    reset() {
        this.stopMusic();
        this.startMusic();
    }

    stopMusic() {
        var music = this.getMusicPlayer();
        music.pause();
    }

    startMusic() {
        var music = this.getMusicPlayer();
        music.src = this.MUSIC_INTRO;
        music.play();
    }

    getMusicPlayer() {
        var musicHolder = document.getElementById("music");
        return musicHolder.children[0];
    }

    playNextTrack() {
        var index = Math.round(Math.random() * 3);
        var track = this.MUSIC_INTRO;
        switch (index) {
            case 0:
                track = this.MUSIC_0;
                break;
            case 1:
                track = this.MUSIC_1;
                break;
            case 2:
                track = this.MUSIC_2;
                break;
            case 3:
                track = this.MUSIC_3;
                break;
        }

        var music = this.getMusicPlayer();
        music.src = track;
        music.play();
    }
}