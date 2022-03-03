import CPF from './cpf';
import Cupon from './cupon';
import Freight from './freight';

export default class Order {

    cpf: string;
    items = [] as any;

    constructor(cpf: string) {
        this.cpf = cpf
    }

    addItem(item: Object): void {
        this.items.push(item)
    }

    calculateDiscount(cuponCode: string): number {
        const amount = this.items.reduce((acc: number, item: any) => acc += item.price * item.quantity, 0)
        const cupon = new Cupon(cuponCode, amount)
        return cupon.calculate()
    }

    calculateFreight(): string {
        const freight = new Freight(this.items)
        return freight.calculate()
    }

    book(): string | void {
        const cpf = new CPF(this.cpf)
        if(!cpf.validate()) {
            throw new Error(`Invalid CPF ${this.cpf}`)
        }

        return `Order#${Date.now()}`
    }
}