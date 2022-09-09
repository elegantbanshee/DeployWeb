var Laser = class {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = 10;
        this.height = 25;
        this.MOVE_AMOUNT = 200;
        this.destroyCallback = function () {};
    }

    draw(delta) {
        // Draw
        if (DeployGlobal.debugOutlines) {
            this.ctx.fillStyle = "#ffe300";
            this.ctx.strokeStyle = "#ffe300";

            this.ctx.beginPath();
            this.ctx.rect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
            this.ctx.stroke();
        }

        var img = document.getElementById("laser");
        this.ctx.drawImage(
            img,
            this.x - this.width / 2,
            this.y - this.height / 2,
            this.width,
            this.height
        );

        // Logic
        this.y -= delta * this.MOVE_AMOUNT;

        if (this.y <= -this.height)
            this.destroyCallback(this);
    }

    overlaps(meteor) {
        var top = [this.x, this.y - this.height / 2];
        var bottom = [this.x, this.y + this.height / 2];

        var topDistance = Math.sqrt(
            Math.pow(top[0] - meteor.x, 2) +
            Math.pow(top[1] - meteor.y, 2)
        );
        var bottomDistance = Math.sqrt(
            Math.pow(bottom[0] - meteor.x, 2) +
            Math.pow(bottom[1] - meteor.y, 2)
        );
        return topDistance <= meteor.r ||
            bottomDistance <= meteor.r;
    }
}