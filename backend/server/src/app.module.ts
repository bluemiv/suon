import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardsModule } from './boards/boards.module';
import { typeOrmModuleOptions } from './configs/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmModuleOptions), BoardsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
