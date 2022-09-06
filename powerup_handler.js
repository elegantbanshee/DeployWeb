var PowerupHandler = class  {
    constructor(ctx, soundManager, meteorHandler, bigLaserHandler) {
        this.ctx = ctx;
        this.soundManager = soundManager;
        this.POWERUPS = [];
        this.powerup = null;
        this.INTERVAL = 5;
        this.lastTIme = 5;
        this.meteorHandler = meteorHandler;
        this.bigLaserHandler = bigLaserHandler;
    }

    update(delta, ship) {
        if (this.lastTIme >= this.INTERVAL) {
            if (Math.random() <= 0.5)
                this.spawnPowerup();
            this.lastTIme = 0;
        }
        this.lastTIme += delta;

        for (var index = 0; index < this.POWERUPS.length; index++) {
            var powerup = this.POWERUPS[index];
            if (ship.checkPowerupOverlaps(powerup) && this.powerup === null) {
                this.powerup = powerup;
                this.powerup.stop = true;
                this.powerup.x = 10 + this.powerup.r * 2;
                this.powerup.y = window.innerHeight - 10 - this.powerup.r * 2;
                this.POWERUPS.splice(index, 1);
                break;
            }
            for (var bigLaserIndex = 0; bigLaserIndex < this.bigLaserHandler.LASERS.length; bigLaserIndex++) {
                var bigLaser = this.bigLaserHandler.LASERS[bigLaserIndex];
                if (bigLaser.overlaps(powerup)) {
                    this.POWERUPS.splice(index, 1);
                    break;
                }
            }
            for (var laserIndex = 0; laserIndex < ship.LASERS.length; laserIndex++) {
                var laser = ship.LASERS[laserIndex];
                if (laser.overlaps(powerup)) {
                    this.POWERUPS.splice(index, 1);
                    ship.LASERS.splice(laserIndex, 1);
                    break;
                }
            }
        }
    }

    draw(delta) {
        for (var index = 0; index < this.POWERUPS.length; index++) {
            var powerup = this.POWERUPS[index];
            powerup.draw(delta, this.meteorHandler.isFrozen(delta, false));
        }

        if (this.powerup) {
            this.powerup.draw(delta);
        }
    }

    reset() {
        this.POWERUPS = [];
        this.powerup = null;
        this.lastTIme = 5;
    }

    spawnPowerup() {
        var powerup = new Powerup(
            Math.random() * window.innerWidth,
            -30,
            15,
            this.ctx,
            this.lastTIme
        );

        var type = null;
        var typeInt = Math.round(Math.random());
        if (typeInt === 0)
            type = powerup.TYPE_FREEZE;
        if (typeInt === 1)
            type = powerup.TYPE_CLEAR;
        powerup.setType(type);
        this.POWERUPS.push(powerup);
    }

    use() {
        if (this.powerup !== null) {
            switch (this.powerup.type) {
                case this.powerup.TYPE_FREEZE:
                    this.handleFreezePowerup();
                    break;
                case this.powerup.TYPE_CLEAR:
                    this.handleClearPowerup();
                    break;
            }
            this.powerup = null;
        }
    }

    handleFreezePowerup() {
        this.meteorHandler.handleFreezePowerup();
    }

    handleClearPowerup() {
        this.meteorHandler.handleClearPowerup();
        this.bigLaserHandler.handleClearPowerup();
        this.reset();
        this.soundManager.play(this.soundManager.EXPLOSION);
    }
}