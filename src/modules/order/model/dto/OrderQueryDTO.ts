import type { OrderStatus } from '@modules/domain/order/OrderStatus.js';

export type OrderQueryDTO = {
    status?: OrderStatus | undefined;
    minValue?: number | undefined;
    maxValue?: number | undefined;
    user?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sortBy?: 'value' | 'createdAt' | 'updatedAt' | undefined;
    modeSort?: 'DESC' | 'ASC' | undefined;
};
