import amqp, { type Channel, type ChannelModel } from 'amqplib';

export default class Messaging {
    private connection!: ChannelModel;
    private channel!: Channel;

    constructor() {}

    public async init() {
        this.connection = await amqp.connect('amqp://localhost');
        this.channel = await this.connection.createChannel();
    }

    public async publish(
        exchangeName: string,
        routingKey: string,
        msg: string,
    ) {
        await this.channel.assertExchange(exchangeName, 'topic', {
            durable: false,
        });
        this.channel.publish(exchangeName, routingKey, Buffer.from(msg));
        console.log(` [x] ENVIADO ${exchangeName} [${routingKey}]: ${msg}`);
    }

    public async consume(
        exchangeName: string,
        routingKey: string,
        callback?: (msg: string) => Promise<void> | void,
    ) {
        await this.channel.assertExchange(exchangeName, 'topic', {
            durable: false,
        });
        const q = await this.channel.assertQueue('', { exclusive: false });
        await this.channel.bindQueue(q.queue, exchangeName, routingKey);

        this.channel.consume(
            q.queue,
            async (message) => {
                if (!message) return;
                const content = message.content.toString();
                console.log(" [x] %s:'%s'", message.fields.routingKey, content);
                if (callback) await callback(content);
            },
            { noAck: true },
        );
    }

    // Consome UMA mensagem e cancela o consumidor — ideal para reply/callback
    public async consumeOnce(
        exchangeName: string,
        routingKey: string,
        callback: (msg: string) => void,
    ): Promise<void> {
        await this.channel.assertExchange(exchangeName, 'topic', {
            durable: false,
        });
        const q = await this.channel.assertQueue('', { exclusive: true });
        await this.channel.bindQueue(q.queue, exchangeName, routingKey);

        // Aguarda a confirmação do broker que o consumidor foi registrado
        const { consumerTag } = await this.channel.consume(
            q.queue,
            (message) => {
                if (!message) return;
                callback(message.content.toString());
                this.channel.cancel(consumerTag);
            },
            { noAck: true },
        );
    }
}
