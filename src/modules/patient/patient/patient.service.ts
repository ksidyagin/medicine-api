import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from } from 'rxjs';
import { Repository } from 'typeorm';
import { PatientEntity } from '../patient.entity';
import { Patient } from '../patient.model';

@Injectable()
export class PatientService {
    constructor(
        @InjectRepository(PatientEntity) private readonly patientRepository: Repository<PatientEntity>
        ){}
  
    create(client: Patient): Observable<Patient> 
    {
        return from(this.patientRepository.save(client)); 
    }
  
  
    findOne(id: number): Observable<Patient> {
        return from(this.patientRepository.findOne({id}));
    }
  
    findAll(): Observable<Patient[]> 
    {
        return from(this.patientRepository.find());
    }
  
    deleteOne(id: number): Observable<any> 
    {
  
        return from(this.patientRepository.delete(id));

    }
  
    updateOne(id: number, client: Patient): Observable<any> 
    {
        return from(this.patientRepository.update(id, client));
    }

}
