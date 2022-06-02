import { Vector } from "p5";
import { car } from "../game";
import { Chunk } from "../objects/Chunk";

class Generator {
    chucks: Chunk[] = [
        new Chunk(0, 0),
        new Chunk(1, 0),
        new Chunk(-1, 0),
        new Chunk(0, 1),
        new Chunk(0, -1),
    ];
    
    constructor() {

    }

    update() {
        const chunksInArea = this.chucks.filter(chuck=> {
            const pos = new Vector(chuck.pos.x, 0, chuck.pos.z);

            return car.pos.dist(pos.copy().mult(10).add(5,0,5)) < 30;
        })
        // Generate chunks
        for (const c of chunksInArea) {
            this.generateChunkAt(c.pos.x, c.pos.z);
            this.generateChunkAt(c.pos.x+1, c.pos.z);
            this.generateChunkAt(c.pos.x-1, c.pos.z);
            this.generateChunkAt(c.pos.x, c.pos.z+1);
            this.generateChunkAt(c.pos.x, c.pos.z-1);
        }

        // Remove far chunks
        for (let i = 0; i < this.chucks.length; i ++) {
            const chuck = this.chucks[i];
            
            if (car.pos.dist(chuck.pos.copy().mult(10).add(5,0,5)) > 38) {
                this.chucks.splice(i, 1);
            }
        }
    }
    generateChunkAt(x: number, z: number) {
        const chunksInArea = this.chucks.filter(chuck=> {
            const pos = new Vector(chuck.pos.x, 0, chuck.pos.z);

            return pos.x == x && pos.z == z
        })
        if (chunksInArea.length == 0) {
            this.chucks.push(new Chunk(x, z));
        }
    }
    
    draw() {
        // Draw chunks
        for (let i = 0; i < this.chucks.length; i ++) {
            const chuck = this.chucks[i];

            chuck.draw();
        }
    }
}
export default new Generator();