class Bullet {
    constructor(id) {
        this.id = id;
        this.x = 0;
        this.y = 0;
        this.r = 10;
        this.frameX = 0;
        this.frameY = 0;
        this.speedX = 9;
        this.speedY = 9;
        this.speed = 1;
        this.ipotenusa = Math.sqrt(Math.pow(this.speedX, 2) + Math.pow(this.speedX, 2));
    }
}