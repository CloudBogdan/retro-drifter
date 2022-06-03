import { Vector } from "p5";
import { game } from "../game";
import Mouse from "../utils/Mouse";

class Camera {
    pos: Vector = new Vector()
    center: Vector = new Vector()
    rotationY: number = 0;

    isShaking: boolean = false
    shakeTime: number = 20
    shakeStartTime: number = 20
    shakeFrequency: number = 1
    
    constructor() {
        
    }

    shake(time: number=20, frequency: number=.1) {
        this.shakeStartTime = game.frameCount;
        this.shakeTime = time;
        this.shakeFrequency = frequency;
        this.isShaking = true;
    }
    setPosOffset(pos: Vector, offset: Vector) {
        this.pos.set(pos.x + offset.x, pos.y + offset.y, pos.z + offset.z);
        this.center.set(pos.x, pos.y, pos.z);
    }

    update() {
        if (Mouse.isPressed) {
            this.rotationY += Mouse.movement.x / 80;
            this.rotationY = this.rotationY % (Math.PI*2);
        }
    }
    
    draw() {
        const shakeOffset = new Vector();

        if (this.isShaking) {
            shakeOffset.x = game.random(-this.shakeFrequency, this.shakeFrequency);
            shakeOffset.y = game.random(-this.shakeFrequency, this.shakeFrequency);
            shakeOffset.z = game.random(-this.shakeFrequency, this.shakeFrequency);

            if (game.frameCount - this.shakeStartTime > this.shakeTime) {
                this.isShaking = false;
            }
        }
        
        game.camera(
            this.pos.x + Math.sin(this.rotationY)*20 + shakeOffset.x,
            this.pos.y + shakeOffset.y,
            this.pos.z - Math.cos(this.rotationY)*20 + shakeOffset.z,
            this.center.x + shakeOffset.x, this.center.y + shakeOffset.y, this.center.z + shakeOffset.z
        );
    }
}
export default new Camera();