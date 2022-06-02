import { Vector } from "p5"

class Mouse {
    pos: Vector = new Vector()
    movement: Vector = new Vector()
    
    isPressed: boolean = false
    
    constructor() {
        addEventListener("pointermove", e=> {
            this.pos.x = e.clientX;
            this.pos.y = e.clientY;
            this.movement.x = e.movementX;
            this.movement.y = e.movementY;
        })
        addEventListener("pointerdown", ()=> {
            this.isPressed = true;
        })
        addEventListener("pointerup", ()=> {
            this.isPressed = false;
        })
    }
}
export default new Mouse();