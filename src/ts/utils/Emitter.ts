import { game } from "../game";
import { Particle } from "../objects/Particle";

class Emitter {
    particles: Particle[] = []
    
    constructor() {
        
    }

    update() {
        for (let i = 0; i < this.particles.length; i ++) {
            const part = this.particles[i];

            part.update(this.particles, i);
        }
    }
    
    draw() {
        for (let i = 0; i < this.particles.length; i ++) {
            const part = this.particles[i];

            game.push();

            game.translate(part.pos.x, part.pos.y, part.pos.z);
            game.scale(part.scale.x, part.scale.y, part.scale.z);
            game.rotateX(part.rot.x);
            game.rotateY(part.rot.y);
            game.rotateZ(part.rot.z);
            
            switch (part.type) {
                // Leaves
                case 0:
                    game.fill(part.color);
                    game.box(.6);
                    break;
            }

            game.pop();
        }
    }
}
export default new Emitter();