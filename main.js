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

    (balls[0]).v = [4, 4];
    (balls[0]).r = [4, 4]
  
}

function collision(ball1, ball2) {
    eB = calcEB(ball1, ball2)
    eA = calcEA(ball1, ball2)
    console.log(eB, eA)
    ball2.v = eB
    ball1.v = eA
}

//Fonction chargée de gérer les collisions. 
//Détecte une même collisions plusieurs fois à chaque appel, pas le plus efficace.
function collide() {
    for (let i = 0; i < nbBalles; i++) {
        for (let k = i+1; k < nbBalles; k++) {
            if (distance(balls[i], balls[k]) < radius) {
                collision(balls[i], balls[k]) //To implement.
                console.log("Collision detected");
            }
        }
        //Rajouter collisions avec le bord.
        //if ((balls[i]).r)[1] > 600 ) or
    }
}

//added comment
//Draw est appelé non-stop.
function draw() {
    //Dessiner les ellipses pour chaque balle.
    background(0, 255, 0)
    
    collide();

    for (let i = 0; i < nbBalles; i++) {

        (balls[i].r)[0] = (balls[i].r)[0] + (balls[i].v)[0];
        (balls[i].r)[1] = (balls[i].r)[1] + (balls[i].v)[1];
        
        ellipse( (balls[i].r)[0], (balls[i].r)[1], radius, radius)
        
        text(i.toString(), (balls[i].r)[0], (balls[i].r)[1])
        
        
    }
}