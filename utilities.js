height = 35;
//Unité qui garde les fonctions importantes, pour géométrie vectorielle et utilités mathématiques.
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function randPosition() {    
    return [getRandomArbitrary(height/2,800 -height/2), getRandomArbitrary(height / 2,600 - height / 2)];
}

//distance euclidienne entre la balle 1 et 2. 
function distance(ball1, ball2) {
    return Math.sqrt( Math.pow( (ball1.r)[0] - (ball2.r)[0], 2) + Math.pow((ball1.r)[1] - (ball2.r)[1], 2 ) )
}

function vecNorm(v) {
    return Math.sqrt( v[0]*v[0] + v[1]*v[1])
}

function vecMultiply(v, lambda) {
    return [v[0]*lambda, v[1]*lambda];
}

function dotProd(a, b) {
    return a[0]*b[0] + a[1]*b[1];
}

function vecSum(a, b) { //WTF js.
    return [a[0] - (-b[0]) , a[1] - (-b[1])  ];
}