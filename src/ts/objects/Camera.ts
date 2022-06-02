import { Vector } from "p5";
import { game } from "../game";
import Mouse from "../utils/Mouse";

class Camera {
    pos: Vector = game.createVector()
    center: Vector = game.createVector()
    rotationY: number = 0;
    
    constructor() {
        
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
        game.camera(this.pos.x + Math.sin(this.rotationY)*20, this.pos.y, this.pos.z - Math.cos(this.rotationY)*20, this.center.x, this.center.y, this.center.z);
    }
}
export default new Camera();