var Main = class {

    constructor() {
        this.lastDraw = Date.now();
        this.meteorHandler = this.createMeteorHandler();
        this.ship = this.createShip();
        this.score = -1;
        this.lastScoreTime = 0;
        this.SCORE_INTERVAL = 1000;

        this.initCanvas();
        this.addResizeEvent();
    }

    createMeteorHandler() {
        var canvas = document.getElementById("canvas");

        var meteor = new MeteorHandler(canvas.getContext("2d"));
        var that = this;
        meteor.endGameCallback = function () {
            that.resetGame();
        };

        return meteor;
    }

    resetGame() {
        this.meteorHandler.reset();
        this.score = -1;
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
            75);
        return ship;
    }

    draw(that, delta) {
        // Logic
        that.meteorHandler.update(that.ship);
        that.updateScore();
        // Draw
        that.clearCanvas();
        that.ship.draw(delta);
        that.meteorHandler.draw(delta);
        that.drawScore();
    }

    updateScore() {
        if (Date.now() - this.lastScoreTime >= this.SCORE_INTERVAL) {
            this.score += 1;
            this.lastScoreTime = Date.now();
        }
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
}


var main = new Main();
window.addEventListener("load", function () {
    setInterval(main._draw, 1, main);
});
window.addEventListener("mousemove", function (event) {
    main._mouseMove(main, event);
})