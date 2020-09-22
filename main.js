//Variables Globales (à encapsuler)
let balls = [];
let radius = 40;
let nbBalles = 16; //Donc 15 balles, car i < nbBalles

//Setup est appelé qu'une seule fois. 
function setup() {
    createCanvas(800,600)
    background(0, 255, 0)
    
    for (let i = 0; i < nbBalles; i++) {

        console.log(getRandomArbitrary(1,4), getRandomArbitrary(1,4));
        balls.push(new TBall( (randPosition())[0], (randPosition())[1], getRandomArbitrary(-1,1), getRandomArbitrary(-1,1) ) )
    } 

    (balls[0]).v = [4, 4];
    (balls[0]).r = [4, 4]
  
}

function collision(ball1, ball2) {
    /*eB = calcEB(ball1, ball2);
    eA = calcEA(ball1, ball2);
    console.log(eB, eA);
    ball2.v = eB;
    ball1.v = eA;*/
    n = [ (ball1.r)[0] - (ball2.r)[0], (ball1.r)[1] - (ball2.r)[1] ];
    un = [n[0] /  vecNorm(n), n[1] / vecNorm(n) ] ;
    //console.log(un)
    ut = [ -un[1], un[0] ];
    
    v1n = dotProd(un, (ball1.v));
    //console.log("Here");
    //console.log(un, ball1.v, v1n)
    v1t = dotProd(ut, (ball1.v) );

    v2n = dotProd(un, (ball2.v) );
    v2t = dotProd(ut, (ball2.v) );

    v1t_p = v1t; v2t_p = v2t;
    v1n_p = v2n; v2n_p = v1n;

    v1n_pvec = [v1n_p * un[0], v1n_p * un[1] ]; 
    
    v1t_pvec = [v1t_p * ut[0], v1t_p * ut[1] ]; 
    
    v2n_pvec = [v2n_p * un[0], v2n_p * un[1] ]; 
    
    v2t_pvec = [v2t_p * ut[0], v2t_p * ut[1] ];
    //console.log(ball1.v, ball2.v)
    ball1.v = vecSum(v1n_pvec, v1t_pvec); ball2.v = vecSum(v2n_pvec, v2t_pvec);
    console.log(ball2.v)
    //console.log(ball1.v, ball2.v)
}

//Fonction chargée de gérer les collisions. 
//Détecte une même collisions plusieurs fois à chaque appel, pas le plus efficace.
function collide() {
    for (let i = 0; i < nbBalles; i++) {
        for (let k = i+1; k < nbBalles; k++) {
            if (distance(balls[i], balls[k]) < radius) {
                collision(balls[i], balls[k]) //To implement.
                //console.log("Collision detected");
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