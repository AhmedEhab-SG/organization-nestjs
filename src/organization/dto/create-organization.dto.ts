import { Type } from 'class-transformer';
import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';

class InviteMembersCreationDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  access_level: string;
}

export class CreateOrganizationDto {
  @Length(2, 64, { message: 'Name must be between 2 or 64 characters.' })
  @IsString()
  name: string;

  @Length(15, 500, {
    message: 'Description must be between 15 or 500 characters.',
  })
  @IsString()
  description: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => InviteMembersCreationDto)
  organization_members: InviteMembersCreationDto[];
}
