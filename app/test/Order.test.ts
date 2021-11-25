import Item from '../src/Item';
import Order from '../src/Order'

describe('Creating Order', () => {
    test('Should not create an Order with invalid CPF', () => {
        expect(() => new Order('111.111.111-11')).toThrow(new Error('Invalid CPF'));
    });

    test('Should create an Order with valid CPF', () => {
        const order = new Order('935.411.347-80');
        expect(order).toBeDefined();
    });

    describe('Adding items', () => {
        test('Should create an Order with 1 item', () => {
            const order = new Order('935.411.347-80');
            order.addItem(new Item(1, 'Books', 'Clean Architecture', 50), 1);
            const itemCount = order.getItemCount();
            expect(itemCount).toBe(1);
        });

        test('Should create an Order with 3 items', () => {
            const order = new Order('935.411.347-80');
            order.addItem(new Item(1, 'Books', 'Clean Architecture', 50), 1);
            order.addItem(new Item(2, 'Books', 'Clean Code', 70), 1);
            order.addItem(new Item(3, 'Food', 'Coffee Beans 1kg', 10), 4);
            const itemCount = order.getItemCount();
            expect(itemCount).toBe(3);
        });

        test('Should return the order total', () => {
            const order = new Order('935.411.347-80');
            order.addItem(new Item(1, 'Books', 'Clean Architecture', 50), 1);
            order.addItem(new Item(2, 'Books', 'Clean Code', 70), 1);
            const total = order.getTotal();
            expect(total).toBe((50 * 1 + 70 * 1));
        });

        test('Should return the order total with items having different quantities', () => {
            const order = new Order('935.411.347-80');
            order.addItem(new Item(1, 'Books', 'Clean Architecture', 50), 1);
            order.addItem(new Item(2, 'Books', 'Clean Code', 70), 1);
            order.addItem(new Item(3, 'Food', 'Coffee Beans 1kg', 10), 4);
            const total = order.getTotal();
            expect(total).toBe((50 * 1 + 70 * 1 + 10 * 4));
        });
    });
});