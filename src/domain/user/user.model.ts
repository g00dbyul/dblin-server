import {Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class User {
    @PrimaryColumn()
    did!: string;

    @Column({ type: 'varchar' })
    privateKey!: string;

    @Column({ type: 'varchar' })
    id!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt?: Date;
}