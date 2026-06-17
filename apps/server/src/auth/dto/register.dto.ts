import {IsEmail, IsString, MinLength, MaxLength, IsNotEmpty} from 'class-validator';

export class RegisterDto {
    @IsEmail({}, {message: 'Please provide a valid email address'})
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8, {message: 'Password must be at least 8 characters'})
    @MaxLength(72)
    password: string;

    @IsString()
    @IsNotEmpty({message: 'First name is required'})
    @MaxLength(100)
    firstName: string;

    @IsString()
    @IsNotEmpty({message: 'Last name is required'})
    @MaxLength(100)
    lastName: string;
}