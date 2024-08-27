import { IsString, MinLength } from "class-validator";

export class RoleDTO{
    @IsString()
    @MinLength(5, {message: 'Vui long nhap it nhat 5 ky tu'})
    type: string;
}