import type Order from '../entity/Order.js';

export type CountStatsOrderResponse = {
    orders: Order[];
    all: number;
    today: number;
    processed: number;
    analisys: number;
    approved: number;
    rejected: number;
};
