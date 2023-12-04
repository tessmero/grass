


function update(dt) {    
    fitToContainer()
    global.t += dt
    
    // adjust wind speed based on mouse position
    let targetWindSpeed = (global.mousePos.x - .5)*2
    let minWindSpeed = .2
    if( Math.abs(targetWindSpeed) < minWindSpeed ){
        targetWindSpeed = Math.sign(targetWindSpeed)*minWindSpeed
    }
    let d = 1e-3*dt
    if( Math.abs(global.windSpeed-targetWindSpeed) > 2*d ){
        global.windSpeed -= d*Math.sign(global.windSpeed-targetWindSpeed)
    }
    
    // advance pollen x-axis animation
    global.pollenX += global.windSpeed*dt
}




var lastCanvasOffsetWidth = -1;
var lastCanvasOffsetHeight = -1;
function fitToContainer(){
    
    var cvs = global.canvas
    if( (cvs.offsetWidth!=lastCanvasOffsetWidth) || (cvs.offsetHeight!=lastCanvasOffsetHeight) ){
        
      cvs.width  = cvs.offsetWidth;
      cvs.height = cvs.offsetHeight;
      lastCanvasOffsetWidth = cvs.offsetWidth
      lastCanvasOffsetHeight = cvs.offsetHeight
      
        var dimension = avg(cvs.width, cvs.height)
        global.canvasScale = dimension;
        global.canvasOffsetX = (cvs.width - dimension) / 2;
        global.canvasOffsetY = (cvs.height - dimension) / 2;
    global.ctx.setTransform(global.canvasScale, 0, 0, 
        global.canvasScale, global.canvasOffsetX, global.canvasOffsetY);
        
        var xr = -global.canvasOffsetX / dimension
        var yr = -global.canvasOffsetY / dimension
        global.screenCorners = [v(xr,yr),v(1-xr,yr),v(1-xr,1-yr),v(xr,1-yr)]
        
        global.groundY = null
    }
}