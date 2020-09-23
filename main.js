//Variables Globales (à encapsuler)
let balls = [];
let height = 40; //height est le double du rayon.
let nbBalles = 16; //Donc 15 balles, car i < nbBalles
let coeff = 0.03;

//Setup est appelé qu'une seule fois. 
function setup() {
    createCanvas(800,600)
    background(0, 255, 0)
    
    for (let i = 0; i < nbBalles; i++) {
        balls.push(new TBall( (randPosition())[0], (randPosition())[1], getRandomArbitrary(-1,1), getRandomArbitrary(-1,1) ) )
    } 

    (balls[0]).v = [8, 8];
    (balls[0]).r = [50, 50]
  
}

//Ceci est entièrement basé sur les équations tirées d'ici : https://www.vobarian.com/collisions/2dcollisions2.pdf
function collision(ball1, ball2) {
    n = [ (ball1.r)[0] - (ball2.r)[0], (ball1.r)[1] - (ball2.r)[1] ];
    un = [n[0] /  vecNorm(n), n[1] / vecNorm(n) ] ;
    ut = [ -un[1], un[0] ];   
    v1n = dotProd(un, (ball1.v));
    v1t = dotProd(ut, (ball1.v) );
    v2n = dotProd(un, (ball2.v) );
    v2t = dotProd(ut, (ball2.v) );
    v1t_p = v1t; v2t_p = v2t;
    v1n_p = v2n; v2n_p = v1n;
    v1n_pvec = [v1n_p * un[0], v1n_p * un[1] ]; 
    v1t_pvec = [v1t_p * ut[0], v1t_p * ut[1] ]; 
    v2n_pvec = [v2n_p * un[0], v2n_p * un[1] ]; 
    v2t_pvec = [v2t_p * ut[0], v2t_p * ut[1] ];
    ball1.v = vecSum(v1n_pvec, v1t_pvec); ball2.v = vecSum(v2n_pvec, v2t_pvec);
}

function collideBorder(ball) {
    
    if ( (ball.r)[1] - height/2 <= 0 || (ball.r)[1] + height/2 >= 600) {
        console.log("detected");
        ball.v = [(ball.v)[0], -(ball.v)[1]]; 
    } else if ((ball.r)[0] - height/2 <= 0 || (ball.r)[0] + height/2 >= 800) {
        ball.v = [-(ball.v)[0], (ball.v)[1] ];
    }
}
//Fonction chargée de gérer les collisions. 
//Détecte une même collisions plusieurs fois à chaque appel, pas le plus efficace.
function collide() {
    for (let i = 0; i < nbBalles; i++) {
        for (let k = i+1; k < nbBalles; k++) {
            if (distance(balls[i], balls[k]) < height) {
                collision(balls[i], balls[k]) //To implement.
                //console.log("Collision detected");
            }
        }
        
    }  
}

//added comment
//Draw est appelé non-stop.
function draw() {
    //Dessiner les ellipses pour chaque balle.
    background(0, 255, 0)
    
    collide();

    for (let i = 0; i < nbBalles; i++) {

        collide();
        collideBorder(balls[i]);

        //Mise à jour des positions avec vitesse.
        (balls[i].r)[0] = (balls[i].r)[0] + (balls[i].v)[0];
        (balls[i].r)[1] = (balls[i].r)[1] + (balls[i].v)[1];
        
        ellipse( (balls[i].r)[0], (balls[i].r)[1], height)
        
        text(i.toString(), (balls[i].r)[0], (balls[i].r)[1])
        
        for (let p = 0; p < 2; p++) {
            if ( (balls[i].v)[p] >= coeff) {
                (balls[i].v)[p] = (balls[i].v)[p] - coeff;
            }
            if ((balls[p].v)[p] <= coeff) {
                (balls[p].v)[p] = 0;
            }
        }
        

                
    }
}