import { car, game, particlesLayer } from "./game";
import Camera from "./objects/Camera";
import { Particle } from "./objects/Particle";
import Controller from "./utils/Controller";
import Mouse from "./utils/Mouse";
import Assets from "./utils/Assets";
import Generator from "./utils/Generator";
import Emitter from "./utils/Emitter";

game.setup = setup;
game.draw = draw;

const snowParticles: Particle[] = [];

function setup() {
    Assets.load();
    
    game.createCanvas(256, 256, game.WEBGL);
    game.perspective(Math.PI/4, game.width / game.height, 0.1, 500);    
}
function draw() {
    game.background(200);
    game.noStroke();
    game.angleMode(game.DEGREES);
    game.noSmooth();

    particlesLayer.clear(0, 0, 0, 0);
    particlesLayer.noStroke();
    particlesLayer.angleMode(game.DEGREES);
    particlesLayer.noSmooth();

    game.ambientLight(160, 160, 160);
    game.directionalLight(255, 255, 255, 2, 10, 1);
    game.ambientMaterial(193, 247, 254);

    // Update & draw
    car.update();
    Camera.setPosOffset(car.pos.copy(), game.createVector(0, -20, 0));
    Camera.update();
    Camera.draw();
    car.draw();

    Emitter.update();
    Emitter.draw();
    
    Generator.update();
    Generator.draw();
    
    game.push();
    game.translate(car.pos.x, .1, car.pos.z);
    game.rotateX(90);
    game.emissiveMaterial(200);
    game.plane(100, 100);
    game.pop();

    game.push();
    game.translate(0, .05, 0);
    game.rotateX(-90);
    game.scale(-2, 2, -2)
    game.texture(Assets.welcomeTexture);
    // game.fill(255, 0, 0);
    game.plane(10, 10);
    game.pop();
    
    // Snowfall
    if (game.frameCount % 2 == 0) {
        const part = new Particle(0, game.random(.05, .1));
        part.maxLifeTime = 999;
        part.pos.set(game.random(0, game.width), -10);

        snowParticles.push(part);
    }

    // Update particles
    for (let i = 0; i < snowParticles.length; i ++) {
        const part = snowParticles[i];

        part.vel.y += part.speed + Math.abs(car.vel.z)/2;
        part.vel.x -= part.speed/2 + Math.abs(car.vel.z)/2;
        part.update(snowParticles, i);

        if (part.pos.y > game.height + 20)
            snowParticles.splice(i, 1);
    }
    // Draw particles
    for (let i = 0; i < snowParticles.length; i ++) {
        const part = snowParticles[i];
        
        particlesLayer.rectMode(game.CENTER);
        particlesLayer.fill(255);
        particlesLayer.rect(part.pos.x, part.pos.y, 1, 1);
    }

    //
    Mouse.movement.set(0, 0);
}

addEventListener("keydown", e=> Controller.keyDown(e));
addEventListener("keyup", e=> Controller.keyUp(e));