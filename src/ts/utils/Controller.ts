import Environment from "./Environment"
import Sounds from "./Sounds"

class Controller {
    right: boolean = false
    left: boolean = false
    up: boolean = false
    down: boolean = false
    space: boolean = false
    shift: boolean = false
    
    constructor() {
        
    }

    keyDown(e: KeyboardEvent) {
        if (e.code == "KeyD" || e.code == "ArrowRight")
            this.right = true;
        if (e.code == "KeyA" || e.code == "ArrowLeft") 
            this.left = true;
        if (e.code == "KeyW" || e.code == "ArrowUp") 
            this.up = true;
        if (e.code == "KeyS" || e.code == "ArrowDown") 
            this.down = true;
        if (e.code == "Space") 
            this.space = true;
        if (e.code == "ShiftLeft") 
            this.shift = true;
    }
    keyUp(e: KeyboardEvent) {
        if (e.code == "KeyD" || e.code == "ArrowRight") 
            this.right = false;
        if (e.code == "KeyA" || e.code == "ArrowLeft") 
            this.left = false;
        if (e.code == "KeyW" || e.code == "ArrowUp") 
            this.up = false;
        if (e.code == "KeyS" || e.code == "ArrowDown") 
            this.down = false;
        if (e.code == "Space") 
            this.space = false;
        if (e.code == "ShiftLeft") 
            this.shift = false;

        if (e.code == "KeyM") {
            Sounds.allowSounds = !Sounds.allowSounds;
        }
    }
}
export default new Controller()