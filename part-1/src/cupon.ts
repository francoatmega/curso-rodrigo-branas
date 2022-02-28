export default class Cupon {

    cupon: string;
    amount: number;

    constructor(cupon: string, amount: number) {
        this.cupon = cupon;
        this.amount = amount;
    }

    calculate(): number {
        const discount = this.#getDiscount()
        if(discount.type === 'percent') {
            return this.amount - (this.amount * (discount.value / 100))
        }
        return this.amount - discount.value
    }

    #getDiscount(): any {
        return {
            type: 'percent',
            value: 25
        }
    }
}