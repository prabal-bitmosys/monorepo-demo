import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Contact } from './contact.entity'; 
import { ContactController } from './controller/contact.controller';
import { ContactService } from './service/contact.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: parseInt(config.get('DB_PORT')),
        username: config.get('DB_USER'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_DATABASE'),
        entities: [Contact], // Make sure Contact entity is included here
        synchronize: true,
        ssl: true,
        extra: {
          ssl: {
            rejectUnauthorized: false,
          },
        },
      }),
    }),
    TypeOrmModule.forFeature([Contact]), // Add this line to include ContactRepository
  ],
  controllers: [AppController, ContactController],
  providers: [AppService, ContactService], 
})
export class AppModule {}
