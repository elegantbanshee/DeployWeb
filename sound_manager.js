var SoundManager = class {
    constructor() {
        this.LASER_FIRE = "audio/laser.mp3"
        this.EXPLOSION = "audio/explosion.mp3"

        this.createAudioPlayers();
    }

    createAudioPlayers() {
        for (var index = 0; index < 10; index++) {
            var audioHolder = document.getElementById("audio");
            var audio = document.createElement("audio");
            audioHolder.appendChild(audio);
        }
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
}