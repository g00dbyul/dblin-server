import {Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class Board {
    @PrimaryGeneratedColumn('uuid')
    uuid!: string;

    @Column({ type: 'varchar' })
    category!: string;

    @Column({ type: 'varchar' })
    userDID!: string;

    @Column({ type: 'varchar' })
    title!: string;

    @Column({ type: 'longtext' })
    content!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt?: Date;
}