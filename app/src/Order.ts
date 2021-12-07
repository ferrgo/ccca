import CPF from '../src/CPF';
import Coupon from './Coupon';
import Item from './Item';
import Product from './Product'

export default class Order {
    private readonly cpf: CPF;
    private items: Item[] = [];
    private coupon?: Coupon;
    
    constructor(cpf: string){
        this.cpf = new CPF(cpf);
    }

    public addItem(product: Product, quantity: number): void {
        this.items.push(new Item(product.getId(),product.getPrice(),quantity));
    }

    public getItemCount(): number {
        return this.items.length;
    }
    
    public getTotalPrice(): number {
        return this.items.reduce(
            (previousValue, currentItem, _) => (previousValue + currentItem.getPrice()),
            0
        )
    }

    public getTotal(): number {
        return this.getTotalPrice() - this.getTotalPrice()*this.getDiscount();
    }

    public getDiscount(): number {
        return this.coupon ? this.coupon.getDiscount() : 0;
    }
    
    public applyCoupon(coupon: Coupon): void {
        this.coupon = coupon;
    }
}