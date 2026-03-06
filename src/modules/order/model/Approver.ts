import { MSG } from '@utils/MessageResponse.js';
import type Order from './entity/Order.js';
import { HttpStatus } from '@utils/HttpStatus.utils.js';
import { OrderStatus } from './OrderStatus.js';

export default class Approver {
    private static approveExistence(
        order: Order | null,
    ): asserts order is Order {
        if (!order)
            throw new Error(MSG.ORDER.ERROR.NOT_FOUND, {
                cause: HttpStatus.NOT_FOUND,
            });
    }
    private static approveStatus(order: Order) {
        if (order.orderStatus === OrderStatus.CANCELLED)
            throw new Error(MSG.ORDER.ERROR.UNAUTHORIZED, {
                cause: HttpStatus.UNAUTHORIZED,
            });
    }
    private static approveAuthorization(order: Order, user: string) {
        if (order.user !== user)
            throw new Error(MSG.AUTH.ERROR.UNAUTHORIZED, {
                cause: HttpStatus.UNAUTHORIZED,
            });
    }

    public static approveAccess(order: Order | null, user: string) {
        this.approveExistence(order);
        this.approveAuthorization(order!, user);
    }

    public static approveUpdate(order: Order | null, user: string) {
        this.approveAccess(order, user);
        this.approveStatus(order!);
    }
}
