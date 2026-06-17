import {IsEmail, IsString, MinLength, MaxLength, IsNotEmpty} from 'class-validator';

export class CreateUserDto {
    @IsEmail({}, {message: 'Please provide a valid email address'})
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(8, {message: 'Password must be at least 8 characters'})
    @MaxLength(72, {message: 'Password must not exceed 72 characters'})
    password: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    firstName: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    lastName: string;
}