import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DB_URI'),
        dbName: configService.get<string>('DB_NAME'),
        auth: {
          username: configService.get<string>('DB_USER'),
          password: configService.get<string>('DB_PASSWORD'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DBModule {}
