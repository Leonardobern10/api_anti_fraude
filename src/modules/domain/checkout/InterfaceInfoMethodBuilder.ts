import type InterfaceInfoMethod from './InterfaceInfoMethod.js';

export default interface InterfaceInfoMethodBuilder {
    buildInfoMethod(): InterfaceInfoMethod | undefined;
}
