import anime from "animejs";
import { Color } from "p5";
import { game, layer } from "../game";
import { RGB } from "./types";

class Environment {
    daylight: number = 1
    background: RGB = { red: 200, green: 200, blue: 200 }

    dayColor: RGB = { red: 200, green: 200, blue: 200 }
    eveningColor: RGB = { red: 158, green: 128, blue: 139 }
    nightColor: RGB = { red: 45, green: 52, blue: 72 }

    animation: anime.AnimeInstance
    
    constructor() {
        this.animation = anime({
            targets: this.background,
            keyframes: [
                { ...this.dayColor, easing: "linear" },
                { ...this.dayColor, easing: "linear" },
                { ...this.eveningColor, easing: "linear" },
                { ...this.nightColor, easing: "linear" },
                { ...this.nightColor, easing: "linear" },
            ],
            duration: 1000,
            autoplay: false,
            loop: true,
        })
    }

    update() {
        this.daylight = (Math.sin(game.frameCount/1000 + Math.PI/2) + 1)/2;
        this.animation.seek(this.animation.duration - this.animation.duration * this.daylight);
    }
    
    setupDraw() {
        game.background(Math.floor(this.background.red), Math.floor(this.background.green), Math.floor(this.background.blue));
        game.noStroke();
        game.angleMode(game.DEGREES);
        game.noSmooth();

        layer.clear(0, 0, 0, 0);
        layer.noStroke();
        layer.angleMode(game.DEGREES);
        layer.noSmooth();

        game.ambientLight(Math.floor(this.background.red*.7), Math.floor(this.background.green*.7), Math.floor(this.background.blue*.7));
        game.directionalLight(Math.floor(this.background.red), Math.floor(this.background.green), Math.floor(this.background.blue), 2, 10, 1);
        // game.ambientLight(30 + this.daylight*130);
        // game.directionalLight(55+this.daylight*200, 55+this.daylight*200, 55+this.daylight*200, 2, 10, 1);
        // game.ambientMaterial(23+this.daylight*170, 27+this.daylight*220, 34+this.daylight*220);
    }
}
export default new Environment();