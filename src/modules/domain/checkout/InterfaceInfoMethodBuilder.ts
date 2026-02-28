import type InterfaceInfoMethod from './InterfaceInfoMethod';

export default interface InterfaceInfoMethodBuilder {
    buildInfoMethod(): InterfaceInfoMethod | undefined;
}
