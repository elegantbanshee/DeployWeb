var Main = class {

    constructor() {
        this.lastDraw = Date.now();
        this.soundManager = new SoundManager();
        this.meteorHandler = this.createMeteorHandler();
        this.bigLaserHandler = this.createBigLaserHandler();
        this.powerupHandler = this.createPowerupHandler();
        this.ship = this.createShip();
        this.score = 0;
        this.lastScoreTime = 0;
        this.SCORE_INTERVAL = 1;
        this.hasStartedMusic = false;

        this.initCanvas();
        this.addResizeEvent();
    }

    createMeteorHandler() {
        var canvas = document.getElementById("canvas");

        var meteor = new MeteorHandler(canvas.getContext("2d"), this.soundManager);
        var that = this;
        meteor.endGameCallback = function () {
            that.resetGame();
        };

        return meteor;
    }

    resetGame() {
        this.meteorHandler.reset();
        this.score = 0;
        this.ship.reset();
        this.soundManager.play(this.soundManager.EXPLOSION);
        this.soundManager.reset();
        this.bigLaserHandler.reset();
        this.powerupHandler.reset();
    }

    initCanvas() {
        var canvas = document.getElementById("canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    createShip() {
        var canvas = document.getElementById("canvas");

        var ship = new Ship(canvas.getContext("2d"),
            window.innerWidth / 2,
            window.innerHeight - 200,
            75,
            75,
            this.soundManager,
            this.bigLaserHandler);
        return ship;
    }

    draw(that, delta) {
        // Logic
        that.meteorHandler.update(that.ship, that.bigLaserHandler, delta);
        that.updateScore(delta);
        that.bigLaserHandler.update(delta, that.score, that.ship);
        that.powerupHandler.update(delta, that.ship);
        // Draw
        that.clearCanvas();
        that.ship.draw(delta);
        that.meteorHandler.draw(delta);
        that.powerupHandler.draw(delta);
        that.bigLaserHandler.draw(delta);
        that.drawScore();
    }

    updateScore(delta) {
        if (this.lastScoreTime >= this.SCORE_INTERVAL) {
            this.score += 1;
            this.lastScoreTime = 0;
        }
        this.lastScoreTime += delta
    }

    drawScore() {
        if (this.score <= 0)
            return;

        var ctx = this.getCtx();
        ctx.strokeStyle = "#ffffff";
        ctx.font = "30px Verdana";
        ctx.strokeText(
            this.score,
            window.innerWidth / 2 - ctx.measureText(this.score).width / 2,
            50
        );
    }

    _draw(that) {
        var delta = Date.now() - that.lastDraw;
        delta /= 1000;
        that.draw(that, delta);
        that.lastDraw = Date.now();
    }

    clearCanvas() {
        var ctx = this.getCtx();
        ctx.fillStyle = "#000000"
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    }

    getCtx() {
        return document.getElementById("canvas").getContext("2d");
    }

    _mouseMove(that, event) {
        that.ship.moveTo(event.clientX, event.clientY);
    }

    addResizeEvent() {
        var that = this;
        window.addEventListener("resize", function (event) {
            that.initCanvas();
        });
    }

    _onClick(that) {
        that.ship.onClick();
        that.startMusic()
    }

    _touchMove(that, event) {
        if (event.touches.length === 2)
            that.ship.onClick();

        if (event.touches.length === 1)
            that._mouseMove(that, event.touches[0]);
        that.startMusic();
    }

    startMusic() {
        if (!this.hasStartedMusic) {
            this.hasStartedMusic = true;
            this.soundManager.startMusic();
        }
    }

    createBigLaserHandler() {
        var bigLaserHandler =  new BigLaserHandler(this.getCtx(), this.soundManager);
        var that = this;
        bigLaserHandler.endGameCallback = function () {
            that.resetGame();
        };
        return bigLaserHandler;
    }

    _keyPress(event) {
        console.log(event.code);

        // Debug spawn laser
        if (event.code === "KeyA")
            this.bigLaserHandler.spawnLaser();

        // Debug spawn powerup
        if (event.code === "KeyS")
            this.powerupHandler.spawnPowerup();

        // Powerup
        if (event.code === "Space")
            this.powerupHandler.use();
    }

    createPowerupHandler() {
        var powerupHandler = new PowerupHandler(
            this.getCtx(),
            this.soundManager,
            this.meteorHandler,
            this.bigLaserHandler
        );
        return powerupHandler;
    }
}


var main = new Main();
window.addEventListener("load", function () {
    setInterval(main._draw, 1, main);
});
window.addEventListener("mousemove", function (event) {
    main._mouseMove(main, event);
});
window.addEventListener("touchmove", function (event) {
    main._touchMove(main, event);
});
window.addEventListener("click", function (event) {
    main._onClick(main);
});
window.addEventListener("keypress", function (event) {
    main._keyPress(event);
});