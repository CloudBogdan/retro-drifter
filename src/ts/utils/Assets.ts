import { Font, Geometry, Image } from "p5";
import { game } from "../game"; // @ts-ignore
import tree_obj from "../../obj/tree.obj"; // @ts-ignore
import tree_png from "../../obj/tree.png"; // @ts-ignore
import car_obj from "../../obj/car.obj"; // @ts-ignore
import car_texture_png from "../../obj/car.png"; // @ts-ignore
import car_shadow_obj from "../../obj/car-shadow.obj"; // @ts-ignore
import car_shadow_texture_png from "../../obj/car-shadow.png"; // @ts-ignore
import welcome_png from "../../img/welcome.png" // @ts-ignore
import car_light_obj from "../../obj/car-light.obj" // @ts-ignore
import car_light_texture_png from "../../obj/car-light.png" // @ts-ignore

class Assets {
    carModel!: Geometry
    carTexture!: Image
    carShadowModel!: Geometry
    carShadowTexture!: Image
    carLightModel!: Geometry
    carLightTexture!: Image
    
    treeModel!: Geometry
    treeTexture!: Image
    
    welcomeTexture!: Image
    
    constructor() {
        
    }

    load() {
        // Car
        this.carModel = game.loadModel(car_obj);
        this.carTexture = game.loadImage(car_texture_png);
        this.carShadowModel = game.loadModel(car_shadow_obj);
        this.carShadowTexture = game.loadImage(car_shadow_texture_png);
        this.carLightModel = game.loadModel(car_light_obj);
        this.carLightTexture = game.loadImage(car_light_texture_png);
        
        // Tree
        this.treeModel = game.loadModel(tree_obj);
        this.treeTexture = game.loadImage(tree_png);

        // Images
        this.welcomeTexture = game.loadImage(welcome_png);
    }
}
export default new Assets();