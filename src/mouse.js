function updateMousePos(event){
    var rect = global.canvas.getBoundingClientRect();
    var scaleX = global.canvas.width / rect.width;
    var scaleY = global.canvas.height / rect.height;
    
    global.canvasMousePos = new Vector( 
        (event.clientX - rect.left) * scaleX, 
        (event.clientY - rect.top) * scaleY 
    
    )
    global.mousePos = new Vector( 
        (global.canvasMousePos.x-global.canvasOffsetX)/global.canvasScale, 
        (global.canvasMousePos.y-global.canvasOffsetY)/global.canvasScale
    )
    
    // adjust target wind speed based on mouse X
    global.targetWindSpeed = (global.mousePos.x - .5)*4
    if(Math.abs(global.targetWindSpeed) > 1){
        global.targetWindSpeed = Math.sign(global.targetWindSpeed)
    }        
    global.autoWindCountdown = global.autoWindDelay
}

function mouseMove(e){
    updateMousePos(e)
}

function mouseClick(e){
    updateMousePos(e)
}