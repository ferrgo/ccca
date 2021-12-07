export default class Product {
    constructor(
        private readonly id: number,
        private readonly category: string,
        private readonly name: string,
        private readonly value: number
    ){ }

    public getPrice(): number {
        return this.value;
    }
    
    public getId(): number {
        return this.value;
    }
}