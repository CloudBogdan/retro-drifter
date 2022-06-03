import { car, game, layer } from "./game";
import Camera from "./objects/Camera";
import { Particle } from "./objects/Particle";
import Controller from "./utils/Controller";
import Mouse from "./utils/Mouse";
import Assets from "./utils/Assets";
import Generator from "./utils/Generator";
import Emitter from "./utils/Emitter";
import Environment from "./utils/Environment";
import Sounds from "./utils/Sounds";

game.setup = setup;
game.draw = draw;
game.mousePressed = mousePressed;

const snowParticles: Particle[] = [];

function setup() {
    Assets.load();
    
    game.createCanvas(256, 256, game.WEBGL);
    game.perspective(Math.PI/4, game.width / game.height, 0.1, 500);    
}
function draw() {
    Environment.setupDraw();

    Environment.update();
    
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
    game.fill(180);
    game.plane(100, 100);
    game.pop();
    
    // Snowfall
    if (game.frameCount % 2 == 0) {
        const part = new Particle(0, game.random(.05, .1));
        part.maxLifeTime = 999;
        part.pos.set(game.random(0, game.width), -10);

        snowParticles.push(part);
    }

    // Update snowfall particles
    for (let i = 0; i < snowParticles.length; i ++) {
        const part = snowParticles[i];

        part.vel.y += part.speed + Math.abs(car.vel.z)/2;
        part.vel.x -= part.speed/2 + Math.abs(car.vel.z)/2;
        part.update(snowParticles, i);

        if (part.pos.y > game.height + 20)
            snowParticles.splice(i, 1);
    }
    // Draw snowfall particles
    for (let i = 0; i < snowParticles.length; i ++) {
        const part = snowParticles[i];
        
        layer.rectMode(game.CENTER);
        layer.fill(255);
        layer.rect(part.pos.x, part.pos.y, 1, 1);
    }

    layer.rectMode(game.CORNER);
    layer.fill("#0033ff");
    layer.rect(2, layer.height-3, (Math.floor(Math.abs(car.vel.z) * 100) / 37) * (layer.width-4), 1);

    //
    Mouse.movement.set(0, 0);
}

function mousePressed() {
    Sounds.startAll();
}

addEventListener("keydown", e=> Controller.keyDown(e));
addEventListener("keyup", e=> Controller.keyUp(e));