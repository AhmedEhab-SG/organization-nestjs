import { Module } from '@nestjs/common';
import { OrganizationModel } from 'src/db/models/organization.model';
import { OrganizationController } from './organization.controller';
import { OrganizationService } from './organization.service';
import { UserModel } from 'src/db/models/user.model';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [OrganizationModel, UserModel],
  controllers: [OrganizationController],
  providers: [OrganizationService, JwtService],
})
export class OrganizationModule {}
