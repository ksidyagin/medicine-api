import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { Patient } from '../patient.model';
import { PatientService } from './patient.service';

@ApiTags('patient')
@Controller('patient')
export class PatientController {
    constructor(private patientService: PatientService) {}

    @Post()
    create(@Body()product: Patient): Observable<Patient> 
    {
        return this.patientService.create(product);
    }

    @Get()
    findAll(): Observable<Patient[]> 
    {
        return this.patientService.findAll();
    }
    @Get(':id')
    findOne(@Param('id') id: number): Observable<Patient> 
    {
        return this.patientService.findOne(id);
    }
    
    @Delete(':id')
    deleteOne(@Param('id')id: string): Observable<Patient> 
    {
        return this.patientService.deleteOne(Number(id));
    }

    @Put(':id')
    updateOne(@Param('id')id: string , @Body()product: Patient): Observable<any>  
    {
        return this.patientService.updateOne(Number(id), product);
    }
}
