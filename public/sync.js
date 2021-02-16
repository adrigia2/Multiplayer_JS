socket.on('player', function(data) {
    //ctx.clearRect(data.x-data.width, data.y-data.height, data.width*2, data.height*2);
    //ctx.drawImage(background, position, 0, canvas.width, canvas.height);

    //console.log(data);
    //var element=players.findIndex(x=>x.id==socket.id);
    //if(element.length>0)
    //    players[element]=data;
    //else
    players[data.id] = data;
    //drawPlayer(playerSprite, data.frameX * data.height, data.frameY * data.width, data.width, data.height, data.x, data.y, data.height, data.height);
});

function render() {
    //console.log("n giocatori: " + players.length);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    //ctx.drawImage(background, position, 0, canvas.width, canvas.height);
    //position++;
    players.forEach(player => {
        //ctx.clearRect(player.x-player.speed, player.y-player.speed, player.width+player.speed*2, player.height+player.speed*2);
        //console.log("nome: " + player.id);
        //console.log("n giocatori: " + players.length);
        //console.log(players);
        if (id != player.id)
            checkDead(player.bullets)

        drawPlayer(playerSprite, player.frameX * player.height, player.frameY * player.width, player.width, player.height, player.x, player.y, player.height, player.height);

        player.bullets.forEach(bullet => {
            drawBullet(bullet.x, bullet.y, bullet.r);
        });
    });





    //players=[];
    //drawPlayer(playerSprite, player.frameX * player.height, player.frameY * player.width, player.width, player.height, player.x, player.y, player.height, player.height);
}

function checkDead(bullets) {
    bullets.forEach(bullet => {
        if (bullet.x > player.x && bullet.x < player.x + player.width)
            if ((bullet.x > player.x && bullet.y < player.y + player.height)) {
                player.dead = true;
            }
    });
}

//drawMap();
//render();