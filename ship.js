var Ship = class {
    constructor(ctx, x, y, width, height) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.moveX = x;
        this.moveY = y;
        this.MOVE_AMOUNT = 100;
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
}