import { Module } from '@nestjs/common';
import { CityService } from './city/city.service';
import { CityController } from './city/city.controller';
import { CityEntity } from './city.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([CityEntity])
  ],
  providers: [CityService],
  controllers: [CityController],
  exports: [CityService, TypeOrmModule]
})
export class CityModule {}
