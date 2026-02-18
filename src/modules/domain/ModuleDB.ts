import type { ObjectLiteral, Repository } from 'typeorm';
import { DataSource } from 'typeorm/browser';

export default interface InterfaceModuleDB {
    init(repoName?: string): Promise<void>;
}
