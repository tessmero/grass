


function update(dt) {    
    fitToContainer()
    global.t += dt
    
    // sometimes randomly adjust target wind speed
    if( global.autoWindCountdown <= 0 ){
        global.targetWindSpeed = -1+Math.random()*2
        if( Math.random() > .5 ){
            global.targetWindSpeed = Math.sign(global.targetWindSpeed)
        }
        global.autoWindCountdown = global.autoWindDelay[0] + Math.random()*( global.autoWindDelay[1]- global.autoWindDelay[0])
    } else {
        global.autoWindCountdown -= dt
    }
    
    // sometimes reset completely
    if( global.autoResetCountdown <= 0 ){
        
        global.groundY = null
        resetRand(true)
        perlin.seed()
        
        global.autoResetCountdown = global.autoResetDelay
    } else {
        global.autoResetCountdown -= dt
    }
    
    // adjust wind speed based on target wind speed position
    let minWindSpeed = .2
    if( Math.abs(global.targetWindSpeed) < minWindSpeed ){
        let sgn = Math.sign(global.targetWindSpeed)
        if(sgn == 0) sgn = 1
        global.targetWindSpeed = sgn*minWindSpeed
    }
    let d = 1e-3*dt
    if( Math.abs(global.windSpeed-global.targetWindSpeed) > 2*d ){
        global.windSpeed -= d*Math.sign(global.windSpeed-global.targetWindSpeed)
    }
        
    
    // advance wind animation
    global.pollenX += 4*global.windSpeed*dt
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