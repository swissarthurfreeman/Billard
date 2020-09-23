//Jeu de Billard développé par Arthur Freeman, Université de Genève
//Projet personnel afin d'apprendre à manier git et JavaScript.

//Variables Globales (à encapsuler)
let balls = [];
let height = 40; //height est le double du rayon.
let nbBalles = 16; //Donc 15 balles, car i < nbBalles
let coeff = 0.017;

//Setup est appelé qu'une seule fois. 
function setup() {
    createCanvas(800,600);
    background(0, 255, 0);

    let r_ini = [400, 300];
    let c = 1 / 1.3;
    let eps = [height*c, height*c];
    let e = [height*c, -height*c];

    //La balle 0 est la balle blance.
    balls[0] = new TBall(50, 275, 10, 0);

    //Ce code permet de créer le triangle de balles.
    let p = 0; let v;
    for (let i = 5; i >= 1; i--) {
        v = vecSum(r_ini, [p*eps[0], p*eps[1]]); 
        p++;
        for (let k = 1; k <= i; k++) {
            let r_f = vecSum(v, [k*e[0], k*e[1]] )
            balls.push(new TBall( r_f[0], r_f[1], 0, 0 ) );
        }
        
    }
}

//Ceci est entièrement basé sur les équations tirées d'ici : 
//https://www.vobarian.com/collisions/2dcollisions2.pdf
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

//Fonction gérant les collisions des balles avec le bord.
function collideBorder(ball) {
    //height / 2 est le rayon des balles. On traite cas par cas en fonction de
    //collisions entre haut et bas et collision droite et gauche.
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
        
        //Collide doit être appelé dans draw et dans ce for pour que ça détecte tout.
        collide(); 

        collideBorder(balls[i]);

        //Mise à jour des positions avec vitesse.
        (balls[i].r)[0] = (balls[i].r)[0] + (balls[i].v)[0];
        (balls[i].r)[1] = (balls[i].r)[1] + (balls[i].v)[1];
        
        //Ellipse est natif à p5js, ellipse(x, y, width, height).
        ellipse( (balls[i].r)[0], (balls[i].r)[1], height)
        
        text(i.toString(), (balls[i].r)[0], (balls[i].r)[1])
        
        //Mise à jour des vitesses avec frottement. 
        for (let p = 0; p < 2; p++) {
            if (  (balls[i].v)[p] > 0) { //On soustrait coeff au deux composantes de la vitesse.
                (balls[i].v)[p] = (balls[i].v)[p] - coeff;
            } else if ( (balls[i].v)[p] < 0 ) {
                (balls[i].v)[p] = (balls[i].v)[p] + coeff;
            }
            //Si la vitesse est négligeable, elle devient nulle.
            if (Math.abs( (balls[p].v)[p] ) <= coeff) {
                (balls[p].v)[p] = 0;
            }
        }  
    }
}