import p5, { Vector } from "p5";
import { Car } from "./objects/Car";

export const game = new p5(()=>{}, document.querySelector(".canvases") as HTMLDivElement || document.body);
export const layer = new p5(()=>{}, document.querySelector(".canvases") as HTMLDivElement || document.body);
export const car = new Car();