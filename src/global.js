resetRand()

const global = {
    
    // total time elapsed in milliseconds
    t: 0,
    
    // graphics context
    canvas: null,
    ctx: null,

    // 
    backgroundColor: 'rgb(200,200,255)',
    
    // relate screen pixels to virtual 2D units
    canvasOffsetX: 0,
    canvasOffsetY: 0,
    canvasScale: 0,

    

    // relate 3D blocks to virtual 2D units
    // based on (0,0,0) 1x1x1 block edges 
    blockOrigin: v(.5,.75),
    blockUnits: {
        x: v(2,-0).mul( 3e-3),
        y: v(0,-2).mul(3e-3),
        z: v(0,-1.5).mul( 3e-3),
    },
    
    // array of height values for terrain shape
    elevationDetail: 40,
    elevations: null, // setup.js
    
    // animation position
    windSpeed: 0, 
    pollenX: 0,
    
    // mouse
    canvasMousePos: v(0,0),     //pixels
    mousePos: v(0,0),           //virtual units
    
    //debug
}