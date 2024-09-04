import { IsEmail, IsNumber, IsOptional, IsString } from "class-validator";

export class UserDTO{
    @IsOptional()  
    @IsNumber()
    id?: number;

    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    account: string;

    @IsString()
    password: string;

    @IsString()
    phone: string;

    
    @IsNumber()
    roleId: number = 3;

    
    @IsNumber()
    status: number = 1;

}