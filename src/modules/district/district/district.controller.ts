import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { District } from '../district.model';
import { DistrictService } from './district.service';
interface CityName {
    name: string;
}
@ApiTags('district')
@Controller('district')
export class DistrictController {
    constructor(private districtService: DistrictService) {}

    @Post()
    create(@Body()product: District): Observable<District> 
    {
        return this.districtService.create(product);
    }

    @Get()
    findAll(): Observable<District[]> 
    {
        return this.districtService.findAll();
    }
    @Get(':id')
    findOne(@Param('id') id: number): Observable<District> 
    {
        return this.districtService.findOne(id);
    }

    @Get('find_by_name/:city')
    findOneByName(@Param('city') city: string): Observable<District> 
    {
        return this.districtService.findOneByName(city);
    }
    
    @Delete(':id')
    deleteOne(@Param('id')id: string): Observable<District> 
    {
        return this.districtService.deleteOne(Number(id));
    }

    @Put(':id')
    updateOne(@Param('id')id: string , @Body()product: District): Observable<any>  
    {
        return this.districtService.updateOne(Number(id), product);
    }
}
