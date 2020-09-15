function randPosition() {
    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
      }
    return [getRandomArbitrary(0,800), getRandomArbitrary(0,600)];
}


//Variables Globales (à encapsuler)
let balls = [];
let radius = 40;
let nbBalles = 16; //Donc 15 balles, car i < nbBalles

//Setup est appelé qu'une seule fois. 
function setup() {
    createCanvas(800,600)
    background(0, 255, 0)
    
    for (let i = 0; i < nbBalles; i++) {
        balls.push(new TBall( (randPosition())[0], (randPosition())[1] ) )
    }
    
    collide();
}

//distance euclidienne entre la balle 1 et 2. 
function distance(ball1, ball2) {
    return Math.sqrt( Math.pow( (ball1.r)[0] - (ball2.r)[0], 2) + Math.pow((ball1.r)[1] - (ball2.r)[1], 2 ) )
}

//Fonction chargée de gérer les collisions. 
//Détecte une même collisions plusieurs fois à chaque appel, pas le plus efficace.
function collide() {
    for (let i = 0; i < nbBalles; i++) {
        for (let k = i+1; k < nbBalles; k++) {
            if (distance(balls[i], balls[k]) < radius) {
                //collision(balles[i], balles[k]) //To implement.
                console.log("Collision detected");
            }
        }
    }
}


//added comment
//Draw est appelé non-stop.
function draw() {

    //Dessiner les ellipses pour chaque balle.
    for (let i = 0; i < nbBalles; i++) {
        ellipse( (balls[i].r)[0], (balls[i].r)[1], radius, radius)
        text(i.toString(), (balls[i].r)[0], (balls[i].r)[1])
        
    }

}