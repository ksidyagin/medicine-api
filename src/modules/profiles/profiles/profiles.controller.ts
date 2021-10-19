import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { Profiles } from '../profiles.model';
import { ProfilesService } from './profiles.service';

@Controller('profiles')
@ApiTags('profiles')
export class ProfilesController {

    constructor(private profilesService: ProfilesService) {}

    @Post()
    create(@Body()product: Profiles): Observable<Profiles> 
    {
        return this.profilesService.create(product);
    }

    @Get()
    findAll(): Observable<Profiles[]> 
    {
        return this.profilesService.findAll();
    }
    @Get(':id')
    findOne(@Param('id') id: number): Observable<Profiles> 
    {
        return this.profilesService.findOne(id);
    }
    
    @Delete(':id')
    deleteOne(@Param('id')id: string): Observable<Profiles> 
    {
        return this.profilesService.deleteOne(Number(id));
    }

    @Put(':id')
    updateOne(@Param('id')id: string , @Body()product: Profiles): Observable<any>  
    {
        return this.profilesService.updateOne(Number(id), product);
    }

}
