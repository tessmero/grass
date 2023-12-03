
    
    
// project world coords to isometric 2d view
// based on (0,0,0) 1x1x1 block edges 
// defined in global.js
function get2DCoords(x,y,z=null){
    
    if(z==null){
        let i = y*global.elevationDetail + x
        z = global.elevations[i]
    }
    
    return global.blockOrigin
        .add(global.blockUnits.x.mul(x))
        .add(global.blockUnits.y.mul(y))
        .add(global.blockUnits.z.mul(z))
}
    
    
// shorthands
var pi = Math.PI
var pio2 = Math.PI/2
var twopi = 2*Math.PI
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