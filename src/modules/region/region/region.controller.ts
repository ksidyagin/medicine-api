import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { Region } from '../region.model';
import { RegionService } from './region.service';

interface RegionName {
    name: string;
}
@ApiTags('region')
@Controller('region')
export class RegionController {
    constructor(private regionService: RegionService) {}

    @Post()
    create(@Body()product: Region): Observable<Region> 
    {
        return this.regionService.create(product);
    }

    @Get()
    findAll(): Observable<Region[]> 
    {
        return this.regionService.findAll();
    }
    @Get(':id')
    findOne(@Param('id') id: number): Observable<Region> 
    {
        return this.regionService.findOne(id);
    }

    @Get('find_by_name/:region')
    findOneByName(@Param('region') region: string): Observable<Region> 
    {
        return this.regionService.findOneByName(region);
    }
    
    @Delete(':id')
    deleteOne(@Param('id')id: string): Observable<Region> 
    {
        return this.regionService.deleteOne(Number(id));
    }

    @Put(':id')
    updateOne(@Param('id')id: string , @Body()product: Region): Observable<any>  
    {
        return this.regionService.updateOne(Number(id), product);
    }
}
