import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { ClientRole } from '../ClientRole.auth';

@Entity()
export default class Client {
    @PrimaryGeneratedColumn('uuid')
    idUser!: string;

    @Column('varchar', { length: 90 })
    name!: string;

    @Column('varchar', { length: 90 })
    email!: string;

    @Column('varchar')
    password!: string;

    @Column({
        type: 'enum',
        enum: ClientRole,
        default: ClientRole.USER,
    })
    role!: ClientRole;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
