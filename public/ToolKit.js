function getMousePos(canvas, e) {
    var element = canvas;
    var offsetX = 0,
        offsetY = 0

    if (element.offsetParent) {
        do {
            offsetX += element.offsetLeft;
            offsetY += element.offsetTop;
        } while ((element = element.offsetParent));
    }
    return {
        x: e.pageX - offsetX,
        y: e.pageY - offsetY
    }

}