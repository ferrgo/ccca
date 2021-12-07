export default class Item {
    constructor(
        private readonly productId: number,
        private readonly productPrice: number,
        private readonly quantity: number,
    ){}

    public getPrice() {
        return this.productPrice*this.quantity;
    }
}