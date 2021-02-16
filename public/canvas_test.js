const canvas = document.getElementById("GameCanvas");
const ctx = canvas.getContext('2d');

canvas.width = 1920;
canvas.height = 1080;

const keys = [];

let player = new Player(id);

player.y = canvas.height - player.height;

const playerSprite = new Image();
playerSprite.src = 'death_scythe.png';

const background = new Image();
background.src = 'background.png';

let position = 0;

function drawPlayer(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

function drawBullet(x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.stroke();
}

function animate() {
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    //ctx.drawImage(background, position, 0, canvas.width, canvas.height);
    //position++;
    respawn();
    if (player.dead == true)
        return;
    movePlayer();
    shotMove();
    //jump();
    handlePlayerFrame();
    syncPlayer(player);

    //drawPlayer(playerSprite, player.frameX * player.height, player.frameY * player.width, player.width, player.height, player.x, player.y, player.height, player.height);
}

window.addEventListener("keydown", function(e) {
    keys[e.keyCode] = true;
    player.moving = true;
});

window.addEventListener("keyup", function(e) {
    delete keys[e.keyCode];
    player.moving = false;

});
window.addEventListener("click", function(e) {
    shot(e);
    var pos = getMousePos(canvas, e);
    console.log(pos);

});

function muroDestra() {
    for (let i = 0; i < map[0].length; i++) //riga
        for (let j = 0; j < map.length; j++) { //colonna
        if (map[i][j] == true) {
            //console.info(player.x + player.width + player.speed < bx * j);
            //console.info(player.x>bx * j+1);

            if (player.x + player.width + player.speed > bx * j)
                if (player.x + player.width + player.speed < bx * (j + 1)) {
                    if (player.y > by * i)
                        if (player.y < by * (i + 1))
                            return;

                    if (player.y + player.height > by * i)
                        if (player.y + player.height < by * (i + 1))
                            return;
                }
        }
    }
    player.x += player.speed;
}

function muroSinistra() {
    for (let i = 0; i < map[0].length; i++) //riga
        for (let j = 0; j < map.length; j++) { //colonna
        if (map[i][j] == true) {
            //console.info(player.x + player.width + player.speed < bx * j);
            //console.info(player.x>bx * j+1);

            if (player.x - player.speed < bx * (j + 1))
                if (player.x - player.speed > bx * j) {
                    if (player.y > by * i)
                        if (player.y < by * (i + 1))
                            return;

                    if (player.y + player.height > by * i)
                        if (player.y + player.height < by * (i + 1))
                            return;
                }
        }


    }

    player.x -= player.speed;
}

function muroSopra() {
    if (player.y - player.speed < 0)
        return;
    for (let i = 0; i < map[0].length; i++) //riga
        for (let j = 0; j < map.length; j++) { //colonna
        if (map[i][j] == true) {
            //console.info(player.x + player.width + player.speed < bx * j);
            //console.info(player.x>bx * j+1);

            if (player.y - player.speed < by * (i + 1))
                if (player.y - player.speed > by * i) {
                    if (player.x + player.width > bx * j)
                        if (player.x + player.width < bx * (j + 1))
                            return;
                    if (player.x > bx * j)
                        if (player.x < bx * (j + 1))
                            return;
                }
        }
    }
    player.y -= player.speed;
}

function muroSotto() {
    if (player.y + player.height + player.speed > canvas.height)
        return;
    for (let i = 0; i < map[0].length; i++) //riga
        for (let j = 0; j < map.length; j++) { //colonna
        if (map[i][j] == true) {
            //console.info(player.x + player.width + player.speed < bx * j);
            //console.info(player.x>bx * j+1);

            if (player.y + player.height + player.speed > by * i)
                if (player.y + player.height + player.speed < by * (i + 1)) {
                    if (player.x + player.width > bx * j)
                        if (player.x + player.width < bx * (j + 1))
                            return;
                    if (player.x > bx * j)
                        if (player.x < bx * (j + 1))
                            return;
                }
        }
    }
    player.y += player.speed;
}

function movePlayer() {

    if (keys[65] && player.x - player.speed > 0) //a
    {
        muroSinistra();
        player.frameY = 1;
    }
    if (keys[68] && player.x < canvas.width - player.width) //d
    {
        muroDestra();
        player.frameY = 2;
    }
    if (keys[87]) //w
    {
        muroSopra();
        player.frameY = 3;
    }
    if (keys[83]) //s
    {
        muroSotto();
        player.frameY = 0;
    }
}

function shot(e) {
    if (player.dead)
        return;
    var pos = getMousePos(canvas, e);

    let bullet = new Bullet(player.id);
    bullet.speedX = pos.x - player.x;
    bullet.speedY = pos.y - player.y;
    bullet.x = player.x + player.width / 2;
    bullet.y = player.y + player.height / 2;
    player.bullets.push(bullet);
}

let toRemove = [];

function shotMove() {
    let i = player.bullets.length;
    while (i--) {
        player.bullets[i].x += player.bullets[i].speedX / player.bullets[i].ipotenusa * player.bullets[i].speed;
        player.bullets[i].y += player.bullets[i].speedY / player.bullets[i].ipotenusa * player.bullets[i].speed;
        //if (player.bullets[i].x > canvas.width || player.bullets[i].x < 0 || player.bullets[i].y > canvas.height || player.bullets[i].y < 0) {
           // delete players.bullets[i];
        //}
    }
}

let jumpH = 0;
let up = true;

function jump() {
    if (player.jump == true) {
        if (jumpH == player.jumpHeight && up == true) {
            up = false;
        }
        if (up == true) {
            player.y -= player.jumpHeight - jumpH;
            jumpH++;
        } else
        if (up == false) {
            player.y += player.jumpHeight - jumpH;
            jumpH--;
        }
        if (jumpH == 0 && up == false) {
            player.y += player.jumpHeight;
            player.jump = false;
            up = true;
        }
    }
    //console.log(up);
    //console.log(player.jumpHeight);
    //console.log(jumpH);
    //console.log(player.y);

}

function handlePlayerFrame() {
    if (player.frameX < 3 && player.moving) player.frameX++;
    else
        player.frameX = 0;
    //if (player.frameY < 3 && player.moving) player.frameY++;

}
//animate();

function respawn() {
    if (keys[70]) //f
    {
        if (player.dead == true) {
            player.x = 0;
            player.y = 0;
            player.dead = false;
        }
    }

}