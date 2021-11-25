export default class Item {
    id: number;
    category: string;
    name: string;
    value: number;

    constructor(id: number, category: string, name: string, value: number){
        this.id = id;
        this.category = category;
        this.name = name;
        this.value = value;
    }

    getPrice(): number {
        return this.value;
    }
}