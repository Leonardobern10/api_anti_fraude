export const MSG = {
    AUTH: {
        ERROR: {
            NOT_FOUND: 'User not found.',
            UNAUTHORIZED: 'User is not authenticated.',
            BAD_REQUEST: {
                EMAIL: 'Email not informed',
                USER: 'User is already registered.',
                CREDENTIALS: 'Invalid credentials',
            },
            INVALID_TOKEN: 'Invalid token.',
        },
        SUCCESS: {
            LOGIN: 'Login successful',
            UNLOGGED: 'User unlogged with successful.',
            CREATED: 'User created with successful.',
        },
    },
    ORDER: {
        ERROR: {
            NOT_FOUND: 'Order not found.',
            INVALID_ID: 'Invalid ID.',
            UNAUTHORIZED: 'Invalid operation.',
        },
        SUCCESS: {
            CREATED: 'Order created with successfull.',
            CANCELLED: 'Order cancelled with success.',
        },
    },
};
