var BigLaser = class  {
    constructor(ctx, soundManger, x) {
        this.ctx = ctx;
        this.soundManger = soundManger;
        this.x = x;
        this.Y = window.innerHeight / 2;
        this.WIDTH = 100;
        this.HEIGHT = window.innerHeight;
        this.aliveTime = 0;
        this.warningTime = 3;
        this.endTime = 4;
        this.destroyCallback = function () {};
        this.didPlayAudioActive = false;
        this.didPlayAudioCharging = false;
    }

    draw(delta) {
        // Draw
        if (DeployGlobal.debugOutlines) {
            if (this.aliveTime <= this.warningTime) {
                this.ctx.fillStyle = "#ffe400";
                this.ctx.strokeStyle = "#ffe400";
            }
            else {
                this.ctx.fillStyle = "#ff0000";
                this.ctx.strokeStyle = "#ff0000";
            }

            this.ctx.beginPath();
            this.ctx.rect(this.x - this.WIDTH / 2, this.Y - this.HEIGHT / 2, this.WIDTH, this.HEIGHT);
            this.ctx.stroke();
        }

        var img = null;
        if (this.aliveTime <= this.warningTime) {
            img = document.getElementById("laserBigYellow");
        }
        else {
            img = document.getElementById("laserBigRed");
        }
        this.ctx.drawImage(
            img,
            this.x - this.WIDTH / 2,
            this.Y - this.HEIGHT / 2,
            this.WIDTH,
            this.HEIGHT
        );

        // Check remove
        this.aliveTime += delta;
        if (this.aliveTime > this.endTime)
            this.destroyCallback();

        // Check audio
        if (this.aliveTime > this.warningTime && !this.didPlayAudio) {
            this.didPlayAudio = true;
            this.soundManger.play(this.soundManger.BIG_LASER_ACTIVE);
        }
        if (this.aliveTime <= this.warningTime && !this.didPlayAudioCharging) {
            this.didPlayAudioCharging = true;
            this.soundManger.play(this.soundManger.BIG_LASER_CHARGING);
        }
    }

    overlaps(meteor) {
        if (this.aliveTime <= this.warningTime)
            return false;

        var meteorLeft = meteor.x - meteor.r;
        var meteorRight = meteor.x + meteor.r;
        var left = this.x - this.WIDTH / 2;
        var right = this.x + this.WIDTH / 2;

        return meteorRight > left && meteorLeft < right;

    }

    overlapsLaser(laser) {
        if (this.aliveTime <= this.warningTime)
            return false;

        var laserLeft = laser.x - laser.width / 2;
        var laserRight = laser.x + laser.width / 2;
        var left = this.x - this.WIDTH / 2;
        var right = this.x + this.WIDTH / 2;

        return laserRight > left && laserLeft < right;
    }
}