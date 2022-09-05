var MeteorHandler = class {
    constructor(ctx, soundManager) {
        this.ctx = ctx;
        this.soundManager = soundManager;
        this.METEORS = [];
        this.lastTime = 3;
        this.INTERVAL = 3;
        this.endGameCallback = function () {};
    }

    update(ship, delta) {
        // Add meteor
        if (this.lastTime > this.INTERVAL) {
            var meteor = new Meteor(this.ctx,
                Math.random() * window.innerWidth,
                -100,
                Math.max(30, Math.random() * 100)
            );
            var that = this;
            meteor.destroyCallback = function (meteor_) {
                for (var index = 0; index < that.METEORS.length; index++) {
                    var m = that.METEORS[index];
                    if (m === meteor_) {
                        that.METEORS.splice(index, 1);
                        that.soundManager.play(that.soundManager.EXPLOSION);
                        break;
                    }
                }
            };
            this.METEORS.push(meteor);
            this.lastTime = 0;
        }
        this.lastTime += delta;
        // Clean
        for (var index = 0; index < this.METEORS.length; index++) {
            var meteor = this.METEORS[index];
            if (meteor.y > window.innerHeight + 500) {
                this.METEORS.splice(index, 1);
                break;
            }
        }
        // Check ship collision
        for (var index = 0; index < this.METEORS.length; index++) {
            var meteor = this.METEORS[index];
            if (ship.overlaps(meteor))
                this.endGameCallback();
            ship.checkLaserOverlaps(meteor);
        }
    }

    draw(delta) {
        for (var index = 0; index < this.METEORS.length; index++) {
            this.METEORS[index].update(delta);
            this.METEORS[index].draw();
        }
    }

    reset() {
        this.METEORS = [];
    }
}