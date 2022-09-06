var Powerup = class  {
    constructor(x, y, r, ctx, diff) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.ctx = ctx;
        this.diff = diff;
        this.TYPE_FREEZE = 0;
        this.TYPE_CLEAR = 1;
        this.type = 0;
        this.MOVE_AMOUNT = 50;
        this.stop = false;
    }

    setType(type) {
        this.type = type;
    }

    draw(delta) {
        // Logic
        if (!this.stop) {
            this.y += delta * this.MOVE_AMOUNT;
            if (this.diff >= 0) {
                this.y += delta * this.MOVE_AMOUNT * this.diff;
                this.diff = -1;
            }
        }

        // Draw
        switch (this.type) {
            case this.TYPE_CLEAR:
                this.ctx.fillStyle = "#ff0000";
                break;
            case this.TYPE_FREEZE:
                this.ctx.fillStyle = "#00ffd7";
                break;
        }
        this.ctx.strokeStyle = "#ffffff"
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        this.ctx.stroke();
        this.ctx.fill();
    }
}