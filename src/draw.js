
    
    
// Render graphics
function draw(fps, t) {
    var ctx = global.ctx
    var g = ctx
    var canvas = global.canvas
    let n = global.elevationDetail
    
    // approx grass patch location
    let x0 = global.screenCorners[0].x
    let x1 = global.screenCorners[2].x
    let y0 = global.screenCorners[0].y
    let y1 = global.screenCorners[2].y
    let dy = y1-y0
    y0 += .5*dy
    y1 += .1*dy
            
    // draw background
    ctx.fillStyle = global.backgroundColor
    ctx.fillRect( global.screenCorners[0].x, global.screenCorners[0].y, 2, 2 )
    
    // draw ground
    let groundY = null
    if(!global.groundY){
        groundY = []
    } else {
        ctx.fillStyle = global.dirtColor
        let i=0, w = 1.2/n
        for( let x=x0 ; x<x1 ; x+=(1.0/n) ){
            ctx.fillRect( x, global.groundY[i++], w, 2 )
        }
    }

    // draw grass
    let d = .0005
    let specs = [
        [global.grassColor,v(d,d)],
        //['#3A3',v(0,0)],
        //['#6F6',v(-d,-d)],
    ]
    
    
    if( true ){
        specs.forEach(row => {
            resetRand()
            ctx.fillStyle = row[0]
            let maxOff = global.grassRadius
             
            for( let x=x0 ; x<x1 ; x+=(1.0/n) ){
                let ox = 0
                for( let y=y0 ; y<y1 ; y+=(1.0/n) ){
                    ox = (ox + phi/n) % (1.0/n)
                    let p = get2DCoords( x + ox, y )//.add( v(randRange(-maxOff,maxOff),0) )
                    
                    // prepare to draw ground extending below top row of grass
                    if( (global.groundY == null) && (y == y0) ){
                        groundY.push(p.y)
                    }
                    
                    
                    //
                    drawGrassBlade(ctx,p.add(row[1]))
                    
                    // rolling effect near horizon
                    let r = (y-y0)/(y1-y0)
                    y -= Math.max(0,1.7*(.5-r)/n)
                }
            }
        })
    }
    if(!global.groundY){
        global.groundY = groundY
    } 
    
    
    // draw pollen
    ctx.fillStyle = 'rgba(255,255,255,.1)'
    n = 10000
    let r = global.pollenRadius
    for( let i = 0 ; i < n ; i++ ){
        let dist = rand()
        let fallSpeed = 1e-6/(dist+.5)
        let maxy = .75-dist/2
        let x = x0 + (x1-x0)*nnmod(rand()+5e-5*global.pollenX,1)
        let y = nnmod((rand()+global.t*fallSpeed),maxy)
        ctx.fillRect( x-r,y-r,2*r,2*r )
    }
    
    
    // debug draw corners
    if( false ){
        global.screenCorners.forEach( c => {
            g.fillStyle = 'red'
            g.beginPath()
            g.moveTo(c.x,c.y)
            g.arc(c.x,c.y,.1,0,twopi)
            g.fill()
        })
    }

}

function drawGrassBlade(ctx,p){
    
    
    
    let r = global.grassRadius
    let n = 4
    let s = 0, ds = .001
    let ao = randRange(0,twopi)
    let period = randRange(30,30)
    let lo_mf = -global.windSpeed*.6
    let hi_mf = global.windSpeed*.6
    let wf = Math.sin(ao+global.pollenX/twopi/period)
    wf = lo_mf + (hi_mf-lo_mf)*((wf/2)+1)
    for( let i = 0 ; i<n ; i++ ){
        ctx.fillRect( p.x-r, p.y-r, 2*r, 2*r )
        s += randRange(0,ds)
        let dx = s*wf
        p = p.add(v(dx,-1.8*r + .5*Math.abs(dx) ))
    }
}