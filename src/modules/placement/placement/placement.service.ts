import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Repository } from 'typeorm';
import { PlacementEntity } from '../placement.entity';
import { Placement } from '../placement.model';

@Injectable()
export class PlacementService {

    constructor(
        @InjectRepository(PlacementEntity) private readonly placementRepository: Repository<PlacementEntity>
        ){}
  
    create(client: Placement): Observable<Placement> 
    {
        return from(this.placementRepository.save(client)); 
    }
  
  
    findOne(id: number): Observable<Placement> {
        return from(this.placementRepository.findOne({id}));
    }
  
    findAll(): Observable<Placement[]> 
    {
        return from(this.placementRepository.find());
    }
  
    deleteOne(id: number): Observable<any> 
    {
  
        return from(this.placementRepository.delete(id));

    }
  
    updateOne(id: number, client: Placement): Observable<any> 
    {
        return from(this.placementRepository.update(id, client));
    }


}




