import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { PaymentEntity } from "src/payment/entity/payment.entity";

@Entity("user")
export class UserEntity {

    @BeforeInsert()
    async hashPassword() {
       this.password = await bcrypt.hash(this.password, 10);
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    name: string;

    @Column({name: 'last_name',nullable: false})
    lastName: string;

    @Column({name: 'user_name',nullable: false})
    userName: string;

    @Column({name: 'password',nullable: false})
    password: string;

    @Column({name: 'first_token',nullable: true})
    firstToken: string;

    @Column({name: 'admin',nullable: true})
    isAdmin: boolean;

    @OneToMany(() => PaymentEntity, payment => payment.user)
    payments: PaymentEntity[];
}
