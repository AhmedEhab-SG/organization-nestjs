import { Module } from '@nestjs/common';
import { DBModule } from './db/db.module';
import { AuthModule } from './auth/auth.module';
import { OrganizationModule } from './organization/organization.module';
import { AppController } from './app.controller';

@Module({
  imports: [DBModule, AuthModule, OrganizationModule],
  controllers: [AppController],
})
export class AppModule {}
