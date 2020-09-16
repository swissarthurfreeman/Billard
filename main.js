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

function collision(ball1, ball2) {
    angle = theta(ball1, ball2)
    e1 = calcE1(ball1, ball2)
    e2 = rotateAndInverse(e1)

}

//Fonction chargée de gérer les collisions. 
//Détecte une même collisions plusieurs fois à chaque appel, pas le plus efficace.
function collide() {
    for (let i = 0; i < nbBalles; i++) {
        for (let k = i+1; k < nbBalles; k++) {
            if (distance(balls[i], balls[k]) < radius) {
                collision(balles[i], balles[k]) //To implement.
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