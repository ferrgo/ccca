import Order from '../src/Order'

describe.only('Creating Order', () => {
    test('Should not create an Order with invalid CPF', () => {
        expect(() => new Order('111.111.111-11')).toThrow(new Error('Invalid CPF'));
    });
    
    test('Should create an Order with valid CPF', () => {
        const order = new Order('935.411.347-80');
        expect(order).toBeDefined();
    });
});