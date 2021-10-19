import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { City } from '../city.model';
import { CityService } from './city.service';

interface CityName {
    name: string;
}

@ApiTags('city')
@Controller('city')
export class CityController {
    constructor(private cityService: CityService) {}

    @Post()
    create(@Body()product: City): Observable<City> 
    {
        return this.cityService.create(product);
    }

    @Get()
    findAll(): Observable<City[]> 
    {
        return this.cityService.findAll();
    }
    @Get(':id')
    findOne(@Param('id') id: number): Observable<City> 
    {
        return this.cityService.findOne(id);
    }

    @Get('find_by_name/:city')
    findOneByName(@Param('city') city: string): Observable<City> 
    {
        return this.cityService.findOneByName(city);
    }
    
    @Delete(':id')
    deleteOne(@Param('id')id: string): Observable<City> 
    {
        return this.cityService.deleteOne(Number(id));
    }

    @Put(':id')
    updateOne(@Param('id')id: string , @Body()product: City): Observable<any>  
    {
        return this.cityService.updateOne(Number(id), product);
    }
}
