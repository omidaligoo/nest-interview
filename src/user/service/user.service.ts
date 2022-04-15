import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/user/dto/user.dto';
import { UserEntity } from 'src/user/entity/user.entity';
import { getRepository, Repository } from 'typeorm';

@Injectable()
export class UserService {
    


    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        private jwtService: JwtService
    ){}

    create(user:UserDto): Promise<UserDto> {
        
        return this.userRepository.save(user);
    }

    update(user:UserDto): Promise<UserDto> {
        
        return this.userRepository.save(user);
    }


    findAll(): Promise<UserDto[]>{
        return this.userRepository.find();
    }

    findOneById(id:number) :Promise<UserDto>{
        return this.userRepository.findOne(id);
    }

     async findByUsername(username: string,password: string): Promise<UserEntity>{
        return await this.userRepository
          .createQueryBuilder('user')
          .where('user.user_name = :username', { username })
          .where('user.password = :password', { password })
          .getOne();
    
         
      }

    async findByCode(username: string,password: string,code: string): Promise<UserEntity>{
        return await this.userRepository
          .createQueryBuilder('user')
          .where('user.user_name = :username', { username })
          .where('user.password = :password', { password })
          .where('user.code = :code', { code })
          .getOne();
    
         
      }




    async getCode(username: string, password: string): Promise<string> {
        const user =await this.findByUsername(username,password);
        if(user==undefined){
            console.log(user);
            
            return "this user not in db";
        }
        if(user!=undefined){
            user.firstToken=(Math.floor(Math.random() * (9999999 - 1000000) ) + 1000000).toString();
            console.log(user);
            this.update(user);
            return user.firstToken;
        }
        return "an error on project";
    }

    async login(username: string, password: string, code: string): Promise<any> {
        const user =await this.findByUsername(username,password);
        if(user==undefined){
            console.log(user);
            
            return "this user not in db";
        }
        if(user!=undefined){
            var role="user";
            if (user.isAdmin==true){
                role="admin";
            }
            const payload = { username: user.userName, sub: user.id,role : role };
            return {
              access_token: this.jwtService.sign(payload),
            };
        }
        return "an error on project";
    }
}
