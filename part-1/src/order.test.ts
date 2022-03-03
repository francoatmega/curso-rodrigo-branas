import Order from './order';
import Cupon from './cupon';

afterAll(() => {
    jest.restoreAllMocks();
});

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

test('Should calculate a valid discount cupon of 25 percent', function () {
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
    const totalOrderAmountWithDiscount = newOrder.calculateDiscount('CUPON25OFF')
    expect(totalOrderAmountWithDiscount).toBe(370.5)
})

test('Should throw and exception when applying a expired cupon', function () {
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
    Cupon.prototype.isValidCupon = jest.fn(() => false)
    expect(() => newOrder.calculateDiscount('BLACKFRIDAY50OFF')).toThrow('Cupon BLACKFRIDAY50OFF has expired!')
})