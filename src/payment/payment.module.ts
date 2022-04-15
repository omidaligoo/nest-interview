import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from 'src/user/service/user.service';
import { UserModule } from 'src/user/user.module';
import { PaymentController } from './controller/payment.controller';
import { PaymentEntity } from './entity/payment.entity';
import { PaymentService } from './service/payment.service';

@Module({
  imports: [
      TypeOrmModule.forFeature([PaymentEntity]),
      PassportModule,
      UserModule
    ],
  controllers: [PaymentController],
  providers: [PaymentService]
})
export class PaymentModule {}
