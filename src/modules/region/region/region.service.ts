import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from } from 'rxjs';
import { Repository } from 'typeorm';
import { RegionEntity } from '../region.entity';
import { Region } from '../region.model';

@Injectable()
export class RegionService {

    constructor(
        @InjectRepository(RegionEntity) private readonly regionRepository: Repository<RegionEntity>
        ){}
  
    create(client: Region): Observable<Region> 
    {
        return from(this.regionRepository.save(client)); 
    }
  
  
    findOne(id: number): Observable<Region> {
        return from(this.regionRepository.findOne({id}));
    }
    findOneByName(region_name: string): Observable<Region> {
        return from(this.regionRepository.findOne({ where: { name: region_name} }));
    }

    findAll(): Observable<Region[]> 
    {
        return from(this.regionRepository.find());
    }
  
    deleteOne(id: number): Observable<any> 
    {
  
        return from(this.regionRepository.delete(id));

    }
  
    updateOne(id: number, client: Region): Observable<any> 
    {
        return from(this.regionRepository.update(id, client));
    }

}
