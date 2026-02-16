import type Server from '../server/Server';
import type ApiGateway from '../gateway/Gateway.router';

export default class App {
    private port: string | number;
    private server: Server;
    private gateway: ApiGateway;

    constructor(port: string | number, server: Server, gateway: ApiGateway) {
        this.port = port;
        this.server = server;
        this.gateway = gateway;
    }

    public async init() {
        try {
            this.registerGateway();
            this.server.init(this.port);
        } catch (error) {
            console.error(error);
        }
    }

    private registerGateway() {
        this.server.addRouters(this.gateway.getPath(), this.gateway.build());
    }
}
