import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { Placement } from '../placement.model';
import { PlacementService } from './placement.service';

@ApiTags('placement')
@Controller('placement')
export class PlacementController {
    constructor(private placementService: PlacementService) {}

    @Post()
    create(@Body()product: Placement): Observable<Placement> 
    {
        return this.placementService.create(product);
    }

    @Get()
    findAll(): Observable<Placement[]> 
    {
        return this.placementService.findAll();
    }
    @Get(':id')
    findOne(@Param('id') id: number): Observable<Placement> 
    {
        return this.placementService.findOne(id);
    }
    
    @Delete(':id')
    deleteOne(@Param('id')id: string): Observable<Placement> 
    {
        return this.placementService.deleteOne(Number(id));
    }

    @Put(':id')
    updateOne(@Param('id')id: string , @Body()product: Placement): Observable<any>  
    {
        return this.placementService.updateOne(Number(id), product);
    }
}
