function randPosition() {
    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
      }
    return [getRandomArbitrary(0,800), getRandomArbitrary(0,600)];
}

//Setup est appelé qu'une seule fois. 
let balls = [];
function setup() {
    createCanvas(800,600)
    background(220)
    
    for (let i = 0; i < 10; i++) {
        balls.push(new TBall( (randPosition())[0], (randPosition())[1] ) )
    }
}


//added comment
//Draw est appelé non-stop.
function draw() {
    for (let i = 0; i <10; i++) {
        ellipse( (balls[i].r)[0], (balls[i].r)[1], 20, 20)
    }
}