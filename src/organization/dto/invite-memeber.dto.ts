import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class InviteMemberDto {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  user_email: string;
}
