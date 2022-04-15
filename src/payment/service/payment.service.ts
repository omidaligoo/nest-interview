import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/service/user.service';

import { getRepository, Repository } from 'typeorm';
import { PaymentDto } from '../dto/payment.dto';
import { PaymentEntity } from '../entity/payment.entity';
import { AppState } from '../enumurations/state.enum';

@Injectable()
export class PaymentService {



    


    constructor(
        @InjectRepository(PaymentEntity)
        private paymentRepository: Repository<PaymentEntity>,
        private userService:UserService
    ){}

    create(plan:string,userId:number): Promise<PaymentDto> {

        const payment: PaymentDto =new PaymentDto();
        payment.code=Math.floor(1000 + Math.random() * 9000);
        payment.state=AppState.SUCCESS;
        payment.url="www.google.com";
        payment.plan=plan;
        const user: UserEntity =new UserEntity();
        user.id=userId;
        payment.user=user;
        return this.paymentRepository.save(payment);
    }

    getAll(): Promise<PaymentDto[]> {
    
        return this.paymentRepository.find();
    }

    getOne(id:number): Promise<PaymentDto> {
    
        return this.paymentRepository.findOne(id);
    }

    getByUser(userId: number): Promise<PaymentDto[]> {
        return this.findByUserId(userId);
    }

    async findByUserId(userId: number): Promise<PaymentDto[]>{
        return await this.paymentRepository
          .createQueryBuilder('payment')
          .where('payment.user.id = :userId', { userId })
          .getMany() 
      }

    countByUserIdAndId(userId: number,id): any{
        return  this.paymentRepository
          .createQueryBuilder('payment')
          .where('payment.user.id = :userId', { userId })
          .andWhere('payment.id = :id' ,{ id})
          .getCount();
      }

    DeleteByIdAndUserId(userId: number,id :number): any{
        return  this.paymentRepository
          .createQueryBuilder('payment')
          .where('payment.user.id = :userId', { userId })
          .andWhere('payment.id = :id' ,{ id})
          .delete()
      }
    
    deleteById(id :number): any{
        return this.paymentRepository.delete(id)
    }

    updateWithId(payment: PaymentDto, userId: any): any {
        var count=this.countByUserIdAndId(userId,payment.id);
        if (count>0){
            return this.paymentRepository.save(payment)
        }
        return "it's not your payment";
    }
    update(payment: PaymentDto): any {
        return this.paymentRepository.save(payment);
    }
  

}
