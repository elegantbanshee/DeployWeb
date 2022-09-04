var MeteorHandler = class {
    constructor(ctx) {
        this.ctx = ctx;
        this.METEORS = [];
        this.lastTime = 0;
        this.INTERVAL = 3000;
        this.endGameCallback = function () {};
    }

    update(ship) {
        // Add meteor
        if (Date.now() - this.lastTime > this.INTERVAL) {
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
                        break;
                    }
                }
            };
            this.METEORS.push(meteor);
            this.lastTime = Date.now();
        }
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