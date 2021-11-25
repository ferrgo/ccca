import CPF from '../src/CPF';

export default class Order {
    CPF: CPF;
    constructor(cpf: string){
        this.CPF = new CPF(cpf);
    }
}