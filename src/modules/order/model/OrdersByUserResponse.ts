import type Order from './entity/Order.js';

export type OrdersByUserResponse = {
    orders: Order[];
    quantity: number;
};
