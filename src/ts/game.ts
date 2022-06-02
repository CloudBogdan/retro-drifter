import p5, { Vector } from "p5";
import { Car } from "./objects/Car";

export const game = new p5(()=>{}, document.body);
export const particlesLayer = new p5(()=>{}, document.body);
export const car = new Car();