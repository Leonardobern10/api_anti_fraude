import type Order from './entity/Order';

export type OrdersByUserResponse = {
    orders: Order[];
    quantity: number;
};
