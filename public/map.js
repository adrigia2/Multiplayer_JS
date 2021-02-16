const canvasMap = document.getElementById("canvasMap");
const ctxMap = canvasMap.getContext('2d');

var map = [
    [false, false, false, false, false, false, false, false, false],
    [false, true, false, false, false, false, false, true, false],
    [false, true, false, false, false, false, false, true, false],
    [false, true, false, false, false, false, false, true, false],
    [false, true, true, true, false, false, true, true, false],
    [false, true, false, false, false, false, false, true, false],
    [false, true, false, false, false, false, false, true, false],
    [false, true, false, false, false, false, false, true, false],
    [false, false, false, false, false, false, false, false, false],
]

let bx = canvasMap.width / map[0].length;
let by = canvasMap.height / map.length;

function drawMap() {
    for (let i = 0; i < map[0].length; i++)
        for (let j = 0; j < map.length; j++) {
            if (map[i][j] == true) {
                ctxMap.rect(bx * j, by * i, bx, by);
                ctxMap.stroke();
            }
        }
        //drawMap();
}
drawMap();