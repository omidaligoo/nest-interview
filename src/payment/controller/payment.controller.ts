import { Body, Controller, Delete, Get, Post, Put, Query, Request, UseGuards } from '@nestjs/common';
import { userInfo } from 'os';
import { JwtAuthGuard } from 'src/user/jwt-auth.guard';
import { PaymentDto } from '../dto/payment.dto';
import { PaymentService } from '../service/payment.service';

@Controller('payments')
export class PaymentController {
    constructor(private paymentService: PaymentService){}

    @Post('/')
    @UseGuards(JwtAuthGuard)
    create(@Request() req,@Body('plan') plan: string): Promise<PaymentDto> {
        return this.paymentService.create(plan,req.user.userId);
    }

    @Put('/')
    @UseGuards(JwtAuthGuard)
    update(@Request() req,@Body() payment: PaymentDto): any {
        console.log(req.user);
        if (req.user.role=="admin"){
            return this.paymentService.update(payment);
        }
        return this.paymentService.updateWithId(payment,req.user.userId)
        
    }



    @Get('/')
    @UseGuards(JwtAuthGuard)
    getAll(@Request() req): Promise<PaymentDto[]> {
        console.log(req.user);
        if (req.user.role=="admin"){
            return this.paymentService.getAll();
        }
        return this.paymentService.getByUser(req.user.userId);
    }

    @Delete('/')
    @UseGuards(JwtAuthGuard)
    delete(@Request() req,@Query('id') id: number): Promise<PaymentDto[]> {
        console.log(req.user);
        if (req.user.role=="admin"){
            return this.paymentService.deleteById(id);
        }
        return this.paymentService.DeleteByIdAndUserId(req.user.id,id);
    }


}
