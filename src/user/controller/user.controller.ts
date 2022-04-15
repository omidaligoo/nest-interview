import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { UserService } from '../service/user.service';

@Controller('users')
export class UserController {
    constructor(private userService: UserService){}

    @Post('/')
    create(@Body() user:UserDto): Promise<UserDto> {
        return this.userService.create(user);
    }

    @Get('/')
    findAll(): Promise<UserDto[]> {
        return this.userService.findAll();
    }

    @Get('/code?')
     getCode(
        @Query('username') username: string,
        @Query('password') password: string,
    ): Promise<string> {
        console.log(username);
        console.log(password);
        return this.userService.getCode(username,password);
    }

    @Get('/login?')
    login(
       @Query('username') username: string,
       @Query('password') password: string,
       @Query('code') code: string
   ): Promise<string> {
       console.log(username);
       console.log(password);
       return this.userService.login(username,password,code);
   }
}
