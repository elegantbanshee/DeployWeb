var Meteor = class {
    constructor(ctx, x, y, r) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.r = r;
        this.MOVE_AMOUNT = 50;
    }

    draw() {
        this.ctx.strokeStyle = "#62ff00";
        this.ctx.fillStyle = "#62ff00";
        this.ctx.beginPath();

        this.ctx.arc(
            this.x,
            this.y,
            this.r,
            0,
            2 * Math.PI
        );

        this.ctx.stroke();
    }

    update(delta) {
        this.y += delta * this.MOVE_AMOUNT;
    }
}