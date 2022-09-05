var Ship = class {
    constructor(ctx, x, y, width, height, soundManager) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.moveX = x;
        this.moveY = y;
        this.MOVE_AMOUNT = 100;
        this.LASERS = [];
        this.soundManager = soundManager;
    }

    draw(delta) {
        // Logic
        if (this.x < this.moveX)
            this.x += delta * this.MOVE_AMOUNT;
        else if (this.x > this.moveX)
            this.x -= delta * this.MOVE_AMOUNT;
        if (this.y < this.moveY)
            this.y += delta * this.MOVE_AMOUNT;
        else if (this.y > this.moveY)
            this.y -= delta * this.MOVE_AMOUNT;

        // Draw
        this.ctx.strokeStyle = "#ffffff";
        this.ctx.fillStyle = "#ffffff";
        this.ctx.beginPath();

        this.ctx.moveTo(this.x - this.width / 2, this.y + this.height / 2);
        this.ctx.lineTo(this.x, this.y - this.height / 2);
        this.ctx.lineTo(this.x + this.width / 2, this.y + this.width / 2);

        this.ctx.closePath();
        this.ctx.stroke();

        // Laser
        for (var index = 0; index < this.LASERS.length; index++) {
            var laser = this.LASERS[index];
            laser.draw(delta);
        }
    }

    moveTo(x, y) {
        this.moveX = x;
        this.moveY = y;
    }

    overlaps(meteor) {
        var left = [this.x - this.width / 2, this.y + this.height / 2];
        var middle = [this.x, this.y - this.height / 2];
        var right = [this.x + this.width / 2, this.y + this.width / 2];

        var leftDistance = Math.sqrt(
            Math.pow(left[0] - meteor.x, 2) +
            Math.pow(left[1] - meteor.y, 2)
        );
        var middleDistance = Math.sqrt(
            Math.pow(middle[0] - meteor.x, 2) +
            Math.pow(middle[1] - meteor.y, 2)
        );
        var rightDistance = Math.sqrt(
            Math.pow(right[0] - meteor.x, 2) +
            Math.pow(right[1] - meteor.y, 2)
        );
        return leftDistance <= meteor.r ||
            middleDistance <= meteor.r ||
            rightDistance <= meteor.r;
    }

    onClick() {
        var laser = new Laser(this.ctx, this.x, this.y);
        var that = this;
        laser.destroyCallback = function (laser_) {
            for (var index = 0; index < that.LASERS.length; index++) {
                var l = that.LASERS[index];
                if (l === laser_) {
                    that.LASERS.splice(index, 1);
                    break;
                }
            }
        };
        this.LASERS.push(laser);

        this.soundManager.play(this.soundManager.LASER_FIRE);
    }

    reset() {
        this.LASERS = [];
    }

    checkLaserOverlaps(meteor) {
        for (var index = 0; index < this.LASERS.length; index++) {
            var laser = this.LASERS[index];
            if (laser.overlaps(meteor)) {
                this.LASERS.splice(index, 1);
                meteor.destroy();
                break;
            }
        }
    }
}