import { MSG } from '@utils/MessageResponse.js';
import type Order from './entity/Order.js';
import { HttpStatus } from '@utils/HttpStatus.utils.js';
import { OrderStatus } from '../../domain/order/OrderStatus.js';
import Logger from '@logs/Logger.js';

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
        const logger = new Logger();
        logger.info('Status do pedido: ' + order.orderStatus);
        if (
            order.orderStatus === OrderStatus.CANCELLED ||
            order.orderStatus === OrderStatus.APPROVED
        )
            throw new Error(MSG.ORDER.ERROR.UNAUTHORIZED, {
                cause: HttpStatus.UNAUTHORIZED,
            });
    }
    private static approveAuthorization(
        order: Order,
        user: { email: string; role: string },
    ) {
        if (order.user !== user.email && user.role !== 'analyst')
            throw new Error(MSG.AUTH.ERROR.UNAUTHORIZED, {
                cause: HttpStatus.UNAUTHORIZED,
            });
    }

    public static approveAccess(
        order: Order | null,
        user: { email: string; role: string },
    ) {
        this.approveExistence(order);
        this.approveAuthorization(order!, user);
    }

    public static approveUpdate(
        order: Order | null,
        user: { email: string; role: string },
    ) {
        console.log(order);
        this.approveAccess(order, user);
        this.approveStatus(order!);
    }
}
