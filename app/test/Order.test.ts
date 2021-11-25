import Coupon from '../src/Coupon';
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
            const total = order.getTotalPrice();
            expect(total).toBe((50 * 1 + 70 * 1));
        });

        test('Should return the order total with items having different quantities', () => {
            const order = new Order('935.411.347-80');
            order.addItem(new Item(1, 'Books', 'Clean Architecture', 50), 1);
            order.addItem(new Item(2, 'Books', 'Clean Code', 70), 1);
            order.addItem(new Item(3, 'Food', 'Coffee Beans 1kg', 10), 4);
            const total = order.getTotalPrice();
            expect(total).toBe((50 * 1 + 70 * 1 + 10 * 4));
        });
    });

    describe('Applying coupons', () => {
        test('Should apply discount of 10% over total with coupon', () => {
            const order = new Order('935.411.347-80');
            order.addItem(new Item(1, 'Books', 'Clean Architecture', 50), 1);
            order.addItem(new Item(2, 'Books', 'Clean Code', 70), 1);
            order.addItem(new Item(3, 'Food', 'Coffee Beans 1kg', 10), 4);
            
            const couponPercentage = 10
            order.applyCoupon(new Coupon(1, 'happy-coupon', couponPercentage));

            const price = order.getTotalPrice();
            const total = order.getTotal();
            
            expect(total).toBe(price - (price*(couponPercentage/100)));
        });
        test('Should apply discount of 50% over total with coupon', () => {
            const order = new Order('935.411.347-80');
            order.addItem(new Item(1, 'Books', 'Clean Architecture', 50), 1);
            order.addItem(new Item(2, 'Books', 'Clean Code', 70), 5);
            order.addItem(new Item(3, 'Food', 'Coffee Beans 1kg', 10), 4);
            order.addItem(new Item(3, 'Food', 'Coffee Beans 3kg', 10), 7);
            
            const couponPercentage = 50
            order.applyCoupon(new Coupon(1, 'happy-coupon', couponPercentage));

            const price = order.getTotalPrice();
            const total = order.getTotal();
            
            expect(total).toBe(price - (price*(couponPercentage/100)));
        });
        test('Should apply discount of 37.5% over total with coupon', () => {
            const order = new Order('935.411.347-80');
            order.addItem(new Item(1, 'Books', 'Clean Architecture', 50), 9);
            order.addItem(new Item(2, 'Books', 'Clean Code', 70), 5);
            order.addItem(new Item(3, 'Food', 'Coffee Beans 1kg', 10), 4);
            order.addItem(new Item(3, 'Food', 'Coffee Beans 3kg', 10), 2);
            order.addItem(new Item(3, 'Home Office', 'Table Plant', 2), 100);
            
            const couponPercentage = 37.5
            order.applyCoupon(new Coupon(1, 'happy-coupon', couponPercentage));

            const price = order.getTotalPrice();
            const total = order.getTotal();
            
            expect(total).toBe(price - (price*(couponPercentage/100)));
        });
        test('Should discount 0 from order if no coupon applied', () => {
            const order = new Order('935.411.347-80');
            order.addItem(new Item(1, 'Books', 'Clean Architecture', 50), 9);
            order.addItem(new Item(2, 'Books', 'Clean Code', 70), 5);
            order.addItem(new Item(3, 'Food', 'Coffee Beans 1kg', 10), 4);
            order.addItem(new Item(3, 'Food', 'Coffee Beans 3kg', 10), 2);
            order.addItem(new Item(3, 'Home Office', 'Table Plant', 2), 100);
            
            const couponPercentage = 37.5

            const price = order.getTotalPrice();
            const total = order.getTotal();
            
            expect(total).toBe(price);
        });
    });
});