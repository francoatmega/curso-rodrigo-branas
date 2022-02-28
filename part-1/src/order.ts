import CPF from './cpf';
export default class Order {

    cpf: string;
    items = [] as any;

    constructor(cpf: string) {
        this.cpf = cpf
    }

    addItem(item: Object): void {
        this.items.push(item)
    }

    book(): string | void {
        const cpf = new CPF(this.cpf)
        if(!cpf.validate()) {
            throw new Error(`Invalid CPF ${this.cpf}`)
        }

        return `Order#${Date.now()}`
    }
}