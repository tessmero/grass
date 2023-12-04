resetRand()

const global = {
    
    // total time elapsed in milliseconds
    t: 0,
    
    // graphics context
    canvas: null,
    ctx: null,

    // 
    backgroundColor: 'rgb(200,200,255)',
    grassColor: '#3A3',
    dirtColor: '#973',
    
    // relate screen pixels to virtual 2D units
    canvasOffsetX: 0,
    canvasOffsetY: 0,
    canvasScale: 0,

    

    // 
    perlinMagnitude: 3e-2,
    perlinScale: 2,
    
    // array of height values for terrain shape
    elevationDetail: 40, // blades per screen length
    groundY: null,
    grassRadius: .003,
    pollenRadius: .005,
    
    // animation position
    targetWindSpeed: 0,
    windSpeed: 0, 
    pollenX: 0,
    
    // mouse
    canvasMousePos: v(0,0),     //pixels
    mousePos: v(0,0),           //virtual units
    
    //
    autoWindCountdown: 0, //ms
    autoWindDelay: [3000,7000], //ms
    autoResetCountdown: 30000, //ms
    autoResetDelay: 30000, //ms
}