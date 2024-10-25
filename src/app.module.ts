import { Module } from '@nestjs/common';
import { DBModule } from './db/db.module';
import { AuthModule } from './auth/auth.module';
import { OrganizationModule } from './organization/organization.module';

@Module({
  imports: [DBModule, AuthModule, OrganizationModule],
})
export class AppModule {}
