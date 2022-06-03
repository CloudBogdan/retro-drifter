import { Vector } from "p5"
import { game } from "../game"
import Assets from "../utils/Assets";
import Controller from "../utils/Controller"
import Environment from "../utils/Environment";
import Sounds from "../utils/Sounds";
import Camera from "./Camera";
import { Particle } from "./Particle";

export class Car {
    size: Vector = new Vector(1, .5, 2)
    rot: Vector = new Vector(0, 0, 0)
    pos: Vector = new Vector(0, 0, 0)

    rightWheelPos: Vector = new Vector();
    leftWheelPos: Vector = new Vector();

    speed: number = .02;
    rotSpeed: number = 2;

    acc: Vector = new Vector();
    rotAcc: Vector = new Vector();
    rotVel: Vector = new Vector();
    vel: Vector = new Vector();
    driftVel: Vector = new Vector();
    dir: Vector = new Vector();
    dirVel: Vector = new Vector();

    isDrifting: boolean = false
    isMaxSpeed: boolean = false
    isBraking: boolean = false
    isSlowDown: boolean = false
    lightsEnabled: boolean = false
    motorSoundIsPlaying: boolean = false

    particles: Particle[] = []
    
    constructor() {
        
    }

    update() {
        this.isBraking = Controller.space;
        this.isSlowDown = Controller.shift || this.acc.z < 0;

        // Acceleration of movement and front wheels rotation
        this.acc.z = (+Controller.up - +Controller.down);
        this.rotAcc.y = (+Controller.left - +Controller.right);

        // Braking
        if (this.isBraking) {
            this.acc.z = 0;
            this.rotVel.y *= 1.15;
            this.driftVel.x += this.rotAcc.y * this.vel.z * .5;
            this.driftVel.z += this.rotAcc.y * this.vel.z * .5;
        }
        
        // Velocity of movement and front wheel rotation
        this.rotVel.y += this.rotAcc.y * this.rotSpeed * this.vel.z * (this.isSlowDown ? 1.4 : 1);
        this.rotVel.mult(.8);
        
        this.vel.z += this.acc.z * (this.isSlowDown ? this.speed*.5 : this.speed);
        this.vel.mult(.95);

        // Some booleans...
        this.isMaxSpeed = this.vel.z > .3;
        this.isDrifting = this.isMaxSpeed && Math.abs(this.rotVel.y) > 2.5;

        // Simple drift physics
        this.driftVel.z += this.isDrifting ? .1 * this.rotAcc.y : 0;
        this.driftVel.x += this.isDrifting ? .1 * this.rotAcc.y : 0;
        this.driftVel.mult(.95);

        // Direction of movement
        this.dir.x = Math.sin(this.rot.y * (Math.PI/180));
        this.dir.z = Math.cos(this.rot.y * (Math.PI/180));
        this.dirVel.x = this.vel.z * Math.sin(this.rot.y * (Math.PI/180) - this.driftVel.x/2);
        this.dirVel.z = this.vel.z * Math.cos(this.rot.y * (Math.PI/180) - this.driftVel.z/2);
        
        // Update pos. and rot.
        this.rot.y += this.rotVel.y;
        this.rot.x += this.rotVel.x;
        this.pos.x += this.dirVel.x;
        this.pos.z += this.dirVel.z;

        // Back wheels pos
        this.rightWheelPos.x = this.pos.x - this.dir.x*.8 + Math.sin((this.rot.y+90) * (Math.PI/180)) * .4;
        this.rightWheelPos.z = this.pos.z - this.dir.z*.8 + Math.cos((this.rot.y+90) * (Math.PI/180)) * .4;
        //
        this.leftWheelPos.x = this.pos.x - this.dir.x*.8 - Math.sin((this.rot.y+90) * (Math.PI/180)) * .4;
        this.leftWheelPos.z = this.pos.z - this.dir.z*.8 - Math.cos((this.rot.y+90) * (Math.PI/180)) * .4;

        // Sounds
        Sounds.setOscFrequency("motor", (this.vel.z * 10) / 4 * 50);

        // Effects
        if (this.isBraking && this.vel.z > .05) {
            Camera.shake(5, .02);
        }
        this.lightsEnabled = Environment.daylight < .4;

        this.particlesUpdate();
    }

    particlesUpdate() {
        // Drifting particles
        if ((this.isMaxSpeed || (this.isBraking && this.vel.z > .06)) && (this.isDrifting ? true : game.frameCount % 2 == 0)) {
            const part = new Particle(0);

            part.gravityFactor = .4;
            part.scaleDownFactor = .02;
            part.maxLifeTime = 999;
            part.pos.set(
                this.pos.x - this.dir.x + game.random(-.5, .5),
                this.pos.y,
                this.pos.z - this.dir.z + game.random(-.5, .5)
            );
            
            part.rotVel.x += game.random(10, 15);
            part.rotVel.y += game.random(10, 15);
            part.rotVel.z += game.random(10, 15);

            part.vel.y += game.random(-.2, -.1);
            part.vel.x -= game.random(-.1, .1);
            part.vel.z -= game.random(-.1, .1);
            
            this.particles.push(part);
        }
        // Wheel steps
        if (this.isDrifting || this.isBraking) {
            const part1 = new Particle(1);
            const part2 = new Particle(1);

            part1.maxLifeTime = 180;
            part2.maxLifeTime = 180;

            part1.pos.set(
                Math.floor(this.rightWheelPos.x / .4) * .4,
                .2,
                Math.floor(this.rightWheelPos.z / .4) * .4,
            );
            part2.pos.set(
                Math.floor(this.leftWheelPos.x / .4) * .4,
                .2,
                Math.floor(this.leftWheelPos.z / .4) * .4,
            );
            
            this.particles.push(part1);
            this.particles.push(part2);
        }

        // Update particles
        for (let i = 0; i < this.particles.length; i ++) {
            const part = this.particles[i];

            part.update(this.particles, i);
            
        }
    }
    
    draw() {
        if (this.lightsEnabled)
            game.spotLight(228, 234, 255, this.pos.x, -4, this.pos.z, new Vector(this.dir.x, .7, this.dir.z), 50, 28);
        
        game.push();

        game.translate(this.pos.x, this.pos.y, this.pos.z);
        game.rotateX(this.rot.x);
        game.rotateY(this.rot.y);
        game.scale(-1.5, -1.5, -1.5);

        game.push();
        game.rotateZ(this.rot.z - this.rotVel.y*2);
        
        // Draw car
        game.texture(Assets.carTexture);
        game.model(Assets.carModel);
        game.pop();

        // Draw car shadow
        game.texture(Assets.carShadowTexture);
        game.model(Assets.carShadowModel);

        game.pop();

        // Draw particles
        for (const part of this.particles) {
            game.push();

            game.translate(part.pos.x, part.pos.y, part.pos.z);
            game.rotateX(part.rot.x);
            game.rotateY(part.rot.y);
            game.rotateZ(part.rot.z);
            game.scale(part.scale.x, part.scale.y, part.scale.z);
            
            if (part.type == 0) { // Snow
                game.fill(200);
                game.ambientMaterial(240)
                game.box(.5);
            } else if (part.type == 1) { // Wheels steps
                game.emissiveMaterial(Environment.background.red*.85, Environment.background.green*.85, Environment.background.blue*.85);
                game.box(.4);
            }

            game.pop();
        }
    }
}