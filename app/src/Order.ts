import CPF from '../src/CPF';
import Coupon from './Coupon';
import Item from './Item';

export default class Order {
    CPF: CPF;
    items: Array<{
        item: Item,
        quantity: number
    }>;
    coupon?: Coupon;
    
    constructor(cpf: string){
        this.CPF = new CPF(cpf);
        this.items = new Array;
    }

    addItem(item: any, quantity: number): void {
        this.items.push({item, quantity});
    }

    getItemCount(): number {
        return this.items.length;
    }
    
    getTotalPrice(): number {
        return this.items.reduce(
            (previous, current, _) => (previous + current.item.getPrice()*current.quantity),
            0
        )
    }

    getTotal(): number {
        return this.getTotalPrice() - this.getTotalPrice()*this.getDiscount();
    }

    getDiscount(): number {
        return this.coupon ? this.coupon.getDiscount() : 0;
    };
    
    applyCoupon(coupon: Coupon): void {
        this.coupon = coupon;
    }
}