var BigLaserHandler = class  {
    constructor(ctx, soundManager) {
        this.ctx = ctx;
        this.soundManager = soundManager;
        this.LASERS = [];
        this.lastScore = 0;
        this.endGameCallback = function () {};
    }

    update(delta, score, ship) {
        // Try to spawn the laser with a 20% chance of spawning every 15 points on the scoreboard.
        if (score > 0 &&
            score % 15 === 0 &&
            Math.random() <= 0.2 &&
            this.lastScore !== score
        ) {
            this.lastScore = score;
            this.spawnLaser();
        }
        // Check collision
        for (var index = 0; index < this.LASERS.length; index++) {
            var laser = this.LASERS[index];
            if (ship.checkBigLaserOverlaps(laser)) {
                this.endGameCallback();
            }
        }
    }

    draw(delta) {
        for (var index = 0; index < this.LASERS.length; index++) {
            var laser = this.LASERS[index];
            laser.draw(delta);
        }
    }

    spawnLaser() {
        var x = Math.random() * window.innerWidth;
        var laser = new BigLaser(this.ctx, this.soundManager, x);
        var that = this;
        laser.destroyCallback = function () {
            for (var index = 0; index < that.LASERS.length; index++) {
                var laser_ = that.LASERS[index];
                if (laser === laser_) {
                    that.LASERS.splice(index, 1);
                    break;
                }
            }
        };
        this.LASERS.push(laser);
    }

    reset() {
        this.LASERS = [];
    }

    checkLaserOverlaps(meteor) {
        for (var index = 0; index < this.LASERS.length; index++) {
            var laser = this.LASERS[index];
            if (laser.overlaps(meteor)) {
                meteor.destroy();
                break;
            }
        }
    }

    handleClearPowerup() {
        this.reset();
    }
}