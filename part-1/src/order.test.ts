import Order from './order';

test('Should throw an exception when do an order with invalid CPF', function () {
    const newOrder = new Order('059.970.943.09')
    newOrder.addItem({
        description: 'Sunglasses',
        price: 89.00,
        quantity: 2
    })
    newOrder.addItem({
        description: 'Hat',
        price: 139.00,
        quantity: 1
    })
    newOrder.addItem({
        description: 'T-shirt',
        price: 59.00,
        quantity: 3
    })
    expect(() => newOrder.book()).toThrow('Invalid CPF 059.970.943.09')
})

test('Should return and order id when sucessful do an order with valid CPF', function () {
    const newOrder = new Order('059.970.943.08')
    newOrder.addItem({
        description: 'Sunglasses',
        price: 89.00,
        quantity: 2
    })
    newOrder.addItem({
        description: 'Hat',
        price: 139.00,
        quantity: 1
    })
    newOrder.addItem({
        description: 'T-shirt',
        price: 59.00,
        quantity: 3
    })
    const orderId = newOrder.book()
    expect(orderId).toBeDefined()
})