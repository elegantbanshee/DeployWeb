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

    draw(delta, frozen) {
        // Logic
        if (!this.stop && !frozen) {
            this.y += delta * this.MOVE_AMOUNT;
            if (this.diff >= 0) {
                this.y += delta * this.MOVE_AMOUNT * this.diff;
                this.diff = -1;
            }
        }

        // Draw
        var image = null;
        switch (this.type) {
            case this.TYPE_CLEAR:
                image = document.getElementById("powerup_red")
                break;
            case this.TYPE_FREEZE:
                image = document.getElementById("powerup_blue");
                break;
        }

        this.ctx.drawImage(
            image,
            this.x - this.r,
            this.y - this.r,
            this.r * 2,
            this.r * 2
        );
    }
}