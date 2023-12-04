
    
    
// project map coords to isometric view
function get2DCoords(x,y,z=null){
    
    if(z==null){
        let s = 2
        z = 10*perlin.get(x*s,y*s)
    }
    
    return v(x,y-z*global.perlinMagnitude)
}
    
    
// shorthands
var pi = Math.PI
var pio2 = Math.PI/2
var twopi = 2*Math.PI
let phi = 1.618033988749894
function v(){return new Vector(...arguments)}
function vp(){return Vector.polar(...arguments)}


function randRange(min,max){
    return min + rand()*(max-min)
}

//non-negative mod
function nnmod(a,b){
    var r = a%b
    return (r>=0) ? r : r+b
}

// weighted avg
function avg(a,b,r=.5){
    return (a*(1.0-r)) + (b*r)
}