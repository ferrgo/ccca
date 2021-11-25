import CPF from '../src/CPF';
import Item from './Item';

export default class Order {
    CPF: CPF;
    items: Array<{
        item: Item,
        quantity: number
    }>;
    
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
    
    getTotal(): number {
        return this.items.reduce(
            (previous, current, _) => (previous + current.item.getPrice()*current.quantity),
            0
        )
    }
}