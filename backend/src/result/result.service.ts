// src/result/result.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Result } from './entity/result.entity';
import { SaveResultDto } from './dto/save-results.dto';

@Injectable()
export class ResultService {
    constructor(
        @InjectRepository(Result)
        private resultRepository: Repository<Result>,
    ) {}

    // Save a new result
    async saveResult(saveResultDto: SaveResultDto): Promise<Result> {
        const result = this.resultRepository.create(saveResultDto);
        return this.resultRepository.save(result);
    }

    // Retrieve all results for a specific user
    async findByUserId(userId: string): Promise<Result[]> {
        return this.resultRepository.find({ where: { userId } });
    }

    // Retrieve all results for a specific category
    async findByCategoryId(categoryId: string): Promise<Result[]> {
        return this.resultRepository.find({ where: { categoryId } });
    }

    // Retrieve a specific result by ID
    async findOne(id: string): Promise<Result> {
        const result = await this.resultRepository.findOne({ where: { id } });
        if (!result) {
            throw new NotFoundException('Result not found');
        }
        return result;
    }
}