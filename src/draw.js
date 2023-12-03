
    
    
// Render graphics
function draw(fps, t) {
    
    var ctx = global.ctx
    var canvas = global.canvas
    ctx.fillStyle = global.backgroundColor
    ctx.fillRect( 0, 0, canvas.width, canvas.height )

    // draw grass
    let d = .0005
    let specs = [
        ['#050',v(d,d)],
        //['#3A3',v(0,0)],
        ['#6F6',v(-d,-d)],
    ]
    if( true ){
        specs.forEach(row => {
            resetRand()
            ctx.fillStyle = row[0]
            let i = 0
            let n = global.elevationDetail
            let maxOff = .006
            for( let x=0 ; x<n ; x++ ){
                for( let y=0 ; y<n ; y++ ){
                    let p = get2DCoords( x, y ).add( v(randRange(-maxOff,maxOff),0) )
                    drawGrassBlade(ctx,p.add(row[1]))
                }
            }
        })
    }
    
    
    // draw pollen
    ctx.fillStyle = 'rgba(255,255,255,.3)'
    let n = 10000
    let r = .003
    for( let i = 0 ; i < n ; i++ ){
        let dist = rand()
        let fallSpeed = 1e-6/(dist+.5)
        let maxy = .75-dist/2
        let x = nnmod(rand()+5e-5*global.pollenX,1)
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
    
    
    
    let r = .002
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
        p = p.add(v(s*wf,-1.8*r))
    }
}