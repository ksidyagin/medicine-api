import { Module } from '@nestjs/common';
import { PlacementService } from './placement/placement.service';
import { PlacementController } from './placement/placement.controller';
import { PlacementEntity } from './placement.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([PlacementEntity])

  ],
  providers: [PlacementService],
  controllers: [PlacementController],
  exports: [PlacementService, TypeOrmModule]
})
export class PlacementModule {}
