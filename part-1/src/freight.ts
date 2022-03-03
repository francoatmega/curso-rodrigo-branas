
export default class Freight {

    items: any

    constructor(items: any) {
        this.items = items
    }

    calculate(): string {
        let totalFreight = 0
        for (const item of this.items) {
            const volume = (item.dimensions.height / 100) * (item.dimensions.width / 100) * (item.dimensions.depth / 100)
            const density = (item.weight * item.quantity) / volume
            const parcialFreight = 1000 * volume * (density / 100)
            totalFreight += parcialFreight
        }
        totalFreight = totalFreight < 10 ? 10 : totalFreight
        return new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, style: 'decimal' }).format(totalFreight)
    }
    
}

