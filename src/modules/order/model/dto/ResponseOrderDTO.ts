import type OrderDTO from '@modules/domain/order/dto/OrderDTO.js';

export type ResponseOrderDTO = {
    data: OrderDTO[];
    page: number;
    count: number;
};
