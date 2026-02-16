export default interface LoggerInterface {
    info(msg: string): void;
    error(action: string, msg: string): void;
    alert(msg: string): void;
}
