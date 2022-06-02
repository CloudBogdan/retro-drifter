import { Vector } from "p5";
import { car, game } from "../../game";
import Assets from "../../utils/Assets";
import Emitter from "../../utils/Emitter";
import { Particle } from "../Particle";

export class Tree {
    pos: Vector = new Vector()
    scale: number = 1

    isCarCollision: boolean = false;
    
    constructor(x: number, z: number) {
        this.pos.set(x, 0, z);
    }

    update() {
        this.scale = game.lerp(this.scale, 1, .1);
        
        if (car.pos.dist(this.pos) < 1) {
            if (!this.isCarCollision) {
                this.onCarCollision();
                this.isCarCollision = true;
            }
            
            // Slowing down car
            if (car.isDrifting)
                car.vel.z *= .9;
            else
                car.vel.z *= .8;
        } else {
            this.isCarCollision = false;
        }
    }
    
    draw(index: number) {
        game.push();
        
        game.translate(this.pos.x, this.pos.y, this.pos.z);
        game.scale(1 - (this.scale*1.5 - 1.5), this.scale, 1 - (this.scale*1.5 - 1.5));
        game.rotateX(Math.sin(game.frameCount/100 + index)*5);
        game.rotateZ(Math.cos(game.frameCount/100 + index + 1)*5);

        game.scale(-1.5, -1.5, -1.5);
        game.texture(Assets.treeTexture);
        game.model(Assets.treeModel);
        
        game.pop();
    }

    onCarCollision() {
        this.scale = .8;
        
        for (let i = Math.floor(game.random(2, 6)); i -- > 0;) {
            const part = new Particle(0);

            part.gravityFactor = .4;
            part.scaleDownFactor = .02;
            part.color = game.color(["#50e112", "#3fa66f"][Math.floor(game.random(0, 2))]);
            
            part.pos.set(this.pos.copy().add(game.random(-.5, .5), game.random(-1, -2), game.random(-.5, .5)));
            part.vel.x += game.random(-.2, .2)
            part.vel.y += game.random(-.4, 0);
            part.vel.z += game.random(-.2, .2);
            part.rotVel.x += game.random(-10, 10);
            part.rotVel.z += game.random(-10, 10);
            
            Emitter.particles.push(part);
        }
    }
} 