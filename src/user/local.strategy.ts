import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { UserService } from "./service/user.service";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

    constructor(private userService: UserService) {
        super();
      }

      async validate(username: string, password: string): Promise<any> {
        const user = await this.userService.getCode(username, password);
        if (!user) {
          throw new UnauthorizedException();
        }
        return user;
      }  
}