export default class Coupon {
    id: number;
    code: string;
    discount: number;

    constructor(id: number, code: string, discount: number){
        this.id = id;
        this.code = code;
        this.discount = discount;
    }

    getDiscount(): number {
        return this.discount/100;
    }
}