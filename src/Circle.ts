export default class Circle {
    radius: number;

   constructor (radius: number) {
       this.radius = radius;
   }

    getArea() : number {
        return 2 * Math.PI * this.radius;
    }
}