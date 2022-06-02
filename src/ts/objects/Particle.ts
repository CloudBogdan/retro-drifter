import { Color, Vector } from "p5";
import config from "../config";
import { game } from "../game";

export class Particle {
    type: number = 0

    pos: Vector = game.createVector()
    rot: Vector = game.createVector()
    scale: Vector = game.createVector(1, 1, 1)
    
    vel: Vector = game.createVector()
    rotVel: Vector = game.createVector()
    acc: Vector = game.createVector()

    speed: number = 1
    color: Color = game.color(255)
    lifeTime: number = 0

    maxLifeTime: number = 60
    gravityFactor: number = 0
    scaleDownFactor: number = 0
    
    constructor(type: number=0, speed: number=1) {
        this.type = type;
        this.speed = speed;
    }

    update(particles: Particle[], index: number) {
        this.lifeTime ++;
        
        this.acc.y = config.PARTICLES_GRAVITY * this.gravityFactor;
        this.scale.sub(1 * this.scaleDownFactor, 1 * this.scaleDownFactor, 1 * this.scaleDownFactor);
        
        this.vel.x += this.acc.x;
        this.vel.y += this.acc.y;
        this.vel.x *= .96;
        this.vel.y *= .96;
        
        this.rotVel.x *= .96;
        this.rotVel.y *= .96;
        
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
        this.rot.x += this.rotVel.x;
        this.rot.y += this.rotVel.y;

        if (this.lifeTime > this.maxLifeTime || this.scale.x <= 0 || this.scale.y <= 0 || this.scale.z <= 0)
            particles.splice(index, 1);
    }
}