import { IsEnum, IsNumber, IsString } from "class-validator";
import { UserDto } from "src/user/dto/user.dto";
import { AppState } from "../enumurations/state.enum";

export class PaymentDto {

    @IsNumber()
    public id: number;

    @IsEnum(AppState)
    public state: AppState;

    public code: number;

    public url: string;

    public  plan: string;

    public user: UserDto;
  

}
