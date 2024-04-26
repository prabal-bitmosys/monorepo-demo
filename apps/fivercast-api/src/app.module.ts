import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '',
      port: '',
      username: '',
      password: ',
      database: 'defaultdb',
      entities: [], 
      synchronize: true,
      ssl: true, 
      extra: {
        ssl: {
          rejectUnauthorized: false 
        }
      }
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
