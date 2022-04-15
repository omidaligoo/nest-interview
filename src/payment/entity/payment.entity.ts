import { BeforeInsert, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { UserEntity } from "src/user/entity/user.entity";
import { IsEnum } from "class-validator";
import { AppState } from "../enumurations/state.enum";

@Entity("payment")
export class PaymentEntity {



    @PrimaryGeneratedColumn()
    id: number;

    @IsEnum(AppState)
    @Column({name: 'state',nullable: false})
    public state: AppState;

    @Column({name: 'code',nullable: false})
    public code: number;

    @Column({name: 'url',nullable: false})
    public url: string;

    @Column({name: 'plan',nullable: false})
    public  plan: string;

    @ManyToOne(() => UserEntity, user => user.payments)
    user: UserEntity;
}
