import { IsNotEmpty, IsEmail, IsStrongPassword, Length } from 'class-validator';

export class SignupDto {
  @Length(2, 64, { message: 'Name must be between 2 or 64 characters.' })
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  //@IsStrongPassword({ minLength: 8 }) for strong password validation
  @Length(8, 64, { message: 'Password must be between 8 or 64 characters.' })
  password: string;
}
