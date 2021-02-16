class Player {
    constructor(id) {
        this.dead=false;
        this.id = id;
        this.name = "";
        this.x = 0;
        this.y = 0;
        this.width = 192 / 4;
        this.height = 200 / 4;
        this.frameX = 0;
        this.frameY = 0;
        this.speed = 9;
        this.moving = false;
        this.jumpHeight = 20;
        this.jump = false;
        this.bullets = [];
    }
}