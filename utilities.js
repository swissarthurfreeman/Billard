//Unité qui garde les fonctions importantes, pour géométrie vectorielle et utilités mathématiques.
function randPosition() {
    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
      }
    return [getRandomArbitrary(0,800), getRandomArbitrary(0,600)];
}

//distance euclidienne entre la balle 1 et 2. 
function distance(ball1, ball2) {
    return Math.sqrt( Math.pow( (ball1.r)[0] - (ball2.r)[0], 2) + Math.pow((ball1.r)[1] - (ball2.r)[1], 2 ) )
}

function calcEB(ball1, ball2) {
    let norm = distance(ball1, ball2)
    console.log(norm)
    return [ ((ball2.r)[0] - (ball1.r)[0]) / norm, ((ball2.r)[1] - (ball1.r[1])) / norm ]
}

function phi(ball1, ball2) {
    return Math.asin(( (ball1.r)[0] - (ball2.r)[0] ) / distance(ball1, ball2) )
}

function calcEA(ball1, ball2) {
    let angle = phi(ball1, ball2)
    //return [e1[1], -e1[0]]
    return [(5/7)*Math.sin(angle)*Math.cos(angle), (5/7)*Math.sin(angle) ]
}