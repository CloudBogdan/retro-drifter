import { Vector } from "p5";
import { game } from "../game";
import { simplex2 } from "../lib/noise";
import { Tree } from "./decors/Tree";

export class Chunk {
    pos: Vector = new Vector()

    trees: Tree[] = []
    treesCount: number = 0
    
    constructor(x: number, z: number) {
        this.pos.set(x, 0, z);

        for (var cx = 0; cx < 10; cx++) {
            for (var cz = 0; cz < 10; cz++) {
              var value = simplex2((cx + this.pos.x*10)/5, (cz + this.pos.z*10)/5);
              var maskValue = simplex2((cx + this.pos.x*10)/40, (cz + this.pos.z*10)/40)*1.1;
              var value2 = simplex2((cx + this.pos.x*10)/2, (cz + this.pos.z*10)/2);
           
                if (value > .6 && maskValue > .6 || value2 > .9) {
                    this.trees.push(new Tree(
                        this.pos.x*10 + cx + game.random(-.1, .1),
                        this.pos.z*10 + cz + game.random(-.1, .1)
                    ));
                }
            }
        }
    }

    draw() {
        // game.push();

        // game.translate(this.pos.x*10, 1, this.pos.z*10)
        
        // game.noFill();
        // game.stroke(255, 0, 0);
        // game.box(10, 2, 10);
        
        // game.pop();
        for (let i = 0; i < this.trees.length; i ++) {
            const tree = this.trees[i];

            tree.update();
            tree.draw(i)
        }
    }
}